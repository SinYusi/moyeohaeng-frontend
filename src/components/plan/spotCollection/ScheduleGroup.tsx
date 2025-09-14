import { Ellipsis, Pencil } from "lucide-react";
import type { Group } from "../../../types/planTypes";
import Divider from "../../common/Divider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePutGroupMemo from "../../../hooks/plan/group/usePutGroupMemo";

const ScheduleGroup = ({ group }: { group: Group }) => {
  const [memoValue, setMemoValue] = useState(group.memo || "");
  const { putGroupMemo, isLoading } = usePutGroupMemo();
  const navigate = useNavigate();

  const handleMemoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemoValue(e.target.value);
  };

  const handleMemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await putGroupMemo(group.id.toString(), memoValue);
      // 성공적으로 수정되었다는 피드백을 줄 수 있습니다
    } catch (error) {
      // 에러 처리 - 이전 값으로 되돌리기
      setMemoValue(group.memo || "");
    }
  };

  const handleGroupClick = () => {
    const currentPath = window.location.pathname;
    navigate(`${currentPath}?groupId=${group.id}`);
  };
  return (
    <div className="flex items-start content-start gap-4 self-stretch flex-wrap">
      <div className="flex px-[2px] flex-col group cursor-pointer" onClick={handleGroupClick}>
        <div
          className={`w-[80%] h-2 rounded-t-[12px] border-t border-t-[1.5px] border-x border-x-[1.5px] border-[#131416] bg-[${group.color}]`}
          style={{ backgroundColor: group.color }}
        />
        {/* BlockFrame */}
        <div className="flex h-28 py-3 px-6 flex-col justify-center items-start gap-1 self-stretch border border-[#131416] border-[1.5px] rounded-r-[12px] rounded-bl-[12px] bg-[#3b4553] group-hover:bg-[#131416]">
          {/* CategorySection */}
          <div className="flex justify-between items-center self-stretch">
            <p className="text-xs text-[#c0c7ce]">
              총 장소 {group.placeBlockIds.length}개
            </p>
            <Ellipsis size={16} color="#f9fafb" />
          </div>
          {/* InfoSection */}
          <div className="flex flex-col items-start gap-3 self-stretch">
            <p className="font-bold text-[#fff] overflow-hidden text-ellipsis whitespace-nowrap">
              {group.name}
            </p>
            {/* MemoSection */}
            <div className="flex flex-col items-start gap-2 self-stretch">
              <div className="flex flex-col items-start gap-2 self-stretch">
                <Divider color="#7b8482" />
                <form
                  onSubmit={handleMemoSubmit}
                  className="flex items-center gap-2 w-full overflow-hidden"
                >
                  <input
                    type="text"
                    value={memoValue}
                    onChange={handleMemoChange}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="메모를 적어주세요 (최대 14자)"
                    maxLength={14}
                    disabled={isLoading}
                    className={`flex-1 text-xs font-medium outline-none ${
                      memoValue
                        ? "text-[#fff]"
                        : "text-[#7b8482] placeholder:text-[#7b8482]"
                    } ${isLoading ? "opacity-50" : ""}`}
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`cursor-pointer ${
                      isLoading ? "opacity-50" : ""
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Pencil size={16} color="#7b8482" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleGroup;
