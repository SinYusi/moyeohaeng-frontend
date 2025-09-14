import { ChevronDown, ChevronUp } from "lucide-react";
import GrayBgTextBtn from "../../common/GrayBgTextBtn";
import SectionHeader from "./SectionHeader";
import BlockListView from "./BlockListView";
import { useState } from "react";

const AllBlockSection = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="w-full flex flex-col items-start gap-1">
      <SectionHeader>
        <div className="flex items-center">
          <GrayBgTextBtn onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <ChevronUp size={24} color="#3b4553" />
            ) : (
              <ChevronDown size={24} color="#3b4553" />
            )}
          </GrayBgTextBtn>
          <p className="text-lg font-medium text-[#131416]">전체 장소</p>
        </div>
      </SectionHeader>
      {isOpen && <BlockListView />}
    </div>
  );
};

export default AllBlockSection;
