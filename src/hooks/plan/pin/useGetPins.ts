import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import baseService from "../../../service/baseService";
import type { MapPin } from "../../../types/planTypes";

interface GetPinsResponse {
  data: MapPin[];
  message: string;
  status: number;
}

const useGetPins = () => {
  const [pins, setPins] = useState<MapPin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id: projectId } = useParams<{ id: string }>();
  // TODO: projectId 없을 시 에러 처리

  const fetchPins = useCallback(async () => {
    if (!projectId) return;

    try {
      setLoading(true);
      setError(null);
      const response = await baseService.get(`/v1/projects/${projectId}/pins`);
      const pinData = response.data as GetPinsResponse;
      setPins(pinData.data);
      console.log(response.data);
    } catch (error) {
      console.error("핀 데이터 로딩 실패:", error);
      setError(error as string);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  // 컴포넌트 마운트 시 자동 로딩
  useEffect(() => {
    fetchPins();
  }, [fetchPins]);

  return {
    pins,
    loading,
    error,
    refetch: fetchPins, // 수동 새로고침용
  };
};

export default useGetPins;
