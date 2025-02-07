'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Plus, X, Pencil, Trash2, Check, ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '../ui/button';

const DELIVERABLE_OPTIONS = [
  { value: 'story', label: 'Story' },
  { value: 'reel', label: 'Reel' },
  { value: 'carousel', label: 'Carousel Post' },
  { value: 'shoot', label: 'Shoot (8 hours)' }
];

const INITIAL_PACKAGE = {
  name: '',
  price: '',
  deliverables: [],
  customFields: [],
  openToBarter: false
};

const CustomSelect = ({ onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <div className="relative z-50">
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
            className="absolute w-full left-0 top-full mt-2 bg-[#1A1A1A] rounded-xl overflow-hidden shadow-lg border border-[#bcee45]/20"
            style={{ minWidth: '100%', zIndex: 999 }}     
                  >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option)}
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

const CustomFieldInput = ({ onAdd, onRemove, fields = [] }) => {
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
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
              className="w-full px-4 py-3 bg-[#1A1A1A]/60 rounded-xl border-2 border-[#bcee45]/20 text-white placeholder:text-[#888888] focus:border-[#bcee45] transition-colors outline-none"
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleAdd}
            className="text-[#bcee45] hover:bg-[#bcee45]/10"
            disabled={!label.trim() || !value.trim()}
          >
            <Plus className="w-5 h-5" />
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

const PackageForm = ({ onSubmit, onCancel, initialData = INITIAL_PACKAGE }) => {
  const [formData, setFormData] = useState({
    ...initialData,
    customFields: initialData.customFields || []
  });

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

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
    >
      {/* Package Name */}
      <div>
        <label className="text-sm md:text-base font-medium text-white block mb-2">
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
        <label className="text-sm md:text-base font-medium text-white block mb-2">
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

          {/* Deliverables */}
          <div>
        <label className="text-sm md:text-base font-medium text-white block mb-2">
          Deliverables
        </label>
        <div className="space-y-3 mb-10">
          <CustomSelect
            onChange={handleDeliverableSelect}
            options={DELIVERABLE_OPTIONS}
            placeholder="Select deliverable"
          />

<div className="space-y-2 mt-4">
          {formData.deliverables.map((deliverable, index) => (
            <div key={index} className="flex items-center justify-between bg-[#1A1A1A]/30 px-4 py-2 rounded-lg">
              <span className="text-white bg-black/50 p-2">{deliverable}</span>
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
      </div>

      {/* Open to Barter */}
      <div>
        <label className="text-sm md:text-base font-medium text-white block mb-2">
          Open to Barter
        </label>
        <div className="flex gap-3">
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => setFormData(prev => ({ ...prev, openToBarter: true }))}
            className={`flex-1 py-3 rounded-xl border-2 transition-colors ${
              formData.openToBarter
                ? 'border-[#bcee45] bg-[#bcee45]/10 text-white'
                : 'border-[#333333] text-[#888888]'
            }`}
          >
            Yes
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => setFormData(prev => ({ ...prev, openToBarter: false }))}
            className={`flex-1 py-3 rounded-xl border-2 transition-colors ${
              !formData.openToBarter
                ? 'border-[#bcee45] bg-[#bcee45]/10 text-white'
                : 'border-[#333333] text-[#888888]'
            }`}
          >
            No
          </motion.button>
        </div>
      </div>

      {/* Add Custom Fields section */}
      <div className="mt-6">
        <label className="text-sm md:text-base font-medium text-white block mb-2">
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
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
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
          disabled={!formData.name || !formData.price || formData.deliverables.length === 0}
        >
          {initialData === INITIAL_PACKAGE ? 'Add Package' : 'Save Changes'}
        </motion.button>
      </div>
    </motion.form>
  );
};

const PackageCard = ({ package: pkg, onEdit, onDelete }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-4 md:p-6 bg-[#1A1A1A] rounded-xl border border-[#333333] overflow-hidden group hover:border-[#bcee45]/20 transition-all"
  >
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-lg font-semibold text-white mb-1">{pkg.name}</h3>
        <div className="text-2xl font-bold text-[#bcee45]">₹{pkg.price}</div>
        {pkg.openToBarter && (
          <span className="text-sm text-[#bcee45]/80">Open to Barter</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onEdit(pkg)}
          className="p-2 rounded-lg border border-[#333333] text-[#888888] hover:border-[#bcee45]/50 hover:text-[#bcee45]"
        >
          <Pencil className="w-4 h-4" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onDelete(pkg.id)}
          className="p-2 rounded-lg border border-[#333333] text-red-400 hover:border-red-400/50"
        >
          <Trash2 className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  
    <div className="space-y-2">
      {pkg.deliverables.map((deliverable, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <Check className="w-4 h-4 text-[#bcee45]" />
          <span className="text-white">{deliverable}</span>
        </div>
      ))}
    </div>

    {/* Add Custom Fields display */}
    {pkg.customFields && pkg.customFields.length > 0 && (
      <div className="mt-4 pt-4 border-t border-[#333333] space-y-2">
        {pkg.customFields.map((field, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#bcee45]" />
            <span className="text-[#888888]">{field.label}:</span>
            <span className="text-white">{field.value}</span>
          </div>
        ))}
      </div>
    )}
  </motion.div>
);

const PricingSection = ({
  packages,
  editForm,
  isEditing,
  setEditForm,
  handleEditToggle,
  handleSaveSection
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);

  const handleAddPackage = (packageData) => {
    setEditForm(prev => ({
      ...prev,
      packages: [...(prev.packages || []), { ...packageData, id: Date.now() }]
    }));
    setShowAddForm(false);
  };

  const handleEditPackage = (packageData) => {
    setEditForm(prev => ({
      ...prev,
      packages: prev.packages.map(p => 
        p.id === packageData.id ? packageData : p
      )
    }));
    setEditingPackage(null);
  };

  const handleDeletePackage = (id) => {
    setEditForm(prev => ({
      ...prev,
      packages: prev.packages.filter(p => p.id !== id)
    }));
  };

  const renderEditView = () => (
    <motion.div className="space-y-6">
      {!showAddForm && !editingPackage && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddForm(true)}
          className="w-full p-4 rounded-xl border border-[#333333] text-[#bcee45] flex items-center justify-center gap-2 hover:border-[#bcee45]/50"
        >
          <Package className="w-5 h-5" />
          Add Package
        </motion.button>
      )}

      {(showAddForm || editingPackage) && (
        <PackageForm
          initialData={editingPackage || INITIAL_PACKAGE}
          onSubmit={editingPackage ? handleEditPackage : handleAddPackage}
          onCancel={() => {
            setShowAddForm(false);
            setEditingPackage(null);
          }}
        />
      )}

      {!showAddForm && !editingPackage && (
        <>
          <div className="space-y-4">
            {editForm.packages?.map(pkg => (
              <PackageCard
                key={pkg.id}
                package={pkg}
                onEdit={(pkg) => setEditingPackage(pkg)}
                onDelete={handleDeletePackage}
              />
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleEditToggle('packages')}
              className="px-4 py-2 rounded-lg bg-[#242424] hover:bg-[#333333] text-white"
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
        </>
      )}
    </motion.div>
  );

  const renderViewMode = () => (
    <div className="space-y-4">
      {packages?.length > 0 ? (
        packages.map(pkg => (
          <PackageCard
            key={pkg.id}
            package={pkg}
            onEdit={() => handleEditToggle('packages')}
            onDelete={() => {}}
          />
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-[#888888]">No packages added yet.</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleEditToggle('packages')}
            className="mt-4 px-4 py-2 rounded-lg bg-[#bcee45]/10 text-[#bcee45] hover:bg-[#bcee45]/20"
          >
            Add Your First Package
          </motion.button>
        </div>
      )}
    </div>
  );

  return (
    <Card className="p-6 bg-[#1A1A1A] border-[#333333]">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-white">Packages & Pricing</h3>
          <p className="text-sm text-[#888888]">
            Create packages to showcase your services and pricing
          </p>
        </div>
      </div>
      {isEditing ? renderEditView() : renderViewMode()}
    </Card>
  );
};

export default PricingSection;