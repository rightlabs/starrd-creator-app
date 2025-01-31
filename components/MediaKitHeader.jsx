import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const mediaKitSteps = [
  {
    id: 'intro',
    title: 'Basic Info',
    slides: ['Basic Information', 'Creator Categories', 'Profile Media', 'Bio Information'],
    totalSlides: 4,
    path: '/complete-media-kit/intro'
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    slides: ['Media Type', 'Content Type', 'Category', 'File Upload'],
    totalSlides: 4,
    path: '/complete-media-kit/portfolio'
  },
  {
    id: 'socials',
    title: 'Social Media',
    slides: ['Connect Accounts', 'Analytics'],
    totalSlides: 0,
    path: '/complete-media-kit/socials'
  },
  {
    id: 'collabs',
    title: 'Collaborations',
    slides: ['Past Brands', 'Case Studies'],
    totalSlides: 0,
    path: '/complete-media-kit/collabs'
  },
  {
    id: 'pricing',
    title: 'Pricing',
    slides: ['Package Setup', 'Customization'],
    totalSlides: 0,
    path: '/complete-media-kit/pricing'
  },
  {
    id: 'personal-info',
    title: 'Personal Info',
    slides: ['Hair Type', 'Height', 'Body Type', 'Languages', 'Pets'],
    totalSlides: 5,
    path: '/complete-media-kit/personal-info'
  }
];

export const EnhancedHeader = ({ 
  currentStep, 
  currentSlide, 
  totalSteps,
  onBackClick, // New prop for handling back navigation
}) => {
  const router = useRouter();
  const currentStepObj = mediaKitSteps[currentStep - 1];
  const previousStepObj = mediaKitSteps[currentStep - 2];

  const handleBackNavigation = () => {
    // If we have slides and not on first slide, go to previous slide
    if (currentStepObj.totalSlides > 0 && currentSlide > 0) {
      onBackClick(currentSlide - 1);
      return;
    }

    // If we're on first slide/step, go to dashboard
    if (currentStep === 1 && currentSlide === 0) {
      router.push('/dashboard');
      return;
    }

    // If we're on first slide of any other step, go to last slide of previous step
    if (currentSlide === 0 && previousStepObj) {
      router.push(previousStepObj.path + `?slide=${previousStepObj.totalSlides - 1}`);
      return;
    }
  };

  return (
    <div className="sticky top-0 z-50">
      {/* Main Header */}
      <div className="bg-black/40 backdrop-blur-lg border-b border-white/5">
        <div className="container mx-auto">
          <div className="p-6 flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBackNavigation}
              className="w-10 h-10 bg-[#1A1A1A] border border-[#333333] rounded-xl flex items-center justify-center hover:border-[#bcee45]/50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#bcee45]" />
            </motion.button>
            
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white">Create Media Kit</h1>
              <p className="text-sm text-[#888888]">Step {currentStep} of {totalSteps}</p>
            </div>
          </div>

          {/* Steps Navigation with Integrated Indicators */}
          <div className="px-6 pb-4 flex items-center gap-2 overflow-x-auto hide-scrollbar">
            {mediaKitSteps.map((step, index) => {
              const isActive = index + 1 === currentStep;
              const isCompleted = index + 1 < currentStep;
              const hasSlides = step.totalSlides > 0;

              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col">
                    <div
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        isActive 
                          ? 'bg-[#bcee45]/10 border-[#bcee45] text-[#bcee45]' 
                          : isCompleted
                          ? 'text-[#bcee45] border-[#333333]'
                          : 'text-[#666666] border-[#333333]'
                      } border`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                        isActive 
                          ? 'border-[#bcee45] text-[#bcee45]' 
                          : isCompleted
                          ? 'border-[#bcee45] bg-[#bcee45] text-black'
                          : 'border-[#333333] text-[#666666]'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <span className="text-xs">{index + 1}</span>
                        )}
                      </span>
                      <span className="text-sm whitespace-nowrap">{step.title}</span>
                    </div>

                    {/* Slide Indicators */}
                    {isActive && hasSlides && (
                      <div className="flex justify-center gap-2 mt-2 px-4">
                        {[...Array(step.totalSlides)].map((_, slideIndex) => (
                          <motion.div
                            key={slideIndex}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                              slideIndex === currentSlide 
                                ? 'bg-[#bcee45] w-4' 
                                : slideIndex < currentSlide
                                ? 'bg-[#bcee45]/60'
                                : 'bg-[#333333]'
                            }`}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {index < mediaKitSteps.length - 1 && (
                    <ChevronRight className={`w-5 h-5 mx-2 ${
                      isCompleted ? 'text-[#bcee45]' : 'text-[#333333]'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-[#1A1A1A]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
          className="h-full bg-[#bcee45]"
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};

export default EnhancedHeader;