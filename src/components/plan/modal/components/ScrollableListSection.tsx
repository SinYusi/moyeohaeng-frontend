import React, { useEffect, useState } from "react";

interface ScrollableListSectionProps {
  title?: string;
  count?: number;
  children: React.ReactNode;
  containerClassName?: string;
  listClassName?: string;
  baseMaxHeight?: number; // default 548
  minHeight?: number; // default 300
}

/**
 * CreateGroupSlideModal 과 AddPlaceToGroupSlideModal 양쪽에서 공통으로 쓰는
 * 스크롤 가능한 리스트 섹션. (헤더 + 스크롤 영역)
 */
const ScrollableListSection: React.FC<ScrollableListSectionProps> = ({
  title,
  count,
  children,
  containerClassName = "",
  listClassName = "",
  baseMaxHeight = 548,
  minHeight = 300,
}) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const s = Math.min(w / 1940, h / 1080, 1);
      setScale(s);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const scaledPanelMaxH = Math.floor(baseMaxHeight * scale);

  return (
    <section className={`flex-1 min-w-64 flex flex-col gap-2 ${containerClassName}`}>
      {title && (
        <header className="inline-flex items-start gap-0.5">
          <h2 className="text-[#6B7280] text-xs font-medium">{title}</h2>
          {typeof count === "number" && (
            <span className="text-[#111827] text-xs font-medium">({count})</span>
          )}
        </header>
      )}

      <div
        className={`w-full bg-[#F9FAFB] rounded-lg outline outline-[#E5E7EB] px-4 py-4 overflow-y-auto flex flex-col items-center gap-4 relative ${listClassName}`}
        style={{ maxHeight: `${scaledPanelMaxH}px`, minHeight: `${minHeight}px` }}
      >
        {/* 우측 스크롤 장식 바 (디자인 요소) */}
        <div aria-hidden className="absolute right-4 top-4 w-1 h-60 bg-[#E5E7EB] rounded-full hidden" />
        {children}
      </div>
    </section>
  );
};

export default ScrollableListSection;
