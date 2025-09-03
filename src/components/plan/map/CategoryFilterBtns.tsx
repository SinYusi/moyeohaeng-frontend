import { Fragment } from "react/jsx-runtime";
import { useFavoriteStore } from "../../../stores/useFavoriteStore";

const CategoryFilterBtns = ({
  selectedFilters,
  setSelectedFilters,
}: {
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const { favorites } = useFavoriteStore();
  // 즐겨찾기에서 카테고리 목록 추출
  const availableCategories = Array.from(
    new Set(favorites.map((fav) => fav.category))
  ).filter((category) => category && category !== "장소");

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
      {availableCategories.length > 0 && (
        <div className="flex gap-2 justify-start w-full">
          {availableCategories.map((category) => {
            const isSelected = selectedFilters.includes(category);
            return (
              <button
                key={category}
                onClick={() => toggleFilter(category)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  isSelected
                    ? "bg-[#131416] text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
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
