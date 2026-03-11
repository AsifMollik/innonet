'use client';

import Link from 'next/link';
import { TrendingUp, Users2, MessageCircle, UserPlus, Star, Building2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ConnectionRequest {
  id: string;
  senderId: string;
  name: string;
  username: string;
  role: string;
  avatar: string | null;
  mutual: number;
  createdAt: string;
}

interface RightSidebarProps {
  currentUser?: any;
}

export default function RightSidebar({ currentUser }: RightSidebarProps) {
  const router = useRouter();
  const [requests, setRequests] = useState<ConnectionRequest[]>([]);
  const [loading, setLoading] = useState<string | null>(null);
  const [fetchingRequests, setFetchingRequests] = useState(true);
  const [followingUser, setFollowingUser] = useState<string | null>(null);
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());

  // Fetch connection requests on mount
  useEffect(() => {
    if (currentUser) {
      fetchConnectionRequests();
    } else {
      setFetchingRequests(false);
    }
  }, [currentUser]);

  const fetchConnectionRequests = async () => {
    try {
      const response = await fetch('/api/connections/requests');
      if (response.ok) {
        const data = await response.json();
        setRequests(data.requests || []);
      }
    } catch (error) {
      console.error('Error fetching connection requests:', error);
    } finally {
      setFetchingRequests(false);
    }
  };

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const getColorClass = (index: number) => {
    const colors = [
      'from-cyan-400 to-cyan-600',
      'from-rose-400 to-rose-600',
      'from-violet-400 to-violet-600',
      'from-amber-400 to-amber-600',
      'from-blue-400 to-blue-600',
      'from-purple-400 to-purple-600',
      'from-green-400 to-green-600',
      'from-pink-400 to-pink-600',
    ];
    return colors[index % colors.length];
  };

  const handleAccept = async (requestId: string) => {
    setLoading(requestId);
    try {
      const response = await fetch('/api/connections/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId }),
      });

      if (response.ok) {
        // Remove the request from the list
        setRequests(requests.filter(req => req.id !== requestId));
      } else {
        const error = await response.json();
        console.error('Error accepting connection:', error);
        alert('Failed to accept connection request');
      }
    } catch (error) {
      console.error('Error accepting connection:', error);
      alert('Failed to accept connection request');
    } finally {
      setLoading(null);
    }
  };

  const handleDecline = async (requestId: string) => {
    setLoading(requestId);
    try {
      const response = await fetch('/api/connections/decline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId }),
      });

      if (response.ok) {
        // Remove the request from the list
        setRequests(requests.filter(req => req.id !== requestId));
      } else {
        const error = await response.json();
        console.error('Error declining connection:', error);
        alert('Failed to decline connection request');
      }
    } catch (error) {
      console.error('Error declining connection:', error);
      alert('Failed to decline connection request');
    } finally {
      setLoading(null);
    }
  };

  const handleFollow = async (userId: string) => {
    setFollowingUser(userId);
    try {
      const response = await fetch('/api/connections/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receiverId: userId }),
      });

      if (response.ok) {
        setFollowedUsers(new Set([...followedUsers, userId]));
      } else {
        const error = await response.json();
        console.error('Error sending connection request:', error);
        alert(error.error || 'Failed to send connection request');
      }
    } catch (error) {
      console.error('Error sending connection request:', error);
      alert('Failed to send connection request');
    } finally {
      setFollowingUser(null);
    }
  };

  return (
    <div className="space-y-3">
      {/* Connection Requests */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-3 border-b">
          <h3 className="font-semibold text-gray-900 text-sm flex items-center justify-between">
            <span>Connection Requests</span>
            {requests.length > 0 && (
              <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                {requests.length}
              </span>
            )}
          </h3>
        </div>
        <div className="p-1.5">
          {fetchingRequests ? (
            <div className="p-4 text-center text-sm text-gray-500">
              Loading...
            </div>
          ) : requests.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-500">
              No pending requests
            </div>
          ) : (
            requests.map((request, index) => (
              <div key={request.id} className="p-2.5 hover:bg-gray-50 rounded-xl transition-all duration-200">
                <div className="flex items-start gap-2.5">
                  <div className={`w-10 h-10 bg-gradient-to-br ${getColorClass(index)} rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0`}>
                    {getInitial(request.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{request.name}</p>
                    <p className="text-xs text-gray-500 truncate">{request.role} • {request.mutual} mutual</p>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleAccept(request.id)}
                        disabled={loading === request.id}
                        className="flex-1 text-xs px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-200 font-medium disabled:opacity-50"
                      >
                        {loading === request.id ? 'Processing...' : 'Accept'}
                      </button>
                      <button
                        onClick={() => handleDecline(request.id)}
                        disabled={loading === request.id}
                        className="flex-1 text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium disabled:opacity-50"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-2 border-t">
          <Link href="/connections/requests" className="block text-center text-sm text-primary-600 hover:text-primary-700 font-medium py-1">
            View all requests
          </Link>
        </div>
      </div>

      {/* Chat Contacts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-3 border-b">
          <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
            <MessageCircle size={16} className="text-primary-600" />
            Contacts
          </h3>
        </div>
        <div className="p-1.5">
          <button 
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).openChat) {
                (window as any).openChat({
                  id: 'cmmkycr480002xpvqvi3irx1o', // Karim Hassan's actual ID
                  name: 'Karim Hassan',
                  initial: 'K',
                  color: 'from-blue-400 to-blue-600',
                  online: true,
                  username: 'karimhassan'
                });
              }
            }}
            className="w-full flex items-center gap-2.5 p-2.5 hover:bg-gray-50 rounded-xl transition-all duration-200 text-left"
          >
            <div className="relative">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                K
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Karim Hassan</p>
              <p className="text-xs text-gray-500 truncate">Active now</p>
            </div>
          </button>
          <button 
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).openChat) {
                (window as any).openChat({
                  id: 'cmmkycr400000xpvqfohfg14e', // Sarah Khan's actual ID
                  name: 'Sarah Khan',
                  initial: 'S',
                  color: 'from-purple-400 to-purple-600',
                  online: true,
                  username: 'sarahkhan'
                });
              }
            }}
            className="w-full flex items-center gap-2.5 p-2.5 hover:bg-gray-50 rounded-xl transition-all duration-200 text-left"
          >
            <div className="relative">
              <div className="w-9 h-9 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                S
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Sarah Khan</p>
              <p className="text-xs text-gray-500 truncate">Active now</p>
            </div>
          </button>
          <button 
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).openChat) {
                (window as any).openChat({
                  id: 'cmmkycr480003xpvqgjjd06ah', // Rafiq Ahmed's actual ID
                  name: 'Rafiq Ahmed',
                  initial: 'R',
                  color: 'from-green-400 to-green-600',
                  online: false,
                  username: 'rafiqahmed'
                });
              }
            }}
            className="w-full flex items-center gap-2.5 p-2.5 hover:bg-gray-50 rounded-xl transition-all duration-200 text-left"
          >
            <div className="relative">
              <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                R
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-gray-300 border-2 border-white rounded-full"></span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Rafiq Ahmed</p>
              <p className="text-xs text-gray-500 truncate">Active 2h ago</p>
            </div>
          </button>
          <button 
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).openChat) {
                (window as any).openChat({
                  id: 'nadia-user-id',
                  name: 'Nadia Rahman',
                  initial: 'N',
                  color: 'from-amber-400 to-amber-600',
                  online: false,
                  username: 'nadiarahman'
                });
              }
            }}
            className="w-full flex items-center gap-2.5 p-2.5 hover:bg-gray-50 rounded-xl transition-all duration-200 text-left"
          >
            <div className="relative">
              <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                N
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-gray-300 border-2 border-white rounded-full"></span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Nadia Rahman</p>
              <p className="text-xs text-gray-500 truncate">Active 5h ago</p>
            </div>
          </button>
          <button 
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).openChat) {
                (window as any).openChat({
                  id: 'maya-user-id',
                  name: 'Maya Ventures',
                  initial: 'M',
                  color: 'from-pink-400 to-pink-600',
                  online: true,
                  username: 'mayachowdhury'
                });
              }
            }}
            className="w-full flex items-center gap-2.5 p-2.5 hover:bg-gray-50 rounded-xl transition-all duration-200 text-left"
          >
            <div className="relative">
              <div className="w-9 h-9 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                M
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Maya Ventures</p>
              <p className="text-xs text-gray-500 truncate">Active now</p>
            </div>
          </button>
        </div>
        <div className="p-2 border-t">
          <Link href="/messages" className="block text-center text-sm text-primary-600 hover:text-primary-700 font-medium py-1">
            View all messages
          </Link>
        </div>
      </div>

      {/* Following */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-3 border-b">
          <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
            <UserPlus size={16} className="text-primary-600" />
            Following
          </h3>
        </div>
        <div className="p-1.5">
          <Link href="/profile/karim" className="flex items-center gap-2.5 p-2.5 hover:bg-gray-50 rounded-xl transition-all duration-200">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
              K
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Karim Hassan</p>
              <p className="text-xs text-gray-500">Entrepreneur</p>
            </div>
          </Link>
          <Link href="/profile/sarah" className="flex items-center gap-2.5 p-2.5 hover:bg-gray-50 rounded-xl transition-all duration-200">
            <div className="w-9 h-9 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
              S
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Sarah Khan</p>
              <p className="text-xs text-gray-500">Mentor</p>
            </div>
          </Link>
          <Link href="/profile/rafiq" className="flex items-center gap-2.5 p-2.5 hover:bg-gray-50 rounded-xl transition-all duration-200">
            <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
              R
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Rafiq Ahmed</p>
              <p className="text-xs text-gray-500">Investor</p>
            </div>
          </Link>
        </div>
        <div className="p-2 border-t">
          <Link href="/following" className="block text-center text-sm text-primary-600 hover:text-primary-700 font-medium py-1">
            View all
          </Link>
        </div>
      </div>

      {/* Trending Topics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-3 border-b">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2 text-sm">
            <TrendingUp size={16} className="text-primary-600" />
            Trending
          </h3>
        </div>
        <div className="p-1.5">
          <div className="p-2.5 hover:bg-gray-50 rounded-xl cursor-pointer transition-all duration-200">
            <p className="text-sm font-medium text-gray-900">#StartupBangladesh</p>
            <p className="text-xs text-gray-500">2.5K posts</p>
          </div>
          <div className="p-2.5 hover:bg-gray-50 rounded-xl cursor-pointer transition-all duration-200">
            <p className="text-sm font-medium text-gray-900">#AIInnovation</p>
            <p className="text-xs text-gray-500">1.8K posts</p>
          </div>
          <div className="p-2.5 hover:bg-gray-50 rounded-xl cursor-pointer transition-all duration-200">
            <p className="text-sm font-medium text-gray-900">#FundingRound</p>
            <p className="text-xs text-gray-500">1.2K posts</p>
          </div>
          <div className="p-2.5 hover:bg-gray-50 rounded-xl cursor-pointer transition-all duration-200">
            <p className="text-sm font-medium text-gray-900">#TechForGood</p>
            <p className="text-xs text-gray-500">980 posts</p>
          </div>
          <div className="p-2.5 hover:bg-gray-50 rounded-xl cursor-pointer transition-all duration-200">
            <p className="text-sm font-medium text-gray-900">#EdTech</p>
            <p className="text-xs text-gray-500">756 posts</p>
          </div>
        </div>
      </div>

      {/* Featured Startups */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-3 border-b">
          <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
            <Building2 size={16} className="text-primary-600" />
            Featured Startups
          </h3>
        </div>
        <div className="p-1.5">
          <Link href="/startups/techbd" className="flex items-center gap-2.5 p-2.5 hover:bg-gray-50 rounded-xl transition-all duration-200">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg flex items-center justify-center text-white font-semibold flex-shrink-0">
              T
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">TechBD</p>
              <p className="text-xs text-gray-500">Fintech • Series A</p>
            </div>
          </Link>
          <Link href="/startups/educonnect" className="flex items-center gap-2.5 p-2.5 hover:bg-gray-50 rounded-xl transition-all duration-200">
            <div className="w-9 h-9 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg flex items-center justify-center text-white font-semibold flex-shrink-0">
              E
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">EduConnect</p>
              <p className="text-xs text-gray-500">EdTech • Seed</p>
            </div>
          </Link>
          <Link href="/startups/healthhub" className="flex items-center gap-2.5 p-2.5 hover:bg-gray-50 rounded-xl transition-all duration-200">
            <div className="w-9 h-9 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center text-white font-semibold flex-shrink-0">
              H
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">HealthHub</p>
              <p className="text-xs text-gray-500">HealthTech • Pre-seed</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Suggested Connections */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-3 border-b">
          <h3 className="font-semibold text-gray-900 text-sm">Suggested for you</h3>
        </div>
        <div className="p-1.5">
          <div className="flex items-center gap-2.5 p-2.5 hover:bg-gray-50 rounded-xl transition-all duration-200">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
              N
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Nadia Rahman</p>
              <p className="text-xs text-gray-500">Entrepreneur</p>
            </div>
            <button 
              onClick={() => handleFollow('nadia-user-id')}
              disabled={followingUser === 'nadia-user-id' || followedUsers.has('nadia-user-id')}
              className="text-xs px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-200 flex-shrink-0 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {followedUsers.has('nadia-user-id') ? 'Requested' : followingUser === 'nadia-user-id' ? 'Sending...' : 'Follow'}
            </button>
          </div>
          <div className="flex items-center gap-2.5 p-2.5 hover:bg-gray-50 rounded-xl transition-all duration-200">
            <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Ahmed Ali</p>
              <p className="text-xs text-gray-500">Service Provider</p>
            </div>
            <button 
              onClick={() => handleFollow('ahmed-user-id')}
              disabled={followingUser === 'ahmed-user-id' || followedUsers.has('ahmed-user-id')}
              className="text-xs px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-200 flex-shrink-0 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {followedUsers.has('ahmed-user-id') ? 'Requested' : followingUser === 'ahmed-user-id' ? 'Sending...' : 'Follow'}
            </button>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3">
        <div className="flex flex-wrap gap-2 text-xs text-gray-500">
          <a href="/about" className="hover:text-primary-600">About</a>
          <span>•</span>
          <a href="/help" className="hover:text-primary-600">Help</a>
          <span>•</span>
          <a href="/privacy" className="hover:text-primary-600">Privacy</a>
          <span>•</span>
          <a href="/terms" className="hover:text-primary-600">Terms</a>
        </div>
        <p className="text-xs text-gray-400 mt-2">© 2026 Innonet. All rights reserved.</p>
      </div>
    </div>
  );
}
