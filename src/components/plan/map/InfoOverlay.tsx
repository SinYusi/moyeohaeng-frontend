import { Calendar, ChevronRight, Plus, Star, X } from "lucide-react";
import ColorTextBtn from "../../common/ColorTextBtn";
import { useFavoriteStore } from "../../../stores/useFavoriteStore";
import { useSpotCollectionStore } from "../../../stores/useSpotCollectionStore";
import { getCategoryIcon } from "../../../utils/categoryUtils";
import useAuthStore from "../../../stores/useAuthStore";
import usePostPin from "../../../hooks/plan/pin/usePostPin";
import useDeletePin from "../../../hooks/plan/pin/useDeletePin";
import usePostPlaceBlock from "../../../hooks/plan/placeBlock/usePostPlaceBlock";
import type { Place } from "../../../types/planTypes";

interface InfoOverlayProps {
  clickedPlace: {
    position: { lat: number; lng: number };
    kakaoPlace: kakao.maps.services.PlacesSearchResultItem;
    place?: Place;
    distance: number;
  };
  onClose: () => void;
}

const InfoOverlay = ({ clickedPlace, onClose }: InfoOverlayProps) => {
  const { postPlaceBlock } = usePostPlaceBlock();

  const { isFavorite, addFavorite, removeFavorite, getFavorite } =
    useFavoriteStore();
  const { addToCollection, isInCollection } = useSpotCollectionStore();
  const { postPin } = usePostPin();
  // TODO: postPin 에러 처리

  const kakoPlaceId = clickedPlace.kakaoPlace.id;
  const isFavorited = isFavorite(kakoPlaceId);
  const isCollected = isInCollection(kakoPlaceId);
  const email = useAuthStore.getState().email;
  const { deletePin } = useDeletePin();

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorited) {
      const favorite = getFavorite(kakoPlaceId);
      if (favorite) {
        await deletePin(favorite.id);
        removeFavorite(favorite.id);
      }
    } else {
      const result = await postPin({
        name: clickedPlace.kakaoPlace.place_name || "",
        address:
          clickedPlace.kakaoPlace.road_address_name ||
          clickedPlace.kakaoPlace.address_name ||
          "",
        latitude: Number(clickedPlace.kakaoPlace.y),
        longitude: Number(clickedPlace.kakaoPlace.x),
        detailLink: `https://place.map.kakao.com/${kakoPlaceId}`,
        category: clickedPlace.kakaoPlace.category_group_name || "기타",
        author: email || "",
      });
      if (result) {
        addFavorite(
          clickedPlace.kakaoPlace,
          result.serverId,
          result.serverPlaceId
        );
      }
    }
  };

  const handleDetailClick = () => {
    const kakaoMapUrl = `https://place.map.kakao.com/${kakoPlaceId}`;
    window.open(kakaoMapUrl, "_blank", "noopener,noreferrer");
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleAddToCollection = (e: React.MouseEvent) => {
    e.stopPropagation();

    const favorite = getFavorite(kakoPlaceId);
    if (!favorite) return;

    postPlaceBlock({
      placeId: favorite.place.id,
    });

    const collectionData = {
      name: clickedPlace.kakaoPlace.place_name || "",
      address:
        clickedPlace.kakaoPlace.road_address_name ||
        clickedPlace.kakaoPlace.address_name ||
        "",
      latitude: Number(clickedPlace.kakaoPlace.y),
      longitude: Number(clickedPlace.kakaoPlace.x),
      memo: "",
      detailLink: `https://place.map.kakao.com/${kakoPlaceId}`,
      category: clickedPlace.kakaoPlace.category_group_name || "기타",
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
            <div className="text-[#5a6572] rounded-sm text-sm font-medium flex items-center justify-center py-1">
              <span className="mr-1">
                {getCategoryIcon(
                  clickedPlace.kakaoPlace?.category_group_name || "",
                  20
                )}
              </span>
              {clickedPlace.kakaoPlace?.category_group_name || "장소"}
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
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() =>
                window.open(
                  `https://place.map.kakao.com/${kakoPlaceId}`,
                  "_blank"
                )
              }
            >
              <p className="text-xl font-semibold text-[#131416] truncate hover:text-[#4f5fbf] transition-colors duration-200">
                {clickedPlace.kakaoPlace?.place_name}
              </p>
              <ChevronRight
                size={16}
                color="#c0c7ce"
                className="flex-shrink-0"
              />
            </div>
            <p className="text-sm text-[#7b8482]">
              {clickedPlace.kakaoPlace?.road_address_name ||
                clickedPlace.kakaoPlace?.address_name}
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
          <ActionBtn
            onClick={handleAddToCollection}
            disabled={isCollected || !isFavorited}
          >
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
