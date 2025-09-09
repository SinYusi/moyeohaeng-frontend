import { useState } from "react";
import type { CreateMapPinRequest } from "../types/planTypes";
import baseService from "../service/baseService";
import { useParams } from "react-router-dom";

interface PinResponseType {
  status: number;
  message: string;
  data: string;
}

const usePostPin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const projectId = useParams().id;
  const postPin = async (pin: CreateMapPinRequest) => {
    try {
      setLoading(true);
      setError(null);
      const response = await baseService.post<PinResponseType>(
        `/v1/projects/${projectId}/pins`,
        pin
      );
      console.log(response.data);
      return response.data;
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
