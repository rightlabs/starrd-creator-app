'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Camera, 
  User, 
  UserCircle2,
  Calendar,
  MapPin, 
  Mail, 
  Phone,
  CheckCircle2,
  Type,
  FileText,
  ImageIcon,
  X,
  Building2,
  Globe,
  Pencil
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const InputField = ({ label, icon: Icon, value, onChange, type = "text", placeholder, disabled, description, maxLength }) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2 mb-1">
      {/* <Icon className="w-4 h-4 text-[#bcee45]" /> */}
      <label className="text-md font-medium text-white">
        {label}
      </label>
    </div>
    {description && (
      <p className="text-sm text-[#888888] mb-2">{description}</p>
    )}
    {type === 'textarea' ? (
      <div>
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          rows={4}
          maxLength={maxLength}
          className={`w-full px-4 py-3 rounded-xl border-2 transition-colors outline-none resize-none
            ${disabled ? 
              "bg-[#1A1A1A]/30 border-[#333333] text-gray-400 cursor-not-allowed" : 
              "bg-[#1A1A1A]/60 border-[#bcee45]/20 text-white placeholder:text-[#888888] focus:border-[#bcee45]"
            }`}
        />
        <div className="flex justify-end text-xs text-[#888888] mt-1">
          {`${value?.length || 0}/${maxLength}`}
        </div>
      </div>
    ) : (
      <div>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          className={`w-full px-4 py-3 rounded-xl border-2 transition-colors outline-none
            ${disabled ? 
              "bg-[#1A1A1A]/30 border-[#333333] text-gray-400 cursor-not-allowed" : 
              "bg-[#1A1A1A]/60 border-[#bcee45]/20 text-white placeholder:text-[#888888] focus:border-[#bcee45]"
            }`}
        />
        {maxLength && (
          <div className="flex justify-end text-xs text-[#888888] mt-1">
            {`${value?.length || 0}/${maxLength}`}
          </div>
        )}
      </div>
    )}
  </div>
);

const ImageUploadField = ({ field, value, onChange, onRemove }) => (
  <div className="space-y-2">
    <label className="text-md font-medium text-white">{field.label}</label>
    <p className="text-sm text-[#888888] mb-3">{field.description}</p>
    
    <div className={`relative ${
      field.name === 'coverImage' ? 'aspect-[3/2]' : 
      field.name === 'agencyLogo' ? 'aspect-[2/1]' :
      'aspect-square'
    } rounded-xl border-2 border-dashed border-[#bcee45]/20 overflow-hidden group`}>
      {value ? (
        <>
          <Image 
            src={typeof value === 'string' ? value : URL.createObjectURL(value)}
            alt={field.label}
            fill
            className={field.name === 'agencyLogo' ? 'object-contain' : 'object-cover'}
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

const PrefilledField = ({ label, value, icon: Icon, disabled }) => (
  <motion.div
    className="p-6 bg-[#1A1A1A]/60 backdrop-blur-md rounded-2xl border border-[#333333] transition-all"
    whileHover={{ scale: 1.02 }}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-[#bcee45]/10 rounded-xl flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#bcee45]" />
        </div>
        <div>
          <p className="text-sm text-[#888888] mb-1">{label}</p>
          <p className={`font-medium ${disabled ? 'text-gray-400' : 'text-white'}`}>{value}</p>
        </div>
      </div>
      {disabled && (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#bcee45]" />
        </div>
      )}
    </div>
  </motion.div>
);

const ProfileSection = ({ profileInfo, editForm, isEditing, setEditForm, handleEditToggle, handleSaveSection }) => {
  const handleImageChange = (fieldName, file) => {
    setEditForm(prev => ({
      ...prev,
      profileInfo: {
        ...prev.profileInfo,
        [fieldName]: file
      }
    }));
  };

  const handleImageRemove = (fieldName) => {
    setEditForm(prev => ({
      ...prev,
      profileInfo: {
        ...prev.profileInfo,
        [fieldName]: null
      }
    }));
  };

  const renderEditView = () => (
    <motion.div className="space-y-6">
      {/* Media Upload Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ImageUploadField
          field={{
            name: 'avatar',
            label: 'Profile Picture',
            description: 'Square format recommended (1:1)'
          }}
          value={editForm.profileInfo.avatar}
          onChange={handleImageChange}
          onRemove={handleImageRemove}
        />
        <ImageUploadField
          field={{
            name: 'coverImage',
            label: 'Cover Image',
            description: 'Recommended size 1920x1080'
          }}
          value={editForm.profileInfo.coverImage}
          onChange={handleImageChange}
          onRemove={handleImageRemove}
        />
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Full Name"
          icon={User}
          value={editForm.profileInfo.name}
          onChange={(e) => setEditForm({
            ...editForm,
            profileInfo: { ...editForm.profileInfo, name: e.target.value }
          })}
          placeholder="Your full name"
        />
        <InputField
          label="Location"
          icon={MapPin}
          value={editForm.profileInfo.location}
          onChange={(e) => setEditForm({
            ...editForm,
            profileInfo: { ...editForm.profileInfo, location: e.target.value }
          })}
          placeholder="Your location"
        />
        <PrefilledField
          label="Email"
          value={profileInfo.email}
          icon={Mail}
          disabled={true}
        />
        <PrefilledField
          label="Phone"
          value={profileInfo.phone}
          icon={Phone}
          disabled={true}
        />
        <InputField
          label="Date of Birth"
          icon={Calendar}
          type="date"
          value={editForm.profileInfo.dob}
          onChange={(e) => setEditForm({
            ...editForm,
            profileInfo: { ...editForm.profileInfo, dob: e.target.value }
          })}
        />
      </div>

      {/* Bio Information */}
      <div className="space-y-4">
        <InputField
          label="Tagline"
          icon={Type}
          value={editForm.profileInfo.tagline}
          onChange={(e) => setEditForm({
            ...editForm,
            profileInfo: { ...editForm.profileInfo, tagline: e.target.value }
          })}
          placeholder="e.g., Creative storyteller with a passion for tech"
          description="A short catchy line about you"
          maxLength={60}
        />
        <InputField
          label="Bio"
          icon={FileText}
          type="textarea"
          value={editForm.profileInfo.bio}
          onChange={(e) => setEditForm({
            ...editForm,
            profileInfo: { ...editForm.profileInfo, bio: e.target.value }
          })}
          placeholder="Share your journey, expertise, and what makes you unique..."
          description="Tell brands about yourself"
          maxLength={300}
        />
      </div>

      {/* Agency Representation */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <h4 className="font-medium text-white">Agency Representation</h4>
        </div>
        <div className="space-y-6">
          <InputField
            label="Agency Name"
            icon={Building2}
            value={editForm.profileInfo.representation?.name || ''}
            onChange={(e) => setEditForm({
              ...editForm,
              profileInfo: {
                ...editForm.profileInfo,
                representation: {
                  ...editForm.profileInfo.representation,
                  name: e.target.value
                }
              }
            })}
            placeholder="e.g., Creator Management Agency"
          />

          <ImageUploadField
            field={{
              name: 'agencyLogo',
              label: 'Agency Logo',
              description: 'Upload agency logo (optional)'
            }}
            value={editForm.profileInfo.representation?.logo || null}
            onChange={(name, file) => setEditForm({
              ...editForm,
              profileInfo: {
                ...editForm.profileInfo,
                representation: {
                  ...editForm.profileInfo.representation,
                  logo: file
                }
              }
            })}
            onRemove={() => setEditForm({
              ...editForm,
              profileInfo: {
                ...editForm.profileInfo,
                representation: {
                  ...editForm.profileInfo.representation,
                  logo: null
                }
              }
            })}
          />

          <InputField
            label="Agency Website"
            icon={Globe}
            value={editForm.profileInfo.representation?.website || ''}
            onChange={(e) => setEditForm({
              ...editForm,
              profileInfo: {
                ...editForm.profileInfo,
                representation: {
                  ...editForm.profileInfo.representation,
                  website: e.target.value
                }
              }
            })}
            placeholder="e.g., https://agency.com (optional)"
          />
        </div>
      </div>

      {/* Action Buttons */}
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
  );

  const renderViewMode = () => (
    <div className="space-y-6">
      {/* Media Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square relative rounded-xl overflow-hidden">
          {profileInfo.avatar ? (
            <Image 
              src={profileInfo.avatar}
              alt="Profile Picture"
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-[#1A1A1A] flex items-center justify-center">
              <User className="w-8 h-8 text-[#666666]" />
            </div>
          )}
        </div>
        <div className="aspect-[3/2] relative rounded-xl overflow-hidden">
          {profileInfo.coverImage ? (
            <Image 
              src={profileInfo.coverImage}
              alt="Cover Image"
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-[#1A1A1A] flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-[#666666]" />
            </div>
          )}
        </div>
      </div>

      {/* Information Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'Full Name', value: profileInfo.name, icon: User },
          { label: 'Location', value: profileInfo.location, icon: MapPin },
          { label: 'Email', value: profileInfo.email, icon: Mail, disabled: true },
          { label: 'Phone', value: profileInfo.phone, icon: Phone, disabled: true },
          { label: 'Date of Birth', value: profileInfo.dob, icon: Calendar }
        ].map((field, index) => (
          <PrefilledField
            key={index}
            label={field.label}
            value={field.value}
            icon={field.icon}
            disabled={field.disabled}
          />
        ))}
      </div>
      {profileInfo.representation?.name ? (
        <div className="space-y-4">
          <div className="p-6 bg-[#1A1A1A]/60 backdrop-blur-md rounded-2xl border border-[#333333]">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-[#bcee45]" />
              <h4 className="font-medium text-white">Agency Representation</h4>
            </div>
            
            <div className="space-y-6">
              {profileInfo.representation.logo && (
                <div className="relative h-24 w-48 mx-auto">
                  <Image 
                    src={profileInfo.representation.logo}
                    alt="Agency Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#bcee45]" />
                  <span className="text-[#888888]">{profileInfo.representation.name}</span>
                </div>
                
                {profileInfo.representation.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#bcee45]" />
                    <a 
                      href={profileInfo.representation.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#bcee45] hover:underline"
                    >
                      {profileInfo.representation.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-[#1A1A1A]/60 backdrop-blur-md rounded-xl border border-[#333333]">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#bcee45]" />
            <h4 className="font-medium text-white">Agency Representation</h4>
          </div>
          <p className="text-[#888888] mt-3">No agency representation added yet</p>
        </div>
      )}

      {/* Bio Information Display */}
      <div className="space-y-4">
        <div className="p-6 bg-[#1A1A1A]/60 backdrop-blur-md rounded-2xl border border-[#333333]">
          <div className="flex items-center gap-2 mb-3">
            <Type className="w-4 h-4 text-[#bcee45]" />
            <h4 className="font-medium text-white">Tagline</h4>
          </div>
          <p className="text-[#888888]">{profileInfo.tagline}</p>
        </div>
        <div className="p-6 bg-[#1A1A1A]/60 backdrop-blur-md rounded-2xl border border-[#333333]">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-[#bcee45]" />
            <h4 className="font-medium text-white">Bio</h4>
          </div>
          <p className="text-[#888888]">{profileInfo.bio}</p>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="p-6 bg-[#1A1A1A] border-[#333333]">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-semibold">Basic Information</h3>
      {!isEditing && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleEditToggle('profile')}
          className="px-4 py-2 rounded-lg border border-[#bcee45]/20 text-[#bcee45] hover:bg-[#bcee45]/10"
        >
          <div className="flex items-center gap-2">
            <Pencil className="w-4 h-4" />
            <span>Edit</span>
          </div>
        </motion.button>
      )}
    </div>
    {isEditing ? renderEditView() : renderViewMode()}
  </Card>
  );
};

export default ProfileSection;