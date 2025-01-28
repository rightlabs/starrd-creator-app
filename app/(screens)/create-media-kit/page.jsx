'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Link as LinkIcon,
  User,
  Image as ImageIcon,
  Share2,
  Youtube,
  Instagram,
  Twitter,
  Plus,
  X
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

const CreateMediaKit = () => {
  const router = useRouter();
  const [focusedSection, setFocusedSection] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    customLink: '',
    bio: '',
    categories: []
  });

  // Toggle states for each section
  const [toggleStates, setToggleStates] = useState({
    intro: false,
    bio: false,
    gallery: false,
    socials: false,
    categories: false
  });

  const handleToggle = (section) => {
    setToggleStates(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
    
    // If turning on, set as focused section
    if (!toggleStates[section]) {
      setFocusedSection(section);
    }
  };

const ToggleSwitch = ({ isOn, onToggle }) => (
  <motion.button
    onClick={(e) => {
      e.stopPropagation(); // Prevent parent click
      onToggle();
    }}
    className={`w-14 h-7 rounded-full flex items-center p-1 cursor-pointer ${
      isOn ? 'bg-[#bcee45]' : 'bg-[#242424]'
    } border ${isOn ? 'border-[#bcee45]' : 'border-[#333333]'} transition-colors`}
  >
    <motion.div
      className={`w-5 h-5 rounded-full shadow-lg ${
        isOn ? 'bg-black' : 'bg-[#666666]'
      }`}
      animate={{ x: isOn ? '28px' : '0px' }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    />
  </motion.button>
);
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F] text-white pb-24">
      {/* Header */}
      <div className="p-6 border-b border-white/5 bg-black/40 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#333333] flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">Create Media Kit</h1>
          </div>
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#333333] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Title Section */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            Create Media Kit
            <span className="text-sm px-2 py-1 bg-[#1A1A1A] text-[#bcee45] rounded-md border border-[#bcee45]/20">
              BETA
            </span>
          </h2>
          <p className="text-[#888888]">
            Select content from your profile and turn it into a unique Media Kit.
          </p>
        </div>

        {/* Media Kit Name */}
        <div className="space-y-2">
          <label className="text-sm text-[#888888]">Media Kit name</label>
          <input
            type="text"
            placeholder="Enter Media Kit name"
            className="w-full p-4 rounded-xl bg-[#1A1A1A] border border-[#333333] text-white placeholder-[#666666] focus:border-[#bcee45]/50 focus:outline-none transition-colors"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        {/* Customize Link */}
        <div className="space-y-2">
          <label className="text-sm text-[#888888]">Customize Link</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#888888] bg-[#1A1A1A]/60 border-r border-[#333333] px-3 rounded-l-xl">
              trf.plus/tushar-a/
            </div>
            <input
              type="text"
              placeholder="media-kit-name"
              className="w-full pl-[180px] p-4 rounded-xl bg-[#1A1A1A] border border-[#333333] text-white placeholder-[#666666] focus:border-[#bcee45]/50 focus:outline-none"
              value={formData.customLink}
              onChange={(e) => setFormData({ ...formData, customLink: e.target.value })}
            />
          </div>
          <div className="flex justify-between text-xs text-[#888888]">
            <span>Please use numbers, letters and dashes only</span>
            <span>0/64</span>
          </div>
        </div>

        {['intro', 'bio', 'gallery', 'socials', 'categories'].map((section) => (
  <div key={section} className="space-y-4">
    <div
      className={`flex items-center justify-between p-4 ${
        toggleStates[section] 
          ? 'bg-[#bcee45]/10 border-[#bcee45]' 
          : 'bg-[#1A1A1A]/60 border-[#333333]'
      } border rounded-xl cursor-pointer hover:bg-[#bcee45]/5 transition-all duration-300`}
      onClick={() => handleToggle(section)}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg ${
          toggleStates[section] 
            ? 'bg-[#bcee45]/20 text-[#bcee45]' 
            : 'bg-[#242424] text-[#666666]'
          } flex items-center justify-center transition-colors`}>
          {section === 'intro' && <User className="w-5 h-5" />}
          {section === 'bio' && <User className="w-5 h-5" />}
          {section === 'gallery' && <ImageIcon className="w-5 h-5" />}
          {section === 'socials' && <Share2 className="w-5 h-5" />}
          {section === 'categories' && <LinkIcon className="w-5 h-5" />}
        </div>
        <span className={`font-medium ${
          toggleStates[section] ? 'text-[#bcee45]' : 'text-white'
        }`}>
          {section.charAt(0).toUpperCase() + section.slice(1)}
        </span>
      </div>
      <ToggleSwitch
        isOn={toggleStates[section]}
        onToggle={() => handleToggle(section)}
      />
    </div>
    
    <AnimatePresence>
      {toggleStates[section] && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="space-y-4 overflow-hidden pl-14"
        >
          {section === 'bio' && (
            <textarea
              placeholder="Write your bio here..."
              className="w-full p-4 rounded-xl bg-[#1A1A1A] border border-[#333333] text-white placeholder-[#666666] focus:border-[#bcee45] focus:outline-none resize-none h-32"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
          )}
          
          {section === 'socials' && (
            <div className="space-y-3">
              {['Youtube', 'Instagram', 'Twitter'].map((platform) => (
                <button
                  key={platform}
                  className="w-full p-4 rounded-xl bg-[#1A1A1A] border border-[#333333] text-white flex items-center gap-3 hover:border-[#bcee45] hover:bg-[#bcee45]/5 transition-all duration-300"
                >
                  {platform === 'Youtube' && <Youtube className="w-5 h-5 text-[#bcee45]" />}
                  {platform === 'Instagram' && <Instagram className="w-5 h-5 text-[#bcee45]" />}
                  {platform === 'Twitter' && <Twitter className="w-5 h-5 text-[#bcee45]" />}
                  <span>Connect {platform}</span>
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
))}
      </div>

      {/* Bottom Actions */}
      <div className="inset-x-0 p-6 bg-gradient-to-t from-black to-transparent">
        <div className="flex gap-3">
          <button className="flex-1 py-3 px-6 bg-black border border-[#333333] text-white rounded-xl font-medium hover:border-[#bcee45]/50">
            SAVE
          </button>
          <button className="flex-1 py-3 px-6 border border-[#333333] rounded-xl font-medium hover:border-[#bcee45]/50">
            PREVIEW
          </button>
          <button className="flex-1 py-3 px-6 bg-[#bcee45] text-black rounded-xl font-medium hover:opacity-90">
            SHARE
          </button>
        </div>
      </div>
      <Navbar/>
    </div>

  );
};

export default CreateMediaKit;