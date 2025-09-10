import sortIcon from "../../../assets/images/sort.svg";
import AllBlockList from "./AllBlockList";

interface BlockListSectionProps {
  selectedFilters: string[];
}

const BlockListSection = ({ selectedFilters }: BlockListSectionProps) => {
  // TODO: 정렬 기능 추가
  return (
    <div className="flex flex-col w-full gap-1 items-center">
      {/* SortBar */}
      <div className="flex justify-end w-full gap-1 items-center">
        <p className="text-base font-medium text-[#000]">최근 담은순</p>
        <img src={sortIcon} alt="sort" className="w-4 h-4 cursor-pointer" />
      </div>
      <AllBlockList selectedFilters={selectedFilters} />
    </div>
  );
};

export default BlockListSection;
