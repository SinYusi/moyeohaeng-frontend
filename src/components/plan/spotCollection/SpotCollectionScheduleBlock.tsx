import type { PlaceBlock } from "../../../types/planTypes";
import BlockCommentSection from "./BlockCommentSection";
import ScheduleBlock from "./ScheduleBlock";

const SelectionScheduleBlock = ({ place }: { place: PlaceBlock }) => {
  return (
    <div className="flex flex-col items-center gap-[6px]">
      <ScheduleBlock place={place} />
      <BlockCommentSection userInteraction={place} id={place.id} />
    </div>
  );
};

export default SelectionScheduleBlock;
