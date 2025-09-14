import { useCallback, useEffect, useState } from "react";
import type { Group } from "../../../types/planTypes";
import { useParams } from "react-router-dom";
import baseService from "../../../service/baseService";

interface GetGroupResponse {
  status: number;
  message: string;
  data: Group[];
}

const useGetGroups = () => {
  const [group, setGroup] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const projectId = useParams().id;

  const getGroups = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await baseService.get<GetGroupResponse>(
        `/v1/projects/${projectId}/place-groups`
      );
      setGroup(response.data.data);
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    getGroups();
  }, [getGroups]);

  return { group, isLoading, error, getGroup };
};

export default useGetGroups;
