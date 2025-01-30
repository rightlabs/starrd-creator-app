import React from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

const PreviewButton = () => {
  const router = useRouter();

  // Pulse animation for the inner content
  const pulseAnimation = {
    scale: [1, 1.02, 1],
    opacity: [0.3, 0.5, 0.3],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Hover animation for the icon
  const iconAnimation = {
    initial: { rotate: 0 },
    hover: {
      rotate: [0, -10, 10, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="fixed bottom-24 inset-x-0 flex justify-center z-40">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 100
        }}
      >
        {/* Main button container with rotating border */}
        <motion.div 
          className="relative inline-flex h-14 overflow-hidden rounded-full p-[1.5px] focus:outline-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Rotating gradient border */}
          <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#bcee45_0%,#ffffff_50%,#bcee45_100%)]" />

          {/* Button content container */}
          <motion.button
            onClick={() => router.push('/media-kit')}
            className="relative inline-flex h-full w-full items-center justify-center rounded-full bg-primary px-8 py-4 text-black backdrop-blur-3xl"
          >
            {/* Background glow effect */}
            <motion.div 
              className="absolute inset-0 bg-white/20 blur-xl"
              animate={pulseAnimation}
            />

            {/* Main content */}
            <motion.div
              className="relative flex items-center gap-3 z-10"
              variants={iconAnimation}
              initial="initial"
              whileHover="hover"
            >
              <Eye className="w-6 h-6" strokeWidth={2.5} />
              <span className="text-sm font-semibold tracking-wide">Preview Media Kit</span>
            </motion.div>

            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PreviewButton;