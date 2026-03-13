'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, MessageCircle, Bell, User } from 'lucide-react';

interface MobileBottomNavProps {
  user: any;
}

export default function MobileBottomNav({ user }: MobileBottomNavProps) {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/feed',
      icon: Home,
      label: 'Home',
      isActive: pathname === '/feed'
    },
    {
      href: '/search',
      icon: Search,
      label: 'Search',
      isActive: pathname === '/search'
    },
    {
      href: '/messages',
      icon: MessageCircle,
      label: 'Messages',
      isActive: pathname === '/messages',
      hasNotification: false
    },
    {
      href: '/notifications',
      icon: Bell,
      label: 'Alerts',
      isActive: pathname === '/notifications',
      hasNotification: false
    },
    {
      href: `/profile/${user?.username || user?.id || ''}`,
      icon: User,
      label: 'Profile',
      isActive: pathname.includes('/profile')
    }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/90 to-black/80 backdrop-blur-xl border-t border-white/10 z-50 safe-area-bottom shadow-2xl">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 p-2 transition-all duration-300 relative touch-manipulation min-w-[60px] ${
                item.isActive
                  ? 'text-pink-400 scale-110'
                  : 'text-purple-300 hover:text-white hover:scale-105'
              }`}
              style={{
                animationDelay: `${index * 50}ms`
              }}
            >
              {/* Active indicator bar at top */}
              {item.isActive && (
                <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse"></div>
              )}
              
              {/* Icon with background glow when active */}
              <div className={`relative transition-all duration-300 ${
                item.isActive ? 'transform scale-110' : ''
              }`}>
                {item.isActive && (
                  <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-lg animate-pulse"></div>
                )}
                <Icon 
                  size={24} 
                  className={`relative z-10 transition-all duration-300 ${
                    item.isActive ? 'stroke-[2.5]' : 'stroke-[2]'
                  }`}
                />
                {item.hasNotification && !item.isActive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full animate-ping"></span>
                )}
                {item.hasNotification && !item.isActive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
                )}
              </div>
              
              {/* Label */}
              <span className={`text-xs font-medium transition-all duration-300 ${
                item.isActive ? 'font-bold' : 'font-normal'
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}