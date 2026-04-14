import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/auth';
import { distributeCommissions, updateMLMEligibility } from '@/lib/mlm';

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await getUserFromToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
    } = body;

    // Verify payment signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Create order in database
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        totalAmount: orderData.totalAmount,
        shippingAddress: orderData.shippingAddress,
        paymentMethod: 'RAZORPAY',
        paymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        paymentStatus: 'PAID',
        status: 'PROCESSING',
        items: {
          create: orderData.items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    // Update user's MLM eligibility based on total purchases
    await updateMLMEligibility(user.id);

    // Calculate total order value for commission
    const orderTotal = order.totalAmount;

    // Distribute MLM commissions
    try {
      await distributeCommissions(order.id, user.id, orderTotal);
      console.log('✅ MLM commissions distributed for order:', order.id);
    } catch (error) {
      console.error('Error distributing commissions:', error);
      // Don't fail the order if commission distribution fails
    }

    // Create transaction record
    await prisma.transaction.create({
      data: {
        userId: user.id,
        type: 'DEBIT',
        amount: orderTotal,
        description: `Order #${order.id.slice(-8).toUpperCase()}`,
        orderId: order.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Payment verified and order created successfully',
      orderId: order.id,
    });
  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: error.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}
