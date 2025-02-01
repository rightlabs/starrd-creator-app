'use client'
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
  ChevronRight,
  Link as LinkIcon,
  Mail,
  Phone,
  Sparkles,
  User,
  Ruler,
  Globe,
  PawPrint,
  Building2
} from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

export default function MediaKit() {
  // Mock data - replace with your actual data
  const creator = {
    // Basic Info
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

    // Physical Attributes
    hairType: "straight",
    height: "5'10\"",
    bodyType: "mesomorph",
    languages: ["English", "Hindi", "Spanish"],
    petType: "dog",
    
    // Social Stats
    socialConnections: {
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

    // Previous Collaborations
    collaborations: [
      {
        brand: "Adobe",
        type: "Brand Partnership",
        date: "2024",
        logo: "/adobe-logo.png"
      },
      {
        brand: "Figma",
        type: "Ambassador",
        date: "2023-24",
        logo: "/figma-logo.png"
      }
    ],

    // Packages
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
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
              >
                <Image
                  src="/starrd-logo.png"
                  alt="logo"
                  height={140}
                  width={140}
                />
              </motion.div>           
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-white/5">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg bg-[#bcee45] text-black hover:opacity-90">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-white/10"
        >
          {/* Cover Gradient */}
          <div className="h-32 bg-gradient-to-r from-[#bcee45]/20 via-[#bcee45]/10 to-transparent">
            <img src={creator.coverImage} alt="Cover Image" className="absolute inset-0 opacity-20 bg-pattern" />
          </div>

          {/* Profile Content */}
          <div className="px-6 pb-6">
            {/* Avatar & Basic Info */}
            <div className="flex items-start gap-4 -mt-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-[#bcee45] shadow-lg shadow-[#bcee45]/20"
              >
                <Image src={creator.avatar} alt={creator.name} width={100} height={10} className="w-full h-full bg-[#bcee45]/20" />
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

            {/* Bio & Physical Attributes */}
            <div className="mt-6 space-y-4">
              <p className="text-sm text-zinc-400 leading-relaxed">
                {creator.bio}
              </p>

              {/* Physical Attributes Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-zinc-900/50 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-[#bcee45]" />
                    <span className="text-sm text-zinc-400">Hair Type</span>
                  </div>
                  <p className="font-medium">{creator.hairType}</p>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/50 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Ruler className="w-4 h-4 text-[#bcee45]" />
                    <span className="text-sm text-zinc-400">Height</span>
                  </div>
                  <p className="font-medium">{creator.height}</p>
                </div>

                <div className="col-span-2 p-3 rounded-xl bg-zinc-900/50 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-4 h-4 text-[#bcee45]" />
                    <span className="text-sm text-zinc-400">Languages</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {creator.languages.map(lang => (
                      <span key={lang} className="px-2 py-1 rounded-lg bg-[#bcee45]/10 text-[#bcee45] text-xs">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="col-span-2 p-3 rounded-xl bg-zinc-900/50 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-4 h-4 text-[#bcee45]" />
                    <span className="text-sm text-zinc-400">Body Type</span>
                  </div>
                  <p className="font-medium capitalize">{creator.bodyType}</p>
                </div>

                <div className="col-span-2 p-3 rounded-xl bg-zinc-900/50 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <PawPrint className="w-4 h-4 text-[#bcee45]" />
                    <span className="text-sm text-zinc-400">Pets</span>
                  </div>
                  <p className="font-medium capitalize">{creator.petType}</p>
                </div>
              </div>
            </div>

            {/* Contact Info Pills */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`mailto:${creator.email}`} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/50 border border-white/10 text-sm text-zinc-400">
                <Mail className="w-4 h-4" />
                {creator.email}
              </a>
              <a href={`tel:${creator.phone}`} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/50 border border-white/10 text-sm text-zinc-400">
                <Phone className="w-4 h-4" />
                {creator.phone}
              </a>
              <a href={`https://${creator.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/50 border border-white/10 text-sm text-zinc-400">
                <LinkIcon className="w-4 h-4" />
                {creator.website}
              </a>
            </div>
          </div>
        </motion.div>

        {/* Social Stats */}
        {/* Instagram Card */}
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
              <p className="text-sm text-zinc-400">{creator.socialConnections.instagram.handle}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-zinc-400 text-sm mb-1">Followers</p>
              <p className="text-xl font-bold">
                {creator.socialConnections.instagram.followers}
              </p>
            </div>
            <div>
              <p className="text-zinc-400 text-sm mb-1">Engagement</p>
              <p className="text-xl font-bold">
                {creator.socialConnections.instagram.engagement}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-zinc-400 text-sm mb-1">Avg. Reach per Post</p>
              <p className="text-xl font-bold">
                {creator.socialConnections.instagram.reachPerPost}
              </p>
            </div>
          </div>
        </motion.div>

        {/* YouTube Card */}
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
              <p className="text-sm text-zinc-400">{creator.socialConnections.youtube.handle}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-zinc-400 text-sm mb-1">Subscribers</p>
              <p className="text-xl font-bold">
                {creator.socialConnections.youtube.subscribers}
              </p>
            </div>
            <div>
              <p className="text-zinc-400 text-sm mb-1">Avg. Views</p>
              <p className="text-xl font-bold">
                {creator.socialConnections.youtube.avgViews}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-zinc-400 text-sm mb-1">Watch Time</p>
              <p className="text-xl font-bold">
                {creator.socialConnections.youtube.watchTime}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Previous Collaborations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 backdrop-blur-xl rounded-xl border border-white/10 p-6"
        >
          <h3 className="text-lg font-semibold mb-6">Previous Collaborations</h3>
          <div className="grid grid-cols-2 gap-3">
            {creator.collaborations.map((collab) => (
              <motion.div
                key={collab.brand}
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-black/40 rounded-xl border border-white/10 flex items-center gap-4"
              ><div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
              <span className="text-xl font-bold">{collab.brand[0]}</span>
            </div>
            <div className="flex-1">
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
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold">{pkg.name}</h4>
                <p className="text-2xl font-bold text-[#bcee45] mt-1">{pkg.price}</p>
              </div>
              {index === 1 && (
                <span className="px-3 py-1 rounded-full bg-[#bcee45]/20 text-[#bcee45] text-xs font-medium">
                  Popular
                </span>
              )}
            </div>
            
            <div className="space-y-3">
              {pkg.deliverables.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#bcee45]" />
                  <span className="text-sm text-zinc-400">{item}</span>
                </div>
              ))}
            </div>
            
            <button
              className={`w-full mt-6 px-4 py-2.5 rounded-xl font-medium transition-all ${
                index === 1 
                  ? 'bg-[#bcee45] hover:bg-[#bcee45]/90 text-black' 
                  : 'bg-transparent border border-white/10 hover:border-[#bcee45]/50 text-white'
              }`}
            >
              Select Package
            </button>
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
      <p className="text-zinc-400 mb-6 text-sm">
        Let's create something amazing together. Get in touch to discuss collaboration opportunities.
      </p>
      <button 
        className="w-full sm:w-auto px-6 py-3 bg-[#bcee45] hover:bg-[#bcee45]/90 text-black rounded-xl font-medium flex items-center justify-center gap-2"
      >
        Get in Touch
        <ChevronRight className="w-4 h-4" />
      </button>
    </motion.div>
  </main>

  {/* Bottom Navigation */}
<Navbar/>
</div>
);
};