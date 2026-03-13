'use client';

import { useState } from 'react';
import { Sparkles, DollarSign, Lightbulb, Calendar, Users } from 'lucide-react';

export default function FeedFilters() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Posts', icon: Sparkles },
    { id: 'funding', label: 'Funding', icon: DollarSign },
    { id: 'ideas', label: 'Ideas', icon: Lightbulb },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'collaboration', label: 'Collaboration', icon: Users },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-sm border border-white/20">
      <div className="flex gap-2 overflow-x-auto p-2">
        {filters.map((filter) => {
          const Icon = filter.icon;
          return (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                  : 'text-purple-300 hover:bg-white/10'
              }`}
            >
              <Icon size={16} />
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
