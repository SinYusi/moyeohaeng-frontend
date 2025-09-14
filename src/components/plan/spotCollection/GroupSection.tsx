import GroupSectionHeader from "./SectionHeader";
import GrayBgTextBtn from "../../common/GrayBgTextBtn";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { useState, useRef } from "react";
import GroupList from "./GroupList";
import { useModalStore } from "../../../stores/useModalStore";

const GroupSection = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { openCreateGroupModal } = useModalStore();
  const groupListRef = useRef<{ refreshGroups: () => void }>(null);

  const handleCreateGroup = () => {
    openCreateGroupModal(() => {
      // 그룹 생성 후 GroupList 새로고침
      groupListRef.current?.refreshGroups();
    });
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <GroupSectionHeader>
        <div className="flex items-center">
          <GrayBgTextBtn onClick={() => setIsOpen((prev) => !prev)}>
            {isOpen ? (
              <ChevronUp size={24} color="#3b4553" />
            ) : (
              <ChevronDown size={24} color="#3b4553" />
            )}
          </GrayBgTextBtn>
          <p className="text-lg font-medium text-[#131416]">그룹 모음</p>
        </div>

        <GrayBgTextBtn onClick={handleCreateGroup}>
          <Plus color="#3b4553" size={20} />
          <p className="text-sm font-bold text-[#131416]">새 그룹 만들기</p>
        </GrayBgTextBtn>
      </GroupSectionHeader>
      {isOpen && <GroupList ref={groupListRef} />}
    </div>
  );
};

export default GroupSection;
