'use client';

interface ProfileActionsProps {
  user: any;
  currentUser: any;
}

export default function ProfileActions({ user, currentUser }: ProfileActionsProps) {
  const handleOpenChat = () => {
    if (typeof window !== 'undefined' && (window as any).openChat) {
      (window as any).openChat({
        id: user.id,
        name: user.name,
        initial: user.name.charAt(0).toUpperCase(),
        color: 'from-purple-500 to-pink-500',
        online: true,
        username: user.username
      });
    }
  };

  if (!currentUser) {
    return (
      <div className="flex gap-3">
        <a href="/auth/signup" className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg">
          Join to Connect
        </a>
      </div>
    );
  }

  if (currentUser.id === user.id) {
    return (
      <div className="flex gap-3">
        <button className="px-6 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 border border-white/20">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Edit Profile
        </button>
        <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Share Update
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
        </svg>
        Connect
      </button>
      <button 
        onClick={handleOpenChat}
        className="px-6 py-3 border-2 border-white/20 text-white rounded-lg font-semibold hover:bg-white/10 hover:border-white/30 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
        </svg>
        Message
      </button>
      <div className="relative">
        <button className="px-4 py-3 border-2 border-white/20 text-white rounded-lg font-semibold hover:bg-white/10 hover:border-white/30 transition-all duration-200 shadow-md hover:shadow-lg">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>
    </div>
  );
}