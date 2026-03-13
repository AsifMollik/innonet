import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import MobileBottomNav from '@/components/MobileBottomNav';
import SearchPageClient from '@/components/SearchPageClient';

async function getCurrentUser() {
  const cookieStore = cookies();
  const userId = cookieStore.get('userId')?.value;
  if (!userId) return null;
  return await prisma.user.findUnique({ where: { id: userId } });
}

async function getAllUsers() {
  return await prisma.user.findMany({
    select: { id: true, name: true, username: true, userType: true, location: true, avatar: true },
    take: 50,
    orderBy: { createdAt: 'desc' },
  });
}

export default async function SearchPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/auth/login');
  const allUsers = await getAllUsers();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-900">
      <Navbar user={user} />
      <div className="animate-slide-up">
        <SearchPageClient currentUser={user} allUsers={allUsers} />
      </div>
      <MobileBottomNav user={user} />
    </div>
  );
}
