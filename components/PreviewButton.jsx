import React from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

const PreviewButton = () => {
  const router = useRouter();

  return (
    <div className="fixed bottom-24 inset-x-0 flex justify-center z-40">
      <motion.button
        onClick={() => router.push('/media-kit')}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="group relative px-6 py-3 bg-[#98FF98] rounded-full shadow-lg flex items-center gap-2.5 text-black font-medium"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Eye className="w-6 h-6" strokeWidth={2.5} />
        <span className="text-sm">Preview Media Kit</span>
        
        {/* Subtle Hover Glow */}
        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 blur-md transition-opacity -z-10" />
      </motion.button>
    </div>
  );
};

export default PreviewButton;