import { useState, useEffect } from "react";
import baseService from "../../service/baseService";
import useAuthStore from "../../stores/useAuthStore";

import type { Team } from "../../types/team";

export interface GetMyTeamsResponse {
  data: {
    teams: Team[];
  };
  status: number;
  message: string;
}

const useGetMyTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTeams = async () => {
    const accessToken = useAuthStore.getState().accessToken;
    if (!accessToken) {
      setTeams([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await baseService.get<GetMyTeamsResponse>(
        "/v1/teams/me"
      );

      if (response.data.status === 200) {
        setTeams(response.data.data.teams);
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
    fetchTeams();
  }, []);

  return { teams, isLoading, error, refetch: fetchTeams };
};

export default useGetMyTeams;
