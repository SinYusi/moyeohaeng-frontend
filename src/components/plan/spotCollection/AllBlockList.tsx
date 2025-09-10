import { useSpotCollectionStore } from "../../../stores/useSpotCollectionStore";
import SelectionScheduleBlock from "./SpotCollectionScheduleBlock";

interface AllBlockListProps {
  selectedFilters: string[];
}

const AllBlockList = ({ selectedFilters }: AllBlockListProps) => {
  const { collections } = useSpotCollectionStore();

  const filteredCollections = collections.filter((collection) => {
    if (selectedFilters.length === 0) {
      return true;
    }
    return selectedFilters.includes(collection.category);
  });

  return (
    <div className="grid gap-x-3 gap-y-4 grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3">
      {filteredCollections.map((collection) => (
        <SelectionScheduleBlock key={collection.id} place={collection} />
      ))}
    </div>
  );
};

export default AllBlockList;
