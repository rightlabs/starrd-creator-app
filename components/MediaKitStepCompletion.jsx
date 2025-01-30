import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Star, PartyPopper, Sparkles, Rocket } from 'lucide-react';
import confetti from 'canvas-confetti';

export const StepCompletion = ({ stepName, onContinue, isFinalStep = false }) => {
  // Trigger confetti
  React.useEffect(() => {
    const duration = 2000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const runAnimation = () => {
      const timeLeft = animationEnd - Date.now();
      const particleCount = 50 * (timeLeft / duration);

      // Particles from left
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 30,
        origin: { x: 0.3, y: 0.5 },
        colors: ['#bcee45', '#ffffff'],
        ticks: 20
      });

      // Particles from right
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 30,
        origin: { x: 0.7, y: 0.5 },
        colors: ['#bcee45', '#ffffff'],
        ticks: 20
      });

      if (timeLeft > 0) {
        requestAnimationFrame(runAnimation);
      }
    };

    runAnimation();
  }, []);

  const content = isFinalStep ? {
    icon: Rocket,
    title: "Awesome! You're all set! 🎉",
    message: "Your media kit is ready to shine! Let's make you stand out.",
    buttonText: "View Your Media Kit"
  } : {
    icon: PartyPopper,
    title: "Great job! 🎉",
    message: "You're one step closer to creating your perfect media kit!",
    buttonText: "Continue"
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[#bcee45]/20 blur-3xl rounded-full" />

        {/* Content */}
        <motion.div 
          className="relative bg-black border border-[#bcee45]/20 rounded-3xl p-8 text-center max-w-sm mx-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 10,
              delay: 0.4
            }}
            className="w-20 h-20 rounded-2xl bg-[#bcee45]/10 flex items-center justify-center mx-auto mb-6"
          >
            <content.icon className="w-10 h-10 text-[#bcee45]" />
          </motion.div>

          {/* Floating sparkles */}
          <motion.div 
            className="absolute -top-4 -right-4"
            animate={{ 
              rotate: [0, 45, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity
            }}
          >
            <Sparkles className="w-6 h-6 text-[#bcee45]" />
          </motion.div>
          <motion.div 
            className="absolute -bottom-4 -left-4"
            animate={{ 
              rotate: [0, -45, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              delay: 0.5
            }}
          >
            <Star className="w-6 h-6 text-[#bcee45]" />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-white mb-2">
              {content.title}
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-[#bcee45]" />
              <p className="text-[#bcee45]">
                {stepName} Completed
              </p>
            </div>
            <p className="text-gray-400 mb-6">
              {content.message}
            </p>

            <motion.button
              onClick={onContinue}
              className="w-full py-3 bg-[#bcee45] text-black rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#bcee45]/90"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {content.buttonText}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};