import { neon } from '@neondatabase/serverless';

// Get database connection string from environment variable
// In Vercel, set DATABASE_URL in Environment Variables
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    'DATABASE_URL environment variable is not set. ' +
    'Please set it in your Vercel project settings under Environment Variables.'
  );
}

// Create Neon database connection
const sql = neon(databaseUrl);

export { sql };

