'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Hash, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';

const CategoryButton = ({ category, selected, prefilled, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`w-full p-4 rounded-xl border ${
      selected
        ? 'bg-[#bcee45]/10 border-[#bcee45] text-white'
        : 'border-[#333333] text-[#888888] hover:border-[#bcee45]/20'
    } text-sm font-medium relative transition-colors`}
  >
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <span>{category.icon}{' '}{category.label}</span>
        {prefilled && (
          <Star className="w-3 h-3 text-[#bcee45]" />
        )}
      </div>
      {selected && (
        <CheckCircle2 className="w-4 h-4 text-[#bcee45]" />
      )}
    </div>
  </motion.button>
);

const CategoriesSection = ({
  categories = [],  // Default to empty array to prevent undefined
  editForm,
  isEditing,
  setEditForm,
  handleEditToggle,
  handleSaveSection
}) => {
  const categoryOptions = [
    { id: 'lifestyle', label: 'Lifestyle', icon: '✨' },
    { id: 'fashion', label: 'Fashion', icon: '👗' },
    { id: 'beauty', label: 'Beauty', icon: '💄' },
    { id: 'travel', label: 'Travel', icon: '✈️' },
    { id: 'food', label: 'Food', icon: '🍳' },
    { id: 'tech', label: 'Technology', icon: '💻' },
    { id: 'gaming', label: 'Gaming', icon: '🎮' },
    { id: 'fitness', label: 'Fitness', icon: '💪' },
    { id: 'education', label: 'Education', icon: '📚' },
    { id: 'youtubes', label: 'YouTuber', icon: '📹' }
  ];

  const handleCategoryToggle = (categoryId) => {
    const currentCategories = editForm.categories || [...categories];
    
    const updatedCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter(id => id !== categoryId)
      : [...currentCategories, categoryId];

    setEditForm(prev => ({
      ...prev,
      categories: updatedCategories
    }));
  };
  const CategoryCount = ({ count }) => (
    <motion.div
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      className="flex items-center gap-2 p-2  border border-[#bcee45]/20 px-4 py-2 rounded-xl"
    >
      <div className="flex items-baseline gap-1.5">
        <motion.span 
          key={count}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-semibold text-[#bcee45]"
        >
          {count}
        </motion.span>
        <span className="text-xs text-[#bcee45]/60">
          Selected
        </span>
      </div>
    </motion.div>
  );
  
  const renderEditView = () => (
    <motion.div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <div className="space-y-1">
            <p className="text-sm text-[#888888]">
              Select categories that best describe your content
            </p>
            <div className="flex items-center gap-2 text-xs text-[#bcee45]/80">
              <Star className="w-3 h-3" />
              <span>Pre-selected categories</span>
            </div>
          </div>
          <CategoryCount count={editForm.categories?.length || categories.length} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {categoryOptions.map(category => {
            const isPreSelected = categories.includes(category.id);
            const isSelected = (editForm.categories || categories).includes(category.id);
            
            return (
              <CategoryButton
                key={category.id}
                category={category}
                selected={isSelected}
                prefilled={isPreSelected}
                onClick={() => handleCategoryToggle(category.id)}
              />
            );
          })}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleEditToggle('content')}
          className="px-4 py-2 rounded-lg bg-[#242424] hover:bg-[#333333]"
        >
          Cancel
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSaveSection('categories')}
          className="px-4 py-2 rounded-lg bg-[#bcee45] text-black hover:opacity-90"
        >
          Save Changes
        </motion.button>
      </div>
    </motion.div>
  );

  const renderViewMode = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div className="space-y-1">
          <p className="text-sm text-[#888888]">Your content categories</p>
          <div className="flex items-center gap-2 text-xs text-[#bcee45]/80">
            <Star className="w-3 h-3" />
            <span>Pre-selected categories</span>
          </div>
        </div>
        <span className="text-xs bg-[#bcee45]/10 px-3 py-1 rounded-lg text-[#bcee45]">
          {categories.length} Categories
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 p-8">
        {categoryOptions
          .filter(category => categories.includes(category.id))
          .map(category => (
            <CategoryButton
              key={category.id}
              category={category}
              selected={true}
              prefilled={true}
            />
          ))}
      </div>
    </div>
  );

  return (
    <Card className="p-6 bg-[#1A1A1A] border-[#333333]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Content Categories</h3>
      </div>
      {isEditing ? renderEditView() : renderViewMode()}
    </Card>
  );
};

export default CategoriesSection;