interface BlueBackgroundBtnProps {
  text: string;
}

const BlueBackgroundBtn = ({ text }: BlueBackgroundBtnProps) => {
  return (
    <button className="bg-[#4f5fbf] text-white text-sm cursor-pointer rounded my-[22px] h-[52px]">
      {text}
    </button>
  );
};

export default BlueBackgroundBtn;
