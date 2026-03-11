import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';
import ChatManager from '@/components/ChatManager';

async function getUser(username: string) {
  return await prisma.user.findUnique({
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

  // Allow viewing profiles without authentication, but with limited functionality
  return (
    <div className="min-h-screen bg-gray-50">
      {currentUser && <Navbar user={currentUser} />}
      
      {!currentUser && (
        <div className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">I</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900">Innonet</h1>
              </div>
              <div className="flex items-center gap-4">
                <a href="/auth/login" className="text-primary-600 hover:text-primary-700 font-medium">
                  Log in
                </a>
                <a href="/auth/signup" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-r from-primary-500 to-primary-600"></div>
          
          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="flex items-start justify-between -mt-16 mb-4">
              <div className="flex items-end gap-4">
                <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
                  <img 
                    src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D8ABC&color=fff&size=256`}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                    {user.verified && (
                      <span className="text-blue-500 text-xl">✓</span>
                    )}
                  </div>
                  <p className="text-gray-600">@{user.username}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                      {user.userType}
                    </span>
                  </div>
                </div>
              </div>
              
              {currentUser && currentUser.id !== user.id && (
                <div className="flex gap-2 mt-4">
                  <button className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition">
                    Connect
                  </button>
                  <button 
                    onClick={() => {
                      if (typeof window !== 'undefined' && (window as any).openChat) {
                        (window as any).openChat({
                          id: user.id,
                          name: user.name,
                          initial: user.name.charAt(0).toUpperCase(),
                          color: 'from-primary-400 to-primary-600',
                          online: true,
                          username: user.username
                        });
                      }
                    }}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                  >
                    Message
                  </button>
                </div>
              )}

              {!currentUser && (
                <div className="flex gap-2 mt-4">
                  <a href="/auth/signup" className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition">
                    Join to Connect
                  </a>
                </div>
              )}
            </div>

            {/* Bio */}
            {user.bio && (
              <div className="mb-4">
                <p className="text-gray-700 leading-relaxed">{user.bio}</p>
              </div>
            )}

            {/* Stats */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-900">{user._count.posts}</span>
                <span className="text-gray-600">Posts</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-900">{user._count.followers}</span>
                <span className="text-gray-600">Followers</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-900">{user._count.following}</span>
                <span className="text-gray-600">Following</span>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
              {user.location && (
                <div className="flex items-center gap-1">
                  <span>📍</span>
                  <span>{user.location}</span>
                </div>
              )}
              {user.website && (
                <div className="flex items-center gap-1">
                  <span>🔗</span>
                  <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">
                    {user.website}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-1">
                <span>📅</span>
                <span>Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Posts</h2>
          
          {user.posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
              <p className="text-gray-600">
                {currentUser && currentUser.id === user.id ? "Share your first post to get started!" : `${user.name} hasn't posted anything yet.`}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {user.posts.map((post) => (
                <PostCard key={post.id} post={post} currentUserId={currentUser?.id || ''} />
              ))}
            </div>
          )}
        </div>

        {/* Call to Action for Non-Authenticated Users */}
        {!currentUser && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Join the Community</h3>
            <p className="text-gray-600 mb-4">
              Connect with {user.name} and thousands of other entrepreneurs, investors, and mentors in Bangladesh.
            </p>
            <div className="flex gap-4 justify-center">
              <a href="/auth/signup" className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition">
                Sign Up Free
              </a>
              <a href="/auth/login" className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition">
                Log In
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Chat Manager for Facebook-style chat windows */}
      {currentUser && <ChatManager currentUser={currentUser} />}
    </div>
  );
}