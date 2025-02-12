"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import PreviewButton from "@/components/PreviewButton";
import Link from "next/link";
import FeatureCards from "@/components/DashborardFeatures";
import { ChartNoAxesCombined } from "lucide-react";
import { getUserDetails } from "@/api/user";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserDetails();
        console.log("ressss",response)

        if (response.status === 200) {
          console.log("hello")
          setUserData(response.data.data.userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Calculate remaining media kit steps
  const totalMediaKitSteps = 6;
  const remainingSteps = userData.mediaKitCompletionStep;

  // Calculate total completion percentage
  const totalCompletion = userData?.completionStatus?.totalCompletion || 0;

  // Calculate progress for the circle
  const circleCircumference = 151;
  const progressOffset = circleCircumference - (circleCircumference * totalCompletion) / 100;

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
          <div className="p-6 bg-black/40 backdrop-blur-lg border-b border-white/5 sticky top-0 z-20">
            <div className="flex justify-between items-center">
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

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="relative"
              >
                <div className="w-12 h-12 bg-[#1A1A1A] border border-[#333333] rounded-full flex items-center justify-center hover:border-[#bcee45]/50 transition-colors">
                  <Link href="/growth-trends">
                    <span className="text-2xl"><ChartNoAxesCombined  className="text-[#bcee45]"/> </span>
                  </Link>
                  <span className="absolute -top-1 -right-1 bg-[#bcee45] text-black w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="px-6 max-w-2xl mx-auto">
        {/* Welcome Section */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-4xl my-8 flex items-center gap-3"
        >
          Welcome{" "}
          <span className="bg-gradient-to-r from-[#1A1A1A] to-[#252525] text-[#bcee45] font-extrabold rounded-2xl px-4 py-2 border border-[#333333] shadow-lg">
            {userData?.firstName || 'Creator'}
          </span>
        </motion.h1>

        {/* Media Kit Progress */}
        <motion.div
          className="mb-8 p-6 bg-[#1A1A1A]/60 backdrop-blur-md rounded-2xl border border-[#333333] shadow-xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold mb-1 text-white">
                Media Kit Completion
              </h3>
              <p className="text-sm text-[#888888]">
             {
              remainingSteps === 6 ? `Congrats! You have completed all steps.` : `You have completed ${remainingSteps} steps out of ${totalMediaKitSteps}.`
             }  
              </p>
            </div>

            {/* Progress Circle */}
            <div className="relative w-14 h-14">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  className="stroke-white/10"
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
                  strokeDasharray={circleCircumference}
                  initial={{ strokeDashoffset: circleCircumference }}
                  animate={{ strokeDashoffset: progressOffset }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
                {totalCompletion}%
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-[#888888]">
              <span>Progress</span>
              <span>
                { remainingSteps}/{totalMediaKitSteps} steps ✅
              </span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-[#bcee45] to-[#9BC53D] h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${totalCompletion}%` }}
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

            {/* Feature Cards Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-4 mb-8"
            >
              <h3 className="text-lg font-bold mb-4">Quick Actions </h3>
              <FeatureCards />
            </motion.div>

            {/* Recent Activity Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4 mb-8"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Growth Trends </h3>
                <Link
                  href="/growth-trends"
                  className="text-sm text-[#888888] bg-[#1A1A1A] backdrop-blur-md px-4 py-2 rounded-3xl hover:bg-black/80 flex items-center"
                >
                  View All 
                </Link>
              </div>

              {[
                {
                  action: "Profile viewed by Nike",
                  time: "2 hours ago",
                  icon: "👀",
                },
                {
                  action: "Media Kit shared",
                  time: "5 hours ago",
                  icon: "📤",
                },
                {
                  action: "New follower gained",
                  time: "1 day ago",
                  icon: "👥",
                },
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="p-4 bg-[#1A1A1A]/60 backdrop-blur-md rounded-xl border border-[#333333] flex items-center justify-between hover:border-[#bcee45]/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 bg-gradient-to-br from-[#1A1A1A] to-[#252525] rounded-xl border border-[#bcee45]/20 flex items-center justify-center">
                      <p className="text-2xl">{activity.icon}</p>
                    </div>
                    <div>
                      <div className="font-medium">{activity.action}</div>
                      <div className="text-sm text-[#888888]">
                        {activity.time}
                      </div>
                    </div>
                  </div>
                  <span className="text-lg text-[#888888]">➜</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Feedback Button */}
            <Link href="/send-feedback">
              <motion.button
                className="w-full p-4 mb-14 bg-[#1A1A1A]/60 backdrop-blur-md rounded-2xl flex items-center gap-3 text-[#888888] border border-[#333333] hover:border-[#bcee45]/20 transition-colors"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative w-12 h-12 bg-gradient-to-br from-[#1A1A1A] to-[#252525] rounded-xl border border-[#bcee45]/20 flex items-center justify-center">
                <p className="text-2xl">💬</p>                </div>
                <span className="font-medium">Send Feedback</span>
              </motion.button>
            </Link>
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

