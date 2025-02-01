'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Package, Plus, X, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { StepCompletion } from '@/components/MediaKitStepCompletion';
import { useRouter } from 'next/navigation';
import EnhancedHeader from '@/components/MediaKitHeader';

const TOTAL_STEPS = 6;
const CURRENT_STEP = 5;

const INITIAL_PACKAGE = {
  name: '',
  description: '',
  price: '',
  deliverables: ['']
};

const PackageForm = ({ onSubmit, onCancel, initialData = INITIAL_PACKAGE }) => {
  const [formData, setFormData] = useState(initialData);

  const addDeliverable = () => {
    setFormData(prev => ({
      ...prev,
      deliverables: [...prev.deliverables, '']
    }));
  };

  const removeDeliverable = (index) => {
    setFormData(prev => ({
      ...prev,
      deliverables: prev.deliverables.filter((_, i) => i !== index)
    }));
  };

  const updateDeliverable = (index, value) => {
    setFormData(prev => ({
      ...prev,
      deliverables: prev.deliverables.map((item, i) => i === index ? value : item)
    }));
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-6 bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F] rounded-2xl border border-border"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
    >
      {/* Package Name */}
      <div>
        <label className="text-md font-medium text-white block mb-2">Package Name</label>
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
        <label className="text-md font-medium text-white block mb-2">Price</label>
        <div className="relative">
          {/* <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" /> */}
          <input
            required
            type="number"
            value={formData.price}
            onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
            className="w-full px-4 py-3 bg-[#1A1A1A]/60 rounded-xl border-2 border-[#bcee45]/20 text-white placeholder:text-[#888888] focus:border-[#bcee45] transition-colors outline-none"
            placeholder=" ₹299"
            min="0"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="text-md font-medium text-white block mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="w-full px-4 py-3 bg-[#1A1A1A]/60 rounded-xl border-2 border-[#bcee45]/20 text-white placeholder:text-[#888888] focus:border-[#bcee45] transition-colors outline-none"
          placeholder="Describe what's included in this package"
        />
      </div>

      {/* Deliverables */}
      <div>
        <label className="text-md font-medium text-white block mb-2">Deliverables</label>
        <div className="space-y-3">
          {formData.deliverables.map((deliverable, index) => (
            <div key={index} className="flex gap-2">
              <input
                value={deliverable}
                onChange={(e) => updateDeliverable(index, e.target.value)}
                className="w-full px-4 py-3 bg-[#1A1A1A]/60  rounded-xl border-2 border-[#bcee45]/20 text-white placeholder:text-[#888888] focus:border-[#bcee45] transition-colors outline-none"
                placeholder="e.g., 1 Instagram Post"
              />
              {formData.deliverables.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeDeliverable(index)}
                  className="text-primary hover:bg-primary/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addDeliverable}
            className="w-full gap-2 border-dashed text-primary border-border hover:border-primary hover:bg-primary/10"
          >
            <Plus className="w-4 h-4" />
            Add Deliverable
          </Button>
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
    className="p-6 bg-black rounded-2xl border border-border"
  >
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-lg font-semibold text-white mb-1">{pkg.name}</h3>
        <div className="text-2xl font-bold text-primary">₹{pkg.price}</div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(pkg.id)}
        className="text-primary hover:bg-primary/10"
      >
        <X className="w-5 h-5" />
      </Button>
    </div>
    {pkg.description && (
      <p className="text-muted-foreground text-md mb-4">{pkg.description}</p>
    )}
    <div className="space-y-2">
      {pkg.deliverables.map((deliverable, index) => (
        <div key={index} className="flex items-center gap-2 text-white">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
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

  // Handle back navigation
  const handleBack = () => {
    // Get the previous step from mediaKitSteps
    const previousStep = mediaKitSteps[CURRENT_STEP - 2];
    if (previousStep) {
      // If previous step has slides, go to its last slide
      if (previousStep.totalSlides > 0) {
        router.push(`${previousStep.path}?slide=${previousStep.totalSlides - 1}`);
      } else {
        router.push(previousStep.path);
      }
    } else {
      router.push('/dashboard');
    }
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
      <main className="max-w-xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Set Your Packages
          </h2>
          <p className="text-muted-foreground">
            Create packages to showcase your services and pricing
          </p>
        </div>

        {!isAdding && (
         <motion.button
         whileHover={{ scale: 1.02 }}
         whileTap={{ scale: 0.98 }}
         onClick={() => setIsAdding(true)}
         className="w-full p-6 bg-card/60 backdrop-blur-md rounded-2xl border border-primary/20 text-primary flex items-center justify-center gap-2 mb-6"
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