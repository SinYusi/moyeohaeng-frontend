import { useState } from "react";
import baseService from "../../service/baseService";
import type { Project } from "../../types/project";

interface CreateProjectRequest {
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  validDateRange?: boolean;
  color?: string;
  teamId: number;
}

interface CreateProjectResponse {
  data: {
    project: Project;
  };
  status: number;
  message: string;
}

const usePostProject = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProject = async (projectData: CreateProjectRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await baseService.post<CreateProjectResponse>(
        `/v1/projects`,
        projectData
      );

      if (response.data.status === 200) {
        return response.data.data.project;
      }

      return null;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "프로젝트 생성에 실패했습니다.";
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { createProject, isLoading, error };
};

export default usePostProject;
