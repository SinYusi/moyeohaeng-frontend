interface ColorBackgroundBtnProps {
  children: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  backgroundColor?: string;
  textColor?: string;
  className?: string;
  onClick?: () => void;
}

const ColorBackgroundBtn = ({
  children,
  disabled = false,
  type = "button",
  backgroundColor = "#4f5fbf",
  textColor = "#fff",
  className,
  onClick,
}: ColorBackgroundBtnProps) => {
  return (
    <button
      className={`bg-[${backgroundColor}] text-[${textColor}] text-sm cursor-pointer rounded h-[52px] disabled:bg-[#EDF0F3] disabled:border-[#C0C7CE] disabled:text-[#C0C7CE] disabled:cursor-not-allowed transition-all duration-300 flex flex-row justify-center items-center gap-2 ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default ColorBackgroundBtn;
