'use client';

import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';

interface PostCardProps {
  post: any;
  currentUserId: string;
}

const userTypeColors: any = {
  ENTREPRENEUR: 'from-blue-400 to-blue-600',
  INVESTOR: 'from-green-400 to-green-600',
  MENTOR: 'from-purple-400 to-purple-600',
  SERVICE_PROVIDER: 'from-orange-400 to-orange-600',
};

const userTypeBadges: any = {
  ENTREPRENEUR: 'bg-blue-100 text-blue-700',
  INVESTOR: 'bg-green-100 text-green-700',
  MENTOR: 'bg-purple-100 text-purple-700',
  SERVICE_PROVIDER: 'bg-orange-100 text-orange-700',
};

export default function PostCard({ post, currentUserId }: PostCardProps) {
  const [timeAgo, setTimeAgo] = useState('');
  const gradientClass = userTypeColors[post.user.userType] || 'from-gray-400 to-gray-600';
  const badgeClass = userTypeBadges[post.user.userType] || 'bg-gray-100 text-gray-700';

  useEffect(() => {
    setTimeAgo(formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }));
  }, [post.createdAt]);

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className={`w-12 h-12 bg-gradient-to-br ${gradientClass} rounded-full flex items-center justify-center flex-shrink-0`}>
            <span className="text-white font-semibold text-lg">
              {post.user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-gray-900 hover:underline cursor-pointer">
                    {post.user.name}
                  </h3>
                  {post.user.verified && (
                    <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${badgeClass}`}>
                    {post.user.userType.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                  <span className="hover:underline cursor-pointer">@{post.user.username}</span>
                  {timeAgo && (
                    <>
                      <span>·</span>
                      <span>{timeAgo}</span>
                    </>
                  )}
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1">
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            <p className="mt-3 text-gray-800 whitespace-pre-wrap leading-relaxed">{post.content}</p>
            
            {post.images && post.images.length > 0 && (
              <div className="mt-3 rounded-lg overflow-hidden">
                <img src={post.images[0]} alt="Post" className="w-full" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 py-3 border-t flex items-center justify-between text-gray-500">
        <button className="flex items-center gap-2 hover:text-red-500 transition-all duration-200 group">
          <div className="p-2 rounded-xl group-hover:bg-red-50 transition-all duration-200">
            <Heart size={18} />
          </div>
          <span className="text-sm font-medium">{post._count.likes}</span>
        </button>
        <button className="flex items-center gap-2 hover:text-primary-500 transition-all duration-200 group">
          <div className="p-2 rounded-xl group-hover:bg-primary-50 transition-all duration-200">
            <MessageCircle size={18} />
          </div>
          <span className="text-sm font-medium">{post._count.comments}</span>
        </button>
        <button className="flex items-center gap-2 hover:text-green-500 transition-all duration-200 group">
          <div className="p-2 rounded-xl group-hover:bg-green-50 transition-all duration-200">
            <Share2 size={18} />
          </div>
        </button>
        <button className="flex items-center gap-2 hover:text-primary-500 transition-all duration-200 group">
          <div className="p-2 rounded-xl group-hover:bg-primary-50 transition-all duration-200">
            <Bookmark size={18} />
          </div>
        </button>
      </div>
    </div>
  );
}
