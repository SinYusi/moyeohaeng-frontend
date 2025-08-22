interface BlueTextBtnProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const BlueTextBtn = ({ text, onClick, type = "button" }: BlueTextBtnProps) => {
  return (
    <button
      className="text-[#3864f4] text-sm cursor-pointer rounded-sm"
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default BlueTextBtn;
