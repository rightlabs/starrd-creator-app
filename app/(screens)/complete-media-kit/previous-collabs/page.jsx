'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Upload, X, Plus, Building2, ChevronDown, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { StepCompletion } from '@/components/MediaKitStepCompletion';
import EnhancedHeader from '@/components/MediaKitHeader';
import { useRouter } from 'next/navigation';
import {toast} from 'sonner'  
import { 
  getMediaKitCollaborations, 
  addMediaKitCollaboration, 
  deleteMediaKitCollaboration 
} from '@/api/mediaKit';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Keep your existing constants
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

const CollaborationCard = ({ collaboration, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-black rounded-2xl border border-primary/20"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          {collaboration.brandLogo?.url ? (
            <div className="w-16 h-16 rounded-xl overflow-hidden relative bg-white">
              <Image
                src={collaboration.brandLogo.url}
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
            <h3 className="text-lg font-semibold text-white">
              {collaboration.brandName}
            </h3>
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

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary hover:bg-primary/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-card border-primary/20">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">
                Delete Collaboration
              </AlertDialogTitle>
              <AlertDialogDescription className="text-muted-foreground">
                Are you sure you want to delete this collaboration with {collaboration.brandName}? 
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-primary/20 text-primary hover:border-primary/40">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete(collaboration._id)}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {collaboration.mediaFile?.url && (
        <div className="mt-4 aspect-video rounded-xl overflow-hidden relative">
          <Image
            src={collaboration.mediaFile.url}
            alt="Collaboration Media"
            fill
            className="object-cover"
          />
        </div>
      )}
    </motion.div>
  );
};

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.brandName || !formData.type || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setIsSubmitting(true);
      const data = new FormData();
      data.append('brandName', formData.brandName);
      data.append('type', formData.type);
      data.append('category', formData.category);
      
      if (formData.brandLogo) {
        data.append('brandLogo', formData.brandLogo);
      }
      
      if (formData.mediaFile) {
        data.append('mediaFile', formData.mediaFile);
      }

      await onSubmit(data);
    } catch (error) {
      toast.error("Failed to add collaboration");
    } finally {
      setIsSubmitting(false);
    }
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
          disabled={isSubmitting}
        />
      </div>

      {/* Logo Upload */}
      <div>
        <label className="text-md font-medium text-white block mb-2">Brand Logo</label>
        <div className="relative bg-[#1A1A1A]/60 w-full h-32 rounded-xl border-2 border-dashed border-primary/20 overflow-hidden">
          <FileUploadButton
            id="brandLogo"
            accept="image/*"
            value={formData.brandLogo}
            onChange={(file) => setFormData(prev => ({ ...prev, brandLogo: file }))}
            icon={Upload}
            label="Upload Logo"
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Type & Category */}
      <div className="grid grid-cols-1 gap-4">
        <InputField label="Type">
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
            disabled={isSubmitting}
          />
        </InputField>

        <InputField label="Category">
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
            disabled={isSubmitting}
          />
        </InputField>
      </div>

      {/* Media File */}
      <div>
        <label className="text-md font-medium text-white block mb-2">Collaboration Media</label>
        <div className="relative bg-[#1A1A1A]/60 aspect-video rounded-xl border-2 border-dashed border-primary/20 overflow-hidden">
          <FileUploadButton
            id="mediaFile"
            accept="image/*,video/*"
            value={formData.mediaFile}
            onChange={(file) => setFormData(prev => ({ ...prev, mediaFile: file }))}
            icon={Upload}
            label="Upload Media"
            sublabel="JPG, PNG, or MP4 up to 10MB"
            disabled={isSubmitting}
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
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          disabled={isSubmitting}
          className="min-w-[140px]"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Adding...</span>
            </div>
          ) : (
            'Add Collaboration'
          )}
        </Button>
      </div>
    </motion.form>
  );
};
export default function CollaborationsPage() {
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const [collaborations, setCollaborations] = useState([]);
  const [showCompletion, setShowCompletion] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCollaborations();
  }, []);

  const fetchCollaborations = async () => {
    try {
      setLoading(true);
      const response = await getMediaKitCollaborations();
      if (response.statusCode === 200) {
        setCollaborations(response.data.items);
      }
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load collaborations");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      const response = await addMediaKitCollaboration(formData);
      if (response.statusCode === 201) {
        setCollaborations(prev => [response.data.collaboration, ...prev]);
        setIsAdding(false);
        toast.success(" Collaboration added successfully");
      }
    } catch (error) {
      toast.error("Failed to add collaboration");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteMediaKitCollaboration(id);
      if (response.statusCode === 200) {
        setCollaborations(prev => prev.filter(c => c._id !== id));
        toast.success("Collaboration deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete collaboration");
    }
  };

  const handleComplete = () => {
    if (collaborations.length > 0) {
      setShowCompletion(true);
    } else {
      toast.error("Please add at least one collaboration");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F] flex items-center justify-center">
        <div className="flex items-center gap-2 text-primary">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-lg">Loading collaborations...</span>
        </div>
      </div>
    );
  }

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
        // currentSlide={currentSlide}
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
      key="add-collaboration-form"
      onSubmit={handleSubmit}
      onCancel={() => setIsAdding(false)}
    />
  )}
  {collaborations.map(collaboration => (
    <CollaborationCard
      key={collaboration._id || `collab-${collaboration.id}`}
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