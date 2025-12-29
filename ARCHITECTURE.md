# Architecture Documentation

## Frontend/Backend Separation

This project follows a clear separation between frontend and backend concerns.

## Frontend (`app/`, `components/`, `services/`)

### Pages (`app/`)
- **`app/page.tsx`** - Home page displaying timeline of posts
- **`app/posts/[id]/page.tsx`** - Individual post detail page
- **`app/posts/new/page.tsx`** - Create new post form

### Components (`components/`)
- **`components/TimelinePost.tsx`** - Reusable timeline post card component

### Services (`services/`)
- **`services/api.ts`** - Frontend API client service
  - Handles all HTTP requests to backend
  - Provides typed methods for API calls
  - Used by frontend pages and components

### Usage Example (Frontend)
```typescript
import { apiService } from '@/services/api';

// In a React component or page
const posts = await apiService.getPosts();
const post = await apiService.getPost('1');
await apiService.createPost({ title, content });
```

## Backend (`app/api/`, `server/`)

### API Routes (`app/api/`)
- **`app/api/posts/route.ts`** - HTTP handlers for posts collection
  - `GET /api/posts` - List all posts
  - `POST /api/posts` - Create new post
- **`app/api/posts/[id]/route.ts`** - HTTP handlers for single post
  - `GET /api/posts/[id]` - Get single post
  - `PUT /api/posts/[id]` - Update post
  - `DELETE /api/posts/[id]` - Delete post

### Controllers (`server/controllers/`)
- **`server/controllers/postController.ts`** - Business logic layer
  - `getAllPosts()` - Fetch all posts from database
  - `getPostById()` - Fetch single post
  - `createPost()` - Create new post
  - `updatePost()` - Update existing post
  - `deletePost()` - Soft delete post

### Usage Example (Backend)
```typescript
import { postController } from '@/server/controllers/postController';

// In API route handler
const posts = await postController.getAllPosts(limit, offset);
const post = await postController.createPost(postData);
```

## Shared (`lib/`, `types/`)

### Database (`lib/`)
- **`lib/db.ts`** - Database connection (used by backend)
  - Neon PostgreSQL connection
  - Exported `sql` function for queries

### Types (`types/`)
- **`types/blog.ts`** - Shared TypeScript interfaces
  - `BlogPost` - Post data structure
  - `CreatePostData` - Post creation payload

## Data Flow

```
Frontend (React Component)
    ↓
services/api.ts (API Client)
    ↓
HTTP Request
    ↓
app/api/posts/route.ts (API Route Handler)
    ↓
server/controllers/postController.ts (Business Logic)
    ↓
lib/db.ts (Database Connection)
    ↓
Neon PostgreSQL Database
```

## Benefits of This Architecture

1. **Separation of Concerns**: Frontend and backend logic are clearly separated
2. **Reusability**: Controllers can be reused across different API routes
3. **Testability**: Each layer can be tested independently
4. **Maintainability**: Clear structure makes code easier to maintain
5. **Type Safety**: Shared types ensure consistency between frontend and backend

