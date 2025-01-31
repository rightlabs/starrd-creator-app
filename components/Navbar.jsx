import React from 'react';
import { motion } from 'framer-motion';
import { Home, MessageSquare, User } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { 
      icon: <Home className="w-6 h-6" />, 
      label: 'Dashboard', 
      path: '/dashboard' 
    },
    { 
      icon: <MessageSquare className="w-6 h-6" />, 
      label: 'Enquiries', 
      path: '/inbox' 
    },
    { 
      icon: <User className="w-6 h-6" />, 
      label: 'Settings', 
      path: '/profile' 
    },
  ];

  return (
    <motion.div
      className="fixed bottom-0 inset-x-0 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5 }}
    >
      {/* Gradient Border */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#bcee45]/20 to-transparent" />
      
      {/* Navigation Bar */}
      <div className="bg-black/80 backdrop-blur-xl px-6 py-4">
        <div className="flex justify-between items-center max-w-md mx-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            
            return (
              <motion.button
                key={item.label}
                onClick={() => router.push(item.path)}
                className="relative flex flex-col items-center gap-1.5 px-4 py-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#bcee45]/10 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {/* Icon */}
                <span className={`relative ${
                  isActive 
                    ? 'text-[#bcee45]' 
                    : 'text-[#888888] hover:text-[#bcee45]/80'
                } transition-colors`}>
                  {item.icon}
                </span>

                {/* Label */}
                <span className={`text-xs font-medium ${
                  isActive 
                    ? 'text-[#bcee45]' 
                    : 'text-[#888888]'
                } transition-colors`}>
                  {item.label}
                </span>

                {/* Active Dot */}
             
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Bottom Safe Area (for mobile devices) */}
      <div className="h-safe-area bg-black" />
    </motion.div>
  );
};

export default Navbar;