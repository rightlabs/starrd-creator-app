'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  HelpCircle,
  MessageCircle,
  Mail,
  FileText,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Search,
  Youtube,
  BookOpen,
  PhoneCall
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const HelpSupportPage = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: "How do I customize my media kit?",
      answer: "You can customize your media kit by going to the Media Kit section and clicking on Edit. From there, you can update your profile, add social media stats, and showcase your best work."
    },
    {
      question: "How do I connect my social accounts?",
      answer: "Go to your Profile Settings, select 'Connected Accounts', and click on the social media platform you want to connect. Follow the authentication steps to link your account."
    },
    {
      question: "Can I download my media kit?",
      answer: "Yes! On your media kit page, click the Download button in the top right corner. You can choose between PDF and Image formats."
    },
    {
      question: "How do I track my media kit views?",
      answer: "Your media kit views and engagement metrics are available in your dashboard under the Analytics section."
    }
  ];

  const supportOptions = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email Support",
      description: "Get help via email",
      available: "Response within 24 hours",
      action: "Send Email"
    },
    {
      icon: <PhoneCall className="w-5 h-5" />,
      title: "Schedule a Call",
      description: "Book a support call",
      available: "Mon-Fri, 9 AM - 5 PM",
      action: "Book Now"
    }
  ];

  const resources = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Documentation",
      description: "Detailed guides and tutorials"
    },
    {
      icon: <Youtube className="w-5 h-5" />,
      title: "Video Tutorials",
      description: "Step-by-step video guides"
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "API Documentation",
      description: "Technical documentation"
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <h1 className="text-lg font-bold text-white">Help & Support</h1>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 pb-24 space-y-8">
        {/* Search */}
     

        {/* Support Options */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#bcee45]" />
            Contact Support
          </h2>
          <div className="grid gap-3">
            {supportOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-zinc-900/50 backdrop-blur-xl rounded-xl border border-white/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#bcee45]/10 flex items-center justify-center text-[#bcee45]">
                      {option.icon}
                    </div>
                    <div>
                      <p className="font-medium text-white">{option.title}</p>
                      <p className="text-sm text-zinc-400">{option.available}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    className="bg-[#bcee45] text-black hover:bg-[#bcee45]/90"
                  >
                    {option.action}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#bcee45]" />
            Frequently Asked Questions
          </h2>
          <div className="grid gap-3">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="overflow-hidden bg-zinc-900/50 backdrop-blur-xl rounded-xl border border-white/10"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between"
                >
                  <span className="font-medium text-white">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-zinc-400 transition-transform ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 text-sm text-zinc-400">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Resources */}
            {/* <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#bcee45]" />
                Helpful Resources
            </h2>
            <div className="grid gap-3">
                {resources.map((resource, index) => (
                <motion.a
                    key={index}
                    href="#"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-zinc-900/50 backdrop-blur-xl rounded-xl border border-white/10 flex items-center justify-between group"
                >
                    <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#bcee45]/10 flex items-center justify-center text-[#bcee45]">
                        {resource.icon}
                    </div>
                    <div>
                        <p className="font-medium text-white group-hover:text-[#bcee45] transition-colors">
                        {resource.title}
                        </p>
                        <p className="text-sm text-zinc-400">{resource.description}</p>
                    </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-zinc-400 group-hover:text-[#bcee45] transition-colors" />
                </motion.a>
                ))}
            </div>
            </section> */}
      </main>

      <Navbar />
    </div>
  );
};

export default HelpSupportPage;