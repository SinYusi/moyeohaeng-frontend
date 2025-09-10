import { useState } from "react";
import { useParams } from "react-router-dom";
import baseService from "../../../service/baseService";
import type {
  CreatePlaceBlockRequest,
  PlaceBlock,
} from "../../../types/placeblock";

interface PlaceBlockResponseType {
  status: number;
  message: string;
  data: PlaceBlock;
}

const usePostPlaceBlock = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const projectId = useParams().id;

  const postPlaceBlock = async (placeBlock: CreatePlaceBlockRequest) => {
    if (!projectId) {
      console.error("Missing projectId in route params");
      setError("Missing project ID");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await baseService.post<PlaceBlockResponseType>(
        `/v1/projects/${projectId}/place-blocks`,
        placeBlock
      );

      const data = response.data.data as PlaceBlock;
      return data.id;
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
