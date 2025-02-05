'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ProfileSection from '@/components/EditMediaKit/BasicInfo';
import CategoriesSection from '@/components/EditMediaKit/CreatorCategories';
import PortfolioSection from '@/components/EditMediaKit/Portfolio';
import SocialConnectSection from '@/components/EditMediaKit/SocialConnect';
import CollaborationsSection from '@/components/EditMediaKit/PreviousCollabs';
import PricingSection from '@/components/EditMediaKit/Pricing';
import PersonalInfoSection from '@/components/EditMediaKit/PersonalInfo';

// Reusable ToggleSwitch component
const ToggleSwitch = React.memo(({ isOn, onToggle, label, isExpanded }) => (
  <motion.button
    onClick={onToggle}
    className={`w-full p-4 rounded-xl border ${
      isExpanded ? 'border-[#bcee45]' : 'border-[#333333]'
    } bg-[#1A1A1A] transition-colors duration-200`}
    whileTap={{ scale: 0.98 }}
  >
    <div className="flex items-center justify-between">
      <span className="text-sm text-[#888888]">{label}</span>
      <motion.div
        className={`w-14 h-7 rounded-full flex items-center p-1 ${
          isOn ? 'bg-[#bcee45]' : 'bg-[#242424]'
        } border ${isOn ? 'border-[#bcee45]' : 'border-[#333333]'}`}
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
  </motion.button>
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
  
  // Initial state for media kit data
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
      description: 'Perfect for small businesses',
        price: '1000',
        deliverables: ['1 YouTube Video', '2 Instagram Posts']
      },
      {
        id: 2,
        name: 'Premium Package',
        description: 'Perfect for medium-sized businesses',
        price: '2500',
        deliverables: ['3 YouTube Videos', '5 Instagram Posts', '10 Stories']
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
  
  // State for section toggles
  const [sectionToggles, setSectionToggles] = useState({
    profile: true,
    social: false,
    content: false,
    collaborations: false,
    packages: false
  });

  // State for editing mode
  const [isEditing, setIsEditing] = useState({
    profile: true,
    social: false,
    content: false,
    collaborations: false,
    packages: false
  });

  // Handler for toggling sections
  const handleToggleSection = (section) => {
    setSectionToggles(prev => {
      const newToggles = { ...prev, [section]: !prev[section] };
      if (newToggles[section]) {
        setIsEditing(prev => ({ ...prev, [section]: true }));
        setTimeout(() => {
          document.getElementById(`${section}-section`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
      return newToggles;
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
            <ToggleSwitch
              isOn={sectionToggles.profile}
              onToggle={() => handleToggleSection('profile')}
              label="Basic Information"
              isExpanded={sectionToggles.profile}
            />
            <SectionContainer id="profile-section" isVisible={sectionToggles.profile}>
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
          <motion.div layout className="w-full">
         <ToggleSwitch
            isOn={sectionToggles.content}
            onToggle={() => handleToggleSection('content')}
            label="Creator Categories"
            isExpanded={sectionToggles.content}
            />
          <SectionContainer id="categories-section" isVisible={sectionToggles.content}>           
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

          <motion.div layout className="w-full">
  <ToggleSwitch
    isOn={sectionToggles.portfolio}
    onToggle={() => handleToggleSection('portfolio')}
    label="Portfolio Items"
    isExpanded={sectionToggles.portfolio}
  />
  <SectionContainer id="portfolio-section" isVisible={sectionToggles.portfolio}>
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
<motion.div layout className="w-full">
  <ToggleSwitch
    isOn={sectionToggles.social}
    onToggle={() => handleToggleSection('social')}
    label="Social Connections"
    isExpanded={sectionToggles.social}
  />
  <SectionContainer id="social-section" isVisible={sectionToggles.social}>
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
<motion.div layout className="w-full">
  <ToggleSwitch
    isOn={sectionToggles.collaborations}
    onToggle={() => handleToggleSection('collaborations')}
    label="Previous Collaborations"
    isExpanded={sectionToggles.collaborations}
  />
  <SectionContainer id="collaborations-section" isVisible={sectionToggles.collaborations}>
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

<motion.div layout className="w-full">
  <ToggleSwitch
    isOn={sectionToggles.packages}
    onToggle={() => handleToggleSection('packages')}
    label="Packages & Pricing"
    isExpanded={sectionToggles.packages}
  />
  <SectionContainer id="packages-section" isVisible={sectionToggles.packages}>
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
<motion.div layout className="w-full">
  <ToggleSwitch
    isOn={sectionToggles.personal}
    onToggle={() => handleToggleSection('personal')}
    label="Personal Information"
    isExpanded={sectionToggles.personal}
  />
  <SectionContainer id="personal-section" isVisible={sectionToggles.personal}>
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

          {/* Add other sections here */}
          {/* Social Connections Section */}
          {/* Content Categories Section */}
          {/* Previous Collaborations Section */}
          {/* Packages Section */}
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