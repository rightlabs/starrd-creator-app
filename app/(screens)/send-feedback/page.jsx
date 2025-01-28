'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Smile, Meh, Frown } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const feedbackTypes = [
  {
    id: 'positive',
    icon: <Smile className="w-6 h-6" />,
    label: 'Positive',
    color: 'text-[#bcee45]'
  },
  {
    id: 'neutral',
    icon: <Meh className="w-6 h-6" />,
    label: 'Neutral',
    color: 'text-yellow-500'
  },
  {
    id: 'negative',
    icon: <Frown className="w-6 h-6" />,
    label: 'Negative',
    color: 'text-red-500'
  }
];

const FeedbackPage = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!selectedType || !feedback) return;

    setIsSubmitting(true);
    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F] text-white flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 bg-[#bcee45] rounded-full flex items-center justify-center mb-6"
        >
          <Send className="w-8 h-8 text-black" />
        </motion.div>
        <h2 className="text-2xl font-bold mb-2">Thanks for your feedback!</h2>
        <p className="text-[#888888] text-center mb-8">
          Your input helps us improve the Starrd experience.
        </p>
        <Link href="/dashboard">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-[#1A1A1A] border border-[#333333] rounded-xl text-[#bcee45] hover:border-[#bcee45]/50 transition-colors"
          >
            Back to Dashboard
          </motion.button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F] text-white pb-24">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-black/40 backdrop-blur-lg border-b border-white/5 sticky top-0 z-50"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-[#1A1A1A] border border-[#333333] rounded-xl flex items-center justify-center hover:border-[#bcee45]/50 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-[#bcee45]" />
              </motion.button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">Send Feedback</h1>
              <p className="text-sm text-[#888888]">Help us improve Starrd</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-xl mx-auto p-6">
        {/* Feedback Type Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">How's your experience?</h3>
          <div className="grid grid-cols-3 gap-4">
            {feedbackTypes.map((type, index) => (
              <motion.button
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedType(type.id)}
                className={`p-4 bg-[#1A1A1A]/60 backdrop-blur-md rounded-xl border 
                  ${selectedType === type.id ? 'border-[#bcee45] bg-[#bcee45]/5' : 'border-[#333333]'}
                  hover:border-[#bcee45]/50 transition-all`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={type.color}>{type.icon}</div>
                  <span className="text-sm">{type.label}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Feedback Input */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Your feedback</h3>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Tell us what you think..."
            className="w-full h-40 bg-[#1A1A1A] border border-[#333333] rounded-xl p-4 text-white placeholder-[#888888] focus:border-[#bcee45] focus:outline-none transition-colors resize-none"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={!selectedType || !feedback || isSubmitting}
          className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2
            ${(!selectedType || !feedback || isSubmitting)
              ? 'bg-[#333333] text-[#888888] cursor-not-allowed'
              : 'bg-[#bcee45] text-black hover:opacity-90'
            } transition-colors`}
        >
          {isSubmitting ? 'Sending...' : 'Send Feedback'}
          <Send className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Navbar */}
      <Navbar />
    </div>
  );
};

export default FeedbackPage;