'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Ruler, User, Globe, PawPrint, Search, X, Languages } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { getMediaKitPersonalInfo, updateMediaKitPersonalInfo } from '@/api/mediaKit';
import EnhancedHeader from '@/components/MediaKitHeader';

// Constants
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

const languagesList = [
  { id: 'en', name: 'English', native: 'English' },
  { id: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { id: 'es', name: 'Spanish', native: 'Español' },
  { id: 'fr', name: 'French', native: 'Français' },
  { id: 'de', name: 'German', native: 'Deutsch' },
  { id: 'it', name: 'Italian', native: 'Italiano' },
  { id: 'pt', name: 'Portuguese', native: 'Português' },
  { id: 'ru', name: 'Russian', native: 'Русский' },
  { id: 'zh', name: 'Chinese', native: '中文' },
  { id: 'ja', name: 'Japanese', native: '日本語' },
  { id: 'ko', name: 'Korean', native: '한국어' },
  { id: 'ar', name: 'Arabic', native: 'العربية' },
  { id: 'bn', name: 'Bengali', native: 'বাংলা' },
  { id: 'ur', name: 'Urdu', native: 'اردو' },
  { id: 'te', name: 'Telugu', native: 'తెలుగు' }
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

// Selection Card Component
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

// Height Input Component
const HeightInputSlide = ({ formData, setFormData }) => {
  const [heightCm, setHeightCm] = useState(formData.height || '165');
  const [heightFt, setHeightFt] = useState('5');
  const [heightIn, setHeightIn] = useState('5');
  const [unit, setUnit] = useState('cm');

  useEffect(() => {
    setFormData(prev => ({ ...prev, height: heightCm }));
  }, [heightCm]);

  const convertHeight = (value, from) => {
    if (from === 'cm') {
      const totalInches = value * 0.393701;
      const feet = Math.floor(totalInches / 12);
      const inches = Math.round(totalInches % 12);
      setHeightFt(feet.toString());
      setHeightIn(inches.toString());
    } else {
      const totalCm = (parseInt(heightFt) * 12 + parseInt(heightIn)) * 2.54;
      setHeightCm(Math.round(totalCm).toString());
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-[#1A1A1A]/60 backdrop-blur-md rounded-2xl border border-[#333333]"
      >
        {/* Unit Toggle */}
        <div className="flex justify-end mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setUnit(unit === 'cm' ? 'ft' : 'cm')}
            className="px-4 py-2 bg-[#252525] rounded-lg text-sm font-medium text-[#bcee45] hover:bg-[#bcee45]/10 transition-colors"
          >
            Switch to {unit === 'cm' ? 'ft/in' : 'cm'}
          </motion.button>
        </div>

        <div className="flex items-center justify-center mb-8">
          <Ruler className="w-16 h-16 text-[#bcee45]" />
        </div>

        {unit === 'cm' ? (
          <div className="mb-8">
            <label className="block text-md text-[#888888] mb-2">Height in centimeters</label>
            <div className="relative">
              <input
                type="number"
                value={heightCm}
                onChange={(e) => {
                  setHeightCm(e.target.value);
                  convertHeight(e.target.value, 'cm');
                }}
                min="100"
                max="250"
                className="w-full text-white bg-[#252525] border border-[#333333] rounded-xl px-4 py-3 text-lg font-semibold focus:border-[#bcee45] focus:outline-none transition-colors"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888]">cm</span>
            </div>
          </div>
        ) : (
          <div className="mb-8 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-md text-[#888888] mb-2">Feet</label>
              <div className="relative">
                <input
                  type="number"
                  value={heightFt}
                  onChange={(e) => {
                    setHeightFt(e.target.value);
                    convertHeight(null, 'ft');
                  }}
                  min="4"
                  max="8"
                  className="w-full text-white bg-[#252525] border border-[#333333] rounded-xl px-4 py-3 text-lg font-semibold focus:border-[#bcee45] focus:outline-none transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888]">ft</span>
              </div>
            </div>
            <div>
              <label className="block text-md text-[#888888] mb-2">Inches</label>
              <div className="relative">
                <input
                  type="number"
                  value={heightIn}
                  onChange={(e) => {
                    setHeightIn(e.target.value);
                    convertHeight(null, 'ft');
                  }}
                  min="0"
                  max="11"
                  className="w-full text-white bg-[#252525] border border-[#333333] rounded-xl px-4 py-3 text-lg font-semibold focus:border-[#bcee45] focus:outline-none transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888]">in</span>
              </div>
            </div>
          </div>
        )}

        {/* Visual Height Representation */}
        <div className="flex justify-center mb-8">
          <div className="w-4 bg-[#252525] rounded-full relative" style={{ height: '200px' }}>
            <motion.div 
              className="absolute bottom-0 w-full bg-[#bcee45] rounded-full"
              style={{ 
                height: `${((parseInt(heightCm) - 100) / 150) * 100}%`,
                maxHeight: '100%'
              }}
              animate={{ height: `${((parseInt(heightCm) - 100) / 150) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Height Display */}
        <div className="text-center">
          <p className="text-2xl font-bold text-white">
            {unit === 'cm' ? (
              `${heightCm} cm`
            ) : (
              `${heightFt}'${heightIn}"`
            )}
          </p>
          <p className="text-sm text-[#888888]">
            {unit === 'cm' ? (
              `${heightFt}'${heightIn}" in feet/inches`
            ) : (
              `${heightCm} cm in centimeters`
            )}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// Language Slide Component
const LanguageSlide = ({ formData, setFormData }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLanguages = languagesList.filter(lang =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.native.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLanguageToggle = (language) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language.id)
        ? prev.languages.filter(id => id !== language.id)
        : [...prev.languages, language.id]
    }));
  };

  const selectedLanguages = languagesList.filter(lang => 
    formData.languages.includes(lang.name)
  );

  return (
    <div className="space-y-4">
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#888888]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search languages..."
          className="w-full bg-[#1A1A1A] border border-[#333333] rounded-xl pl-12 pr-4 py-3 focus:border-[#bcee45] focus:outline-none transition-colors text-white placeholder-[#888888]"
        />
      </div>

      {selectedLanguages.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap gap-2 mb-4"
        >
          {selectedLanguages.map(lang => (
            <motion.span
              key={lang.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="inline-flex items-center text-white gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#333333] rounded-xl"
            >
              {lang.name}
              <button
                onClick={() => handleLanguageToggle(lang)}
                className="hover:bg-[#bcee45]/20 rounded-full p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.span>
          ))}
        </motion.div>
      )}

      <div className="space-y-2 max-h-[calc(100vh-400px)] overflow-y-auto">
        <AnimatePresence>
          {filteredLanguages.map((language) => (
            <motion.button
              key={language.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={() => handleLanguageToggle(language)}
              className={`w-full p-4 flex items-center text-white justify-between bg-[#1A1A1A]/60 backdrop-blur-md rounded-xl border ${
                formData.languages.includes(language.name)
                  ? 'border-[#bcee45] bg-[#bcee45]/5'
                  : 'border-[#333333] hover:border-[#bcee45]/50'
              } transition-all`}
            >
              <div className="flex items-center gap-3">
                <Languages className={`w-5 h-5 ${
                  formData.languages.includes(language.name)
                    ? 'text-[#bcee45]'
                    : 'text-[#888888]'
                }`} />
                <span>{language.name}</span>
              </div>
              <span className="text-[#888888] text-sm">{language.native}</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Step Completion Component
const StepCompletion = ({ stepName, onContinue, isFinalStep }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-[#1A1A1A] rounded-2xl p-8 max-w-md w-full text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-20 h-20 rounded-full bg-[#bcee45]/20 flex items-center justify-center mx-auto mb-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
          className="w-16 h-16 rounded-full bg-[#bcee45] flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            ✓
          </motion.div>
        </motion.div>
      </motion.div>

      <h2 className="text-2xl font-bold text-white mb-2">
        {stepName} {isFinalStep ? 'Completed!' : 'Saved!'}
      </h2>
      <p className="text-[#888888] mb-6">
        {isFinalStep
          ? 'Your profile information has been successfully updated.'
          : 'Your progress has been saved. You can continue later.'}
      </p>

      <button
        onClick={onContinue}
        className="w-full bg-[#bcee45] text-black font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity"
      >
        {isFinalStep ? 'View Profile' : 'Continue'}
      </button>
    </motion.div>
  </motion.div>
);

// Main Personal Info Page Component
const PersonalInfoPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    hairType: '',
    height: '',
    bodyType: '',
    languages: [],
    petType: ''
  });

  useEffect(() => {
    fetchPersonalInfo();
  }, []);

  const fetchPersonalInfo = async () => {
    try {
      setLoading(true);
      const response = await getMediaKitPersonalInfo();
      if (response?.statusCode === 200 && response?.data?.personalInfo) {
        setFormData(response.data.personalInfo);
      }
    } catch (error) {
      toast.error("Failed to load personal information");
    } finally {
      setLoading(false);
    }
  };

  const savePersonalInfo = async () => {
    try {
      setSaving(true);
      const response = await updateMediaKitPersonalInfo(formData);
      if (response?.statusCode === 200) {
        toast.success("Personal information saved successfully");
        return true;
      }
      return false;
    } catch (error) {
      toast.error("Failed to save personal information");
      return false;
    } finally {
      setSaving(false);
    }
  };

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

  const handleComplete = async () => {
    if (currentSlide === slides.length - 1 && isCurrentSlideValid()) {
      const saved = await savePersonalInfo();
      if (saved) {
        setShowCompletion(true);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F] flex items-center justify-center">
        <div className="text-[#bcee45]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F]">
       <div className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]">

<EnhancedHeader
  currentStep={currentMainStep} 
  currentSlide={currentSlide}
  totalSteps={totalSteps}
  onBackClick={setCurrentSlide}
/>
</div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-[#bcee45]/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
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

            {/* Slide Content */}
            {currentSlide === 0 && (
              <div className="grid grid-cols-1 gap-4">
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

            {currentSlide === 1 && (
              <HeightInputSlide formData={formData} setFormData={setFormData} />
            )}

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
              </div>
            )}

            {currentSlide === 3 && (
              <LanguageSlide formData={formData} setFormData={setFormData} />
            )}

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

        {/* Navigation */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#111111] border-t border-[#333333]">
          <div className="max-w-xl mx-auto flex justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => currentSlide > 0 && setCurrentSlide(current => current - 1)}
              className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 ${
                currentSlide === 0
                  ? 'text-[#888888] border-[#333333] cursor-not-allowed'
                  : 'text-[#bcee45] border-[#bcee45]/20 hover:border-[#bcee45]/50'
              } border`}
              disabled={currentSlide === 0 || saving}
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
              disabled={!isCurrentSlideValid() || saving}
            >
              {saving ? 'Saving...' : currentSlide === slides.length - 1 ? 'Complete' : 'Next'}
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
    </div>
  );
};

export default PersonalInfoPage;