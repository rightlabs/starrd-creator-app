import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CustomFieldInput = ({ onAdd = () => {}, onRemove = () => {}, fields = [] }) => {
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (label.trim() && value.trim()) {
      onAdd({ label: label.trim(), value: value.trim() });
      setLabel('');
      setValue('');
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          {/* Label Input */}
          <div className="flex-1">
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Enter field label"
              className="w-full px-4 py-3 bg-[#1A1A1A]/60 rounded-xl border-2 border-[#bcee45]/20 text-white placeholder:text-[#888888] focus:border-[#bcee45] transition-colors outline-none"
            />
          </div>
          
          {/* Value Input */}
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
            type="submit"
            variant="ghost"
            size="icon"
            className="text-[#bcee45] hover:bg-[#bcee45]/10"
            disabled={!label.trim() || !value.trim()}
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </form>

      {/* Display Custom Fields */}
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

export default CustomFieldInput;