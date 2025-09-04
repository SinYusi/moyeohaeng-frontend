const SectionHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex items-center justify-between self-stretch">
      {children}
    </div>
  );
};

export default SectionHeader;
