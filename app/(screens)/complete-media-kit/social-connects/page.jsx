'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Instagram,
  Youtube,
  Twitter,
  Twitch,
  Facebook,
  Linkedin,
  AlertCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { StepCompletion } from '@/components/MediaKitStepCompletion';
import { EnhancedHeader } from '@/components/MediaKitHeader';

const TOTAL_STEPS = 6;
const CURRENT_STEP = 3;

const SOCIAL_PLATFORMS = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    color: '#E4405F',
    analyticsFields: ['Followers', 'Engagement Rate', 'Avg. Likes']
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: Youtube,
    color: '#FF0000',
    analyticsFields: ['Subscribers', 'Avg. Views', 'Watch Time']
  }
];

const SocialCard = ({ platform, onConnect, isConnected }) => {
  const Icon = platform.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-card/60 backdrop-blur-md rounded-2xl border border-border overflow-hidden"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${platform.color}20` }}
          >
            <Icon className="w-6 h-6" style={{ color: platform.color }} />
          </div>
          <div>
            <h3 className="text-foreground font-medium mb-1">{platform.name}</h3>
            <p className="text-sm text-muted-foreground">
              {isConnected ? 'Connected' : 'Not Connected'}
            </p>
          </div>
        </div>
        <Button
          onClick={() => onConnect(platform.id)}
          variant={isConnected ? "outline" : "default"}
          className={isConnected ? 'border-primary text-primary hover:bg-primary/10' : ''}
        >
          {isConnected ? 'Connected' : 'Connect'}
        </Button>
      </div>
      <AnimatePresence>
        {isConnected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-3 gap-4 pt-4 border-t border-border"
          >
            {platform.analyticsFields.map((field, index) => (
              <div key={index} className="text-center">
                <p className="text-muted-foreground text-xs mb-1">{field}</p>
                <p className="text-foreground font-medium">--</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function SocialConnectPage() {
  const router = useRouter();
  const [connectedPlatforms, setConnectedPlatforms] = useState([]);
  const [showCompletion, setShowCompletion] = useState(false);

  const handleConnect = (platformId) => {
    setConnectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleComplete = () => {
    if (connectedPlatforms.length > 0) {
      setShowCompletion(true);
    }
  };

  const handleContinue = () => {
    router.push('/complete-media-kit/previous-collabs');
  };

  // Updated handleBack function
  const handleBack = () => {
    // Get the previous step from mediaKitSteps
    const previousStep = mediaKitSteps[CURRENT_STEP - 2];
    if (previousStep) {
      // If previous step has slides, go to its last slide
      if (previousStep.totalSlides > 0) {
        router.push(`${previousStep.path}?slide=${previousStep.totalSlides - 1}`);
      } else {
        router.push(previousStep.path);
      }
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F]">
      {/* Updated Header */}
      <EnhancedHeader
        currentStep={CURRENT_STEP}
        totalSteps={TOTAL_STEPS}
        onBackClick={handleBack}
      />

      {/* Main Content */}
      <main className="max-w-2xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Connect Your Socials</h2>
          <p className="text-muted-foreground">
            Connect your social media accounts to showcase your reach and engagement
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {SOCIAL_PLATFORMS.map((platform) => (
            <SocialCard
              key={platform.id}
              platform={platform}
              onConnect={handleConnect}
              isConnected={connectedPlatforms.includes(platform.id)}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleComplete}
            disabled={connectedPlatforms.length === 0}
            className="gap-2"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Completion Modal */}
        <AnimatePresence>
          {showCompletion && (
            <StepCompletion
              onClose={() => setShowCompletion(false)}
              onContinue={handleContinue}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}