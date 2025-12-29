# Vercel Deployment Guide

## Environment Variables

To deploy Mooodfy to Vercel, you need to set the following environment variable:

### Required Environment Variable

**`DATABASE_URL`**
- Your Neon PostgreSQL database connection string
- Format: `postgresql://user:password@host/database?sslmode=require`
- Set this in Vercel: Project Settings → Environment Variables

### How to Set Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Click on **Settings**
3. Navigate to **Environment Variables**
4. Click **Add New**
5. Add:
   - **Name**: `DATABASE_URL`
   - **Value**: Your Neon database connection string
   - **Environment**: Select all (Production, Preview, Development)
6. Click **Save**

## Database Connection

The application uses Neon PostgreSQL database. Make sure:

1. Your Neon database is running and accessible
2. The `DATABASE_URL` is correctly set in Vercel
3. The database has the required tables (run `npm run init-db` if needed)
4. You have seeded some posts (run `npm run seed-posts` if needed)

## Troubleshooting

### No Posts Showing After Deployment

1. **Check Environment Variables**: Ensure `DATABASE_URL` is set correctly in Vercel
2. **Verify Database Connection**: Check Vercel logs for database connection errors
3. **Check Database Tables**: Make sure tables exist in your database
4. **Seed Posts**: Run the seed script to add sample posts

### Build Errors

- Ensure all environment variables are set before building
- Check that the database is accessible from Vercel's servers
- Review build logs for specific error messages

## Local Development

For local development, create a `.env.local` file:

```env
DATABASE_URL=your_neon_database_connection_string
```

Then run:
```bash
npm run dev
```

