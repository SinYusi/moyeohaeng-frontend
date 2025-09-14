import { useState } from "react";
import { useParams } from "react-router-dom";
import baseService from "../../../service/baseService";
import type { PostPlaceBlockResponse } from "../../../types/planTypes";

interface PlaceBlockResponseType {
  status: number;
  message: string;
  data: PostPlaceBlockResponse;
}

const usePostPlaceBlock = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const projectId = useParams().id;

  const postPlaceBlock = async (placeId: string) => {
    if (!projectId) {
      console.error("projectId를 찾을 수 없습니다.");
      setError("프로젝트 ID를 찾을 수 없습니다.");
      return;
    }
    if (!placeId) {
      console.error("placeId를 찾을 수 없습니다.");
      setError("placeId를 찾을 수 없습니다.");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await baseService.post<PlaceBlockResponseType>(
        `/v1/projects/${projectId}/place-blocks`,
        { placeId }
      );

      return response.data.data;
    } catch (error) {
      console.error(error);
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  return { postPlaceBlock, loading, error };
};

export default usePostPlaceBlock;
