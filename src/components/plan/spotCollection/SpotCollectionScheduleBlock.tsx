import type { PlaceBlock } from "../../../types/planTypes";
import BlockCommentSection from "./BlockCommentSection";
import ScheduleBlock from "./ScheduleBlock";

interface SelectionScheduleBlockProps {
  place: PlaceBlock;
  isSelectionMode?: boolean;
  isSelected?: boolean;
}

const SelectionScheduleBlock = ({ 
  place, 
  isSelectionMode = false, 
  isSelected = false 
}: SelectionScheduleBlockProps) => {
  return (
    <div className="flex flex-col items-center gap-[6px]">
      <ScheduleBlock 
        place={place} 
        isSelectionMode={isSelectionMode}
        isSelected={isSelected}
      />
      <BlockCommentSection 
        userInteraction={place} 
        id={place.id} 
        isSelectionMode={isSelectionMode}
      />
    </div>
  );
};

export default SelectionScheduleBlock;
