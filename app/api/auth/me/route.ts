import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('accessToken')?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthenticated' }, { status: 401 });
    }

    const user = await getUserFromToken(token);

    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid or expired session' }, { status: 401 });
    }

    if (!user.isActive) {
      return NextResponse.json({ success: false, message: 'Account deactivated' }, { status: 403 });
    }

    // Omit sensitive data securely natively
    const { ...safeUser } = user;

    return NextResponse.json({
      success: true,
      user: safeUser,
    });
  } catch (error: any) {
    console.error('Session retrieval error:', error);
    return NextResponse.json(
      { success: false, message: 'Server Internal Error', error: error.message },
      { status: 500 }
    );
  }
}
