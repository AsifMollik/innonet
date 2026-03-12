import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { postId, userId } = await req.json();

    if (!postId || !userId) {
      return NextResponse.json(
        { error: 'Post ID and User ID are required' },
        { status: 400 }
      );
    }

    // Check if user already liked the post
    const existingLike = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    if (existingLike) {
      // Unlike the post
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });

      return NextResponse.json({ message: 'Post unliked', liked: false });
    } else {
      // Like the post
      await prisma.like.create({
        data: {
          postId,
          userId,
        },
      });

      return NextResponse.json({ message: 'Post liked', liked: true });
    }
  } catch (error) {
    console.error('Like error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}