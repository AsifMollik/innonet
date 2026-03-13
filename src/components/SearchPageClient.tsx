'use client';

import { useState, useEffect } from 'react';
import { Search, X, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface SearchPageClientProps {
  currentUser: any;
  allUsers: any[];
}

export default function SearchPageClient({ currentUser, allUsers }: SearchPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(allUsers);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        const filtered = allUsers.filter(user =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.userType.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUsers(filtered);
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setFilteredUsers(allUsers);
      setIsSearching(false);
    }
  }, [searchQuery, allUsers]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && !recentSearches.includes(query)) {
      const updated = [query, ...recentSearches.slice(0, 4)];
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredUsers(allUsers);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  const userTypeColors: any = {
    ENTREPRENEUR: 'from-purple-500 to-pink-500',
    INVESTOR: 'from-green-400 to-green-600',
    MENTOR: 'from-purple-400 to-purple-600',
    SERVICE_PROVIDER: 'from-orange-400 to-orange-600',
  };

  return (
    <>
      {/* Header with Search */}
      <div className="sticky top-16 z-40 bg-gradient-to-b from-purple-950 via-purple-950/95 to-transparent backdrop-blur-xl border-b border-white/10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Search</h1>
            <p className="text-purple-300 text-sm">Discover entrepreneurs, ideas, and opportunities</p>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search people, startups, ideas..."
              className="w-full pl-12 pr-12 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-purple-300/70 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-base"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="w-full py-4 pb-20 lg:pb-4">
        <div className="max-w-2xl mx-auto px-4">
          {/* Recent Searches */}
          {!searchQuery && recentSearches.length > 0 && (
            <div className="mb-6 animate-fade-in">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-white text-sm">Recent Searches</h3>
                <button
                  onClick={clearRecentSearches}
                  className="text-purple-300 hover:text-purple-200 text-xs font-medium"
                >
                  Clear all
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(search)}
                    className="px-3 py-1.5 bg-white/10 text-purple-200 rounded-full text-sm hover:bg-white/20 transition-colors flex items-center gap-2"
                  >
                    <Search size={14} />
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Categories */}
          {!searchQuery && (
            <div className="mb-6 animate-fade-in">
              <h3 className="font-semibold text-white mb-3 text-sm">Browse Categories</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { emoji: '👥', title: 'People', desc: 'Find entrepreneurs' },
                  { emoji: '🚀', title: 'Startups', desc: 'Discover companies' },
                  { emoji: '💡', title: 'Ideas', desc: 'Browse concepts' },
                  { emoji: '💰', title: 'Funding', desc: 'Investments' },
                  { emoji: '📅', title: 'Events', desc: 'Meetups' },
                  { emoji: '💼', title: 'Jobs', desc: 'Opportunities' },
                ].map((cat) => (
                  <button
                    key={cat.title}
                    className="bg-white/10 backdrop-blur-xl rounded-xl p-3 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-200 text-left"
                  >
                    <div className="text-2xl mb-1">{cat.emoji}</div>
                    <h3 className="font-semibold text-white text-sm">{cat.title}</h3>
                    <p className="text-xs text-purple-300">{cat.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {searchQuery && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white text-sm">
                  {isSearching ? 'Searching...' : `${filteredUsers.length} Results`}
                </h3>
              </div>

              {isSearching ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full"></div>
                </div>
              ) : filteredUsers.length > 0 ? (
                <div className="space-y-3">
                  {filteredUsers.map((user) => (
                    <Link
                      key={user.id}
                      href={`/profile/${user.username}`}
                      className="block bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 hover:bg-white/15 hover:scale-[1.02] transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${userTypeColors[user.userType] || 'from-gray-400 to-gray-600'} rounded-full flex items-center justify-center flex-shrink-0`}>
                          <span className="text-white font-semibold text-lg">
                            {getInitial(user.name)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-white truncate">{user.name}</h4>
                          </div>
                          <p className="text-sm text-purple-300">@{user.username}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 py-0.5 bg-purple-500/20 text-purple-200 rounded-full text-xs border border-purple-500/30">
                              {user.userType.replace('_', ' ')}
                            </span>
                            {user.location && (
                              <span className="text-xs text-purple-400">📍 {user.location}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search size={24} className="text-purple-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">No results found</h3>
                  <p className="text-purple-300 text-sm">Try searching with different keywords</p>
                </div>
              )}
            </div>
          )}

          {/* Trending Searches */}
          {!searchQuery && (
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={18} className="text-purple-400" />
                <h3 className="font-semibold text-white text-sm">Trending Searches</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['AI Startup', 'Fintech', 'EdTech', 'HealthTech', 'E-commerce', 'SaaS', 'Mobile App', 'Blockchain'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-3 py-1.5 bg-purple-500/20 text-purple-200 rounded-full text-sm hover:bg-purple-500/30 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
