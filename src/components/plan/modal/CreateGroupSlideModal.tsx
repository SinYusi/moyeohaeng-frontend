import React, { useCallback, useMemo, useState } from "react";
import ModalCTAButton from "./components/ModalCTAButton";
import SlideModal from "../SlideModal";
import { useModalStore } from "../../../stores/useModalStore";
import type { ColorOption } from "../../common/ColorPicker";
import ColorPicker, { DEFAULT_COLORS } from "../../common/ColorPicker";
import SelectedPlaceCard from "../SelectedPlaceCard";
import { placeBlocksMock } from "../../../mocks/placeBlocks";
import { toPlaceCardVM } from "../../../types/placeblock";
import ScrollableListSection from "./components/ScrollableListSection";

// Using common SelectedPlaceCard component

const CreateGroupSlideModal: React.FC = () => {
  const { closeModal } = useModalStore();
  const [groupName, setGroupName] = useState("");
  const [selectedColorId, setSelectedColorId] = useState<ColorOption["id"]>(
    DEFAULT_COLORS[0].id
  );
  // Manage places locally (mocked) so memo can be edited
  const [places, setPlaces] = useState(placeBlocksMock);

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

  // 스크롤 영역 스케일은 ScrollableListSection에서 처리합니다

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

        {/* Selected places scroll area */}
        <ScrollableListSection title="선택된 장소" count={placeVMs.length}>
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
        </ScrollableListSection>

        {/* Create button - centered and close to the list */}
        <ModalCTAButton
          onClick={onCreate}
          disabled={isCreateDisabled}
          leadingSymbol="＋"
          label="그룹 만들기"
        />
      </div>
    </SlideModal>
  );
};

export default CreateGroupSlideModal;
