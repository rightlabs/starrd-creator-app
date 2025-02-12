'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const PrivacyPolicyPage = () => {
  const policies = [
    {
      title: "Data Collection",
      content: "We collect information that you provide directly to us, including your name, email address, phone number, social media handles, and content creation metrics. This information is used to create and manage your media kit profile."
    },
    {
      title: "How We Use Your Information",
      content: "Your information is used to create your media kit, connect you with brands, analyze platform usage, and improve our services. We may share your public profile information with brands interested in collaborations."
    },
    {
      title: "Social Media Integration",
      content: "When you connect your social media accounts, we access public metrics like follower count, engagement rates, and content performance. We do not post content without your explicit permission."
    },
    {
      title: "Data Security",
      content: "We implement industry-standard security measures to protect your personal information. This includes encryption, secure servers, and regular security audits."
    },
    {
      title: "Your Rights",
      content: "You have the right to access, modify, or delete your personal information. You can also control your profile visibility and choose what information to display in your media kit."
    },
    {
      title: "Updates to Policy",
      content: "We may update this privacy policy from time to time. We will notify you of any significant changes via email or through the platform."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/profile">
              <Button variant="ghost" size="icon" className="hover:bg-white/5">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-bold text-white">Privacy Policy</h1>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 pb-24">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 bg-zinc-900/50 backdrop-blur-xl rounded-xl border border-white/10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#bcee45]/10 flex items-center justify-center text-[#bcee45]">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-white">Your Privacy Matters</h2>
          </div>
          <p className="text-zinc-400">
            At Starrd, we're committed to protecting your privacy while helping you showcase your creator journey. This policy explains how we handle your information.
          </p>
        </motion.div>

        {/* Policy Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {policies.map((policy, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.01 }}
              className="p-4 bg-zinc-900/50 backdrop-blur-xl rounded-xl border border-white/10"
            >
              <h3 className="text-white font-medium mb-2">{policy.title}</h3>
              <p className="text-sm text-zinc-400">{policy.content}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Last Updated */}
        <div className="mt-8 text-center text-sm text-zinc-500">
          Last updated: February 2024
        </div>
      </main>

      <Navbar />
    </div>
  );
};

export default PrivacyPolicyPage;