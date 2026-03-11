'use client';

import Link from 'next/link';
import { Home, Search, Bell, MessageCircle, User, Menu, X, Send } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function Navbar({ user }: { user: any }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [openChat, setOpenChat] = useState<any>(null);
  const [messageText, setMessageText] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpenChat = (contact: any) => {
    setOpenChat(contact);
    setShowMessages(false);
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  const handleLogout = () => {
    document.cookie = 'userId=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.href = '/auth/login';
  };

  const handleSearch = async (query: string) => {
    if (query.trim().length < 2) {
      setShowSearchResults(false);
      return;
    }

    setSearchLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSearchResults(data);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      handleSearch(value);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  return (
    <>
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/feed" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Innonet</h1>
            </Link>

            <div className="hidden md:flex flex-1 max-w-md mx-8 relative" ref={searchRef}>
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search entrepreneurs, ideas, projects..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onFocus={() => searchResults && setShowSearchResults(true)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                
                {/* AI Search Results Dropdown */}
                {showSearchResults && searchResults && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 max-h-96 overflow-y-auto">
                    {searchLoading ? (
                      <div className="p-4 text-center text-gray-500">
                        <div className="animate-spin w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                        Searching...
                      </div>
                    ) : (
                      <>
                        {/* AI Response */}
                        {searchResults.aiResponse && (
                          <div className="p-4 bg-gradient-to-r from-primary-50 to-blue-50 border-b">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-sm">AI</span>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                                  {searchResults.aiResponse.title}
                                </h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                  {searchResults.aiResponse.description}
                                </p>
                                
                                {/* Show user profile if found */}
                                {searchResults.aiResponse.type === 'profile' && searchResults.aiResponse.user && (
                                  <div className="mt-3 p-3 bg-white rounded-lg border">
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-full overflow-hidden">
                                        <img 
                                          src={searchResults.aiResponse.user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(searchResults.aiResponse.user.name)}&background=0D8ABC&color=fff&size=128`}
                                          alt={searchResults.aiResponse.user.name}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                          <p className="font-semibold text-gray-900">{searchResults.aiResponse.user.name}</p>
                                          {searchResults.aiResponse.user.verified && (
                                            <span className="text-blue-500">✓</span>
                                          )}
                                        </div>
                                        <p className="text-sm text-gray-500">@{searchResults.aiResponse.user.username} • {searchResults.aiResponse.user.userType}</p>
                                      </div>
                                      <Link href={`/profile/${searchResults.aiResponse.user.username}`} className="px-3 py-1 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition">
                                        View Profile
                                      </Link>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Users Results */}
                        {searchResults.results?.users?.length > 0 && (
                          <div className="p-2">
                            <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">
                              People ({searchResults.results.users.length})
                            </h5>
                            {searchResults.results.users.slice(0, 5).map((user: any) => (
                              <Link 
                                key={user.id} 
                                href={`/profile/${user.username}`}
                                onClick={() => setShowSearchResults(false)}
                                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition"
                              >
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                  <img 
                                    src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D8ABC&color=fff&size=128`}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                                    {user.verified && <span className="text-blue-500 text-xs">✓</span>}
                                  </div>
                                  <p className="text-xs text-gray-500">@{user.username} • {user.userType}</p>
                                  {user.location && (
                                    <p className="text-xs text-gray-400">📍 {user.location}</p>
                                  )}
                                </div>
                              </Link>
                            ))}
                            {searchResults.results.users.length > 5 && (
                              <div className="px-3 py-2 text-center">
                                <p className="text-xs text-gray-500">
                                  +{searchResults.results.users.length - 5} more people
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Posts Results */}
                        {searchResults.results?.posts?.length > 0 && (
                          <div className="p-2 border-t">
                            <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">
                              Posts ({searchResults.results.posts.length})
                            </h5>
                            {searchResults.results.posts.slice(0, 3).map((post: any) => (
                              <Link
                                key={post.id}
                                href={`/profile/${post.user.username}`}
                                onClick={() => setShowSearchResults(false)}
                                className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition block"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="w-8 h-8 rounded-full overflow-hidden">
                                    <img 
                                      src={post.user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.user.name)}&background=0D8ABC&color=fff&size=128`}
                                      alt={post.user.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <p className="text-sm font-medium text-gray-900">{post.user.name}</p>
                                      {post.user.verified && <span className="text-blue-500 text-xs">✓</span>}
                                    </div>
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                      {post.content.substring(0, 120)}...
                                    </p>
                                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                      <span>❤️ {post._count.likes}</span>
                                      <span>💬 {post._count.comments}</span>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            ))}
                            {searchResults.results.posts.length > 3 && (
                              <div className="px-3 py-2 text-center">
                                <p className="text-xs text-gray-500">
                                  +{searchResults.results.posts.length - 3} more posts
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* No Results */}
                        {(!searchResults.results?.users?.length && !searchResults.results?.posts?.length) && (
                          <div className="p-4 text-center text-gray-500">
                            <p className="text-sm">No results found for "{searchResults.query}"</p>
                            <p className="text-xs mt-1">Try searching for entrepreneurs, ideas, or topics</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-6">
              <Link href="/feed" className="text-gray-700 hover:text-primary-600 transition">
                <Home size={24} />
              </Link>
              
              <div className="relative">
                <button 
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowMessages(false);
                    setShowProfileMenu(false);
                  }}
                  className="text-gray-700 hover:text-primary-600 transition relative"
                >
                  <Bell size={24} />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="p-3 border-b">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <div className="p-3 hover:bg-gray-50 cursor-pointer transition">
                        <div className="flex gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">K</div>
                          <div className="flex-1">
                            <p className="text-sm"><span className="font-semibold">Karim Hassan</span> liked your post</p>
                            <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button 
                  onClick={() => {
                    setShowMessages(!showMessages);
                    setShowNotifications(false);
                    setShowProfileMenu(false);
                  }}
                  className="text-gray-700 hover:text-primary-600 transition relative"
                >
                  <MessageCircle size={24} />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">5</span>
                </button>

                {showMessages && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="p-3 border-b flex justify-between items-center">
                      <h3 className="font-semibold text-gray-900">Messages</h3>
                      <Link href="/messages" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        See all
                      </Link>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {[
                        { id: 'cmmkycr480002xpvqvi3irx1o', name: 'Karim Hassan', initial: 'K', color: 'from-blue-400 to-blue-600', online: true, msg: "Hey! Let's discuss the project...", time: '2m', username: 'karimhassan' },
                        { id: 'cmmkycr400000xpvqfohfg14e', name: 'Sarah Khan', initial: 'S', color: 'from-purple-400 to-purple-600', online: true, msg: 'Thanks for the mentorship session!', time: '15m', username: 'sarahkhan' },
                        { id: 'cmmkycr480003xpvqgjjd06ah', name: 'Rafiq Ahmed', initial: 'R', color: 'from-green-400 to-green-600', online: false, msg: 'Interested in your startup idea', time: '2h', username: 'rafiqahmed' },
                      ].map((contact) => (
                        <button
                          key={contact.id}
                          onClick={() => {
                            if (typeof window !== 'undefined' && (window as any).openChat) {
                              (window as any).openChat(contact);
                            }
                            setShowMessages(false);
                          }}
                          className="w-full p-3 hover:bg-gray-50 transition text-left"
                        >
                          <div className="flex gap-3">
                            <div className="relative">
                              <div className={`w-10 h-10 bg-gradient-to-br ${contact.color} rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0`}>{contact.initial}</div>
                              <span className={`absolute bottom-0 right-0 w-3 h-3 ${contact.online ? 'bg-green-500' : 'bg-gray-300'} border-2 border-white rounded-full`}></span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <p className="text-sm font-semibold text-gray-900 truncate">{contact.name}</p>
                                <span className="text-xs text-gray-500">{contact.time}</span>
                              </div>
                              <p className="text-sm text-gray-600 truncate">{contact.msg}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative" ref={profileRef}>
                <button 
                  onClick={() => {
                    setShowProfileMenu(!showProfileMenu);
                    setShowNotifications(false);
                    setShowMessages(false);
                  }}
                  className="flex items-center gap-2 hover:bg-gray-100 rounded-full px-3 py-2 transition"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-200">
                    <img 
                      src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D8ABC&color=fff&size=128`}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="hidden lg:block text-sm font-medium">{user.name}</span>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    {/* Profile Section */}
                    <Link 
                      href={`/profile/${user.username}`} 
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 transition border-b"
                    >
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200">
                        <img 
                          src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D8ABC&color=fff&size=128`}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">View your profile</p>
                      </div>
                    </Link>

                    {/* Menu Options */}
                    <div className="py-2">
                      <Link 
                        href={`/profile/${user.username}`} 
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition"
                      >
                        <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
                          <User size={18} className="text-gray-700" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Profile</p>
                          <p className="text-xs text-gray-500">View and edit profile</p>
                        </div>
                      </Link>

                      <Link 
                        href="/settings" 
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition"
                      >
                        <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Settings</p>
                          <p className="text-xs text-gray-500">Account preferences</p>
                        </div>
                      </Link>

                      <Link 
                        href="/help" 
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition"
                      >
                        <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Help & Support</p>
                          <p className="text-xs text-gray-500">Get help</p>
                        </div>
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="border-t">
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-left"
                      >
                        <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-gray-900">Log Out</p>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {openChat && (
        <div className="fixed bottom-0 right-4 w-80 bg-white rounded-t-xl shadow-2xl border border-gray-200 z-50">
          <div className="flex items-center justify-between p-3 border-b bg-gradient-to-r from-primary-500 to-primary-600">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 bg-gradient-to-br ${openChat.color} rounded-full flex items-center justify-center text-white font-semibold`}>{openChat.initial}</div>
              <div>
                <p className="text-sm font-semibold text-white">{openChat.name}</p>
                <p className="text-xs text-primary-100">{openChat.online ? 'Active now' : 'Offline'}</p>
              </div>
            </div>
            <button onClick={() => setOpenChat(null)} className="text-white hover:bg-white/20 rounded-full p-1 transition">
              <X size={20} />
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-4 bg-gray-50">
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className={`w-7 h-7 bg-gradient-to-br ${openChat.color} rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0`}>{openChat.initial}</div>
                <div className="bg-white rounded-2xl rounded-tl-none px-4 py-2 max-w-[70%] shadow-sm">
                  <p className="text-sm text-gray-800">Hey! How are you doing?</p>
                  <span className="text-xs text-gray-400 mt-1">10:30 AM</span>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <div className="bg-primary-600 rounded-2xl rounded-tr-none px-4 py-2 max-w-[70%] shadow-sm">
                  <p className="text-sm text-white">I'm good! Thanks for asking.</p>
                  <span className="text-xs text-primary-100 mt-1">10:32 AM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 border-t bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
              <button onClick={handleSendMessage} className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
