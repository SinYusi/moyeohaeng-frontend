const GrayBgTextBtn = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="cursor-pointer p-1 hover:bg-[#f9fafb] active:bg-[#e7edf6] flex items-center gap-2 rounded-[4px]">
      {children}
    </button>
  );
};

export default GrayBgTextBtn;
