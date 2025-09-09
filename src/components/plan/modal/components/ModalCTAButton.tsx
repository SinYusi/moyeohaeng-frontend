import React from "react";

interface ModalCTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  leadingSymbol?: string; // e.g. "＋"
  fullWidth?: boolean;
}

/**
 * 공통 모달 하단 CTA 버튼
 * - CreateGroupSlideModal / AddPlaceToGroupSlideModal에서 공유
 * - disabled일 때 회색 비활성 스타일, 아니면 검정 배경
 */
const ModalCTAButton: React.FC<ModalCTAButtonProps> = ({
  label,
  leadingSymbol,
  fullWidth = true,
  disabled,
  className = "",
  ...rest
}) => {
  const widthCls = fullWidth ? "w-full" : "w-72";
  const base = `${widthCls} h-12 rounded-md text-base font-semibold flex items-center justify-center gap-1`;
  const state = disabled
    ? "bg-gray-300 text-white cursor-not-allowed"
    : "bg-black text-white";

  return (
    <button type="button" disabled={disabled} className={`${base} ${state} ${className}`} {...rest}>
      {leadingSymbol ? <span className="text-lg">{leadingSymbol}</span> : null}
      {label}
    </button>
  );
};

export default ModalCTAButton;
