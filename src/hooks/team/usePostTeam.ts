import { useState } from "react";
import baseService from "../../service/baseService";

import type { Team } from "../../types/team";

interface CreateTeamRequest {
  name: string;
  description?: string;
}

interface CreateTeamResponse {
  data: {
    team: Team;
  };
  status: number;
  message: string;
}

const usePostTeam = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTeam = async (teamData: CreateTeamRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await baseService.post<CreateTeamResponse>(
        "/v1/teams",
        teamData
      );

      if (response.data.status === 200) {
        return response.data.data.team;
      }

      return null;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "팀 생성에 실패했습니다.";
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { createTeam, isLoading, error };
};

export default usePostTeam;
