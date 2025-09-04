import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface FilterButtonProps {
  options: string[];
  onSelect: (option: string) => void;
  selected: string;
}

export const FilterButton = ({
  options,
  onSelect,
  selected,
}: FilterButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-10 px-4 rounded-full border-[1.5px] border-[var(--stroke-deep,#131416)] flex items-center justify-center gap-2 bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="max-w-[250px] truncate">{selected}</span>
        <ChevronDown className=" w-4 h-4 flex-shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-[200px] bg-white border-[1.5px] border-[var(--stroke-deep,#131416)] rounded-xl py-1 shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              className={`block w-full text-left px-4 py-2 text-sm
                ${
                  option === selected
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700"
                }
                hover:bg-gray-100
                ${option === options[0] ? "rounded-t-xl" : ""}
                ${option === options[options.length - 1] ? "rounded-b-xl" : ""}
              `}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              <span className="block max-w-[160px] truncate">{option}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterButton;
