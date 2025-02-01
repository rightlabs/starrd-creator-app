'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, Star, ChevronRight, Instagram, Youtube, 
  Camera, Edit, User, Sparkles, Share2, LogOut, X 
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import ProfileAvatar from '@/components/ProfileAvatar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const LogoutDialog = ({ isOpen, onClose, onConfirm }) => {
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
        className="bg-zinc-900 rounded-2xl border border-white/10 p-6 w-full max-w-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
            <LogOut className="w-5 h-5 text-red-500" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <h3 className="text-lg font-semibold text-white mb-2">
          Confirm Logout
        </h3>
        <p className="text-sm text-zinc-400 mb-6">
          Are you sure you want to log out of your account? You'll need to log back in to access your media kit.
        </p>

        <div className="flex gap-3">
          <Button
            onClick={onClose}
            className="flex-1 bg-transparent border border-white/10 hover:bg-white/5 text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white"
          >
            Logout
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};