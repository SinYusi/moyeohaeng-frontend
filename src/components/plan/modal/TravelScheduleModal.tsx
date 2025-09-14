import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import usePutProject from "../../../hooks/project/usePutProject";
import { useModalStore } from "../../../stores/useModalStore";
import { useScheduleStore } from "../../../stores/useScheduleStore";

const TravelScheduleModal: React.FC = () => {
  const { activeModal, modalData, closeModal } = useModalStore();
  const { setSchedule } = useScheduleStore();
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const { id: projectId } = useParams();
  const { updateProject, isLoading } = usePutProject();

  const handleClose = () => {
    // 상태 초기화
    setStartDate("");
    setDuration("");
    
    // URL에서 isNew 파라미터 제거
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("isNew");
    setSearchParams(newSearchParams);
    
    closeModal();
  };

  // endDate 계산 함수
  const calculateEndDate = (startDate: string, duration: string): string => {
    if (!startDate || !duration) return "";

    const start = new Date(startDate);
    const durationDays = parseInt(duration)
    const end = new Date(start);
    end.setDate(start.getDate() + durationDays);

    return end.toISOString().split("T")[0]; // YYYY-MM-DD 형식
  };

  // 완료 버튼 활성화 조건
  const isCompleteEnabled = () => {
    return startDate.trim() !== "" && duration.trim() !== "" && !isLoading;
  };

  // 완료 버튼 클릭 핸들러
  const handleComplete = async () => {
    if (!projectId || !isCompleteEnabled() || !modalData.projectTitle) return;

    try {
      const endDate = calculateEndDate(startDate, duration);

      await updateProject(projectId, {
        title: modalData.projectTitle, // modalData에서 title 사용
        startDate,
        endDate,
        validDateRange: true,
      });

      // 전역 스케줄 store에 일정 정보 저장
      setSchedule({
        startDate,
        endDate,
        duration: parseInt(duration),
        timeBlocks: [], // 초기에는 빈 배열
      }, projectId);
      
      // 완료 콜백 호출 (프로젝트 정보 새로고침을 위해)
      if (modalData.onTravelScheduleComplete) {
        modalData.onTravelScheduleComplete();
      }
      
      handleClose();
    } catch (error) {
      console.error("프로젝트 업데이트 실패:", error);
      // TODO: 에러 처리 (토스트 알림 등)
    }
  };

  if (activeModal !== "travelSchedule") return null;
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
        <div className="flex flex-col py-6 px-8 items-start gap-6 w-[400px] rounded-[32px] border border-[1.5px] border-[#131416] bg-[#fff]">
          {/* HeaderSection
          <div className="w-full flex items-center justify-center self-stretch">
            <p className="text-[#131416] text-[20px] font-semibold">
              여행 일정을 설정해 주세요
            </p>
          </div> */}
          {/* ContentArea */}
          <div className="flex flex-col items-start gap-4 w-full">
            {/* TitleSection
            <div className="flex flex-col items-start gap-1 w-full">
              <p className="text-[#131416] text-[16px] font-bold">여행 날짜</p>
              <p className="text-[#5a6572] text-[14px] font-normal">
                여행 날짜가 미정이라면 [일정 미정]을 선택하고,
                <br />
                정해졌다면 [날짜 설정]을 눌러 출발 날짜를 입력해주세요
              </p>
            </div>
            SegmentedControl
            <div className="flex flex-row items-center gap-1 w-full p-[2px] rounded-[6px] bg-[#edf0f3]">
              <button
                onClick={() => setSelectedOption("undecided")}
                className={`flex justify-center items-center flex-1 rounded-[4px] py-2 px-4 text-[14px] font-medium transition-colors cursor-pointer ${
                  selectedOption === "undecided"
                    ? "bg-[#fff] text-[#131416]"
                    : "bg-transparent text-[#c0c7ce]"
                }`}
              >
                일정 미정
              </button>
              <button
                onClick={() => setSelectedOption("setDate")}
                className={`flex justify-center items-center flex-1 rounded-[4px] py-2 px-4 text-[14px] font-medium transition-colors cursor-pointer ${
                  selectedOption === "setDate"
                    ? "bg-[#fff] text-[#131416]"
                    : "bg-transparent text-[#c0c7ce]"
                }`}
              >
                날짜 설정
              </button>
            </div> */}
            {/* 출발 날짜 입력 - 날짜 설정 선택 시에만 표시 */}
            <div className="flex flex-col items-start gap-[6px] w-full">
              <div className="flex gap-[2px]">
                <p className="text-[#5a6572] text-[14px] font-normal">
                  출발 날짜
                </p>
                <p className="text-[#f8536b] text-[12px] font-normal">*</p>
              </div>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="YYYY / MM / DD"
                className="flex py-[6px] px-3 items-center border border-[#c0c7ce] rounded-[6px] w-full text-lg placeholder:text-[#c0c7ce] text-[#131416]"
              />
            </div>
            <div className="flex flex-col items-start gap-[6px] w-full">
              <div className="flex">
                <p className="text-[#5a6572] text-[14px] font-normal">
                  여행 기한을 입력해주세요.
                </p>
                <p className="text-[#f8536b] text-[12px] font-normal">*</p>
              </div>

              <div className="flex items-center gap-[10px] w-full">
                <input
                  type="number"
                  min="1"
                  max="14"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="1"
                  className="flex py-[6px] px-3 items-center border border-[#c0c7ce] rounded-[6px] w-full text-lg placeholder:text-[#c0c7ce] text-[#131416]"
                />
                <p className="text-[#131416] text-[20px] font-semibold">일</p>
              </div>
              <p className="text-[#131416] text-[14px] font-normal">
                최대 14일까지 설정 가능합니다 (최소 1일)
              </p>
            </div>
            {duration && (
              <div className="flex items-start content-start gap-1 flex-wrap self-stretch">
                {Array.from({ length: Number(duration) }).map((_, index) => (
                  <div
                    key={index}
                    className="flex min-w-[36px] px-3 items-center justify-center rounded-full border border-[#edf0f3] border-[1.5px]"
                  >
                    <p className="text-[#131416] text-[16px] font-semibold">
                      {index + 1}일
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* ButtonArea */}
          <div className="flex flex-row justify-center items-center w-full gap-3">
            <button
              onClick={handleClose}
              className="flex h-[52px] justify-center items-center gap-[4px] flex-1 text-[#131416] text-[16px] font-semibold rounded-[6px] border border-[1.5px] border-[#c0c7ce] hover:bg-[#f9fafb] active:bg-[#e7edf6] cursor-pointer"
            >
              그만두기
            </button>
            <button
              onClick={handleComplete}
              disabled={!isCompleteEnabled()}
              className={`flex h-[52px] justify-center items-center gap-[4px] flex-1 text-[16px] font-semibold rounded-[6px] border border-[1.5px] border-[#c0c7ce] ${
                isCompleteEnabled()
                  ? "text-[#131416] hover:bg-[#f9fafb] active:bg-[#e7edf6] cursor-pointer"
                  : "text-[#c0c7ce] bg-[#edf0f3] cursor-not-allowed"
              }`}
            >
              {isLoading ? "저장 중..." : "완료"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelScheduleModal;
