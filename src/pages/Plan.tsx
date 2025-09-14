import { useEffect } from "react";
import MapSection from "../components/plan/map/MapSection";
import CommentSheet from "../components/plan/modal/CommentSheet";
import PlanHeader from "../components/plan/header/PlanHeader";
import SpotCollectionBoard from "../components/plan/spotCollection/SpotCollectionBoard";
import useGetProjectInfo from "../hooks/project/useGetProjectInfo";
import { useModalStore } from "../stores/useModalStore";
import { useParams } from "react-router-dom";
import { SSEService } from "../service/SSEService";
import useGetPlaceBlock from "../hooks/plan/placeBlock/useGetPlaceBlock";
import CreateGroupSheet from "../components/plan/modal/CreateGroupSheet";
import GroupDetailPanel from "../components/plan/spotCollection/GroupDetailPanel";
import { useSearchParams } from "react-router-dom";
import { useSSEEventHandler } from "../hooks/plan/sse/useSSEEventHandler";

const Plan = () => {
  const { projectInfo } = useGetProjectInfo();
  const [searchParams] = useSearchParams();
  const groupId = searchParams.get("groupId");
  const { id: projectId } = useParams<{ id: string }>();
  const { refetch } = useGetPlaceBlock();
  const { activeModal } = useModalStore();

  const handleSSEEvent = useSSEEventHandler(refetch);

  useEffect(() => {
    if (!projectId) {
      console.warn("No project ID available for SSE connection");
      return;
    }

    console.log("Setting up SSE connection for project:", projectId);
    const sseService = SSEService.getInstance();
    sseService.setProjectId(projectId);

    // SSE 이벤트 구독
    const unsubscribeLike = sseService.subscribe(
      "PLACE_BLOCK_LIKE",
      (data: any) => {
        try {
          handleSSEEvent(data);
        } catch (error) {
          console.error("[SSE] Error processing LIKE event:", error);
        }
      }
    );

    const unsubscribeBlock = sseService.subscribe(
      "PLACE_BLOCK",
      (data: any) => {
        try {
          handleSSEEvent(data);
        } catch (error) {
          console.error("[SSE] Error processing BLOCK event:", error);
        }
      }
    );

    // 디버깅을 위한 상태 검사
    const checkConnection = () => {
      const connections = (sseService as any).connections?.size || 0;
      const listeners = (sseService as any).listeners?.size || 0;
      console.log("SSE connection state:", {
        projectId,
        connections,
        listeners,
        timestamp: new Date().toISOString(),
      });
    };

    const timer = setTimeout(checkConnection, 1000);

    return () => {
      console.log("Cleaning up SSE connection for project:", projectId);
      clearTimeout(timer);
      unsubscribeLike();
      unsubscribeBlock();
    };
  }, [projectId]);
  return (
    <div className="flex w-full h-screen bg-gray-100 overflow-hidden">
      {/* 좌측 영역 (헤더 + 좌측 패널 + 중간 패널) */}
      <div className="flex flex-col w-[57.292%]">
        {/* 상단 헤더 - 좌측 패널과 중간 패널을 통과 */}
        <PlanHeader projectName={projectInfo?.title || ""} />

        {/* 좌측 패널과 중간 패널 컨테이너 */}
        <div className="flex flex-1 min-h-0">
          {/* 좌측 패널 - 셀렉션 및 스크랩북 */}
          <div className="w-[70.833%] h-full bg-white border-r border-gray-200 relative">
            {groupId ? <GroupDetailPanel /> : <SpotCollectionBoard />}
          </div>

          {/* 중간 패널 - 여행 일정 */}
          <div
            className={`relative w-[29.167%] h-full bg-white border-r border-gray-200 ${
              activeModal === null ? "overflow-y-auto" : "overflow-y-hidden"
            }`}
          >
            {activeModal === "comment" && <CommentSheet />}
            {activeModal === "createGroup" && <CreateGroupSheet />}
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
