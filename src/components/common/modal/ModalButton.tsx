import React from "react";

interface ModalButtonProps {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

const ModalButton: React.FC<ModalButtonProps> = ({
  onClick,
  variant = "secondary",
  disabled = false,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full h-9 px-3 rounded-lg flex items-center justify-center ${
        disabled
          ? "bg-fill-disabled cursor-not-allowed"
          : variant === "secondary"
          ? "bg-surface-default border border-stroke-subtler"
          : variant === "danger"
          ? "bg-fill-danger-default"
          : "bg-[var(--fill-primary-default,#4f5fbf)]"
      }`}
    >
      <span
        className={`text-base font-semibold font-['SUIT_Variable'] leading-[1] mt-[1px] ${
          disabled
            ? "text-text-disabled"
            : disabled
            ? "text-text-disabled"
            : variant === "secondary"
            ? "text-text-default"
            : "text-white"
        }`}
      >
        {children}
      </span>
    </button>
  );
};

export default ModalButton;
