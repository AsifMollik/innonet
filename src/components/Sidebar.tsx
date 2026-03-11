'use client';

import Link from 'next/link';
import { Rocket, TrendingUp, Users, DollarSign, Lightbulb, Calendar, BookOpen, Briefcase, MessageSquare, Award, Clock, Zap, Target } from 'lucide-react';

export default function Sidebar({ user }: { user: any }) {
  return (
    <div className="space-y-3">
      {/* Ecosystem Menu */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-1.5">
          <Link href="/startups" className="flex items-center gap-2.5 p-2.5 hover:bg-primary-50 rounded-xl transition-all duration-200 group">
            <div className="w-9 h-9 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 group-hover:scale-105 transition-all duration-200 flex-shrink-0">
              <Rocket size={18} className="text-primary-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Startups</p>
              <p className="text-xs text-gray-500 truncate">Discover & showcase</p>
            </div>
          </Link>
          
          <Link href="/funding" className="flex items-center gap-2.5 p-2.5 hover:bg-green-50 rounded-xl transition-all duration-200 group">
            <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 group-hover:scale-105 transition-all duration-200 flex-shrink-0">
              <DollarSign size={18} className="text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Funding</p>
              <p className="text-xs text-gray-500 truncate">Investors & opportunities</p>
            </div>
          </Link>

          <Link href="/mentorship" className="flex items-center gap-2.5 p-2.5 hover:bg-purple-50 rounded-xl transition-all duration-200 group">
            <div className="w-9 h-9 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 group-hover:scale-105 transition-all duration-200 flex-shrink-0">
              <Users size={18} className="text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Mentorship</p>
              <p className="text-xs text-gray-500 truncate">Connect with experts</p>
            </div>
          </Link>

          <Link href="/ideas" className="flex items-center gap-2.5 p-2.5 hover:bg-yellow-50 rounded-xl transition-all duration-200 group">
            <div className="w-9 h-9 bg-yellow-100 rounded-xl flex items-center justify-center group-hover:bg-yellow-200 group-hover:scale-105 transition-all duration-200 flex-shrink-0">
              <Lightbulb size={18} className="text-yellow-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Ideas Hub</p>
              <p className="text-xs text-gray-500 truncate">Share & collaborate</p>
            </div>
          </Link>

          <Link href="/events" className="flex items-center gap-2.5 p-2.5 hover:bg-blue-50 rounded-xl transition-all duration-200 group">
            <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 group-hover:scale-105 transition-all duration-200 flex-shrink-0">
              <Calendar size={18} className="text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Events</p>
              <p className="text-xs text-gray-500 truncate">Meetups & webinars</p>
            </div>
          </Link>

          <Link href="/jobs" className="flex items-center gap-2.5 p-2.5 hover:bg-indigo-50 rounded-xl transition-all duration-200 group">
            <div className="w-9 h-9 bg-indigo-100 rounded-xl flex items-center justify-center group-hover:bg-indigo-200 group-hover:scale-105 transition-all duration-200 flex-shrink-0">
              <Briefcase size={18} className="text-indigo-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Jobs</p>
              <p className="text-xs text-gray-500 truncate">Startup opportunities</p>
            </div>
          </Link>

          <Link href="/resources" className="flex items-center gap-2.5 p-2.5 hover:bg-orange-50 rounded-xl transition-all duration-200 group">
            <div className="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-200 group-hover:scale-105 transition-all duration-200 flex-shrink-0">
              <BookOpen size={18} className="text-orange-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Resources</p>
              <p className="text-xs text-gray-500 truncate">Guides & templates</p>
            </div>
          </Link>

          <Link href="/community" className="flex items-center gap-2.5 p-2.5 hover:bg-pink-50 rounded-xl transition-all duration-200 group">
            <div className="w-9 h-9 bg-pink-100 rounded-xl flex items-center justify-center group-hover:bg-pink-200 group-hover:scale-105 transition-all duration-200 flex-shrink-0">
              <MessageSquare size={18} className="text-pink-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Community</p>
              <p className="text-xs text-gray-500 truncate">Groups & forums</p>
            </div>
          </Link>

          <Link href="/achievements" className="flex items-center gap-2.5 p-2.5 hover:bg-teal-50 rounded-xl transition-all duration-200 group">
            <div className="w-9 h-9 bg-teal-100 rounded-xl flex items-center justify-center group-hover:bg-teal-200 group-hover:scale-105 transition-all duration-200 flex-shrink-0">
              <Award size={18} className="text-teal-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Achievements</p>
              <p className="text-xs text-gray-500 truncate">Milestones & awards</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-3 border-b">
          <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
            <Clock size={16} className="text-blue-600" />
            Upcoming Events
          </h3>
        </div>
        <div className="p-2">
          <Link href="/events/1" className="block p-2.5 hover:bg-blue-50 rounded-xl transition-all duration-200">
            <div className="flex gap-2">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex flex-col items-center justify-center">
                <span className="text-xs font-semibold text-blue-600">MAR</span>
                <span className="text-sm font-bold text-blue-700">12</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Startup Pitch Night</p>
                <p className="text-xs text-gray-500">Tomorrow, 6:00 PM</p>
              </div>
            </div>
          </Link>
          <Link href="/events/2" className="block p-2.5 hover:bg-blue-50 rounded-xl transition-all duration-200">
            <div className="flex gap-2">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex flex-col items-center justify-center">
                <span className="text-xs font-semibold text-blue-600">MAR</span>
                <span className="text-sm font-bold text-blue-700">15</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Investor Meetup</p>
                <p className="text-xs text-gray-500">Friday, 5:00 PM</p>
              </div>
            </div>
          </Link>
          <Link href="/events/3" className="block p-2.5 hover:bg-blue-50 rounded-xl transition-all duration-200">
            <div className="flex gap-2">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex flex-col items-center justify-center">
                <span className="text-xs font-semibold text-blue-600">MAR</span>
                <span className="text-sm font-bold text-blue-700">20</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Tech Summit 2026</p>
                <p className="text-xs text-gray-500">Next Wed, 10:00 AM</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="p-2 border-t">
          <Link href="/events" className="block text-center text-sm text-primary-600 hover:text-primary-700 font-medium py-1">
            View all events
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl shadow-sm p-4 text-white">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Zap size={16} />
          Quick Actions
        </h3>
        <div className="space-y-2">
          <Link href="/pitch" className="block bg-white/10 hover:bg-white/20 rounded-lg p-2.5 transition-all duration-200">
            <p className="text-sm font-medium">📊 Create Pitch Deck</p>
          </Link>
          <Link href="/find-cofounder" className="block bg-white/10 hover:bg-white/20 rounded-lg p-2.5 transition-all duration-200">
            <p className="text-sm font-medium">🤝 Find Co-founder</p>
          </Link>
          <Link href="/apply-funding" className="block bg-white/10 hover:bg-white/20 rounded-lg p-2.5 transition-all duration-200">
            <p className="text-sm font-medium">💰 Apply for Funding</p>
          </Link>
        </div>
      </div>

      {/* Milestones Tracker */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-3 border-b">
          <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
            <Target size={16} className="text-green-600" />
            Your Milestones
          </h3>
        </div>
        <div className="p-3">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600">Profile Completion</span>
                <span className="font-medium text-gray-900">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600">Network Growth</span>
                <span className="font-medium text-gray-900">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
          <Link href="/milestones" className="block text-center text-sm text-primary-600 hover:text-primary-700 font-medium mt-3">
            View all milestones
          </Link>
        </div>
      </div>
    </div>
  );
}
