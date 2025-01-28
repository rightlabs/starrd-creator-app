'use client'
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Star, Sparkles } from 'lucide-react';
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { BackgroundBeamsWithCollision } from '@/components/background-beams-with-collision';
import { BackgroundLines } from '@/components/background-lines';

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
  const [isRunning, setIsRunning] = useState(true);



  const confettiConfig = {
    width,
    height,
    // recycle: true,
    numberOfPieces: 100,
    // gravity: 0.2,
    // initialVelocityY: { min: -15, max: -5 },
    // initialVelocityX: { min: -5, max: 5 },
    confettiSource: { x: width/2, y: height/4 },
    // tweenDuration: 3000,
    // run: true
  }


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRunning(false);
    }, 4000); // Run confetti for 4 seconds

    return () => clearTimeout(timer);
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
        return prev + 1;
      });
    }, 50);
 
  };

  return (
    <AnimatePresence mode="wait">
      {showLoader ? (
        <LoadingScreen progress={progress} />
      ) : (
        <div className="min-h-screen bg-black flex flex-col items-center justify-between pt-16 pb-[90px] px-6">

          <Confetti {...confettiConfig} />

          <motion.div 
            className="flex flex-col items-center text-center space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="w-52 h-2  rounded-full flex items-center justify-center mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <div className="relative">
                <Image src={"/starrd-logo.png"} alt='logo' height={200} width={200} />
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Sparkles className="w-6 h-6 text-black" />
                </motion.div>
              </div>
            </motion.div>
            {/* <BackgroundLines> */}
            <BackgroundBeamsWithCollision>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-4xl  text-primary font-bold">
                Congratulations!
                <br />
                <span className="text-5xl text-primary font-extrabold relative">
                  You're In
                  <motion.div
                    className="absolute -right-20 top-0"
                    animate={{ rotate: [0, 15, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    🎉
                  </motion.div>
                </span>
              </h1>
              
              <p className="text-lg text-gray-400 pb-4 max-w-md mx-auto">
                Welcome to the creator community. Let's start building your amazing presence!
              </p>
            </motion.div>
            </BackgroundBeamsWithCollision>
            {/* </BackgroundLines> */}


          </motion.div>
          <div className="relative block md:hidden w-full h-[200px] sm:h-[400px] pt-8">

          <motion.div
        initial={{ opacity: 0, x: -100, rotate: -20 }}
        animate={{ opacity: 1, x: 0, rotate: -10 }}
        transition={{ delay: 0.2 }}
        className="absolute bottom-14 left-8 w-40 h-56 rounded-2xl overflow-hidden shadow-lg transform -rotate-6"
      >
        <div className="w-full h-full bg-black p-1 rounded-2xl">
          <Image
            src={"/pixar-2.jpg"}
            alt="welcome"
            fill
            className="object-cover rounded-xl"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100, rotate: 10 }}
        animate={{ opacity: 1, x: 0, rotate: 5 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-14 right-8 w-40 h-56 rounded-2xl overflow-hidden shadow-lg transform rotate-6"
      >
        <div className="w-full h-full bg-black p-1 rounded-2xl">
          <Image
            src={"/pixar-1.jpg"}
            alt="welcome"
            fill
            className="object-cover rounded-xl"
          />
        </div>
      </motion.div>
      </div>  


          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <Button 
              className="w-full bg-primary text-black hover:bg-primary/90 text-lg py-6 rounded-3xl"
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