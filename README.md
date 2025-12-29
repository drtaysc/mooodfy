# Mooodfy - Timeline Journal

A moody, dark-themed timeline journaling platform with clear frontend/backend separation.

## Project Structure

```
moodieweb/
├── app/                    # Frontend - Next.js Pages & Routes
│   ├── api/               # Backend - API Routes (Next.js API)
│   │   └── posts/        # Post API endpoints
│   ├── posts/            # Frontend - Post pages
│   ├── page.tsx          # Frontend - Home page
│   └── layout.tsx        # Frontend - Root layout
│
├── components/           # Frontend - React Components
│   └── TimelinePost.tsx  # Timeline post card component
│
├── server/               # Backend - Business Logic
│   └── controllers/      # Backend controllers
│       └── postController.ts
│
├── services/             # Frontend - API Client Services
│   └── api.ts           # API service for frontend
│
├── lib/                  # Shared - Database & Utilities
│   └── db.ts            # Database connection
│
├── types/                # Shared - TypeScript Types
│   └── blog.ts          # Blog post types
│
└── scripts/             # Utility Scripts
    └── init-db.ts       # Database initialization
```

## Architecture

### Frontend (`app/`, `components/`, `services/`)
- **Pages**: Next.js pages for UI (`app/page.tsx`, `app/posts/`)
- **Components**: Reusable React components (`components/`)
- **Services**: API client services (`services/api.ts`)
- **Styling**: Tailwind CSS with moody dark theme

### Backend (`app/api/`, `server/`)
- **API Routes**: Next.js API routes (`app/api/posts/`)
- **Controllers**: Business logic (`server/controllers/`)
- **Database**: Neon PostgreSQL connection (`lib/db.ts`)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create `.env.local`:

```env
DATABASE_URL=postgresql://neondb_owner:npg_F9Q5wluvPezT@ep-soft-art-ade1lztn-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

### 3. Initialize Database

```bash
npm run init-db
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## API Endpoints

### Backend API (`/api/posts`)

- `GET /api/posts` - Get all posts
  - Query params: `limit`, `offset`
- `POST /api/posts` - Create new post
- `GET /api/posts/[id]` - Get single post
- `PUT /api/posts/[id]` - Update post
- `DELETE /api/posts/[id]` - Delete post (soft delete)

## Frontend Usage

### Using API Service

```typescript
import { apiService } from '@/services/api';

// Get all posts
const posts = await apiService.getPosts(20, 0);

// Get single post
const post = await apiService.getPost('1');

// Create post
const newPost = await apiService.createPost({
  title: 'My Post',
  content: 'Content here',
  mood: 'Happy',
  tags: ['life', 'thoughts']
});
```

## Design

- **Theme**: Moody dark theme with purple/pink accents
- **Typography**: Big, bold fonts
- **Layout**: Organic rounded corners, soft shadows
- **Colors**: Dark backgrounds (#0f0f0f) with purple/pink gradients

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Neon PostgreSQL
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Fonts**: Geist Sans & Geist Mono

## License

MIT
