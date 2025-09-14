import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseService from "../../service/baseService";

interface LiveMember {
  id: string;
  email: string;
  name: string;
  profileImage: string;
}

interface LiveMemberResponse {
  data: LiveMember[];
  status: number;
  message: string;
}

const useGetLiveMember = () => {
  const [liveMember, setLiveMember] = useState<LiveMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const projectId = useParams().id;

  const getLiveMember = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await baseService.get<LiveMemberResponse>(
        `/v1/projects/${projectId}/members`
      );

      setLiveMember(response.data.data);
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    getLiveMember();
  }, [getLiveMember]);

  return { liveMember, isLoading, error, getLiveMember };
};

export default useGetLiveMember;
