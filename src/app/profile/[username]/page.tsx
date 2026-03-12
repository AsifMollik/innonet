import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import Navbar from '@/components/Navbar';
import ChatManager from '@/components/ChatManager';
import ProfileActions from '@/components/ProfileActions';
import ProfileTabs from '@/components/ProfileTabs';

async function getUser(username: string) {
  const decodedUsername = decodeURIComponent(username);
  
  let user = await prisma.user.findUnique({
    where: { username: decodedUsername },
    include: {
      posts: {
        include: {
          user: true,
          _count: {
            select: { likes: true, comments: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
      _count: {
        select: {
          followers: true,
          following: true,
          posts: true,
        },
      },
    },
  });

  if (!user) {
    user = await prisma.user.findUnique({
      where: { username },
      include: {
        posts: {
          include: {
            user: true,
            _count: {
              select: { likes: true, comments: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: {
            followers: true,
            following: true,
            posts: true,
          },
        },
      },
    });
  }

  if (!user) {
    user = await prisma.user.findUnique({
      where: { id: username },
      include: {
        posts: {
          include: {
            user: true,
            _count: {
              select: { likes: true, comments: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: {
            followers: true,
            following: true,
            posts: true,
          },
        },
      },
    });
  }

  return user;
}

async function getCurrentUser() {
  const cookieStore = cookies();
  const userId = cookieStore.get('userId')?.value;
  
  if (!userId) return null;
  
  return await prisma.user.findUnique({
    where: { id: userId },
  });
}

export default async function ProfilePage({ params }: { params: { username: string } }) {
  const user = await getUser(params.username);
  const currentUser = await getCurrentUser();

  if (!user) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentUser && <Navbar user={currentUser} />}
      
      <div className="w-full">
        {/* Full-width Profile Header */}
        <div className="bg-white border-b border-gray-200">
          {/* Cover Image - Full Width */}
          <div className="h-64 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
          
          {/* Profile Info Container */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-8">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-6">
                  {/* Profile Picture */}
                  <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-xl flex-shrink-0">
                    <img 
                      src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D8ABC&color=fff&size=256`}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Name and Basic Info */}
                  <div className="flex-1 pt-2">
                    <div className="flex items-center gap-3 mb-1">
                      <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                      {user.verified && (
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 text-lg mb-3">@{user.username}</p>
                    <div className="mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {user.userType.replace('_', ' ')}
                      </span>
                    </div>
                    
                    {/* Stats - Aligned with profile info */}
                    <div className="flex items-center gap-8 mb-4">
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-gray-900 text-xl">{user._count.posts}</span>
                        <span className="text-gray-600">Posts</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-gray-900 text-xl">{user._count.followers}</span>
                        <span className="text-gray-600">Followers</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-gray-900 text-xl">{user._count.following}</span>
                        <span className="text-gray-600">Following</span>
                      </div>
                    </div>
                    
                    {/* Additional Info */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                      {user.location && (
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {user.location}
                        </span>
                      )}
                      {user.website && (
                        <a href={user.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.499-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.499.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.497-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                          </svg>
                          Website
                        </a>
                      )}
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons - Aligned to top right */}
                <div className="flex gap-3 pt-2">
                  <ProfileActions user={user} currentUser={currentUser} />
                </div>
              </div>
              
              {/* Bio - Full width below profile info */}
              {user.bio && (
                <div className="mt-6 pl-38">
                  <p className="text-gray-700 leading-relaxed text-lg max-w-3xl">{user.bio}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs and Content */}
        <ProfileTabs user={user} currentUser={currentUser} />

        {/* Call to Action for Non-Authenticated Users */}
        {!currentUser && (
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h3 className="text-3xl font-bold text-white mb-4">Join the Entrepreneur Community</h3>
              <p className="text-blue-100 mb-8 text-xl max-w-2xl mx-auto">
                Connect with {user.name} and thousands of other entrepreneurs, investors, and mentors building the future of Bangladesh.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/auth/signup" className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl">
                  Join Free Today
                </a>
                <a href="/auth/login" className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-200">
                  Sign In
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {currentUser && <ChatManager currentUser={currentUser} />}
    </div>
  );
}