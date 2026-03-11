'use client';

import { useState } from 'react';
import ChatWindow from './ChatWindow';

interface ChatContact {
  id: string;
  name: string;
  initial: string;
  color: string;
  online: boolean;
  username?: string;
}

interface ChatManagerProps {
  currentUser: any;
}

export default function ChatManager({ currentUser }: ChatManagerProps) {
  const [openChats, setOpenChats] = useState<ChatContact[]>([]);
  const [minimizedChats, setMinimizedChats] = useState<Set<string>>(new Set());

  const openChat = (contact: ChatContact) => {
    // Check if chat is already open
    const existingChat = openChats.find(chat => chat.id === contact.id);
    if (!existingChat) {
      // Limit to 3 open chats maximum
      if (openChats.length >= 3) {
        setOpenChats([...openChats.slice(1), contact]);
      } else {
        setOpenChats([...openChats, contact]);
      }
    }
    // If chat was minimized, restore it
    if (minimizedChats.has(contact.id)) {
      const newMinimized = new Set(minimizedChats);
      newMinimized.delete(contact.id);
      setMinimizedChats(newMinimized);
    }
  };

  const closeChat = (contactId: string) => {
    setOpenChats(openChats.filter(chat => chat.id !== contactId));
    const newMinimized = new Set(minimizedChats);
    newMinimized.delete(contactId);
    setMinimizedChats(newMinimized);
  };

  const toggleMinimize = (contactId: string) => {
    const newMinimized = new Set(minimizedChats);
    if (minimizedChats.has(contactId)) {
      newMinimized.delete(contactId);
    } else {
      newMinimized.add(contactId);
    }
    setMinimizedChats(newMinimized);
  };

  // Expose openChat function globally so other components can use it
  if (typeof window !== 'undefined') {
    (window as any).openChat = openChat;
  }

  return (
    <>
      {openChats.map((contact, index) => (
        <div
          key={contact.id}
          style={{
            right: `${20 + (index * 340)}px`, // Stack chats horizontally
          }}
          className="fixed bottom-0 z-50"
        >
          <ChatWindow
            contact={contact}
            currentUser={currentUser}
            onClose={() => closeChat(contact.id)}
            onMinimize={() => toggleMinimize(contact.id)}
            isMinimized={minimizedChats.has(contact.id)}
          />
        </div>
      ))}
    </>
  );
}