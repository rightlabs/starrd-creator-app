'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {  Settings,  Star,  ChevronRight,  Instagram,  Youtube, Camera, Edit, User,  Sparkles,Share2} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import ProfileAvatar from '@/components/ProfileAvatar';
import Link from 'next/link';
import { LogoutDialog } from '@/components/LogoutDialog';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const router=useRouter()

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const handleLogout = () => {
    console.log('User logged out');
    router.push("/welcome")
    // Redirect to login page or handle logout
  };

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

  const settingsOptions = [
    { 
      name: 'Privacy & Security', 
      icon: '🔒', 
      link: '/profile/privacy-and-security' 
    },
    { 
      name: 'Payment Methods', 
      icon: '💳', 
      link: '/profile/payment-methods' 
    },
    { 
      name: 'Help & Support', 
      icon: '💡', 
      link: '/profile/help-and-support' 
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
      
      </div>

      {/* Main Content */}
      <div className="px-6 -mt-24 relative flex-grow">
        {/* Profile Image */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="relative w-32 h-32 mx-auto mb-6"
        >
      {/* Profile Image */}
<motion.div 
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  className="relative mx-auto mb-6"
>
  <ProfileAvatar
    completion={50} // Pass the actual completion percentage here
    image="/welcome-1.jpg" // Pass the user's image URL
  />
</motion.div>
         
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
            <Share2 className="w-4 h-4" />
           Share Your profile
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
          {/* Regular settings options */}
          {settingsOptions.map((item) => (
            <Link href={item.link} key={item.name}>
              <motion.button
                whileHover={{ x: 4 }}
                className="w-full p-4 flex items-center justify-between bg-[#1A1A1A]/60 backdrop-blur-md rounded-xl border border-[#333333] hover:border-[#bcee45]/20 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-white group-hover:text-[#bcee45] transition-colors">
                    {item.name}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#888888] group-hover:text-[#bcee45] transition-colors" />
              </motion.button>
            </Link>
          ))}

          {/* Logout button */}
          <motion.button
            whileHover={{ x: 4 }}
            onClick={() => setShowLogoutDialog(true)}
            className="w-full p-4 flex items-center justify-between bg-[#1A1A1A]/60 backdrop-blur-md rounded-xl border border-[#333333] hover:border-red-500/20 transition-all group"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🚪</span>
              <span className="text-white group-hover:text-red-500 transition-colors">
                Logout
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-[#888888] group-hover:text-red-500 transition-colors" />
          </motion.button>
        </div>
      </motion.div>

      {/* Logout Dialog */}
      <AnimatePresence>
        <LogoutDialog
          isOpen={showLogoutDialog}
          onClose={() => setShowLogoutDialog(false)}
          onConfirm={() => {
            handleLogout();
            setShowLogoutDialog(false);
          }}
        />
      </AnimatePresence>

      <Navbar />
    </div>
  </div>
  );
};

export default ProfilePage;
