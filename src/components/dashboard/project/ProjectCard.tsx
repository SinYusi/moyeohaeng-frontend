import { MoreHorizontal, ArrowRight } from "lucide-react";
import ContextMenu, {
  type ContextMenuItem,
} from "../../common/menu/ContextMenu";
import { useState } from "react";
import NewProjectModal from "../modals/NewProjectModal";
import DeleteProjectModal from "../modals/DeleteProjectModal";

import type { Project } from "../../../types/project";
import { getTimeAgo } from "../../../utils/timeUtils";
import { Link } from "react-router-dom";

type ProjectCardProps = Project;

const ProjectCard = ({
  days,
  title,
  people,
  updatedAt,
  startDate,
  id,
}: ProjectCardProps) => {
  // 시간을 '~분 전'과 같은 읽기 쉬운 형식으로 변환

  const { value: timeValue, unit: timeUnit } = getTimeAgo(updatedAt);

  // 재사용 가능한 스타일 클래스
  const border = "border-[1.5px] border-[var(--stroke-deep,#131416)]";
  const textWhite = "text-[var(--text-white,white)]";
  const bgSurface = "bg-[var(--surface-inverse,#F9FAFB)]";

  // 컨텍스트 메뉴는 공통 컴포넌트 사용
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const menuItems: ContextMenuItem[] = [
    {
      id: "edit",
      label: "편집",
      onSelect: () => {
        setIsEditOpen(true);
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

  // 마지막 단어 앞에 줄바꿈을 추가하여 자연스러운 줄바꿈 처리
  const formatTitle = (t: string) => {
    const parts = t.trim().split(/\s+/);
    if (parts.length < 2) return t;
    const last = parts.pop();
    const first = parts.join(" ");
    return (
      <>
        {first}
        <br />
        {last}
      </>
    );
  };

  return (
    <>
      <article
        className="w-full max-w-[350px] max-h-[230px] relative overflow-hidden aspect-[350/230] group"
        aria-label="여행 프로젝트 카드"
      >
        {/* 시각적 컷아웃 (상단 및 하단) */}
        <div
          className={`absolute z-10 w-[14%] aspect-square rounded-full ${bgSurface} ${border} left-[63.5%] -top-[10%] pointer-events-none`}
          aria-hidden
        />
        <div
          className={`absolute z-10 w-[14%] aspect-square rounded-full ${bgSurface} ${border} left-[63.5%] -bottom-[10%] pointer-events-none`}
          aria-hidden
        />
        <div className="flex w-full h-full">
          {/* 왼쪽: 메인 정보 */}
          <section
            className={`w-[71%] h-full py-[8%] pl-[8%] pr-[4%] bg-[var(--fill-deep,#3B4553)] rounded-l-[24px] ${border} border-r-0 flex flex-col justify-center items-start`}
          >
            <div className="flex-1 flex flex-col justify-between w-full">
              {/* 헤더: 일수 + 제목 */}
              <header className="flex flex-col gap-1.5">
                <div className="flex gap-0.5">
                  <div
                    className={`${textWhite} text-base font-medium leading-[22px]`}
                  >
                    {days}
                  </div>
                  <div
                    className={`${textWhite} text-base font-medium leading-[22px]`}
                  >
                    일간 여행
                  </div>
                </div>
                <h2
                  className={`${textWhite} text-2xl font-bold leading-[34px] h-[102px] break-keep hyphens-none`}
                >
                  {formatTitle(title)}
                </h2>
              </header>
              <div className="flex flex-col gap-1">
                <div
                  className={`${textWhite} text-base font-medium leading-[22px]`}
                >
                  {startDate}
                </div>
                <div className="flex">
                  <div
                    className={`${textWhite} text-base font-medium leading-[22px]`}
                  >
                    {people}
                  </div>
                  <div
                    className={`${textWhite} text-base font-medium leading-[22px]`}
                  >
                    인 여행
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 오른쪽: 메타 패널 (메뉴 + 마지막 수정 시간) */}
          <aside
            className={`w-[29%] h-full pl-[2%] pr-[7%] py-[9%] bg-[var(--surface-default,white)] rounded-r-[24px] ${border} border-l-0 flex flex-col justify-between items-end relative`}
          >
            <div className="w-7 h-7 relative overflow-visible">
              <ContextMenu
                trigger={
                  <MoreHorizontal className="text-[var(--fill-deep,#3B4553)]" />
                }
                align="right"
                items={menuItems}
              />
            </div>
            <footer className="flex flex-col items-end">
              <div className="flex items-center justify-center gap-0.5 group-hover:opacity-0 transition-opacity duration-200">
                <div className="flex items-center justify-center">
                  <div className="text-[var(--text-subtler,#7B848E)] text-sm font-medium leading-5">
                    {timeValue}
                  </div>
                  <div className="text-[var(--text-subtler,#7B848E)] text-sm font-medium leading-5">
                    {timeUnit}
                  </div>
                </div>
                <div className="text-[var(--text-subtler,#7B848E)] text-sm font-medium leading-5">
                  전
                </div>
              </div>
              <div className="text-[var(--text-subtler,#7B848E)] text-sm font-medium leading-5 text-right group-hover:opacity-0 transition-opacity duration-200">
                수정됨
              </div>
              <div className="absolute bottom-[11%] right-[7%] opacity-0 group-hover:opacity-100 transition-all duration-200">
                <Link
                  className="w-10 h-10 rounded-full bg-[var(--fill-deep,#3B4553)] flex items-center justify-center cursor-pointer"
                  to={`/plan/${id}`}
                >
                  <ArrowRight className="w-5 h-5 text-white" />
                </Link>
              </div>
            </footer>
          </aside>
        </div>
      </article>

      {/* Modals */}
      <NewProjectModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        modalTitle="프로젝트 편집"
        initialName={title}
        onSuccess={() => {
          window.location.reload();
        }}
      />

      <DeleteProjectModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onDelete={() => {
          // TODO: 삭제 로직 연동
          console.log("프로젝트 삭제:", { title });
          setIsDeleteOpen(false);
        }}
        projectName={title}
      />
    </>
  );
};

export default ProjectCard;
