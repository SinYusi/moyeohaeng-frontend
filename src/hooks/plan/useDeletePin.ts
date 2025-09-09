import { useState } from "react";
import { useParams } from "react-router-dom";
import baseService from "../../service/baseService";

const useDeletePin = () => {
  const projectId = useParams().id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // TODO: projectId 없을 시 에러 처리
  const deletePin = async (pinId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await baseService.delete(
        `/v1/projects/${projectId}/pins/${pinId}`
      );
      return response.data;
    } catch (error) {
      console.error("핀 삭제 실패:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return { deletePin, loading, error };
};

export default useDeletePin;
