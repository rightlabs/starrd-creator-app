'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Ruler, User, Globe, PawPrint } from 'lucide-react';
import Link from 'next/link';
import { StepCompletion } from '@/components/MediaKitStepCompletion';
import { LanguageSlide } from '@/components/LanguagesSlide';
import HeightInputSlide from '@/components/HeightSlide';
import EnhancedHeader from '@/components/MediaKitHeader';

const totalSteps = 6;
const currentMainStep = 6;

const hairTypes = [
  { id: 'straight', label: 'Straight', icon: '💇‍♂️' },
  { id: 'wavy', label: 'Wavy', icon: '👱‍♀️' },
  { id: 'curly', label: 'Curly', icon: '👨‍🦱' },
  { id: 'coily', label: 'Coily', icon: '🧑‍🦱' },
  { id: 'bald', label: 'Bald', icon: '👨‍🦲' }
];

const bodyTypes = [
  {
    id: 'ectomorph',
    label: 'Ectomorph',
    description: 'Lean and long body type',
    details: 'Naturally lean build with long limbs',
    icon: '🏃‍♂️'
  },
  {
    id: 'mesomorph',
    label: 'Mesomorph',
    description: 'Athletic and muscular body type',
    details: 'Naturally muscular with medium build',
    icon: '💪'
  },
  {
    id: 'endomorph',
    label: 'Endomorph',
    description: 'Soft and full body type',
    details: 'Naturally curved with softer build',
    icon: '🫂'
  },
  {
    id: 'combination',
    label: 'Combination',
    description: 'Mix of different body types',
    details: 'Blend of multiple body characteristics',
    icon: '🎯'
  },
  {
    id: 'prefer_not_to_say',
    label: 'Prefer not to say',
    description: 'Skip this information',
    details: 'Keep this information private',
    icon: '🔒'
  }
];

const petTypes = [
  { id: 'dog', label: 'Dogs', icon: '🐕' },
  { id: 'cat', label: 'Cats', icon: '🐱' },
  { id: 'bird', label: 'Birds', icon: '🦜' },
  { id: 'fish', label: 'Fish', icon: '🐠' },
  { id: 'none', label: 'No Pets', icon: '❌' }
];

const slides = [
  {
    id: 'hair-type',
    title: "What's your hair type?",
    description: 'Select your hair type',
    icon: User
  },
  {
    id: 'height',
    title: "What's your height?",
    description: 'Enter your height',
    icon: Ruler
  },
  {
    id: 'body-type',
    title: 'Body Type',
    description: 'Select your body type',
    icon: Ruler
  },
  {
    id: 'languages',
    title: 'Languages',
    description: 'Select languages you speak',
    icon: Globe
  },
  {
    id: 'pets',
    title: 'Pets',
    description: 'Do you have any pets?',
    icon: PawPrint
  }
];

const SelectionCard = ({ icon: Icon, label, selected, onClick, description }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`p-6 rounded-2xl bg-[#1A1A1A]/60 backdrop-blur-md border ${
      selected
        ? 'border-[#bcee45] bg-[#bcee45]/10'
        : 'border-[#bcee45]/20'
    } transition-all w-full text-left`}
  >
    <div className="flex items-center gap-4">
      <div className="text-3xl">
        {typeof Icon === 'string' ? (
          Icon
        ) : (
          <Icon className="w-8 h-8 text-[#bcee45]" />
        )}
      </div>
      <div>
        <h3 className="text-white font-medium">{label}</h3>
        {description && (
          <p className="text-gray-400 text-sm">{description}</p>
        )}
      </div>
    </div>
  </motion.button>
);

const SlideIndicator = ({ currentSlide, totalSlides }) => (
  <div className="flex items-center gap-2 mb-6">
    {[...Array(totalSlides)].map((_, index) => (
      <motion.div
        key={index}
        className={`h-2 rounded-full transition-all ${
          index === currentSlide ? 'w-8 bg-[#bcee45]' : 'w-2 bg-[#bcee45]/20'
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
    ))}
  </div>
);

const PersonalInfoPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [formData, setFormData] = useState({
    hairType: '',
    height: '',
    bodyType: '',
    languages: [],
    petType: ''
  });

  const isCurrentSlideValid = () => {
    switch (currentSlide) {
      case 0:
        return formData.hairType;
      case 1:
        return formData.height;
      case 2:
        return formData.bodyType;
      case 3:
        return formData.languages.length > 0;
      case 4:
        return formData.petType;
      default:
        return false;
    }
  };

  const handleComplete = () => {
    if (currentSlide === slides.length - 1 && isCurrentSlideValid()) {
      setShowCompletion(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F]">
      {/* Header */}
      <EnhancedHeader
        currentStep={currentMainStep} 
        currentSlide={currentSlide}
        totalSteps={totalSteps}
        onBackClick={setCurrentSlide}
      />

      {/* Progress Bar */}
      <div className="w-full h-1 bg-[#bcee45]/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(currentMainStep / totalSteps) * 100}%` }}
          className="h-full bg-[#bcee45]"
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Main Content */}
      <div className="fixed inset-0 top-[172px] bottom-[80px] overflow-y-auto">
      <div className="max-w-xl mx-auto p-6">
                <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                {slides[currentSlide].title}
              </h2>
              <p className="text-gray-600">
                {slides[currentSlide].description}
              </p>
            </div>

            {/* Hair Type Slide */}
            {currentSlide === 0 && (
              <div className="grid grid-cols-1 gap-4 ">
                {hairTypes.map(type => (
                  <SelectionCard
                    key={type.id}
                    icon={type.icon}
                    label={type.label}
                    selected={formData.hairType === type.id}
                    onClick={() => setFormData(prev => ({ ...prev, hairType: type.id }))}
                  />
                ))}
              </div>
            )}

            {/* Height Slide */}
            {currentSlide === 1 && (
              <HeightInputSlide formData={formData} setFormData={setFormData} />
            )}

            {/* Body Type Slide */}
            {currentSlide === 2 && (
              <div className="grid grid-cols-1 gap-4">
                {bodyTypes.map(type => (
                  <SelectionCard
                    key={type.id}
                    icon={type.icon}
                    label={type.label}
                    description={type.description}
                    selected={formData.bodyType === type.id}
                    onClick={() => setFormData(prev => ({ ...prev, bodyType: type.id }))}
                  />
                ))}
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
              </div>
            )}

            {/* Languages Slide */}
            {currentSlide === 3 && (
              <LanguageSlide formData={formData} setFormData={setFormData} />
            )}

            {/* Pets Slide */}
            {currentSlide === 4 && (
              <div className="grid grid-cols-2 gap-4">
                {petTypes.map(pet => (
                  <SelectionCard
                    key={pet.id}
                    icon={pet.icon}
                    label={pet.label}
                    selected={formData.petType === pet.id}
                    onClick={() => setFormData(prev => ({ ...prev, petType: pet.id }))}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        </div>

        {/* Navigation */}
{/* Navigation */}
<div className="fixed bottom-0 left-0 right-0 p-4 bg-[#111111] border-t border-[#333333] z-50">        <div className="max-w-xl mx-auto flex justify-between">          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => currentSlide > 0 && setCurrentSlide(current => current - 1)}
            className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 ${
              currentSlide === 0
                ? 'text-[#888888] border-[#333333] cursor-not-allowed'
                : 'text-[#bcee45] border-[#bcee45]/20 hover:border-[#bcee45]/50'
            } border`}
            disabled={currentSlide === 0}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (currentSlide === slides.length - 1) {
                handleComplete();
              } else {
                setCurrentSlide(current => current + 1);
              }
            }}
            className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 ${
              isCurrentSlideValid()
                ? 'bg-[#bcee45] text-black hover:opacity-90'
                : 'bg-[#bcee45]/20 text-[#bcee45]/40 cursor-not-allowed'
            }`}
            disabled={!isCurrentSlideValid()}
          >
            {currentSlide === slides.length - 1 ? 'Complete' : 'Next'}
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
        </div>

        <AnimatePresence>
          {showCompletion && (
            <StepCompletion
              stepName="Personal Information"
              onContinue={() => {
                window.location.href = '/media-kit';
              }}
              isFinalStep={currentSlide === slides.length - 1}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PersonalInfoPage;