import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import CreatePost from '@/components/CreatePost';
import PostCard from '@/components/PostCard';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import Navbar from '@/components/Navbar';
import FeedFilters from '@/components/FeedFilters';
import ChatManager from '@/components/ChatManager';

async function getPosts() {
  return await prisma.post.findMany({
    include: {
      user: true,
      originalPost: {
        include: {
          user: true,
          _count: {
            select: { likes: true, comments: true },
          },
        },
      },
      _count: {
        select: { likes: true, comments: true },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 20,
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

export default async function Feed() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/auth/login');
  }

  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />

      <div className="w-full py-4">
        <div className="flex justify-center">
          <div className="w-full max-w-[1920px] grid grid-cols-1 lg:grid-cols-12 gap-4 xl:gap-6">
            {/* Left Sidebar */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="fixed w-[260px] xl:w-[300px] 2xl:w-[340px] pl-4 xl:pl-6 overflow-y-auto h-[calc(100vh-80px)]">
                <Sidebar user={user} />
              </div>
            </div>

            {/* Main Feed - Centered */}
            <div className="lg:col-span-6 px-4 sm:px-6 lg:px-0">
              <div className="max-w-[600px] xl:max-w-[680px] mx-auto">
                <FeedFilters />
                <div className="mt-4">
                  <CreatePost userId={user.id} />
                </div>
                
                <div className="mt-4 space-y-4 pb-8">
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} currentUserId={user.id} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="fixed w-[260px] xl:w-[300px] 2xl:w-[340px] pr-4 xl:pr-6 overflow-y-auto h-[calc(100vh-80px)]">
                <RightSidebar currentUser={user} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Manager for Facebook-style chat windows */}
      <ChatManager currentUser={user} />
    </div>
  );
}
