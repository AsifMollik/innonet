import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

// GET - Fetch messages between two users
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const otherUserId = searchParams.get('userId');

    if (!otherUserId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get current user from cookie
    const cookieStore = cookies();
    const userId = cookieStore.get('userId')?.value;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Fetch messages between current user and other user
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: currentUser.id,
            receiverId: otherUserId,
          },
          {
            senderId: otherUserId,
            receiverId: currentUser.id,
          },
        ],
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Mark messages as read
    await prisma.message.updateMany({
      where: {
        senderId: otherUserId,
        receiverId: currentUser.id,
        read: false,
      },
      data: {
        read: true,
      },
    });

    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Send a new message
export async function POST(request: Request) {
  try {
    const { content, receiverId } = await request.json();

    if (!content || !receiverId) {
      return NextResponse.json(
        { error: 'Content and receiver ID are required' },
        { status: 400 }
      );
    }

    // Get current user from cookie
    const cookieStore = cookies();
    const userId = cookieStore.get('userId')?.value;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Create the message
    const message = await prisma.message.create({
      data: {
        content,
        senderId: currentUser.id,
        receiverId,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    return NextResponse.json({ message }, { status: 201 });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}