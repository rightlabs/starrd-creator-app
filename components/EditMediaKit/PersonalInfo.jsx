'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  User,
  Ruler,
  Globe,
  PawPrint
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const hairTypes = [
  { id: 'straight', label: 'Straight', icon: '💇‍♂️' },
  { id: 'wavy', label: 'Wavy', icon: '👱‍♀️' },
  { id: 'curly', label: 'Curly', icon: '👨‍🦱' },
  { id: 'coily', label: 'Coily', icon: '🧑‍🦱' },
  { id: 'bald', label: 'Bald', icon: '👨‍🦲' }
];

const bodyTypes = [
  { id: 'ectomorph', label: 'Ectomorph', description: 'Lean and long body type', icon: '🏃‍♂️' },
  { id: 'mesomorph', label: 'Mesomorph', description: 'Athletic and muscular body type', icon: '💪' },
  { id: 'endomorph', label: 'Endomorph', description: 'Soft and full body type', icon: '🫂' },
  { id: 'combination', label: 'Combination', description: 'Mix of different body types', icon: '🎯' },
  { id: 'prefer_not_to_say', label: 'Prefer not to say', description: 'Keep this private', icon: '🔒' }
];

const petTypes = [
  { id: 'dog', label: 'Dogs', icon: '🐕' },
  { id: 'cat', label: 'Cats', icon: '🐱' },
  { id: 'bird', label: 'Birds', icon: '🦜' },
  { id: 'fish', label: 'Fish', icon: '🐠' },
  { id: 'none', label: 'No Pets', icon: '❌' }
];

const SelectionCard = ({ icon, label, selected, onClick, description }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`p-4 rounded-xl ${
      selected
        ? 'bg-[#bcee45]/10 border-[#bcee45]'
        : 'bg-[#1A1A1A]/60 border-[#333333] hover:border-[#bcee45]/20'
    } border transition-all w-full text-left`}
  >
    <div className="flex items-center gap-3">
      <div className="text-2xl">{icon}</div>
      <div>
        <h3 className="text-white font-medium text-sm">{label}</h3>
        {description && (
          <p className="text-[#888888] text-xs mt-0.5">{description}</p>
        )}
      </div>
    </div>
  </motion.button>
);

const CategorySection = ({ title, icon: Icon, children }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
    
      <h3 className="text-white font-medium">{title}</h3>
    </div>
    {children}
  </div>
);

const PersonalInfoSection = ({
  personalInfo,
  editForm,
  isEditing,
  setEditForm,
  handleEditToggle,
  handleSaveSection
}) => {
  const updateForm = (key, value) => {
    setEditForm(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [key]: value }
    }));
  };

  const renderEditView = () => (
    <motion.div className="space-y-8">
      {/* Hair Type */}
      <CategorySection title="Hair Type" icon={User}>
        <div className="grid grid-cols-2 gap-3">
          {hairTypes.map(type => (
            <SelectionCard
              key={type.id}
              icon={type.icon}
              label={type.label}
              selected={editForm.personalInfo?.hairType === type.id}
              onClick={() => updateForm('hairType', type.id)}
            />
          ))}
        </div>
      </CategorySection>

      {/* Height */}
      <CategorySection title="Height" icon={Ruler}>
        <div className="flex gap-3">
          <input
            type="number"
            value={editForm.personalInfo?.heightFt || ''}
            onChange={(e) => updateForm('heightFt', e.target.value)}
            placeholder="ft"
            className="w-24 px-4 py-3 bg-[#1A1A1A]/60 rounded-xl border border-[#333333] text-white text-center"
          />
          <input
            type="number"
            value={editForm.personalInfo?.heightIn || ''}
            onChange={(e) => updateForm('heightIn', e.target.value)}
            placeholder="in"
            className="w-24 px-4 py-3 bg-[#1A1A1A]/60 rounded-xl border border-[#333333] text-white text-center"
          />
        </div>
      </CategorySection>

      {/* Body Type */}
      <CategorySection title="Body Type" icon={Ruler}>
        <div className="grid grid-cols-1 gap-3">
          {bodyTypes.map(type => (
            <SelectionCard
              key={type.id}
              icon={type.icon}
              label={type.label}
              description={type.description}
              selected={editForm.personalInfo?.bodyType === type.id}
              onClick={() => updateForm('bodyType', type.id)}
            />
          ))}
        </div>
      </CategorySection>

      {/* Languages */}
      <CategorySection title="Languages" icon={Globe}>
        <div className="grid grid-cols-2 gap-3">
          {['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'].map(lang => (
            <motion.button
              key={lang}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const currentLangs = editForm.personalInfo?.languages || [];
                updateForm('languages', 
                  currentLangs.includes(lang)
                    ? currentLangs.filter(l => l !== lang)
                    : [...currentLangs, lang]
                );
              }}
              className={`p-3 rounded-xl border ${
                (editForm.personalInfo?.languages || []).includes(lang)
                  ? 'bg-[#bcee45]/10 border-[#bcee45] text-white'
                  : 'bg-[#1A1A1A]/60 border-[#333333] text-[#888888] hover:border-[#bcee45]/20'
              }`}
            >
              {lang}
            </motion.button>
          ))}
        </div>
      </CategorySection>

      {/* Pets */}
      <CategorySection title="Pets" icon={PawPrint}>
        <div className="grid grid-cols-2 gap-3">
          {petTypes.map(pet => (
            <SelectionCard
              key={pet.id}
              icon={pet.icon}
              label={pet.label}
              selected={editForm.personalInfo?.petType === pet.id}
              onClick={() => updateForm('petType', pet.id)}
            />
          ))}
        </div>
      </CategorySection>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleEditToggle('personal')}
          className="px-4 py-2 rounded-lg bg-[#242424] hover:bg-[#333333] text-white"
        >
          Cancel
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSaveSection('personalInfo')}
          className="px-4 py-2 rounded-lg bg-[#bcee45] text-black hover:opacity-90"
        >
          Save Changes
        </motion.button>
      </div>
    </motion.div>
  );

  const renderViewMode = () => (
    <div className="space-y-8">
      {/* View Mode Categories */}
      <CategorySection title="Physical Attributes" icon={User}>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-[#1A1A1A]/60 border border-[#333333]">
            <p className="text-[#888888] text-sm">Hair Type</p>
            <p className="text-white mt-1">
              {hairTypes.find(t => t.id === personalInfo?.hairType)?.label || '--'}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#1A1A1A]/60 border border-[#333333]">
            <p className="text-[#888888] text-sm">Height</p>
            <p className="text-white mt-1">
              {personalInfo?.heightFt ? `${personalInfo.heightFt}'${personalInfo.heightIn || 0}"` : '--'}
            </p>
          </div>
        </div>
        <div className="mt-3 p-4 rounded-xl bg-[#1A1A1A]/60 border border-[#333333]">
          <p className="text-[#888888] text-sm">Body Type</p>
          <p className="text-white mt-1">
            {bodyTypes.find(t => t.id === personalInfo?.bodyType)?.label || '--'}
          </p>
        </div>
      </CategorySection>

      <CategorySection title="Languages" icon={Globe}>
        <div className="flex flex-wrap gap-2">
          {(personalInfo?.languages || []).map(lang => (
            <span key={lang} className="px-3 py-1.5 rounded-lg bg-[#bcee45]/10 text-[#bcee45] text-sm">
              {lang}
            </span>
          ))}
          {(!personalInfo?.languages?.length) && (
            <p className="text-[#888888]">No languages specified</p>
          )}
        </div>
      </CategorySection>

      <CategorySection title="Pets" icon={PawPrint}>
        <span className="text-white">
          {petTypes.find(p => p.id === personalInfo?.petType)?.label || '--'}
        </span>
      </CategorySection>

      {/* Edit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleEditToggle('personal')}
        className="w-full p-3 rounded-lg border border-[#bcee45]/20 text-[#bcee45] hover:bg-[#bcee45]/10"
      >
        Edit Personal Information
      </motion.button>
    </div>
  );

  return (
    <Card className="p-6 bg-[#1A1A1A] border-[#333333]">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-white">Personal Information</h3>
          <p className="text-sm text-[#888888]">
            Your physical attributes and preferences
          </p>
        </div>
      </div>
      {isEditing ? renderEditView() : renderViewMode()}
    </Card>
  );
};

export default PersonalInfoSection;