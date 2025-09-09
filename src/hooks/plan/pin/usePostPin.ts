import { useState } from "react";
import { useParams } from "react-router-dom";
import baseService from "../../../service/baseService";
import type { CreateMapPinRequest, MapPin } from "../../../types/planTypes";

interface PinResponseType {
  status: number;
  message: string;
  data: MapPin;
}

const usePostPin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const projectId = useParams().id;
  // TODO: projectId 없을 시 에러 처리
  const postPin = async (pin: CreateMapPinRequest) => {
    try {
      setLoading(true);
      setError(null);
      const response = await baseService.post<PinResponseType>(
        `/v1/projects/${projectId}/pins`,
        pin
      );
      const data = response.data.data as MapPin;
      return { serverId: data.id, serverPlaceId: data.place.id };
    } catch (error) {
      console.error(error);
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  return { postPin, loading, error };
};

export default usePostPin;
