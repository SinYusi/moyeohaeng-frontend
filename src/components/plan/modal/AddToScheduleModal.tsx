import React, { useState } from "react";
import { X } from "lucide-react";
import { useModalStore } from "../../../stores/useModalStore";
import { useScheduleStore } from "../../../stores/useScheduleStore";
import usePostTimeBlock from "../../../hooks/plan/schedule/usePostTimeBlock";
import type { ScheduleTimeBlock } from "../../../types/planTypes";

const AddToScheduleModal: React.FC = () => {
  const { activeModal, modalData, closeModal } = useModalStore();
  const { schedule, addTimeBlock } = useScheduleStore();
  const { createTimeBlock, loading, error } = usePostTimeBlock();
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<string>("undecided");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [memo, setMemo] = useState<string>("");
  console.log(modalData);

  const handleClose = () => {
    setMemo("");
    setStartTime("");
    setEndTime("");
    setSelectedOption("undecided");
    closeModal();
  };

  // 저장하기 버튼 활성화 조건: 시간 설정을 선택했을 때 시작 시간이나 종료 시간 중 하나라도 설정되어 있거나, 시간 미정을 선택했을 때
  const isSaveButtonEnabled = () => {
    if (selectedOption === "undecided") {
      return true;
    }
    return selectedOption === "setDate" && (startTime || endTime);
  };

  const handleAddToSchedule = async () => {
    if (!modalData.placeInfo || !schedule) {
      console.error("장소 정보 또는 일정 정보가 없습니다.");
      return;
    }

    try {
      // 시간 계산 로직
      let finalStartTime = undefined;
      let finalEndTime = undefined;

      if (selectedOption === "setDate") {
        if (startTime && endTime) {
          // 둘 다 입력된 경우
          finalStartTime = startTime;
          finalEndTime = endTime;
        } else if (startTime && !endTime) {
          // 시작 시간만 입력된 경우 - 시작 시간 + 1시간
          finalStartTime = startTime;
          const [hours, minutes] = startTime.split(':').map(Number);
          const endHours = (hours + 1) % 24;
          finalEndTime = `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        } else if (!startTime && endTime) {
          // 종료 시간만 입력된 경우 - 종료 시간 - 1시간
          finalEndTime = endTime;
          const [hours, minutes] = endTime.split(':').map(Number);
          const startHours = hours === 0 ? 23 : hours - 1;
          finalStartTime = `${startHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        }
      }

      const timeBlockData = {
        day: selectedDay,
        startTime: finalStartTime,
        endTime: finalEndTime,
        memo: memo.trim() || undefined,
        placeId: parseInt(modalData.placeInfo.kakoPlaceId || "0")
      };

      const responseData = await createTimeBlock(timeBlockData);
      
      if (responseData) {
        // API 응답 데이터를 ScheduleTimeBlock 형태로 변환
        const newTimeBlock: ScheduleTimeBlock = {
          id: responseData.id.toString(),
          day: responseData.day,
          startTime: responseData.startTime || null,
          endTime: responseData.endTime || null,
          memo: responseData.memo,
          placeDetail: {
            id: responseData.placeDetail.id.toString(),
            name: responseData.placeDetail.name,
            address: responseData.placeDetail.address,
            latitude: responseData.placeDetail.latitude,
            longitude: responseData.placeDetail.longitude,
            detailLink: responseData.placeDetail.detailLink,
            category: responseData.placeDetail.category,
          },
        };

        addTimeBlock(newTimeBlock);
        console.log(`장소를 ${selectedDay}일차에 추가:`, newTimeBlock);
        handleClose();
      }
    } catch (error) {
      console.error("시간 블록 생성 실패:", error);
      // 에러 처리는 훅에서 이미 처리되므로 여기서는 로그만 남김
    }
  };

  if (activeModal !== "addToSchedule") return null;

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className="fixed inset-0 z-50"
        style={{ backgroundColor: "#7b8482", opacity: 0.32 }}
        onClick={handleClose}
      />

      {/* 모달 컨텐츠 */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="flex flex-col w-[400px] py-6 px-8 rounded-[32px] bg-white border border-[1.5px] border-[#131416]">
          {/* 헤더 섹션 */}
          <div className="flex items-center justify-center w-full mb-6 relative">
            <h2 className="text-[#131416] text-[20px] font-semibold">
              일정에 추가
            </h2>
            <button
              onClick={handleClose}
              className="absolute right-0 cursor-pointer hover:opacity-70 transition-opacity"
            >
              <X color="#3b4553" size={24} />
            </button>
          </div>

          {/* 컨텐츠 영역 */}
          <div className="flex flex-col items-start gap-4 self-stretch">
            <div className="flex flex-col items-start gap-1 self-stretch rounded-[6px] py-6 px-3 border border-[#c0c7c2]">
              <div className="flex items-center gap-2">
                <p className="text-[#131416] text-[20px] font-semibold flex-wrap overflow-hidden text-ellipsis whitespace-nowrap">
                  {modalData.placeInfo?.placeName}
                </p>
                <p className="text-[#7b8482] text-sm font-medium">
                  {modalData.placeInfo?.category}
                </p>
              </div>
              <p className="text-[#7b8482] font-medium">
                {modalData.placeInfo?.address}
              </p>
            </div>

            {/* 일차 선택 섹션 */}
            {schedule && schedule.duration > 0 ? (
              <div className="flex flex-col items-start gap-[6px] self-stretch">
                <p className="text-[#5a6572] text-[14px]">날짜 선택</p>
                <div className="flex flex-wrap gap-1 w-full">
                  {Array.from(
                    { length: schedule.duration },
                    (_, i) => i + 1
                  ).map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`flex border border-[1.5px] border-[#edf0f3] items-center justify-center h-9 rounded-full font-semibold transition-colors whitespace-nowrap px-3 ${
                        selectedDay === day
                          ? "bg-[#4f5fbf] text-white border-none"
                          : "bg-white text-[#131416] border border-[#e5e7eb] hover:bg-[#f3f4f6]"
                      }`}
                    >
                      {day}일차
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-start gap-2 self-stretch">
                <p className="text-[#7b8482] text-[14px] font-normal">
                  여행 날짜를 먼저 설정해주세요.
                </p>
              </div>
            )}

            <div className="flex flex-col items-start gap-1">
              <p className="text-[#131416] font-bold">시간 설정</p>
              <p className="text-[#5a6572] text-[14px]">
                언제 갈지 아직 안 정했다면 [시간 미정] 클릭! <br />
                시간이 정해졌다면 [시간 설정] 버튼을 눌러 시간을 설정해주세요.
              </p>
            </div>

            <div className="flex flex-row items-center gap-1 w-full p-[2px] rounded-[6px] bg-[#edf0f3]">
              <button
                onClick={() => setSelectedOption("undecided")}
                className={`flex justify-center items-center flex-1 rounded-[4px] py-2 px-4 text-[14px] font-medium transition-colors cursor-pointer ${
                  selectedOption === "undecided"
                    ? "bg-[#fff] text-[#131416]"
                    : "bg-transparent text-[#c0c7ce]"
                }`}
              >
                시간 미정
              </button>
              <button
                onClick={() => setSelectedOption("setDate")}
                className={`flex justify-center items-center flex-1 rounded-[4px] py-2 px-4 text-[14px] font-medium transition-colors cursor-pointer ${
                  selectedOption === "setDate"
                    ? "bg-[#fff] text-[#131416]"
                    : "bg-transparent text-[#c0c7ce]"
                }`}
              >
                시간 설정
              </button>
            </div>

            {/* 시간 설정 입력창 - 시간 설정 버튼을 눌렀을 때만 표시 */}
            {selectedOption === "setDate" && (
              <div className="flex items-start gap-2 w-full">
                <div className="flex flex-col items-start gap-[6px] flex-1">
                  <p className="text-[#5a6572] text-[14px]">시작 시간</p>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3 py-2 border border-[#c0c7ce] rounded-[6px] text-sm"
                  />
                </div>
                <div className="flex flex-col items-start gap-[6px] flex-1">
                  <p className="text-[#5a6572] text-[14px]">종료 시간</p>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3 py-2 border border-[#c0c7ce] rounded-[6px] text-sm"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col justify-center items-start w-full border-b border-[#c0c7ce] pb-2">
              <p className="text-[#5a6572] text-[14px]">메모</p>
              <div className="flex justify-between items-center w-full mb-1">
                <input
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  maxLength={14}
                  className="w-full py-1 placeholder:text-[#7b8482] outline-none border-none"
                  placeholder="메모를 적어보세요"
                />
                <span className="text-[#7b8482] text-[12px]">
                  ({memo.length}/14)
                </span>
              </div>
            </div>
            {/* 에러 메시지 */}
            {error && (
              <div className="text-red-500 text-sm p-2 bg-red-50 rounded-[6px] border border-red-200">
                {error}
              </div>
            )}

            {/* 확인/취소 버튼 */}
            <button 
              onClick={handleAddToSchedule}
              disabled={!isSaveButtonEnabled() || loading}
              className={`flex h-13 rounded-[6px] px-6 items-center justify-center w-full transition-colors ${
                isSaveButtonEnabled() && !loading
                  ? "text-white bg-[#4f5fbf] hover:bg-[#3f4f9f] cursor-pointer"
                  : "text-[#a0a0a0] bg-[#e5e5e5] cursor-not-allowed"
              }`}
            >
              {loading ? "저장 중..." : "저장하기"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddToScheduleModal;
