import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

// Get database connection string
const databaseUrl = process.env.DATABASE_URL || 
  'postgresql://neondb_owner:npg_F9Q5wluvPezT@ep-soft-art-ade1lztn-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const sql = neon(databaseUrl);

async function initDatabase() {
  try {
    console.log('Initializing database...');
    
    // Check if table exists
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'blog_posts'
      )
    `;
    
    if (!tableExists[0]?.exists) {
      console.log('Creating blog_posts table...');
      // 创建博客文章表
      await sql`
        CREATE TABLE blog_posts (
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
      console.log('Table created successfully!');
    } else {
      console.log('Table already exists, checking and adding missing columns...');
      
      // Check and add all required columns
      const columnsToCheck = [
        { name: 'excerpt', type: 'TEXT' },
        { name: 'published', type: 'BOOLEAN DEFAULT true' },
        { name: 'mood', type: 'VARCHAR(50)' },
        { name: 'tags', type: 'TEXT[]' },
        { name: 'author', type: 'VARCHAR(100) DEFAULT \'Anonymous\'' },
        { name: 'created_at', type: 'TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP' },
        { name: 'updated_at', type: 'TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP' },
      ];

      for (const col of columnsToCheck) {
        const columnExists = await sql`
          SELECT EXISTS (
            SELECT FROM information_schema.columns 
            WHERE table_schema = 'public' 
            AND table_name = 'blog_posts' 
            AND column_name = ${col.name}
          )
        `;
        
        if (!columnExists[0]?.exists) {
          console.log(`Adding missing column: ${col.name}...`);
          try {
            if (col.name === 'excerpt') {
              await sql`ALTER TABLE blog_posts ADD COLUMN excerpt TEXT`;
            } else if (col.name === 'published') {
              await sql`ALTER TABLE blog_posts ADD COLUMN published BOOLEAN DEFAULT true`;
            } else if (col.name === 'mood') {
              await sql`ALTER TABLE blog_posts ADD COLUMN mood VARCHAR(50)`;
            } else if (col.name === 'tags') {
              await sql`ALTER TABLE blog_posts ADD COLUMN tags TEXT[]`;
            } else if (col.name === 'author') {
              await sql`ALTER TABLE blog_posts ADD COLUMN author VARCHAR(100) DEFAULT 'Anonymous'`;
            } else if (col.name === 'created_at') {
              await sql`ALTER TABLE blog_posts ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP`;
            } else if (col.name === 'updated_at') {
              await sql`ALTER TABLE blog_posts ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP`;
            }
          } catch (e: any) {
            console.log(`Error adding column ${col.name}:`, e.message);
          }
        }
      }
    }
    
    // 创建索引
    try {
      await sql`
        CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC)
      `;
    } catch (e: any) {
      console.log('Index might already exist:', e.message);
    }
    
    try {
      await sql`
        CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published)
      `;
    } catch (e: any) {
      console.log('Index might already exist:', e.message);
    }
    
    console.log('Database initialized successfully!');
  } catch (error: any) {
    console.error('Database initialization failed:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  }
}

initDatabase();

