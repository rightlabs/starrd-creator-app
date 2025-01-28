'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const hairTypes = [
  {
    id: 'straight',
    title: 'Straight',
    icon: '💇‍♂️',
    description: 'Naturally straight hair'
  },
  {
    id: 'wavy',
    title: 'Wavy',
    icon: '👱‍♀️',
    description: 'Natural waves and curves'
  },
  {
    id: 'curly',
    title: 'Curly',
    icon: '👨‍🦱',
    description: 'Defined curls and coils'
  },
  {
    id: 'coily',
    title: 'Coily',
    icon: '🧑‍🦱',
    description: 'Tightly coiled texture'
  },
  {
    id: 'bald',
    title: 'Bald',
    icon: '👨‍🦲',
    description: 'Little to no hair'
  }
];

const HairTypePage = () => {
  const [selectedType, setSelectedType] = useState(null);

  const handleNext = () => {
    // Save selection and navigate to next step
    if (selectedType) {
      // TODO: Implement save logic
      window.location.href = '/complete-profile/height';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F] text-white">
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
              <h1 className="text-xl font-bold">What's your hair type?</h1>
              <p className="text-sm text-[#888888]">Step 1 of 5</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-[#1A1A1A]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '20%' }}
          className="h-full bg-[#bcee45]"
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-xl mx-auto p-6">
        <div className="grid grid-cols-1 gap-4">
          {hairTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedType(type.id)}
                className={`w-full p-6 bg-[#1A1A1A]/60 backdrop-blur-md rounded-2xl border ${
                  selectedType === type.id 
                    ? 'border-[#bcee45] bg-[#bcee45]/5' 
                    : 'border-[#333333] hover:border-[#bcee45]/50'
                } transition-all text-left`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{type.icon}</div>
                  <div>
                    <h3 className="font-semibold mb-1">{type.title}</h3>
                    <p className="text-sm text-[#888888]">{type.description}</p>
                  </div>
                </div>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={!selectedType}
            className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 ${
              selectedType
                ? 'bg-[#bcee45] text-black hover:opacity-90'
                : 'bg-[#333333] text-[#888888] cursor-not-allowed'
            } transition-colors`}
          >
            Next
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default HairTypePage;