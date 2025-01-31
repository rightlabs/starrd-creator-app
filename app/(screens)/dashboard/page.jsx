'use client'
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Star, BarChart, Bell, Eye, Share2, Users, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import PreviewButton from '@/components/PreviewButton';
import Link from 'next/link';
import FeatureCards from '@/components/DashborardFeatures';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F] text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <Stars />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="pb-24 relative z-10"
        >
          {/* Header */}
          <div className="p-6 bg-black/40 backdrop-blur-lg border-b border-white/5">
            <div className="flex justify-between items-center">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
              >
                <Image src="/starrd-logo.png" alt="logo" height={140} width={140} />
              </motion.div>
              
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="relative"
              >
                <div className="w-12 h-12 bg-[#1A1A1A] border border-[#333333] rounded-full flex items-center justify-center hover:border-[#bcee45]/50 transition-colors">
                 <Link href="/notifications"> <Bell className="w-6 h-6 text-[#bcee45]" /> </Link>
                  <span className="absolute -top-1 -right-1 bg-[#bcee45] text-black w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Profile Progress Section */}
          <div className="p-6">
            <motion.div 
              className="p-6 bg-[#1A1A1A]/60 backdrop-blur-md rounded-2xl border border-[#333333] shadow-xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1 text-white">Media Kit Completion</h3>
                  {/* <p className="text-sm text-[#888888]">Complete your profile to share your media kit</p> */}
                </div>
                
                <div className="relative w-14 h-14">
  <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
    <circle
      cx="28"
      cy="28"
      r="24"
      className="stroke-white/10 "
      strokeWidth="6"
      fill="none"
    />
    <motion.circle
      cx="28"
      cy="28"
      r="24"
      className="stroke-[#bcee45]"
      strokeWidth="6"
      fill="none"
      strokeDasharray="151"
      initial={{ strokeDashoffset: 151 }}
      animate={{ strokeDashoffset: 75.5 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    />
  </svg>
  <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
    50%
  </div>
</div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-[#888888]">
                  <span>Progress</span>
                  <span>5/10 steps</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-[#bcee45] to-[#9BC53D] h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '50%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </div>
              </div>
              <Link href="/complete-media-kit/intro">
              <motion.button
                className="w-full mt-4 py-3 bg-gradient-to-r from-[#bcee45] to-[#9BC53D] text-black rounded-xl font-semibold hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
             
                Complete Media Kit
              </motion.button>
              </Link>

            </motion.div>
          </div>

          {/* Welcome Section */}
          <div className="px-6 ">
         
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-4xl  mb-8 flex items-center gap-3"
            >
              Welcome{" "}
              <span className="bg-gradient-to-r from-[#1A1A1A] to-[#252525] text-[#bcee45] font-extrabold rounded-2xl px-4 py-2 border border-[#333333] shadow-lg">
                Tushar
              </span>
            </motion.h1>

            {/* Feature Cards */}
            <div className="space-y-4 mb-4">
            <FeatureCards />
         
            </div>
             <Link href="/send-feedback"> 
            <motion.button 
                className="w-full p-4 mb-10  bg-[#1A1A1A]/60 backdrop-blur-md rounded-2xl flex items-center gap-3 text-[#888888] border border-[#333333] hover:border-[#bcee45]/20 transition-colors"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
               <div className="relative w-12 h-12 bg-gradient-to-br from-[#1A1A1A] to-[#252525] rounded-xl border border-[#bcee45]/20 flex items-center justify-center">
                  <MessageSquare className="w-7 h-7 text-[#bcee45]" />
                </div>
              <span className="font-medium">Send Feedback</span> 
              </motion.button>
              </Link>
                   {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 mb-14"
        >
          <h3 className="text-lg font-bold">Recent Activity</h3>
          {[
            { action: 'Profile viewed mb-14by Nike', time: '2 hours ago', icon: Eye },
            { action: 'Media Kit shared', time: '5 hours ago', icon: Share2 },
            { action: 'New follower gained', time: '1 day ago', icon: Users }
          ].map((activity, index) => (
            <div
              key={index}
              className="p-4 bg-[#1A1A1A]/60 backdrop-blur-md rounded-xl border border-[#333333] flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#bcee45]/10 flex items-center justify-center">
                  <activity.icon className="w-5 h-5 text-[#bcee45]" />
                </div>
                <div>
                  <div className="font-medium">{activity.action}</div>
                  <div className="text-sm text-[#888888]">{activity.time}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#888888]" />
            </div>
          ))}
        </motion.div>
          </div>
          <PreviewButton />
          <Navbar />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DashboardPage;


const Stars = React.memo(() => {
  return (
      <svg width="952" height="396" viewBox="0 0 952 396" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.35">
              <circle cx="417" cy="161" r="4" fill="white" />
              <circle opacity="0.5" cx="515" cy="116" r="2" fill="white" />
              <circle opacity="0.5" cx="423" cy="279" r="4" fill="white" />
              <circle opacity="0.3" cx="366" cy="394" r="2" fill="white" />
              <circle cx="265" cy="327" r="2" fill="white" />
              <circle opacity="0.2" cx="362" cy="209" r="2" fill="white" />
              <circle opacity="0.3" cx="548" cy="211" r="2" fill="white" />
              <circle opacity="0.2" cx="607" cy="281" r="2" fill="white" />
              <circle opacity="0.21" cx="789" cy="281" r="2" fill="white" />
              <circle cx="362" cy="65" r="2" fill="white" />
              <circle opacity="0.3" cx="192" cy="132" r="2" fill="white" />
              <circle cx="743" cy="2" r="2" fill="white" />
          </g>
          <path d="M834 150C827.373 150 822 144.627 822 138C822 131.373 827.373 126 834 126C840.627 126 846 131.373 846 138C846 144.627 840.627 150 834 150Z" fill="url(#paint0_linear_701_17365)" />
          <path d="M4 206C1.79086 206 4.76837e-07 204.209 4.76837e-07 202C4.76837e-07 199.791 1.79086 198 4 198C6.20914 198 8 199.791 8 202C8 204.209 6.20914 206 4 206Z" fill="url(#paint1_linear_701_17365)" />
          <path d="M948 206C945.791 206 944 204.209 944 202C944 199.791 945.791 198 948 198C950.209 198 952 199.791 952 202C952 204.209 950.209 206 948 206Z" fill="url(#paint2_linear_701_17365)" />
          <path d="M154 326C149.582 326 146 322.418 146 318C146 313.582 149.582 310 154 310C158.418 310 162 313.582 162 318C162 322.418 158.418 326 154 326Z" fill="url(#paint3_linear_701_17365)" />
          <defs>
              <linearGradient id="paint0_linear_701_17365" x1="834" y1="126" x2="834" y2="150" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#88E5BE" />
                  <stop offset="1" stopColor="#1A1A32" />
              </linearGradient>
              <linearGradient id="paint1_linear_701_17365" x1="4" y1="198" x2="4" y2="206" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#DD734F" />
                  <stop offset="1" stopColor="#1A1A32" />
              </linearGradient>
              <linearGradient id="paint2_linear_701_17365" x1="948" y1="198" x2="948" y2="206" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#DD734F" />
                  <stop offset="1" stopColor="#1A1A32" />
              </linearGradient>
              <linearGradient id="paint3_linear_701_17365" x1="154" y1="310" x2="154" y2="326" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#B9AEDF" />
                  <stop offset="1" stopColor="#1A1A32" />
              </linearGradient>
          </defs>
      </svg>

  );
});

Stars.displayName = 'Stars';

