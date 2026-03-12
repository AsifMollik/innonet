import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { content, userId, isShared, originalPostId, shareText } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // For shared posts, we need originalPostId
    if (isShared && !originalPostId) {
      return NextResponse.json(
        { error: 'originalPostId is required for shared posts' },
        { status: 400 }
      );
    }

    // For regular posts, we need content
    if (!isShared && !content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        content: content || '',
        userId,
        images: [],
        isShared: isShared || false,
        originalPostId: originalPostId || null,
        shareText: shareText || null,
      },
      include: {
        user: true,
        originalPost: {
          include: {
            user: true,
            _count: {
              select: { likes: true, comments: true },
            },
          },
        },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
