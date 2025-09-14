const GrayBgTextBtn = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <button
      className="cursor-pointer p-1 hover:bg-[#f9fafb] active:bg-[#e7edf6] flex items-center gap-2 rounded-[4px]"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default GrayBgTextBtn;
