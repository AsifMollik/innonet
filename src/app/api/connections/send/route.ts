import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { receiverId } = await req.json();

    if (!receiverId) {
      return NextResponse.json(
        { error: 'Missing receiver ID' },
        { status: 400 }
      );
    }

    // Get current user from cookie
    const cookieStore = cookies();
    const userCookie = cookieStore.get('user');
    
    if (!userCookie) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const currentUser = JSON.parse(userCookie.value);

    // Check if request already exists
    const existingRequest = await prisma.connectionRequest.findUnique({
      where: {
        senderId_receiverId: {
          senderId: currentUser.id,
          receiverId: receiverId,
        },
      },
    });

    if (existingRequest) {
      return NextResponse.json(
        { error: 'Connection request already sent' },
        { status: 400 }
      );
    }

    // Check if already following
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUser.id,
          followingId: receiverId,
        },
      },
    });

    if (existingFollow) {
      return NextResponse.json(
        { error: 'Already connected' },
        { status: 400 }
      );
    }

    // Create connection request
    const connectionRequest = await prisma.connectionRequest.create({
      data: {
        senderId: currentUser.id,
        receiverId: receiverId,
        status: 'PENDING',
      },
    });

    return NextResponse.json({ 
      success: true, 
      request: connectionRequest 
    }, { status: 201 });
  } catch (error) {
    console.error('Error sending connection request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
