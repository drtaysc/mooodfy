// Backend API Routes - Ticket statistics
import { NextRequest, NextResponse } from 'next/server';
import { ticketController } from '@/server/controllers/ticketController';

export async function GET(request: NextRequest) {
  try {
    const stats = await ticketController.getTicketStats();
    return NextResponse.json({ stats });
  } catch (error: any) {
    console.error('Error fetching ticket stats:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch ticket stats',
        details: error?.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}

