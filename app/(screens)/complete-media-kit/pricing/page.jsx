'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Package, Plus, X, ChevronDown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StepCompletion } from '@/components/MediaKitStepCompletion';
import { useRouter } from 'next/navigation';
import EnhancedHeader from '@/components/MediaKitHeader';
import { toast } from 'sonner';
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
import { 
  getMediaKitPackages, 
  addMediaKitPackage, 
  deleteMediaKitPackage 
} from '@/api/mediaKit';

// Keep existing constants
const TOTAL_STEPS = 6;
const CURRENT_STEP = 5;

const INITIAL_PACKAGE = {
  name: '',
  price: '',
  deliverables: [],
  customFields: [],
  openToBarter: false
};

// Keep existing DELIVERABLE_OPTIONS
const DELIVERABLE_OPTIONS = [
  { value: 'story', label: 'Story' },
  { value: 'reel', label: 'Reel' },
  { value: 'carousel', label: 'Carousel Post' },
  { value: 'shoot', label: 'Shoot (8 hours)' }
];


const CustomFieldInput = ({ onAdd = () => {}, onRemove = () => {}, fields = [], disabled }) => {
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');

  const handleAdd = () => {
    if (label.trim() && value.trim()) {
      onAdd({ label: label.trim(), value: value.trim() });
      setLabel('');
      setValue('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Enter field label"
              className="w-full px-4 py-3 bg-[#1A1A1A]/60 rounded-xl border-2 border-[#bcee45]/20 text-white placeholder:text-[#888888] focus:border-[#bcee45] transition-colors outline-none"
              disabled={disabled}
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
              className="w-full px-4 py-3 bg-[#1A1A1A] rounded-xl border-2 border-[#bcee45]/20 text-white placeholder:text-[#888888] focus:border-[#bcee45] transition-colors outline-none"
              disabled={disabled}
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleAdd}
            className="text-[#bcee45] bg-[#bcee45]/10 mt-2 text-2xl"
            disabled={!label.trim() || !value.trim() || disabled}
          >
            <Plus className="w-8 h-8" />
          </Button>
        </div>
      </div>
      
      {fields.length > 0 && (
        <div className="space-y-2">
          {fields.map((field, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-between bg-[#1A1A1A]/30 px-4 py-2 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <span className="text-[#888888]">{field.label}:</span>
                <span className="text-white">{field.value}</span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onRemove(index)}
                className="text-[#bcee45] hover:bg-[#bcee45]/10"
                disabled={disabled}
              >
                <X className="w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
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

const CustomSelect = ({ onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-[#1A1A1A]/60 rounded-xl border-2 border-[#bcee45]/20 hover:border-[#bcee45] transition-colors cursor-pointer flex justify-between items-center text-white"
      >
        <span className="text-white/60">{placeholder}</span>
        <ChevronDown className="w-4 h-4" />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-50 top-full left-0 right-0 mt-2 bg-black rounded-xl overflow-hidden shadow-lg border border-[#bcee45]/20"
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="px-4 py-3 text-white hover:bg-[#bcee45] hover:text-black cursor-pointer transition-colors"
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

const PackageForm = ({ onSubmit, onCancel, initialData = INITIAL_PACKAGE, isSubmitting }) => {
  const [formData, setFormData] = useState({
    ...initialData,
    customFields: initialData.customFields || []
  });
  
  const handleDeliverableSelect = (option) => {
    if (!formData.deliverables.includes(option.value)) {
      setFormData(prev => ({
        ...prev,
        deliverables: [...prev.deliverables, option.value]
      }));
    }
  };

  const removeDeliverable = (deliverable) => {
    setFormData(prev => ({
      ...prev,
      deliverables: prev.deliverables.filter(d => d !== deliverable)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-6 bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F] rounded-2xl border border-[#333333]"
      onSubmit={handleSubmit}
    >
      {/* Package Name */}
      <div>
        <label className="text-md font-medium text-white block mb-2">
          Package Name
        </label>
        <input
          required
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-4 py-3 bg-[#1A1A1A]/60 rounded-xl border-2 border-[#bcee45]/20 text-white placeholder:text-[#888888] focus:border-[#bcee45] transition-colors outline-none"
          placeholder="e.g., Basic Package"
          disabled={isSubmitting}
        />
      </div>
  
      {/* Price */}
      <div>
        <label className="text-md font-medium text-white block mb-2">
          Price
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888888]">₹</span>
          <input
            required
            type="text"
            value={formData.price}
            onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
            className="w-full px-8 py-3 bg-[#1A1A1A]/60 rounded-xl border-2 border-[#bcee45]/20 text-white placeholder:text-[#888888] focus:border-[#bcee45] transition-colors outline-none"
            placeholder="5,000 - 10,000"
            disabled={isSubmitting}
          />
        </div>
      </div>
  
      {/* Open to Barter */}
      <div>
        <label className="text-md font-medium text-white block mb-2">
          Open to Barter?
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, openToBarter: true }))}
            disabled={isSubmitting}
            className={`flex-1 py-3 rounded-xl border-2 transition-colors ${
              formData.openToBarter
                ? 'border-[#bcee45] bg-[#bcee45]/10 text-white'
                : 'border-[#333333] text-[#888888]'
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, openToBarter: false }))}
            disabled={isSubmitting}
            className={`flex-1 py-3 rounded-xl border-2 transition-colors ${
              !formData.openToBarter
                ? 'border-[#bcee45] bg-[#bcee45]/10 text-white'
                : 'border-[#333333] text-[#888888]'
            }`}
          >
            No
          </button>
        </div>
      </div>
  
      {/* Deliverables */}
      <div>
        <InputField label="Deliverables">
          <CustomSelect
            onChange={handleDeliverableSelect}
            options={DELIVERABLE_OPTIONS}
            placeholder="Select deliverable"
            disabled={isSubmitting}
          />
        </InputField>
  
        <div className="space-y-2 mt-4">
          {formData.deliverables.map((deliverable, index) => (
            <div key={index} className="flex items-center justify-between bg-[#1A1A1A]/30 px-4 py-2 rounded-lg">
              <span className="text-white">
                {DELIVERABLE_OPTIONS.find(opt => opt.value === deliverable)?.label || deliverable}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeDeliverable(deliverable)}
                className="text-[#bcee45] hover:bg-[#bcee45]/10"
                disabled={isSubmitting}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
  
      <div className="mt-6">
  <label className="text-md font-medium text-white block mb-2">
    Custom Fields
  </label>
  <CustomFieldInput
    fields={formData.customFields}
    onAdd={(field) => setFormData(prev => ({
      ...prev,
      customFields: [...(prev.customFields || []), field]
    }))}
    onRemove={(index) => setFormData(prev => ({
      ...prev,
      customFields: prev.customFields.filter((_, i) => i !== index)
    }))}
    disabled={isSubmitting}
  />
</div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="border-[#bcee45]/20 text-[#bcee45] hover:border-[#bcee45]/40"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!formData.name || !formData.price || formData.deliverables.length === 0 || isSubmitting}
          className="min-w-[140px] bg-[#bcee45] text-black hover:bg-[#bcee45]/90"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Adding...</span>
            </div>
          ) : (
            'Add Package'
          )}
        </Button>
      </div>
    </motion.form>
  );
};

const PackageCard = ({ package: pkg, onDelete }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-6 bg-[#1A1A1A] rounded-2xl border border-[#333333]"
  >
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-lg font-semibold text-white mb-1">{pkg.name}</h3>
        <div className="text-2xl font-bold text-[#bcee45]">₹{pkg.price}</div>
        {pkg.openToBarter && (
          <span className="text-sm text-[#bcee45]/80 mt-1">Open to Barter</span>
        )}
      </div>
      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-[#bcee45] hover:bg-[#bcee45]/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-card border-primary/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Delete Package
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Are you sure you want to delete this package? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#bcee45]/20 text-[#bcee45] hover:border-[#bcee45]/40">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDelete(pkg._id)}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    
    {/* Deliverables */}
    <div className="space-y-2">
      {pkg.deliverables.map((deliverable, index) => (
        <div key={index} className="flex items-center gap-2 text-white">
          <div className="w-1.5 h-1.5 rounded-full bg-[#bcee45]" />
          {DELIVERABLE_OPTIONS.find(opt => opt.value === deliverable)?.label || deliverable}
        </div>
      ))}
    </div>

    {/* Custom Fields */}
    {pkg.customFields && pkg.customFields.length > 0 && (
      <div className="mt-4 pt-4 border-t border-[#333333] space-y-2">
        {pkg.customFields.map((field, index) => (
          <div key={index} className="flex items-center gap-2 text-white">
            <div className="w-1.5 h-1.5 rounded-full bg-[#bcee45]" />
            <span className="text-[#888888]">{field.label}:</span>
            <span>{field.value}</span>
          </div>
        ))}
      </div>
    )}
  </motion.div>
);

export default function PricingPage() {
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const [packages, setPackages] = useState([]);
  const [showCompletion, setShowCompletion] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await getMediaKitPackages();
      if (response.statusCode === 200) {
        setPackages(response.data.items);
      }
    } catch (err) {
      toast.error("Failed to load packages");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (packageData) => {
    try {
      setIsSubmitting(true);
      console.log("packageData", packageData);
      const response = await addMediaKitPackage(packageData);
      if (response.statusCode === 201) {
        setPackages(prev => [response.data.package, ...prev]);
        setIsAdding(false);
        toast.success("Package added successfully");
      }
    } catch (error) {
      toast.error("Failed to add package");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (packageId) => {
    try {
      const response = await deleteMediaKitPackage(packageId);
      if (response.statusCode === 200) {
        setPackages(prev => prev.filter(p => p._id !== packageId));
        toast.success("Package deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete package");
    }
  };

  const handleComplete = () => {
    if (packages.length > 0) {
      setShowCompletion(true);
    } else {
      toast.error("Please add at least one package");
    }
  };

  const handleBack = () => {
    router.push('/complete-media-kit/collaborations');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F] flex items-center justify-center">
        <div className="flex items-center gap-2 text-[#bcee45]">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-lg">Loading packages...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F]">
      <EnhancedHeader
        currentStep={CURRENT_STEP}
        totalSteps={TOTAL_STEPS}
        onBackClick={handleBack}
      />

      {/* Progress Bar */}
      <div className="w-full h-1 bg-[#bcee45]/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(CURRENT_STEP / TOTAL_STEPS) * 100}%` }}
          className="h-full bg-[#bcee45]"
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Main Content */}
      <main className="max-w-xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Set Your Packages
          </h2>
          <p className="text-[#888888]">
            Create packages to showcase your services and pricing
          </p>
        </div>

        {!isAdding && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAdding(true)}
            className="w-full p-6 bg-[#1A1A1A]/60 backdrop-blur-md rounded-2xl border border-[#bcee45]/20 text-[#bcee45] flex items-center justify-center gap-2 mb-6"
          >
            <Package className="w-5 h-5" />
            Add Package
          </motion.button>
        )}

        <div className="space-y-4">
          {isAdding && (
            <PackageForm
              onSubmit={handleSubmit}
              onCancel={() => setIsAdding(false)}
              isSubmitting={isSubmitting}
            />
          )}
          {packages.map(pkg => (
            <PackageCard
              key={pkg._id}
              package={pkg}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleComplete}
            disabled={packages.length === 0}
            className="gap-2 bg-[#bcee45] text-black hover:bg-[#bcee45]/90"
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
                onContinue={() => {
                  router.push('/complete-media-kit/personal-info');
                }}
              />
            )}
          </AnimatePresence>
        </main>
      </div>
    );
  }