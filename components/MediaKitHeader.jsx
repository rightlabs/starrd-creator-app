// EnhancedHeader.jsx
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Media Kit Steps Configuration
export const mediaKitSteps = [
  {
    id: 'intro',
    title: 'Basic Info',
    slides: ['Basic Information', 'Creator Categories', 'Profile Media', 'Bio Information','Representation'],
    totalSlides: 5,
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
    path: '/complete-media-kit/social-connects'
  },
  {
    id: 'collabs',
    title: 'Collaborations',
    slides: ['Past Brands', 'Case Studies'],
    totalSlides: 0,
    path: '/complete-media-kit/previous-collabs'
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


const StepIndicator = ({ step, index, currentStep, currentSlide, path }) => {
  const isActive = index + 1 === currentStep;
  const isCompleted = index + 1 < currentStep;
  const hasSlides = step.totalSlides > 0;

  const StepContent = () => (
    <>
      <span
        className={`w-6 h-6 rounded-full flex items-center justify-center border ${
          isActive
            ? 'border-[#bcee45] text-[#bcee45]'
            : isCompleted
            ? 'border-[#bcee45] bg-[#bcee45] text-black'
            : 'border-[#333333] text-[#666666]'
        }`}
      >
        {isCompleted ? (
          <CheckCircle2 className="w-4 h-4" />
        ) : (
          <span className="text-xs">{index + 1}</span>
        )}
      </span>
      <span className="text-sm whitespace-nowrap">{step.title}</span>
    </>
  );

  return (
    <div className="flex items-center">
      <div className="flex flex-col">
        {isCompleted ? (
          <Link href={path}>
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all cursor-pointer
                text-[#bcee45] border-[#333333] border`}
            >
              <StepContent />
            </div>
          </Link>
        ) : (
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isActive
                ? 'bg-[#bcee45]/10 border-[#bcee45] text-[#bcee45]'
                : 'text-[#666666] border-[#333333]'
            } border`}
          >
            <StepContent />
          </div>
        )}

        {/* Slide Progress Indicators */}
        {isActive && hasSlides && (
          <div className="flex justify-center gap-2 mt-2 px-4">
            {[...Array(step.totalSlides)].map((_, slideIndex) => (
              <motion.div
                key={slideIndex}
                className={`h-1.5 rounded-full transition-all ${
                  slideIndex === currentSlide
                    ? 'bg-[#bcee45] w-4'
                    : slideIndex < currentSlide
                    ? 'bg-[#bcee45]/60 w-1.5'
                    : 'bg-[#333333] w-1.5'
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
              />
            ))}
          </div>
        )}
      </div>

      {index < mediaKitSteps.length - 1 && (
        <ChevronRight
          className={`w-5 h-5 mx-2 ${
            isCompleted ? 'text-[#bcee45]' : 'text-[#333333]'
          }`}
        />
      )}
    </div>
  );
};

// Enhanced Header Component
export const EnhancedHeader = ({
  currentStep,
  currentSlide = 0,
  totalSteps,
  onBackClick,
}) => {
  const router = useRouter();
  const stepsContainerRef = useRef(null);
  const activeStepRef = useRef(null);
  const currentStepObj = mediaKitSteps[currentStep - 1];
  const previousStepObj = mediaKitSteps[currentStep - 2];

  const shouldShowSkip = () => {
    // Hide skip on first slide of step 1 (Basic Info)
    if (currentStep === 1 && (currentSlide === 0 || currentSlide === 1)) {
      return false;
    }
  
    // Show skip if the current step has multiple slides and we're not on the last slide
    // const currentStepObj = mediaKitSteps[currentStep - 1];
    // if (currentStepObj?.totalSlides > 0) {
    //   return currentSlide < currentStepObj.totalSlides - 1;
    // }
  
    // Show skip for other steps
    return true;
  };
  const handleSkip = () => {
    if (currentStepObj?.totalSlides > 0 && currentSlide < currentStepObj.totalSlides - 1) {
      // If we're in a multi-slide step and not on the last slide, go to next slide
      onBackClick(currentSlide + 1);
    } else {
      // If we're on the last slide or in a single-slide step, go to next step
      const nextStep = mediaKitSteps[currentStep];
      if (nextStep) {
        router.push(nextStep.path);
      }
    }
  };
  // Auto-scroll to center active step
  useEffect(() => {
    if (stepsContainerRef.current && activeStepRef.current) {
      const container = stepsContainerRef.current;
      const activeStep = activeStepRef.current;
      
      // Calculate positions
      const containerWidth = container.offsetWidth;
      const activeStepLeft = activeStep.offsetLeft;
      const activeStepWidth = activeStep.offsetWidth;
      
      // Calculate scroll position to center the active step
      const scrollPosition = activeStepLeft - (containerWidth / 2) + (activeStepWidth / 2);
      
      // Smooth scroll to position
      container.scrollTo({
        left: Math.max(0, scrollPosition), // Prevent negative scroll
        behavior: 'smooth'
      });
    }
  }, [currentStep]);

  const handleBackNavigation = () => {
    // Handle slide navigation within current step
    if (currentStepObj?.totalSlides > 0 && currentSlide > 0) {
      onBackClick(currentSlide - 1);
      return;
    }

    // Handle navigation to dashboard from first step
    if (currentStep === 1 && currentSlide === 0) {
      router.push('/dashboard');
      return;
    }

    // Handle navigation to previous step's last slide
    if (currentSlide === 0 && previousStepObj) {
      router.push(`${previousStepObj.path}?slide=${previousStepObj.totalSlides - 1}`);
    }
  };

  const handleBackDashboard=()=>{
    router.push('/dashboard');
  }

  return (
    <div className="sticky top-0 z-50">
      <div className="bg-black/40 backdrop-blur-lg border-b border-white/5">
        <div className="container mx-auto">
          {/* Header Content */}
          <div className="p-6 flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBackDashboard}
              className="w-10 h-10 bg-[#1A1A1A] border border-[#333333] rounded-xl flex items-center justify-center hover:border-[#bcee45]/50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#bcee45]" />
            </motion.button>
            
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white">Create Media Kit</h1>
              <p className="text-sm text-[#888888]">Step {currentStep} of {totalSteps}</p>
            </div>
            {shouldShowSkip() && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSkip}
                className="px-4 h-10 bg-[#1A1A1A] border border-[#333333] rounded-xl flex items-center justify-center hover:border-[#bcee45]/50 transition-colors"
              >
                <span className="text-sm font-medium text-[#bcee45]">Skip</span>
              </motion.button>
            )}
                  </div>

          {/* Steps Navigation */}
          <div 
            ref={stepsContainerRef}
            className="px-6 pb-4 flex items-center gap-2 overflow-x-auto hide-scrollbar scroll-smooth"
          >
            {mediaKitSteps.map((step, index) => (
              <div 
                key={step.id}
                ref={index + 1 === currentStep ? activeStepRef : null}
              >
                <StepIndicator
                  step={step}
                  index={index}
                  currentStep={currentStep}
                  currentSlide={currentSlide}
                  path={step.path}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-[#1A1A1A]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
          className="h-full bg-[#bcee45] " 
          transition={{ duration: 0.5 }}
        />
      </div>
      

      {/* Add styles for hiding scrollbar */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default EnhancedHeader;