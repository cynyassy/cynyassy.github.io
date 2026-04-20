import { ReactNode } from 'react';
import svgPaths from '../../../imports/Group159/svg-uu8ws0im7y';

interface WireframeButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
}

function IconArrow() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon/Arrow">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon/Arrow">
          <path d={svgPaths.p2dd74680} fill="currentColor" id="Union" />
        </g>
      </svg>
    </div>
  );
}

export function WireframeButton({ 
  children, 
  variant = 'primary', 
  icon, 
  onClick,
  className = '' 
}: WireframeButtonProps) {
  const bgColor = variant === 'primary' 
    ? 'bg-[#FF4400] hover:bg-[#E63D00]' 
    : variant === 'secondary'
    ? 'bg-[#333] hover:bg-black'
    : 'bg-white hover:bg-gray-50';
  
  const textColor = variant === 'outline' ? 'text-[#333]' : 'text-white';
  const borderColor = variant === 'primary' 
    ? 'border-[#FF4400]' 
    : 'border-[#333]';

  return (
    <button
      onClick={onClick}
      className={`relative rounded-[4px] transition-all duration-200 ${className}`}
    >
      <div className={`${bgColor} content-stretch flex gap-[10px] items-center justify-center overflow-clip px-[24px] py-[12px] relative rounded-[inherit] w-full h-full`}>
        <div className={`flex flex-col font-['Patrick_Hand',sans-serif] justify-center leading-[0] not-italic relative shrink-0 ${textColor} text-[22px] text-center whitespace-nowrap`}>
          <p className="leading-[28px]">{children}</p>
        </div>
        {icon || (variant === 'primary' && <IconArrow />)}
      </div>
      <div aria-hidden="true" className={`absolute border-4 ${borderColor} border-solid inset-0 pointer-events-none rounded-[4px]`} />
    </button>
  );
}

// Card button variant for grid layouts
export function WireframeCardButton({ 
  title, 
  description, 
  icon,
  onClick,
  className = '' 
}: { 
  title: string; 
  description?: string; 
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`bg-white h-full relative rounded-[4px] transition-all duration-200 hover:scale-105 ${className}`}
    >
      <div className="overflow-clip relative rounded-[inherit] size-full p-6 flex flex-col items-center justify-center gap-3">
        {icon && (
          <div className="overflow-clip relative shrink-0 size-[24px]">
            {icon}
          </div>
        )}
        <div className="flex flex-col font-['Patrick_Hand',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#333] text-[22px] text-center">
          <p className="leading-[28px]">{title}</p>
        </div>
        {description && (
          <div className="flex flex-col font-['Patrick_Hand',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#333] text-[18px] text-center tracking-[0.18px]">
            <p className="leading-[24px]">{description}</p>
          </div>
        )}
      </div>
      <div aria-hidden="true" className="absolute border-4 border-[#333] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </button>
  );
}

// Tag/badge button for selections
export function WireframeTag({ 
  children, 
  active = false,
  onClick,
  className = '' 
}: { 
  children: ReactNode; 
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const bgColor = active ? 'bg-[#FF4400]' : 'bg-white';
  const textColor = active ? 'text-white' : 'text-[#333]';
  const borderColor = active ? 'border-[#FF4400]' : 'border-[#333]';

  return (
    <button
      onClick={onClick}
      className={`relative rounded-[4px] transition-all duration-200 hover:scale-105 ${className}`}
    >
      <div className={`${bgColor} content-stretch flex items-center justify-center overflow-clip px-[24px] py-[12px] relative rounded-[inherit]`}>
        <div className={`flex flex-col font-['Patrick_Hand',sans-serif] justify-center leading-[0] not-italic relative shrink-0 ${textColor} text-[22px] text-center whitespace-nowrap`}>
          <p className="leading-[28px]">{children}</p>
        </div>
      </div>
      <div aria-hidden="true" className={`absolute border-4 ${borderColor} border-solid inset-0 pointer-events-none rounded-[4px]`} />
    </button>
  );
}
