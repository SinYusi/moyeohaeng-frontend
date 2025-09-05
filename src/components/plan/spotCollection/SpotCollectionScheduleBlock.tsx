import type { SpotCollectionItem } from "../../../types/spotCollectionItem";
import BlockCommentSection from "./BlockCommentSection";
import ScheduleBlock from "./ScheduleBlock";

const SelectionScheduleBlock = ({ place }: { place: SpotCollectionItem }) => {
  return (
    <div className="flex flex-col items-center gap-[6px]">
      <ScheduleBlock place={place} />
      <BlockCommentSection userInteraction={place} />
    </div>
  );
};

export default SelectionScheduleBlock;
