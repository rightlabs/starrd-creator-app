import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const FeedbackCard = () => {
  return (
    <Link href="/send-feedback">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative mb-10"
      >
        {/* Gradient background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#bcee45]/10 to-transparent rounded-2xl blur-xl" />

        {/* Main card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative p-6 bg-[#1A1A1A]/80 backdrop-blur-md rounded-2xl border border-[#333333] hover:border-[#bcee45]/40 transition-all group overflow-hidden"
        >
          {/* Content */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Icon container with animated background */}
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#bcee45]/20 to-[#9BC53D]/20 rounded-xl blur-md"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                <div className="relative w-14 h-14 bg-gradient-to-br from-[#1A1A1A] to-[#252525] rounded-xl border border-[#bcee45]/20 flex items-center justify-center">
                  <MessageSquare className="w-7 h-7 text-[#bcee45]" />
                </div>
              </div>

              {/* Text content */}
              <div>
                <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                  Share Your Thoughts
                  <Star className="w-4 h-4 text-[#bcee45]" />
                </h3>
                <p className="text-[#888888] text-sm">
                  Help us improve your experience
                </p>
              </div>
            </div>

            {/* Arrow button */}
            <div className="flex items-center">
              <motion.div
                className="w-10 h-10 bg-[#bcee45]/10 rounded-xl flex items-center justify-center group-hover:bg-[#bcee45] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowRight className="w-5 h-5 text-[#bcee45] group-hover:text-black transition-colors" />
              </motion.div>
            </div>
          </div>

          {/* Floating sparkle effects */}
          <motion.div
            className="absolute top-4 right-20"
            animate={{ 
              y: [-4, 4, -4],
              rotate: [0, 45, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Sparkles className="w-4 h-4 text-[#bcee45]/40" />
          </motion.div>
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default FeedbackCard;