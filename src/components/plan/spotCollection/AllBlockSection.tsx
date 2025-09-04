import { ChevronDown } from "lucide-react";
import GrayBgTextBtn from "../../common/GrayBgTextBtn";
import SectionHeader from "./SectionHeader";

const AllBlockSection = () => {
  return (
    <div className="w-full flex flex-col items-start gap-1">
      <SectionHeader>
        <div className="flex items-center">
          <GrayBgTextBtn>
            <ChevronDown size={24} color="#3b4553" />
          </GrayBgTextBtn>
          <p className="text-lg font-medium text-[#131416]">전체 장소</p>
        </div>
      </SectionHeader>
    </div>
  );
};

export default AllBlockSection;
