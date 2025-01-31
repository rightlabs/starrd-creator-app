'use client'
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, X, Search, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const categories = [
  {
    id: 'influencer',
    title: 'Influencer',
    icon: '🎭',
    description: 'Social media personality'
  },
  {
    id: 'blogger',
    title: 'Blogger', 
    icon: '✍️',
    description: 'Writing and content creation'
  },
  {
    id: 'podcaster',
    title: 'Podcaster',
    icon: '🎙️',
    description: 'Audio content creator'
  },
  {
    id: 'youtuber',
    title: 'YouTuber',
    icon: '📹',
    description: 'Video content creator'
  },
  {
    id: 'photographer',
    title: 'Photographer',
    icon: '📸',
    description: 'Visual artist'
  },
  {
    id: 'artist',
    title: 'Artist',
    icon: '🎨',
    description: 'Creative professional'
  },
  {
    id: 'musician',
    title: 'Musician',
    icon: '🎵',
    description: 'Music creator'
  },
  {
    id: 'gamer',
    title: 'Gamer',
    icon: '🎮',
    description: 'Gaming content creator'
  },
  {
    id: 'fitness',
    title: 'Fitness Creator',
    icon: '💪',
    description: 'Health & wellness'
  },
  {
    id: 'chef',
    title: 'Food Creator',
    icon: '👨‍🍳',
    description: 'Culinary content'
  },
  {
    id: 'educator',
    title: 'Educator',
    icon: '👨‍🏫',
    description: 'Educational content'
  },
  {
    id: 'lifestyle',
    title: 'Lifestyle',
    icon: '✨',
    description: 'Life & style content'
  }
];

const StepIndicator = () => {
  const steps = [
    { id: 'step-1', width: 'w-2', active: true },
    { id: 'step-2', width: 'w-8', active: true },
    { id: 'step-3', width: 'w-2', active: false },
    { id: 'step-4', width: 'w-2', active: false }
  ];

  return (
    <div className="flex items-center gap-2">
      {steps.map((step, index) => (
        <motion.div
          key={`indicator-${step.id}-${index}`}
          className={`h-2 rounded-full ${step.active ? 'bg-black' : 'bg-black/20'} ${step.width}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 }}
        />
      ))}
    </div>
  );
};

// Category Card Component
const CategoryCard = ({ category, isSelected, onClick }) => (
  <motion.button
    onClick={onClick}
    className={`group relative w-full px-4 py-3 rounded-2xl text-left transition-all ${
      isSelected ? 'bg-primary' : 'bg-black border border-primary/20'
    }`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="flex items-center gap-3">
      <span className="text-2xl">{category.icon}</span>
      <div>
        <h3 className={`font-semibold ${isSelected ? 'text-black' : 'text-white'}`}>
          {category.title}
        </h3>
        <p className={`text-sm ${isSelected ? 'text-black/70' : 'text-gray-600'}`}>
          {category.description}
        </p>
      </div>
    </div>
  </motion.button>
);

const CreatorType = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleCategory = (id) => {
    setSelectedTypes(prev => 
      prev.includes(id) 
        ? prev.filter(type => type !== id)
        : [...prev, id]
    );
  };

  const removeCategory = (id) => {
    setSelectedTypes(prev => prev.filter(type => type !== id));
  };

  const handleSubmit = async () => {
    if (selectedTypes.length === 0) {
      toast.error('Please select at least one category');
      return;
    }

    try {
      setLoading(true);
      toast.success('Categories saved successfully!', {
        style: { 
          backgroundColor: '#000000',
          color: '#ffffff',
          borderRadius:"16px"
          
        },
        icon: <CheckCircle size={24} color="#00ff00" />,
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

  const selectedCategories = categories.filter(cat => selectedTypes.includes(cat.id));
  const filteredCategories = categories.filter(category => 
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black">
     <div className="relative h-36 bg-primary">
        <div className="absolute inset-x-0 bottom-0">
          <div className="bg-black h-16 rounded-t-[5.5rem]" />
        </div>
        <div className="container px-6">
          <div className="flex items-center justify-between pt-6">
            <Link href="/auth/register">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <ArrowLeft className="w-5 h-5 text-primary" />
              </div>
            </Link>
            <StepIndicator />
            <div className="w-10" />
          </div>
        </div>
      </div>


      <div className="px-6 pb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">
              What type of creator are you?
            </h1>
            <p className="text-gray-600">
              Select all that apply to you
            </p>
          </div>

          {/* Search Box with Selected Pills */}
          <div className="relative">
            <div className="min-h-[52px] bg-black border border-primary/20 rounded-2xl px-4 py-2 flex flex-wrap gap-2 items-center">
              <Search className="w-5 h-5 text-primary/40" />
              <AnimatePresence>
                {selectedCategories.map((category, index) => (
                  <motion.div
                    key={`pill-${category.id}-${index}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-primary/10 text-primary px-3 py-1.5 rounded-full flex items-center gap-2"
                  >
                    <span className="text-base">{category.icon}</span>
                    <span className="text-sm font-medium">{category.title}</span>
                    <button
                      onClick={() => removeCategory(category.id)}
                      className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-black transition-all"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={selectedCategories.length === 0 ? "Search creator types..." : ""}
                className="flex-1 min-w-[120px] bg-transparent text-primary placeholder-white/40 outline-none text-sm h-8"
              />
            </div>
          </div>

          {/* Category List */}
          <div className="grid grid-cols-1 gap-3 max-h-[50vh] overflow-y-auto pr-2">
            {filteredCategories.map((category, index) => (
              <CategoryCard 
                key={`category-${category.id}-${index}`}
                category={category}
                isSelected={selectedTypes.includes(category.id)}
                onClick={() => toggleCategory(category.id)}
              />
            ))}
          </div>

          {/* Submit Button */}
          <div className='bg-black flex justify-center'>

          <Button
  className={`w-full bottom-2 fixed py-6  rounded-2xl text-lg font-medium flex items-center justify-center ${
    selectedTypes.length > 0 
      ? 'bg-primary text-black hover:bg-primary/90'
      : 'bg-primary text-black'
  }`}
  size="lg"
  onClick={handleSubmit}
  disabled={loading || selectedTypes.length === 0}
>
  {loading ? 'Saving...' : selectedTypes.length === 0 ? 'Select categories' : 'Continue'}
</Button>
</div>

        </motion.div>
      </div>
    </div>
  );
};

export default CreatorType;