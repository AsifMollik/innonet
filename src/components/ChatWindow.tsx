'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Send, Minus, MoreHorizontal, Phone, Video } from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  read: boolean;
  sender: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
  };
  receiver: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
  };
}

interface ChatWindowProps {
  contact: {
    id: string;
    name: string;
    initial: string;
    color: string;
    online: boolean;
    username?: string;
  };
  currentUser: any;
  onClose: () => void;
  onMinimize: () => void;
  isMinimized: boolean;
}

export default function ChatWindow({ contact, currentUser, onClose, onMinimize, isMinimized }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMinimized) {
      fetchMessages();
    }
  }, [contact.id, isMinimized]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/messages?userId=${contact.id}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newMessage,
          receiverId: contact.id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages([...messages, data.message]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-0 right-4 w-80 bg-white rounded-t-xl shadow-2xl border border-gray-200 z-50">
        <div 
          onClick={onMinimize}
          className="flex items-center justify-between p-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-t-xl cursor-pointer hover:from-primary-600 hover:to-primary-700 transition"
        >
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 bg-gradient-to-br ${contact.color} rounded-full flex items-center justify-center text-white font-semibold`}>
              {contact.initial}
            </div>
            <div>
              <Link href={`/profile/${contact.username}`}>
                <p className="text-sm font-semibold text-white hover:underline cursor-pointer">{contact.name}</p>
              </Link>
              <p className="text-xs text-primary-100">{contact.online ? 'Active now' : 'Offline'}</p>
            </div>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="text-white hover:bg-white/20 rounded-full p-1 transition">
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 right-4 w-80 bg-white rounded-t-xl shadow-2xl border border-gray-200 z-50 max-h-[500px] flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-t-xl">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 bg-gradient-to-br ${contact.color} rounded-full flex items-center justify-center text-white font-semibold`}>
            {contact.initial}
          </div>
          <div>
            <Link href={`/profile/${contact.username}`}>
              <p className="text-sm font-semibold text-white hover:underline cursor-pointer">{contact.name}</p>
            </Link>
            <p className="text-xs text-primary-100">{contact.online ? 'Active now' : 'Offline'}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="text-white hover:bg-white/20 rounded-full p-1 transition">
            <Phone size={16} />
          </button>
          <button className="text-white hover:bg-white/20 rounded-full p-1 transition">
            <Video size={16} />
          </button>
          <button onClick={onMinimize} className="text-white hover:bg-white/20 rounded-full p-1 transition">
            <Minus size={16} />
          </button>
          <button onClick={onClose} className="text-white hover:bg-white/20 rounded-full p-1 transition">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 min-h-[300px] max-h-[350px]">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <div className={`w-12 h-12 bg-gradient-to-br ${contact.color} rounded-full flex items-center justify-center text-white font-semibold mx-auto mb-3`}>
                  {contact.initial}
                </div>
                <p className="text-sm text-gray-600">Start a conversation with {contact.name}</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-end gap-1 max-w-[75%]">
                    {message.senderId !== currentUser.id && (
                      <div className={`w-6 h-6 bg-gradient-to-br ${contact.color} rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0`}>
                        {contact.initial}
                      </div>
                    )}
                    <div
                      className={`px-3 py-2 rounded-2xl text-sm ${
                        message.senderId === currentUser.id
                          ? 'bg-primary-600 text-white rounded-tr-none'
                          : 'bg-white text-gray-800 rounded-tl-none shadow-sm border'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.senderId === currentUser.id ? 'text-primary-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="p-3 border-t bg-white rounded-b-xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}