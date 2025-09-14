import { CalendarDays, ChevronRight, Download, Settings } from "lucide-react";
import { useState } from "react";
import GrayBgTextBtn from "../../../components/common/GrayBgTextBtn";
import { useModalStore } from "../../../stores/useModalStore";
import { useScheduleStore } from "../../../stores/useScheduleStore";
import useGetTimeBlocks from "./useGetTimeBlocks";
import ScheduleBlock from "../../../components/plan/spotCollection/ScheduleBlock";
import type { PlaceBlock, ScheduleTimeBlock } from "../../../types/planTypes";

const Schedule = ({
  projectTitle,
  onScheduleUpdate,
}: {
  projectTitle: string;
  onScheduleUpdate?: () => void;
}) => {
  const { openTravelScheduleModal } = useModalStore();
  const { schedule, getTimeBlocksByDay } = useScheduleStore();
  const { loading: timeBlocksLoading, error: timeBlocksError } = useGetTimeBlocks();
  const [selectedDay, setSelectedDay] = useState<number>(1);

  // ScheduleTimeBlock을 PlaceBlock으로 변환하는 함수
  const convertTimeBlockToPlaceBlock = (timeBlock: ScheduleTimeBlock): PlaceBlock => {
    return {
      id: timeBlock.id,
      name: timeBlock.placeDetail.name,
      address: timeBlock.placeDetail.address,
      latitude: timeBlock.placeDetail.latitude,
      longitude: timeBlock.placeDetail.longitude,
      detailLink: timeBlock.placeDetail.detailLink,
      category: timeBlock.placeDetail.category,
      memo: timeBlock.memo || "",
      createAt: new Date().toISOString(), // 임시로 현재 시간 설정
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
  };

  // 전역 store에서 일정 정보 가져오기
  const startDate = schedule?.startDate || "";
  const endDate = schedule?.endDate || "";
  const durationDays = schedule?.duration || 0;
  const travelDays = Array.from({ length: durationDays }, (_, i) => i + 1);

  // 선택된 날짜의 시간 블록들 가져오기
  const selectedDayTimeBlocks = getTimeBlocksByDay(selectedDay);

  // 선택된 날짜 계산
  const getSelectedDate = () => {
    if (!startDate || startDate === endDate) return "";

    const start = new Date(startDate);
    const selectedDate = new Date(start);
    selectedDate.setDate(start.getDate() + (selectedDay - 1));

    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const date = selectedDate.getDate();

    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeek = dayNames[selectedDate.getDay()];

    return `${year}.${month.toString().padStart(2, "0")}.${date
      .toString()
      .padStart(2, "0")} (${dayOfWeek})`;
  };

  return (
    <div className="w-full flex flex-col items-center bg-[#f9fafb] h-full">
      {/* ScheduleHeader */}
      <div className="w-full flex py-3 px-4 flex-col items-start gap-3">
        {/* Header */}
        <div className="flex justify-between items-center w-full">
          {/* Title */}
          <div className="flex items-center gap-1">
            <CalendarDays size={20} stroke="#131416" strokeWidth={1.5} />
            <p className="text-[#131416] text-sm font-semibold">여행 일정</p>
          </div>
          <div className="flex items-center gap-2">
            <Download size={20} stroke="#131416" strokeWidth={1.5} />
            <GrayBgTextBtn>
              <Settings
                size={20}
                stroke="#131416"
                strokeWidth={1.5}
                className="cursor-pointer"
                onClick={() =>
                  openTravelScheduleModal(projectTitle, onScheduleUpdate)
                }
              />
            </GrayBgTextBtn>
          </div>
        </div>
        {startDate === endDate ? (
          <div className="flex items-center justify-between w-full">
            <p className="text-[#7b8482] text-xs 2xl:text-sm">
              여행 날짜를 설정해 주세요
            </p>
            <GrayBgTextBtn
              onClick={() =>
                openTravelScheduleModal(projectTitle, onScheduleUpdate)
              }
            >
              <div className="flex items-center gap-1">
                <p className="text-[#3864f4] text-xs 2xl:text-sm">날짜 설정</p>
                <ChevronRight size={16} stroke="#3864f4" strokeWidth={1.5} />
              </div>
            </GrayBgTextBtn>
          </div>
        ) : (
          <div className="w-full">
            {/* 여행 일자 버튼들 - 줄바꿈 방식 */}
            <div className="flex flex-wrap gap-2 w-full">
              {travelDays.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`flex border border-[1.5px] border-[#edf0f3] items-center justify-center h-9 rounded-[6px] font-semibold transition-colors whitespace-nowrap ${
                    selectedDay === day
                      ? "bg-[#131416] text-white border-none px-2"
                      : "bg-white text-[#131416] border border-[#e5e7eb] hover:bg-[#f3f4f6] px-3"
                  }`}
                >
                  {selectedDay === day ? `${day}일차` : day}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="flex items-center gap-1">
          <p className="text-[#131416] text-sm font-semibold">
            {durationDays > 0 && `${selectedDay}일차`}
          </p>
          <p className="text-[#7b8482] text-xs">{getSelectedDate()}</p>
        </div>
      </div>

      {/* 시간 블록 목록 */}
      <div className="flex-1 w-full px-4 pb-4 overflow-y-auto">
        {timeBlocksError && (
          <div className="text-red-500 text-sm p-2 bg-red-50 rounded-[6px] border border-red-200 mb-3">
            {timeBlocksError}
          </div>
        )}
        
        {timeBlocksLoading ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-[#7b8482] text-sm">시간 블록을 불러오는 중...</p>
          </div>
        ) : selectedDayTimeBlocks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-center">
            {durationDays > 0 ? (
              <>
                <p className="text-[#7b8482] text-sm mb-2">
                  {selectedDay}일차에 등록된 일정이 없습니다.
                </p>
                <p className="text-[#7b8482] text-xs">
                  장소를 선택하고 '일정에 추가' 버튼을 눌러보세요.
                </p>
              </>
            ) : (
              <>
                <p className="text-[#7b8482] text-sm mb-2">
                  여행 날짜를 먼저 설정해주세요.
                </p>
                <p className="text-[#7b8482] text-xs">
                  상단의 ⚙️ 버튼을 눌러 여행 일정을 설정하세요.
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {selectedDayTimeBlocks
              .sort((a, b) => {
                // 시간이 있는 블록과 없는 블록을 분리하여 정렬
                const hasTimeA = a.startTime && a.endTime;
                const hasTimeB = b.startTime && b.endTime;
                
                // 둘 다 시간이 있는 경우: 시간 순으로 정렬
                if (hasTimeA && hasTimeB) {
                  return a.startTime!.localeCompare(b.startTime!);
                }
                
                // 하나만 시간이 있는 경우: 시간이 있는 것을 먼저
                if (hasTimeA && !hasTimeB) {
                  return -1;
                }
                if (!hasTimeA && hasTimeB) {
                  return 1;
                }
                
                // 둘 다 시간이 없는 경우: 저장된 순서 유지 (id로 정렬)
                return a.id.localeCompare(b.id);
              })
              .map((timeBlock) => (
                <div key={timeBlock.id} className="flex flex-col">
                  {/* 시간 정보 */}
                  <div className="flex items-center">
                    <span className="text-[#131416] text-sm font-semibold">
                      {timeBlock.startTime && timeBlock.endTime ? (
                        `${timeBlock.startTime.slice(0, 5)} - ${timeBlock.endTime.slice(0, 5)}`
                      ) : (
                        "시간 미정"
                      )}
                    </span>
                  </div>
                  
                  {/* ScheduleBlock 컴포넌트 사용 */}
                  <ScheduleBlock 
                    place={convertTimeBlockToPlaceBlock(timeBlock)}
                    isSelectionMode={false}
                    isSelected={false}
                  />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
