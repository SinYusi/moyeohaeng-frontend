import { useSpotCollectionStore } from "../../../stores/useSpotCollectionStore";
import { useModalStore } from "../../../stores/useModalStore";
import SelectionScheduleBlock from "./SpotCollectionScheduleBlock";

interface AllBlockListProps {
  selectedFilters: string[];
}

const AllBlockList = ({ selectedFilters }: AllBlockListProps) => {
  const collections = useSpotCollectionStore((state) => state.collections);
  const { activeModal, modalData } = useModalStore();

  const filteredCollections = collections.filter((collection) => {
    if (selectedFilters.length === 0) {
      return true;
    }
    return selectedFilters.includes(collection.category);
  });

  const isSelectionMode = activeModal === "createGroup";
  const selectedPlaces = modalData.selectedPlaces || [];

  return (
    <div className="grid gap-x-3 grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3">
      {filteredCollections.map((collection) => {
        const isSelected = selectedPlaces.some(
          (place) => place.id === collection.id
        );
        return (
          <SelectionScheduleBlock
            key={collection.id}
            place={collection}
            isSelectionMode={isSelectionMode}
            isSelected={isSelected}
          />
        );
      })}
    </div>
  );
};

export default AllBlockList;
