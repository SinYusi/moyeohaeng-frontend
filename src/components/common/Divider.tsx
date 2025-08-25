const Divider = ({ label, color }: { label?: string; color?: string }) => {
  return (
    <div className="flex items-center my-4 w-full">
      <div
        className={`flex-grow border-t`}
        style={{ borderColor: color }}
      />
      {label && (
        <span className={`text-sm mx-4`} style={{ color: color }}>
          {label}
        </span>
      )}
      <div
        className={`flex-grow border-t`}
        style={{ borderColor: color }}
      />
    </div>
  );
};

export default Divider;
