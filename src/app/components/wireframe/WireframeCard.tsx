import { ReactNode } from 'react';

interface WireframeCardProps {
  children: ReactNode;
  className?: string;
  accentBorder?: boolean;
}

export function WireframeCard({ children, className = '', accentBorder = false }: WireframeCardProps) {
  const borderColor = accentBorder ? 'border-[#FF4400]' : 'border-[#333]';
  
  return (
    <div className={`relative bg-white rounded-[8px] ${className}`}>
      <div className="overflow-clip relative rounded-[inherit] w-full h-full p-6">
        {children}
      </div>
      <div 
        aria-hidden="true" 
        className={`absolute border-4 ${borderColor} border-solid inset-0 pointer-events-none rounded-[8px]`} 
      />
    </div>
  );
}

// Mobile device frame for showcasing work
export function WireframeDeviceFrame({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <div className={`relative bg-white rounded-[40px] ${className}`}>
      <div className="overflow-clip relative rounded-[inherit] size-full">
        {children}
      </div>
      <div 
        aria-hidden="true" 
        className="absolute border-16 border-[#1b1b1b] border-solid inset-[-16px] pointer-events-none rounded-[56px]" 
      />
    </div>
  );
}

// Text container with wireframe styling
export function WireframeTextBox({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <div className={`relative bg-white rounded-[4px] ${className}`}>
      <div className="overflow-clip relative rounded-[inherit] w-full h-full p-4">
        <div className="font-['Patrick_Hand',sans-serif] text-[#333] text-[18px] leading-[24px]">
          {children}
        </div>
      </div>
      <div 
        aria-hidden="true" 
        className="absolute border-4 border-[#333] border-solid inset-0 pointer-events-none rounded-[4px]" 
      />
    </div>
  );
}
