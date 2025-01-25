'use client'
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';

const categories = [
    {
      id: 'influencer',
      title: 'Influencer',
      icon: '🎭'
    },
    {
      id: 'blogger',
      title: 'Blogger', 
      icon: '✍️'
    },
    {
      id: 'podcaster',
      title: 'Podcaster',
      icon: '🎙️'
    },
    {
      id: 'youtuber',
      title: 'YouTuber',
      icon: '📹'
    },
    {
      id: 'photographer',
      title: 'Photographer',
      icon: '📸'
    },
    {
      id: 'artist',
      title: 'Artist',
      icon: '🎨'
    },
    {
      id: 'musician',
      title: 'Musician',
      icon: '🎵'
    },
    {
      id: 'gamer',
      title: 'Gamer',
      icon: '🎮'
    },
    {
      id: 'fitness',
      title: 'Fitness Creator',
      icon: '💪'
    },
    {
      id: 'chef',
      title: 'Food Creator',
      icon: '👨‍🍳'
    },
    {
      id: 'educator',
      title: 'Educator',
      icon: '👨‍🏫'
    },
    {
      id: 'lifestyle',
      title: 'Lifestyle',
      icon: '✨'
    }
   ];


   const StepIndicator = () => {
    const steps = [
      { id: 1, width: 'w-2', active: false },
      { id: 2, width: 'w-8', active: true },
      { id: 3, width: 'w-2', active: false },
      { id: 4, width: 'w-2', active: false }
    ];
  
    return (
      <div className="flex items-center gap-2">
        {steps.map((step) => (
          <motion.div
            key={step.id}
            className={`h-2 rounded-full ${step.active ? 'bg-black' : 'bg-black/20'} ${step.width}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: step.id * 0.1 }}
          />
        ))}
      </div>
    );
  };
const CreatorType = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleCategory = (id) => {
    setSelectedTypes(prev => 
      prev.includes(id) 
        ? prev.filter(type => type !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (selectedTypes.length === 0) {
      toast.error('Please select at least one category');
      return;
    }

    try {
      setLoading(true);
      // Simulated API call
      // await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Categories saved successfully!', {
        style: { 
          backgroundColor: '#000000', // Black background
          color: '#bcee45'  // Primary (yellow/green) text
        },
       });
      setTimeout(() => {
        window.location.href = '/auth/register/connect-socials';
      }, 500);
    } catch (error) {
      toast.error('Failed to save categories');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary">
        <AnimatePresence mode="wait">
      <div className="relative h-36 bg-black/5">
      
        <div className="absolute inset-x-0 bottom-0">
          <div className="bg-primary h-16 rounded-t-[5.5rem]" />
        </div>
        <div className="container px-6 relative">
          <div className="flex items-center justify-between pt-6">
            <Link href="/auth/register/personal">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <ArrowLeft className="w-5 h-5 text-primary" />
              </div>
            </Link>
            <StepIndicator />
            <div className="w-10" />
          </div>
        </div>
      </div>

      <div className="container px-6 pb-8 ">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-3xl font-extrabold">What type of creator are you?</h1>
            <p className="text-black/60 pt-2 ">Select all that apply to you</p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto pr-2">
                        {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`p-4 rounded-2xl text-left transition-all ${
                  selectedTypes.includes(category.id)
                    ? 'bg-black/5 hover:bg-black/10'
                    :  'bg-black text-primary scale-95'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-2xl mb-2 block">{category.icon}</span>
                <h3 className="font-semibold">{category.title}</h3>
                {/* <p className={`text-sm ${
                  selectedTypes.includes(category.id)
                    ?'text-black/60' 
                    :  'text-primary/80'
                }`}>
                  {category.description}
                </p> */}
              </motion.button>
            ))}
          </div>

          <Button
            className="w-full bg-black rounded-3xl text-primary hover:bg-black/90"
            size="lg"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </motion.div>
      </div>
      </AnimatePresence>
    </div>
  );
};

export default CreatorType;