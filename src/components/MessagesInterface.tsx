'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Search, MoreVertical } from 'lucide-react';
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

interface Conversation {
  partner: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
  };
  lastMessage: Message;
  unreadCount: number;
}

interface MessagesInterfaceProps {
  currentUser: any;
}

export default function MessagesInterface({ currentUser }: MessagesInterfaceProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch conversations on mount
  useEffect(() => {
    fetchConversations();
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversations = async () => {
    try {
      const response = await fetch('/api/messages/conversations');
      if (response.ok) {
        const data = await response.json();
        setConversations(data.conversations || []);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const fetchMessages = async (partnerId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/messages?userId=${partnerId}`);
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
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newMessage,
          receiverId: selectedConversation,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages([...messages, data.message]);
        setNewMessage('');
        fetchConversations(); // Refresh conversations
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleConversationSelect = (partnerId: string) => {
    setSelectedConversation(partnerId);
    fetchMessages(partnerId);
  };

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const selectedPartner = conversations.find(conv => conv.partner.id === selectedConversation)?.partner;

  return (
    <div className="flex flex-col lg:flex-row h-[600px]">
      {/* Conversations List */}
      <div className={`${selectedConversation ? 'hidden lg:block' : 'block'} w-full lg:w-1/3 border-r border-white/20 flex flex-col`}>
        {/* Search */}
        <div className="p-3 sm:p-4 border-b border-white/20">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" size={18} />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300/70 text-sm"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="p-4 text-center text-purple-300">
              <p className="text-sm">No conversations yet</p>
              <p className="text-xs mt-1">Start messaging other users to see conversations here</p>
            </div>
          ) : (
            conversations.map((conversation) => (
              <div
                key={conversation.partner.id}
                onClick={() => handleConversationSelect(conversation.partner.id)}
                className={`p-3 sm:p-4 border-b border-white/10 cursor-pointer hover:bg-white/10 transition ${
                  selectedConversation === conversation.partner.id ? 'bg-purple-500/20 border-purple-500/30' : ''
                }`}
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {getInitial(conversation.partner.name)}
                    </div>
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 border-2 border-purple-900 rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <Link href={`/profile/${conversation.partner.username}`}>
                        <p className="font-semibold text-white truncate hover:underline cursor-pointer text-sm sm:text-base">{conversation.partner.name}</p>
                      </Link>
                      <span className="text-xs text-purple-300 flex-shrink-0 ml-2">
                        {formatTime(conversation.lastMessage.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-purple-300 truncate mt-1">
                      {conversation.lastMessage.content}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <div className="mt-2">
                        <span className="inline-block px-2 py-0.5 bg-purple-600 text-white text-xs rounded-full">
                          {conversation.unreadCount}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`${selectedConversation ? 'flex' : 'hidden lg:flex'} flex-1 flex-col`}>
        {selectedConversation && selectedPartner ? (
          <>
            {/* Chat Header */}
            <div className="p-3 sm:p-4 border-b border-white/20 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <button 
                  onClick={() => setSelectedConversation(null)}
                  className="lg:hidden p-2 hover:bg-white/10 rounded-full transition"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {getInitial(selectedPartner.name)}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm sm:text-base">{selectedPartner.name}</p>
                  <p className="text-xs sm:text-sm text-green-400">Active now</p>
                </div>
              </div>
              <button className="p-2 hover:bg-white/10 rounded-full transition">
                <MoreVertical size={18} className="text-purple-300 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-transparent">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full"></div>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className="flex items-end gap-1.5 sm:gap-2 max-w-[85%] sm:max-w-[70%]">
                        {message.senderId !== currentUser.id && (
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm flex-shrink-0">
                            {getInitial(message.sender.name)}
                          </div>
                        )}
                        <div
                          className={`px-3 py-2 sm:px-4 rounded-2xl ${
                            message.senderId === currentUser.id
                              ? 'bg-purple-600 text-white rounded-tr-none'
                              : 'bg-white/10 text-white rounded-tl-none border border-white/20'
                          }`}
                        >
                          <p className="text-xs sm:text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.senderId === currentUser.id ? 'text-purple-200' : 'text-purple-300'
                          }`}>
                            {formatTime(message.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="p-3 sm:p-4 border-t border-white/20 bg-white/5">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 sm:px-4 bg-white/10 border border-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300/70 text-sm"
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 sm:p-2.5 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Send size={18} className="sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-transparent">
            <div className="text-center px-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send size={20} className="text-purple-400 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-white mb-2">Select a conversation</h3>
              <p className="text-purple-300 text-sm">Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}