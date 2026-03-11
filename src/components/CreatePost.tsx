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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <form onSubmit={handleSubmit}>
        <div className="p-4">
          <textarea
            className="w-full p-3 border-0 resize-none focus:outline-none text-lg"
            rows={3}
            placeholder="What's on your mind? Share your ideas, projects, or updates..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        
        <div className="px-4 pb-4 flex items-center justify-between border-t pt-3">
          <div className="flex gap-1">
            <button
              type="button"
              className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 text-gray-600 hover:text-primary-600"
              title="Add image"
            >
              <Image size={20} />
            </button>
            <button
              type="button"
              className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 text-gray-600 hover:text-primary-600"
              title="Add video"
            >
              <Video size={20} />
            </button>
            <button
              type="button"
              className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 text-gray-600 hover:text-primary-600"
              title="Add emoji"
            >
              <Smile size={20} />
            </button>
            <button
              type="button"
              className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 text-gray-600 hover:text-primary-600"
              title="Add location"
            >
              <MapPin size={20} />
            </button>
          </div>
          
          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="px-6 py-2.5 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
