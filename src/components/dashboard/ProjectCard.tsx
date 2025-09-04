import { MoreHorizontal } from "lucide-react";

interface ProjectCardProps {
  days: number;
  title: string;
  date: string;
  people: number;
  modifiedTime: string;
}

const ProjectCard = ({
  days,
  title,
  date,
  people,
  modifiedTime,
}: ProjectCardProps) => {
  // Helper: compute a simple, readable "time ago" from minutes string
  const getTimeAgo = (input: string) => {
    const minutes = Number(input);
    const isNumeric = !Number.isNaN(minutes);
    if (!isNumeric) return { value: input, unit: "시간" };
    if (minutes < 60) return { value: minutes, unit: "분" };
    return { value: Math.floor(minutes / 60), unit: "시간" };
  };

  const { value: timeValue, unit: timeUnit } = getTimeAgo(modifiedTime);

  // Reusable class tokens for readability
  const border = "border-[1.5px] border-[var(--stroke-deep,#131416)]";
  const textWhite = "text-[var(--text-white,white)]";
  const bgSurface = "bg-[var(--surface-inverse,#F9FAFB)]";

  // Helper: insert a line break before the last word to avoid awkward wrapping
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
    <article
      className="w-full relative overflow-hidden aspect-[350/230]"
      aria-label="여행 프로젝트 카드"
    >
      {/* Visual cutouts (top & bottom) */}
      <div
        className={`absolute z-10 w-[14%] aspect-square rounded-full ${bgSurface} ${border} left-[63.5%] -top-[10%] pointer-events-none`}
        aria-hidden
      />
      <div
        className={`absolute z-10 w-[14%] aspect-square rounded-full ${bgSurface} ${border} left-[63.5%] -bottom-[10%] pointer-events-none`}
        aria-hidden
      />
      <div className="flex w-full h-full">
        {/* Left: 메인 정보 */}
        <section
          className={`w-[71%] h-full py-[8%] pl-[8%] pr-[4%] bg-[var(--fill-deep,#3B4553)] rounded-l-[24px] ${border} border-r-0 flex flex-col justify-center items-start`}
        >
          <div className="flex-1 flex flex-col justify-between w-full">
            {/* Header: 일수 + 제목 */}
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
                {date}
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

        {/* Right: 메타 패널 (메뉴 + 마지막 수정 시간) */}
        <aside
          className={`w-[29%] h-full pl-[2%] pr-[7%] py-[9%] bg-[var(--surface-default,white)] rounded-r-[24px] ${border} border-l-0 flex flex-col justify-between items-end`}
        >
          <div className="w-7 h-7 relative overflow-hidden">
            <MoreHorizontal className="text-[var(--fill-deep,#3B4553)]" />
          </div>
          <footer className="flex flex-col items-end">
            <div className="flex items-center justify-center gap-0.5">
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
            <div className="text-[var(--text-subtler,#7B848E)] text-sm font-medium leading-5 text-right">
              수정됨
            </div>
          </footer>
        </aside>
      </div>
    </article>
  );
};

export default ProjectCard;
