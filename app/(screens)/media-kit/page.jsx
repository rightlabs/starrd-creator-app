'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share2, 
  Download, 
  Instagram, 
  Youtube,
  Twitter,
  Globe,
  MapPin,
  Users,
  Heart,
  Star,
  ChevronRight,
  Calendar,
  DollarSign,
  BarChart,
  Play,
  Eye
} from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

const MediaKitPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('overview');

  const creator = {
    name: "Tushar Agarwal",
    title: "Digital Creator & UI Designer",
    location: "Mumbai, India",
    bio: "Passionate about creating engaging content that inspires and educates. Specializing in tech reviews, UI/UX tutorials, and lifestyle vlogs.",
    achievements: [
      "Forbes 30 Under 30",
      "Adobe Creative Ambassador",
      "Google Developer Expert"
    ],
    stats: {
      followers: "45.8K",
      engagement: "8.2%",
      reach: "120K"
    },
    categories: ['Tech', 'Design', 'Lifestyle'],
    collaborations: [
      { brand: "Adobe", logo: "/adobe-logo.png" },
      { brand: "Figma", logo: "/figma-logo.png" },
      { brand: "Dribbble", logo: "/dribbble-logo.png" }
    ],
    recentPosts: [
      {
        platform: "YouTube",
        title: "How to Design a Modern Dashboard",
        views: "24K",
        engagement: "12%"
      },
      {
        platform: "Instagram",
        title: "UI Design Tips & Tricks",
        views: "18K",
        engagement: "9.5%"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F] text-white pb-24">
      {/* Header with Action Buttons */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#bcee45]/20 to-transparent animate-gradient" />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-30" />
        </div>
        
        <div className="relative p-6 flex justify-between items-start">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold"
          >
            Media Kit
          </motion.h1>
          <div className="flex gap-3">
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 hover:border-[#bcee45]/50 transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 bg-[#bcee45] text-black rounded-xl"
            >
              <Download className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative -mt-20 p-6 bg-[#1A1A1A]/60 backdrop-blur-xl rounded-2xl border border-white/10"
        >
          <div className="flex items-start gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-[#bcee45] shadow-lg shadow-[#bcee45]/20"
            >
              <Image
                src="/welcome-2.jpg"
                alt={creator.name}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold">{creator.name}</h2>
                <Star className="w-5 h-5 text-[#bcee45]" />
              </div>
              <p className="text-[#888888] text-sm mb-2">{creator.title}</p>
              <div className="flex items-center gap-2 text-sm text-[#888888]">
                <MapPin className="w-4 h-4" />
                {creator.location}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-[#888888] text-sm leading-relaxed">{creator.bio}</p>
          </div>

          <div className="mt-6 flex gap-2">
            {creator.categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1 bg-[#bcee45]/10 rounded-lg text-[#bcee45] text-sm"
              >
                {category}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Statistics Grid */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          {[
            { label: 'Total Followers', value: creator.stats.followers, icon: <Users className="w-5 h-5" /> },
            { label: 'Engagement Rate', value: creator.stats.engagement, icon: <Heart className="w-5 h-5" /> },
            { label: 'Monthly Reach', value: creator.stats.reach, icon: <Eye className="w-5 h-5" /> }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-[#1A1A1A]/60 backdrop-blur-xl rounded-xl border border-white/10"
            >
              <div className="w-10 h-10 bg-[#bcee45]/10 rounded-lg flex items-center justify-center mb-3 text-[#bcee45]">
                {stat.icon}
              </div>
              <div className="text-lg font-bold mb-1">{stat.value}</div>
              <div className="text-xs text-[#888888]">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Social Platforms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <h3 className="text-lg font-semibold mb-4">Social Platforms</h3>
          <div className="space-y-3">
            {[
              { 
                platform: 'Instagram',
                handle: '@tushar.design',
                followers: '28.5K',
                icon: <Instagram className="w-5 h-5" />,
                color: 'from-pink-500 to-purple-600'
              },
              {
                platform: 'YouTube',
                handle: 'Tushar Creates',
                followers: '12.3K',
                icon: <Youtube className="w-5 h-5" />,
                color: 'from-red-500 to-pink-600'
              },
              {
                platform: 'Twitter',
                handle: '@tushardesigns',
                followers: '5K',
                icon: <Twitter className="w-5 h-5" />,
                color: 'from-blue-400 to-blue-600'
              }
            ].map((platform) => (
              <motion.div
                key={platform.platform}
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-[#1A1A1A]/60 backdrop-blur-xl rounded-xl border border-white/10 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center`}>
                    {platform.icon}
                  </div>
                  <div>
                    <div className="font-semibold mb-1">{platform.platform}</div>
                    <div className="text-sm text-[#888888]">{platform.handle}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{platform.followers}</div>
                  <div className="text-sm text-[#888888]">followers</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <h3 className="text-lg font-semibold mb-4">Recent Content</h3>
          <div className="space-y-3">
            {creator.recentPosts.map((post, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-[#1A1A1A]/60 backdrop-blur-xl rounded-xl border border-white/10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#bcee45]/10 flex items-center justify-center text-[#bcee45]">
                    {post.platform === 'YouTube' ? <Play className="w-4 h-4" /> : <Image className="w-4 h-4" />}
                  </div>
                  <span className="text-sm font-medium">{post.platform}</span>
                </div>
                <h4 className="font-medium mb-2">{post.title}</h4>
                <div className="flex items-center gap-4 text-sm text-[#888888]">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {post.views} views
                  </div>
                  <div className="flex items-center gap-1">
                    <BarChart className="w-4 h-4" />
                    {post.engagement} engagement
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Previous Collaborations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 mb-20"
        >
          <h3 className="text-lg font-semibold mb-4">Previous Collaborations</h3>
          <div className="grid grid-cols-3 gap-4">
            {creator.collaborations.map((collab, index) => (
              <motion.div
                key={collab.brand}
                whileHover={{ scale: 1.05 }}
                className="aspect-square bg-[#1A1A1A]/60 backdrop-blur-xl rounded-xl border border-white/10 flex items-center justify-center p-4"
              >
                <Image
                  src={collab.logo}
                  alt={collab.brand}
                  width={64}
                  height={64}
                  className="w-12 h-12 object-contain"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <Navbar />
    </div>
  );
};

export default MediaKitPage;