'use client';

import { useState } from 'react';
import { Bell, Heart, MessageCircle, UserPlus, AtSign, Check } from 'lucide-react';
import Link from 'next/link';

interface NotificationsClientProps {
  currentUser: any;
}

const mockNotifications = [
  {
    id: 1,
    type: 'like',
    user: { name: 'Karim Hassan', username: 'karimhassan', initial: 'K', color: 'from-purple-500 to-pink-500' },
    message: 'liked your post',
    preview: '"Excited to share our new product launch..."',
    time: '2 min ago',
    unread: true,
  },
  {
    id: 2,
    type: 'comment',
    user: { name: 'Sarah Khan', username: 'sarahkhan', initial: 'S', color: 'from-blue-400 to-blue-600' },
    message: 'commented on your post',
    preview: '"Great insights! Would love to connect."',
    time: '15 min ago',
    unread: true,
  },
  {
    id: 3,
    type: 'follow',
    user: { name: 'Rafiq Ahmed', username: 'rafiqahmed', initial: 'R', color: 'from-green-400 to-green-600' },
    message: 'started following you',
    preview: null,
    time: '1 hour ago',
    unread: true,
  },
  {
    id: 4,
    type: 'mention',
    user: { name: 'Maya Ventures', username: 'mayachowdhury', initial: 'M', color: 'from-pink-400 to-pink-600' },
    message: 'mentioned you in a post',
    preview: '"@you should check this out!"',
    time: '3 hours ago',
    unread: false,
  },
  {
    id: 5,
    type: 'like',
    user: { name: 'Nadia Rahman', username: 'nadiarahman', initial: 'N', color: 'from-amber-400 to-amber-600' },
    message: 'liked your post',
    preview: '"Looking for co-founders..."',
    time: '5 hours ago',
    unread: false,
  },
  {
    id: 6,
    type: 'follow',
    user: { name: 'Ahmed Ali', username: 'ahmedali', initial: 'A', color: 'from-cyan-400 to-cyan-600' },
    message: 'started following you',
    preview: null,
    time: '1 day ago',
    unread: false,
  },
];

const typeConfig: any = {
  like: { icon: Heart, color: 'text-pink-400', bg: 'bg-pink-500/20', label: 'Liked your post' },
  comment: { icon: MessageCircle, color: 'text-blue-400', bg: 'bg-blue-500/20', label: 'New comment' },
  follow: { icon: UserPlus, color: 'text-green-400', bg: 'bg-green-500/20', label: 'New follower' },
  mention: { icon: AtSign, color: 'text-yellow-400', bg: 'bg-yellow-500/20', label: 'Mentioned you' },
};

export default function NotificationsClient({ currentUser }: NotificationsClientProps) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const markRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const filtered = activeFilter === 'unread'
    ? notifications.filter(n => n.unread)
    : notifications;

  return (
    <>
      {/* Sticky Header */}
      <div className="sticky top-16 z-40 bg-gradient-to-b from-purple-950 via-purple-950/95 to-transparent backdrop-blur-xl border-b border-white/10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                Notifications
                {unreadCount > 0 && (
                  <span className="text-sm font-semibold bg-gradient-to-r from-pink-500 to-purple-500 text-white px-2.5 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </h1>
              <p className="text-purple-300 text-sm mt-0.5">Stay updated with your network</p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-1.5 text-purple-300 hover:text-white text-sm font-medium transition-colors px-3 py-1.5 bg-white/10 rounded-lg hover:bg-white/20"
              >
                <Check size={14} />
                Mark all read
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            {(['all', 'unread'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 capitalize ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-white/10 text-purple-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                {filter}
                {filter === 'unread' && unreadCount > 0 && (
                  <span className="ml-1.5 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="w-full pb-24">
        <div className="max-w-2xl mx-auto px-4 pt-4">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell size={28} className="text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">All caught up!</h3>
              <p className="text-purple-300 text-sm">No unread notifications right now.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((notification, index) => {
                const config = typeConfig[notification.type];
                const TypeIcon = config.icon;
                return (
                  <div
                    key={notification.id}
                    onClick={() => markRead(notification.id)}
                    className={`relative bg-white/10 backdrop-blur-xl rounded-xl p-4 border transition-all duration-200 cursor-pointer hover:bg-white/15 hover:scale-[1.01] active:scale-[0.99] ${
                      notification.unread
                        ? 'border-purple-500/40 shadow-lg shadow-purple-500/10'
                        : 'border-white/10'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Unread dot */}
                    {notification.unread && (
                      <div className="absolute top-4 right-4 w-2.5 h-2.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
                    )}

                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <Link href={`/profile/${notification.user.username}`} onClick={(e) => e.stopPropagation()}>
                          <div className={`w-12 h-12 bg-gradient-to-br ${notification.user.color} rounded-full flex items-center justify-center hover:opacity-90 transition`}>
                            <span className="text-white font-semibold text-lg">
                              {notification.user.initial}
                            </span>
                          </div>
                        </Link>
                        {/* Type icon badge */}
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${config.bg} rounded-full flex items-center justify-center border-2 border-purple-950`}>
                          <TypeIcon size={10} className={config.color} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm leading-snug">
                          <Link href={`/profile/${notification.user.username}`} onClick={(e) => e.stopPropagation()}>
                            <span className="font-semibold hover:underline">{notification.user.name}</span>
                          </Link>
                          {' '}
                          <span className="text-purple-200">{notification.message}</span>
                        </p>
                        {notification.preview && (
                          <p className="text-purple-400 text-xs mt-1 truncate italic">{notification.preview}</p>
                        )}
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
                          <span className="text-purple-500 text-xs">·</span>
                          <span className="text-purple-400 text-xs">{notification.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
