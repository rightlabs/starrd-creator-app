'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Heart } from 'lucide-react';
import Link from 'next/link';

const bodyTypes = [
  {
    id: 'ectomorph',
    title: 'Ectomorph',
    description: 'Lean and long body type',
    details: 'Naturally lean build with long limbs',
    icon: '🏃‍♂️'
  },
  {
    id: 'mesomorph',
    title: 'Mesomorph',
    description: 'Athletic and muscular body type',
    details: 'Naturally muscular with medium build',
    icon: '💪'
  },
  {
    id: 'endomorph',
    title: 'Endomorph',
    description: 'Soft and full body type',
    details: 'Naturally curved with softer build',
    icon: '🫂'
  },
  {
    id: 'combination',
    title: 'Combination',
    description: 'Mix of different body types',
    details: 'Blend of multiple body characteristics',
    icon: '🎯'
  },
  {
    id: 'prefer_not_to_say',
    title: 'Prefer not to say',
    description: 'Skip this information',
    details: 'Keep this information private',
    icon: '🔒'
  }
];

const BodyTypePage = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const handleNext = () => {
    if (selectedType) {
      // TODO: Implement save logic
      window.location.href = '/complete-profile/pet-type';
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
            <Link href="/complete-profile/languages">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-[#1A1A1A] border border-[#333333] rounded-xl flex items-center justify-center hover:border-[#bcee45]/50 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-[#bcee45]" />
              </motion.button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">What's your body type?</h1>
              <p className="text-sm text-[#888888]">Step 4 of 5</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-[#1A1A1A]">
        <motion.div
          initial={{ width: '60%' }}
          animate={{ width: '80%' }}
          className="h-full bg-[#bcee45]"
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-xl mx-auto p-6">
        {/* Introduction Message */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <p className="text-[#888888]">
            Choose the option that best describes you, or skip this step
          </p>
        </motion.div>

        {/* Body Type Selection */}
        <div className="space-y-4 mb-8">
          {bodyTypes.map((type, index) => (
            <motion.button
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedType(type.id)}
              className={`w-full p-6 bg-[#1A1A1A]/60 backdrop-blur-md rounded-2xl border ${
                selectedType === type.id 
                  ? 'border-[#bcee45] bg-[#bcee45]/5' 
                  : 'border-[#333333] hover:border-[#bcee45]/50'
              } transition-all group`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-3xl group-hover:scale-110 transition-transform">
                    {type.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold mb-1">{type.title}</h3>
                    <p className="text-sm text-[#888888]">{type.description}</p>
                  </div>
                </div>
                {selectedType === type.id && (
                  <div className="w-6 h-6 bg-[#bcee45] rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-black" />
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Body Positivity Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="p-4 bg-[#1A1A1A]/60 backdrop-blur-md rounded-xl border border-[#333333] mb-8"
        >
          <p className="text-sm text-[#888888] text-center">
            Every body type is unique and beautiful. This information helps us provide better-personalized content and brand collaborations.
          </p>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          {/* Skip Option */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedType('prefer_not_to_say');
              setTimeout(handleNext, 300);
            }}
            className="px-6 py-3 bg-transparent border border-[#333333] text-[#888888] rounded-xl font-semibold hover:border-[#bcee45]/50 transition-colors"
          >
            Skip
          </motion.button>

          {/* Next Button */}
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

export default BodyTypePage;