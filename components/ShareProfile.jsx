import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, X, Link2, Twitter, Facebook, WhatsApp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ShareProfileDialog = ({ isOpen, onClose, profileUrl }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareButtons = [
    {
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      color: 'bg-[#1DA1F2] hover:bg-[#1DA1F2]/90',
      onClick: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(profileUrl)}&text=Check out my creator profile!`, '_blank')
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      color: 'bg-[#1877F2] hover:bg-[#1877F2]/90',
      onClick: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`, '_blank')
    },
    {
      name: 'WhatsApp',
      icon: <WhatsApp className="w-5 h-5" />,
      color: 'bg-[#25D366] hover:bg-[#25D366]/90',
      onClick: () => window.open(`https://wa.me/?text=${encodeURIComponent(`Check out my creator profile! ${profileUrl}`)}`, '_blank')
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-4 right-4 bottom-4 p-6 bg-[#1A1A1A] border border-[#333333] rounded-2xl z-50 max-w-lg mx-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Share Profile</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Copy Link Section */}
            <div className="bg-black/30 rounded-xl p-4 flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#bcee45] rounded-lg">
                <Link2 className="w-5 h-5 text-black" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{profileUrl}</p>
              </div>
              <Button
                onClick={handleCopyLink}
                variant="outline"
                className="border-[#333333] hover:border-[#bcee45] text-white"
              >
                {copied ? 'Copied!' : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>

            {/* Social Share Buttons */}
            <div className="grid grid-cols-3 gap-3">
              {shareButtons.map(button => (
                <Button
                  key={button.name}
                  onClick={button.onClick}
                  className={`${button.color} text-white w-full`}
                >
                  {button.icon}
                  <span className="ml-2">{button.name}</span>
                </Button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShareProfileDialog;