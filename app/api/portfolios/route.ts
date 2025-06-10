import { NextResponse } from 'next/server';
import { getPortfolios } from '@/lib/notion/client';

export async function GET() {
  try {
    const portfolios = await getPortfolios();
    return NextResponse.json(portfolios);
  } catch (error) {
    console.error('Error fetching portfolios:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolios' },
      { status: 500 }
    );
  }
}
