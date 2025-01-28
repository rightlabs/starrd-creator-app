'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoadingScreen = ({ progress }) => (
  <motion.div
    className="fixed inset-0 bg-black flex flex-col items-center justify-center"
    initial={{ height: "100vh", y: 0 }}
    exit={{
      height: "180px",
      y: 0,
      position: "absolute",
      transition: {
        duration: 1,
        ease: [0.43, 0.13, 0.23, 0.96]
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
    </motion.p>
  </motion.div>
);

const petTypes = [
  { id: 'dog', name: 'Dog', icon: '🐕' },
  { id: 'cat', name: 'Cat', icon: '🐱' },
  { id: 'bird', name: 'Bird', icon: '🦜' },
  { id: 'fish', name: 'Fish', icon: '🐠' },
  { id: 'rabbit', name: 'Rabbit', icon: '🐰' },
  { id: 'hamster', name: 'Hamster', icon: '🐹' },
  { id: 'other', name: 'Other', icon: '🦒' },
  { id: 'none', name: 'No Pets', icon: '🚫' }
];

const PetsPage = () => {
  const [selectedPets, setSelectedPets] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [progress, setProgress] = useState(50);
  const router = useRouter();

  const handlePetSelect = (pet) => {
    if (pet.id === 'none') {
      setSelectedPets([{ type: pet.id, name: pet.name, icon: pet.icon }]);
    } else if (!selectedPets.some(p => p.type === pet.id)) {
      const newPet = {
        type: pet.id,
        name: pet.name,
        icon: pet.icon
      };
      setSelectedPets([...selectedPets, newPet]);
    }
  };

  const removePet = (index) => {
    const newPets = [...selectedPets];
    newPets.splice(index, 1);
    setSelectedPets(newPets);
  };

  const handleComplete = () => {
    setShowLoader(true);
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            router.push('/dashboard');
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F] text-white">
      <AnimatePresence mode="wait">
        {showLoader ? (<LoadingScreen progress={progress} />):(
            <>
            <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-black/40 backdrop-blur-lg border-b border-white/5 sticky top-0 z-50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/complete-profile/body-type">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-[#1A1A1A] border border-[#333333] rounded-xl flex items-center justify-center hover:border-[#bcee45]/50 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 text-[#bcee45]" />
                  </motion.button>
                </Link>
                <div>
                  <h1 className="text-xl font-bold">Do you have any pets?</h1>
                  <p className="text-sm text-[#888888]">Final Step!</p>
                </div>
              </div>
            </div>
          </motion.div>
    
          {/* Progress Bar */}
          <div className="w-full h-1 bg-[#1A1A1A]">
            <motion.div
              initial={{ width: '80%' }}
              animate={{ width: '100%' }}
              className="h-full bg-[#bcee45]"
              transition={{ duration: 0.5 }}
            />
          </div>
    
          {/* Main Content */}
          <div className="max-w-xl mx-auto p-6">
            {/* Selected Pets */}
            {selectedPets.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6"
              >
                <h3 className="text-lg font-semibold mb-3">Your Pets</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPets.map((pet, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#333333] rounded-xl"
                    >
                      <span>{pet.icon}</span>
                      <span>{pet.name}</span>
                      <button
                        onClick={() => removePet(index)}
                        className="ml-2 hover:bg-[#333333] rounded-full p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
    
            {/* Pet Type Selection */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {petTypes.map((pet, index) => (
                <motion.button
                  key={pet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handlePetSelect(pet)}
                  disabled={selectedPets.some(p => p.type === 'none')}
                  className={`p-6 bg-[#1A1A1A]/60 backdrop-blur-md rounded-2xl border
                    ${selectedPets.some(p => p.type === pet.id)
                      ? 'border-[#bcee45] bg-[#bcee45]/5'
                      : 'border-[#333333] hover:border-[#bcee45]/50'
                    } transition-all`}
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <span className="text-4xl mb-2">{pet.icon}</span>
                    <h3 className="font-semibold">{pet.name}</h3>
                  </div>
                </motion.button>
              ))}
            </div>
    
            {/* Complete Button */}
            <div className="mt-8 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleComplete}
                disabled={selectedPets.length === 0}
                className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 ${
                  selectedPets.length > 0
                    ? 'bg-[#bcee45] text-black hover:opacity-90'
                    : 'bg-[#333333] text-[#888888] cursor-not-allowed'
                } transition-colors`}
              >
                Complete Profile
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
          </>
        )}
      </AnimatePresence>

      
    </div>
  );
};

export default PetsPage;