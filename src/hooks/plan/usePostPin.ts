import { useState } from "react";
import { useParams } from "react-router-dom";
import type {
  CreateMapPinRequest,
  MapPinResponse,
} from "../../types/planTypes";
import baseService from "../../service/baseService";

interface PinResponseType {
  status: number;
  message: string;
  data: MapPinResponse;
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
      const data = response.data.data as MapPinResponse;
      return data.id;
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
