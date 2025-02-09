import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({ 
  className, 
  size = "md",
  fullScreen = false 
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const Container = ({ children }) => {
    if (fullScreen) {
      return (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          {children}
        </div>
      );
    }
    return children;
  };

  return (
    <Container>
      <div className={cn(
        "flex items-center justify-center",
        className
      )}>
        <Loader2 
          className={cn(
            "animate-spin text-primary",
            sizes[size]
          )} 
        />
      </div>
    </Container>
  );
};
