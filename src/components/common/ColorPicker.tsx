import React from "react";

export type ColorOption = { id: string; value: string; };

interface ColorPickerProps {
  value: string;
  onChange: (colorId: string) => void;
  className?: string;
  options?: ColorOption[];
  withOutline?: boolean;
}

// Default brand colors aligned with NewProjectModal
export const DEFAULT_COLORS: ColorOption[] = [
  { id: "coral", value: "#FB7354" },
  { id: "lemon", value: "#FFE74C" },
  { id: "lime", value: "#8EE888" },
  { id: "mint", value: "#7FEDDC" },
  { id: "sky", value: "#73C3FB" },
  { id: "purple", value: "#CF94FF" },
  { id: "rose", value: "#FFA6BF" },
];

const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  className = "",
  options = DEFAULT_COLORS,
  withOutline = true,
}) => {
  return (
    <div
      className={[
        "h-[52px] px-12 rounded-md flex justify-between items-center",
        withOutline ? "border border-stroke-subtler" : "",
        className,
      ].join(" ")}
    >
      {options.map((color) => (
        <button
          key={color.id}
          onClick={() => onChange(color.id)}
          type="button"
          aria-label={`select-${color.id}`}
          className="w-7 h-7 rounded-full p-1 bg-transparent cursor-pointer"
        >
          <div
            className={[
              "w-5 h-5 rounded-full",
              value === color.id ? "border-2 border-fill-primary-default" : "",
            ].join(" ")}
            style={{ backgroundColor: color.value }}
          />
        </button>
      ))}
    </div>
  );
};

export default ColorPicker;
