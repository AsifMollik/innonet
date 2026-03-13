'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LandingPage() {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'en', name: 'English (UK)' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'ur', name: 'اردو' },
    { code: 'zh', name: '中文(简体)' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'ar', name: 'العربية' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-900 relative overflow-hidden">
      {/* 3D Floating Elements Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large floating orbs with 3D effect */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-br from-indigo-500/25 to-purple-500/25 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* 3D Glass Cards floating */}
        <div className="absolute top-40 right-1/4 w-64 h-40 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl transform rotate-12 hover:rotate-6 transition-transform duration-700"></div>
        <div className="absolute bottom-40 left-1/4 w-56 h-56 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl transform -rotate-12 hover:-rotate-6 transition-transform duration-700"></div>
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-lg rounded-full border border-white/10 shadow-2xl"></div>
        
        {/* Large center-left glass rectangle */}
        <div className="absolute top-[40%] left-[15%] w-[320px] h-[220px] bg-white/5 backdrop-blur-md rounded-[3rem] border border-white/10 shadow-2xl transform -rotate-12 hover:-rotate-6 transition-transform duration-700"></div>
      </div>

      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0 z-50 shadow-lg shadow-purple-900/20">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50 transform hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg sm:text-xl">U</span>
              </div>
              <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">Uddoktanet</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/auth/login"
                className="px-3 py-2 sm:px-6 sm:py-2.5 text-purple-200 hover:text-white font-medium transition-colors duration-300 text-sm sm:text-base"
              >
                {t('button.signIn')}
              </Link>
              <Link
                href="/auth/signup"
                className="px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white rounded-xl sm:rounded-2xl font-semibold shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/70 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              >
                {t('button.joinFree')}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 relative min-h-[500px] sm:min-h-[600px] md:min-h-[700px] flex items-center">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center">
            <div className="inline-block mb-6 sm:mb-8 px-4 py-2 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-xl rounded-full text-purple-200 text-xs sm:text-sm font-semibold border border-white/20 shadow-lg shadow-purple-500/20">
              🚀 Innovation Starts Here
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight drop-shadow-2xl px-4">
              {t('hero.title')}
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-4 sm:mb-6 px-4">
              {t('hero.subtitle')}
            </p>
            <p className="text-base sm:text-lg text-purple-200/90 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center px-4">
              <Link
                href="/auth/signup"
                className="px-8 py-3 sm:px-10 sm:py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white rounded-xl sm:rounded-2xl font-bold shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 text-center"
              >
                {t('button.joinFree')}
              </Link>
              <Link
                href="/auth/login"
                className="px-8 py-3 sm:px-10 sm:py-4 bg-white/10 backdrop-blur-xl border-2 border-white/20 text-white rounded-xl sm:rounded-2xl font-bold hover:bg-white/20 transition-all duration-300 shadow-lg shadow-purple-900/30 transform hover:scale-105 text-center"
              >
                {t('button.signIn')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 md:py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Card 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/50 to-pink-600/50 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center border border-white/20 shadow-2xl shadow-purple-900/30 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-br from-purple-300 to-pink-300 bg-clip-text text-transparent mb-3 sm:mb-4 drop-shadow-lg">500+</div>
                <div className="text-purple-200 font-semibold text-base sm:text-lg">{t('stats.entrepreneurs')}</div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 to-cyan-600/50 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center border border-white/20 shadow-2xl shadow-blue-900/30 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-br from-blue-300 to-cyan-300 bg-clip-text text-transparent mb-3 sm:mb-4 drop-shadow-lg">100+</div>
                <div className="text-purple-200 font-semibold text-base sm:text-lg">{t('stats.startups')}</div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative sm:col-span-2 md:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/50 to-purple-600/50 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center border border-white/20 shadow-2xl shadow-indigo-900/30 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-br from-indigo-300 to-purple-300 bg-clip-text text-transparent mb-3 sm:mb-4 drop-shadow-lg">50+</div>
                <div className="text-purple-200 font-semibold text-base sm:text-lg">{t('stats.investors')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-xl border-t border-white/10 py-6 sm:py-8 md:py-10 mt-12 sm:mt-16 md:mt-20 relative z-10 shadow-lg shadow-purple-900/20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center items-center text-xs sm:text-sm text-purple-300">
            <Link href="#" className="hover:text-white transition-colors duration-300 whitespace-nowrap">{t('footer.about')}</Link>
            <span className="text-purple-500 hidden xs:inline">·</span>
            <Link href="#" className="hover:text-white transition-colors duration-300 whitespace-nowrap">{t('footer.careers')}</Link>
            <span className="text-purple-500 hidden xs:inline">·</span>
            <Link href="#" className="hover:text-white transition-colors duration-300 whitespace-nowrap">{t('footer.privacy')}</Link>
            <span className="text-purple-500 hidden xs:inline">·</span>
            <Link href="#" className="hover:text-white transition-colors duration-300 whitespace-nowrap">{t('footer.terms')}</Link>
            <span className="text-purple-500 hidden xs:inline">·</span>
            <Link href="#" className="hover:text-white transition-colors duration-300 whitespace-nowrap">{t('footer.help')}</Link>
            <span className="text-purple-500 hidden sm:inline">·</span>
            <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
              {languages.map((lang, index) => (
                <React.Fragment key={lang.code}>
                  <button
                    onClick={() => setLanguage(lang.code as any)}
                    className={`hover:text-white transition-colors duration-300 whitespace-nowrap text-xs ${language === lang.code ? 'font-bold text-pink-300' : ''}`}
                  >
                    {lang.name}
                  </button>
                  {index < languages.length - 1 && <span className="text-purple-500 hidden lg:inline">·</span>}
                </React.Fragment>
              ))}
            </div>
            <span className="text-purple-500 hidden sm:inline">·</span>
            <span className="text-purple-400 text-xs">© 2026 Alphainno</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
