import { Star, X } from "lucide-react";
import ColorTextBtn from "../../common/ColorTextBtn";
import { useFavoriteStore } from "../../../stores/useFavoriteStore";

interface InfoOverlayProps {
  clickedPlace: {
    position: { lat: number; lng: number };
    place: kakao.maps.services.PlacesSearchResultItem;
    distance: number;
  };
  onClose: () => void;
}

const InfoOverlay = ({ clickedPlace, onClose }: InfoOverlayProps) => {
  const { toggleFavorite, isFavorite } = useFavoriteStore();
  const placeId =
    clickedPlace.place.id ||
    `${clickedPlace.place.place_name}-${clickedPlace.place.x}-${clickedPlace.place.y}`;
  const isFavorited = isFavorite(placeId);

  const getCategoryIcon = (categoryName: string) => {
    const category = categoryName?.split(" > ")[0] || "";
    const iconMap: { [key: string]: string } = {
      카페: "☕",
      음식점: "🍽️",
      병원: "🏥",
      약국: "💊",
      은행: "🏦",
      주유소: "⛽",
      주차장: "🅿️",
      지하철역: "🚇",
      학교: "🏫",
      학원: "📚",
      편의점: "🏪",
      마트: "🛒",
      문화시설: "🎭",
      관광명소: "🏛️",
      숙박: "🏨",
      공공기관: "🏛️",
      중개업소: "🏠",
    };
    return iconMap[category] || "📍";
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(clickedPlace.place);
  };

  const handleDetailClick = () => {
    const kakaoMapUrl = `https://place.map.kakao.com/${placeId}`;
    window.open(kakaoMapUrl, "_blank", "noopener,noreferrer");
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div
      className="relative cursor-default"
      onMouseDown={(e) => {
        e.stopPropagation(); // 마우스 다운 이벤트도 차단
      }}
      onMouseUp={(e) => {
        e.stopPropagation(); // 마우스 업 이벤트도 차단
      }}
    >
      {/* 말풍선 본체 */}
      <div className="bg-white rounded-lg shadow-lg p-4 min-w-[280px] max-w-[320px] font-sans">
        {/* 상단 헤더 */}
        <div className="flex items-start justify-between mb-3">
          {/* 카테고리 태그 */}
          <div className="bg-[#4f5fbf] text-white px-2 py-1 rounded-md text-xs font-medium flex items-center">
            <span className="mr-1">
              {getCategoryIcon(clickedPlace.place?.category_group_name || "")}
            </span>
            {clickedPlace.place?.category_group_name?.split(" > ")[0] || "장소"}
          </div>
          <button
            onClick={handleCloseClick}
            className="cursor-pointer hover:opacity-70 transition-opacity"
          >
            <X color="#3b4553" />
          </button>
        </div>

        {/* 장소 이름 */}
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          {clickedPlace.place?.place_name}
        </h3>

        {/* 주소 */}
        <p className="text-sm text-gray-600 mb-2">
          {clickedPlace.place?.road_address_name ||
            clickedPlace.place?.address_name}
        </p>
        <div className="flex items-start justify-between mb-2 mr-1">
          {/* 상세보기 링크 */}
          <ColorTextBtn onClick={handleDetailClick}>상세보기 &gt;</ColorTextBtn>
          {/* 즐겨찾기 아이콘 */}
          <button
            onClick={handleFavoriteClick}
            className="hover:opacity-80 transition-opacity cursor-pointer"
          >
            <Star
              fill={isFavorited ? "#fee500" : "none"}
              stroke="#111"
              className="w-5 h-5"
            />
          </button>
        </div>

        {/* 액션 버튼들 */}
        <div className="flex gap-2">
          <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center transition-colors">
            <span className="mr-1">+</span>
            셀렉션에 추가
          </button>
          <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center transition-colors">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            일정에 추가
          </button>
        </div>
      </div>

      {/* 말풍선 꼬리 */}
      <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2">
        <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-white"></div>
      </div>
    </div>
  );
};

export default InfoOverlay;
