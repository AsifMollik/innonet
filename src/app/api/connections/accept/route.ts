import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { requestId } = await req.json();

    if (!requestId) {
      return NextResponse.json(
        { error: 'Missing request ID' },
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

    // Find the connection request
    const connectionRequest = await prisma.connectionRequest.findUnique({
      where: { id: requestId },
    });

    if (!connectionRequest) {
      return NextResponse.json(
        { error: 'Connection request not found' },
        { status: 404 }
      );
    }

    // Verify the request is for the current user
    if (connectionRequest.receiverId !== currentUser.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Update request status to ACCEPTED and create follow relationship
    const [updatedRequest, follow] = await prisma.$transaction([
      prisma.connectionRequest.update({
        where: { id: requestId },
        data: { status: 'ACCEPTED' },
      }),
      prisma.follow.create({
        data: {
          followerId: connectionRequest.senderId,
          followingId: currentUser.id,
        },
      }),
    ]);

    return NextResponse.json({ 
      success: true, 
      request: updatedRequest,
      follow 
    }, { status: 200 });
  } catch (error) {
    console.error('Error accepting connection:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
