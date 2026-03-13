'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    userType: 'ENTREPRENEUR',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      router.push('/auth/login?registered=true');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-900 flex relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Left Side - Branding with Mobile Frames */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8 xl:p-12 relative z-10">
        <div className="max-w-lg">
          {/* Text Content */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50">
                <span className="text-white font-bold text-3xl">U</span>
              </div>
            </div>
            <h1 className="text-4xl xl:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
              Start your innovation journey today
            </h1>
            <p className="text-lg xl:text-xl text-purple-300 leading-relaxed">
              Connect with <span className="text-pink-400 font-semibold">entrepreneurs</span>, find <span className="text-pink-400 font-semibold">investors</span>, and build the future together.
            </p>
          </div>

          {/* Mobile Frames */}
          <div className="relative w-full h-[500px]">
          {/* Left Mobile Frame */}
          <div className="absolute left-4 xl:left-8 top-1/2 -translate-y-1/2 w-48 xl:w-52 h-[380px] xl:h-[400px] bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-xl rounded-[2.5rem] border-[3px] border-white/20 shadow-2xl transform -rotate-12 hover:-rotate-6 transition-all duration-500 overflow-hidden">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-black/50 rounded-full"></div>
            <div className="p-4 pt-12 h-full flex flex-col justify-between">
              <div className="space-y-2">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-1.5 bg-white/30 rounded w-16 mb-1"></div>
                      <div className="h-1.5 bg-white/20 rounded w-12"></div>
                    </div>
                  </div>
                  <div className="h-24 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-lg"></div>
                </div>
              </div>
              <div className="absolute bottom-6 left-6 flex gap-1">
                <span className="text-2xl xl:text-3xl">🎨</span>
                <span className="text-2xl xl:text-3xl">✨</span>
              </div>
            </div>
          </div>

          {/* Center Mobile Frame (Main) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-56 xl:w-60 h-[440px] xl:h-[460px] bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-xl rounded-[3rem] border-[3px] border-white/30 shadow-2xl z-10 overflow-hidden">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black/60 rounded-full"></div>
            <div className="p-4 pt-14 h-full flex flex-col">
              <div className="flex-1 space-y-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-1.5 bg-white/40 rounded w-20 mb-1"></div>
                      <div className="h-1.5 bg-white/30 rounded w-16"></div>
                    </div>
                  </div>
                  
                  {/* Animated Character & Robot Scene */}
                  <div className="h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg mb-2 relative overflow-hidden flex items-end justify-center p-2">
                    {/* Robot */}
                    <div className="absolute bottom-8 right-8 animate-bounce" style={{ animationDuration: '3s' }}>
                      <div className="relative">
                        {/* Robot Head */}
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg border-2 border-gray-500 relative">
                          <div className="absolute top-1 left-1.5 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                          <div className="absolute top-1 right-1.5 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-2 bg-gray-400 rounded-t"></div>
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                        </div>
                        {/* Robot Body */}
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg border-2 border-gray-600 -mt-1 relative">
                          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-500/50 rounded animate-pulse"></div>
                          <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                          <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                        </div>
                        {/* Robot Arms */}
                        <div className="absolute top-8 -left-2 w-2 h-6 bg-gray-400 rounded"></div>
                        <div className="absolute top-8 -right-2 w-2 h-6 bg-gray-400 rounded"></div>
                      </div>
                    </div>
                    
                    {/* Developer Character */}
                    <div className="absolute bottom-4 left-6 animate-pulse" style={{ animationDuration: '2s' }}>
                      {/* Head */}
                      <div className="w-6 h-6 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full border-2 border-amber-400 relative">
                        <div className="absolute top-1 left-1 w-1 h-1 bg-gray-800 rounded-full"></div>
                        <div className="absolute top-1 right-1 w-1 h-1 bg-gray-800 rounded-full"></div>
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-gray-700 rounded"></div>
                      </div>
                      {/* Body */}
                      <div className="w-8 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg -mt-1 relative">
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-yellow-300 rounded-full"></div>
                      </div>
                      {/* Arms - one pointing to robot */}
                      <div className="absolute top-6 -right-3 w-1.5 h-5 bg-amber-300 rounded transform rotate-45"></div>
                      <div className="absolute top-6 -left-2 w-1.5 h-4 bg-amber-300 rounded"></div>
                      {/* Tool in hand */}
                      <div className="absolute top-5 -right-5 w-2 h-1 bg-gray-400 rounded animate-pulse"></div>
                    </div>
                    
                    {/* Electric Sparks */}
                    <div className="absolute top-4 right-12 text-yellow-300 text-xs animate-ping">⚡</div>
                    <div className="absolute top-8 right-10 text-yellow-300 text-xs animate-ping" style={{ animationDelay: '0.5s' }}>⚡</div>
                    <div className="absolute bottom-12 right-14 text-cyan-300 text-xs animate-pulse">✨</div>
                    
                    {/* Code Lines */}
                    <div className="absolute top-2 left-2 space-y-1">
                      <div className="h-0.5 w-8 bg-green-400/50 rounded animate-pulse"></div>
                      <div className="h-0.5 w-6 bg-blue-400/50 rounded animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                      <div className="h-0.5 w-7 bg-purple-400/50 rounded animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <span className="text-xl">👍</span>
                    <span className="text-xl">💬</span>
                    <span className="text-xl">🔗</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-28 right-4 bg-white/20 backdrop-blur-md rounded-full px-2 py-1 border border-white/30">
                <span className="text-xl">🚀</span>
              </div>
            </div>
          </div>

          {/* Right Mobile Frame */}
          <div className="absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 w-48 xl:w-52 h-[380px] xl:h-[400px] bg-gradient-to-br from-pink-900/40 to-purple-900/40 backdrop-blur-xl rounded-[2.5rem] border-[3px] border-white/20 shadow-2xl transform rotate-12 hover:rotate-6 transition-all duration-500 overflow-hidden">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-black/50 rounded-full"></div>
            <div className="p-4 pt-12 h-full flex flex-col justify-between">
              <div className="space-y-2">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-1.5 bg-white/30 rounded w-16 mb-1"></div>
                      <div className="h-1.5 bg-white/20 rounded w-12"></div>
                    </div>
                  </div>
                  <div className="h-24 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-lg"></div>
                </div>
              </div>
              <div className="absolute bottom-6 right-6 flex gap-1">
                <span className="text-2xl xl:text-3xl">💡</span>
                <span className="text-2xl xl:text-3xl">🎯</span>
              </div>
              <div className="absolute top-20 left-4 bg-green-500/80 backdrop-blur-md rounded-full p-1.5 border border-white/30">
                <span className="text-base">✓</span>
              </div>
            </div>
          </div>

            {/* Floating Emojis - Smaller and better positioned */}
            <div className="absolute top-8 left-1/4 text-3xl xl:text-4xl animate-pulse">💼</div>
            <div className="absolute bottom-8 right-1/4 text-3xl xl:text-4xl animate-pulse" style={{ animationDelay: '1s' }}>🤝</div>
            <div className="absolute top-1/3 right-4 text-2xl xl:text-3xl animate-pulse" style={{ animationDelay: '2s' }}>💰</div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex lg:hidden justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50">
              <span className="text-white font-bold text-3xl">U</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-900/30 border border-white/20 p-8">
            <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Join Uddoktanet
            </h2>
            <p className="text-center text-sm text-purple-300 mb-6">
              Already have an account?{' '}
              <Link href="/auth/login" className="font-semibold text-pink-400 hover:text-pink-300 transition-colors">
                Sign In
              </Link>
            </p>
            
            {error && (
              <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-200 p-3 rounded-xl mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-purple-200">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-purple-200">Username</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Choose a username"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-purple-200">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-purple-200">Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Create a password (min 6 characters)"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-purple-200">I am a</label>
                <select
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  value={formData.userType}
                  onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                >
                  <option value="ENTREPRENEUR" className="bg-purple-900">Entrepreneur</option>
                  <option value="INVESTOR" className="bg-purple-900">Investor</option>
                  <option value="MENTOR" className="bg-purple-900">Mentor</option>
                  <option value="SERVICE_PROVIDER" className="bg-purple-900">Service Provider</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/70 disabled:opacity-50 transition-all duration-300 transform hover:scale-105"
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
