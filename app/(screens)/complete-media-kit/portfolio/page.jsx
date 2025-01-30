'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Image as ImageIcon, Video, Music, X, Upload, Play, Pause } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { StepCompletion } from '@/components/MediaKitStepCompletion';

const totalSteps = 6; // Total steps in media kit creation
const currentMainStep = 2; // Portfolio is step 2

const mediaTypes = [
  { id: 'video', label: 'Video', icon: Video },
  { id: 'audio', label: 'Audio', icon: Music },
  { id: 'image', label: 'Image', icon: ImageIcon }
];

const contentTypes = [
  { id: 'product-review', label: 'Product Review' },
  { id: 'testimonial', label: 'Testimonial' },
  { id: 'misc', label: 'Miscellaneous' }
];

const categories = [
  { id: 'lifestyle', label: 'Lifestyle' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'beauty', label: 'Beauty' },
  { id: 'tech', label: 'Technology' },
  { id: 'food', label: 'Food & Beverage' }
];

const SlideIndicator = ({ currentSlide, totalSlides }) => (
  <div className="flex items-center gap-2 mb-6">
    {[...Array(totalSlides)].map((_, index) => (
      <motion.div
        key={index}
        className={`h-2 rounded-full transition-all ${index === currentSlide ? 'w-8 bg-[#bcee45]' : 'w-2 bg-[#333333]'
          }`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
    ))}
  </div>
);

const MediaTypeCard = ({ type, selected, onSelect }) => {
  const Icon = type.icon;
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(type.id)}
      className={`p-6 rounded-xl border ${selected
          ? 'border-[#bcee45] bg-[#bcee45]/10'
          : 'border-[#333333] hover:border-[#bcee45]/50'
        } transition-all w-full`}
    >
      <div className="flex flex-col items-center gap-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selected ? 'bg-[#bcee45]/20' : 'bg-[#1A1A1A]'
          }`}>
          <Icon className={`w-6 h-6 ${selected ? 'text-[#bcee45]' : 'text-white/60'}`} />
        </div>
        <span className={`font-medium ${selected ? 'text-white' : 'text-white/60'}`}>
          {type.label}
        </span>
      </div>
    </motion.button>
  );
};

const OptionButton = ({ label, selected, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`px-4 py-2 rounded-xl border ${selected
        ? 'border-[#bcee45] bg-[#bcee45]/10 text-white'
        : 'border-[#333333] text-white/60 hover:border-[#bcee45]/50'
      } transition-all text-sm font-medium`}
  >
    {label}
  </motion.button>
);

const FileUploadArea = ({ mediaType, onFileSelect }) => (
  <div className="relative aspect-video rounded-xl border-2 border-dashed border-[#bcee45]/20 overflow-hidden group">
    <button
      onClick={() => document.getElementById('portfolio-file').click()}
      className="absolute inset-0 flex flex-col items-center justify-center text-[#bcee45]/60 hover:text-[#bcee45] transition-colors"
    >
      <Upload className="w-8 h-8 mb-2" />
      <span className="text-sm">Upload {mediaType}</span>
      <p className="text-xs text-white/40 mt-2">
        {mediaType === 'video' && 'MP4, WebM up to 100MB'}
        {mediaType === 'audio' && 'MP3, WAV up to 50MB'}
        {mediaType === 'image' && 'JPG, PNG up to 10MB'}
      </p>
    </button>
    <input
      id="portfolio-file"
      type="file"
      accept={
        mediaType === 'video' ? 'video/*' :
          mediaType === 'audio' ? 'audio/*' :
            'image/*'
      }
      onChange={(e) => onFileSelect(e.target.files[0])}
      className="hidden"
    />
  </div>
);

const PortfolioPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    mediaType: null,
    contentType: null,
    category: null,
    file: null
  });

  const [showCompletion, setShowCompletion] = useState(false);

  const handleComplete = () => {
    // Only show completion if all data is valid
    const isPortfolioComplete = formData.mediaType &&
      formData.contentType &&
      formData.category &&
      formData.file;

    if (isPortfolioComplete && currentSlide === slides.length - 1) {
      setShowCompletion(true);
    }
  };

  const handleFileSelect = (file) => {
    setFormData(prev => ({ ...prev, file }));
  };

  const isCurrentStepValid = () => {
    switch (currentSlide) {
      case 0:
        return formData.mediaType;
      case 1:
        return formData.contentType;
      case 2:
        return formData.category;
      case 3:
        return formData.file;
      default:
        return false;
    }
  };

  const slides = [
    {
      title: 'Select Media Type',
      description: 'Choose the type of media you want to upload'
    },
    {
      title: 'Content Type',
      description: 'What kind of content is this?'
    },
    {
      title: 'Category',
      description: 'Select a category for your content'
    },
    {
      title: 'Upload Content',
      description: 'Upload your media file'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-black/40 backdrop-blur-lg border-b border-white/5 sticky top-0 z-50"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/complete-media-kit/intro">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-[#1A1A1A] border border-[#333333] rounded-xl flex items-center justify-center hover:border-[#bcee45]/50 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-[#bcee45]" />
              </motion.button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">Portfolio</h1>
              <p className="text-sm text-[#888888]">Step {currentMainStep} of {totalSteps}</p>
            </div>
          </div>
          <SlideIndicator currentSlide={currentSlide} totalSlides={slides.length} />
        </div>
      </motion.div>

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

            {currentSlide === 0 && (
              <div className="grid grid-cols-3 gap-4">
                {mediaTypes.map(type => (
                  <MediaTypeCard
                    key={type.id}
                    type={type}
                    selected={formData.mediaType === type.id}
                    onSelect={(id) => setFormData(prev => ({ ...prev, mediaType: id }))}
                  />
                ))}
              </div>
            )}

            {currentSlide === 1 && (
              <div className="flex flex-wrap gap-3">
                {contentTypes.map(type => (
                  <OptionButton
                    key={type.id}
                    label={type.label}
                    selected={formData.contentType === type.id}
                    onClick={() => setFormData(prev => ({ ...prev, contentType: type.id }))}
                  />
                ))}
              </div>
            )}

            {currentSlide === 2 && (
              <div className="flex flex-wrap gap-3">
                {categories.map(category => (
                  <OptionButton
                    key={category.id}
                    label={category.label}
                    selected={formData.category === category.id}
                    onClick={() => setFormData(prev => ({ ...prev, category: category.id }))}
                  />
                ))}
              </div>
            )}

            {currentSlide === 3 && (
              <FileUploadArea
                mediaType={formData.mediaType}
                onFileSelect={handleFileSelect}
              />
            )}
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          {showCompletion && (
            <StepCompletion
              stepName="Portfolio Creation"
              onContinue={() => {
                window.location.href = '/complete-media-kit/social-connects';
              }}
            />
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => currentSlide > 0 && setCurrentSlide(current => current - 1)}
            className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 ${currentSlide === 0
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
              if (currentSlide === slides.length - 1) {
                handleComplete();
              } else {
                setCurrentSlide(current => current + 1);
              }
            }}
            className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 ${isCurrentStepValid()
                ? 'bg-[#bcee45] text-black hover:opacity-90'
                : 'bg-[#333333] text-[#888888] cursor-not-allowed'
              }`}
            disabled={!isCurrentStepValid()}
          >
            {currentSlide === slides.length - 1 ? 'Complete' : 'Next'}
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;