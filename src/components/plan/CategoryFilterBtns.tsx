import { Fragment } from "react/jsx-runtime";
import { useFavoriteStore } from "../../stores/useFavoriteStore";
import { getCategoryIcon } from "../../utils/categoryUtils";
import { useSpotCollectionStore } from "../../stores/useSpotCollectionStore";

const CategoryFilterBtns = ({
  selectedFilters,
  setSelectedFilters,
  mode,
}: {
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
  mode: "favorite" | "collection";
}) => {
  const { favorites } = useFavoriteStore();
  const { collections } = useSpotCollectionStore();
  // 원하는 카테고리 순서 정의
  const categoryOrder = [
    "음식점",
    "카페",
    "관광명소",
    "숙박",
    "문화시설",
    "대형마트",
    "공공기관",
    "중개업소",
    "병원",
    "약국",
    "지하철역",
    "주차장",
    "주유소,충전소",
    "은행",
    "편의점",
    "학교",
    "학원",
    "어린이집,유치원",
    "기타",
  ];

  // 즐겨찾기/컬렉션에서 실제 존재하는 카테고리만 추출
  const availableCategories = Array.from(
    new Set(
      mode === "favorite"
        ? favorites.map((fav) => fav.place.category)
        : collections.map((col) => col.category)
    )
  ).filter((category) => category && category !== "장소");

  // 카테고리 정렬: 선택된 것들을 앞으로, 그 안에서도 정의된 순서대로
  const sortedCategories = [...availableCategories].sort((a, b) => {
    const aSelected = selectedFilters.includes(a);
    const bSelected = selectedFilters.includes(b);

    // 선택된 카테고리가 앞으로 오도록
    if (aSelected && !bSelected) return -1;
    if (!aSelected && bSelected) return 1;

    // 둘 다 선택되었거나 둘 다 선택되지 않은 경우, 정의된 순서대로
    const aIndex = categoryOrder.indexOf(a);
    const bIndex = categoryOrder.indexOf(b);

    // 정의된 순서에 없는 카테고리는 뒤로
    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;

    return aIndex - bIndex;
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
