import { X } from "lucide-react";
import React from "react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  width?: number;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  title,
  width = 400,
  children,
  footer,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-[#7B848E]/40 z-50"
        onClick={onClose}
      />
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg z-[60] w-[90%] max-h-[90vh] overflow-y-auto shadow-[0px_8px_8px_-4px_rgba(16,24,40,0.03),0px_20px_24px_-4px_rgba(16,24,40,0.08)]"
        style={{ maxWidth: `${width}px` }}
      >
        <div className="px-6 py-4 flex justify-between items-center border-b border-[#E4E7EC]">
          <h2 className="text-lg font-bold text-[#1D2433]">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-[#F3F5F7] text-[#5A6572]"
            aria-label="Close modal"
          >
            <X size={28} />
          </button>
        </div>
        <div className="px-6 py-4 text-[#5A6572]">{children}</div>
        {footer && (
          <div className="px-6 py-3 border-t border-[#E4E7EC]">
            {footer}
          </div>
        )}
      </div>
    </>
  );
};

export default BaseModal;
