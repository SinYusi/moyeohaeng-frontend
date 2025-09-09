import React from "react";

// TODO  plan 안에서 복수로 사용 에정,

interface SelectedPlaceCardProps {
  title: string;
  subtitle: string;
  category: string;
  categoryColor: string;
  memo?: string;
  onMemoChange?: (value: string) => void;
}

const SelectedPlaceCard: React.FC<SelectedPlaceCardProps> = ({
  title,
  subtitle,
  category,
  categoryColor,
  memo,
  onMemoChange,
}) => {
  return (
    <article className="w-56 min-w-56 p-0.5 rounded-2xl outline-2 outline-offset-[-2px] outline-stroke-deep/60">
      <section className="h-32 px-6 py-3 bg-white rounded-xl shadow-[0px_4px_8px_0px_rgba(19,20,22,0.16)] outline-[1.5px] outline-offset-[-1.5px] outline-stroke-deep flex flex-col gap-1">
        <header className="flex items-center justify-between">
          <span className="rounded flex items-center gap-1">
            <span
              className="w-4 h-4 rounded-sm"
              style={{ backgroundColor: categoryColor }}
            />
            <span className="text-xs text-[#6B7280] font-medium">
              {category}
            </span>
          </span>
          <button
            className="w-4 h-4 bg-[#111827] rounded-sm"
            aria-label="장소 옵션"
          />
        </header>
        <main className="flex flex-col gap-3">
          <section className="flex flex-col gap-0.5">
            <header className="inline-flex items-center gap-1">
              <h2 className="text-base text-[#111827] font-bold leading-snug truncate max-w-[172px]">
                {title}
              </h2>
              <button
                className="w-4 h-4 bg-[#E5E7EB] rounded-sm"
                aria-label="장소 정보"
              />
            </header>
            <address className="text-xs text-[#6B7280] font-medium leading-none truncate max-w-[200px] not-italic">
              {subtitle}
            </address>
          </section>
          <section className="flex flex-col gap-2">
            <hr className="h-px bg-[#E5E7EB] border-0" />
            <footer className="inline-flex items-center gap-1">
              <section className="flex-1 h-5 py-0.5 flex items-center overflow-hidden">
                {onMemoChange ? (
                  <input
                    maxLength={14}
                    value={memo ?? ""}
                    onChange={(e) => onMemoChange(e.target.value)}
                    placeholder="메모를 적어보세요 (최대 14자)"
                    className="w-full outline-none text-xs text-[#6B7280] placeholder:text-[#9CA3AF] bg-transparent"
                    aria-label="장소 메모"
                  />
                ) : memo ? (
                  <p className="text-xs text-[#6B7280] font-medium leading-none truncate">
                    {memo}
                  </p>
                ) : (
                  <p className="text-xs text-[#9CA3AF] font-medium leading-none truncate">
                    메모를 적어보세요 (최대 14자)
                  </p>
                )}
              </section>
              <button
                className="w-4 h-4 bg-[#E5E7EB] rounded-sm"
                aria-label="메모 편집"
              />
            </footer>
          </section>
        </main>
      </section>
    </article>
  );
};

export default SelectedPlaceCard;
