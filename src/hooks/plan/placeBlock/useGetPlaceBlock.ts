import { useCallback, useEffect, useState } from "react";
import type { PlaceBlock } from "../../../types/planTypes";
import baseService from "../../../service/baseService";
import { useParams } from "react-router-dom";
import { useSpotCollectionStore } from "../../../stores/useSpotCollectionStore";

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

  const refetch = useCallback(async () => {
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
      const newPlaceBlocks = response.data.data;
      setPlaceBlocks(newPlaceBlocks);
      // store 상태 업데이트
      useSpotCollectionStore.getState().fetchCollections(newPlaceBlocks);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { placeBlocks, loading, error, refetch };
};

export default useGetPlaceBlock;
