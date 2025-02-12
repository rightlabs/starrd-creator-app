'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import logo from '@/public/starrd-logo.png';
import Image from 'next/image';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Redirect after the animation plays
    const timeout = setTimeout(() => {
      router.push('/auth/register');
    }, 1500); // Adjust timing as needed

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          className="mb-4"
        >
          <div className="w-52 h-20  rounded-2xl flex items-center justify-center">
            <Image src={logo} alt="Logo"  />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* <h1 className="text-primary font-bold text-2xl">Starrd</h1> */}
          <div className="mt-4 flex space-x-2">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 bg-primary rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}