import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import MobileBottomNav from '@/components/MobileBottomNav';
import NotificationsClient from '@/components/NotificationsClient';

async function getCurrentUser() {
  const cookieStore = cookies();
  const userId = cookieStore.get('userId')?.value;
  if (!userId) return null;
  return await prisma.user.findUnique({ where: { id: userId } });
}

export default async function NotificationsPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/auth/login');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-900">
      <Navbar user={user} />
      <div className="animate-slide-up">
        <NotificationsClient currentUser={user} />
      </div>
      <MobileBottomNav user={user} />
    </div>
  );
}
