'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Star, Sparkles } from 'lucide-react';
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import { useRouter } from 'next/navigation';

const LoadingScreen = ({ progress }) => (
  <motion.div 
    className="fixed inset-0 bg-black flex flex-col items-center justify-center"
    initial={{ height: "100vh", y: 0 }}
    exit={{ 
      height: "180px",  // Approximate height of profile completion section
      y: 0,
      position: "absolute",
      transition: {
        duration: 1,
        ease: [0.43, 0.13, 0.23, 0.96] // Smooth easing
      }
    }}
  >
   <motion.div 
      className="relative w-48 h-48"
      exit={{ 
        scale: 0.5,
        y: -100,
        transition: { duration: 1 }
      }}
    >
      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#333333"
            strokeWidth="5"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#bcee45"
            strokeWidth="5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progress / 100 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            strokeDasharray="283"
            transform="rotate(-90 50 50)"
          />
        </svg>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-4xl font-bold text-primary">{progress}%</span>
      </div>
    </motion.div>
    <motion.p 
      className="text-primary mt-4 text-lg font-medium"
      exit={{ opacity: 0 }}
    >
      Personalization in progress...
    </motion.p>  </motion.div>
);

const CongratulationsPage = () => {
  const { width, height } = useWindowSize()
  const [showLoader, setShowLoader] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const confettiConfig = {
    width,
    height,
    recycle: true,
    numberOfPieces: 100,
    colors: ['#bcee45', '#000000'],
    gravity: 0.2,
    initialVelocityY: { min: -15, max: -5 },
    initialVelocityX: { min: -5, max: 5 },
    confettiSource: { x: width/2, y: height/4 },
    run: true
  }

  const handleGetStarted = () => {
    setShowLoader(true);

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 50) {
          clearInterval(timer);
          setTimeout(() => {
            router.push('/dashboard');
          }, 500);
          return 50;
        }
        return prev + 1;
      });
    }, 50);
  };

  return (
    <AnimatePresence mode="wait">
      {showLoader ? (
        <LoadingScreen progress={progress} />
      ) : (
        <div className="min-h-screen bg-primary flex flex-col items-center justify-between pt-16 pb-[90px] px-6">
          <Confetti {...confettiConfig} />
          <motion.div 
            className="flex flex-col items-center text-center space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="w-32 h-32 bg-black rounded-full flex items-center justify-center mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <div className="relative">
                <Star className="w-16 h-16 text-primary" />
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Sparkles className="w-6 h-6 text-primary" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-4xl font-bold">
                Congratulations!
                <br />
                <span className="text-5xl font-extrabold relative">
                  You're In
                  <motion.div
                    className="absolute -right-8 top-0"
                    animate={{ rotate: [0, 15, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    🎉
                  </motion.div>
                </span>
              </h1>
              
              <p className="text-lg text-black/70 max-w-md mx-auto">
                Welcome to the creator community. Let's start building your amazing presence!
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-2 gap-4 mt-8 mb-0 max-w-md w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              {[
                { icon: "🎯", text: "Targeted Growth" },
                { icon: "💫", text: "Brand Building" },
                { icon: "📊", text: "Analytics" },
                { icon: "🤝", text: "Collaborations" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-black/5 p-4 rounded-2xl text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <div className="text-sm font-medium">{feature.text}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <Button 
              className="w-full bg-black text-primary hover:bg-black/90 text-lg py-6 rounded-3xl"
              onClick={handleGetStarted}
            >
              GO TO DASHBOARD
            </Button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CongratulationsPage;