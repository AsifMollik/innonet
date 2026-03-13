'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Image, Video, Smile, MapPin } from 'lucide-react';

export default function CreatePost({ userId }: { userId: string }) {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, userId }),
      });

      if (res.ok) {
        setContent('');
        router.refresh();
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-sm border border-white/20">
      <form onSubmit={handleSubmit}>
        <div className="p-3 sm:p-4">
          <textarea
            className="w-full p-2 sm:p-3 border-0 resize-none focus:outline-none text-base sm:text-lg bg-transparent text-white placeholder-purple-300/70"
            rows={3}
            placeholder="What's on your mind? Share your ideas..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        
        <div className="px-3 sm:px-4 pb-3 sm:pb-4 flex items-center justify-between border-t border-white/20 pt-3">
          <div className="flex gap-0.5 sm:gap-1">
            <button
              type="button"
              className="p-2 sm:p-2.5 hover:bg-white/10 rounded-xl transition-all duration-200 text-purple-300 hover:text-purple-200"
              title="Add image"
            >
              <Image size={18} className="sm:w-5 sm:h-5" />
            </button>
            <button
              type="button"
              className="p-2 sm:p-2.5 hover:bg-white/10 rounded-xl transition-all duration-200 text-purple-300 hover:text-purple-200"
              title="Add video"
            >
              <Video size={18} className="sm:w-5 sm:h-5" />
            </button>
            <button
              type="button"
              className="p-2 sm:p-2.5 hover:bg-white/10 rounded-xl transition-all duration-200 text-purple-300 hover:text-purple-200"
              title="Add emoji"
            >
              <Smile size={18} className="sm:w-5 sm:h-5" />
            </button>
            <button
              type="button"
              className="p-2 sm:p-2.5 hover:bg-white/10 rounded-xl transition-all duration-200 text-purple-300 hover:text-purple-200 hidden xs:block"
              title="Add location"
            >
              <MapPin size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>
          
          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base"
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
