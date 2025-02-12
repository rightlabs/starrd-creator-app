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
      particleCount: 10,
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
      particleCount: 10,
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
}

const Arrow = ({ className }) => (
  <motion.svg 
    width={104} 
    height={290} 
    viewBox="0 0 114 114" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g clipPath="url(#clip0_625_20131)">
      <path d="M13.0682 58.6163C14.3723 57.8473 15.7186 57.1206 17.0509 56.436L16.1333 54.65C14.7448 55.3625 13.3845 56.1032 12.0524 56.9002L13.0683 58.6444L13.0682 58.6163ZM21.1465 54.4527C22.5352 53.8244 23.9381 53.2383 25.3551 52.6944L24.6057 50.8245C23.1607 51.3965 21.7298 51.9825 20.313 52.6107L21.1324 54.4386L21.1465 54.4527ZM29.6344 51.1469C31.0797 50.6592 32.5251 50.2277 33.9986 49.8244L33.4458 47.8989C31.9582 48.3162 30.4707 48.7616 28.9974 49.2493L29.6344 51.1469ZM38.4195 48.6986C39.9073 48.3656 41.3952 48.0606 42.8972 47.7977L42.5408 45.8166C41.0107 46.0793 39.4948 46.3842 37.9649 46.7312L38.4195 48.6986ZM47.4036 47.1216C48.9199 46.929 50.4222 46.7786 51.9527 46.6563L51.7788 44.6615C50.2202 44.7838 48.6898 44.9342 47.1455 45.1267L47.4036 47.1216ZM56.5024 46.4156C58.019 46.3635 59.5498 46.3536 61.0666 46.3857L61.0753 44.3774C59.5164 44.3592 57.9715 44.3551 56.4128 44.4211L56.4884 46.4297L56.5024 46.4156ZM65.6314 46.5524C67.1485 46.6407 68.6656 46.7852 70.1829 46.9578L70.4022 44.9641C68.8569 44.7915 67.2977 44.6609 65.7526 44.5725L65.6315 46.5805L65.6314 46.5524ZM74.7067 47.5598C76.2101 47.8025 77.7135 48.0734 79.203 48.3863L79.591 46.4212C78.0734 46.1082 76.5278 45.8232 74.9963 45.5803L74.6927 47.5738L74.7067 47.5598ZM83.6578 49.4235C85.1335 49.8066 86.5952 50.2319 88.057 50.6852L88.6418 48.7767C87.1659 48.3093 85.648 47.8839 84.1582 47.4867L83.6578 49.4235ZM92.3866 52.1574C93.8064 52.6808 95.2405 53.2464 96.6465 53.84L97.428 51.9883C95.9938 51.3665 94.5458 50.8149 93.0978 50.2633L92.4147 52.1574L92.3866 52.1574ZM100.795 55.7471C102.159 56.4108 103.509 57.1166 104.845 57.8645L105.809 56.1116C104.445 55.3636 103.067 54.6296 101.661 53.9517L100.795 55.7471Z" fill="#919191" />
      <path d="M95.5845 61.1824L95.0597 59.2569L104.589 56.6842L101.292 47.336L103.186 46.681L107.205 58.0676L95.5845 61.1824Z" fill="#919191" />
      <circle cx="8.69433" cy="59.7296" r="3.91825" transform="rotate(-135 8.69433 59.7296)" stroke="#919191" strokeWidth={2} />
    </g>
    <defs>
      <clipPath id="clip0_625_20131">
        <rect width="76.2328" height="83.6102" fill="white" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 113.026 54.5132)" />
      </clipPath>
    </defs>
  </motion.svg>
);



const FeatureCard = ({ image, title, isMain, isActive, className = "" }) => (
  <motion.div
    className={`relative overflow-hidden rounded-3xl ${className} h-48`}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{
      opacity: isActive ? 1 : 0.5,
      scale: isActive ? 1 : 0.95,
          filter: isActive ? "brightness(2)" : "brightness(1)",
    }}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.3 }}
  >
    {/* Gradient overlay - Improved gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />

    {/* Image */}
    <div className="absolute inset-0">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-300 hover:scale-110"
        priority
      />
    </div>

    {/* Card content - Improved positioning and text visibility */}
    <div className="absolute inset-0 p-4 flex flex-col justify-end z-20">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="font-bold text-white text-xl drop-shadow-lg">
          {title}
        </h3>
      </motion.div>
    </div>

    {/* Enhanced glowing border */}
    <motion.div
      className="absolute inset-0 rounded-3xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      style={{
        boxShadow: '0 0 0 2px #bcee45, 0 0 25px 3px rgba(188,238,69,0.4)',
      }}
    />
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

  const [activeCard, setActiveCard] = useState(0);

// Add this useEffect for card animation
useEffect(() => {
  const interval = setInterval(() => {
    setActiveCard((prev) => (prev + 1) % 3);
  }, 3000);

  return () => clearInterval(interval);
}, []);

  useEffect(() => {
    // Fire confetti on component mount
    fireConfetti();
  }, []);

  const handleGetStarted = () => {
    setShowLoader(true);
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 35) {
          clearInterval(timer);
          document.cookie = "onboardingStep=completed; path=/; max-age=2592000";

          setTimeout(() => {
            router.push('/dashboard');
          }, 500);
          return 35;
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

          <div className="relative px-2  flex flex-col min-h-screen">
            {/* Logo Section */}
            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="relative w-44 h-44 "
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
              <div className="relative grid grid-cols-2 gap-3 w-full mt-6">
  {/* Top row cards */}
  
  {/* <motion.div 
    className="absolute right-[60px] bottom-[170px] translate-x-1/2 translate-y-1/2"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5 }}
  >
    <Arrow className="transform rotate-90 scale-75" />
  </motion.div>
  <motion.div 
    className="absolute left-[80px] bottom-[400px] translate-x-1/2 translate-y-1/2"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5 }}
  >
    <Arrow className="transform rotate-0 scale-75" />
  </motion.div> */}

  <FeatureCard
    image="/cong-1.jpeg"
    title="Launch Your Journey"
    isActive={activeCard === 0}
  />
  <FeatureCard
    image="/cong-2.jpeg"
    title= "Showcase Your Work"
    isActive={activeCard === 1}
  />
  
  {/* Arrows */}
 {/* Arrows */}
{/* <motion.div 
  className="absolute left-1/4 -bottom-6 -translate-x-1/2"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.5 }}
>
  <Arrow className="transform -rotate-45 scale-50" />
</motion.div> */}

{/* <motion.div 
  className="absolute right-1/4 -bottom-6 translate-x-1/2"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.5 }}
>
  <Arrow className="transform rotate-45 scale-50" />
</motion.div>
 */}

  {/* Centered bottom card */}
  <div className="col-span-2 flex justify-center">
    <div className="w-[calc(50%-0.375rem)]">
      <FeatureCard
        image="/cong-3.jpeg"
        title="Connect with Brands"
        isActive={activeCard === 2}
      />
    </div>
  </div>
</div>
            
            </motion.div>

            {/* CTA Button */}
            <motion.div
              className="w-full mt-10"
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