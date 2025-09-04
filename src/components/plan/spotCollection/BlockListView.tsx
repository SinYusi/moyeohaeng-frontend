import { useState } from "react";
import CategoryFilterBtns from "../CategoryFilterBtns";

const BlockListView = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  return (
    <div className="w-full flex flex-col items-start self-stretch">
      <CategoryFilterBtns
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
    </div>
  );
};

export default BlockListView;
