'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Star, 
  ChevronRight, 
  Instagram, 
  Youtube,
  Camera,
  Edit,
  User,
  Sparkles
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

const ProfilePage = () => {
  const stats = [
    { label: 'Total Reach', value: '25.4K', icon: '📈' },
    { label: 'Engagement', value: '87%', icon: '⭐' },
    { label: 'Projects', value: '12', icon: '🎯' }
  ];

  const socialAccounts = [
    { 
      platform: 'Instagram',
      username: '@tushar.design',
      followers: '12.5K',
      icon: <Instagram className="w-5 h-5" />,
      verified: true,
      gradient: 'from-pink-500 to-purple-600'
    },
    { 
      platform: 'YouTube',
      username: 'Tushar Creates',
      followers: '8.2K',
      icon: <Youtube className="w-5 h-5" />,
      verified: true,
      gradient: 'from-red-500 to-pink-600'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F] text-white">
      {/* Cover Image Section */}
      <div className="relative h-72">
        <Image
          src="/welcome-2.jpg"
          alt="Cover Image"
          className="object-cover w-full h-full brightness-75"
          width={1200}
          height={400}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-[#0A0A0A]" />
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-6 right-6 w-10 h-10 rounded-xl flex items-center justify-center bg-black/30 backdrop-blur-md border border-white/20 hover:border-[#bcee45]/50 transition-all"
        >
          <Settings className="w-5 h-5 text-white" />
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="px-6 -mt-24 relative flex-grow">
        {/* Profile Image */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="relative w-32 h-32 mx-auto mb-6"
        >
          <div className="w-full h-full bg-gradient-to-br from-[#bcee45] to-[#9BC53D] rounded-2xl flex items-center justify-center border-4 border-black shadow-xl shadow-[#bcee45]/20">
            <User className="w-16 h-16 text-black" />
          </div>
          <button className="absolute bottom-0 right-0 w-10 h-10 bg-black rounded-xl flex items-center justify-center border border-[#bcee45] shadow-lg">
            <Camera className="w-5 h-5 text-[#bcee45]" />
          </button>
        </motion.div>

        {/* Profile Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <h1 className="text-3xl font-bold text-white">
              Tushar Agarwal
            </h1>
            <Sparkles className="w-6 h-6 text-[#bcee45]" />
          </div>
          <p className="text-[#888888] text-lg">Digital Creator & UI Designer</p>
          <button className="mt-4 px-6 py-2.5 bg-gradient-to-r from-[#bcee45] to-[#9BC53D] text-black rounded-xl text-sm font-semibold flex items-center gap-2 mx-auto hover:opacity-90 transition-all">
            <Edit className="w-4 h-4" />
            Edit Profile
          </button>
        </motion.div>

     

        {/* Connected Accounts */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4 mb-12"
        >
          <h2 className="text-xl font-semibold mb-6 text-white">
            Connected Accounts
          </h2>
          {socialAccounts.map((account) => (
            <motion.div 
              key={account.platform}
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-[#1A1A1A]/60 backdrop-blur-md rounded-2xl border border-[#333333] hover:border-[#bcee45]/20 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${account.gradient} rounded-xl flex items-center justify-center text-white`}>
                  {account.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{account.platform}</span>
                    {account.verified && (
                      <Star className="w-4 h-4 text-[#bcee45]" />
                    )}
                  </div>
                  <div className="text-sm text-[#888888]">
                    {account.username} • {account.followers} followers
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#888888]" />
              </div>
            </motion.div>
          ))}
        </motion.div>
           {/* Stats */}
           <div className="grid grid-cols-3 gap-2 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1A1A1A]/60 backdrop-blur-md rounded-2xl p-4 text-center border border-[#333333] hover:border-[#bcee45]/20 transition-all"
            >
              <div className="text-2xl mb-1 flex items-center justify-center gap-2">
                <span className="font-bold text-white">{stat.value}</span>
                <span className="text-xl">{stat.icon}</span>
              </div>
              <div className="text-sm text-[#888888]">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Account Settings */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-24"
        >
          <h2 className="text-xl font-semibold mb-6 text-white">
            Account Settings
          </h2>
          <div className="space-y-2">
            {[
              { name: 'Personal Information', icon: '👤' },
              { name: 'Notifications', icon: '🔔' },
              { name: 'Privacy & Security', icon: '🔒' },
              { name: 'Payment Methods', icon: '💳' },
              { name: 'Help & Support', icon: '💡' }
            ].map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ x: 4 }}
                className="w-full p-4 flex items-center justify-between bg-[#1A1A1A]/60 backdrop-blur-md rounded-xl border border-[#333333] hover:border-[#bcee45]/20 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-white group-hover:text-[#bcee45] transition-colors">{item.name}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#888888] group-hover:text-[#bcee45] transition-colors" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      <Navbar />
    </div>
  );
};

export default ProfilePage;