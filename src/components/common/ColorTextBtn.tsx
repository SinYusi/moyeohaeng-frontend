interface ColorTextBtnProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  color?: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const ColorTextBtn = ({
  children,
  className,
  type = "button",
  color = "#3864f4",
  onClick,
}: ColorTextBtnProps) => {
  return (
    <button
      className={`text-sm cursor-pointer rounded-sm ${className}`}
      style={{ color: color }}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default ColorTextBtn;
