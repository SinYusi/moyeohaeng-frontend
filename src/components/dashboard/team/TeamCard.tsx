import { MoreHorizontal } from "lucide-react";
import AccountGroup from "../../common/AccountGroup";
import type { Team } from "../../../types/team";
import { Link } from "react-router-dom";
import { useState } from "react";
import ContextMenu, {
  type ContextMenuItem,
} from "../../common/menu/ContextMenu";
import DeleteTeamModal from "../modals/DeleteTeamModal";

interface TeamCardProps {
  team: Team;
  scheduleCount: number;
}

const TeamCard = ({ team, scheduleCount }: TeamCardProps) => {
  const memberCount = team.members?.length ?? 0;
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const menuItems: ContextMenuItem[] = [
    {
      id: "edit",
      label: "편집",
      onSelect: () => {
        // TODO: 팀 편집 로직/모달 연결
        console.log("팀 편집 클릭");
      },
      dividerBelow: true,
    },
    {
      id: "delete",
      label: "삭제",
      onSelect: () => {
        setIsDeleteOpen(true);
      },
    },
  ];

  return (
    <>
      <div
        className="w-full max-w-[350px] aspect-[350/230] group block relative text-[clamp(12px,2.5vw,16px)]"
        aria-label={`${team.name} 팀 카드`}
      >
        {/* 폴더 탭 */}
        <div
          style={{ width: "58%", height: "16px", top: 0, left: 0 }}
          className="absolute bg-[var(--surface-primary,#e7edf6)] w-[58%] rounded-t-2xl border-2 border-b-0 border-[var(--stroke-deep,#131416)] z-0"
        />

        {/* 메인 폴더 본문 */}
        <div
          style={{
            top: "16px",
            height: "calc(100% - 16px)",
            padding: "8%", // Use percentage for padding proportional to width
          }}
          className="absolute left-0 w-full bg-white rounded-b-2xl rounded-tr-2xl border-2 border-[var(--stroke-deep,#131416)] flex flex-col justify-between"
        >
          {/* 상단 섹션 */}
          <div className="flex flex-col gap-[0.25em]">
            <div className="flex justify-between items-start">
              <h3 className="truncate text-[1.5em] font-bold text-gray-800">
                <Link to={`/dashboard/team/${team.id}`}>{team.name}</Link>
              </h3>

              <ContextMenu
                trigger={<MoreHorizontal className="w-[1.5em] h-[1.5em]" />}
                align="right"
                items={menuItems}
              />
            </div>
            <p className="text-[1em] text-gray-600">
              {team.owner?.name || "리더 미지정"} · {scheduleCount}개 일정
            </p>
          </div>

          {/* 하단 섹션 */}
          <div className="flex justify-between items-center">
            <span className="text-[0.875em] font-medium text-gray-500">
              멤버 {memberCount}명
            </span>
            <AccountGroup members={team.members || []} />
          </div>
        </div>
      </div>

      <DeleteTeamModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onDelete={() => {
          // TODO: 팀 삭제 로직 연결
          console.log("팀 삭제:", team.name);
          setIsDeleteOpen(false);
        }}
        teamName={team.name}
        projectCount={scheduleCount}
      />
    </>
  );
};

export default TeamCard;
