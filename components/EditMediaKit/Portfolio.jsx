'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, 
  Music, 
  Image as ImageIcon, 
  Upload, 
  Plus,
  X,
  Edit2,
  Play,
  Pause,
  Pencil,
  Trash2
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

const mediaTypes = [
  { id: 'video', label: 'Video', icon: Video },
  { id: 'audio', label: 'Audio', icon: Music },
  { id: 'image', label: 'Image', icon: ImageIcon }
];

const contentTypes = [
  { id: 'product-review', label: '✍️ Product Review' },
  { id: 'testimonial', label: '💬 Testimonial' },
  { id: 'misc', label: '🛠️ Miscellaneous' }
];

const categories = [
  { id: 'lifestyle', label: '🏡 Lifestyle' },
  { id: 'fashion', label: '👗 Fashion' },
  { id: 'beauty', label: '💅 Beauty' },
  { id: 'tech', label: '🖥️ Technology' },
  { id: 'food', label: '🍔 Food & Beverage' }
];

const PortfolioCard = ({ item, onEdit, onRemove }) => {
  const Icon = mediaTypes.find(type => type.id === item.mediaType)?.icon || ImageIcon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="rounded-xl bg-[#1A1A1A] border border-[#333333] overflow-hidden group transition-all hover:border-[#bcee45]/50"
    >
      {/* Media Preview */}
      <div className="aspect-video relative">
        {item.fileUrl ? (
          <>
            <Image
              src={item.fileUrl}
              alt={item.contentType}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[#242424] flex items-center justify-center">
            <Icon className="w-8 h-8 text-[#666666]" />
          </div>
        )}

        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <div className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md flex items-center gap-2">
            <Icon className="w-4 h-4 text-[#bcee45]" />
            <span className="text-xs font-medium text-white">
              {mediaTypes.find(type => type.id === item.mediaType)?.label}
            </span>
          </div>
        </div>
      </div>

      {/* Content Info */}
      <div className="p-4 space-y-3">
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 rounded-md bg-[#bcee45]/10 text-[#bcee45] text-xs">
            {contentTypes.find(type => type.id === item.contentType)?.label}
          </span>
          <span className="px-2 py-1 rounded-md bg-[#242424] text-white/60 text-xs">
            {categories.find(cat => cat.id === item.category)?.label}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={onEdit}
            className="text-xs text-[#bcee45] hover:underline flex items-center gap-1.5"
          >
            <Pencil className="w-3 h-3" />
            Edit Details
          </button>
          <button
            onClick={onRemove}
            className="text-xs text-red-400 hover:underline flex items-center gap-1.5"
          >
            <Trash2 className="w-3 h-3" />
            Remove
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const AddPortfolioCard = ({ onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="aspect-[4/3] rounded-xl border-2 border-dashed border-[#333333] flex flex-col items-center justify-center gap-3 text-[#888888] hover:border-[#bcee45] hover:text-[#bcee45] transition-all group"
  >
    <div className="w-12 h-12 rounded-xl bg-[#242424] flex items-center justify-center group-hover:bg-[#bcee45]/10">
      <Plus className="w-6 h-6" />
    </div>
    <div className="space-y-1 text-center">
      <p className="font-medium">Add Portfolio Item</p>
      <p className="text-xs text-[#666666]">Upload images, videos, or audio</p>
    </div>
  </motion.button>
);

const EditPortfolioModal = ({ item, onSave, onClose }) => {
  const [editData, setEditData] = useState(item || {
    mediaType: 'image',
    contentType: '',
    category: '',
    file: null,
    fileUrl: ''
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50"
    >
      <motion.div 
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="w-full max-w-lg bg-[#1A1A1A] rounded-2xl border border-[#333333] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#333333]">
          <h3 className="text-lg font-semibold text-white">
            {item ? 'Edit Portfolio Item' : 'Add Portfolio Item'}
          </h3>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Media Upload */}
          <div className="space-y-2">
            <label className="text-sm text-[#888888]">Media Type</label>
            <div className="grid grid-cols-3 gap-3">
              {mediaTypes.map(type => (
                <motion.button
                  key={type.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setEditData(prev => ({ ...prev, mediaType: type.id }))}
                  className={`p-3 rounded-xl border ${
                    editData.mediaType === type.id
                      ? 'border-[#bcee45] bg-[#bcee45]/10'
                      : 'border-[#333333]'
                  } flex items-center gap-2`}
                >
                  <type.icon className={`w-4 h-4 ${
                    editData.mediaType === type.id ? 'text-[#bcee45]' : 'text-white/60'
                  }`} />
                  <span className={`text-sm ${
                    editData.mediaType === type.id ? 'text-white' : 'text-white/60'
                  }`}>
                    {type.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Media Upload Area */}
          <div
            onClick={() => document.getElementById('portfolio-file').click()}
            className="relative aspect-video rounded-xl border-2 border-dashed border-[#bcee45]/20 overflow-hidden group cursor-pointer"
          >
            {editData.fileUrl ? (
              <>
                <Image
                  src={editData.fileUrl}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Upload className="w-8 h-8 text-white" />
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-[#bcee45]/60 hover:text-[#bcee45] transition-colors">
                <Upload className="w-8 h-8 mb-2" />
                <span className="text-sm">Upload {editData.mediaType}</span>
                <p className="text-xs text-white/40 mt-2">
                  {editData.mediaType === 'video' && 'MP4, WebM up to 100MB'}
                  {editData.mediaType === 'audio' && 'MP3, WAV up to 50MB'}
                  {editData.mediaType === 'image' && 'JPG, PNG up to 10MB'}
                </p>
              </div>
            )}
            <input
              id="portfolio-file"
              type="file"
              accept={
                editData.mediaType === 'video' ? 'video/*' :
                editData.mediaType === 'audio' ? 'audio/*' :
                'image/*'
              }
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setEditData(prev => ({
                    ...prev,
                    file,
                    fileUrl: URL.createObjectURL(file)
                  }));
                }
              }}
              className="hidden"
            />
          </div>

          {/* Content Type & Category */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-[#888888]">Content Type</label>
              <div className="space-y-2">
                {contentTypes.map(type => (
                  <motion.button
                    key={type.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setEditData(prev => ({ ...prev, contentType: type.id }))}
                    className={`w-full p-3 rounded-xl border ${
                      editData.contentType === type.id
                        ? 'border-[#bcee45] bg-[#bcee45]/10'
                        : 'border-[#333333]'
                    } text-left text-sm ${
                      editData.contentType === type.id ? 'text-white' : 'text-white/60'
                    }`}
                  >
                    {type.label}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-[#888888]">Category</label>
              <div className="space-y-2">
                {categories.map(cat => (
                  <motion.button
                    key={cat.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setEditData(prev => ({ ...prev, category: cat.id }))}
                    className={`w-full p-3 rounded-xl border ${
                      editData.category === cat.id
                        ? 'border-[#bcee45] bg-[#bcee45]/10'
                        : 'border-[#333333]'
                    } text-left text-sm ${
                      editData.category === cat.id ? 'text-white' : 'text-white/60'
                    }`}
                  >
                    {cat.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#333333] flex justify-end gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#242424] text-white hover:bg-[#333333]"
          >
            Cancel
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (editData.mediaType && editData.contentType && editData.category && editData.file) {
                onSave(editData);
              }
            }}
            className={`px-4 py-2 rounded-lg ${
              editData.mediaType && editData.contentType && editData.category && editData.file
                ? 'bg-[#bcee45] text-black hover:opacity-90'
                : 'bg-[#333333] text-[#888888] cursor-not-allowed'
            }`}
            disabled={!editData.mediaType || !editData.contentType || !editData.category || !editData.file}
          >
            {item ? 'Save Changes' : 'Add Item'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PortfolioSection = ({
  portfolio = [],
  editForm,
  isEditing,
  setEditForm,
  handleEditToggle,
  handleSaveSection
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleAddItem = (item) => {
    setEditForm(prev => ({
      ...prev,
      portfolio: [...(prev.portfolio || []), { ...item, id: Date.now() }]
    }));
    setShowEditModal(false);
  };

  const handleEditItem = (item) => {
    setEditForm(prev => ({
      ...prev,
      portfolio: prev.portfolio.map(p => p.id === item.id ? item : p)
    }));
    setShowEditModal(false);
    setEditingItem(null);
  };

  const handleRemoveItem = (id) => {
    setEditForm(prev => ({
      ...prev,
      portfolio: prev.portfolio.filter(item => item.id !== id)
    }));
  };

  const renderEditView = () => (
    <motion.div className="space-y-6">
      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 gap-4">
        {editForm.portfolio?.map((item) => (
          <PortfolioCard
            key={item.id}
            item={item}
            onEdit={() => {
              setEditingItem(item);
              setShowEditModal(true);
            }}
            onRemove={() => handleRemoveItem(item.id)}
          />
        ))}
        <AddPortfolioCard onClick={() => {
          setEditingItem(null);
          setShowEditModal(true);
        }} />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleEditToggle('portfolio')}
          className="px-4 py-2 rounded-lg bg-[#242424] hover:bg-[#333333] text-white"
        >
          Cancel
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSaveSection('portfolio')}
          className="px-4 py-2 rounded-lg bg-[#bcee45] text-black hover:opacity-90"
        >
          Save Changes
        </motion.button>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && (
          <EditPortfolioModal
            item={editingItem}
            onSave={editingItem ? handleEditItem : handleAddItem}
            onClose={() => {
              setShowEditModal(false);
              setEditingItem(null);
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );

  const renderViewMode = () => (
    <div className="grid grid-cols-1 gap-4">
      {portfolio?.map((item) => (
        <PortfolioCard
          key={item.id}
          item={item}
          onEdit={() => handleEditToggle('portfolio')}
          onRemove={() => {}}
        />
      ))}
      {portfolio?.length === 0 && (
        <div className="col-span-2 py-12 text-center">
          <p className="text-[#888888]">No portfolio items added yet.</p>
        </div>
      )}
    </div>
  );

  return (
    <Card className="p-6 bg-[#1A1A1A] border-[#333333]">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-white">Portfolio Items</h3>
          <p className="text-sm text-[#888888]">
            Showcase your best content and previous work
          </p>
        </div>
      </div>
      {isEditing ? renderEditView() : renderViewMode()}
    </Card>
  );
};

export default PortfolioSection;