// Frontend API Service - Client-side API calls
function getApiBaseUrl(): string {
  // In server-side rendering, use absolute URL
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_BASE_URL 
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/api`
      : 'http://localhost:3000/api';
  }
  // In client-side, use relative URL
  return '/api';
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  author: string;
  created_at: string;
  updated_at: string;
  published: boolean;
  mood?: string;
  tags?: string[];
}

export interface CreatePostData {
  title: string;
  content: string;
  excerpt?: string;
  author?: string;
  mood?: string;
  tags?: string[];
}

class ApiService {
  // Get all posts
  async getPosts(limit = 20, offset = 0): Promise<BlogPost[]> {
    try {
      const response = await fetch(
        `${getApiBaseUrl()}/posts?limit=${limit}&offset=${offset}`,
        {
          cache: 'no-store',
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.statusText}`);
      }

      const data = await response.json();
      return data.posts || [];
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  // Get single post
  async getPost(id: string): Promise<BlogPost | null> {
    try {
      const response = await fetch(`${getApiBaseUrl()}/posts/${id}`, {
        cache: 'no-store',
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Failed to fetch post: ${response.statusText}`);
      }

      const data = await response.json();
      return data.post;
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  }

  // Create new post
  async createPost(postData: CreatePostData): Promise<BlogPost> {
    try {
      const response = await fetch(`${getApiBaseUrl()}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.details || errorData.error || 'Failed to create post'
        );
      }

      const data = await response.json();
      return data.post;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  // Update post
  async updatePost(id: string, postData: Partial<CreatePostData>): Promise<BlogPost> {
    try {
      const response = await fetch(`${getApiBaseUrl()}/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.details || errorData.error || 'Failed to update post'
        );
      }

      const data = await response.json();
      return data.post;
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  }

  // Delete post
  async deletePost(id: string): Promise<void> {
    try {
      const response = await fetch(`${getApiBaseUrl()}/posts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.details || errorData.error || 'Failed to delete post'
        );
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }

  // Support Tickets
  async createTicket(ticketData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<any> {
    try {
      const response = await fetch(`${getApiBaseUrl()}/tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.details || errorData.error || 'Failed to create ticket'
        );
      }

      const data = await response.json();
      return data.ticket;
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw error;
    }
  }

  async getTickets(limit = 50, offset = 0, status?: string): Promise<any[]> {
    try {
      const url = `${getApiBaseUrl()}/tickets?limit=${limit}&offset=${offset}${status ? `&status=${status}` : ''}`;
      const response = await fetch(url, {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch tickets: ${response.statusText}`);
      }

      const data = await response.json();
      return data.tickets || [];
    } catch (error) {
      console.error('Error fetching tickets:', error);
      throw error;
    }
  }

  async getTicketStats(): Promise<{
    total: number;
    open: number;
    in_progress: number;
    resolved: number;
    closed: number;
  }> {
    try {
      const response = await fetch(`${getApiBaseUrl()}/tickets/stats`, {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch ticket stats: ${response.statusText}`);
      }

      const data = await response.json();
      return data.stats;
    } catch (error) {
      console.error('Error fetching ticket stats:', error);
      throw error;
    }
  }

  async updateTicketStatus(id: string, status: string): Promise<any> {
    try {
      const response = await fetch(`${getApiBaseUrl()}/tickets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.details || errorData.error || 'Failed to update ticket'
        );
      }

      const data = await response.json();
      return data.ticket;
    } catch (error) {
      console.error('Error updating ticket:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();

