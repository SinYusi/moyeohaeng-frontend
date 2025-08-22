const Divider = ({ label, color }: { label?: string; color?: string }) => {
  return (
    <div className="flex items-center my-4">
      <div className={`flex-grow border-t border-[${color}]`}></div>
      {label && <span className={`text-sm text-[${color}] mx-4`}>{label}</span>}
      <div className={`flex-grow border-t border-[${color}]`}></div>
    </div>
  );
};

export default Divider;
