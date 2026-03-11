import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

// GET - Fetch all conversations for the current user
export async function GET() {
  try {
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

    // Get all conversations (users who have exchanged messages with current user)
    const conversations = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: currentUser.id },
          { receiverId: currentUser.id },
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
        createdAt: 'desc',
      },
    });

    // Group by conversation partner and get latest message
    const conversationMap = new Map();
    
    conversations.forEach((message) => {
      const partnerId = message.senderId === currentUser.id ? message.receiverId : message.senderId;
      const partner = message.senderId === currentUser.id ? message.receiver : message.sender;
      
      if (!conversationMap.has(partnerId)) {
        conversationMap.set(partnerId, {
          partner,
          lastMessage: message,
          unreadCount: 0,
        });
      }
      
      // Count unread messages
      if (message.receiverId === currentUser.id && !message.read) {
        conversationMap.get(partnerId).unreadCount++;
      }
    });

    const conversationList = Array.from(conversationMap.values());

    return NextResponse.json({ conversations: conversationList }, { status: 200 });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}