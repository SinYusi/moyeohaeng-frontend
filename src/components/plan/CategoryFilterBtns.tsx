import { Fragment } from "react/jsx-runtime";
import { useFavoriteStore } from "../../stores/useFavoriteStore";
import { getCategoryIcon } from "../../utils/categoryUtils";

const CategoryFilterBtns = ({
  selectedFilters,
  setSelectedFilters,
}: {
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const { favorites } = useFavoriteStore();
  // 즐겨찾기에서 카테고리 목록 추출
  // TODO: 즐겨찾기와 장소 블록에서 카테고리 목록 조건 추출
  const availableCategories = Array.from(
    new Set(favorites.map((fav) => fav.place.category))
  ).filter((category) => category && category !== "장소");

  // 선택된 카테고리를 왼쪽으로 정렬
  const sortedCategories = [...availableCategories].sort((a, b) => {
    const aSelected = selectedFilters.includes(a);
    const bSelected = selectedFilters.includes(b);

    if (aSelected && !bSelected) return -1;
    if (!aSelected && bSelected) return 1;
    return 0;
  });

  // 필터 토글 함수
  const toggleFilter = (category: string) => {
    setSelectedFilters((prev) =>
      prev.includes(category)
        ? prev.filter((f) => f !== category)
        : [...prev, category]
    );
  };

  return (
    <Fragment>
      {sortedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-start w-full max-w-lg">
          {sortedCategories.map((category) => {
            const isSelected = selectedFilters.includes(category);
            return (
              <button
                key={category}
                onClick={() => toggleFilter(category)}
                className={`flex items-center gap-[2px] px-3 py-1 rounded-full text-sm font-medium transition-colors border border-[#131416] ${
                  isSelected
                    ? "bg-[#131416] text-white"
                    : "bg-white text-[#131416] hover:bg-gray-50"
                }`}
              >
                {getCategoryIcon(category, 16)}
                {category}
              </button>
            );
          })}
        </div>
      )}
    </Fragment>
  );
};

export default CategoryFilterBtns;
