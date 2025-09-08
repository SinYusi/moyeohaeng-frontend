import GroupSectionHeader from "./SectionHeader";
import GrayBgTextBtn from "../../common/GrayBgTextBtn";
import { ChevronDown, Plus } from "lucide-react";

const GroupSection = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <GroupSectionHeader>
        <div className="flex items-center">
          <GrayBgTextBtn>
            <ChevronDown size={24} color="#3b4553" />
          </GrayBgTextBtn>
          <p className="text-lg font-medium text-[#131416]">그룹 모음</p>
        </div>

        <GrayBgTextBtn>
          <Plus color="#3b4553" size={20} />
          <p className="text-sm font-bold text-[#131416]">새 그룹 만들기</p>
        </GrayBgTextBtn>
      </GroupSectionHeader>
      {/* TODO: 그룹 리스트 카드 추가 */}
    </div>
  );
};

export default GroupSection;
