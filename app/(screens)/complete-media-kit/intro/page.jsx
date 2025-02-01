'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Camera, X, CheckCircle2, User, MapPin, Calendar, UserCircle2, ImageIcon, Type, FileText } from 'lucide-react';import Link from 'next/link';
import Image from 'next/image';
import { StepCompletion } from '@/components/MediaKitStepCompletion';
import { EnhancedHeader } from '@/components/MediaKitHeader';

const totalSteps = 6; // Total steps in media kit creation
const currentMainStep = 1; // Intro is step 1

const mockUserData = {
  fullName: 'Tushar Sharma',
  gender: 'Male',
  dob: '2001-01-15',
  location: 'Mumbai, India',
  email: 'tushar@example.com',
  phone: '+91 98765 43210',
  profilePic: '/avatar-placeholder.jpg', // Add a placeholder image path
  categories: ['lifestyle', 'tech', 'gaming']
};

const SlideIndicator = ({ currentSlide, totalSlides }) => (
    <div className="flex items-center gap-2 ml-8 mb-6">
      {[...Array(totalSlides)].map((_, index) => (
        <motion.div
          key={index}
          className={`h-2 rounded-full transition-all ${
            index === currentSlide ? 'w-8 bg-[#bcee45]' : 'w-2 bg-[#333333]'
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        />
      ))}
    </div>
  );

const slides = [
  {
    id: 'basic-info',
    title: 'Basic Information',
    description: 'Review your profile information',
    fields: [
      { 
        name: 'fullName', 
        label: 'Full Name', 
        type: 'text', 
        prefilled: true, 
        value: mockUserData.fullName,
        icon: User
      },
      { 
        name: 'gender', 
        label: 'Gender', 
        type: 'text', 
        prefilled: true, 
        value: mockUserData.gender,
        icon: UserCircle2
      },
      { 
        name: 'dob', 
        label: 'Date of Birth', 
        type: 'text', 
        prefilled: true, 
        value: mockUserData.dob,
        icon: Calendar
      },
      { 
        name: 'location', 
        label: 'Location', 
        type: 'text', 
        prefilled: true, 
        value: mockUserData.location,
        icon: MapPin
      }
    ]
  },
  {
    id: 'creator-info',
    title: 'Creator Categories',
    description: 'Select categories that best describe your content',
    fields: [
      {
        name: 'categories',
        type: 'multi-select',
        options: [
          { id: 'lifestyle', label: 'Lifestyle' },
          { id: 'fashion', label: 'Fashion' },
          { id: 'beauty', label: 'Beauty' },
          { id: 'travel', label: 'Travel' },
          { id: 'food', label: 'Food' },
          { id: 'tech', label: 'Technology' },
          { id: 'gaming', label: 'Gaming' },
          { id: 'fitness', label: 'Fitness' },
          { id: 'education', label: 'Education' },
          { id: 'entertainment', label: 'Entertainment' }
        ]
      }
    ]
  },
  {
    id: 'media-assets',
    title: 'Profile Media',
    description: 'Upload your profile picture and cover image',
    fields: [
      { 
        name: 'profilePic', 
        label: 'Profile Picture',
        description: 'Square format recommended (1:1)',
        type: 'image',
        icon: User
      },
      { 
        name: 'coverImage', 
        label: 'Cover Image',
        description: 'Recommended size 1920x1080',
        type: 'image',
        icon: ImageIcon
      }
    ]
  },
  {
    id: 'bio-info',
    title: 'Bio Information',
    description: 'Tell your story to the world',
    fields: [
      { 
        name: 'tagline', 
        label: 'Tagline',
        description: 'A short catchy line about you (max 60 chars)',
        type: 'text',
        icon: Type,
        placeholder: 'e.g., "Creative storyteller with a passion for tech"'
      },
      { 
        name: 'bio', 
        label: 'Short Bio',
        description: 'Tell brands about yourself (max 300 chars)',
        type: 'textarea',
        icon: FileText,
        placeholder: 'Share your journey, expertise, and what makes you unique...'
      }
    ]
  }
];

const ImageUploadCard = ({ field, value, onChange, onRemove }) => (
    <div className="space-y-2">
      <label className="text-md font-medium text-white">{field.label}</label>
      <p className="text-sm text-[#888888] mb-3">{field.description}</p>
      
      <div className="relative aspect-[3/2] rounded-xl border-2 border-dashed border-[#bcee45]/20 overflow-hidden group">
        {value ? (
          <>
            <Image 
              src={URL.createObjectURL(value)}
              alt={field.label}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onRemove(field.name)}
                className="p-2 bg-red-500 rounded-xl text-white"
              >
                <X className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById(field.name).click()}
                className="p-2 bg-[#bcee45] rounded-xl text-black"
              >
                <Camera className="w-5 h-5" />
              </motion.button>
            </div>
          </>
        ) : (
          <button 
            onClick={() => document.getElementById(field.name).click()}
            className="absolute inset-0 flex flex-col items-center justify-center text-[#bcee45]/60 hover:text-[#bcee45] transition-colors"
          >
            <Camera className="w-8 h-8 mb-2" />
            <span className="text-sm">Upload {field.label}</span>
          </button>
        )}
        <input
          id={field.name}
          type="file"
          accept="image/*"
          onChange={(e) => onChange(field.name, e.target.files[0])}
          className="hidden"
        />
      </div>
    </div>
  );

const PrefilledCard = ({ field, icon: Icon }) => (
  <motion.div
    className="p-6 bg-[#1A1A1A]/60 backdrop-blur-md rounded-2xl border border-[#333333]  transition-all"
    whileHover={{ scale: 1.02 }}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-[#bcee45]/10 rounded-xl flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#bcee45]" />
        </div>
        <div>
          <p className="text-sm text-[#888888] mb-1">{field.label}</p>
          <p className="text-white font-medium">{field.value}</p>
        </div>
      </div>
      {field.prefilled && (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#bcee45]" />
        </div>
      )}
    </div>
  </motion.div>
);
const CategoryButton = ({ category, selected, prefilled }) => (
    <div
      className={`p-4 rounded-xl border ${
        selected
          ? 'bg-[#bcee45]/10 border-[#bcee45] text-white'
          : 'border-[#333333] text-[#888888]'
      } text-sm font-medium relative`}
    >
      <div className="flex items-center justify-between gap-2">
        <span>{category.label}</span>
        {prefilled && selected && (
          <CheckCircle2 className="w-4 h-4 text-[#bcee45]" />
        )}
      </div>
    </div>
  );



const MediaKitIntro = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    ...mockUserData,
    categories: mockUserData.categories,
    profilePic: null,
    coverImage: null,
    tagline: '',
    bio: ''
  });
  const [showCompletion, setShowCompletion] = useState(false);
  const isLastSlide = currentSlide === slides.length - 1;

  const handleCategoryToggle = (categoryId) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const handleImageChange = (fieldName, file) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: file
    }));
  };

  const handleImageRemove = (fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: null
    }));
  };
  const handleComplete = () => {
    if (currentSlide === slides.length - 1) {
      const hasRequiredData = formData.tagline && formData.bio;
      if (hasRequiredData) {
        setShowCompletion(true);
      }
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F]">
      {/* Header */}
      <EnhancedHeader
        currentStep={currentMainStep} 
        currentSlide={currentSlide}
        totalSteps={totalSteps}
        onBackClick={setCurrentSlide}

      />
 
      {/* Progress Bar */}
      <div className="w-full h-1 bg-[#1A1A1A]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(currentMainStep / totalSteps) * 100}%` }}
          className="h-full bg-[#bcee45]"
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Main Content */}
      <div className="fixed inset-0 top-[172px] bottom-[80px] overflow-y-auto">
      <div className="max-w-xl mx-auto p-6">        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                {slides[currentSlide].title}
              </h2>
              <p className="text-[#888888]">
                {slides[currentSlide].description}
              </p>
            </div>

            {currentSlide === 0 && (
              <div className="space-y-4">
                {slides[0].fields.map(field => (
                  <PrefilledCard 
                    key={field.name} 
                    field={field}
                    icon={field.icon}
                  />
                ))}
              </div>
            )}

{currentSlide === 1 && (
  <div className="space-y-4">
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm text-[#888888]">
        Categories selected during signup
      </p>
      <span className="text-xs text-[#bcee45]">
        {formData.categories.length} Selected
      </span>
    </div>
    <div className="grid grid-cols-2 gap-3">
      {slides[1].fields[0].options.map(category => (
        <CategoryButton
          key={category.id}
          category={category}
          selected={formData.categories.includes(category.id)}
          prefilled={mockUserData.categories.includes(category.id)}
        />
      ))}
    </div>
    <p className="text-sm text-[#888888] text-center mt-4">
      Categories are pre-selected from your signup information
    </p>
  </div>
)}
            {currentSlide === 2 && (
              <div className="space-y-6">
                {slides[2].fields.map(field => (
                  <ImageUploadCard
                    key={field.name}
                    field={field}
                    value={formData[field.name]}
                    onChange={handleImageChange}
                    onRemove={handleImageRemove}
                  />
                ))}
              </div>
            )}

            {currentSlide === 3 && (
              <div className="space-y-6">
                {slides[3].fields.map(field => (
                  <div key={field.name} className="space-y-2">
                    <div className="flex items-center gap-2 mb-1">
                      <field.icon className="w-4 h-4 text-[#bcee45]" />
                      <label className="text-md font-medium text-white">
                        {field.label}
                      </label>
                    </div>
                    <p className="text-sm text-[#888888] mb-2">{field.description}</p>
                    {field.type === 'textarea' ? (
                      <textarea
                        value={formData[field.name]}
                        onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                        placeholder={field.placeholder}
                        rows={4}
                        maxLength={300}
                        className="w-full px-4 py-3 bg-[#1A1A1A]/60 rounded-xl border-2 border-[#bcee45]/20 text-white placeholder:text-[#888888] focus:border-[#bcee45] transition-colors outline-none resize-none"
                      />
                    ) : (
                      <input
                        type="text"
                        value={formData[field.name]}
                        onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                        placeholder={field.placeholder}
                        maxLength={60}
                        className="w-full px-4 py-3 bg-[#1A1A1A]/60 rounded-xl border-2 border-[#bcee45]/20 text-white placeholder:text-[#888888] focus:border-[#bcee45] transition-colors outline-none"
                      />
                    )}
                    <div className="flex justify-end text-xs text-[#888888]">
                      {field.type === 'textarea' ? 
                        `${formData[field.name].length}/300` : 
                        `${formData[field.name].length}/60`
                      }
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
  {showCompletion && (
    <StepCompletion 
      stepName="Basic Information"
      onContinue={() => {
        // Navigate to next main section
        window.location.href = '/complete-media-kit/portfolio';
      }}
    />
  )}
</AnimatePresence>
</div>
        

        {/* Navigation */}
       {/* Navigation */}
<div className="fixed bottom-0 left-0 right-0 p-4 bg-[#111111]">
  <div className="max-w-xl mx-auto flex justify-between">
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => currentSlide > 0 && setCurrentSlide(current => current - 1)}
    className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 ${
      currentSlide === 0
        ? 'text-[#888888] border-[#333333] cursor-not-allowed'
        : 'text-[#bcee45] border-[#bcee45]/20 hover:border-[#bcee45]/50'
    } border`}
    disabled={currentSlide === 0}
  >
    <ArrowLeft className="w-5 h-5" />
    Back
  </motion.button>

  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => {
      if (isLastSlide) {
        handleComplete();
      } else {
        setCurrentSlide(current => current + 1);
      }
    }}
    className="px-6 py-3 rounded-xl font-semibold flex items-center gap-2 bg-[#bcee45] text-black hover:opacity-90"
  >
    {isLastSlide ? 'Complete' : 'Next'}
    <ArrowRight className="w-5 h-5" />
  </motion.button>
</div>
</div>
      </div>
    </div>
  );
};

export default MediaKitIntro;