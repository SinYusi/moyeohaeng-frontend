const Divider = ({
  label,
  color,
  className,
}: {
  label?: string;
  color?: string;
  className?: string;
}) => {
  return (
    <div className={`flex items-center w-full ${className}`}>
      <div className={`flex-grow border-t`} style={{ borderColor: color }} />
      {label && (
        <span className={`text-sm mx-4`} style={{ color: color }}>
          {label}
        </span>
      )}
      <div className={`flex-grow border-t`} style={{ borderColor: color }} />
    </div>
  );
};

export default Divider;
