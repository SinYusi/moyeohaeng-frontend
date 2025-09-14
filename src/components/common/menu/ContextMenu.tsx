import React, { useEffect, useRef, useState } from "react";

export type ContextMenuItem = {
  id: string;
  label: string;
  onSelect: () => void;
  danger?: boolean;
  dividerBelow?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode; // 선택적으로 앞에 표시할 아이콘
};

export type ContextMenuProps = {
  trigger: React.ReactNode;
  items: ContextMenuItem[];
  align?: "right" | "left";
  className?: string; // 메뉴 컨테이너에 추가로 적용할 클래스
  onOpenChange?: (open: boolean) => void; // 열림 상태가 변경될 때 알리는 선택적 콜백
  defaultOpen?: boolean;
};

const ContextMenu: React.FC<ContextMenuProps> = ({
  trigger,
  items,
  align = "left",
  className = "",
  onOpenChange,
  defaultOpen = false,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const setOpenState = (v: boolean) => {
    setOpen(v);
    onOpenChange?.(v);
  };

  useEffect(() => {
    if (!open) return;

    const onClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenState(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenState(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpenState(!open)}
        className="flex items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400/50"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {trigger}
      </button>

      {open && (
        <div
          className={`${
            align === "right" ? "right-0" : "left-0"
          } absolute mt-2 min-w-[93px] max-w-[140px] p-[1.5px] bg-white rounded-lg outline-[1.5px] outline-offset-[-1.5px] outline-stroke-subtle inline-flex flex-col justify-start items-start overflow-hidden z-50 ${className}`}
          role="menu"
        >
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              role="menuitem"
              disabled={item.disabled}
              onClick={() => {
                if (item.disabled) return;
                item.onSelect();
                setOpenState(false);
              }}
              className={` w-full self-stretch h-9 flex flex-col  items-start  justify-start content-start ${
                item.disabled
                  ? "bg-white opacity-50 cursor-not-allowed"
                  : "bg-white hover:bg-[var(--surface-primary,#e7edf6)]"
              }`}
            >
              <div className="self-stretch px-3 py-1.5 inline-flex justify-start items-center gap-2">
                {item.icon && (
                  <span
                    className={`shrink-0 w-4 h-4 ${
                      item.danger ? "text-red-500" : "text-text-default"
                    }`}
                  >
                    {item.icon}
                  </span>
                )}
                <span
                  className={`w-full whitespace-nowrap overflow-hidden text-ellipsis text-left text-base font-medium leading-snug ${
                    item.danger ? "text-red-500" : "text-text-default"
                  }`}
                >
                  {item.label}
                </span>
              </div>
              {item.dividerBelow && (
                <div className="self-stretch h-px bg-[var(--surface-primary,#e7edf6)]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContextMenu;
