'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Share2,
  Download,
  Instagram,
  Youtube,
  MapPin,
  Image as ImageIcon,
  Globe,

  Link as LinkIcon,
  Mail,
  Phone,
  User,
  Ruler,
  PawPrint,
  Building2, Clock, Target, Award,
  Play,
  Music
} from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

// Reusable Tab Button Component
const TabButton = ({ isActive, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 text-sm font-medium transition-colors relative ${
      isActive ? 'text-[#bcee45]' : 'text-zinc-400'
    }`}
  >
    {children}
    {isActive && (
      <motion.div
        layoutId="activeTab"
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#bcee45]"
      />
    )}
  </button>
);

// Reusable Card Component
const Card = ({ children, className = "" }) => (
  <div className={`p-6 bg-zinc-900/50 backdrop-blur-xl rounded-xl border border-white/10 ${className}`}>
    {children}
  </div>
);

const MediaCard = ({ image, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-zinc-900"
  >
    <Image
      src={image}
      alt={title}
      fill
      className="object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-xs text-zinc-400 mt-1">{description}</p>
      </div>
    </div>
  </motion.div>
);

const SocialCard = ({ platform, stats, icon: Icon, gradient }) => (
  <Card className="hover:border-[#bcee45]/20">
    <div className="flex items-center gap-4 mb-6">
      <div className={`w-12 h-12 rounded-xl ${gradient} flex items-center justify-center`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="font-semibold mb-1">{platform}</h3>
        <p className="text-sm text-zinc-400">{stats.handle}</p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      {Object.entries(stats)
        .filter(([key]) => key !== 'handle')
        .map(([key, value]) => (
          <div key={key}>
            <p className="text-zinc-400 text-sm mb-1">{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
            <p className="text-xl font-bold">{value}</p>
          </div>
        ))}
    </div>
  </Card>
);

const CollaborationCard = ({ collab }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="p-6 bg-zinc-900/50 backdrop-blur-xl rounded-xl border border-white/10 hover:border-[#bcee45]/20"
  >
    <div className="flex gap-4">
      {/* Brand Logo/Image */}
      <div className="relative w-20 h-20 rounded-xl bg-white flex items-center justify-center overflow-hidden shrink-0">
        {collab.logo ? (
          <Image
            src={collab.logo}
            alt={collab.brand}
            fill
            className="object-contain p-2"
          />
        ) : (
          <span className="text-2xl font-bold text-black">{collab.brand[0]}</span>
        )}
      </div>

      {/* Collaboration Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-white mb-1">{collab.brand}</h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 rounded-lg bg-[#bcee45]/10 text-[#bcee45] text-xs font-medium">
            {collab.type}
          </span>
          <span className="text-xs text-zinc-500">
            {collab.date}
          </span>
        </div>
        
        {/* Collaboration Stats */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="flex items-center gap-2 text-zinc-400">
            <Target className="w-4 h-4 text-[#bcee45]" />
            <span className="text-sm">{collab.reach}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <Clock className="w-4 h-4 text-[#bcee45]" />
            <span className="text-sm">{collab.duration}</span>
          </div>
          {collab.result && (
            <div className="col-span-2 flex items-center gap-2 text-zinc-400">
              <Award className="w-4 h-4 text-[#bcee45]" />
              <span className="text-sm">{collab.result}</span>
            </div>
          )}
        </div>
      </div>
    </div>

    {collab.media && (
      <div className="mt-4 grid grid-cols-2 gap-2">
        {collab.media.map((item, index) => (
          <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={item}
              alt={`${collab.brand} media ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    )}
  </motion.div>
);

const CoverImageSection = () => (
  <div className="relative h-48 w-full overflow-hidden">
    <Image
      src={creator.coverImage}
      alt="Cover"
      fill
      className="object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
  </div>
);


const PackageCard = ({ pkg, isPopular }) => (
  <Card className={`${isPopular ? 'bg-[#bcee45]/10 border-[#bcee45]' : ''}`}>
    <div className="flex justify-between items-start mb-4">
      <div>
        <h4 className="font-semibold">{pkg.name}</h4>
        <p className="text-2xl font-bold text-[#bcee45] mt-1">{pkg.price}</p>
      </div>
      {isPopular && (
        <span className="px-3 py-1 rounded-full bg-[#bcee45]/20 text-[#bcee45] text-xs font-medium">
          Popular
        </span>
      )}
    </div>
    
    <div className="space-y-3">
      {pkg.deliverables.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#bcee45]" />
          <span className="text-sm text-zinc-400">{item}</span>
        </div>
      ))}
    </div>
  </Card>
);

export default function MediaKit() {
  const [activeTab, setActiveTab] = useState('gallery');
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Mock data - Replace with your actual data from API/database
  const creator = {
    // Basic Info
    name: "Tushar Agarwal",
    representation: {
      name: "Creative Talent Agency",
      logo: "/agency-logo.jpg",
      website: "https://agency.com"
    },
    username: "@tushar.designs",
    title: "Digital Creator & UI Designer",
    location: "Mumbai, India",
    email: "hello@tushar.design",
    phone: "+91 98765 43210",
    website: "tushar.design",
    avatar: "/welcome-2.jpg",
    coverImage: "/welcome-2.jpg",
    bio: "Passionate about creating engaging content that inspires and educates. Specializing in tech reviews, UI/UX tutorials, and lifestyle content that makes a difference.",

    // Personal Attributes
    hairType: "straight",
    height: "5'10\"",
    bodyType: "mesomorph",
    languages: ["English", "Hindi", "Spanish"],
    petType: "dog",

    // Portfolio/Gallery
portfolio: [
  {
    id: 1,
    type: 'image',
    media: "/pixar-1.jpg",
    title: "UI Design Showcase",
    description: "Modern dashboard design",
    category: 'UI/UX'
  },
  {
    id: 2,
    type: 'video',
    media: "/demo-video.mp4",
    thumbnail: "/pixar-2.jpg",
    title: "Product Demo",
    description: "Feature walkthrough video",
    category: 'Tutorial',
    duration: "2:30"
  },
  {
    id: 3,
    type: 'audio',
    media: "/podcast.mp3",
    thumbnail: "/welcome-1.jpg",
    title: "Design Talk Episode 1",
    description: "Podcast about design systems",
    category: 'Podcast',
    duration: "15:00"
  }
],
    // Social Stats
    socialConnections: {
      instagram: {
        handle: '@tushar.design',
        followers: '28.5K',
        engagement_rate: '4.8%',
        avg_reach: '45K+'
      },
      youtube: {
        handle: 'Tushar Creates',
        subscribers: '12.3K',
        avg_views: '25K+',
        watch_time: '150K mins'
      }
    },
          collaborations: [
        {
          id: 1,
          brand: "Adobe",
          logo: "/adobe.png",
          type: "Brand Ambassador",
          date: "2024",
          duration: "12 months",
          reach: "500K+ views",
          result: "15% increase in brand engagement",
          media: [
            "/collabs/adobe-1.jpg",
            "/collabs/adobe-2.jpg"
          ],
          description: "Led creative workshops and created tutorial content"
        },
     
        {
          id: 2,
          brand: "Dribbble",
          logo: "/dribble.png",
          type: "Partnership",
          date: "2023",
          duration: "3 months",
          reach: "100K+ views",
          result: "Top trending designer of the month",
          media: [
            "/collabs/dribbble-1.jpg",
            "/collabs/dribbble-2.jpg"
          ],
          description: "Exclusive design content and live sessions"
        }
      ]
   ,
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

  const tabs = [
    { id: 'gallery', label: 'Portfolio', icon: '🖼️' }, 
    { id: 'social', label: 'Social', icon: '🌍' },
    { id: 'collaborations', label: 'Collabs', icon: '🤝' }, 
    { id: 'packages', label: 'Pricing', icon: '📊' } 
  ];
  
  const MediaCard = ({ item }) => {
    const renderMediaIcon = () => {
      switch (item.type) {
        case 'video':
          return <Play className="w-8 h-8 text-white" />;
        case 'audio':
          return <Music className="w-8 h-8 text-white" />;
        default:
          return null;
      }
    };
  
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative aspect-[3/4] rounded-xl overflow-hidden bg-zinc-900"
      >
        <Image
          src={item.type === 'image' ? item.media : item.thumbnail}
          alt={item.title}
          fill
          className="object-cover"
        />
        
        {/* Media Type Indicator */}
        {item.type !== 'image' && (
          <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/50 backdrop-blur-sm flex items-center justify-center">
            {renderMediaIcon()}
          </div>
        )}
  
        {/* Duration Badge for Video/Audio */}
        {(item.type === 'video' || item.type === 'audio') && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-white text-xs">
            {item.duration}
          </div>
        )}
  
        {/* Category Badge */}
        <div className="absolute bottom-[4.5rem] left-3 px-2 py-1 rounded-lg bg-[#bcee45]/10 text-[#bcee45] text-xs">
          {item.category}
        </div>
  
        {/* Content Overlay (Always Visible) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 transition-opacity">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-sm font-medium">{item.title}</h3>
            <p className="text-xs text-zinc-400 mt-1">{item.description}</p>
          </div>
        </div>
      </motion.div>
    );
  };
  
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'gallery':
        // Filter portfolio items based on activeFilter
        const filteredPortfolio = creator.portfolio.filter(item => 
          activeFilter === 'all' || item.type === activeFilter
        );

        return (
          <div>
            {/* Filter Buttons - Updated with active states and click handlers */}
            <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-6">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1.5 rounded-lg ${
                  activeFilter === 'all' 
                    ? 'bg-[#bcee45]/10 text-[#bcee45]' 
                    : 'border border-[#333333] text-zinc-400'
                } text-sm`}
                onClick={() => setActiveFilter('all')}
              >
                All
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1.5 rounded-lg ${
                  activeFilter === 'image' 
                    ? 'bg-[#bcee45]/10 text-[#bcee45]' 
                    : 'border border-[#333333] text-zinc-400'
                } text-sm`}
                onClick={() => setActiveFilter('image')}
              >
                Images
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1.5 rounded-lg ${
                  activeFilter === 'video' 
                    ? 'bg-[#bcee45]/10 text-[#bcee45]' 
                    : 'border border-[#333333] text-zinc-400'
                } text-sm`}
                onClick={() => setActiveFilter('video')}
              >
                Videos
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1.5 rounded-lg ${
                  activeFilter === 'audio' 
                    ? 'bg-[#bcee45]/10 text-[#bcee45]' 
                    : 'border border-[#333333] text-zinc-400'
                } text-sm`}
                onClick={() => setActiveFilter('audio')}
              >
                Audio
              </motion.button>
            </div>
      
            {/* Portfolio Grid - Now using filtered items */}
            <div className="grid grid-cols-2 gap-3">
              <AnimatePresence mode="wait">
                {filteredPortfolio.map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MediaCard item={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        );
      case 'social':
        return (
          <div className="space-y-4">
            <SocialCard
              platform="Instagram"
              stats={creator.socialConnections.instagram}
              icon={Instagram}
              gradient="bg-gradient-to-br from-fuchsia-600 to-pink-600"
            />
            <SocialCard
              platform="YouTube"
              stats={creator.socialConnections.youtube}
              icon={Youtube}
              gradient="bg-gradient-to-br from-red-600 to-red-700"
            />
          </div>
        );

      case 'collaborations':
        return (
        <div className="space-y-4">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-lg font-semibold">Previous Collaborations</h2>
   
    </div>

    {creator.collaborations.map((collab) => (
      <CollaborationCard key={collab.id} collab={collab} />
    ))}
  </div>
        );

      case 'packages':
        return (
          <div className="space-y-4">
            {creator.packages.map((pkg, index) => (
              <PackageCard
                key={pkg.name}
                pkg={pkg}
                isPopular={index === 1}
              />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-16">
      {/* Profile Header */}
      <div className="relative pb-20">
        {/* Cover Image - Made taller and adjusted gradient */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={creator.coverImage}
            alt="Cover"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
        </div>

        {/* Logo and Actions - Positioned absolutely on top of cover */}
        <div className="absolute top-4 left-0 right-0 px-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <Image
                src="/starrd-logo.png"
                alt="logo"
                height={100}
                width={100}
              />
            </motion.div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-xl border border-white/10 hover:bg-white/5">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-xl bg-[#bcee45] hover:opacity-90">
                <Download className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>
        </div>

        {/* Profile Info - Positioned relative to cover */}
        <div className="relative -mt-16 px-4">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 rounded-full border-2 border-[#bcee45] overflow-hidden mx-auto mb-4 relative z-10"
            >
              <Image
                src={creator.avatar}
                alt={creator.name}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <h1 className="text-xl font-bold">{creator.name}</h1>
            <p className="text-zinc-400 text-sm mt-1">{creator.username}</p>
            <p className="text-[#bcee45] text-sm mt-1">{creator.title}</p>
            <div className="flex items-center justify-center gap-1 mt-2 text-sm text-zinc-500">
              <MapPin className="w-4 h-4" />
              {creator.location}
            </div>
          </div>

          {/* Basic Info Card */}
          <Card className="mt-8">
            <p className="text-sm text-zinc-400 leading-relaxed">
              {creator.bio}
            </p>
            {creator.representation && creator.representation.name && (
  <div className="mt-6 p-4 rounded-xl bg-zinc-900/50 border border-white/10">
    <div className="flex items-center gap-3">
      {creator.representation.logo ? (
        <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center overflow-hidden">
          <Image
            src={creator.representation.logo}
            alt="Agency Logo"
            width={48}
            height={48}
            className="object-contain"
          />
        </div>
      ) : (
        <div className="w-12 h-12 rounded-lg bg-[#bcee45]/10 flex items-center justify-center">
          <Building2 className="w-6 h-6 text-[#bcee45]" />
        </div>
      )}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Represented by</span>
          <span className="px-2 py-0.5 rounded-full bg-[#bcee45]/10 text-[#bcee45] text-xs">
            Agency
          </span>
        </div>
        <h3 className="font-medium mt-1">{creator.representation.name}</h3>
        {creator.representation.website && (
          <a 
            href={creator.representation.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-400 hover:text-[#bcee45] flex items-center gap-1 mt-1"
          >
            <Globe className="w-3 h-3" />
            {creator.representation.website.replace('https://', '')}
          </a>
        )}
      </div>
    </div>
  </div>
)}


            {/* Personal Info Grid */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {/* Physical Attributes */}
              <div className="p-3 rounded-xl bg-zinc-900/50 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-[#bcee45]" />
                  <span className="text-sm text-zinc-400">Hair Type</span>
                </div>
                <p className="font-medium capitalize">{creator.hairType}</p>
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
            

            {/* Contact Info */}
            <div className="flex flex-wrap gap-3 mt-6">
              <a href={`mailto:${creator.email}`} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/50 border border-white/10 text-sm text-zinc-400">
                <Mail className="w-4 h-4" />
                {creator.email}
              </a>
              <a href={`tel:${creator.phone}`} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/50 border border-white/10 text-sm text-zinc-400">
                <Phone className="w-4 h-4" />
                {creator.phone}
              </a>
              {/* <a href={`https://${creator.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/50 border border-white/10 text-sm text-zinc-400">
                <LinkIcon className="w-4 h-4" />
                {creator.website}
              </a> */}
            </div>
          </Card>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-lg mx-auto">
          <div className="flex overflow-x-auto hide-scrollbar">
            {tabs.map(tab => (
              <TabButton
                key={tab.id}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                <p className='text-xl'>{tab.icon}</p>
                {tab.label}
              </TabButton>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-lg mx-auto px-4 py-6 mb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Bar */}
      <Navbar />
    </div>
  );
}