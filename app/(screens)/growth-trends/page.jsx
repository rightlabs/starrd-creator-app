'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, Star, MessageCircle, Heart, User } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const notificationTypes = {
  LIKE: 'like',
  COMMENT: 'comment',
  FOLLOW: 'follow',
  SYSTEM: 'system'
};

const notifications = [
  {
    id: 1,
    type: notificationTypes.LIKE,
    message: 'Brand Zara liked your media kit',
    time: '2m ago',
    read: false
  },
  {
    id: 2,
    type: notificationTypes.FOLLOW,
    message: 'Nike started following you',
    time: '1h ago',
    read: false
  },
  {
    id: 3,
    type: notificationTypes.COMMENT,
    message: 'Adidas commented on your profile',
    time: '2h ago',
    read: true
  },
  {
    id: 4,
    type: notificationTypes.SYSTEM,
    message: 'Your profile strength increased by 20%',
    time: '1d ago',
    read: true
  }
];

const NotificationsPage = () => {
  const [activeNotifications, setActiveNotifications] = useState(notifications);

  const getNotificationIcon = (type) => {
    switch (type) {
      case notificationTypes.LIKE:
        return <Heart className="w-5 h-5 text-pink-500" />;
      case notificationTypes.COMMENT:
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case notificationTypes.FOLLOW:
        return <User className="w-5 h-5 text-[#bcee45]" />;
      case notificationTypes.SYSTEM:
        return <Star className="w-5 h-5 text-yellow-500" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const markAsRead = (id) => {
    setActiveNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F] text-white pb-24">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-black/40 backdrop-blur-lg border-b border-white/5 sticky top-0 z-50"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-[#1A1A1A] border border-[#333333] rounded-xl flex items-center justify-center hover:border-[#bcee45]/50 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-[#bcee45]" />
              </motion.button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">Growth Trends</h1>
              <p className="text-sm text-[#888888]">Stay updated with your activity</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Notifications List */}
      <div className="max-w-xl mx-auto p-6">
        <div className="space-y-4">
          {activeNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => markAsRead(notification.id)}
              className={`p-4 bg-[#1A1A1A]/60 backdrop-blur-md rounded-xl border 
                ${notification.read ? 'border-[#333333]' : 'border-[#bcee45]'} 
                hover:border-[#bcee45]/50 transition-all cursor-pointer`}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#252525] rounded-xl flex items-center justify-center">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <p className={`${notification.read ? 'text-[#888888]' : 'text-white'}`}>
                    {notification.message}
                  </p>
                  <p className="text-sm text-[#666666] mt-1">{notification.time}</p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-[#bcee45] rounded-full" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navbar */}
      <Navbar />
    </div>
  );
};

export default NotificationsPage;