const Header = () => {
  return (
    <header className="w-full h-[60px] px-6 py-[10px] bg-[var(--surface-inverse,#F9FAFB)] border-b-[1.5px] border-[var(--stroke-deep,#131416)] flex justify-end items-center gap-3">
      <div className="flex flex-col items-center gap-2">
        <div className="w-[42px] h-[42px] rounded-full flex justify-center items-center">
          <div className="relative w-[42px] h-[42px] overflow-hidden">
            <div className="absolute left-[2px] top-[2px] w-[38px] h-[38px] bg-[var(--fill-deep,#3B4553)] rounded-full border-2 border-white" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
