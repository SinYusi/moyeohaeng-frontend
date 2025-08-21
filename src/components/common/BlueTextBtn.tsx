interface BlueTextBtnProps {
  text: string;
}

const BlueTextBtn = ({ text }: BlueTextBtnProps) => {
  return (
    <button className="text-[#3864f4] text-sm cursor-pointer rounded-sm">
      {text}
    </button>
  );
};

export default BlueTextBtn;
