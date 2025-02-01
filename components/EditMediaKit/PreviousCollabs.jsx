'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  X, 
  Plus, 
  Building2, 
  ChevronDown,
  Pencil,
  Trash2
} from 'lucide-react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

const COLLABORATION_TYPES = [
  { value: 'sponsored', label: 'Sponsored Post' },
  { value: 'ambassador', label: 'Brand Ambassador' },
  { value: 'affiliate', label: 'Affiliate Partnership' },
  { value: 'review', label: 'Product Review' }
];

const CATEGORIES = [
  { value: 'lifestyle', label: 'Lifestyle' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'beauty', label: 'Beauty' },
  { value: 'tech', label: 'Technology' },
  { value: 'food', label: 'Food & Beverage' }
];

const FileUploadButton = ({ id, accept, value, onChange, icon: Icon, label, sublabel }) => (
  <div className="relative w-full h-full">
    {value ? (
      <div className="relative w-full h-full group">
        <Image
          src={typeof value === 'string' ? value : URL.createObjectURL(value)}
          alt={label}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            type="button"
            onClick={() => onChange(null)}
            className="p-2 bg-[#bcee45] rounded-xl text-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    ) : (
      <button
        type="button"
        onClick={() => document.getElementById(id).click()}
        className="absolute inset-0 flex flex-col items-center justify-center text-[#bcee45]/60 hover:text-[#bcee45] transition-colors"
      >
        {Icon && <Icon className="w-6 h-6 mb-2" />}
        <span className="text-sm">{label}</span>
        {sublabel && <p className="text-xs text-[#888888] mt-1">{sublabel}</p>}
      </button>
    )}
    <input
      id={id}
      type="file"
      accept={accept}
      onChange={(e) => onChange(e.target.files[0])}
      className="hidden"
    />
  </div>
);

const CollaborationCard = ({ collaboration, onEdit, onDelete }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-4 md:p-6 bg-[#1A1A1A] rounded-xl border border-[#333333] overflow-hidden group hover:border-[#bcee45]/20 transition-all"
  >
    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
      {/* Brand Logo */}
      {collaboration.brandLogo ? (
        <div className="w-16 h-16 rounded-xl overflow-hidden relative bg-white shrink-0">
          <Image
            src={typeof collaboration.brandLogo === 'string' 
              ? collaboration.brandLogo 
              : URL.createObjectURL(collaboration.brandLogo)
            }
            alt={collaboration.brandName}
            fill
            className="object-contain p-2"
          />
        </div>
      ) : (
        <div className="w-16 h-16 rounded-xl bg-[#bcee45]/10 flex items-center justify-center shrink-0">
          <Building2 className="w-8 h-8 text-[#bcee45]" />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-white font-medium mb-2 text-sm md:text-base">{collaboration.brandName}</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-[#bcee45]/10 rounded-lg text-[#bcee45] text-xs">
                {COLLABORATION_TYPES.find(t => t.value === collaboration.type)?.label}
              </span>
              <span className="px-2 py-1 bg-[#bcee45]/10 rounded-lg text-[#bcee45] text-xs">
                {CATEGORIES.find(c => c.value === collaboration.category)?.label}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(collaboration)}
              className="p-2 rounded-lg border border-[#333333] text-[#888888] hover:border-[#bcee45]/50 hover:text-[#bcee45]"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(collaboration.id)}
              className="p-2 rounded-lg border border-[#333333] text-red-400 hover:border-red-400/50"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Media Preview */}
        {collaboration.mediaFile && (
          <div className="mt-4 aspect-video rounded-xl overflow-hidden relative">
            <Image
              src={typeof collaboration.mediaFile === 'string' 
                ? collaboration.mediaFile 
                : URL.createObjectURL(collaboration.mediaFile)
              }
              alt="Collaboration Media"
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

const CustomSelect = ({ value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full px-4 py-3 bg-[#1A1A1A]/60 rounded-xl border-2 border-[#bcee45]/20 hover:border-[#bcee45] focus:border-[#bcee45] transition-colors cursor-pointer flex justify-between items-center text-white"
      >
        <span className={value ? "text-white" : "text-[#888888]"}>
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
            className="absolute z-50 top-full left-0 right-0 mt-2 bg-[#1A1A1A] rounded-xl overflow-hidden shadow-lg border border-[#333333]"
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value);
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

const AddCollaborationForm = ({ existingData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(existingData || {
    brandName: '',
    brandLogo: null,
    type: '',
    category: '',
    mediaFile: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, id: existingData?.id || Date.now() });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-6 bg-[#1A1A1A] rounded-xl border border-[#333333]"
      onSubmit={handleSubmit}
    >
      {/* Brand Info */}
      <div>
        <label className="text-sm md:text-base font-medium text-white block mb-2">Brand Name</label>
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
        <label className="text-sm md:text-base font-medium text-white block mb-2">Brand Logo</label>
        <div className="relative bg-[#1A1A1A]/60 w-full h-32 rounded-xl border-2 border-dashed border-[#bcee45]/20 overflow-hidden">
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
        <div className="space-y-2">
          <label className="text-sm md:text-base font-medium text-white">Type</label>
          <CustomSelect
            value={formData.type}
            onChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
            options={COLLABORATION_TYPES}
            placeholder="Select Type"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm md:text-base font-medium text-white">Category</label>
          <CustomSelect
            value={formData.category}
            onChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            options={CATEGORIES}
            placeholder="Select Category"
          />
        </div>
      </div>

      {/* Media File */}
      <div>
        <label className="text-sm md:text-base font-medium text-white block mb-2">
          Collaboration Media
        </label>
        <div className="relative bg-[#1A1A1A]/60 aspect-video rounded-xl border-2 border-dashed border-[#bcee45]/20 overflow-hidden">
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
        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={onCancel}
          className="px-4 py-2 rounded-lg bg-[#242424] hover:bg-[#333333] text-white"
        >
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-lg bg-[#bcee45] text-black hover:opacity-90"
        >
          {existingData ? 'Save Changes' : 'Add Collaboration'}
        </motion.button>
      </div>
    </motion.form>
  );
};

const CollaborationsSection = ({
  collaborations,
  editForm,
  isEditing,
  setEditForm,
  handleEditToggle,
  handleSaveSection
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCollaboration, setEditingCollaboration] = useState(null);

  const handleAddCollaboration = (collaboration) => {
    setEditForm(prev => ({
      ...prev,
      collaborations: [...(prev.collaborations || []), collaboration]
    }));
    setShowAddForm(false);
  };

  const handleEditCollaboration = (collaboration) => {
    setEditForm(prev => ({
      ...prev,
      collaborations: prev.collaborations.map(c => 
        c.id === collaboration.id ? collaboration : c
      )
    }));
    setEditingCollaboration(null);
  };

  const handleDeleteCollaboration = (id) => {
    setEditForm(prev => ({
      ...prev,
      collaborations: prev.collaborations.filter(c => c.id !== id)
    }));
  };

  const renderEditView = () => (
    <motion.div className="space-y-6">
      {/* Add New Button */}
      {!showAddForm && !editingCollaboration && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddForm(true)}
          className="w-full p-4 rounded-xl border border-[#333333] text-[#bcee45] flex items-center justify-center gap-2 hover:border-[#bcee45]/50"
        >
          <Plus className="w-5 h-5" />
          Add Collaboration
        </motion.button>
      )}

      {/* Add/Edit Form */}
      {(showAddForm || editingCollaboration) && (
        <AddCollaborationForm
          existingData={editingCollaboration}
          onSubmit={editingCollaboration ? handleEditCollaboration : handleAddCollaboration}
          onCancel={() => {
            setShowAddForm(false);
            setEditingCollaboration(null);
          }}
        />
      )}

      {/* Collaborations List */}
      <div className="space-y-4">
        {editForm.collaborations?.map(collab => (
          <CollaborationCard
            key={collab.id}
            collaboration={collab}
            onEdit={(collab) => setEditingCollaboration(collab)}
            onDelete={handleDeleteCollaboration}
          />
        ))}
      </div>

      {/* Action Buttons */}
      {!showAddForm && !editingCollaboration && (
        <div className="flex justify-end gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleEditToggle('collaborations')}
            className="px-4 py-2 rounded-lg bg-[#242424] hover:bg-[#333333] text-white"
          >
            Cancel
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSaveSection('collaborations')}
            className="px-4 py-2 rounded-lg bg-[#bcee45] text-black hover:opacity-90"
          >
            Save Changes
          </motion.button>
        </div>
      )}
    </motion.div>
  );

  const renderViewMode = () => (
    <div className="space-y-4">
      {collaborations?.length > 0 ? (
        collaborations.map(collab => (
          <CollaborationCard
            key={collab.id}
            collaboration={collab}
            onEdit={() => handleEditToggle('collaborations')}
            onDelete={() => {}}
          />
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-[#888888]">No collaborations added yet.</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleEditToggle('collaborations')}
            className="mt-4 px-4 py-2 rounded-lg bg-[#bcee45]/10 text-[#bcee45] hover:bg-[#bcee45]/20"
          >
            Add Your First Collaboration
          </motion.button>
        </div>
      )}
    </div>
  );

  return (
    <Card className="p-6 bg-[#1A1A1A] border-[#333333]">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-white">Previous Collaborations</h3>
          <p className="text-sm text-[#888888]">
            Showcase your brand collaborations and sponsored content
          </p>
        </div>
      </div>
      {isEditing ? renderEditView() : renderViewMode()}
    </Card>
  );
};

export default CollaborationsSection;