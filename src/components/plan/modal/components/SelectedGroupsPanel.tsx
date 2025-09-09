import React, { useEffect, useState } from "react";
import GroupSummaryCard, { type GroupSummaryCardProps } from "./GroupSummaryCard";

export interface GroupSummaryItem extends Omit<GroupSummaryCardProps, "colorBar" | "name" | "memo" | "totalPlaces"> {
  id: number | string;
  name: string;
  memo?: string;
  totalPlaces: number;
  colorBar: string;
}

interface SelectedGroupsPanelProps {
  groups: GroupSummaryItem[];
}

// CreateGroupSlideModal과 동일한 스크롤 패널 스타일/스케일을 재사용
const SelectedGroupsPanel: React.FC<SelectedGroupsPanelProps> = ({ groups }) => {
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

  const BASE_PANEL_MAX_H = 548; // px
  const MIN_PANEL_H = 300; // px
  const scaledPanelMaxH = Math.floor(BASE_PANEL_MAX_H * scale);

  return (
    <div
      className="w-full bg-[#F9FAFB] rounded-lg outline outline-[#E5E7EB] px-4 py-4 overflow-y-auto flex flex-col items-center gap-4 relative"
      style={{ maxHeight: `${scaledPanelMaxH}px`, minHeight: `${MIN_PANEL_H}px` }}
    >
      {/* 우측 스크롤 장식 바 (디자인 요소) */}
      <div aria-hidden className="absolute right-4 top-4 w-1 h-60 bg-[#E5E7EB] rounded-full hidden" />

      <ul className="flex flex-col items-center gap-4">
        {groups.map((g) => (
          <li key={g.id} className="w-56">
            <GroupSummaryCard
              name={g.name}
              memo={g.memo}
              totalPlaces={g.totalPlaces}
              colorBar={g.colorBar}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedGroupsPanel;
