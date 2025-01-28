'use client'
import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  ArrowLeft,
  TrendingUp,
  Users,
  Eye,
  Share2,
  Clock,
  ChevronRight,
  Star
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

const MediaKitAnalytics = () => {
  const router = useRouter();

  // Sample data for charts
  const viewsData = [
    { name: 'Mon', views: 120 },
    { name: 'Tue', views: 150 },
    { name: 'Wed', views: 180 },
    { name: 'Thu', views: 140 },
    { name: 'Fri', views: 200 },
    { name: 'Sat', views: 250 },
    { name: 'Sun', views: 220 }
  ];

  const engagementData = [
    { name: 'Jan', rate: 65 },
    { name: 'Feb', rate: 72 },
    { name: 'Mar', rate: 68 },
    { name: 'Apr', rate: 75 },
    { name: 'May', rate: 82 },
    { name: 'Jun', rate: 78 }
  ];

  const platformData = [
    { platform: 'Instagram', followers: 25000 },
    { platform: 'YouTube', followers: 18000 },
    { platform: 'Twitter', followers: 12000 }
  ];

  const metrics = [
    { label: 'Total Views', value: '45.2K', icon: Eye, change: '+12%' },
    { label: 'Engagement Rate', value: '78%', icon: TrendingUp, change: '+5%' },
    { label: 'Profile Visits', value: '12.4K', icon: Users, change: '+8%' },
    { label: 'Share Rate', value: '24%', icon: Share2, change: '+15%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F] text-white pb-24">
      {/* Header */}
      <div className="p-6 border-b border-white/5 bg-black/40 backdrop-blur-lg">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#333333] flex items-center justify-center hover:border-[#bcee45]/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Analytics</h1>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-[#1A1A1A]/60 backdrop-blur-md rounded-xl border border-[#333333] hover:border-[#bcee45]/20 transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-[#bcee45]/10 flex items-center justify-center">
                  <metric.icon className="w-5 h-5 text-[#bcee45]" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-[#888888]">{metric.label}</div>
                  <div className="text-xl font-bold">{metric.value}</div>
                </div>
                <div className="text-sm text-[#bcee45]">{metric.change}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Views Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-[#1A1A1A]/60 backdrop-blur-md rounded-xl border border-[#333333]"
        >
          <h3 className="text-lg font-bold mb-6">Views Over Time</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={viewsData}>
                <defs>
                  <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#bcee45" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#bcee45" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                <XAxis dataKey="name" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip 
                  contentStyle={{ 
                    background: '#1A1A1A', 
                    border: '1px solid #333333',
                    borderRadius: '8px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#bcee45"
                  fill="url(#viewsGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Engagement Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-[#1A1A1A]/60 backdrop-blur-md rounded-xl border border-[#333333]"
        >
          <h3 className="text-lg font-bold mb-6">Engagement Rate</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                <XAxis dataKey="name" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip 
                  contentStyle={{ 
                    background: '#1A1A1A', 
                    border: '1px solid #333333',
                    borderRadius: '8px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#bcee45"
                  strokeWidth={2}
                  dot={{ fill: '#bcee45' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Platform Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-[#1A1A1A]/60 backdrop-blur-md rounded-xl border border-[#333333]"
        >
          <h3 className="text-lg font-bold mb-6">Platform Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                <XAxis dataKey="platform" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip 
                  contentStyle={{ 
                    background: '#1A1A1A', 
                    border: '1px solid #333333',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="followers" fill="#bcee45" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-bold">Recent Activity</h3>
          {[
            { action: 'Profile viewed by Nike', time: '2 hours ago', icon: Eye },
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

      <Navbar />
    </div>
  );
};

export default MediaKitAnalytics;