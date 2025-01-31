'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Upload, X, Plus, Building2, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { StepCompletion } from '@/components/MediaKitStepCompletion';
import EnhancedHeader from '@/components/MediaKitHeader';

const TOTAL_STEPS = 6;
const CURRENT_STEP = 4;

const COLLABORATION_TYPES = [
  { id: 'sponsored', label: 'Sponsored Post' },
  { id: 'ambassador', label: 'Brand Ambassador' },
  { id: 'affiliate', label: 'Affiliate Partnership' },
  { id: 'review', label: 'Product Review' }
];

const CATEGORIES = [
  { id: 'lifestyle', label: 'Lifestyle' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'beauty', label: 'Beauty' },
  { id: 'tech', label: 'Technology' },
  { id: 'food', label: 'Food & Beverage' }
];

const FileUploadButton = ({ id, accept, value, onChange, icon: Icon, label, sublabel }) => (
  <div className="relative w-full h-full">
    {value ? (
      <div className="relative w-full h-full group ">
        <Image
          src={URL.createObjectURL(value)}
          alt={label}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            type="button"
            onClick={() => onChange(null)}
            className="p-2 bg-primary rounded-xl text-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    ) : (
      <button
        type="button"
        onClick={() => document.getElementById(id).click()}
        className="absolute inset-0 flex flex-col items-center justify-center text-primary/60 hover:text-primary transition-colors"
      >
        {Icon && <Icon className="w-6 h-6 mb-2" />}
        <span className="text-sm">{label}</span>
        {sublabel && <p className="text-xs text-primary/40 mt-1">{sublabel}</p>}
      </button>
    )}
    <input
      id={id}
      type="file"
      accept={accept}
      onChange={(e) => onChange(e.target.files[0])}
      className="hidden "
    />
  </div>
);

const CollaborationCard = ({ collaboration, onDelete }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-6 bg-black rounded-2xl border border-primary/20"
  >
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-4">
        {collaboration.brandLogo ? (
          <div className="w-16 h-16 rounded-xl overflow-hidden relative bg-white">
            <Image
              src={URL.createObjectURL(collaboration.brandLogo)}
              alt={collaboration.brandName}
              fill
              className="object-contain p-2"
            />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-white">{collaboration.brandName}</h3>
          <div className="flex gap-2 mt-1">
            <span className="px-2 py-1 bg-primary/10 rounded-lg text-primary text-xs">
              {COLLABORATION_TYPES.find(t => t.id === collaboration.type)?.label}
            </span>
            <span className="px-2 py-1 bg-primary/10 rounded-lg text-primary text-xs">
              {CATEGORIES.find(c => c.id === collaboration.category)?.label}
            </span>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(collaboration.id)}
        className="text-primary hover:bg-primary/10"
      >
        <X className="w-5 h-5" />
      </Button>
    </div>
    {collaboration.mediaFile && (
      <div className="mt-4 aspect-video rounded-xl overflow-hidden relative">
        <Image
          src={URL.createObjectURL(collaboration.mediaFile)}
          alt="Collaboration Media"
          fill
          className="object-cover"
        />
      </div>
    )}
  </motion.div>
);

const InputField = ({ label, required, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-2"
  >
    <label className="text-sm font-medium text-white">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children}
  </motion.div>
);

const CustomSelect = ({ value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full px-4 py-3 bg-[#1A1A1A]/60 rounded-xl border-2 border-primary/20 hover:border-primary focus:border-primary transition-colors cursor-pointer flex justify-between items-center text-white"
      >
        <span className={value ? "text-white" : "text-white/60"}>
          {value ? options.find(opt => opt.value === value)?.label : placeholder}
        </span>
        <ChevronDown className="w-4 h-4" />
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-50 top-full left-0 right-0 mt-2 bg-black rounded-xl overflow-hidden shadow-lg border border-primary/20"
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className="px-4 py-3 text-white hover:bg-primary hover:text-black cursor-pointer transition-colors"
              >
                {option.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


const AddCollaborationForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    brandName: '',
    brandLogo: null,
    type: '',
    category: '',
    mediaFile: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, id: Date.now() });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-6 bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F] rounded-2xl border border-primary/20"
      onSubmit={handleSubmit}
    >
      {/* Brand Info */}
      <div>
        <label className="text-md font-medium text-white block mb-2">Brand Name</label>
        <input
          required
          type="text"
          value={formData.brandName}
          onChange={(e) => setFormData(prev => ({ ...prev, brandName: e.target.value }))}
          className="w-full px-4 py-3 bg-[#1A1A1A]/60 rounded-xl border-2 border-[#bcee45]/20 text-white placeholder:text-[#888888] focus:border-[#bcee45] transition-colors outline-none"
          placeholder="Enter brand name"
        />
      </div>

      {/* Logo Upload */}
      <div>
        <label className="text-md font-medium text-white block mb-2">Brand Logo</label>
        <div className="relative  bg-[#1A1A1A]/60 w-full h-32 rounded-xl border-2 border-dashed border-primary/20 overflow-hidden">
          <FileUploadButton
            id="brandLogo"
            accept="image/*"
            value={formData.brandLogo}
            onChange={(file) => setFormData(prev => ({ ...prev, brandLogo: file }))}
            icon={Upload}
            label="Upload Logo"
          />
        </div>
      </div>

      {/* Type & Category */}
      <div className="grid grid-cols-1 gap-4">
      <InputField label="Type" >
      <CustomSelect
value={formData.type}
onChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
options={[
 { value: 'sponsored', label: 'Sponsored Post' },
 { value: 'ambassador', label: 'Brand Ambassador' },
 { value: 'affiliate', label: 'Affiliate Partnership' },
 { value: 'review', label: 'Product Review' }
 ]}
placeholder="Select Type"
/>
            </InputField>

            <InputField label="Category" >
              <CustomSelect
                value={formData.category}
                onChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                options={[
                  { value: 'lifestyle', label: 'Lifestyle' },
                  { value: 'fashion', label: 'Fashion' },
                  { value: 'beauty', label: 'Beauty' },
                  { value: 'tech', label: 'Technology' },
                  { value: 'food', label: 'Food & Beverage' }
                ]}
                placeholder="Select Category"
              />
            </InputField>
      </div>

      {/* Media File */}
      <div>
        <label className="text-md font-medium text-white block mb-2">Collaboration Media</label>
        <div className="relative bg-[#1A1A1A]/60  aspect-video rounded-xl border-2 border-dashed border-primary/20 overflow-hidden">
          <FileUploadButton
            id="mediaFile"
            accept="image/*,video/*"
            value={formData.mediaFile}
            onChange={(file) => setFormData(prev => ({ ...prev, mediaFile: file }))}
            icon={Upload}
            label="Upload Media"
            sublabel="JPG, PNG, or MP4 up to 10MB"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-primary/20 text-primary hover:border-primary/40"
        >
          Cancel
        </Button>
        <Button type="submit">
          Add Collaboration
        </Button>
      </div>
    </motion.form>
  );
};

export default function CollaborationsPage() {
  const [isAdding, setIsAdding] = useState(false);
  const [collaborations, setCollaborations] = useState([]);
  const [showCompletion, setShowCompletion] = useState(false);

  const handleSubmit = (collaboration) => {
    setCollaborations(prev => [collaboration, ...prev]);
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    setCollaborations(prev => prev.filter(c => c.id !== id));
  };

  const handleComplete = () => {
    if (collaborations.length > 0) {
      setShowCompletion(true);
    }
  };

  const TOTAL_STEPS = 6;
const CURRENT_STEP = 4;
const handleBack = () => {
  router.push('/complete-media-kit/social-connects');
};


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F]">
      {/* Header */}
      <EnhancedHeader
        currentStep={CURRENT_STEP}
        totalSteps={TOTAL_STEPS}
        onBackClick={handleBack}
      />


      {/* Progress Bar */}
      <div className="w-full h-1 bg-primary/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(CURRENT_STEP / TOTAL_STEPS) * 100}%` }}
          className="h-full bg-primary"
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Add Previous Collaborations
          </h2>
          <p className="text-muted-foreground">
            Showcase your brand collaborations and sponsored content
          </p>
        </div>

        {!isAdding && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAdding(true)}
            className="w-full p-6 bg-card/60 backdrop-blur-md rounded-2xl border border-primary/20 text-primary flex items-center justify-center gap-2 mb-6"
          >
            <Plus className="w-5 h-5" />
            Add Collaboration
          </motion.button>
        )}

        <div className="space-y-4">
          {isAdding && (
            <AddCollaborationForm
              onSubmit={handleSubmit}
              onCancel={() => setIsAdding(false)}
            />
          )}
          {collaborations.map(collaboration => (
            <CollaborationCard
              key={collaboration.id}
              collaboration={collaboration}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleComplete}
            disabled={collaborations.length === 0}
            className="gap-2"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Completion Modal */}
        <AnimatePresence>
          {showCompletion && (
            <StepCompletion
              onClose={() => setShowCompletion(false)}
              onContinue={() => window.location.href = '/complete-media-kit/pricing'}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}