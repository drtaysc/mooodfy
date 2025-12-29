import { neon } from '@neondatabase/serverless';

// 获取数据库连接字符串，如果没有设置则使用默认值
const databaseUrl = process.env.DATABASE_URL || 
  'postgresql://neondb_owner:npg_F9Q5wluvPezT@ep-soft-art-ade1lztn-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const sql = neon(databaseUrl);

export { sql };

