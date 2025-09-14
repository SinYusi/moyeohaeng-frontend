import MapSection from "../components/plan/map/MapSection";
import CommentSheet from "../components/plan/modal/CommentSheet";
import PlanHeader from "../components/plan/header/PlanHeader";
import SpotCollectionBoard from "../components/plan/spotCollection/SpotCollectionBoard";
import useGetProjectInfo from "../hooks/project/useGetProjectInfo";
import { useModalStore } from "../stores/useModalStore";
import { useSpotCollectionStore } from "../stores/useSpotCollectionStore";
import {
  useScheduleStore,
  isScheduleMatchingProject,
} from "../stores/useScheduleStore";
import { SSEService } from "../service/SSEService";
import useGetPlaceBlock from "../hooks/plan/placeBlock/useGetPlaceBlock";
import CreateGroupSheet from "../components/plan/modal/CreateGroupSheet";
import GroupDetailPanel from "../components/plan/spotCollection/GroupDetailPanel";
import TravelScheduleModal from "../components/plan/modal/TravelScheduleModal";
import AddToScheduleModal from "../components/plan/modal/AddToScheduleModal";
import { useSearchParams, useParams } from "react-router-dom";
import { useSSEEventHandler } from "../hooks/plan/sse/useSSEEventHandler";
import { useEffect } from "react";
import Schedule from "../hooks/plan/schedule/Schedule";

const Plan = () => {
  const { projectInfo, getProjectInfo } = useGetProjectInfo();
  const [searchParams] = useSearchParams();
  const { id: projectId } = useParams<{ id: string }>();
  const groupId = searchParams.get("groupId");
  const { refetch } = useGetPlaceBlock();
  const { activeModal, openTravelScheduleModal } = useModalStore();
  const { setSchedule, setCurrentProject, clearSchedule } = useScheduleStore();
  const { setClickedPlace } = useSpotCollectionStore();
  const isNew = searchParams.get("isNew") === "true";

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

  // 프로젝트 ID 변경 시 현재 프로젝트 설정
  useEffect(() => {
    if (projectId) {
      setCurrentProject(projectId);
    }
  }, [projectId, setCurrentProject]);

  // 프로젝트 정보가 변경될 때 전역 스케줄 store 업데이트
  useEffect(() => {
    if (!projectInfo || !projectId) return;

    // 현재 store에 저장된 일정이 프로젝트와 일치하는지 확인
    const isMatching = isScheduleMatchingProject(projectInfo);

    // 프로젝트에 일정 정보가 있는 경우
    if (
      projectInfo.startDate &&
      projectInfo.endDate &&
      projectInfo.durationDays > 0
    ) {
      // 이미 일치하는 일정이 있으면 업데이트하지 않음 (불필요한 리렌더링 방지)
      if (isMatching) {
        return;
      }

      setSchedule(
        {
          startDate: projectInfo.startDate,
          endDate: projectInfo.endDate,
          duration: projectInfo.durationDays,
          timeBlocks: [], // DB에서 가져온 시간 블록들로 교체 (TODO: API 연동 시 수정)
        },
        projectId
      );
    } else {
      // 프로젝트에 일정 정보가 없는 경우 (DB에 저장된 일정이 없음)

      setSchedule(
        {
          startDate: "",
          endDate: "",
          duration: 0,
          timeBlocks: [],
        },
        projectId
      );
    }
  }, [projectInfo, projectId, setSchedule, setCurrentProject]);

  useEffect(() => {
    if (isNew && projectInfo?.title) {
      openTravelScheduleModal(projectInfo.title, getProjectInfo);
    }
  }, [isNew, projectInfo?.title, openTravelScheduleModal, getProjectInfo]);

  // Plan 페이지에서 나갈 때 일정 관련 store 정리
  useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 store 클리어
      clearSchedule();
      setClickedPlace(null);
      console.log("Plan 페이지 종료: 일정 관련 store 정리 완료");
    };
  }, [clearSchedule, setClickedPlace]);

  return (
    <div className="flex w-full h-screen bg-gray-100 overflow-hidden">
      {/* 좌측 영역 (헤더 + 좌측 패널 + 중간 패널) */}
      <div className="flex flex-col w-[57.292%]">
        {/* 상단 헤더 - 좌측 패널과 중간 패널을 통과 */}
        <PlanHeader projectName={projectInfo?.title || ""} />

        {/* 좌측 패널과 중간 패널 컨테이너 */}
        <div className="flex flex-1 min-h-0">
          {/* 좌측 패널 - 셀렉션 및 스크랩북 */}
          <div className="w-[70.833%] h-full bg-white relative">
            {groupId ? <GroupDetailPanel /> : <SpotCollectionBoard />}
          </div>

          {/* 중간 패널 - 여행 일정 */}
          <div
            className={`relative w-[29.167%] h-full bg-white border-x border-x-[1.5px] border-[#131416] ${
              activeModal === null ? "overflow-y-auto" : "overflow-y-hidden"
            }`}
          >
            {activeModal === "comment" && <CommentSheet />}
            {activeModal === "createGroup" && <CreateGroupSheet />}

            <Schedule
              projectTitle={projectInfo?.title || ""}
              onScheduleUpdate={getProjectInfo}
            />
          </div>
        </div>
      </div>

      {/* 우측 패널 - 지도 */}
      <div className="w-[42.708%] h-full bg-white">
        <MapSection />
      </div>

      <TravelScheduleModal />
      <AddToScheduleModal />
    </div>
  );
};

export default Plan;
