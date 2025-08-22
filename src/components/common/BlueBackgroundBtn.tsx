interface BlueBackgroundBtnProps {
  text: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const BlueBackgroundBtn = ({
  text,
  onClick,
  disabled = false,
  type = "button",
}: BlueBackgroundBtnProps) => {
  return (
    <button
      className="bg-[#4f5fbf] text-white text-sm cursor-pointer rounded my-[22px] h-[52px] disabled:bg-[#EDF0F3] disabled:border-[#C0C7CE] disabled:text-[#C0C7CE] disabled:cursor-not-allowed transition-all duration-300"
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
};

export default BlueBackgroundBtn;
