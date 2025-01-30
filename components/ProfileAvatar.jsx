import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import Image from 'next/image';

const ProfileAvatar = ({ 
  completion = 50, 
  image = null 
}) => {
  const size = 128; // w-32
  const strokeWidth = 3;
  const center = size / 2;
  const radius = (size / 2) - (strokeWidth / 2);
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completion / 100) * circumference;

  return (
    <div className="relative w-32 h-32">
      {/* SVG Progress Ring */}
      {/* <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute top-0 left-0 -rotate-90"
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#2A2A2A"
          strokeWidth={strokeWidth}
        />
        
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bcee45" />
            <stop offset="100%" stopColor="#9BC53D" />
          </linearGradient>
        </defs>
        
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg> */}

      {/* Avatar Container */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-black"
      >
        {image ? (
          <Image 
            src={image}
            alt="Profile"
            width={128}
            height={128}
            className="w-full h-full object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#bcee45] to-[#9BC53D] flex items-center justify-center">
            <User className="w-16 h-16 text-black" />
          </div>
        )}

        {/* Completion Badge */}
        <div className="absolute bottom-0 right-0 bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded-tl-xl text-xs font-medium text-[#bcee45]">
          {completion}%
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileAvatar;