import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ results: [] });
    }

    const searchTerm = query.trim().toLowerCase();

    // Search users - using contains for better search results
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { username: { contains: searchTerm, mode: 'insensitive' } },
          { email: { contains: searchTerm, mode: 'insensitive' } },
          { bio: { contains: searchTerm, mode: 'insensitive' } },
          { location: { contains: searchTerm, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        name: true,
        username: true,
        userType: true,
        bio: true,
        avatar: true,
        verified: true,
        location: true,
        _count: {
          select: {
            followers: true,
            following: true,
            posts: true,
          },
        },
      },
      take: 8,
    });

    // Search posts
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          { content: { contains: searchTerm, mode: 'insensitive' } },
          { user: { name: { contains: searchTerm, mode: 'insensitive' } } },
          { user: { username: { contains: searchTerm, mode: 'insensitive' } } },
        ],
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            userType: true,
            avatar: true,
            verified: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 8,
    });

    // Generate AI-like contextual response
    const generateContextualResponse = (query: string, users: any[], posts: any[]) => {
      const lowerQuery = query.toLowerCase();
      
      // Check if searching for a specific person
      if (users.length > 0) {
        const user = users[0];
        if (lowerQuery.includes(user.name.toLowerCase()) || lowerQuery.includes(user.username.toLowerCase())) {
          return {
            type: 'profile',
            title: `Found ${user.name}`,
            description: `${user.name} (@${user.username}) is a ${user.userType.toLowerCase()} on Uddoktanet. ${user.bio || 'No bio available.'} They have ${user._count.followers} followers and ${user._count.posts} posts.`,
            user: user,
          };
        }
      }

      // Check for entrepreneurship-related queries
      const entrepreneurshipTerms = {
        'startup': 'Startups are the backbone of innovation. Connect with founders, investors, and mentors to build the next big thing.',
        'business': 'Business development requires strategy, networking, and execution. Find partners and advisors in our community.',
        'entrepreneur': 'Entrepreneurs drive change and create value. Join our community of innovators and changemakers.',
        'funding': 'Funding is crucial for startup growth. Connect with investors and learn about different funding stages.',
        'investor': 'Investors provide capital and expertise to startups. Find angel investors and VCs in our network.',
        'mentor': 'Mentors guide entrepreneurs with experience and wisdom. Connect with industry experts and advisors.',
        'innovation': 'Innovation transforms ideas into reality. Share your innovative projects and get feedback.',
        'idea': 'Great ideas need execution and support. Share your concepts and find co-founders or collaborators.',
        'fintech': 'Financial technology is revolutionizing banking and payments. Connect with fintech entrepreneurs.',
        'edtech': 'Education technology makes learning accessible. Join educators and edtech innovators.',
        'healthtech': 'Health technology improves healthcare delivery. Connect with healthcare innovators.',
        'ai': 'Artificial Intelligence is transforming industries. Join AI researchers and entrepreneurs.',
        'bangladesh': 'Bangladesh has a thriving startup ecosystem. Connect with local entrepreneurs and investors.'
      };

      const matchedTerm = Object.keys(entrepreneurshipTerms).find(term => lowerQuery.includes(term));
      
      if (matchedTerm) {
        return {
          type: 'topic',
          title: `About ${matchedTerm.charAt(0).toUpperCase() + matchedTerm.slice(1)}`,
          description: entrepreneurshipTerms[matchedTerm as keyof typeof entrepreneurshipTerms],
        };
      }

      // Check if searching for content/posts
      if (posts.length > 0) {
        return {
          type: 'content',
          title: `Found ${posts.length} posts about "${query}"`,
          description: `Here are recent posts and discussions related to "${query}" from the Uddoktanet community. Click on any post to view the author's profile.`,
          posts: posts.slice(0, 3),
        };
      }

      // General search response
      if (users.length > 0 || posts.length > 0) {
        return {
          type: 'general',
          title: `Search results for "${query}"`,
          description: `Found ${users.length} ${users.length === 1 ? 'person' : 'people'} and ${posts.length} ${posts.length === 1 ? 'post' : 'posts'} related to your search. Click on any result to learn more.`,
        };
      }

      // No results
      return {
        type: 'no_results',
        title: `No results found for "${query}"`,
        description: `Try searching for entrepreneurs, startups, investors, mentors, or topics like "funding", "innovation", or "startup". You can also search by name or username.`,
      };
    };

    const aiResponse = generateContextualResponse(searchTerm, users, posts);

    return NextResponse.json({
      query: searchTerm,
      aiResponse,
      results: {
        users,
        posts,
      },
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}