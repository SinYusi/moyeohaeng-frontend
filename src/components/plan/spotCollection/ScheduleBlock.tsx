import { ChevronRight, Ellipsis, Pencil } from "lucide-react";
import { getCategoryIcon } from "../../../utils/categoryUtils";
import Divider from "../../common/Divider";
import { useSpotCollectionStore } from "../../../stores/useSpotCollectionStore";
import usePutMemo from "../../../hooks/plan/placeBlock/usePutMemo";
import type { PlaceBlock } from "../../../types/planTypes";
import { useState, useEffect } from "react";

const ScheduleBlock = ({ place }: { place: PlaceBlock }) => {
  const { updateCollection, getPlaceById, setClickedPlace } = useSpotCollectionStore();
  const { putMemo, loading } = usePutMemo();
  const [memoValue, setMemoValue] = useState("");

  // 전역 스토어에서 최신 데이터를 가져옴
  const currentPlace = getPlaceById(place.id) || place;

  // currentPlace.memo가 변경될 때마다 memoValue 동기화
  useEffect(() => {
    setMemoValue(currentPlace.memo || "");
  }, [currentPlace.memo]);

  const handleMemoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemoValue(e.target.value);
  };

  const handleMemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (memoValue.trim() === currentPlace.memo) {
      return; // 값이 변경되지 않으면 API 호출하지 않음
    }

    const result = await putMemo(currentPlace.id, memoValue.trim());
    
    if (result) {
      // API 성공 시 스토어 업데이트
      updateCollection(place.id, { memo: memoValue.trim() });
    }
  };

  const handleBlockClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // PlaceBlock에서 kakao place 정보 생성
    const kakaoPlaceId = currentPlace.detailLink.split("/").pop();
    
    const kakaoPlace: kakao.maps.services.PlacesSearchResultItem = {
      id: kakaoPlaceId || "",
      place_name: currentPlace.name,
      category_group_name: currentPlace.category,
      address_name: currentPlace.address,
      road_address_name: currentPlace.address,
      x: currentPlace.longitude.toString(),
      y: currentPlace.latitude.toString(),
      category_group_code: "",
      category_name: "",
      distance: "",
      phone: "",
      place_url: currentPlace.detailLink
    };

    setClickedPlace({
      position: {
        lat: currentPlace.latitude,
        lng: currentPlace.longitude
      },
      kakaoPlace,
      distance: 0
    });
  };
  return (
    // BlockFrame 컴포넌트
    <div 
      className="rounded-[14px] border border-[1.5px] border-[#131416] py-[14px] px-[26px] flex flex-col justify-center items-start self-stretch gap-1 shadow-[0_4px_8px_0_rgba(19,20,22,0.16)] cursor-pointer hover:bg-[#f9fafb] transition-colors duration-200"
      onClick={handleBlockClick}
    >
      {/* CategorySection */}
      <div className="flex justify-between items-center self-stretch">
        <div className="flex items-center gap-1 ">
          {getCategoryIcon(currentPlace.category, 16)}
          <p className="text-xs font-medium text-[#5a6572] overflow-hidden text-ellipsis whitespace-nowrap">
            {currentPlace.category}
          </p>
        </div>
        <Ellipsis size={16} color="#3b4553" />
      </div>
      {/* InfoSection */}
      <div className="flex flex-col flex-start gap-3 self-stretch">
        {/* Place */}
        <div className="flex flex-col gap-[2px]">
          {/* LocationName */}
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              if (currentPlace.detailLink) {
                window.open(currentPlace.detailLink, "_blank");
              }
            }}
          >
            <p className="text-base font-bold text-[#131416] truncate hover:text-[#4f5fbf] transition-colors duration-200">
              {currentPlace.name}
            </p>
            <ChevronRight size={16} color="#c0c7ce" className="flex-shrink-0" />
          </div>
          <p className="text-xs font-medium text-[#5a6572] overflow-hidden text-ellipsis whitespace-nowrap">
            {currentPlace.address}
          </p>
        </div>
        {/* Memo */}
        <div className="flex flex-col items-start gap-2 self-stretch">
          <Divider color="#7b8482" />
          <form onSubmit={handleMemoSubmit} className="flex items-center gap-2 w-full overflow-hidden">
            <input
              type="text"
              value={memoValue}
              onChange={handleMemoChange}
              onClick={(e) => e.stopPropagation()}
              placeholder="메모를 적어주세요 (최대 14자)"
              maxLength={14}
              disabled={loading}
              className={`flex-1 text-xs font-medium outline-none ${
                memoValue
                  ? "text-[#131416]"
                  : "text-[#7b8482] placeholder:text-[#7b8482]"
              } ${loading ? "opacity-50" : ""}`}
            />
            <button
              type="submit"
              disabled={loading}
              className={`cursor-pointer ${loading ? "opacity-50" : ""}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Pencil size={16} color="#7b8482" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleBlock;
