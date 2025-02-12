'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Camera, X, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { StepCompletion } from '@/components/MediaKitStepCompletion';
import { EnhancedHeader } from '@/components/MediaKitHeader';
import { getMediaKitBasicDetails, updateMediaKitBasicDetails } from '@/api/mediaKit';

const totalSteps = 6;
const currentMainStep = 1;

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
        icon: '👤'
      },
      {
        name: 'gender',
        label: 'Gender',
        type: 'text',
        icon: '🧑'
      },
      {
        name: 'dob',
        label: 'Date of Birth',
        type: 'text',
        icon: '📅'
      },
      {
        name: 'location',
        label: 'Location',
        type: 'text',
        icon: '📍'
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
          { id: 'lifestyle', label: 'Lifestyle', icon: '✨' },
          { id: 'chef', label: 'Food Creator', icon: '🍳' },
          { id: 'gamer', label: 'Gamer', icon: '🎮' },
          { id: 'fitness', label: 'Fitness Creator', icon: '💪' },
          { id: 'educator', label: 'Educator', icon: '📚' },
          { id: 'artist', label: 'Artist', icon: '🎨' },
          { id: 'photographer', label: 'PhotoGrapher',icon:'📸'},
          { id: 'youtuber', label: 'Youtuber', icon: '📹'},
          { id: 'blogger', label: 'Blogger', icon: '📝'},
          { id: 'musician', label: 'Musician', icon: '🎵'},
          { id: 'podcaster', label: 'Podcaster', icon: '🎙️'},
          { id: 'influencer', label: 'Influencer', icon: '🎭'},


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
        name: 'profilePicture',
        label: 'Profile Picture',
        description: 'Square format recommended (1:1)',
        type: 'image',
        icon: '🖼️'
      },
      {
        name: 'coverImage',
        label: 'Cover Image',
        description: 'Recommended size 1920x1080',
        type: 'image',
        icon: '🏞️'
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
        placeholder: 'e.g., "Creative storyteller with a passion for tech"',
        icon: '✍️'
      },
      {
        name: 'bio',
        label: 'Short Bio',
        description: 'Tell brands about yourself (max 300 chars)',
        type: 'textarea',
        placeholder: 'Share your journey, expertise, and what makes you unique...',
        icon: '📝'
      }
    ]
  },
  {
    id: 'representation',
    title: 'Representation',
    description: 'Let us know if you are represented by an agency',
    fields: [
      {
        name: 'representation.name',
        label: 'Agency Name',
        type: 'text',
        placeholder: 'e.g., Creator Management Agency',
        icon: '🏢'
      },
      {
        name: 'representation.logo',
        label: 'Agency Logo',
        type: 'image',
        description: 'Upload agency logo (optional)',
        icon: '🖼️'
      },
      {
        name: 'representation.website',
        label: 'Agency Website',
        type: 'text',
        placeholder: 'e.g., https://agency.com (optional)',
        icon: '🌐'
      }
    ]
  }
];

const MediaKitIntro = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    // Prefilled user data
    fullName: '',
    gender: '',
    dob: '',
    location: '',
    categories: [],
    // Media kit specific fields
    profilePicture: null,
    coverImage: null,
    tagline: '',
    bio: '',
    representation: {
      name: '',
      logo: null,
      website: ''
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getMediaKitBasicDetails();
        
        if (response?.statusCode === 200) {
          const { data } = response;
          console.log("data",data)

          setFormData(prev => ({
            ...prev,
            fullName: data.fullName || '',
            gender: data.gender || '',
            dob: data.dob || '',
            location: data.location || '',
            categories: data.categories || [],
            profilePicture: data.profilePicture || null,
            coverImage: data.coverImage || null,
            tagline: data.tagline || '',
            bio: data.bio || '',
            representation: {
              name: data.representation?.name || '',
              logo: data.representation?.logo || null,
              website: data.representation?.website || ''
            }
          }));
        }
      } catch (err) {
        setError(err.message || "Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComplete = async () => {
    if (currentSlide === slides.length - 1) {
      try {
        setIsSubmitting(true);
        const data = new FormData();
        
        // Only append files if they're new
        if (formData.profilePicture instanceof File) {
          data.append('profilePicture', formData.profilePicture);
        }
        if (formData.coverImage instanceof File) {
          data.append('coverImage', formData.coverImage);
        }
  
        data.append('tagline', formData.tagline);
        data.append('bio', formData.bio);
  
        const representation = {
          name: formData.representation.name || '',
          website: formData.representation.website || '',
          logo: null // Explicitly set null if no logo
        };
  
        // Only append logo if it's a new File
        if (formData.representation.logo instanceof File) {
          data.append('representation.logo', formData.representation.logo);
        }
  
        data.append('representation', JSON.stringify(representation));
  
        const response = await updateMediaKitBasicDetails(data);
        if (response.statusCode === 200) {
          setShowCompletion(true);
        }
      } catch (error) {
        console.error("Error updating details:", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRepresentationChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      representation: {
        ...prev.representation,
        [field]: value
      }
    }));
  };

  const handleImageChange = (fieldName, file) => {
    if (fieldName.startsWith('representation.')) {
      handleRepresentationChange('logo', file);
    } else {
      handleFormChange(fieldName, file);
    }
  };

  const handleImageRemove = (fieldName) => {
    if (fieldName.startsWith('representation.')) {
      handleRepresentationChange('logo', null);
    } else {
      handleFormChange(fieldName, null);
    }
  };

  const renderPrefilledInfo = () => {
    if (!formData) return null;

    return (
      <div className="space-y-4">
        {slides[0].fields.map(field => (
          <PrefilledCard
            key={field.name}
            field={{
              ...field,
              value: field.name === 'fullName' 
                ? `${formData.fullName}`.trim()
                : formData[field.name],
              prefilled: true
            }}
          />
        ))}
      </div>
    );
  };

  const renderCategories = () => {
    if (!formData?.categories) return null;

    return (
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
              prefilled={true}
              onClick={() => null}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderBioFields = () => (
    <div className="space-y-6">
      {slides[3].fields.map(field => (
        <div key={field.name} className="space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{field.icon}</span>
            <label className="text-md font-medium text-white">
              {field.label}
            </label>
          </div>
          <p className="text-sm text-[#888888] mb-2">{field.description}</p>
          {field.type === 'textarea' ? (
            <textarea
              value={formData[field.name]}
              onChange={(e) => handleFormChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              rows={4}
              maxLength={300}
              className="w-full px-4 py-3 bg-[#1A1A1A]/60 rounded-xl border-2 border-[#bcee45]/20 text-white placeholder:text-[#888888] focus:border-[#bcee45] transition-colors outline-none resize-none"
            />
          ) : (
            <input
              type="text"
              value={formData[field.name]}
              onChange={(e) => handleFormChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              maxLength={60}
              className="w-full px-4 py-3 bg-[#1A1A1A]/60 rounded-xl border-2 border-[#bcee45]/20 text-white placeholder:text-[#888888] focus:border-[#bcee45] transition-colors outline-none"
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderRepresentationFields = () => (
    <div className="space-y-6">
      {slides[4].fields.map(field => {
        const fieldName = field.name.split('.')[1];
        
        if (field.type === 'image') {
          return (
            <ImageUploadCard
              key={field.name}
              field={field}
              value={formData.representation[fieldName]}
              onChange={handleImageChange}
              onRemove={handleImageRemove}
            />
          );
        }
        
        return (
          <div key={field.name} className="space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{field.icon}</span>
              <label className="text-md font-medium text-white">
                {field.label}
              </label>
            </div>
            {field.description && (
              <p className="text-sm text-[#888888] mb-2">{field.description}</p>
            )}
            <input
              type="text"
              value={formData.representation[fieldName] || ''}
              onChange={(e) => handleRepresentationChange(fieldName, e.target.value)}
              placeholder={field.placeholder}
              className="w-full px-4 py-3 bg-[#1A1A1A]/60 rounded-xl border-2 border-[#bcee45]/20 text-white placeholder:text-[#888888] focus:border-[#bcee45] transition-colors outline-none"
            />
          </div>
        );
      })}
    </div>
  );


  const isCurrentStepValid = () => {
    switch (currentSlide) {
      case 0: // Basic Info
      case 1: // Categories
        return true; // Always valid as they're prefilled
        
      case 2: // Media Assets
        return formData.profilePicture !== null && formData.coverImage !== null;
        
      case 3: // Bio Info
        return (
          formData.tagline?.trim().length > 0 && 
          formData.bio?.trim().length > 0
        );
        
      case 4: // Representation (optional)
        return true;
        
      default:
        return false;
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F] flex items-center justify-center">
        <div className="text-[#bcee45] text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F] flex items-center justify-center">
        <div className="text-red-500 text-lg">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F]">
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]">
      <EnhancedHeader
          currentStep={currentMainStep}
          currentSlide={currentSlide}
          totalSteps={totalSteps}
          onBackClick={setCurrentSlide}
        />
      </div>

      <div className="w-full h-1 bg-[#1A1A1A]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(currentMainStep / totalSteps) * 100}%` }}
          className="h-full bg-[#bcee45]"
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="fixed inset-0 top-[172px] bottom-[80px] overflow-y-auto">
        <div className="max-w-xl mx-auto p-6">
          <AnimatePresence mode="wait">
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

              {currentSlide === 0 && renderPrefilledInfo()}
              {currentSlide === 1 && renderCategories()}
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
              {currentSlide === 3 && renderBioFields()}
              {currentSlide === 4 && renderRepresentationFields()}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {showCompletion && (
              <StepCompletion
                stepName="Basic Information"
                onContinue={() => {
                  window.location.href = '/complete-media-kit/portfolio';
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

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
    onClick={handleComplete}
    disabled={!isCurrentStepValid() || isSubmitting}
    className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 ${
      isCurrentStepValid() && !isSubmitting
        ? 'bg-[#bcee45] text-black hover:opacity-90'
        : 'bg-[#333333] text-[#888888] cursor-not-allowed'
    }`}
  >
    {isSubmitting ? (
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
        <span>Saving...</span>
      </div>
    ) : (
      <>
        {currentSlide === slides.length - 1 ? 'Complete' : 'Next'}
        <ArrowRight className="w-5 h-5" />
      </>
    )}
  </motion.button>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const PrefilledCard = ({ field }) => {
  let displayValue = field.value;
  
  if (field.name === 'dob' && field.value) {
    displayValue = new Date(field.value).toLocaleDateString();
  }

  return (
    <motion.div
      className="p-6 bg-[#1A1A1A]/60 backdrop-blur-md rounded-2xl border border-[#333333] transition-all"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#bcee45]/10 rounded-xl flex items-center justify-center">
            <span className="text-xl">{field.icon}</span>
          </div>
          <div>
            <p className="text-sm text-[#888888] mb-1">{field.label}</p>
            <p className="text-white font-medium">{displayValue}</p>
          </div>
        </div>
        {field.prefilled && (
          <div className="flex items-center gap-2">
            <span className="text-[#bcee45]">✅</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const CategoryButton = ({ category, selected, prefilled, onClick }) => (
  <div
    onClick={onClick}
    className={`p-4 rounded-xl border ${
      selected
        ? 'bg-[#bcee45]/10 border-[#bcee45] text-white'
        : 'border-[#333333] text-[#888888]'
    } text-sm font-medium relative cursor-pointer hover:border-[#bcee45]/50`}
  >
    <div className="flex items-center justify-between gap-2">
      <span>{category.icon} {category.label}</span>
      {prefilled && selected && (
        <CheckCircle2 className="w-4 h-4 text-[#bcee45]" />
      )}
    </div>
  </div>
);

const ImageUploadCard = ({ field, value, onChange, onRemove }) => {
  const getImageSrc = (value) => {
    if (!value) return null;
    if (typeof value === 'string') return value;
    if (value instanceof File) return URL.createObjectURL(value);
    if (value.url) return value.url;
    return null;
  };

  const imageSrc = getImageSrc(value);

  return (
    <div className="space-y-2">
      <label className="text-md font-medium text-white">{field.label}</label>
      <p className="text-sm text-[#888888] mb-3">{field.description}</p>
      
      <div className="relative aspect-[3/2] rounded-xl border-2 border-dashed border-[#bcee45]/20 overflow-hidden group">
        {imageSrc ? (
          <>
            <Image 
              src={imageSrc}
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
};

export default MediaKitIntro;