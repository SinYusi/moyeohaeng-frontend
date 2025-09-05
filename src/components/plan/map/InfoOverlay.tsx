import {
  Bed,
  Calendar,
  Coffee,
  CreditCard,
  Drama,
  Fuel,
  Hospital,
  House,
  Landmark,
  LibraryBig,
  Pill,
  Plus,
  Pyramid,
  School,
  ShoppingCart,
  SquareParking,
  Star,
  Store,
  TramFront,
  Utensils,
  X,
} from "lucide-react";
import ColorTextBtn from "../../common/ColorTextBtn";
import { useFavoriteStore } from "../../../stores/useFavoriteStore";
import { useSpotCollectionStore } from "../../../stores/useSpotCollectionStore";

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
  const { addToCollection, isInCollection } = useSpotCollectionStore();

  const placeId =
    clickedPlace.place.id ||
    `${clickedPlace.place.place_name}-${clickedPlace.place.x}-${clickedPlace.place.y}`;
  const isFavorited = isFavorite(placeId);
  const isCollected = isInCollection(placeId);

  const getCategoryIcon = (categoryName: string) => {
    const category = categoryName?.split(" > ")[0] || "";
    const iconMap: { [key: string]: React.ReactNode } = {
      카페: <Coffee size={16} />,
      음식점: <Utensils size={16} />,
      병원: <Hospital size={16} />,
      약국: <Pill size={16} />,
      은행: <CreditCard size={16} />,
      "주유소,충전소": <Fuel size={16} />,
      주차장: <SquareParking size={16} />,
      지하철역: <TramFront size={16} />,
      학교: <School size={16} />,
      학원: <LibraryBig size={16} />,
      편의점: <Store size={16} />,
      대형마트: <ShoppingCart size={16} />,
      문화시설: <Drama size={16} />,
      관광명소: <Pyramid size={16} />,
      숙박: <Bed size={16} />,
      공공기관: <Landmark size={16} />,
      중개업소: <House size={16} />,
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

  const handleAddToCollection = (e: React.MouseEvent) => {
    e.stopPropagation();

    // TODO: API 연결

    const collectionData = {
      category: clickedPlace.place.category_group_name || "기타",
      placeName: clickedPlace.place.place_name || "",
      address:
        clickedPlace.place.road_address_name ||
        clickedPlace.place.address_name ||
        "",
      placeId: placeId,
      latitude: Number(clickedPlace.place.y),
      longitude: Number(clickedPlace.place.x),
      memo: "",
      createAt: new Date().toISOString(),
      likeSummary: {
        totalCount: 0,
        liked: false,
        likedMembers: [],
      },
      commentSummary: {
        totalCount: 0,
        lastComment: {
          content: "",
          author: "",
        },
      },
    };

    addToCollection(collectionData);
  };

  return (
    <div
      className="relative cursor-default"
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
      onMouseUp={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        className="bg-white rounded-xl px-4 pt-3 pb-4 min-w-[320px] max-w-[320px] font-sans flex flex-col gap-2"
        style={{
          boxShadow:
            "0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 1px 12px 0 rgba(0, 0, 0, 0.24)",
        }}
      >
        <div className="flex flex-col gap-[6px]">
          {/* 상단 - 카테고리, 닫기 버튼*/}
          <div className="flex items-start justify-between">
            <div className="bg-[#4f5fbf] text-[#fff] px-[6px] rounded-sm text-xs font-medium flex items-center justify-center py-1">
              <span className="mr-1">
                {getCategoryIcon(clickedPlace.place?.category_group_name || "")}
              </span>
              {clickedPlace.place?.category_group_name || "장소"}
            </div>
            <button
              onClick={handleCloseClick}
              className="cursor-pointer hover:opacity-70 transition-opacity"
            >
              <X color="#3b4553" />
            </button>
          </div>
          {/* 중단 - 장소 이름, 주소, 상세보기 버튼, 즐겨찾기 아이콘 */}
          <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold text-[#131416]">
              {clickedPlace.place?.place_name}
            </p>
            <p className="text-sm text-[#7b8482]">
              {clickedPlace.place?.road_address_name ||
                clickedPlace.place?.address_name}
            </p>
          </div>
          <div className="flex items-center justify-between self-stretch">
            <ColorTextBtn onClick={handleDetailClick} color="#3864f4">
              상세보기 &gt;
            </ColorTextBtn>
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
        </div>

        {/* 액션 버튼들 */}
        <div className="flex items-start gap-2 self-stretch">
          <ActionBtn onClick={handleAddToCollection} disabled={isCollected || !isFavorited}>
            <Plus
              className="w-5 h-5"
              color={isCollected ? "#7b8482" : "#3b4553"}
            />
            장소 모음 추가
          </ActionBtn>
          <ActionBtn
            onClick={(e) => {
              e.stopPropagation();
            }}
            disabled={!isFavorited}
          >
            <Calendar className="w-5 h-5" color="#3b4553" />
            일정에 추가
          </ActionBtn>
        </div>
      </div>

      {/* 말풍선 꼬리 */}
      <div className="absolute bottom-[-14px] left-1/2 transform -translate-x-1/2">
        <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[14px] border-l-transparent border-r-transparent border-t-[#fff]" />
      </div>
    </div>
  );
};

const ActionBtn = ({
  children,
  disabled = false,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: (e: React.MouseEvent) => void;
}) => {
  return (
    <button
      className="border border-[#c0c7ce] border-[1px] bg-[#fff] text-[#131416] rounded-[6px] text-base pl-2 pr-3 font-medium flex items-center justify-center transition-colors gap-1 h-9 flex-1 hover:bg-[#f9fafb] active:bg-[#e7edf6] disabled:bg-[#edf0f3] disabled:text-[#7b8482]"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default InfoOverlay;
