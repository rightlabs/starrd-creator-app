import React from 'react';
import { Eye } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const PreviewButton = ({ label = "Preview Media Kit" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router=useRouter();

 const onClick = () => {

  router.push("/media-kit");


};
  return (
    <div className="fixed bottom-24 inset-x-0 flex justify-center z-40">
      <button 
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-[#98E02B] focus:ring-offset-2 focus:ring-offset-[#0A0A0A] transition-transform duration-200 ease-in-out hover:scale-105"
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#98E02B_0%,#151515_50%,#98E02B_100%)]" />
        
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#0A0A0A] px-6 py-1 text-sm font-medium backdrop-blur-3xl">
          <Eye 
            className={`w-6 h-6 mr-2 transition-transform duration-200 ${isHovered ? 'scale-110' : ''}`} 
            strokeWidth={2.5} 
            color="#98E02B"
          />
          <span className="text-[#98E02B]">{label}</span>
        </span>
      </button>
    </div>
  );
};

export default PreviewButton;