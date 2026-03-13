'use client';

import { useState } from 'react';
import PostCard from './PostCard';

interface ProfileTabsProps {
  user: any;
  currentUser: any;
}

export default function ProfileTabs({ user, currentUser }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState('posts');

  const tabs = [
    { id: 'posts', label: 'Posts', count: user._count.posts },
    { id: 'about', label: 'About' },
    { id: 'ventures', label: 'Ventures' },
    { id: 'investments', label: 'Investments' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'network', label: 'Network' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-sm border border-white/20 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Posts & Updates</h2>
            {user.posts.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">No posts yet</h3>
                <p className="text-purple-300">
                  {currentUser && currentUser.id === user.id ? 
                    "Share your entrepreneurial journey and insights!" : 
                    `${user.name} hasn't shared any posts yet.`
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {user.posts.map((post: any) => (
                  <PostCard key={post.id} post={post} currentUserId={currentUser?.id || ''} />
                ))}
              </div>
            )}
          </div>
        );

      case 'about':
        return (
          <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-sm border border-white/20 p-6">
            <h2 className="text-xl font-bold text-white mb-6">About {user.name}</h2>
            <div className="space-y-6">
              {user.bio && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Bio</h3>
                  <p className="text-purple-200 leading-relaxed">{user.bio}</p>
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-purple-300">User Type</span>
                    <span className="font-medium text-white">{user.userType.replace('_', ' ')}</span>
                  </div>
                  {user.location && (
                    <div className="flex justify-between py-2 border-b border-white/10">
                      <span className="text-purple-300">Location</span>
                      <span className="font-medium text-white">{user.location}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-purple-300">Joined</span>
                    <span className="font-medium text-white">
                      {new Date(user.createdAt).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-purple-300">Verified</span>
                    <span className="font-medium text-white">
                      {user.verified ? (
                        <span className="text-green-400 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Verified
                        </span>
                      ) : (
                        'Not verified'
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-sm border border-white/20 p-6">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Coming Soon</h3>
              <p className="text-purple-300">
                This section is under development and will be available soon.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {/* Navigation Tabs */}
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto scrollbar-hide" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-b-2 border-pink-500 text-white'
                    : 'border-b-2 border-transparent text-purple-300 hover:text-white hover:border-purple-500'
                } py-3 sm:py-4 px-1 text-xs sm:text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`${
                    activeTab === tab.id ? 'bg-pink-500/20 text-pink-200' : 'bg-white/10 text-purple-300'
                  } px-1.5 py-0.5 sm:px-2 rounded-full text-xs font-medium`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Left Sidebar - Entrepreneur Info */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {/* Quick Stats Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-sm border border-white/20 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Entrepreneur Profile</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-purple-300">Industry Focus</span>
                  <span className="font-medium text-white">Technology</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-purple-300">Experience</span>
                  <span className="font-medium text-white">5+ years</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-purple-300">Stage</span>
                  <span className="font-medium text-white">Growth</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-purple-300">Looking for</span>
                  <span className="font-medium text-white">Funding</span>
                </div>
              </div>
            </div>

            {/* Skills & Expertise */}
            <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-sm border border-white/20 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {['Product Development', 'Team Leadership', 'Fundraising', 'Marketing', 'Strategy', 'AI/ML'].map((skill) => (
                  <span key={skill} className="px-2.5 py-1 sm:px-3 bg-purple-500/20 text-purple-200 rounded-full text-xs sm:text-sm font-medium border border-purple-500/30">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Current Ventures */}
            <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-sm border border-white/20 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Current Ventures</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs sm:text-sm">T</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white text-sm sm:text-base">TechBD</h4>
                    <p className="text-xs sm:text-sm text-purple-300">Fintech Platform</p>
                    <p className="text-xs text-purple-400 mt-1">Founder & CEO</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-sm border border-white/20 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-white">Raised $2M Series A</p>
                    <p className="text-xs text-purple-400">2 months ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-white">Featured in TechCrunch</p>
                    <p className="text-xs text-purple-400">3 months ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </>
  );
}