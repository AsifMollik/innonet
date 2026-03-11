import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">I</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Innonet</span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="px-5 py-2 text-gray-700 hover:text-primary-600 font-medium transition"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="px-5 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Simple and Clean with Background */}
      <section className="py-16 px-6 relative overflow-hidden min-h-[500px] flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/Innovation.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 to-primary-900/85 z-0"></div>
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Innovation Networking Platform
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
              Connect. Innovate. Grow.
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              A dedicated social platform for Bangladeshi entrepreneurs, startup founders, and innovators.
              Share ideas, find mentors, and build the future together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
              >
                Join Free
              </Link>
              <Link
                href="/auth/login"
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-gray-200">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div className="border-r border-gray-200 last:border-r-0">
              <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-sm text-gray-600">Entrepreneurs</div>
            </div>
            <div className="border-r border-gray-200 last:border-r-0">
              <div className="text-3xl font-bold text-primary-600 mb-2">100+</div>
              <div className="text-sm text-gray-600">Startups</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
              <div className="text-sm text-gray-600">Investors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Simple Cards */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Why Innonet?
            </h2>
            <p className="text-gray-600">
              Everything you need to succeed as an entrepreneur in Bangladesh
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-primary-500 transition">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl">💡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Share Ideas</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Post your innovative ideas and get valuable feedback from the community
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-primary-500 transition">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Build Network</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Connect with entrepreneurs, investors, and mentors across Bangladesh
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-primary-500 transition">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Grow Together</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Collaborate and build Bangladesh's thriving tech ecosystem
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Join Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Who Can Join?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl">👨‍💼</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Entrepreneurs</h4>
                <p className="text-gray-600 text-sm">Founders and aspiring entrepreneurs building new ventures</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-purple-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl">💰</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Investors</h4>
                <p className="text-gray-600 text-sm">Angel investors and VCs looking for promising startups</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-indigo-50 rounded-xl">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl">👨‍🏫</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Mentors</h4>
                <p className="text-gray-600 text-sm">Experienced professionals guiding the next generation</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-cyan-50 rounded-xl">
              <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl">🛠️</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Service Providers</h4>
                <p className="text-gray-600 text-sm">Professionals offering services to help startups grow</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Innonet Today
          </h2>
          <p className="text-lg text-primary-100 mb-8">
            Connect with thousands of entrepreneurs building Bangladesh's future
          </p>
          <Link
            href="/auth/signup"
            className="inline-block px-8 py-3 bg-white text-primary-700 rounded-lg font-semibold hover:bg-gray-50 transition shadow-xl"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer - Facebook Style */}
      <footer className="bg-white py-8">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* All in One Line - Centered */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-gray-600">
            {/* Languages */}
            <a href="#" className="hover:underline">English (UK)</a>
            <a href="#" className="hover:underline">বাংলা</a>
            <a href="#" className="hover:underline">हिन्दी</a>
            <a href="#" className="hover:underline">اردو</a>
            <a href="#" className="hover:underline">中文(简体)</a>
            <a href="#" className="hover:underline">Español</a>
            <a href="#" className="hover:underline">Français</a>
            <a href="#" className="hover:underline">العربية</a>
            
            {/* Separator */}
            <span className="text-gray-400">|</span>
            
            {/* Page Links */}
            <a href="/about" className="hover:underline">About</a>
            <a href="/help" className="hover:underline">Help</a>
            <a href="/contact" className="hover:underline">Contact</a>
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
            <a href="/terms" className="hover:underline">Terms & Conditions</a>
            
            {/* Logo and Copyright */}
            <div className="flex items-center gap-2 text-gray-500">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-gradient-to-br from-primary-600 to-primary-700 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-[10px]">I</span>
                </div>
                <span className="font-semibold">Innonet</span>
              </div>
              <span>© 2026</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
