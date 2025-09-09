import React from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import ContextMenu, {
  type ContextMenuItem,
} from "../../../common/menu/ContextMenu";

export interface GroupSummaryCardProps {
  name: string;
  memo?: string;
  totalPlaces: number;
  colorBar: string; // hex
}

const GroupSummaryCard: React.FC<GroupSummaryCardProps> = ({
  name,
  memo,
  totalPlaces,
  colorBar,
}) => {
  const menuItems: ContextMenuItem[] = [
    {
      id: "edit",
      label: "그룹 편집",
      icon: <Pencil className="w-4 h-4" />,
      onSelect: () => {
        // TODO: 팀 편집 로직/모달 연결
        console.log("그룹 편집 클릭");
      },
      dividerBelow: true,
    },
    {
      id: "delete",
      label: "그룹 삭제",
      icon: <Trash2 className="w-4 h-4" />,
      onSelect: () => {},
    },
  ];

  return (
    <article className="w-56 px-0.5 shadow-[0px_4px_8px_0px_rgba(19,20,22,0.16)]">
      {/* 컬러 바 */}
      <div className="flex flex-col gap-1">
        <div
          className="w-44 h-2 rounded-t-xl border-l-[1.5px] border-r-[1.5px] border-t-[1.5px] border-stroke-deep"
          style={{ backgroundColor: colorBar }}
          aria-hidden
        />
      </div>

      {/* 본문 카드 */}
      <div className="h-28 min-w-56 px-6 py-3 bg-[#111827] rounded-tr-xl rounded-bl-xl rounded-br-xl outline-[1.5px] outline-offset-[-1.5px] outline-stroke-deep flex flex-col justify-center gap-1">
        <header className="flex items-center justify-between">
          <div className="rounded-md inline-flex items-center gap-1">
            <span className="flex items-center gap-0.5 text-[#D1D5DB] text-xs font-medium">
              총 장소 <strong className="ml-1">{totalPlaces}</strong>개
            </span>
          </div>
          <ContextMenu
            trigger={<MoreHorizontal className="w-4 h-4 text-[#9CA3AF]" />}
            align="right"
            items={menuItems}
          />
        </header>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-base font-bold text-white leading-snug">
              {name}
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            <hr className="h-px border-0 bg-[#E5E7EB] opacity-20" />
            <div className="inline-flex items-center gap-1">
              {memo ? (
                <p className="flex-1 h-5 py-0.5 flex items-center text-[#D1D5DB] text-xs font-medium truncate">
                  {memo}
                </p>
              ) : (
                <p className="flex-1 h-5 py-0.5 flex items-center text-[#9CA3AF] text-xs font-medium truncate">
                  메모를 적어보세요 (최대 14자)
                </p>
              )}
              <button
                aria-label="메모 편집"
                className="w-4 h-4 inline-flex items-center justify-center text-[#D1D5DB]"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default GroupSummaryCard;
