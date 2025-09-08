import { useSpotCollectionStore } from "../../../stores/useSpotCollectionStore";
import SelectionScheduleBlock from "./SpotCollectionScheduleBlock";

const AllBlockList = () => {
  const { collections } = useSpotCollectionStore();

  // TODO: API 연결 및 zustand 스토어 연결

  return (
    <div className="grid gap-x-3 gap-y-4 grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3">
      {collections.map((collection) => (
        <SelectionScheduleBlock key={collection.id} place={collection} />
      ))}
    </div>
  );
};

export default AllBlockList;
