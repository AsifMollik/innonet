import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import MessagesInterface from '@/components/MessagesInterface';

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
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />
      
      <div className="max-w-6xl mx-auto py-6 px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b">
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            <p className="text-gray-600 mt-1">Connect with entrepreneurs, investors, and mentors</p>
          </div>
          
          <MessagesInterface currentUser={user} />
        </div>
      </div>
    </div>
  );
}