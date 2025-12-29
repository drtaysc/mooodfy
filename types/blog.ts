// Shared Types - Used by both frontend and backend
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

