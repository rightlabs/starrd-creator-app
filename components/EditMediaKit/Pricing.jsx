'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  Plus, 
  X, 
  DollarSign,
  Pencil,
  Trash2,
  Check
} from 'lucide-react';
import { Card } from '@/components/ui/card';

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
            type="number"
            value={formData.price}
            onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
            className="w-full px-8 py-3 bg-[#1A1A1A]/60 rounded-xl border-2 border-[#bcee45]/20 text-white placeholder:text-[#888888] focus:border-[#bcee45] transition-colors outline-none"
            placeholder="299"
            min="0"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="text-sm md:text-base font-medium text-white block mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="w-full px-4 py-3 bg-[#1A1A1A]/60 rounded-xl border-2 border-[#bcee45]/20 text-white placeholder:text-[#888888] focus:border-[#bcee45] transition-colors outline-none resize-none"
          placeholder="Describe what's included in this package"
          rows={3}
        />
      </div>

      {/* Deliverables */}
      <div>
        <label className="text-sm md:text-base font-medium text-white block mb-2">
          Deliverables
        </label>
        <div className="space-y-3">
          {formData.deliverables.map((deliverable, index) => (
            <div key={index} className="flex gap-2">
              <input
                value={deliverable}
                onChange={(e) => updateDeliverable(index, e.target.value)}
                className="w-full px-4 py-3 bg-[#1A1A1A]/60 rounded-xl border-2 border-[#bcee45]/20 text-white placeholder:text-[#888888] focus:border-[#bcee45] transition-colors outline-none"
                placeholder="e.g., 1 Instagram Post"
              />
              {formData.deliverables.length > 1 && (
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => removeDeliverable(index)}
                  className="p-3 rounded-lg border border-[#333333] text-red-400 hover:border-red-400/50"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          ))}
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={addDeliverable}
            className="w-full p-3 rounded-xl border border-dashed border-[#333333] text-[#bcee45] hover:border-[#bcee45]/50 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Deliverable
          </motion.button>
        </div>
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

    {pkg.description && (
      <p className="text-[#888888] text-sm mb-4">{pkg.description}</p>
    )}

    <div className="space-y-2">
      {pkg.deliverables.map((deliverable, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <Check className="w-4 h-4 text-[#bcee45]" />
          <span className="text-white">{deliverable}</span>
        </div>
      ))}
    </div>
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