import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

// Get database connection string
const databaseUrl = process.env.DATABASE_URL || 
  'postgresql://neondb_owner:npg_F9Q5wluvPezT@ep-soft-art-ade1lztn-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const sql = neon(databaseUrl);

async function createAdminUser() {
  try {
    console.log('Creating admin user...');
    
    // 检查 users 表是否存在
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      )
    `;
    
    if (!tableExists[0]?.exists) {
      console.log('Creating users table...');
      await sql`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          role VARCHAR(20) DEFAULT 'admin',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `;
      
      await sql`
        CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)
      `;
      
      await sql`
        CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)
      `;
      
      console.log('Users table created successfully!');
    } else {
      console.log('Users table already exists, checking and adding missing columns...');
      
      // 检查并添加缺失的列
      const columnsToCheck = [
        { name: 'email', type: 'VARCHAR(255) UNIQUE NOT NULL' },
        { name: 'password_hash', type: 'VARCHAR(255) NOT NULL' },
        { name: 'role', type: 'VARCHAR(20) DEFAULT \'admin\'' },
        { name: 'created_at', type: 'TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP' },
        { name: 'updated_at', type: 'TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP' },
      ];

      for (const col of columnsToCheck) {
        const columnExists = await sql`
          SELECT EXISTS (
            SELECT FROM information_schema.columns 
            WHERE table_schema = 'public' 
            AND table_name = 'users' 
            AND column_name = ${col.name}
          )
        `;
        
        if (!columnExists[0]?.exists) {
          console.log(`Adding missing column: ${col.name}...`);
          try {
            if (col.name === 'email') {
              await sql`ALTER TABLE users ADD COLUMN email VARCHAR(255) UNIQUE NOT NULL`;
            } else if (col.name === 'password_hash') {
              await sql`ALTER TABLE users ADD COLUMN password_hash VARCHAR(255) NOT NULL`;
            } else if (col.name === 'role') {
              await sql`ALTER TABLE users ADD COLUMN role VARCHAR(20) DEFAULT 'admin'`;
            } else if (col.name === 'created_at') {
              await sql`ALTER TABLE users ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP`;
            } else if (col.name === 'updated_at') {
              await sql`ALTER TABLE users ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP`;
            }
          } catch (e: any) {
            console.log(`Error adding column ${col.name}:`, e.message);
          }
        }
      }
      
      // 检查 users 表的 id 列类型
      const idColumnType = await sql`
        SELECT data_type 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'users' 
        AND column_name = 'id'
      `;
      console.log('Users table id column type:', idColumnType[0]?.data_type);
    }
    
    // 检查 sessions 表是否存在，如果存在则删除
    const sessionsTableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'sessions'
      )
    `;
    
    if (sessionsTableExists[0]?.exists) {
      console.log('Dropping existing sessions table...');
      await sql`DROP TABLE IF EXISTS sessions CASCADE`;
    }
    
    // 检查 users 表的 id 类型
    const idColumnType = await sql`
      SELECT data_type 
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'users' 
      AND column_name = 'id'
    `;
    
    const userIdType = idColumnType[0]?.data_type === 'uuid' ? 'UUID' : 'INTEGER';
    console.log(`Using ${userIdType} for user_id in sessions table`);
    
    console.log('Creating sessions table...');
    if (userIdType === 'UUID') {
      await sql`
        CREATE TABLE sessions (
          id SERIAL PRIMARY KEY,
          user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          session_token VARCHAR(255) UNIQUE NOT NULL,
          expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `;
    } else {
      await sql`
        CREATE TABLE sessions (
          id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          session_token VARCHAR(255) UNIQUE NOT NULL,
          expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `;
    }
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(session_token)
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id)
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at)
    `;
    
    console.log('Sessions table created successfully!');
    
    // 检查管理员是否已存在
    const existingUser = await sql`
      SELECT id, email FROM users WHERE email = 'drkelvintaysc@gmail.com'
    `;
    
    if (existingUser.length > 0) {
      console.log('Admin user already exists. Updating password...');
      const passwordHash = await bcrypt.hash('greenm00n', 10);
      await sql`
        UPDATE users 
        SET password_hash = ${passwordHash}, updated_at = CURRENT_TIMESTAMP
        WHERE email = 'drkelvintaysc@gmail.com'
      `;
      console.log('Admin password updated successfully!');
    } else {
      // 创建管理员账户
      const passwordHash = await bcrypt.hash('greenm00n', 10);
      await sql`
        INSERT INTO users (email, password_hash, role)
        VALUES ('drkelvintaysc@gmail.com', ${passwordHash}, 'admin')
      `;
      console.log('Admin user created successfully!');
    }
    
    console.log('Admin user setup completed!');
    console.log('Email: drkelvintaysc@gmail.com');
    console.log('Password: greenm00n');
  } catch (error: any) {
    console.error('Failed to create admin user:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  }
}

createAdminUser();

