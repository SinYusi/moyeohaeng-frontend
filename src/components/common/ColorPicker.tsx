import React, { useEffect, useRef, useState } from "react";

export type ColorOption = { id: string; value: string };

interface ColorPickerProps {
  value: string;
  onChange: (colorId: string) => void;
  className?: string;
  options?: ColorOption[];
  withOutline?: boolean;
}

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
  // 가용 너비가 임계값보다 작으면 가로 스크롤 모드로 전환합니다
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        setScrollable(w < 210);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* 스크롤 모드일 때만 얇은 스크롤바 스타일 적용 */}
      {scrollable && (
        <style>
          {`
          .cp-scroll::-webkit-scrollbar { height: 4px; }
          .cp-scroll::-webkit-scrollbar-track { background: transparent; }
          .cp-scroll::-webkit-scrollbar-thumb { background-color: #E5E7EB; border-radius: 9999px; }
          .cp-scroll::-webkit-scrollbar-thumb:hover { background-color: #D1D5DB; }
          `}
        </style>
      )}
      <div
        ref={containerRef}
        className={[
          "h-[52px] w-full px-4 rounded-md flex items-center",
          scrollable
            ? "justify-start gap-2 overflow-x-auto overflow-y-hidden flex-nowrap cp-scroll"
            : "justify-center gap-2 overflow-visible",
          withOutline ? "border border-stroke-subtler" : "",
          className,
        ].join(" ")}
        style={
          scrollable
            ? ({ scrollbarWidth: "thin" } as React.CSSProperties)
            : undefined
        }
      >
        {options.map((color) => (
          <button
            key={color.id}
            onClick={() => onChange(color.id)}
            type="button"
            aria-label={`select-${color.id}`}
            className="w-7 h-7 rounded-full p-1 bg-transparent cursor-pointer shrink-0"
          >
            <div
              className={[
                "w-5 h-5 rounded-full",
                value === color.id
                  ? "border-2 border-fill-primary-default"
                  : "",
              ].join(" ")}
              style={{ backgroundColor: color.value }}
            />
          </button>
        ))}
      </div>
    </>
  );
};

export default ColorPicker;
