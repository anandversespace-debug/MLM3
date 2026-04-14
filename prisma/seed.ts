import { PrismaClient, DiscountType } from '@prisma/client';
import { hashPassword } from '../lib/auth';
import { generateReferralCode } from '../utils/helpers';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPassword = await hashPassword('admin123');
  const admin = await prisma.adminUser.upsert({
    where: { email: 'admin@mlmplatform.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@mlmplatform.com',
      password: adminPassword,
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });
  console.log('✅ Admin user created');

  // Create sample user
  const userPassword = await hashPassword('user123');
  const userReferralCode = generateReferralCode('user1');
  const user = await prisma.user.upsert({
    where: { email: 'demo@user.com' },
    update: {},
    create: {
      name: 'Demo User',
      email: 'demo@user.com',
      password: userPassword,
      phone: '+919876543210',
      referralCode: userReferralCode,
      role: 'USER',
      isActive: true,
      isEligibleForMLM: false,
      walletBalance: 0,
      totalEarnings: 0,
    },
  });
  console.log('✅ Sample user created');

  // Create sample products
  const products = [
    {
      name: 'Premium Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life',
      price: 4999,
      stock: 50,
      category: 'Electronics',
      images: JSON.stringify(['/images/products/headphones.jpg']),
    },
    {
      name: 'Smart Fitness Watch',
      description: 'Track your fitness goals with heart rate monitor, GPS, and sleep tracking',
      price: 7999,
      stock: 30,
      category: 'Electronics',
      images: JSON.stringify(['/images/products/watch.jpg']),
    },
    {
      name: 'Organic Skincare Set',
      description: 'Complete skincare routine with natural and organic ingredients',
      price: 2499,
      stock: 100,
      category: 'Beauty',
      images: JSON.stringify(['/images/products/skincare.jpg']),
    },
    {
      name: 'Professional Camera Kit',
      description: 'DSLR camera with lens kit, tripod, and carrying case',
      price: 45999,
      stock: 15,
      category: 'Electronics',
      images: JSON.stringify(['/images/products/camera.jpg']),
    },
    {
      name: 'Yoga & Meditation Bundle',
      description: 'Complete yoga set with mat, blocks, straps, and meditation cushion',
      price: 3499,
      stock: 75,
      category: 'Fitness',
      images: JSON.stringify(['/images/products/yoga.jpg']),
    },
    {
      name: 'Premium Coffee Maker',
      description: 'Automatic espresso machine with built-in grinder and milk frother',
      price: 12999,
      stock: 25,
      category: 'Home',
      images: JSON.stringify(['/images/products/coffee.jpg']),
    },
    {
      name: 'Laptop Backpack Pro',
      description: 'Water-resistant backpack with laptop compartment and USB charging port',
      price: 1999,
      stock: 150,
      category: 'Accessories',
      images: JSON.stringify(['/images/products/backpack.jpg']),
    },
    {
      name: 'Smart Home Speaker',
      description: 'Voice-controlled smart speaker with premium sound quality',
      price: 8999,
      stock: 40,
      category: 'Electronics',
      images: JSON.stringify(['/images/products/speaker.jpg']),
    },
    {
      name: 'Luxury Perfume Collection',
      description: 'Set of 3 premium fragrances for all occasions',
      price: 5999,
      stock: 60,
      category: 'Beauty',
      images: JSON.stringify(['/images/products/perfume.jpg']),
    },
    {
      name: 'Gaming Mouse & Keyboard Combo',
      description: 'RGB gaming peripherals with customizable buttons',
      price: 3999,
      stock: 80,
      category: 'Electronics',
      images: JSON.stringify(['/images/products/gaming.jpg']),
    },
    {
      name: 'Air Purifier Pro',
      description: 'HEPA filter air purifier for rooms up to 500 sq ft',
      price: 9999,
      stock: 35,
      category: 'Home',
      images: JSON.stringify(['/images/products/purifier.jpg']),
    },
    {
      name: 'Running Shoes Elite',
      description: 'Lightweight running shoes with advanced cushioning technology',
      price: 6499,
      stock: 100,
      category: 'Fitness',
      images: JSON.stringify(['/images/products/shoes.jpg']),
    },
    {
      name: 'Tablet 10-inch Pro',
      description: 'High-performance tablet with stylus support and 128GB storage',
      price: 24999,
      stock: 20,
      category: 'Electronics',
      images: JSON.stringify(['/images/products/tablet.jpg']),
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }
  console.log(`✅ ${products.length} products created`);

  // Create sample coupons
  const coupons = [
    {
      code: 'WELCOME10',
      discountType: DiscountType.PERCENTAGE,
      discountValue: 10,
      minOrderValue: 1000,
      maxUses: 1000,
      usedCount: 0,
      expiryDate: new Date('2026-12-31'),
      isActive: true,
    },
    {
      code: 'SAVE500',
      discountType: DiscountType.FIXED,
      discountValue: 500,
      minOrderValue: 3000,
      maxUses: 500,
      usedCount: 0,
      expiryDate: new Date('2026-06-30'),
      isActive: true,
    },
    {
      code: 'MLM20',
      discountType: DiscountType.PERCENTAGE,
      discountValue: 20,
      minOrderValue: 5000,
      maxUses: 200,
      usedCount: 0,
      expiryDate: new Date('2026-12-31'),
      isActive: true,
    },
  ];

  for (const coupon of coupons) {
    await prisma.coupon.create({
      data: coupon,
    });
  }
  console.log(`✅ ${coupons.length} coupons created`);

  // Create MLM commission settings
  await prisma.settings.create({
    data: {
      mlmCommissionLevels: JSON.stringify({
        1: 10,
        2: 7,
        3: 5,
        4: 4,
        5: 3,
        6: 2.5,
        7: 2,
        8: 1.5,
        9: 1,
        10: 0.5,
      }),
      siteSettings: JSON.stringify({
        siteName: 'MLM E-commerce Platform',
        siteUrl: 'http://localhost:3000',
        mlmEligibilityAmount: 10000,
        currency: 'INR',
      }),
      paymentSettings: JSON.stringify({
        razorpayEnabled: true,
        minWithdrawalAmount: 500,
      }),
    },
  });
  console.log('✅ MLM settings created');

  // Create sample blog posts
  const blogs = [
    {
      title: 'How to Maximize Your MLM Earnings',
      slug: 'maximize-mlm-earnings',
      content: 'Learn the top strategies to build your network and maximize your commission earnings...',
      published: true,
    },
    {
      title: 'Top 10 Products to Start Your Journey',
      slug: 'top-10-products',
      content: 'Discover the best-selling products that can help you reach the ₹10,000 threshold faster...',
      published: true,
    },
    {
      title: 'Understanding the 10-Level Commission System',
      slug: 'understanding-commission-system',
      content: 'A comprehensive guide to how our MLM commission structure works...',
      published: true,
    },
  ];

  for (const blog of blogs) {
    await prisma.blog.create({
      data: blog,
    });
  }
  console.log(`✅ ${blogs.length} blog posts created`);

  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📋 Test Credentials:');
  console.log('Admin: admin@mlmplatform.com / admin123');
  console.log('User: demo@user.com / user123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
