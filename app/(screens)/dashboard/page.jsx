'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Bell, Settings, User, TrendingUp, MessageSquare, Calendar, Users } from 'lucide-react';

const HomePage = () => {
  const stats = [
    { label: 'Profile Views', value: '2.4K', trend: '+12%' },
    { label: 'Engagement', value: '86%', trend: '+5%' },
    { label: 'Reach', value: '15K', trend: '+28%' }
  ];

  const quickActions = [
    { icon: <MessageSquare className="w-6 h-6" />, label: 'Messages', count: 3 },
    { icon: <Calendar className="w-6 h-6" />, label: 'Meetings', count: 2 },
    { icon: <Users className="w-6 h-6" />, label: 'Collabs', count: 5 }
  ];

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="bg-black text-primary p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Star className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Starrd</h1>
          </div>
          <div className="flex gap-4">
            <Bell className="w-6 h-6" />
            <Settings className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="p-6">
        <motion.div 
          className="flex items-center gap-4 mb-8"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Welcome back!</h2>
            <p className="text-black/60">Let's grow your influence</p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-black rounded-2xl p-4 text-primary"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-sm opacity-80">{stat.label}</div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className="text-green-400 text-sm">{stat.trend}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-black rounded-2xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-primary font-semibold">Quick Actions</h3>
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.label}
                className="bg-primary/10 rounded-xl p-4 text-primary flex flex-col items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {action.icon}
                <span className="text-sm">{action.label}</span>
                {action.count > 0 && (
                  <span className="bg-primary text-black text-xs px-2 py-1 rounded-full">
                    {action.count}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-black rounded-2xl p-6">
          <h3 className="text-primary font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 text-primary"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="flex-1">
                  <p className="text-sm">New collaboration request</p>
                  <span className="text-xs opacity-60">2 hours ago</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <motion.nav 
        className="fixed bottom-0 inset-x-0 bg-black text-primary p-4 rounded-t-3xl"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
      >
        <div className="flex justify-around">
          {['Home', 'Analytics', 'Profile', 'Settings'].map((item) => (
            <button 
              key={item}
              className="flex flex-col items-center gap-1"
            >
              <Star className="w-6 h-6" />
              <span className="text-xs">{item}</span>
            </button>
          ))}
        </div>
      </motion.nav>
    </div>
  );
};

export default HomePage;