interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox = ({ label, checked = false, onChange }: CheckboxProps) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        className="w-[22px] h-[22px] border-[#C0C7CE] rounded"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className="text-sm text-[#131416]">{label}</span>
    </label>
  );
};

export default Checkbox;
