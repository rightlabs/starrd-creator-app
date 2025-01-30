'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

const InboxPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  // Get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const messages = [
    {
      id: 1,
      sender: {
        name: 'Nike Sports',
        verified: true
      },
      preview: 'We would love to collaborate with you on our upcoming campaign...',
      time: '2m ago',
      type: 'brand',
      unread: true
    },
    {
      id: 2,
      sender: {
        name: 'Sarah Williams',
        verified: false
      },
      preview: 'Thanks for accepting my connection request! I wanted to discuss...',
      time: '1h ago',
      type: 'creator',
      unread: true
    },
    {
      id: 3,
      sender: {
        name: 'Adidas',
        verified: true
      },
      preview: 'Your proposal has been reviewed and we would like to proceed...',
      time: '3h ago',
      type: 'brand',
      unread: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F] text-white pb-24">
      {/* Header */}
      <div className="p-6 bg-black/40 backdrop-blur-lg border-b border-white/5">
        <div className="flex justify-between items-center mb-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-4"
          >
            <Link href="/dashboard">
              <div className="w-10 h-10 bg-[#1A1A1A] border border-[#333333] rounded-xl flex items-center justify-center hover:border-[#bcee45]/50 transition-colors">
                <ArrowLeft className="w-5 h-5 text-white" />
              </div>
            </Link>
            <h1 className="text-2xl font-bold text-white">Inbox</h1>
          </motion.div>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full bg-[#1A1A1A]/60 border border-[#333333] rounded-xl py-3 px-5 pl-12 text-white placeholder-[#888888] focus:outline-none focus:border-[#bcee45]/50 transition-colors"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#888888]" />
        </motion.div>
      </div>

      {/* Messages List */}
      <div className="px-6 mt-4">
        <div className="space-y-3">
          {messages.map((message, index) => (
            <Link href={`/inbox/${message.id}`} key={message.id}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                className={`p-4 rounded-2xl border transition-all hover:border-[#bcee45]/20 ${
                  message.unread
                    ? 'bg-[#1A1A1A]/60 backdrop-blur-md border-[#333333]'
                    : 'bg-[#1A1A1A]/40 border-[#333333]/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#1A1A1A] border border-[#333333] rounded-xl flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary">
                      {getInitials(message.sender.name)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-white truncate">
                        {message.sender.name}
                      </span>
                      {message.sender.verified && (
                        <Star className="w-4 h-4 text-[#bcee45] flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-[#888888] line-clamp-1">
                      {message.preview}
                    </p>
                  </div>
                  <div className="text-xs text-[#888888] flex-shrink-0">
                    {message.time}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default InboxPage;