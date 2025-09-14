import { useParams } from "react-router-dom";
import baseService from "../../../service/baseService";
import type { Group } from "../../../types/planTypes";
import { useState } from "react";
interface GroupRequest {
  name: string;
  color: string;
  placeIds: string[];
}

interface GroupResponse {
  status: number;
  message: string;
  data: Group;
}

const usePostGroup = () => {
  const projectId = useParams().id;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postGroup = async (group: GroupRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await baseService.post<GroupResponse>(
        `/v1/projects/${projectId}/place-groups`,
        group
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return { postGroup, isLoading, error };
};

export default usePostGroup;
