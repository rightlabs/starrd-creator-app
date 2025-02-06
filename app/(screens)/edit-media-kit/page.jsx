'use client';

import { toast } from 'sonner';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ProfileSection from '@/components/EditMediaKit/BasicInfo';
import CategoriesSection from '@/components/EditMediaKit/CreatorCategories';
import PortfolioSection from '@/components/EditMediaKit/Portfolio';
import SocialConnectSection from '@/components/EditMediaKit/SocialConnect';
import CollaborationsSection from '@/components/EditMediaKit/PreviousCollabs';
import PricingSection from '@/components/EditMediaKit/Pricing';
import PersonalInfoSection from '@/components/EditMediaKit/PersonalInfo';

// Reusable ToggleSwitch component
const ToggleSwitch = React.memo(({ isOn, onToggle }) => (
  <div className="flex items-center gap-2">
    <motion.div
      className={`w-14 h-7 rounded-full flex items-center p-1 cursor-pointer ${
        isOn ? 'bg-[#bcee45]' : 'bg-[#242424]'
      } border ${isOn ? 'border-[#bcee45]' : 'border-[#333333]'}`}
      onClick={onToggle}
    >
      <motion.div
        className="w-5 h-5 rounded-full bg-black"
        animate={{ 
          x: isOn ? 28 : 0,
          backgroundColor: isOn ? '#000000' : '#666666' 
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
    </motion.div>
  </div>
));

// Reusable SectionHeader component
const SectionHeader = React.memo(({ label, isVisible, isExpanded, onToggleVisibility, onToggleExpand }) => (
  <div className={`w-full p-4 rounded-xl border ${
    isExpanded ? 'border-[#bcee45]' : 'border-[#333333]'
  } bg-[#1A1A1A] transition-colors duration-200`}>
    <div className="flex items-center justify-between">
      <span className="text-base font-medium text-white">{label}</span>
      <div className="flex items-center gap-4">
      <motion.button
          onClick={onToggleExpand}
          whileTap={{ scale: 0.95 }}
          className={`p-2 rounded-lg border ${
            isExpanded ? 'border-[#bcee45] bg-[#bcee45]/10' : 'border-[#333333] bg-[#242424]'
          }`}
        >
          <Pencil className={`w-4 h-4 ${isExpanded ? 'text-[#bcee45]' : 'text-[#888888]'}`} />
        </motion.button>
        <ToggleSwitch
          isOn={isVisible}
          onToggle={onToggleVisibility}
        />
     
      </div>
    </div>
  </div>
));

// Reusable SectionContainer component
const SectionContainer = ({ id, children, isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        id={id}
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: 'auto',
          opacity: 1,
          transition: {
            height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
            opacity: { duration: 0.2, delay: 0.1 }
          }
        }}
        exit={{ 
          height: 0,
          opacity: 0,
          transition: {
            height: { duration: 0.2 },
            opacity: { duration: 0.1 }
          }
        }}
        className="overflow-hidden mt-4"
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

const ManageMediaKit = () => {
  const router = useRouter();
  
  const [mediaKitData, setMediaKitData] = useState({
    profileInfo: {
      name: 'John Creator',
      dob: '2001-01-15',
      location: 'New York, USA',
      email: 'john@creator.com',
      phone: '+1 234 567 8900',
      website: 'creator.com/john',
      bio: 'Digital creator passionate about tech and lifestyle content',
      avatar: '/pixar-1.jpg',
      coverImage: '/pixar-1.jpg',
      tagline:'Digital creator passionate about tech and lifestyle content',
    },
    socialConnections: {
      youtube: {
        connected: true,
        handle: '@JohnCreates',
        subscribers: '100K',
        avgViews: '50K'
      },
      instagram: {
        connected: true,
        handle: '@john.creates',
        followers: '50K',
        engagement: '5.2%'
      }
    },
    categories: ['Tech', 'Lifestyle', 'Photography'],
    portfolio: [
      {
        id: 1,
        mediaType: 'video',
        contentType: 'product-review',
        category: 'tech',
        fileUrl: '/pixar-2.jpg',
      },],
      collaborations: [
        {
          id: 1,
          brandName: 'Example Brand',
          brandLogo: '/starrd-logo.png',
          type: 'sponsored',
          category: 'tech',
          mediaFile: '/pixar-2.jpg'
        },],
    packages: [
      {
        id: 1,
        name: 'Basic Package',
        price: '1,000 - 1,500',
        deliverables: [
          'Story',
          'Reel',
          'Carousel Post'
        ],
        openToBarter: true
      },
      {
        id: 2,
        name: 'Premium Package',
        price: '2,500 - 3,000',
        deliverables: [
          'Story',
          'Reel',
          'Carousel Post',
          'Shoot (8 hours)'
        ],
        openToBarter: false
      }
    ],
    personalInfo: {
      hairType: 'straight',
      heightFt: '5',
      heightIn: '10',
      bodyType: 'mesomorph',
      languages: ['English', 'Spanish'],
      petType: 'dog'
    }
  });
  // State for form editing
  const [editForm, setEditForm] = useState({ ...mediaKitData });
  
  // State for section visibility in preview
  const [sectionToggles, setSectionToggles] = useState({
    profile: true,
    social: true,
    content: true,
    collaborations: false,
    packages: false,
    personal: false
  });

  // New state for section expansion (edit mode)
  const [expandedSections, setExpandedSections] = useState({
    profile: false,
    social: false,
    content: false,
    collaborations: false,
    packages: false,
    personal: false
  });

  // State for editing mode
  const [isEditing, setIsEditing] = useState({
    profile: false,
    social: false,
    content: false,
    collaborations: false,
    packages: false,
    personal: false
  });

// At the top of your file, import toast from sonner

// Modify the handleToggleVisibility function
const handleToggleVisibility = (section) => {
  setSectionToggles(prev => {
    const newValue = !prev[section];
    
    // Format section name for display
    const sectionName = section.charAt(0).toUpperCase() + section.slice(1);
    
    // Show toast with Sonner
    toast(newValue ? 'Section Visible' : 'Section Hidden', {
      description: `${sectionName} section ${newValue ? 'will be visible' : 'will be hidden'} in media kit preview`,
      duration: 2000,
      style: { 
        backgroundColor: '#000000',
        color: '#bcee45',
        borderRadius:"16px"
        
      },
      success: true,
    });
    
    return {
      ...prev,
      [section]: newValue
    };
  });
};

  // Handler for toggling section expansion
  const handleToggleExpand = (section) => {
    setExpandedSections(prev => {
      const newExpanded = { ...prev, [section]: !prev[section] };
      if (newExpanded[section]) {
        setIsEditing(prev => ({ ...prev, [section]: true }));
        setTimeout(() => {
          document.getElementById(`${section}-section`)?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }, 100);
      }
      return newExpanded;
    });
  };

  // Handler for toggling edit mode
  const handleEditToggle = (section) => {
    setIsEditing(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
    setEditForm({ ...mediaKitData });
  };

  // Handler for saving section changes
  const handleSaveSection = (section) => {
    setMediaKitData(prev => ({
      ...prev,
      [section]: editForm[section]
    }));
    handleEditToggle(section);
    setExpandedSections(prev => ({
      ...prev,
      [section]: false
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F] text-white">
      {/* Header */}
      <motion.div
        initial={false}
        animate={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(12px)'
        }}
        className="p-6 border-b border-white/5 sticky top-0 z-50"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.back()}
              className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#333333] flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
            <h1 className="text-xl font-bold">Manage Media Kit</h1>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto p-6 space-y-4 pb-24">
        <motion.div layout className="space-y-4">
          {/* Profile Section */}
          <motion.div layout className="w-full">
            <SectionHeader
              label="Basic Information"
              isVisible={sectionToggles.profile}
              isExpanded={expandedSections.profile}
              onToggleVisibility={() => handleToggleVisibility('profile')}
              onToggleExpand={() => handleToggleExpand('profile')}
            />
            <SectionContainer id="profile-section" isVisible={expandedSections.profile}>
              <ProfileSection
                profileInfo={mediaKitData.profileInfo}
                editForm={editForm}
                isEditing={isEditing.profile}
                setEditForm={setEditForm}
                handleEditToggle={handleEditToggle}
                handleSaveSection={handleSaveSection}
              />
            </SectionContainer>
          </motion.div>

          {/* Categories Section */}
          <motion.div layout className="w-full">
            <SectionHeader
              label="Creator Categories"
              isVisible={sectionToggles.content}
              isExpanded={expandedSections.content}
              onToggleVisibility={() => handleToggleVisibility('content')}
              onToggleExpand={() => handleToggleExpand('content')}
            />
            <SectionContainer id="categories-section" isVisible={expandedSections.content}>
              <CategoriesSection
                categories={mediaKitData.categories}
                editForm={editForm}
                isEditing={isEditing.content}
                setEditForm={setEditForm}
                handleEditToggle={handleEditToggle}
                handleSaveSection={handleSaveSection}
              />
            </SectionContainer>
          </motion.div>

          {/* Portfolio Section */}
          <motion.div layout className="w-full">
            <SectionHeader
              label="Portfolio Items"
              isVisible={sectionToggles.portfolio}
              isExpanded={expandedSections.portfolio}
              onToggleVisibility={() => handleToggleVisibility('portfolio')}
              onToggleExpand={() => handleToggleExpand('portfolio')}
            />
            <SectionContainer id="portfolio-section" isVisible={expandedSections.portfolio}>
              <PortfolioSection
                portfolio={mediaKitData.portfolio}
                editForm={editForm}
                isEditing={isEditing.portfolio}
                setEditForm={setEditForm}
                handleEditToggle={handleEditToggle}
                handleSaveSection={handleSaveSection}
              />
            </SectionContainer>
          </motion.div>

          {/* Social Connections Section */}
          <motion.div layout className="w-full">
            <SectionHeader
              label="Social Connections"
              isVisible={sectionToggles.social}
              isExpanded={expandedSections.social}
              onToggleVisibility={() => handleToggleVisibility('social')}
              onToggleExpand={() => handleToggleExpand('social')}
            />
            <SectionContainer id="social-section" isVisible={expandedSections.social}>
              <SocialConnectSection
                socialConnections={mediaKitData.socialConnections}
                editForm={editForm}
                isEditing={isEditing.social}
                setEditForm={setEditForm}
                handleEditToggle={handleEditToggle}
                handleSaveSection={handleSaveSection}
              />
            </SectionContainer>
          </motion.div>

          {/* Collaborations Section */}
          <motion.div layout className="w-full">
            <SectionHeader
              label="Previous Collaborations"
              isVisible={sectionToggles.collaborations}
              isExpanded={expandedSections.collaborations}
              onToggleVisibility={() => handleToggleVisibility('collaborations')}
              onToggleExpand={() => handleToggleExpand('collaborations')}
            />
            <SectionContainer id="collaborations-section" isVisible={expandedSections.collaborations}>
              <CollaborationsSection
                collaborations={mediaKitData.collaborations}
                editForm={editForm}
                isEditing={isEditing.collaborations}
                setEditForm={setEditForm}
                handleEditToggle={handleEditToggle}
                handleSaveSection={handleSaveSection}
              />
            </SectionContainer>
          </motion.div>

          {/* Packages Section */}
          <motion.div layout className="w-full">
            <SectionHeader
              label="Packages & Pricing"
              isVisible={sectionToggles.packages}
              isExpanded={expandedSections.packages}
              onToggleVisibility={() => handleToggleVisibility('packages')}
              onToggleExpand={() => handleToggleExpand('packages')}
            />
            <SectionContainer id="packages-section" isVisible={expandedSections.packages}>
              <PricingSection
                packages={mediaKitData.packages}
                editForm={editForm}
                isEditing={isEditing.packages}
                setEditForm={setEditForm}
                handleEditToggle={handleEditToggle}
                handleSaveSection={handleSaveSection}
              />
            </SectionContainer>
          </motion.div>

          {/* Personal Info Section */}
          <motion.div layout className="w-full">
            <SectionHeader
              label="Personal Information"
              isVisible={sectionToggles.personal}
              isExpanded={expandedSections.personal}
              onToggleVisibility={() => handleToggleVisibility('personal')}
              onToggleExpand={() => handleToggleExpand('personal')}
            />
            <SectionContainer id="personal-section" isVisible={expandedSections.personal}>
              <PersonalInfoSection
                personalInfo={mediaKitData.personalInfo}
                editForm={editForm}
                isEditing={isEditing.personal}
                setEditForm={setEditForm}
                handleEditToggle={handleEditToggle}
                handleSaveSection={handleSaveSection}
              />
            </SectionContainer>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer Actions */}
      <motion.div
        layout
        className="fixed bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black to-transparent"
      >
        <div className="flex gap-3 max-w-md mx-auto">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-3 px-6 bg-black border border-[#333333] text-white rounded-xl font-medium hover:border-[#bcee45]/50"
          >
            Save Draft
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-3 px-6 bg-[#bcee45] text-black rounded-xl font-medium hover:opacity-90"
          >
            Publish
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ManageMediaKit;