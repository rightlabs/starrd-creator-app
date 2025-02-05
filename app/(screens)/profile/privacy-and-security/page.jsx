'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Shield,
  Lock,
  Smartphone,
  Eye,
  Bell,
  Key,
  X,
  ChevronRight,
  ChevronDown,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const PasswordChangeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="w-full max-w-lg bg-zinc-900 rounded-xl border border-white/10 p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg text-white font-semibold">Change Password</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5 text-white"  />
          </Button>
        </div>

        <div className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full px-4 py-3 bg-[#1A1A1A]/60 rounded-xl border-2 border-[#bcee45]/20 text-white placeholder:text-[#888888] focus:border-[#bcee45] transition-colors outline-none"
            />
          <input
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-3 bg-[#1A1A1A]/60 rounded-xl border-2 border-[#bcee45]/20 text-white placeholder:text-[#888888] focus:border-[#bcee45] transition-colors outline-none"
            />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full px-4 py-3 bg-[#1A1A1A]/60 rounded-xl border-2 border-[#bcee45]/20 text-white placeholder:text-[#888888] focus:border-[#bcee45] transition-colors outline-none"
            />
        </div>

        <div className="flex gap-3 mt-6">
          <Button onClick={onClose} className="flex-1" variant="outline" 
                    className="border-primary/20 text-primary hover:border-primary/40"
>
            Cancel
          </Button>
          <Button className="flex-1 bg-[#bcee45] text-black hover:bg-[#bcee45]/90">
            Update Password
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PrivacySecurityPage = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [activityStatus, setActivityStatus] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState('public');

  const settings = [
    {
      icon: <Key className="w-5 h-5" />,
      title: 'Change Password',
      description: 'Update your account password',
      action: () => setShowPasswordModal(true)
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: 'Two-Factor Authentication',
      description: 'Secure your account with 2FA',
      toggle: true,
      value: twoFactorEnabled,
      onChange: setTwoFactorEnabled
    },

    {
      icon: <Bell className="w-5 h-5" />,
      title: 'Activity Status',
      description: "Show when you're active",
      toggle: true,
      value: activityStatus,
      onChange: setActivityStatus
    },
    {
        icon: <Eye className="w-5 h-5" />,
        title: 'Profile Visibility',
        description: profileVisibility === 'public' ? 'Your profile is visible to everyone' : 'Only followers can see your profile',
        select: true,
        value: profileVisibility,
        onChange: setProfileVisibility,
        options: [
          { value: 'public', label: 'Public' },
          { value: 'private', label: 'Private' },
        ]
      },
  ];

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
            <h1 className="text-lg font-bold text-white">Privacy & Security</h1>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 pb-24">
        {/* Settings List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {settings.map((setting, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.01 }}
              className="p-4 bg-zinc-900/50 backdrop-blur-xl rounded-xl border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#bcee45]/10 flex items-center justify-center text-[#bcee45]">
                    {setting.icon}
                  </div>
                  <div>
                    <p className="font-medium text-white">{setting.title}</p>
                    <p className="text-sm text-zinc-400">{setting.description}</p>
                  </div>
                </div>
                {setting.toggle && (
                  <Switch 
                    checked={setting.value}
                    onCheckedChange={setting.onChange}
                    className="bg-black/50 border border-white/10  data-[state=checked]:bg-primary data-[state=unchecked]:bg-white/10"
                  />
                )}
                
           {setting.select && (
  <CustomSelect
  value={setting.value}
  onChange={setting.onChange}
  options={setting.options}
/>
)}
   {setting.action && (
                  <Button variant="ghost" size="icon" onClick={setting.action}>
                    <ChevronRight className="w-5 h-5 text-primary" />
                  </Button>
                )}

             
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        <PasswordChangeModal 
          isOpen={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
        />
      </AnimatePresence>

      <Navbar />
    </div>
  );
};

export default PrivacySecurityPage;


const CustomSelect = ({ value, onChange, options }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="relative">
        {/* Select Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 bg-[#1A1A1A]/60 rounded-xl border-2 border-primary/20 hover:border-primary focus:border-primary transition-colors cursor-pointer flex justify-between items-center text-white"
          >
          <span>{options.find(opt => opt.value === value)?.label}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
  
        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-40"
              />
  
              {/* Options Menu */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className="absolute right-0 mt-2 w-48 z-50 py-1 bg-zinc-900 border border-white/10 rounded-xl shadow-xl"
              >
                {options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className="px-4 py-3 text-white hover:bg-primary hover:text-black cursor-pointer transition-colors"
                    >
                    <span className="mr-8">{option.label}</span>
                    {value === option.value && (
                      <span className="absolute right-4 text-[#bcee45]">
                        <Check className="w-4 h-4" />
                      </span>
                    )}
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  };