'use client';

import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Send } from 'lucide-react';
import Link from 'next/link';

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
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post._count.likes);
  const [isSaved, setIsSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<any[]>([]);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [shareText, setShareText] = useState('');
  const [contacts, setContacts] = useState<any[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  
  const gradientClass = userTypeColors[post.user.userType] || 'from-gray-400 to-gray-600';
  const badgeClass = userTypeBadges[post.user.userType] || 'bg-gray-100 text-gray-700';

  useEffect(() => {
    setTimeAgo(formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }));
  }, [post.createdAt]);

  // Fetch contacts when share menu is opened
  useEffect(() => {
    if (showShareMenu && contacts.length === 0 && !loadingContacts) {
      fetchContacts();
    }
  }, [showShareMenu]);

  const fetchContacts = async () => {
    setLoadingContacts(true);
    try {
      const response = await fetch('/api/users/contacts');
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoadingContacts(false);
    }
  };

  const handleLike = async () => {
    if (!currentUserId) {
      alert('Please log in to like posts');
      return;
    }

    try {
      const response = await fetch('/api/posts/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: post.id,
          userId: currentUserId,
        }),
      });

      if (response.ok) {
        setIsLiked(!isLiked);
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleSave = async () => {
    if (!currentUserId) {
      alert('Please log in to save posts');
      return;
    }

    try {
      const response = await fetch('/api/posts/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: post.id,
          userId: currentUserId,
        }),
      });

      if (response.ok) {
        setIsSaved(!isSaved);
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleComment = async () => {
    if (!currentUserId) {
      alert('Please log in to comment');
      return;
    }

    if (!commentText.trim()) return;

    try {
      const response = await fetch('/api/posts/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: post.id,
          userId: currentUserId,
          content: commentText,
        }),
      });

      if (response.ok) {
        const newComment = await response.json();
        setComments([...comments, newComment]);
        setCommentText('');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleShare = (platform: string) => {
    const postUrl = `${window.location.origin}/post/${post.id}`;
    const text = shareText || `Check out this post by ${post.user.name}: ${post.content.substring(0, 100)}...`;

    switch (platform) {
      case 'copy':
        navigator.clipboard.writeText(postUrl);
        alert('Link copied to clipboard!');
        break;
      case 'messenger':
        // In a real app, this would integrate with Facebook Messenger API
        alert('Opening Messenger...');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + postUrl)}`, '_blank');
        break;
      case 'community':
        // In a real app, this would show community selection
        alert('Select a community to share...');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(postUrl)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`, '_blank');
        break;
    }
    setShowShareMenu(false);
  };

  const handleShareNow = async () => {
    if (!currentUserId) {
      alert('Please log in to share posts');
      return;
    }

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currentUserId,
          isShared: true,
          originalPostId: post.id,
          shareText: shareText || null,
        }),
      });

      if (response.ok) {
        alert('Post shared successfully!');
        setShowShareMenu(false);
        setShareText('');
        // Refresh the page to show the new shared post
        window.location.reload();
      } else {
        alert('Failed to share post');
      }
    } catch (error) {
      console.error('Error sharing post:', error);
      alert('Error sharing post');
    }
  };

  const handleSendToContact = (contactName: string) => {
    // In a real app, this would send the post to the selected contact
    alert(`Sent to ${contactName} via InnoChat`);
    setShowShareMenu(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <Link href={`/profile/${post.user.username}`}>
            <div className={`w-12 h-12 bg-gradient-to-br ${gradientClass} rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer hover:opacity-90 transition`}>
              <span className="text-white font-semibold text-lg">
                {post.user.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Link href={`/profile/${post.user.username}`}>
                    <h3 className="font-semibold text-gray-900 hover:underline cursor-pointer">
                      {post.user.name}
                    </h3>
                  </Link>
                  {post.user.verified && (
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${badgeClass}`}>
                    {post.user.userType.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                  <Link href={`/profile/${post.user.username}`}>
                    <span className="hover:underline cursor-pointer">@{post.user.username}</span>
                  </Link>
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
            
            {/* Share text if this is a shared post */}
            {post.isShared && post.shareText && (
              <p className="mt-3 text-gray-800 whitespace-pre-wrap leading-relaxed">{post.shareText}</p>
            )}
            
            {/* Original post content for shared posts */}
            {post.isShared && post.originalPost ? (
              <div className="mt-3 border border-gray-200 rounded-lg overflow-hidden hover:bg-gray-50 transition-colors">
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <Link href={`/profile/${post.originalPost.user.username}`}>
                      <div className={`w-10 h-10 bg-gradient-to-br ${userTypeColors[post.originalPost.user.userType] || 'from-gray-400 to-gray-600'} rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer hover:opacity-90 transition`}>
                        <span className="text-white font-semibold text-sm">
                          {post.originalPost.user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link href={`/profile/${post.originalPost.user.username}`}>
                          <h4 className="font-semibold text-gray-900 hover:underline cursor-pointer text-sm">
                            {post.originalPost.user.name}
                          </h4>
                        </Link>
                        {post.originalPost.user.verified && (
                          <svg className="w-3.5 h-3.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                        <span className={`text-xs px-2 py-0.5 rounded-full ${userTypeBadges[post.originalPost.user.userType] || 'bg-gray-100 text-gray-700'}`}>
                          {post.originalPost.user.userType.replace('_', ' ')}
                        </span>
                      </div>
                      <Link href={`/profile/${post.originalPost.user.username}`}>
                        <span className="text-xs text-gray-500 hover:underline cursor-pointer">@{post.originalPost.user.username}</span>
                      </Link>
                      <p className="mt-2 text-gray-800 text-sm whitespace-pre-wrap leading-relaxed">{post.originalPost.content}</p>
                      {post.originalPost.images && post.originalPost.images.length > 0 && (
                        <div className="mt-2 rounded-lg overflow-hidden">
                          <img src={post.originalPost.images[0]} alt="Post" className="w-full" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Regular post content */}
                {!post.isShared && <p className="mt-3 text-gray-800 whitespace-pre-wrap leading-relaxed">{post.content}</p>}
                {!post.isShared && post.images && post.images.length > 0 && (
                  <div className="mt-3 rounded-lg overflow-hidden">
                    <img src={post.images[0]} alt="Post" className="w-full" />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-3 border-t flex items-center justify-between text-gray-500">
        {/* Like Button */}
        <button 
          onClick={handleLike}
          className={`flex items-center gap-2 transition-all duration-200 group ${
            isLiked ? 'text-red-500' : 'hover:text-red-500'
          }`}
        >
          <div className={`p-2 rounded-xl transition-all duration-200 ${
            isLiked ? 'bg-red-50' : 'group-hover:bg-red-50'
          }`}>
            <Heart size={18} className={isLiked ? 'fill-current' : ''} />
          </div>
          <span className="text-sm font-medium">{likeCount}</span>
        </button>

        {/* Comment Button */}
        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 hover:text-blue-500 transition-all duration-200 group"
        >
          <div className="p-2 rounded-xl group-hover:bg-blue-50 transition-all duration-200">
            <MessageCircle size={18} />
          </div>
          <span className="text-sm font-medium">{post._count.comments + comments.length}</span>
        </button>

        {/* Share Button */}
        <div className="relative">
          <button 
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="flex items-center gap-2 hover:text-green-500 transition-all duration-200 group"
          >
            <div className="p-2 rounded-xl group-hover:bg-green-50 transition-all duration-200">
              <Share2 size={18} />
            </div>
          </button>

          {/* Modern Share Modal */}
          {showShareMenu && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-50"
                onClick={() => setShowShareMenu(false)}
              ></div>
              
              {/* Share Modal */}
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">Share</h2>
                    <button
                      onClick={() => setShowShareMenu(false)}
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="max-h-[calc(90vh-80px)] overflow-y-auto">
                    {/* User Info & Share Text */}
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${gradientClass} rounded-full flex items-center justify-center`}>
                          <span className="text-white font-semibold text-lg">
                            {post.user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Feed</span>
                            <div className="flex items-center gap-1 text-gray-600">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                              </svg>
                              <span className="text-sm">Public</span>
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Share Text Input */}
                      <div className="relative">
                        <textarea
                          placeholder="Say something about this..."
                          value={shareText}
                          onChange={(e) => setShareText(e.target.value)}
                          className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                          rows={3}
                        />
                        <button className="absolute bottom-3 right-3 text-gray-400 hover:text-gray-600">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zM9 9a1 1 0 011-1v-3.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5V9a1 1 0 102 0V5.5A2.5 2.5 0 0011.5 3h-1A2.5 2.5 0 008 5.5V8a1 1 0 01-1 1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      
                      {/* Share Now Button */}
                      <button 
                        onClick={handleShareNow}
                        className="w-full mt-3 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Share now
                      </button>
                    </div>

                    {/* Send in InnoChat */}
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="font-semibold text-gray-900 mb-4">Send in InnoChat</h3>
                      {loadingContacts ? (
                        <div className="flex items-center justify-center py-4">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                      ) : contacts.length > 0 ? (
                        <div className="flex gap-3 overflow-x-auto pb-2">
                          {contacts.slice(0, 5).map((contact) => {
                            const contactGradient = userTypeColors[contact.userType] || 'from-gray-400 to-gray-600';
                            return (
                              <div key={contact.id} className="flex flex-col items-center gap-2 min-w-[70px]">
                                <button 
                                  onClick={() => handleSendToContact(contact.name)}
                                  className={`w-14 h-14 bg-gradient-to-br ${contactGradient} rounded-full flex items-center justify-center text-white font-semibold hover:scale-105 transition-transform`}
                                >
                                  {contact.name.charAt(0).toUpperCase()}
                                </button>
                                <span className="text-xs text-gray-600 text-center leading-tight">{contact.name.split(' ')[0]}</span>
                              </div>
                            );
                          })}
                          {contacts.length > 5 && (
                            <div className="flex flex-col items-center gap-2 min-w-[70px]">
                              <button className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </button>
                              <span className="text-xs text-gray-600">More</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-gray-500 text-sm">
                          No contacts yet. Connect with other users to send them posts!
                        </div>
                      )}
                    </div>

                    {/* Share To Options */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-4">Share to</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <button
                          onClick={() => handleShare('linkedin')}
                          className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </div>
                          <span className="text-sm text-gray-700">LinkedIn</span>
                        </button>
                        
                        <button
                          onClick={() => handleShare('messenger')}
                          className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.36L2 22l5.64-1.05C9.96 21.64 11.46 22 13 22h-1c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.4 0-2.76-.3-4-.84L6 20l.84-2C6.3 16.76 6 15.4 6 14c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/>
                            </svg>
                          </div>
                          <span className="text-sm text-gray-700">Messenger</span>
                        </button>

                        <button
                          onClick={() => handleShare('twitter')}
                          className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                          </div>
                          <span className="text-sm text-gray-700">X</span>
                        </button>

                        <button
                          onClick={() => handleShare('whatsapp')}
                          className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                            </svg>
                          </div>
                          <span className="text-sm text-gray-700">WhatsApp</span>
                        </button>

                        <button
                          onClick={() => handleShare('copy')}
                          className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                            </svg>
                          </div>
                          <span className="text-sm text-gray-700">Copy link</span>
                        </button>

                        <button
                          onClick={() => handleShare('community')}
                          className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A3.01 3.01 0 0 0 17 6.5c-.8 0-1.54.37-2 .95l-2.92 3.51A2.99 2.99 0 0 0 12 13v5c0 1.1.9 2 2 2h2v4h4v-2z"/>
                              <path d="M12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5z"/>
                              <path d="M5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm1.5 1H5c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5h2c.83 0 1.5-.67 1.5-1.5v-6C8.5 7.67 7.83 7 7 7z"/>
                            </svg>
                          </div>
                          <span className="text-sm text-gray-700">Community</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Save Button */}
        <button 
          onClick={handleSave}
          className={`flex items-center gap-2 transition-all duration-200 group ${
            isSaved ? 'text-indigo-500' : 'hover:text-indigo-500'
          }`}
        >
          <div className={`p-2 rounded-xl transition-all duration-200 ${
            isSaved ? 'bg-indigo-50' : 'group-hover:bg-indigo-50'
          }`}>
            <Bookmark size={18} className={isSaved ? 'fill-current' : ''} />
          </div>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-4 pb-4 border-t border-gray-100">
          {/* Comment Input */}
          {currentUserId && (
            <div className="flex gap-3 mt-4">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold text-sm">
                  {currentUserId.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                />
                <button
                  onClick={handleComment}
                  disabled={!commentText.trim()}
                  className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Comments List */}
          <div className="mt-4 space-y-3">
            {comments.map((comment: any, index) => (
              <div key={index} className="flex gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-sm">U</span>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg px-3 py-2">
                    <p className="text-sm text-gray-800">{comment.content}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                    <button className="hover:text-blue-600">Like</button>
                    <button className="hover:text-blue-600">Reply</button>
                    <span>Just now</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
