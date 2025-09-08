import React, { useCallback, useEffect, useMemo, useState } from "react";
import SlideModal from "../SlideModal";
import { useModalStore } from "../../../stores/useModalStore";
import type { ColorOption } from "../../common/ColorPicker";
import ColorPicker, { DEFAULT_COLORS } from "../../common/ColorPicker";
import SelectedPlaceCard from "../SelectedPlaceCard";
import { placeBlocksMock } from "../../../mocks/placeBlocks";
import { toPlaceCardVM } from "../../../types/placeblock";

// Using common SelectedPlaceCard component

const CreateGroupSlideModal: React.FC = () => {
  const { closeModal } = useModalStore();
  const [groupName, setGroupName] = useState("");
  const [selectedColorId, setSelectedColorId] = useState<ColorOption["id"]>(
    DEFAULT_COLORS[0].id
  );
  // Manage places locally (mocked) so memo can be edited
  const [places, setPlaces] = useState(placeBlocksMock);

  // Responsive scale based on 1940x1080 design
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

  // Use SlideModal's built-in header via title prop

  const onCreate = useCallback(() => {
    const payload = {
      name: groupName.trim(),
      colorId: selectedColorId,
      places: places.map((p) => ({ id: p.id, memo: p.memo ?? "" })),
    };
    // TODO: replace with API call
    console.log("Create Group payload", payload);
    closeModal();
  }, [groupName, selectedColorId, places, closeModal]);

  const isCreateDisabled = groupName.trim().length === 0;

  // footer 버튼을 본문에 붙여서 스크롤 영역과 가깝게 배치

  const colorOptions = useMemo(() => DEFAULT_COLORS, []);
  const nameLength = groupName.length;
  const placeVMs = useMemo(() => places.map(toPlaceCardVM), [places]);

  // Base max height for the selected places panel at 1080h design
  const BASE_PANEL_MAX_H = 548; // px
  const MIN_PANEL_H = 300; // px, 최소 보장 높이
  const scaledPanelMaxH = Math.floor(BASE_PANEL_MAX_H * scale);

  return (
    <SlideModal title="새 그룹 만들기">
      <div className="px-4 pb-4 pt-1 flex flex-col gap-3 max-w-[1940px] w-full mx-auto">
        {/* Group name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#6B7280]">
            그룹 이름
          </label>
          <div className="h-7 flex items-center relative">
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value.slice(0, 20))}
              placeholder="회의하고 싶은 장소만 모아보세요"
              className="w-full outline-none text-sm text-[#9CA3AF] placeholder:text-[#9CA3AF] bg-transparent"
            />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-[#9CA3AF]">
              ({nameLength}/20)
            </div>
          </div>
          <div className="h-px bg-[#E5E7EB]" />
        </div>

        {/* Group color */}
        <div className="flex flex-col gap-2">
          <div className="text-xs font-medium text-[#6B7280]">그룹 컬러</div>
          <ColorPicker
            value={selectedColorId}
            onChange={setSelectedColorId}
            options={colorOptions}
            withOutline
          />
        </div>

        {/* Selected places title */}
        <div className="flex items-start gap-1 text-xs">
          <span className="text-[#6B7280] font-medium">선택된 장소</span>
          <span className="text-[#111827] font-medium">
            ({placeVMs.length})
          </span>
        </div>

        {/* Selected places scroll area */}
        <div
          className="w-full bg-[#F9FAFB] rounded-lg outline outline-[#E5E7EB] px-4 py-4 overflow-y-auto flex flex-col items-center gap-4"
          style={{
            maxHeight: `${scaledPanelMaxH}px`,
            minHeight: `${MIN_PANEL_H}px`,
          }}
        >
          {/* Scroll indicator bar at right (decorative) */}
          <div className="absolute right-4 top-4 w-1 h-60 bg-[#E5E7EB] rounded-full hidden" />
          {/* Render mock places */}
          {placeVMs.map((vm, idx) => (
            <SelectedPlaceCard
              key={vm.id}
              title={vm.title}
              subtitle={vm.subtitle}
              category={vm.category}
              categoryColor={vm.categoryColor}
              memo={places[idx]?.memo}
              onMemoChange={(value) =>
                setPlaces((prev) =>
                  prev.map((p) => (p.id === vm.id ? { ...p, memo: value } : p))
                )
              }
            />
          ))}
        </div>

        {/* Create button - centered and close to the list */}
        <button
          onClick={onCreate}
          disabled={isCreateDisabled}
          className={`w-full h-12 rounded-md text-base font-semibold flex items-center justify-center gap-1 ${
            isCreateDisabled
              ? "bg-gray-300 text-white cursor-not-allowed"
              : "bg-black text-white"
          }`}
        >
          <span className="text-lg">＋</span> 그룹 만들기
        </button>
      </div>
    </SlideModal>
  );
};

export default CreateGroupSlideModal;
