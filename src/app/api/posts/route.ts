import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { content, userId } = await req.json();

    if (!content || !userId) {
      return NextResponse.json(
        { error: 'Content and userId are required' },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        content,
        userId,
        images: [],
      },
      include: {
        user: true,
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
