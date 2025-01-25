'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Star, Sparkles } from 'lucide-react';
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'



const WelcomeSlide = () => {
  const { width, height } = useWindowSize()
  const confettiConfig = {
    width,
    height,
    recycle: true,
    numberOfPieces: 100,
    colors: ['#bcee45', '#000000'], // Brand colors
    gravity: 0.2,
    initialVelocityY: { min: -15, max: -5 },
    initialVelocityX: { min: -5, max: 5 },
    confettiSource: { x: width/2, y: height/4 },
    run: true
   }
  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-between pt-16 pb-[90px] px-6">
     <Confetti {...confettiConfig} />
      <motion.div 
        className="flex flex-col items-center text-center space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated Icon */}
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

        {/* Welcome Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <h1 className="text-4xl font-bold">
            Welcome to your
            <br />
            <span className="text-5xl font-extrabold relative">
              Creator Journey
              <motion.div
                className="absolute -right-8 top-0"
                animate={{ rotate: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                🚀
              </motion.div>
            </span>
          </h1>
          
          <p className="text-lg text-black/70 max-w-md mx-auto">
            You're about to embark on an exciting journey of creativity and growth. 
            {/* Let's build your digital presence together! */}
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-2 gap-4 mt-8  mb-0 max-w-md w-full"
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

      {/* Get Started Button */}
      <motion.div
        className="w-full max-w-md "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <Button 
          className="w-full bg-black text-primary hover:bg-black/90 text-lg py-6  rounded-3xl"
          onClick={() => window.location.href = '/dashboard'}
        >
          GET STARTED
        </Button>
      </motion.div>
    </div>
  );
};

export default WelcomeSlide;