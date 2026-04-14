import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/auth';
import { getDownlineNetwork } from '@/lib/mlm';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await getUserFromToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get downline network
    const network = await getDownlineNetwork(user.id);

    return NextResponse.json({ success: true, network });
  } catch (error: any) {
    console.error('Get network error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch network' },
      { status: 500 }
    );
  }
}
