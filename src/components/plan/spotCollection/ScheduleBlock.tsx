import { ChevronRight, Ellipsis, Pencil } from "lucide-react";
import { getCategoryIcon } from "../../../utils/categoryUtils";
import Divider from "../../common/Divider";
import { useSpotCollectionStore } from "../../../stores/useSpotCollectionStore";
import type { PlaceBlock } from "../../../types/planTypes";

const ScheduleBlock = ({ place }: { place: PlaceBlock }) => {
  const { updateCollection, getPlaceById } = useSpotCollectionStore();
  
  // 전역 스토어에서 최신 데이터를 가져옴
  const currentPlace = getPlaceById(place.id) || place;

  const handleMemoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMemo = e.target.value;
    updateCollection(place.id, { memo: newMemo });
  };
  return (
    // BlockFrame 컴포넌트
    <div className="rounded-[14px] border border-[1.5px] border-[#131416] py-[14px] px-[26px] flex flex-col justify-center items-start self-stretch gap-1 shadow-[0_4px_8px_0_rgba(19,20,22,0.16)]">
      {/* CategorySection */}
      <div className="flex justify-between items-center self-stretch">
        <div className="flex items-center gap-1 ">
          {getCategoryIcon(currentPlace.category, 16)}
          <p className="text-xs font-medium text-[#5a6572]">{currentPlace.category}</p>
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
            onClick={() => {
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
          <div className="flex items-center gap-2 w-full overflow-hidden">
            <input
              type="text"
              value={currentPlace.memo || ""}
              onChange={handleMemoChange}
              placeholder="메모를 적어주세요 (최대 14자)"
              maxLength={14}
              className={`flex-1 text-xs font-medium outline-none ${
                currentPlace.memo
                  ? "text-[#131416]"
                  : "text-[#7b8482] placeholder:text-[#7b8482]"
              }`}
            />
            <Pencil size={16} color="#7b8482" className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleBlock;
