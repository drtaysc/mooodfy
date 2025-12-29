// Backend Controller - Business logic for support tickets
import { sql } from '@/lib/db';
import type { SupportTicket, CreateTicketData, UpdateTicketData } from '@/types/ticket';

export class TicketController {
  // Ensure table exists with all required columns
  private async ensureTableExists() {
    try {
      // Try to create table (will fail silently if exists)
      await sql`
        CREATE TABLE IF NOT EXISTS support_tickets (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          subject VARCHAR(500) NOT NULL,
          message TEXT NOT NULL,
          status VARCHAR(20) DEFAULT 'open',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `;
    } catch (error: any) {
      // Table might already exist, that's okay
      console.log('Table creation check:', error?.message);
    }

    // Ensure all columns exist (add missing ones)
    try {
      const columns = ['name', 'email', 'subject', 'message', 'status', 'created_at', 'updated_at'];
      
      for (const colName of columns) {
        const columnExists = await sql`
          SELECT EXISTS (
            SELECT FROM information_schema.columns 
            WHERE table_schema = 'public' 
            AND table_name = 'support_tickets' 
            AND column_name = ${colName}
          )
        `;
        
        if (!columnExists[0]?.exists) {
          if (colName === 'name') {
            await sql`ALTER TABLE support_tickets ADD COLUMN name VARCHAR(255) NOT NULL DEFAULT ''`;
          } else if (colName === 'email') {
            await sql`ALTER TABLE support_tickets ADD COLUMN email VARCHAR(255) NOT NULL DEFAULT ''`;
          } else if (colName === 'subject') {
            await sql`ALTER TABLE support_tickets ADD COLUMN subject VARCHAR(500) NOT NULL DEFAULT ''`;
          } else if (colName === 'message') {
            await sql`ALTER TABLE support_tickets ADD COLUMN message TEXT NOT NULL DEFAULT ''`;
          } else if (colName === 'status') {
            await sql`ALTER TABLE support_tickets ADD COLUMN status VARCHAR(20) DEFAULT 'open'`;
          } else if (colName === 'created_at') {
            await sql`ALTER TABLE support_tickets ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP`;
          } else if (colName === 'updated_at') {
            await sql`ALTER TABLE support_tickets ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP`;
          }
        }
      }
    } catch (error: any) {
      // Columns might already exist, that's okay
      console.log('Column check:', error?.message);
    }
  }

  // Get all tickets
  async getAllTickets(limit = 50, offset = 0, status?: string): Promise<SupportTicket[]> {
    await this.ensureTableExists();

    let query;
    if (status) {
      query = sql`
        SELECT 
          id,
          name,
          email,
          subject,
          message,
          status,
          created_at,
          updated_at
        FROM support_tickets
        WHERE status = ${status}
        ORDER BY created_at DESC
        LIMIT ${limit}
        OFFSET ${offset}
      `;
    } else {
      query = sql`
        SELECT 
          id,
          name,
          email,
          subject,
          message,
          status,
          created_at,
          updated_at
        FROM support_tickets
        ORDER BY created_at DESC
        LIMIT ${limit}
        OFFSET ${offset}
      `;
    }

    const tickets = await query;
    return tickets as SupportTicket[];
  }

  // Get single ticket by ID
  async getTicketById(id: string): Promise<SupportTicket | null> {
    await this.ensureTableExists();

    const result = await sql`
      SELECT 
        id,
        name,
        email,
        subject,
        message,
        status,
        created_at,
        updated_at
      FROM support_tickets
      WHERE id = ${id}
    `;

    if (result.length === 0) {
      return null;
    }

    return result[0] as SupportTicket;
  }

  // Create new ticket
  async createTicket(ticketData: CreateTicketData): Promise<SupportTicket> {
    await this.ensureTableExists();

    const { name, email, subject, message } = ticketData;

    if (!name || !email || !subject || !message) {
      throw new Error('Name, email, subject, and message are required');
    }

    const result = await sql`
      INSERT INTO support_tickets (name, email, subject, message, status)
      VALUES (${name}, ${email}, ${subject}, ${message}, 'open')
      RETURNING *
    `;

    return result[0] as SupportTicket;
  }

  // Update ticket
  async updateTicket(id: string, ticketData: UpdateTicketData): Promise<SupportTicket> {
    await this.ensureTableExists();

    const { status } = ticketData;

    // Get existing ticket first
    const existing = await this.getTicketById(id);
    if (!existing) {
      throw new Error('Ticket not found');
    }

    // Update with provided fields or keep existing values
    const result = await sql`
      UPDATE support_tickets
      SET 
        status = ${status !== undefined ? status : existing.status},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      throw new Error('Ticket not found');
    }

    return result[0] as SupportTicket;
  }

  // Delete ticket
  async deleteTicket(id: string): Promise<void> {
    await this.ensureTableExists();

    const result = await sql`
      DELETE FROM support_tickets
      WHERE id = ${id}
      RETURNING id
    `;

    if (result.length === 0) {
      throw new Error('Ticket not found');
    }
  }

  // Get ticket statistics
  async getTicketStats(): Promise<{
    total: number;
    open: number;
    in_progress: number;
    resolved: number;
    closed: number;
  }> {
    await this.ensureTableExists();

    const total = await sql`SELECT COUNT(*) as count FROM support_tickets`;
    const open = await sql`SELECT COUNT(*) as count FROM support_tickets WHERE status = 'open'`;
    const in_progress = await sql`SELECT COUNT(*) as count FROM support_tickets WHERE status = 'in_progress'`;
    const resolved = await sql`SELECT COUNT(*) as count FROM support_tickets WHERE status = 'resolved'`;
    const closed = await sql`SELECT COUNT(*) as count FROM support_tickets WHERE status = 'closed'`;

    return {
      total: Number(total[0]?.count || 0),
      open: Number(open[0]?.count || 0),
      in_progress: Number(in_progress[0]?.count || 0),
      resolved: Number(resolved[0]?.count || 0),
      closed: Number(closed[0]?.count || 0),
    };
  }
}

export const ticketController = new TicketController();

