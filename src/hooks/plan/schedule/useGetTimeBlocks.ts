import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseService from "../../../service/baseService";
import { useScheduleStore } from "../../../stores/useScheduleStore";
import type { ScheduleTimeBlock } from "../../../types/planTypes";

interface GetTimeBlocksResponseData {
  id: number;
  day: number;
  startTime: string;
  endTime: string;
  memo: string;
  placeDetail: {
    id: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    detailLink: string;
    category: string;
  };
}

interface GetTimeBlocksResponse {
  status: number;
  message: string;
  data: GetTimeBlocksResponseData[];
}

const useGetTimeBlocks = () => {
  const [timeBlocks, setLocalTimeBlocks] = useState<ScheduleTimeBlock[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { id: projectId } = useParams<{ id: string }>();
  const { setTimeBlocks: setStoreTimeBlocks } = useScheduleStore();

  const fetchTimeBlocks = useCallback(async () => {
    if (!projectId) {
      console.error("projectId를 찾을 수 없습니다.");
      setError("프로젝트 ID를 찾을 수 없습니다.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await baseService.get<GetTimeBlocksResponse>(
        `/v1/projects/${projectId}/time-blocks`
      );

      if (response.data.status === 200) {
        // API 응답 데이터를 ScheduleTimeBlock 형태로 변환
        const convertedTimeBlocks: ScheduleTimeBlock[] = response.data.data.map(
          (block) => ({
            id: block.id.toString(),
            day: block.day,
            startTime: block.startTime || null,
            endTime: block.endTime || null,
            memo: block.memo,
            placeDetail: {
              id: block.placeDetail.id.toString(),
              name: block.placeDetail.name,
              address: block.placeDetail.address,
              latitude: block.placeDetail.latitude,
              longitude: block.placeDetail.longitude,
              detailLink: block.placeDetail.detailLink,
              category: block.placeDetail.category,
            },
          })
        );

        setLocalTimeBlocks(convertedTimeBlocks);

        // 전역 store에 시간 블록들을 저장
        setStoreTimeBlocks(convertedTimeBlocks);

        return convertedTimeBlocks;
      }

      return [];
    } catch (error: any) {
      console.error("시간 블록 조회 실패:", error);
      const errorMessage =
        error.response?.data?.message || "시간 블록 조회에 실패했습니다.";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [projectId, setStoreTimeBlocks]);

  useEffect(() => {
    if (projectId) {
      fetchTimeBlocks();
    }
  }, [fetchTimeBlocks]);

  return { timeBlocks, loading, error, refetch: fetchTimeBlocks };
};

export default useGetTimeBlocks;
