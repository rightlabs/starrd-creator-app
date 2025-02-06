import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Star, BarChart, ChevronRight } from 'lucide-react';

const FeatureCard = ({ item, index }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 + index * 0.1 }}
      className="group relative"
    >
      <div className="relative h-[280px] overflow-hidden rounded-3xl">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0">
          <Image
            src={item.image}
            alt={item.title}
            width={400}
            height={280}
            className="object-cover w-full h-full opacity-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          {/* Top Section */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-black/30 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="text-[#bcee45] text-xl"
                >
                  {item.icon}
                </motion.div>
              </div>
              {item.badge && (
                <span className="px-3 py-1 bg-[#bcee45] text-black text-xs font-semibold rounded-full">
                  {item.badge} {item.badgeEmoji}
                </span>
              )}
            </div>
            <div className="space-x-2">
              {item.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="inline-block px-3 py-1 bg-black/30 backdrop-blur-md text-white/70 text-xs rounded-full border border-white/10"
                >
                  {tag.emoji} {tag.text}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div>
            <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-[#bcee45] transition-colors">
              {item.title} {item.titleEmoji}
            </h3>
            <p className="text-white/70 text-sm mb-4 line-clamp-2">
              {item.desc}
            </p>

            {/* Stats Row */}
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                {item.stats?.map((stat, i) => (
                  <div key={i} className="text-white/70">
                    <p className="text-xs opacity-70">{stat.label} {stat.emoji}</p>
                    <p className="text-sm font-semibold">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <Link href={item.link}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 h-10 w-28 bg-[#bcee45] text-black rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-[#bcee45]/90 transition-colors"
                >
                  {item.buttonText} {item.buttonEmoji}
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FeatureCards = () => {
  const features = [
    {
      title: 'Media Kit',
      titleEmoji: '✨',
      desc: 'Put your best self forward. Showcase your content and achievements.',
      icon:"⭐",
      image: "/media-kit.jpg",
      badge: 'Popular',
      badgeEmoji: '🔥',
      tags: [
        { text: 'Creator Tools', emoji: '🎨' }
      ],
      link: '/edit-media-kit',
      buttonText: 'Edit Kit',
    },
    {
      title: 'Analytics Dashboard',
      titleEmoji: '📊',
      desc: 'Track your growth and engagement metrics in real-time.',
      icon: "📊",
      image: "/media-kit-analytics.jpg",
      badge: 'New',
      badgeEmoji: '⚡',
      tags: [
        { text: 'Analytics', emoji: '📈' }
      ],
      link: '/media-kit-analytics',
      stats: [
        { label: 'Profile Views', value: '850', emoji: '👀' },
        { label: 'Brand Clicks', value: '42', emoji: '🎯' }
      ],
      buttonText: 'Stats',
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {features.map((item, index) => (
        <FeatureCard key={item.title} item={item} index={index} />
      ))}
    </div>
  );
};

export default FeatureCards;