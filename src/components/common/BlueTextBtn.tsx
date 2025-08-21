interface BlueTextBtnProps {
  text: string;
  onClick?: () => void;
}

const BlueTextBtn = ({ text, onClick }: BlueTextBtnProps) => {
  return (
    <button
      className="text-[#3864f4] text-sm cursor-pointer rounded-sm"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default BlueTextBtn;
