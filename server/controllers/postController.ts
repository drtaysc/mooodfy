// Backend Controller - Business logic for posts
import { sql } from '@/lib/db';
import type { BlogPost, CreatePostData } from '@/types/blog';

export class PostController {
  // Ensure table exists with all required columns
  private async ensureTableExists() {
    try {
      // Try to create table (will fail silently if exists)
      await sql`
        CREATE TABLE IF NOT EXISTS blog_posts (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          content TEXT NOT NULL,
          excerpt TEXT,
          author VARCHAR(100) DEFAULT 'Anonymous',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          published BOOLEAN DEFAULT true,
          mood VARCHAR(50),
          tags TEXT[]
        )
      `;
    } catch (error: any) {
      // Table might already exist, that's okay
      console.log('Table creation check:', error?.message);
    }

    // Ensure all columns exist (add missing ones)
    try {
      const columns = ['excerpt', 'author', 'created_at', 'updated_at', 'published', 'mood', 'tags'];
      
      for (const colName of columns) {
        const columnExists = await sql`
          SELECT EXISTS (
            SELECT FROM information_schema.columns 
            WHERE table_schema = 'public' 
            AND table_name = 'blog_posts' 
            AND column_name = ${colName}
          )
        `;
        
        if (!columnExists[0]?.exists) {
          if (colName === 'excerpt') {
            await sql`ALTER TABLE blog_posts ADD COLUMN excerpt TEXT`;
          } else if (colName === 'author') {
            await sql`ALTER TABLE blog_posts ADD COLUMN author VARCHAR(100) DEFAULT 'Anonymous'`;
          } else if (colName === 'created_at') {
            await sql`ALTER TABLE blog_posts ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP`;
          } else if (colName === 'updated_at') {
            await sql`ALTER TABLE blog_posts ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP`;
          } else if (colName === 'published') {
            await sql`ALTER TABLE blog_posts ADD COLUMN published BOOLEAN DEFAULT true`;
          } else if (colName === 'mood') {
            await sql`ALTER TABLE blog_posts ADD COLUMN mood VARCHAR(50)`;
          } else if (colName === 'tags') {
            await sql`ALTER TABLE blog_posts ADD COLUMN tags TEXT[]`;
          }
        }
      }
    } catch (error: any) {
      // Columns might already exist, that's okay
      console.log('Column check:', error?.message);
    }
  }

  // Get all posts
  async getAllPosts(limit = 20, offset = 0): Promise<BlogPost[]> {
    await this.ensureTableExists();

    const posts = await sql`
      SELECT 
        id,
        title,
        content,
        excerpt,
        author,
        created_at,
        updated_at,
        published,
        mood,
        tags
      FROM blog_posts
      WHERE published = true
      ORDER BY created_at DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    return posts as BlogPost[];
  }

  // Get single post by ID
  async getPostById(id: string): Promise<BlogPost | null> {
    await this.ensureTableExists();

    const result = await sql`
      SELECT 
        id,
        title,
        content,
        excerpt,
        author,
        created_at,
        updated_at,
        published,
        mood,
        tags
      FROM blog_posts
      WHERE id = ${id} AND published = true
    `;

    if (result.length === 0) {
      return null;
    }

    return result[0] as BlogPost;
  }

  // Create new post
  async createPost(postData: CreatePostData): Promise<BlogPost> {
    await this.ensureTableExists();

    const { title, content, excerpt, author, mood, tags } = postData;

    if (!title || !content) {
      throw new Error('Title and content are required');
    }

    const tagsArray = Array.isArray(tags) ? tags : (tags || []);

    const result = await sql`
      INSERT INTO blog_posts (title, content, excerpt, author, mood, tags)
      VALUES (${title}, ${content}, ${excerpt || null}, ${author || 'Anonymous'}, ${mood || null}, ${tagsArray})
      RETURNING *
    `;

    return result[0] as BlogPost;
  }

  // Update post
  async updatePost(id: string, postData: Partial<CreatePostData>): Promise<BlogPost> {
    await this.ensureTableExists();

    const { title, content, excerpt, author, mood, tags } = postData;
    const tagsArray = Array.isArray(tags) ? tags : undefined;

    // Get existing post first
    const existing = await this.getPostById(id);
    if (!existing) {
      throw new Error('Post not found');
    }

    // Update with provided fields or keep existing values
    const result = await sql`
      UPDATE blog_posts
      SET 
        title = ${title !== undefined ? title : existing.title},
        content = ${content !== undefined ? content : existing.content},
        excerpt = ${excerpt !== undefined ? excerpt : existing.excerpt || null},
        author = ${author !== undefined ? author : existing.author},
        mood = ${mood !== undefined ? mood : existing.mood || null},
        tags = ${tagsArray !== undefined ? tagsArray : existing.tags || []},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      throw new Error('Post not found');
    }

    return result[0] as BlogPost;
  }

  // Delete post (soft delete by setting published to false)
  async deletePost(id: string): Promise<void> {
    await this.ensureTableExists();

    const result = await sql`
      UPDATE blog_posts
      SET published = false, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING id
    `;

    if (result.length === 0) {
      throw new Error('Post not found');
    }
  }
}

export const postController = new PostController();

