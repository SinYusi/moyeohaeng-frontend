import { useState } from "react";
import { useParams } from "react-router-dom";
import baseService from "../../../service/baseService";

interface CreateTimeBlockRequest {
  day: number;
  startTime?: string;
  endTime?: string;
  memo?: string;
  placeId: number;
}

interface CreateTimeBlockResponseData {
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

interface CreateTimeBlockResponse {
  status: number;
  message: string;
  data: CreateTimeBlockResponseData;
}

const usePostTimeBlock = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const projectId = useParams().id;

  const createTimeBlock = async (
    timeBlockData: CreateTimeBlockRequest
  ): Promise<CreateTimeBlockResponseData | null> => {
    console.log(timeBlockData);
    if (!projectId) {
      console.error("projectId를 찾을 수 없습니다.");
      setError("프로젝트 ID를 찾을 수 없습니다.");
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await baseService.post<CreateTimeBlockResponse>(
        `/v1/projects/${projectId}/time-blocks`,
        timeBlockData
      );

      if (response.data.status === 201) {
        return response.data.data;
      }

      return null;
    } catch (error: any) {
      console.error("시간 블록 생성 실패:", error);
      const errorMessage =
        error.response?.data?.message || "시간 블록 생성에 실패했습니다.";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createTimeBlock, loading, error };
};

export default usePostTimeBlock;
