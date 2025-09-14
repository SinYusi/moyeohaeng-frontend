import GroupSectionHeader from "./SectionHeader";
import GrayBgTextBtn from "../../common/GrayBgTextBtn";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { useState } from "react";
import GroupList from "./GroupList";
import { useModalStore } from "../../../stores/useModalStore";

const GroupSection = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { openCreateGroupModal } = useModalStore();

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

        <GrayBgTextBtn onClick={openCreateGroupModal}>
          <Plus color="#3b4553" size={20} />
          <p className="text-sm font-bold text-[#131416]">새 그룹 만들기</p>
        </GrayBgTextBtn>
      </GroupSectionHeader>
      {isOpen && <GroupList />}
    </div>
  );
};

export default GroupSection;
