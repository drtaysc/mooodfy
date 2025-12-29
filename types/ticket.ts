// Support Ticket Types
export interface SupportTicket {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface CreateTicketData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface UpdateTicketData {
  status?: 'open' | 'in_progress' | 'resolved' | 'closed';
}

