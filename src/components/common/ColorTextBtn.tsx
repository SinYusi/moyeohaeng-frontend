interface BlueTextBtnProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  color?: string;
  className?: string;
  onClick?: () => void;
}

const ColorTextBtn = ({
  children,
  className,
  type = "button",
  color = "#3864f4",
  onClick,
}: BlueTextBtnProps) => {
  return (
    <button
      className={`text-[${color}] text-sm cursor-pointer rounded-sm ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default ColorTextBtn;
