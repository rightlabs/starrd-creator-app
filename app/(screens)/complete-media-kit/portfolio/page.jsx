'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Upload, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { StepCompletion } from '@/components/MediaKitStepCompletion';
import { EnhancedHeader } from '@/components/MediaKitHeader';
import { addMediaKitPortfolioItem, getMediaKitPortfolioItems } from '@/api/mediaKit';

const totalSteps = 6;
const currentMainStep = 2;

const mediaTypes = [
  { id: 'video', label: 'Video', icon: '🎥' },
  { id: 'audio', label: 'Audio', icon: '🎵' },
  { id: 'image', label: 'Image', icon: '🖼️' }
];

const contentTypes = [
  { id: 'product-review', label: '✍️ Product Review ' },
  { id: 'testimonial', label: '💬 Testimonial ' },
  { id: 'misc', label: '🛠️ Miscellaneous ' }
];

const categories = [
  { id: 'lifestyle', label: '🏡 Lifestyle ' },
  { id: 'fashion', label: '👗 Fashion ' },
  { id: 'beauty', label: '💅 Beauty ' },
  { id: 'tech', label: '🖥️ Technology ' },
  { id: 'food', label: '🍔 Food & Beverage ' }
];

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
    description: 'Upload your media file and add details'
  }
];

const MediaTypeCard = ({ type, selected, onSelect }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => onSelect(type.id)}
    className={`p-6 rounded-xl border ${
      selected
        ? 'border-[#bcee45] bg-[#bcee45]/10'
        : 'border-[#333333] hover:border-[#bcee45]/50'
    } transition-all w-full`}
  >
    <div className="flex flex-col items-center gap-3">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
        selected ? 'bg-[#bcee45]/20' : 'bg-[#1A1A1A]'
      }`}>
        <p className='text-xl'>{type.icon}</p>
      </div>
      <span className={`font-medium ${selected ? 'text-white' : 'text-white/60'}`}>
        {type.label}
      </span>
    </div>
  </motion.button>
);

const OptionButton = ({ label, selected, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`px-4 py-2 rounded-xl border ${
      selected
        ? 'border-[#bcee45] bg-[#bcee45]/10 text-white'
        : 'border-[#333333] text-white/60 hover:border-[#bcee45]/50'
    } transition-all text-sm font-medium`}
  >
    {label}
  </motion.button>
);

const FileUploadArea = ({ mediaType, selectedFile, onFileSelect }) => {
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file) => {
    // Validate file size
    const maxSize = 
      mediaType === 'video' ? 100 : 
      mediaType === 'audio' ? 50 : 10; // MB
    
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`);
      return;
    }

    onFileSelect(file);
    
    // Create preview for images
    if (mediaType === 'image' && file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`relative aspect-video rounded-xl border-2 border-dashed 
        ${isDragging ? 'border-[#bcee45] bg-[#bcee45]/5' : 'border-[#bcee45]/20'} 
        overflow-hidden group transition-all`}
    >
      {selectedFile ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
          {mediaType === 'image' && preview && (
            <img src={preview} alt="Preview" className="max-h-48 object-contain mb-4" />
          )}
          <p className="text-white mb-2">{selectedFile.name}</p>
          <button
            onClick={() => {
              onFileSelect(null);
              setPreview(null);
            }}
            className="px-4 py-2 bg-red-500 rounded-lg text-white mt-2 hover:bg-red-600"
          >
            Remove File
          </button>
        </div>
      ) : (
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
          <p className="text-xs text-white/40 mt-1">
            Drop files here or click to upload
          </p>
        </button>
      )}
      <input
        id="portfolio-file"
        type="file"
        accept={
          mediaType === 'video' ? 'video/*' :
          mediaType === 'audio' ? 'audio/*' :
          'image/*'
        }
        onChange={(e) => handleFile(e.target.files[0])}
        className="hidden"
      />
    </div>
  );
};

const PortfolioPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    mediaType: null,
    contentType: null,
    category: null,
    file: null,
    title: '',
    description: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getMediaKitPortfolioItems();
        
        if (response?.statusCode === 200) {
          // Handle existing portfolio items if needed
        }
      } catch (err) {
        setError(err.message || "Failed to load portfolio data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleComplete = async () => {
    try {
      setIsSubmitting(true);
      
      const portfolioData = new FormData();
      portfolioData.append('media', formData.file);
      portfolioData.append('mediaType', formData.mediaType);
      portfolioData.append('contentType', formData.contentType);
      portfolioData.append('category', formData.category);
      portfolioData.append('title', formData.title || '');
      portfolioData.append('description', formData.description || '');

      const response = await addMediaKitPortfolioItem(portfolioData);
      
      if (response.statusCode === 201) {
        setShowCompletion(true);
      }
    } catch (error) {
      setError(error.message || "Failed to save portfolio item");
    } finally {
      setIsSubmitting(false);
    }
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
                    />))}
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
                    <div className="space-y-6">
                      <FileUploadArea
                        mediaType={formData.mediaType}
                        selectedFile={formData.file}
                        onFileSelect={(file) => setFormData(prev => ({ ...prev, file }))}
                      />
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-white mb-2">Title (Optional)</label>
                          <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full px-4 py-2 rounded-lg bg-[#1A1A1A] border border-[#333333] text-white"
                            placeholder="Give your content a title"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-white mb-2">Description (Optional)</label>
                          <textarea
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full px-4 py-2 rounded-lg bg-[#1A1A1A] border border-[#333333] text-white h-32 resize-none"
                            placeholder="Add a description for your content"
                          />
                        </div>
                      </div>
                    </div>
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
                disabled={currentSlide === 0 || isSubmitting}
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
                disabled={!isCurrentStepValid() || isSubmitting}
                className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 ${
                  isCurrentStepValid() && !isSubmitting
                    ? 'bg-[#bcee45] text-black hover:opacity-90'
                    : 'bg-[#333333] text-[#888888] cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
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
    
    export default PortfolioPage;