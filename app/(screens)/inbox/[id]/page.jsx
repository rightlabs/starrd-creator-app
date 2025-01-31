'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Lock } from 'lucide-react';
import Link from 'next/link';

const MessageDetail = ({ message }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F] text-white">
      {/* Header */}
      <div className="sticky top-0 p-6 bg-black/40 backdrop-blur-xl border-b border-white/5 z-10">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4 mb-4"
        >
          <Link href="/inbox">
            <div className="w-10 h-10 bg-[#1A1A1A] border border-[#333333] rounded-xl flex items-center justify-center hover:border-[#bcee45]/50 transition-colors">
              <ArrowLeft className="w-5 h-5 text-white" />
            </div>
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white truncate">
                {message.sender.name}
              </h2>
              {message.sender.verified && (
                <Star className="w-4 h-4 text-[#bcee45] flex-shrink-0" />
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Message Content */}
      <div className="p-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1A1A1A]/60 backdrop-blur-md border border-[#333333] rounded-2xl p-6 mb-4"
        >
          <div className="text-sm text-[#888888] mb-2">{message.time}</div>
          <div className="text-white leading-relaxed">
            {/* Extended version of the preview message */}
            <p className="mb-4">
              {message.preview.replace('...', '')} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </motion.div>

        {/* Disabled Reply Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-[#1A1A1A]/40 backdrop-blur-sm border border-[#333333]/50 rounded-2xl p-6"
        >
          <div className="flex items-center justify-center gap-3 text-[#888888]">
            <Lock className="w-5 h-5" />
            <p className="text-sm font-medium">Replies are disabled for this conversation</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Usage example:
const MessageDetailPage = () => {
  // Mock message data (in real app, this would come from props or API)
  const message = {
    id: 1,
    sender: {
      name: 'Nike Sports',
      avatar: '🏢',
      verified: true
    },
    preview: 'We would love to collaborate with you on our upcoming campaign.',
    time: '2m ago',
    type: 'brand',
    unread: true
  };

  return <MessageDetail message={message} />;
};

export default MessageDetailPage;