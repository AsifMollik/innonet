import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import MessagesInterface from '@/components/MessagesInterface';
import MobileBottomNav from '@/components/MobileBottomNav';

async function getCurrentUser() {
  const cookieStore = cookies();
  const userId = cookieStore.get('userId')?.value;
  
  if (!userId) return null;
  
  return await prisma.user.findUnique({
    where: { id: userId },
  });
}

export default async function MessagesPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-900">
      <Navbar user={user} />
      
      <div className="w-full py-4 pb-20 lg:pb-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-sm border border-white/20 overflow-hidden">
            <div className="p-4 border-b border-white/20">
              <h1 className="text-xl sm:text-2xl font-bold text-white">Messages</h1>
              <p className="text-purple-300 mt-1 text-sm">Connect with entrepreneurs, investors, and mentors</p>
            </div>
            
            <MessagesInterface currentUser={user} />
          </div>
        </div>
      </div>

      <MobileBottomNav user={user} />
    </div>
  );
}