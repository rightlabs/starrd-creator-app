'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Package, Plus, X, DollarSign, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StepCompletion } from '@/components/MediaKitStepCompletion';
import { useRouter } from 'next/navigation';
import EnhancedHeader from '@/components/MediaKitHeader';

const TOTAL_STEPS = 6;
const CURRENT_STEP = 5;

const INITIAL_PACKAGE = {
  name: '',
  price: '',
  deliverables: [],
  openToBarter: false
};

const DELIVERABLE_OPTIONS = [
  { value: 'story', label: 'Story' },
  { value: 'reel', label: 'Reel' },
  { value: 'carousel', label: 'Carousel Post' },
  { value: 'shoot', label: 'Shoot (8 hours)' }
];

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

const PackageForm = ({ onSubmit, onCancel, initialData = INITIAL_PACKAGE }) => {
  const [formData, setFormData] = useState(initialData);

  const handleDeliverableSelect = (option) => {
    if (!formData.deliverables.includes(option.label)) {
      setFormData(prev => ({
        ...prev,
        deliverables: [...prev.deliverables, option.label]
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
        <InputField label="Deliverables" >
          <CustomSelect
            onChange={handleDeliverableSelect}
            options={DELIVERABLE_OPTIONS}
            placeholder="Select deliverable"
          />
        </InputField>

        {/* Selected Deliverables */}
        <div className="space-y-2 mt-4">
          {formData.deliverables.map((deliverable, index) => (
            <div key={index} className="flex items-center justify-between bg-[#1A1A1A]/30 px-4 py-2 rounded-lg">
              <span className="text-white">{deliverable}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeDeliverable(deliverable)}
                className="text-[#bcee45] hover:bg-[#bcee45]/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-[#bcee45]/20 text-[#bcee45] hover:border-[#bcee45]/40"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-[#bcee45] text-black hover:bg-[#bcee45]/90"
          disabled={!formData.name || !formData.price || formData.deliverables.length === 0}
        >
          Add Package
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
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(pkg.id)}
        className="text-[#bcee45] hover:bg-[#bcee45]/10"
      >
        <X className="w-5 h-5" />
      </Button>
    </div>
    <div className="space-y-2">
      {pkg.deliverables.map((deliverable, index) => (
        <div key={index} className="flex items-center gap-2 text-white">
          <div className="w-1.5 h-1.5 rounded-full bg-[#bcee45]" />
          {deliverable}
        </div>
      ))}
    </div>
  </motion.div>
);

export default function PricingPage() {
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const [packages, setPackages] = useState([]);
  const [showCompletion, setShowCompletion] = useState(false);

  const handleSubmit = (packageData) => {
    setPackages(prev => [...prev, { ...packageData, id: Date.now() }]);
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    setPackages(prev => prev.filter(p => p.id !== id));
  };

  const handleComplete = () => {
    if (packages.length > 0) {
      setShowCompletion(true);
    }
  };

  const handleBack = () => {
    router.push('/dashboard');
  };

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
            />
          )}
          {packages.map(pkg => (
            <PackageCard
              key={pkg.id}
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
              onContinue={() => {
                window.location.href = '/complete-media-kit/personal-info';
              }}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}