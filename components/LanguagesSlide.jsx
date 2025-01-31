import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Ruler, User, Globe, PawPrint, Search, X, Languages } from 'lucide-react';
import Link from 'next/link';
import { StepCompletion } from '@/components/MediaKitStepCompletion';

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
export const LanguageSlide = ({ formData, setFormData }) => {
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
    formData.languages.includes(lang.id)
  );

  return (
    <div className="space-y-4">
      {/* Search Input */}
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

      {/* Language List */}
      <div className="space-y-2 max-h-[calc(100vh-400px)] overflow-y-auto scrollbar-thin scrollbar-thumb-[#333333] scrollbar-track-transparent">
        <AnimatePresence>
          {filteredLanguages.map((language) => (
            <motion.button
              key={language.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={() => handleLanguageToggle(language)}
              className={`w-full p-4 flex items-center text-white justify-between bg-[#1A1A1A]/60 backdrop-blur-md rounded-xl border ${
                formData.languages.includes(language.id)
                  ? 'border-[#bcee45] bg-[#bcee45]/5'
                  : 'border-[#333333] hover:border-[#bcee45]/50'
              } transition-all`}
            >
              <div className="flex items-center gap-3">
                <Languages className={`w-5 h-5 ${
                  formData.languages.includes(language.id)
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
