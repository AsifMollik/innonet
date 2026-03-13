'use client';

import Link from 'next/link';
import { Rocket, TrendingUp, Users, DollarSign, Lightbulb, Calendar, BookOpen, Briefcase, MessageSquare, Award, Clock, Zap, Target } from 'lucide-react';

export default function Sidebar({ user }: { user: any }) {
  return (
    <div className="space-y-3">
      {/* Ecosystem Menu */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-lg border border-white/20">
        <div className="p-1.5">
          <Link href="/startups" className="flex items-center gap-2.5 p-2.5 hover:bg-purple-500/20 rounded-xl transition-all duration-200 group">
            <div className="w-9 h-9 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:bg-purple-500/30 group-hover:scale-105 transition-all duration-200 flex-shrink-0">
              <Rocket size={18} className="text-purple-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">Startups</p>
              <p className="text-xs text-purple-300 truncate">Discover & showcase</p>
            </div>
          </Link>
          
          <Link href="/funding" className="flex items-center gap-2.5 p-2.5 hover:bg-green-500/20 rounded-xl transition-all duration-200 group">
            <div className="w-9 h-9 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:bg-green-500/30 group-hover:scale-105 transition-all duration-200 flex-shrink-0">
              <DollarSign size={18} className="text-green-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">Funding</p>
              <p className="text-xs text-purple-300 truncate">Investors & opportunities</p>
            </div>
          </Link>

          <Link href="/mentorship" className="flex items-center gap-2.5 p-2.5 hover:bg-pink-500/20 rounded-xl transition-all duration-200 group">
            <div className="w-9 h-9 bg-pink-500/20 rounded-xl flex items-center justify-center group-hover:bg-pink-500/30 group-hover:scale-105 transition-all duration-200 flex-shrink-0">
              <Users size={18} className="text-pink-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">Mentorship</p>
              <p className="text-xs text-purple-300 truncate">Connect with experts</p>
            </div>
          </Link>

          <Link href="/ideas" className="flex items-center gap-2.5 p-2.5 hover:bg-yellow-500/20 rounded-xl transition-all duration-200 group">
            <div className="w-9 h-9 bg-yellow-500/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-500/30 group-hover:scale-105 transition-all duration-200 flex-shrink-0">
              <Lightbulb size={18} className="text-yellow-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">Ideas Hub</p>
              <p className="text-xs text-purple-300 truncate">Share & collaborate</p>
            </div>
          </Link>

          <Link href="/events" className="flex items-center gap-2.5 p-2.5 hover:bg-blue-500/20 rounded-xl transition-all duration-200 group">
            <div className="w-9 h-9 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 group-hover:scale-105 transition-all duration-200 flex-shrink-0">
              <Calendar size={18} className="text-blue-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">Events</p>
              <p className="text-xs text-purple-300 truncate">Meetups & webinars</p>
            </div>
          </Link>

          <Link href="/jobs" className="flex items-center gap-2.5 p-2.5 hover:bg-indigo-500/20 rounded-xl transition-all duration-200 group">
            <div className="w-9 h-9 bg-indigo-500/20 rounded-xl flex items-center justify-center group-hover:bg-indigo-500/30 group-hover:scale-105 transition-all duration-200 flex-shrink-0">
              <Briefcase size={18} className="text-indigo-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">Jobs</p>
              <p className="text-xs text-purple-300 truncate">Startup opportunities</p>
            </div>
          </Link>

          <Link href="/resources" className="flex items-center gap-2.5 p-2.5 hover:bg-orange-500/20 rounded-xl transition-all duration-200 group">
            <div className="w-9 h-9 bg-orange-500/20 rounded-xl flex items-center justify-center group-hover:bg-orange-500/30 group-hover:scale-105 transition-all duration-200 flex-shrink-0">
              <BookOpen size={18} className="text-orange-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">Resources</p>
              <p className="text-xs text-purple-300 truncate">Guides & templates</p>
            </div>
          </Link>

          <Link href="/community" className="flex items-center gap-2.5 p-2.5 hover:bg-pink-500/20 rounded-xl transition-all duration-200 group">
            <div className="w-9 h-9 bg-pink-500/20 rounded-xl flex items-center justify-center group-hover:bg-pink-500/30 group-hover:scale-105 transition-all duration-200 flex-shrink-0">
              <MessageSquare size={18} className="text-pink-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">Community</p>
              <p className="text-xs text-purple-300 truncate">Groups & forums</p>
            </div>
          </Link>

          <Link href="/achievements" className="flex items-center gap-2.5 p-2.5 hover:bg-teal-500/20 rounded-xl transition-all duration-200 group">
            <div className="w-9 h-9 bg-teal-500/20 rounded-xl flex items-center justify-center group-hover:bg-teal-500/30 group-hover:scale-105 transition-all duration-200 flex-shrink-0">
              <Award size={18} className="text-teal-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">Achievements</p>
              <p className="text-xs text-purple-300 truncate">Milestones & awards</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-lg border border-white/20">
        <div className="p-3 border-b border-white/10">
          <h3 className="font-semibold text-white text-sm flex items-center gap-2">
            <Clock size={16} className="text-blue-400" />
            Upcoming Events
          </h3>
        </div>
        <div className="p-2">
          <Link href="/events/1" className="block p-2.5 hover:bg-blue-500/20 rounded-xl transition-all duration-200">
            <div className="flex gap-2">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-500/20 rounded-lg flex flex-col items-center justify-center">
                <span className="text-xs font-semibold text-blue-300">MAR</span>
                <span className="text-sm font-bold text-blue-200">12</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Startup Pitch Night</p>
                <p className="text-xs text-purple-300">Tomorrow, 6:00 PM</p>
              </div>
            </div>
          </Link>
          <Link href="/events/2" className="block p-2.5 hover:bg-blue-500/20 rounded-xl transition-all duration-200">
            <div className="flex gap-2">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-500/20 rounded-lg flex flex-col items-center justify-center">
                <span className="text-xs font-semibold text-blue-300">MAR</span>
                <span className="text-sm font-bold text-blue-200">15</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Investor Meetup</p>
                <p className="text-xs text-purple-300">Friday, 5:00 PM</p>
              </div>
            </div>
          </Link>
          <Link href="/events/3" className="block p-2.5 hover:bg-blue-500/20 rounded-xl transition-all duration-200">
            <div className="flex gap-2">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-500/20 rounded-lg flex flex-col items-center justify-center">
                <span className="text-xs font-semibold text-blue-300">MAR</span>
                <span className="text-sm font-bold text-blue-200">20</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Tech Summit 2026</p>
                <p className="text-xs text-purple-300">Next Wed, 10:00 AM</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="p-2 border-t border-white/10">
          <Link href="/events" className="block text-center text-sm text-pink-400 hover:text-pink-300 font-medium py-1">
            View all events
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-purple-600/40 to-pink-600/40 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2 text-white">
          <Zap size={16} />
          Quick Actions
        </h3>
        <div className="space-y-2">
          <Link href="/pitch" className="block bg-white/10 hover:bg-white/20 rounded-lg p-2.5 transition-all duration-200">
            <p className="text-sm font-medium text-white">📊 Create Pitch Deck</p>
          </Link>
          <Link href="/find-cofounder" className="block bg-white/10 hover:bg-white/20 rounded-lg p-2.5 transition-all duration-200">
            <p className="text-sm font-medium text-white">🤝 Find Co-founder</p>
          </Link>
          <Link href="/apply-funding" className="block bg-white/10 hover:bg-white/20 rounded-lg p-2.5 transition-all duration-200">
            <p className="text-sm font-medium text-white">💰 Apply for Funding</p>
          </Link>
        </div>
      </div>

      {/* Milestones Tracker */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-lg border border-white/20">
        <div className="p-3 border-b border-white/10">
          <h3 className="font-semibold text-white text-sm flex items-center gap-2">
            <Target size={16} className="text-green-400" />
            Your Milestones
          </h3>
        </div>
        <div className="p-3">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-purple-300">Profile Completion</span>
                <span className="font-medium text-white">75%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-purple-300">Network Growth</span>
                <span className="font-medium text-white">45%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
          <Link href="/milestones" className="block text-center text-sm text-pink-400 hover:text-pink-300 font-medium mt-3">
            View all milestones
          </Link>
        </div>
      </div>
    </div>
  );
}
