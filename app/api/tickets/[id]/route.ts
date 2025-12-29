// Backend API Routes - Single ticket handlers
import { NextRequest, NextResponse } from 'next/server';
import { ticketController } from '@/server/controllers/ticketController';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ticket = await ticketController.getTicketById(id);

    if (!ticket) {
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ ticket });
  } catch (error: any) {
    console.error('Error fetching ticket:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch ticket',
        details: error?.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const ticket = await ticketController.updateTicket(id, body);
    return NextResponse.json({ ticket });
  } catch (error: any) {
    console.error('Error updating ticket:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update ticket',
        details: error?.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await ticketController.deleteTicket(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting ticket:', error);
    return NextResponse.json(
      { 
        error: 'Failed to delete ticket',
        details: error?.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}

