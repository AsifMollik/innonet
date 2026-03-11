import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function GET() {
  try {
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

    // Fetch pending connection requests for the current user
    const requests = await prisma.connectionRequest.findMany({
      where: {
        receiverId: currentUser.id,
        status: 'PENDING',
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            username: true,
            userType: true,
            avatar: true,
            followers: {
              where: {
                followerId: currentUser.id,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Format the response
    const formattedRequests = requests.map((req) => ({
      id: req.id,
      senderId: req.sender.id,
      name: req.sender.name,
      username: req.sender.username,
      role: req.sender.userType,
      avatar: req.sender.avatar,
      mutual: Math.floor(Math.random() * 10), // TODO: Calculate real mutual connections
      createdAt: req.createdAt,
    }));

    return NextResponse.json({ requests: formattedRequests }, { status: 200 });
  } catch (error) {
    console.error('Error fetching connection requests:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
