'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Search, X, Languages } from 'lucide-react';
import Link from 'next/link';

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

const LanguagePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const filteredLanguages = languagesList.filter(lang =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.native.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLanguageToggle = (language) => {
    if (selectedLanguages.some(lang => lang.id === language.id)) {
      setSelectedLanguages(selectedLanguages.filter(lang => lang.id !== language.id));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const handleNext = () => {
    if (selectedLanguages.length > 0) {
      // TODO: Implement save logic
      window.location.href = '/complete-profile/body-type';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F] text-white">
      {/* Header - Fixed */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-black/40 backdrop-blur-lg border-b border-white/5 sticky top-0 z-50"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/complete-profile/height">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-[#1A1A1A] border border-[#333333] rounded-xl flex items-center justify-center hover:border-[#bcee45]/50 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-[#bcee45]" />
              </motion.button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">What languages do you speak?</h1>
              <p className="text-sm text-[#888888]">Step 3 of 5</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Progress Bar - Fixed */}
      <div className="w-full h-1 bg-[#1A1A1A] sticky top-[88px] z-40">
        <motion.div
          initial={{ width: '40%' }}
          animate={{ width: '60%' }}
          className="h-full bg-[#bcee45]"
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-xl mx-auto p-6">
        {/* Search and Selected Languages - Fixed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-[100px] bg-gradient-to-b from-[#0A0A0A] to-[#111111] pt-4 pb-2 z-30"
        >
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#888888]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search languages..."
              className="w-full bg-[#1A1A1A] border border-[#333333] rounded-xl pl-12 pr-4 py-3 focus:border-[#bcee45] focus:outline-none transition-colors placeholder-[#888888]"
            />
          </div>

          {/* Selected Languages Pills */}
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
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#333333] rounded-xl"
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
        </motion.div>

        {/* Language List - Scrollable */}
        <div className="space-y-2 mb-8 mt-4 max-h-[calc(100vh-400px)] overflow-y-auto scrollbar-thin scrollbar-thumb-[#333333] scrollbar-track-transparent">
          <AnimatePresence>
            {filteredLanguages.map((language) => (
              <motion.button
                key={language.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onClick={() => handleLanguageToggle(language)}
                className={`w-full p-4 flex items-center justify-between bg-[#1A1A1A]/60 backdrop-blur-md rounded-xl border ${
                  selectedLanguages.some(lang => lang.id === language.id)
                    ? 'border-[#bcee45] bg-[#bcee45]/5'
                    : 'border-[#333333] hover:border-[#bcee45]/50'
                } transition-all`}
              >
                <div className="flex items-center gap-3">
                  <Languages className={`w-5 h-5 ${
                    selectedLanguages.some(lang => lang.id === language.id)
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

        {/* Navigation Buttons - Fixed at bottom */}
        <div className="sticky bottom-6 mt-8 flex justify-end bg-gradient-to-b from-transparent to-[#0F0F0F] pt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={selectedLanguages.length === 0}
            className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 ${
              selectedLanguages.length > 0
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

export default LanguagePage;