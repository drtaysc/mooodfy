// Backend API Routes - Support ticket handlers
import { NextRequest, NextResponse } from 'next/server';
import { ticketController } from '@/server/controllers/ticketController';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const status = searchParams.get('status') || undefined;

    const tickets = await ticketController.getAllTickets(limit, offset, status);
    return NextResponse.json({ tickets });
  } catch (error: any) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch tickets',
        details: error?.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Name, email, subject, and message are required' },
        { status: 400 }
      );
    }

    const ticket = await ticketController.createTicket({
      name,
      email,
      subject,
      message,
    });

    return NextResponse.json({ ticket }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating ticket:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create ticket',
        details: error?.message || 'Unknown error',
        stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      },
      { status: 500 }
    );
  }
}

