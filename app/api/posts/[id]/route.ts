// Backend API Routes - Single post handlers
import { NextRequest, NextResponse } from 'next/server';
import { postController } from '@/server/controllers/postController';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await postController.getPostById(id);

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ post });
  } catch (error: any) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch post',
        details: error?.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const post = await postController.updatePost(id, body);
    return NextResponse.json({ post });
  } catch (error: any) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update post',
        details: error?.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await postController.deletePost(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { 
        error: 'Failed to delete post',
        details: error?.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}

