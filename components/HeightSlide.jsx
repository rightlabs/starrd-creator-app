'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Ruler } from 'lucide-react';

const HeightInputSlide = ({ formData, setFormData }) => {
  const [heightCm, setHeightCm] = useState(formData.height || '165');
  const [heightFt, setHeightFt] = useState('5');
  const [heightIn, setHeightIn] = useState('5');
  const [unit, setUnit] = useState('cm');

  useEffect(() => {
    setFormData(prev => ({ ...prev, height: heightCm }));
  }, [heightCm]);

  const convertHeight = (value, from) => {
    if (from === 'cm') {
      const totalInches = value * 0.393701;
      const feet = Math.floor(totalInches / 12);
      const inches = Math.round(totalInches % 12);
      setHeightFt(feet.toString());
      setHeightIn(inches.toString());
    } else {
      const totalCm = (parseInt(heightFt) * 12 + parseInt(heightIn)) * 2.54;
      setHeightCm(Math.round(totalCm).toString());
    }
  };

  const handleHeightChange = (e) => {
    const value = e.target.value;
    if (unit === 'cm') {
      setHeightCm(value);
      convertHeight(value, 'cm');
    }
  };

  const handleFtChange = (e) => {
    const value = e.target.value;
    setHeightFt(value);
    convertHeight(null, 'ft');
  };

  const handleInChange = (e) => {
    const value = e.target.value;
    setHeightIn(value);
    convertHeight(null, 'ft');
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-[#1A1A1A]/60 backdrop-blur-md rounded-2xl border border-[#333333]"
      >
        {/* Unit Toggle */}
        <div className="flex justify-end mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setUnit(unit === 'cm' ? 'ft' : 'cm')}
            className="px-4 py-2 bg-[#252525] rounded-lg text-sm font-medium text-[#bcee45] hover:bg-[#bcee45]/10 transition-colors"
          >
            Switch to {unit === 'cm' ? 'ft/in' : 'cm'}
          </motion.button>
        </div>

        <div className="flex items-center justify-center mb-8">
          <Ruler className="w-16 h-16 text-[#bcee45]" />
        </div>

        {unit === 'cm' ? (
          <div className="mb-8">
            <label className="block text-md text-[#888888] mb-2">Height in centimeters</label>
            <div className="relative">
              <input
                type="number"
                value={heightCm}
                onChange={handleHeightChange}
                min="100"
                max="250"
                className="w-full text-white bg-[#252525] border border-[#333333] rounded-xl px-4 py-3 text-lg font-semibold focus:border-[#bcee45] focus:outline-none transition-colors"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888]">cm</span>
            </div>
          </div>
        ) : (
          <div className="mb-8 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-md text-[#888888] mb-2">Feet</label>
              <div className="relative">
                <input
                  type="number"
                  value={heightFt}
                  onChange={handleFtChange}
                  min="4"
                  max="8"
                  className="w-full text-white bg-[#252525] border border-[#333333] rounded-xl px-4 py-3 text-lg font-semibold focus:border-[#bcee45] focus:outline-none transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888]">ft</span>
              </div>
            </div>
            <div>
              <label className="block text-md text-[#888888] mb-2">Inches</label>
              <div className="relative">
                <input
                  type="number"
                  value={heightIn}
                  onChange={handleInChange}
                  min="0"
                  max="11"
                  className="w-full  text-white bg-[#252525] border border-[#333333] rounded-xl px-4 py-3 text-lg font-semibold focus:border-[#bcee45] focus:outline-none transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888]">in</span>
              </div>
            </div>
          </div>
        )}

        {/* Visual Height Representation */}
        <div className="flex justify-center mb-8">
          <div className="w-4 bg-[#252525] rounded-full relative" style={{ height: '200px' }}>
            <motion.div 
              className="absolute bottom-0 w-full bg-[#bcee45] rounded-full"
              style={{ 
                height: `${((parseInt(heightCm) - 100) / 150) * 100}%`,
                maxHeight: '100%'
              }}
              animate={{ height: `${((parseInt(heightCm) - 100) / 150) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Height Display */}
        <div className="text-center">
          <p className="text-2xl font-bold text-white">
            {unit === 'cm' ? (
              `${heightCm} cm`
            ) : (
              `${heightFt}'${heightIn}"`
            )}
          </p>
          <p className="text-sm text-[#888888]">
            {unit === 'cm' ? (
              `${heightFt}'${heightIn}" in feet/inches`
            ) : (
              `${heightCm} cm in centimeters`
            )}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default HeightInputSlide;