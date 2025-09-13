import MapSection from "../components/plan/map/MapSection";
import CommentSheet from "../components/plan/modal/CommentSheet";
import PlanHeader from "../components/plan/PlanHeader";
import SpotCollectionBoard from "../components/plan/spotCollection/SpotCollectionBoard";
import useGetProjectInfo from "../hooks/project/useGetProjectInfo";
import { useModalStore } from "../stores/useModalStore";

const Plan = () => {
  const { activeModal } = useModalStore();
  const { projectInfo } = useGetProjectInfo();

  return (
    <div className="flex w-full h-screen bg-gray-100 overflow-hidden">
      {/* 좌측 영역 (헤더 + 좌측 패널 + 중간 패널) */}
      <div className="flex flex-col w-[57.292%]">
        {/* 상단 헤더 - 좌측 패널과 중간 패널을 통과 */}
        <PlanHeader projectName={projectInfo?.title || ""} />

        {/* 좌측 패널과 중간 패널 컨테이너 */}
        <div className="flex flex-1 min-h-0">
          {/* 좌측 패널 - 셀렉션 및 스크랩북 */}
          <div className="w-[70.833%] h-full bg-white border-r border-gray-200">
            <SpotCollectionBoard />
          </div>

          {/* 중간 패널 - 여행 일정 */}
          <div
            className={`relative w-[29.167%] h-full bg-white border-r border-gray-200 ${
              activeModal === null ? "overflow-y-auto" : "overflow-y-hidden"
            }`}
          >
            {activeModal === "comment" && <CommentSheet />}
            <div className="p-5">
              <h2 className="text-lg font-medium text-gray-800 mb-2">
                중간 패널
              </h2>
              <p className="text-sm text-gray-600">여행 일정 영역</p>
            </div>
          </div>
        </div>
      </div>

      {/* 우측 패널 - 지도 */}
      <div className="w-[42.708%] h-full bg-white">
        <MapSection />
      </div>
    </div>
  );
};

export default Plan;
