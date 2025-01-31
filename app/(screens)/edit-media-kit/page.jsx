'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Camera, Edit3, Plus, X, CheckCircle,
  Youtube, Instagram, Twitter, ImageIcon, MapPin,
  Mail, Phone, Globe
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

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

const InputField = ({ label, icon: Icon, value, onChange, type = "text", placeholder, disabled }) => (
  <div className="relative">
    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
      <Icon className={`w-4 h-4 ${disabled ? "text-gray-500" : "text-[#888888]"}`} />
    </div>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled} 
      className={`w-full pl-10 pr-3 py-2.5 rounded-lg border text-white placeholder:text-[#888888] focus:border-[#bcee45] transition-colors
        ${disabled ? "bg-[#494747] border-gray-600 text-gray-400 cursor-not-allowed" : "bg-[#242424] border-[#333333]"}`}
    />
  </div>
);


const EditableCard = ({ heading, isEditing, onToggleEdit, children }) => (
  <Card className="p-6 bg-[#1A1A1A] border-[#333333]">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-semibold">{heading}</h3>
      {/* <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggleEdit}
        className="p-2 rounded-lg bg-[#242424] hover:bg-[#333333]"
      >
        <Edit3 className="w-5 h-5" />
      </motion.button> */}
    </div>
    {children}
  </Card>
);

const ManageMediaKit = () => {
  const router = useRouter();
  const [mediaKitData, setMediaKitData] = useState({
    profileInfo: {
      name: 'John Creator',
      username: '@johncreator',
      location: 'New York, USA',
      email: 'john@creator.com',
      phone: '+1 234 567 8900',
      website: 'creator.com/john',
      bio: 'Digital creator passionate about tech and lifestyle content',
      avatar: '/placeholder-avatar.jpg'
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
    contentCategories: ['Tech', 'Lifestyle', 'Photography'],
    previousCollaborations: [
      {
        brand: 'TechGear',
        type: 'Sponsored Video',
        date: '2024-01',
        image: '/brand1.jpg'
      },
      {
        brand: 'LifeStyle Co',
        type: 'Instagram Campaign',
        date: '2023-12',
        image: '/brand2.jpg'
      }
    ],
    packages: [
      {
        name: 'Basic Package',
        price: '1000',
        deliverables: ['1 YouTube Video', '2 Instagram Posts']
      },
      {
        name: 'Premium Package',
        price: '2500',
        deliverables: ['3 YouTube Videos', '5 Instagram Posts', '10 Stories']
      }
    ]
  });

  const [editForm, setEditForm] = useState({ ...mediaKitData });
  const [sectionToggles, setSectionToggles] = useState({
    profile: true,
    social: false,
    content: false,
    collaborations: false,
    packages: false
  });
  const [isEditing, setIsEditing] = useState({
    profile: true,
    social: false,
    content: false,
    collaborations: false,
    packages: false
  });

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

  const handleEditToggle = (section) => {
    setIsEditing(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
    setEditForm({ ...mediaKitData });
  };

  const handleSaveSection = (section) => {
    setMediaKitData(prev => ({
      ...prev,
      [section]: editForm[section]
    }));
    handleEditToggle(section);
  };

  const ProfileSection = () => (
    <EditableCard
      heading="Profile Information"
      isEditing={isEditing.profile}
      onToggleEdit={() => handleEditToggle('profile')}
    >
      {isEditing.profile ? (
        <motion.div className="space-y-6">
          <div className="flex items-start gap-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-24 h-24 rounded-xl bg-[#242424] flex items-center justify-center cursor-pointer"
            >
              <Camera className="w-8 h-8 text-[#666666]" />
            </motion.div>
            <div className="flex-1 space-y-4">
              <input
                type="text"
                value={editForm.profileInfo.name}
                onChange={(e) => setEditForm({
                  ...editForm,
                  profileInfo: { ...editForm.profileInfo, name: e.target.value }
                })}
                className="w-full p-3 rounded-lg bg-[#242424] border border-[#333333]"
                placeholder="Name"
              />
              <input
                type="text"
                value={editForm.profileInfo.username}
                onChange={(e) => setEditForm({
                  ...editForm,
                  profileInfo: { ...editForm.profileInfo, username: e.target.value }
                })}
                className="w-full p-3 rounded-lg bg-[#242424] border border-[#333333]"
                placeholder="Username"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Location"
              icon={MapPin}
              value={editForm.profileInfo.location}
              onChange={(e) => setEditForm({
                ...editForm,
                profileInfo: { ...editForm.profileInfo, location: e.target.value }
              })}
              placeholder="Location"
            />
            <InputField
              label="Email"
              icon={Mail}
              type="email"
              value={editForm.profileInfo.email}
              onChange={(e) => setEditForm({
                ...editForm,
                profileInfo: { ...editForm.profileInfo, email: e.target.value }
              })}
              placeholder="Email"
              disabled
            />
            <InputField
              label="Phone"
              icon={Phone}
              type="tel"
              value={editForm.profileInfo.phone}
              onChange={(e) => setEditForm({
                ...editForm,
                profileInfo: { ...editForm.profileInfo, phone: e.target.value }
              })}
              placeholder="Phone"
              disabled
            />
            <InputField
              label="Website"
              icon={Globe}
              type="url"
              value={editForm.profileInfo.website}
              onChange={(e) => setEditForm({
                ...editForm,
                profileInfo: { ...editForm.profileInfo, website: e.target.value }
              })}
              placeholder="Website"
            />
          </div>

          <textarea
            value={editForm.profileInfo.bio}
            onChange={(e) => setEditForm({
              ...editForm,
              profileInfo: { ...editForm.profileInfo, bio: e.target.value }
            })}
            className="w-full p-3 rounded-lg bg-[#242424] border border-[#333333] h-32 resize-none"
            placeholder="Bio"
          />

          <div className="flex justify-end gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleEditToggle('profile')}
              className="px-4 py-2 rounded-lg bg-[#242424] hover:bg-[#333333]"
            >
              Cancel
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSaveSection('profileInfo')}
              className="px-4 py-2 rounded-lg bg-[#bcee45] text-black hover:opacity-90"
            >
              Save Changes
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl bg-[#242424] flex items-center justify-center">
              <Camera className="w-8 h-8 text-[#666666]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">{mediaKitData.profileInfo.name}</h3>
              <p className="text-sm text-[#888888]">{mediaKitData.profileInfo.username}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-lg bg-[#242424] flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[#888888]">Location</p>
                <p className="font-medium">{mediaKitData.profileInfo.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-lg bg-[#242424] flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[#888888]">Email</p>
                <p className="font-medium">{mediaKitData.profileInfo.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-lg bg-[#242424] flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[#888888]">Phone</p>
                <p className="font-medium">{mediaKitData.profileInfo.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-lg bg-[#242424] flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[#888888]">Website</p>
                <p className="font-medium">{mediaKitData.profileInfo.website}</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-[#888888] mt-4">{mediaKitData.profileInfo.bio}</p>
        </div>
      )}
    </EditableCard>
  );


  const SocialSection = () => (
    <Card className="p-6 bg-[#1A1A1A] border-[#333333]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Social Connections</h3>
 
      </div>

      <div className="space-y-4">
        {Object.entries(mediaKitData.socialConnections).map(([platform, data]) => (
          <motion.div
            key={platform}
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-xl bg-[#242424] border border-[#333333]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {platform === 'youtube' && <Youtube className="w-5 h-5 text-[#bcee45]" />}
                {platform === 'instagram' && <Instagram className="w-5 h-5 text-[#bcee45]" />}
                <span className="capitalize">{platform}</span>
              </div>
              {data.connected ? (
                <CheckCircle className="w-5 h-5 text-[#bcee45]" />
              ) : (
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm text-[#bcee45]"
                >
                  Connect
                </motion.button>
              )}
            </div>
            {data.connected && (
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <p className="text-sm text-[#888888]">Handle</p>
                  <p className="font-medium">{data.handle}</p>
                </div>
                {platform === 'youtube' && (
                  <>
                    <div>
                      <p className="text-sm text-[#888888]">Subscribers</p>
                      <p className="font-medium">{data.subscribers}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#888888]">Avg. Views</p>
                      <p className="font-medium">{data.avgViews}</p>
                    </div>
                  </>
                )}
                {platform === 'instagram' && (
                  <>
                    <div>
                      <p className="text-sm text-[#888888]">Followers</p>
                      <p className="font-medium">{data.followers}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#888888]">Engagement</p>
                      <p className="font-medium">{data.engagement}</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </Card>
  );

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

      <div className="container mx-auto p-6 space-y-4 pb-24">
        <motion.div layout className="space-y-4">
          {/* Profile Section */}
          <motion.div layout className="w-full">
            <ToggleSwitch
              isOn={sectionToggles.profile}
              onToggle={() => handleToggleSection('profile')}
              label="Profile Information"
              isExpanded={sectionToggles.profile}
            />
            <SectionContainer id="profile-section" isVisible={sectionToggles.profile}>
              <ProfileSection />
            </SectionContainer>
          </motion.div>

          {/* Social Section */}
          <motion.div layout className="w-full">
            <ToggleSwitch
              isOn={sectionToggles.social}
              onToggle={() => handleToggleSection('social')}
              label="Social Connections"
              isExpanded={sectionToggles.social}
            />
            <SectionContainer id="social-section" isVisible={sectionToggles.social}>
              <SocialSection />
            </SectionContainer>
          </motion.div>

          {/* Content Categories Section */}
          <motion.div layout className="w-full">
            <ToggleSwitch
              isOn={sectionToggles.content}
              onToggle={() => handleToggleSection('content')}
              label="Content Categories"
              isExpanded={sectionToggles.content}
            />
            <SectionContainer id="content-section" isVisible={sectionToggles.content}>
              <EditableCard
                heading="Content Categories"
                isEditing={isEditing.content}
                onToggleEdit={() => handleEditToggle('content')}
              >
                {isEditing.content ? (
                  <motion.div className="space-y-4">
                    <div className="grid grid-cols-2 flex-wrap gap-2">
                      {editForm.contentCategories.map((category, index) => (
                        <motion.div
                          key={index}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="px-3 py-1.5 rounded-lg bg-[#242424] border border-[#333333] flex items-center gap-2"
                        >
                          <input
                            type="text"
                            value={category}
                            onChange={(e) => {
                              const newCategories = [...editForm.contentCategories];
                              newCategories[index] = e.target.value;
                              setEditForm({ ...editForm, contentCategories: newCategories });
                            }}
                            className="bg-transparent border-none outline-none focus:ring-0 w-24"
                          />
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              const newCategories = editForm.contentCategories.filter((_, i) => i !== index);
                              setEditForm({ ...editForm, contentCategories: newCategories });
                            }}
                            className="text-[#888888] hover:text-white"
                          >
                            <X className="w-4 h-4" />
                          </motion.button>
                        </motion.div>
                      ))}
                
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEditToggle('content')}
                        className="px-4 py-2 rounded-lg bg-[#242424] hover:bg-[#333333]"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSaveSection('contentCategories')}
                        className="px-4 py-2 rounded-lg bg-[#bcee45] text-black hover:opacity-90"
                      >
                        Save Changes
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {mediaKitData.contentCategories.map((category, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1.5 rounded-lg bg-[#242424] border border-[#333333]"
                      >
                        {category}
                      </motion.div>
                    ))}
                  </div>
                )}
              </EditableCard>
            </SectionContainer>
          </motion.div>

          {/* Previous Collaborations Section */}
          <motion.div layout className="w-full">
            <ToggleSwitch
              isOn={sectionToggles.collaborations}
              onToggle={() => handleToggleSection('collaborations')}
              label="Previous Collaborations"
              isExpanded={sectionToggles.collaborations}
            />
            <SectionContainer id="collaborations-section" isVisible={sectionToggles.collaborations}>
              <EditableCard
                heading="Previous Collaborations"
                isEditing={isEditing.collaborations}
                onToggleEdit={() => handleEditToggle('collaborations')}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(isEditing.collaborations ? editForm : mediaKitData).previousCollaborations.map((collab, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 rounded-xl bg-[#242424] border border-[#333333] relative"
                    >
                      {isEditing.collaborations && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            const newCollabs = editForm.previousCollaborations.filter((_, i) => i !== index);
                            setEditForm({ ...editForm, previousCollaborations: newCollabs });
                          }}
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#333333] flex items-center justify-center"
                        >
                          <X className="w-4 h-4" />
                        </motion.button>
                      )}
                      
                      <div className="w-full h-40 rounded-lg bg-[#1A1A1A] mb-4 flex items-center justify-center relative overflow-hidden group">
                        {isEditing.collaborations ? (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="w-8 h-8 text-white" />
                          </div>
                        ) : (
                          <ImageIcon className="w-8 h-8 text-[#666666]" />
                        )}
                      </div>
                      
                      {isEditing.collaborations ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={collab.brand}
                            onChange={(e) => {
                              const newCollabs = [...editForm.previousCollaborations];
                              newCollabs[index] = { ...collab, brand: e.target.value };
                              setEditForm({ ...editForm, previousCollaborations: newCollabs });
                            }}
                            className="w-full p-2 rounded-lg bg-[#1A1A1A] border border-[#333333]"
                            placeholder="Brand Name"
                          />
                          <input
                            type="text"
                            value={collab.type}
                            onChange={(e) => {
                              const newCollabs = [...editForm.previousCollaborations];
                              newCollabs[index] = { ...collab, type: e.target.value };
                              setEditForm({ ...editForm, previousCollaborations: newCollabs });
                            }}
                            className="w-full p-2 rounded-lg bg-[#1A1A1A] border border-[#333333]"
                            placeholder="Collaboration Type"
                          />
                          <input
                            type="text"
                            value={collab.date}
                            onChange={(e) => {
                              const newCollabs = [...editForm.previousCollaborations];
                              newCollabs[index] = { ...collab, date: e.target.value };
                              setEditForm({ ...editForm, previousCollaborations: newCollabs });
                            }}
                            className="w-full p-2 rounded-lg bg-[#1A1A1A] border border-[#333333]"
                            placeholder="Date (YYYY-MM)"
                          />
                        </div>
                      ) : (
                        <>
                          <h4 className="font-medium mb-1">{collab.brand}</h4>
                          <p className="text-sm text-[#888888]">{collab.type}</p>
                          <p className="text-sm text-[#888888]">{collab.date}</p>
                        </>
                      )}
                    </motion.div>
                  ))}
                  
                  {isEditing.collaborations && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        setEditForm({
                          ...editForm,
                          previousCollaborations: [
                            ...editForm.previousCollaborations,
                            {
                              brand: 'New Brand',
                              type: 'Collaboration Type',
                              date: '2024-01',
                              image: ''
                            }
                          ]
                        });
                      }}
                      className="p-4 rounded-xl border border-dashed border-[#333333] flex flex-col items-center justify-center gap-2 hover:border-[#bcee45] hover:text-[#bcee45]"
                    >
                      <Plus className="w-6 h-6" />
                      <span>Add Collaboration</span>
                    </motion.button>
                  )}
                </div>
                
                {isEditing.collaborations && (
                  <div className="flex justify-end gap-2 mt-4">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEditToggle('collaborations')}
                      className="px-4 py-2 rounded-lg bg-[#242424] hover:bg-[#333333]"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSaveSection('previousCollaborations')}
                      className="px-4 py-2 rounded-lg bg-[#bcee45] text-black hover:opacity-90"
                    >
                      Save Changes
                    </motion.button>
                  </div>
                )}
              </EditableCard>
            </SectionContainer>
          </motion.div>

          {/* Packages Section */}
       {/* Packages Section */}
<motion.div layout className="w-full">
 <ToggleSwitch
   isOn={sectionToggles.packages}
   onToggle={() => handleToggleSection('packages')}
   label="Packages & Pricing"
   isExpanded={sectionToggles.packages}
 />
 <SectionContainer id="packages-section" isVisible={sectionToggles.packages}>
   <EditableCard
     heading="Packages & Pricing"
     isEditing={isEditing.packages}
     onToggleEdit={() => handleEditToggle('packages')}
   >
     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       {(isEditing.packages ? editForm : mediaKitData).packages.map((pkg, index) => (
         <motion.div
           key={index}
           whileHover={{ scale: 1.02 }}
           className="p-4 rounded-xl bg-[#242424] border border-[#333333] relative"
         >
           {isEditing.packages && (
             <motion.button
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.9 }}
               onClick={() => {
                 const newPackages = editForm.packages.filter((_, i) => i !== index);
                 setEditForm({ ...editForm, packages: newPackages });
               }}
               className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#333333] flex items-center justify-center"
             >
               <X className="w-4 h-4" />
             </motion.button>
           )}
           
           {isEditing.packages ? (
             <div className="space-y-3">
               <input
                 type="text"
                 value={pkg.name}
                 onChange={(e) => {
                   const newPackages = [...editForm.packages];
                   newPackages[index] = { ...pkg, name: e.target.value };
                   setEditForm({ ...editForm, packages: newPackages });
                 }}
                 className="w-full p-2 rounded-lg bg-[#1A1A1A] border border-[#333333]"
                 placeholder="Package Name"
               />
               <div className="relative">
                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]">$</span>
                 <input
                   type="text"
                   value={pkg.price}
                   onChange={(e) => {
                     const newPackages = [...editForm.packages];
                     newPackages[index] = { ...pkg, price: e.target.value };
                     setEditForm({ ...editForm, packages: newPackages });
                   }}
                   className="w-full p-2 pl-8 rounded-lg bg-[#1A1A1A] border border-[#333333]"
                   placeholder="Price"
                 />
               </div>
               <div className="space-y-2">
                 {pkg.deliverables.map((item, i) => (
                   <div key={i} className="flex items-center gap-2">
                     <input
                       type="text"
                       value={item}
                       onChange={(e) => {
                         const newPackages = [...editForm.packages];
                         newPackages[index].deliverables[i] = e.target.value;
                         setEditForm({ ...editForm, packages: newPackages });
                       }}
                       className="w-full p-2 rounded-lg bg-[#1A1A1A] border border-[#333333]"
                       placeholder="Deliverable"
                     />
                     <motion.button
                       whileHover={{ scale: 1.1 }}
                       whileTap={{ scale: 0.9 }}
                       onClick={() => {
                         const newPackages = [...editForm.packages];
                         newPackages[index].deliverables = pkg.deliverables.filter((_, j) => j !== i);
                         setEditForm({ ...editForm, packages: newPackages });
                       }}
                       className="w-8 h-8 rounded-lg bg-[#333333] flex items-center justify-center"
                     >
                       <X className="w-4 h-4" />
                     </motion.button>
                   </div>
                 ))}
                 <motion.button
                   whileHover={{ scale: 1.1 }}
                   whileTap={{ scale: 0.9 }}
                   onClick={() => {
                     const newPackages = [...editForm.packages];
                     newPackages[index].deliverables = [...pkg.deliverables, ''];
                     setEditForm({ ...editForm, packages: newPackages });
                   }}
                   className="w-full p-2 rounded-lg border border-dashed border-[#333333] text-[#888888] hover:border-[#bcee45] hover:text-[#bcee45] flex items-center justify-center gap-2"
                 >
                   <Plus className="w-4 h-4" />
                   Add Deliverable
                 </motion.button>
               </div>
             </div>
           ) : (
             <div>
               <h4 className="font-medium mb-2">{pkg.name}</h4>
               <p className="text-2xl font-bold mb-4">${pkg.price}</p>
               <div className="space-y-2">
                 {pkg.deliverables.map((item, i) => (
                   <div key={i} className="flex items-center gap-2 text-sm text-[#888888]">
                     <CheckCircle className="w-4 h-4 text-[#bcee45]" />
                     <span>{item}</span>
                   </div>
                 ))}
               </div>
             </div>
           )}
         </motion.div>
       ))}

       {isEditing.packages && (
         <motion.button
           whileHover={{ scale: 1.02 }}
           onClick={() => {
             setEditForm({
               ...editForm,
               packages: [
                 ...editForm.packages,
                 {
                   name: 'New Package',
                   price: '0',
                   deliverables: ['New Deliverable']
                 }
               ]
             });
           }}
           className="p-4 rounded-xl border border-dashed border-[#333333] flex flex-col items-center justify-center gap-2 h-[230px] hover:border-[#bcee45] hover:text-[#bcee45]"
         >
           <Plus className="w-6 h-6" />
           <span>Add Package</span>
         </motion.button>
       )}
     </div>

     {isEditing.packages && (
       <div className="flex justify-end gap-2 mt-4">
         <motion.button
           whileTap={{ scale: 0.95 }}
           onClick={() => handleEditToggle('packages')}
           className="px-4 py-2 rounded-lg bg-[#242424] hover:bg-[#333333]"
         >
           Cancel
         </motion.button>
         <motion.button
           whileTap={{ scale: 0.95 }}
           onClick={() => handleSaveSection('packages')}
           className="px-4 py-2 rounded-lg bg-[#bcee45] text-black hover:opacity-90"
         >
           Save Changes
         </motion.button>
       </div>
     )}
   </EditableCard>
 </SectionContainer>
</motion.div>
</motion.div>
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
    </div>

  );
};

export default ManageMediaKit;