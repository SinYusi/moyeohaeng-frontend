import { useCallback, useEffect, useState } from "react";
import type { PlaceBlock } from "../../../types/planTypes";
import baseService from "../../../service/baseService";
import { useParams } from "react-router-dom";

interface PlaceBlockResponseType {
  status: number;
  message: string;
  data: PlaceBlock[];
}

const useGetPlaceBlock = () => {
  const [placeBlocks, setPlaceBlocks] = useState<PlaceBlock[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  const getPlaceBlock = useCallback(async () => {
    if (!id) {
      setError("Project ID is required");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await baseService.get<PlaceBlockResponseType>(
        `/v1/projects/${id}/place-blocks`
      );
      setPlaceBlocks(response.data.data);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getPlaceBlock();
  }, [getPlaceBlock]);

  return { placeBlocks, loading, error, getPlaceBlock };
};

export default useGetPlaceBlock;
