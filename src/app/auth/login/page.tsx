'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/feed');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-900 flex relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
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
            <p className="text-lg xl:text-xl text-purple-300 leading-relaxed">
              Join Bangladesh's premier platform for <span className="text-pink-400 font-semibold">entrepreneurs</span>, <span className="text-pink-400 font-semibold">investors</span>, and <span className="text-pink-400 font-semibold">innovators</span>.
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
                  <span className="text-2xl xl:text-3xl">💡</span>
                  <span className="text-2xl xl:text-3xl">🚀</span>
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
                      <span className="text-xl">❤️</span>
                      <span className="text-xl">💬</span>
                      <span className="text-xl">📤</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-28 right-4 bg-white/20 backdrop-blur-md rounded-full px-2 py-1 border border-white/30">
                  <span className="text-xl">🎯</span>
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
                  <span className="text-2xl xl:text-3xl">💼</span>
                  <span className="text-2xl xl:text-3xl">🤝</span>
                </div>
                <div className="absolute top-20 left-4 bg-green-500/80 backdrop-blur-md rounded-full p-1.5 border border-white/30">
                  <span className="text-base">✓</span>
                </div>
              </div>
            </div>

            {/* Floating Emojis - Smaller and better positioned */}
            <div className="absolute top-8 left-1/4 text-3xl xl:text-4xl animate-pulse">💡</div>
            <div className="absolute bottom-8 right-1/4 text-3xl xl:text-4xl animate-pulse" style={{ animationDelay: '1s' }}>🚀</div>
            <div className="absolute top-1/3 right-4 text-2xl xl:text-3xl animate-pulse" style={{ animationDelay: '2s' }}>💰</div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 relative z-10">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex lg:hidden justify-center mb-6 sm:mb-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50">
              <span className="text-white font-bold text-2xl sm:text-3xl">U</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl shadow-purple-900/30 border border-white/20 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Sign in to Uddoktanet
            </h2>
            <p className="text-center text-sm text-purple-300 mb-4 sm:mb-6">
              Or{' '}
              <Link href="/auth/signup" className="font-semibold text-pink-400 hover:text-pink-300 transition-colors">
                create a new account
              </Link>
            </p>

            <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-200 px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-purple-200 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-purple-200 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 xs:gap-0">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-white/20 rounded bg-white/10"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-purple-200">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-semibold text-pink-400 hover:text-pink-300 transition-colors">
                    Forgot password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 sm:py-3 px-4 rounded-xl shadow-lg shadow-purple-500/50 text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:shadow-xl hover:shadow-purple-500/70 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 touch-manipulation"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}