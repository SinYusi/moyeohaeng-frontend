import React from "react";
import { Plus } from "lucide-react";

interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  showIcon?: boolean;
  className?: string;
}

const ActionButton = ({ onClick, children, showIcon = true, className = '' }: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`h-[44px] px-3 bg-[#4F5FBF] rounded-md flex items-center hover:bg-[#3A4999] transition-colors ${className}`}
    >
      <span className="text-white text-[clamp(0.875rem,1.5vw,1rem)] font-semibold whitespace-nowrap flex items-center gap-2">
        {showIcon && <Plus size={20} />}
        {children}
      </span>
    </button>
  );
};

export default ActionButton;
