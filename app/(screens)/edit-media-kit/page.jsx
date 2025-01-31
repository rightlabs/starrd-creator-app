'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Link as LinkIcon,
  User,
  Image as ImageIcon,
  Share2,
  Youtube,
  Instagram,
  Twitter,
  Plus,
  X,
  CheckCircle,
  Camera,
  Edit3,
  Globe,
  Mail,
  MapPin,
  AtSign,
  Phone
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Navbar';

// Smooth scroll utility
const scrollIntoView = (id) => {
  const element = document.getElementById(id);
  if (element) {
    setTimeout(() => {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  }
};

// Reusable components
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
          transition={{ 
            type: "spring",
            stiffness: 400,
            damping: 25
          }}
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
            height: {
              duration: 0.3,
              ease: [0.04, 0.62, 0.23, 0.98]
            },
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

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 text-sm">
    <div className="w-8 h-8 rounded-lg bg-[#242424] flex items-center justify-center">
      {icon}
    </div>
    <div>
      <p className="text-[#888888]">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

const ManageMediaKit = () => {
  const router = useRouter();
  
  // Initial state
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

  const [sectionToggles, setSectionToggles] = useState({
    profile: true,
    social: false,
    content: false,
    collaborations: false,
    packages: false
  });

  const [isEditing, setIsEditing] = useState({
    profile: false,
    social: false,
    content: false,
    collaborations: false,
    packages: false
  });

  const [editForm, setEditForm] = useState({...mediaKitData});

  // Handlers
  const handleToggleSection = (section) => {
    setSectionToggles(prev => {
      const newToggles = { ...prev, [section]: !prev[section] };
      if (newToggles[section]) {
        scrollIntoView(`${section}-section`);
      }
      return newToggles;
    });
  };

  const handleEditToggle = (section) => {
    setIsEditing(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSaveSection = (section) => {
    setMediaKitData(prev => ({
      ...prev,
      [section]: editForm[section]
    }));
    handleEditToggle(section);
  };

  // Section Components
  const ProfileSection = () => (
    <Card className="p-6 bg-[#1A1A1A] border-[#333333]">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-20 h-20 rounded-xl bg-[#242424] flex items-center justify-center cursor-pointer"
          >
            <Camera className="w-8 h-8 text-[#666666]" />
          </motion.div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">{mediaKitData.profileInfo.name}</h3>
            <p className="text-sm text-[#888888]">{mediaKitData.profileInfo.username}</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleEditToggle('profile')}
          className="p-2 rounded-lg bg-[#242424] hover:bg-[#333333]"
        >
          <Edit3 className="w-5 h-5" />
        </motion.button>
      </div>

      {isEditing.profile ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
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
          <textarea
            value={editForm.profileInfo.bio}
            onChange={(e) => setEditForm({
              ...editForm,
              profileInfo: { ...editForm.profileInfo, bio: e.target.value }
            })}
            className="w-full p-3 rounded-lg bg-[#242424] border border-[#333333] h-32"
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
          <div className="grid grid-cols-2 gap-4">
            <InfoItem icon={<MapPin className="w-4 h-4" />} label="Location" value={mediaKitData.profileInfo.location} />
            <InfoItem icon={<Mail className="w-4 h-4" />} label="Email" value={mediaKitData.profileInfo.email} />
            <InfoItem icon={<Phone className="w-4 h-4" />} label="Phone" value={mediaKitData.profileInfo.phone} />
            <InfoItem icon={<Globe className="w-4 h-4" />} label="Website" value={mediaKitData.profileInfo.website} />
          </div>
          <p className="text-sm text-[#888888] mt-4">{mediaKitData.profileInfo.bio}</p>
        </div>
      )}
    </Card>
  );

  const SocialSection = () => (
    <Card className="p-6 bg-[#1A1A1A] border-[#333333]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Social Connections</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleEditToggle('social')}
          className="p-2 rounded-lg bg-[#242424] hover:bg-[#333333]"
        >
          <Edit3 className="w-5 h-5" />
        </motion.button>
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
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F] text-white pb-24">
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

      <div className="container mx-auto p-6 space-y-4">
        {/* Section Toggles */}
        <div className="space-y-4">
          <motion.div layout className="space-y-4">
            {/* Profile Section Toggle & Content */}
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

            {/* Social Section Toggle & Content */}
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
                <Card className="p-6 bg-[#1A1A1A] border-[#333333]">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Content Categories</h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEditToggle('content')}
                      className="p-2 rounded-lg bg-[#242424] hover:bg-[#333333]"
                    >
                      <Edit3 className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {isEditing.content ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                    >
                      <div className="flex flex-wrap gap-2">
                        {editForm.contentCategories.map((category, index) => (
                          <motion.div
                            key={index}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="px-3 py-1 rounded-lg bg-[#242424] border border-[#333333] flex items-center gap-2"
                          >
                            <span>{category}</span>
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
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            const newCategory = prompt('Enter new category');
                            if (newCategory) {
                              setEditForm({
                                ...editForm,
                                contentCategories: [...editForm.contentCategories, newCategory]
                              });
                            }
                          }}
                          className="px-3 py-1 rounded-lg border border-[#bcee45] text-[#bcee45] hover:bg-[#bcee45] hover:text-black flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add Category
                        </motion.button>
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
                          className="px-3 py-1 rounded-lg bg-[#242424] border border-[#333333]"
                        >
                          {category}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </Card>
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
                <Card className="p-6 bg-[#1A1A1A] border-[#333333]">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Previous Collaborations</h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEditToggle('collaborations')}
                      className="p-2 rounded-lg bg-[#242424] hover:bg-[#333333]"
                    >
                      <Edit3 className="w-5 h-5" />
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mediaKitData.previousCollaborations.map((collab, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-xl bg-[#242424] border border-[#333333]"
                      >
                        <div className="w-full h-40 rounded-lg bg-[#1A1A1A] mb-4 flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-[#666666]" />
                        </div>
                        <h4 className="font-medium mb-1">{collab.brand}</h4>
                        <p className="text-sm text-[#888888]">{collab.type}</p>
                        <p className="text-sm text-[#888888]">{collab.date}</p>
                      </motion.div>
                    ))}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      className="p-4 rounded-xl border border-dashed border-[#333333] flex flex-col items-center justify-center gap-2 hover:border-[#bcee45] hover:text-[#bcee45]"
                      onClick={() => handleEditToggle('collaborations')}
                    >
                      <Plus className="w-6 h-6" />
                      <span>Add Collaboration</span>
                    </motion.button>
                  </div>
                </Card>
              </SectionContainer>
            </motion.div>

            {/* Packages Section */}
            <motion.div layout className="w-full">
              <ToggleSwitch
                isOn={sectionToggles.packages}
                onToggle={() => handleToggleSection('packages')}
                label="Packages & Pricing"
                isExpanded={sectionToggles.packages}
              />
              <SectionContainer id="packages-section" isVisible={sectionToggles.packages}>
                <Card className="p-6 bg-[#1A1A1A] border-[#333333]">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Packages & Pricing</h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEditToggle('packages')}
                      className="p-2 rounded-lg bg-[#242424] hover:bg-[#333333]"
                    >
                      <Edit3 className="w-5 h-5" />
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mediaKitData.packages.map((pkg, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-xl bg-[#242424] border border-[#333333]"
                      >
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
                      </motion.div>
                    ))}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      className="p-4 rounded-xl border border-dashed border-[#333333] flex flex-col items-center justify-center gap-2 hover:border-[#bcee45] hover:text-[#bcee45]"
                      onClick={() => handleEditToggle('packages')}
                    >
                      <Plus className="w-6 h-6" />
                      <span>Add Package</span>
                    </motion.button>
                  </div>
                </Card>
              </SectionContainer>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer Actions */}
      <motion.div
        layout
        className="fixed bottom-[10px] inset-x-0 p-6 bg-gradient-to-t from-black to-transparent"
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

      {/* Bottom Navigation */}
      {/* <Navbar /> */}
    </div>
  );
};

export default ManageMediaKit;