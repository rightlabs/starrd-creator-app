'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Share2, 
  Download, 
  Instagram, 
  Youtube,
  MapPin,
  Users,
  Heart,
  Star,
  Eye,
  BarChart3,
  ChevronRight,
  Link as LinkIcon,
  Mail,
  Phone,
  Sparkles
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

const MediaKitPreview = () => {
  const creator = {
    name: "Tushar Agarwal",
    username: "@tushar.designs",
    title: "Digital Creator & UI Designer",
    location: "Mumbai, India",
    email: "hello@tushar.design",
    phone: "+91 98765 43210",
    website: "tushar.design",
    avatar: "/welcome-2.jpg",
    coverImage: "/pixar-1.jpg",
    bio: "Passionate about creating engaging content that inspires and educates. Specializing in tech reviews, UI/UX tutorials, and lifestyle content that makes a difference.",
    expertise: ['UI/UX Design', 'Tech Reviews', 'Lifestyle Content'],
    socialStats: {
      instagram: {
        handle: '@tushar.design',
        followers: '28.5K',
        engagement: '4.8%',
        reachPerPost: '45K+'
      },
      youtube: {
        handle: 'Tushar Creates',
        subscribers: '12.3K',
        avgViews: '25K+',
        watchTime: '150K mins'
      }
    },
    collaborations: [
      {
        brand: "Adobe",
        type: "Brand Partnership",
        date: "2024"
      },
      {
        brand: "Figma",
        type: "Ambassador",
        date: "2023-24"
      },
      {
        brand: "Dribbble",
        type: "Content Creation",
        date: "2023"
      }
    ],
    packages: [
      {
        name: "Basic Package",
        price: "₹29,999",
        deliverables: [
          "1 YouTube Video Review",
          "2 Instagram Posts",
          "3 Instagram Stories"
        ]
      },
      {
        name: "Premium Package",
        price: "₹49,999",
        deliverables: [
          "2 YouTube Videos",
          "4 Instagram Posts",
          "6 Instagram Stories",
          "1 Dedicated Blog Post"
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white pb-24">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="w-10 h-10 rounded-xl bg-[#bcee45]/10 flex items-center justify-center"
              >
                <Star className="w-5 h-5 text-[#bcee45]" />
              </motion.div>
              <h1 className="text-lg font-bold">Media Kit</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="hover:bg-white/5">
                <Share2 className="w-5 h-5" />
              </Button>
              <Button size="icon" className="bg-[#bcee45] hover:bg-[#bcee45]/90 text-black">
                <Download className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-white/10"
        >
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-[#bcee45]/20 via-[#bcee45]/10 to-transparent">
            <div className="absolute inset-0 bg-[url('/media-kit.jpg')] opacity-20" />
          </div>

          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="flex items-start gap-4 -mt-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-[#bcee45] shadow-lg shadow-[#bcee45]/20"
              >
                <Image
                  src={creator.avatar}
                  alt={creator.name}
                  fill
                  className="object-cover"
                />
              </motion.div>

              <div className="pt-10">
                <div className="flex items-center gap-2">
                  <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      {creator.name}
                      <Sparkles className="w-4 h-4 text-[#bcee45]" />
                    </h2>
                    <p className="text-zinc-400 text-sm">{creator.username}</p>
                  </div>
                </div>
                <div className="mt-1">
                  <p className="text-sm font-medium">{creator.title}</p>
                  <div className="flex items-center gap-1.5 mt-1 text-sm text-zinc-500">
                    <MapPin className="w-3.5 h-3.5" />
                    {creator.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-6 grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3 text-zinc-400">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{creator.email}</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-400">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{creator.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-400">
                <LinkIcon className="w-4 h-4" />
                <span className="text-sm">{creator.website}</span>
              </div>
            </div>

            {/* Bio & Expertise */}
            <div className="mt-6">
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                {creator.bio}
              </p>
              <div className="flex flex-wrap gap-2">
                {creator.expertise.map((category) => (
                  <span
                    key={category}
                    className="px-3 py-1.5 bg-[#bcee45]/10 rounded-lg text-[#bcee45] text-sm font-medium"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: <Users className="w-4 h-4" />, label: 'Followers', value: '45.8K' },
            { icon: <Heart className="w-4 h-4" />, label: 'Engagement', value: '8.2%' },
            { icon: <Eye className="w-4 h-4" />, label: 'Reach', value: '120K' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl bg-zinc-900/50 backdrop-blur-xl border border-white/10"
            >
              <div className="w-8 h-8 mb-2 rounded-lg bg-[#bcee45]/10 flex items-center justify-center">
                <div className="text-[#bcee45]">{stat.icon}</div>
              </div>
              <div className="text-lg font-bold">{stat.value}</div>
              <div className="text-xs text-zinc-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Social Platforms */}
        <div className="space-y-4">
          {/* Instagram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-zinc-900/50 backdrop-blur-xl rounded-xl border border-white/10"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-600 to-pink-600 flex items-center justify-center">
                <Instagram className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Instagram</h3>
                <p className="text-sm text-zinc-400">{creator.socialStats.instagram.handle}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-zinc-400 text-sm mb-1">Followers</p>
                <p className="text-xl font-bold">
                  {creator.socialStats.instagram.followers}
                </p>
              </div>
              <div>
                <p className="text-zinc-400 text-sm mb-1">Engagement</p>
                <p className="text-xl font-bold">
                  {creator.socialStats.instagram.engagement}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-zinc-400 text-sm mb-1">Avg. Reach per Post</p>
                <p className="text-xl font-bold">
                  {creator.socialStats.instagram.reachPerPost}
                </p>
              </div>
            </div>
          </motion.div>

          {/* YouTube */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-zinc-900/50 backdrop-blur-xl rounded-xl border border-white/10"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center">
                <Youtube className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">YouTube</h3>
                <p className="text-sm text-zinc-400">{creator.socialStats.youtube.handle}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-zinc-400 text-sm mb-1">Subscribers</p>
                <p className="text-xl font-bold">
                  {creator.socialStats.youtube.subscribers}
                </p>
              </div>
              <div>
                <p className="text-zinc-400 text-sm mb-1">Avg. Views</p>
                <p className="text-xl font-bold">
                  {creator.socialStats.youtube.avgViews}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-zinc-400 text-sm mb-1">Watch Time</p>
                <p className="text-xl font-bold">
                  {creator.socialStats.youtube.watchTime}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Previous Collaborations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 backdrop-blur-xl rounded-xl border border-white/10 p-6"
        >
          <h3 className="text-lg font-semibold mb-6">Previous Collaborations</h3>
          <div className="grid grid-cols-3 gap-3">
            {creator.collaborations.map((collab) => (
              <motion.div
                key={collab.brand}
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-black/40 rounded-xl border border-white/10 flex flex-col items-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <span className="text-xl font-bold">{collab.brand[0]}</span>
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm mb-0.5">{collab.brand}</p>
                  <p className="text-xs text-zinc-500">{collab.type}</p>
                  <p className="text-xs text-zinc-500">{collab.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Packages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 backdrop-blur-xl rounded-xl border border-white/10 p-6"
        >
          <h3 className="text-lg font-semibold mb-6">Collaboration Packages</h3>
          <div className="space-y-4">
            {creator.packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                whileHover={{ scale: 1.01 }}
                className={`p-6 rounded-xl border ${
                index === 1 
                  ? 'bg-[#bcee45]/10 border-[#bcee45]' 
                  : 'bg-black/40 border-white/10'
              }`}
              >
                <h4 className="font-semibold mb-2">{pkg.name}</h4>
                <p className="text-2xl font-bold text-[#bcee45] mb-6">{pkg.price}</p>
                <div className="space-y-3">
                  {pkg.deliverables.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#bcee45]" />
                      <span className={index === 1 ? 'text-white' : 'text-zinc-400 text-sm'}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
                <Button
                  className={`w-full mt-6 ${
                    index === 1 
                      ? 'bg-[#bcee45] hover:bg-[#bcee45]/90 text-black' 
                      : 'bg-transparent border border-white/10 hover:border-[#bcee45]/50'
                  }`}
                >
                  Select Package
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#bcee45]/20 to-transparent backdrop-blur-xl rounded-xl border border-[#bcee45]/20 p-6 text-center"
        >
          <h3 className="text-xl font-bold mb-2">Ready to Collaborate?</h3>
          <p className="text-zinc-400 mb-6 max-w-md mx-auto text-sm">
            Let's create something amazing together. Reach out to discuss collaboration opportunities.
          </p>
          <Button 
            size="lg" 
            className="bg-[#bcee45] hover:bg-[#bcee45]/90 text-black gap-2 w-full sm:w-auto"
          >
            Get in Touch
            <ChevronRight className="w-4 h-4" />
          </Button>
        </motion.div>

       
      </main>

      <Navbar />

    </div>
  );
};

export default MediaKitPreview;