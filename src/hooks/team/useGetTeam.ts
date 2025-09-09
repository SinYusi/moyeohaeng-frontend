import { useState, useEffect } from "react";
import baseService from "../../service/baseService";
import useAuthStore from "../../stores/useAuthStore";
import type { Team } from "../../types/team";

interface GetTeamResponse {
  data: Team;
  status: number;
  message: string;
}

const useGetTeam = (urlTeamId?: string) => {
  const [team, setTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTeam = async () => {
    const accessToken = useAuthStore.getState().accessToken;
    if (!accessToken) {
      setTeam(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (!urlTeamId) {
        setError("팀 ID가 필요합니다.");
        return;
      }

      const response = await baseService.get<GetTeamResponse>(
        `/v1/teams/${urlTeamId}`
      );

      if (response.data.status === 200) {
        setTeam(response.data.data);
      }

      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "팀 데이터를 불러오는데 실패했습니다.";
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, [urlTeamId]);

  return { team, isLoading, error, refetch: fetchTeam };
};

export default useGetTeam;
