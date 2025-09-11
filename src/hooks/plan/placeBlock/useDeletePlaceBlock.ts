import { useState } from "react";
import { useParams } from "react-router-dom";
import baseService from "../../../service/baseService";

interface DeletePlaceBlockResponse {
  status: number;
  message: string;
  data: string;
}

const useDeletePlaceBlock = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const projectId = useParams().id;

  const deletePlaceBlock = async (placeBlockId: string) => {
    if (!projectId) {
      console.error("projectId를 찾을 수 없습니다.");
      setError("프로젝트 ID를 찾을 수 없습니다.");
      return;
    }
    if (!placeBlockId) {
      console.error("placeBlockId를 찾을 수 없습니다.");
      setError("placeBlockId를 찾을 수 없습니다.");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await baseService.delete<DeletePlaceBlockResponse>(
        `/v1/projects/${projectId}/place-blocks/${placeBlockId}`
      );

      return response.data;
    } catch (error) {
      console.error("장소 블록 삭제 실패:", error);
      setError(error as string);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { deletePlaceBlock, loading, error };
};

export default useDeletePlaceBlock;
