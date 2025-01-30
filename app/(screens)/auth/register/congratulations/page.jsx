'use client'
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Star, Sparkles, Zap, Users, Crown, Rocket } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Confetti animation function
const fireConfetti = () => {
  const end = Date.now() + 1000; // Run for 2 seconds

  // Create a more rapid interval for continuous effect
  const interval = setInterval(() => {
    if (Date.now() > end) {
      return clearInterval(interval);
    }

    // Launch multiple confetti bursts from different positions
    confetti({
      particleCount: 15,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors: ['#bcee45', '#ffffff'],
      ticks: 200,
      gravity: 1.2,
      scalar: 1.2,
      drift: 0
    });

    confetti({
      particleCount: 15,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors: ['#bcee45', '#ffffff'],
      ticks: 200,
      gravity: 1.2,
      scalar: 1.2,
      drift: 0
    });

    // Add some random bursts in the middle
    if (Math.random() > 0.5) {
      confetti({
        particleCount: 15,
        angle: 90,
        spread: 360,
        origin: { x: 0.5, y: 0.65 },
        colors: ['#bcee45', '#ffffff'],
        ticks: 200,
        gravity: 1,
        scalar: 1.2,
        drift: 0
      });
    }
  }, 50); // Run every 50ms for more continuous effect

  // Fire initial bursts
  confetti({
    particleCount: 30,
    spread: 70,
    origin: { y: 0.9 },
    colors: ['#bcee45', '#ffffff'],
    ticks: 200,
    gravity: 1,
    scalar: 1.2,
    drift: 0
  });
};

const FloatingSparkles = () => {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.5, 1, 0.5], 
            scale: [0.5, 1, 0.5],
            y: [0, -20, 0],
            x: [0, Math.random() * 20 - 10, 0]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.4
          }}
          style={{
            left: `${20 + i * 10}%`,
            top: `${30 + (i % 3) * 20}%`
          }}
        >
          <Sparkles className="w-4 h-4 text-primary/40" />
        </motion.div>
      ))}
    </>
  );
};

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-black/40 backdrop-blur-sm border border-primary/20 rounded-2xl p-4 flex items-start gap-3 hover:border-primary/40 transition-colors"
  >
    <div className="bg-primary/10 p-2 rounded-lg shrink-0">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <div>
      <h3 className="text-white text-sm font-semibold mb-0.5">{title}</h3>
      <p className="text-gray-400 text-xs leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

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
  const [showLoader, setShowLoader] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Fire confetti on component mount
    fireConfetti();
  }, []);

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
        return prev + 2;
      });
    }, 50);
  };

  return (
    <AnimatePresence mode="wait">
      {showLoader ? (
        <LoadingScreen progress={progress} />
      ) : (
        <div className="relative min-h-screen bg-gradient-to-b from-black via-black/95 to-black overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(188,238,69,0.15),rgba(0,0,0,0.9))]" />
            <FloatingSparkles />
          </div>

          <div className="relative px-6  flex flex-col min-h-screen">
            {/* Logo Section */}
            <motion.div 
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="relative w-44 h-44 mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <Image
                  src="/starrd-logo.png"
                  alt="Starrd Logo"
                  fill
                  className="object-contain"
                />
              
              </motion.div>

              {/* Main Text */}
              <motion.div
                className="space-y-2 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                  Congratulations!
                  <br />
                  <span className="text-4xl font-extrabold">
                    You're In
                  </span>
                </h1>
{/*                 
                <p className="text-sm text-gray-400 max-w-[280px] mx-auto leading-relaxed">
                  Welcome to the creator community. Let's start building your amazing presence!
                </p> */}
              </motion.div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 gap-2 w-full mb-4">
                <FeatureCard
                  icon={Rocket}
                  title="Launch Your Creator Journey"
                  description="Build a stunning media kit that makes you stand out from the crowd"
                  delay={0.8}
                />
                <FeatureCard
                  icon={Star}
                  title="Shine with Your Work"
                  description="Showcase your best content and achievements to potential partners"
                  delay={0.9}
                />
              </div>

              {/* Image Cards */}
              <div className="relative w-full h-36 ">
                <motion.div
                  initial={{ opacity: 0, x: -50, rotate: -10 }}
                  animate={{ opacity: 1, x: 0, rotate: -6 }}
                  whileHover={{ scale: 1.05, rotate: -4 }}
                  transition={{ delay: 1.0 }}
                  className="absolute left-4 w-36 h-44 rounded-2xl overflow-hidden shadow-lg transform -rotate-6"
                >
                  <div className="w-full h-full bg-black p-1 rounded-2xl">
                    <div className="relative w-full h-full overflow-hidden rounded-xl">
                      <Image
                        src="/pixar-2.jpg"
                        alt="Creator"
                        fill
                        className="object-cover rounded-xl hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50, rotate: 10 }}
                  animate={{ opacity: 1, x: 0, rotate: 6 }}
                  whileHover={{ scale: 1.05, rotate: 4 }}
                  transition={{ delay: 1.2 }}
                  className="absolute right-4 w-36 h-44 rounded-2xl overflow-hidden shadow-lg transform rotate-6"
                >
                  <div className="w-full h-full bg-black p-1 rounded-2xl">
                    <div className="relative w-full h-full overflow-hidden rounded-xl">
                      <Image
                        src="/pixar-1.jpg"
                        alt="Creator"
                        fill
                        className="object-cover rounded-xl hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              className="w-full mt-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <Button 
                className="w-full bg-gradient-to-r from-primary to-[#90ff45] text-black hover:opacity-90 text-base py-6 rounded-3xl font-bold shadow-xl shadow-primary/20"
                onClick={handleGetStarted}
              >
                GO TO DASHBOARD
              </Button>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CongratulationsPage;