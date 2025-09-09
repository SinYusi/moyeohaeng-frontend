import { useState } from "react";
import baseService from "../../service/baseService";
import type { Project } from "../../types/project";

interface UpdateProjectRequest {
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  validDateRange?: boolean;
  color?: string;
}

interface UpdateProjectResponse {
  data: {
    project: Project;
  };
  status: number;
  message: string;
}

const usePutProject = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProject = async (
    projectId: string,
    projectData: UpdateProjectRequest
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await baseService.put<UpdateProjectResponse>(
        `/v1/projects/${projectId}`,
        projectData
      );

      if (response.data.status === 200) {
        return response.data.data.project;
      }

      return null;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "프로젝트 수정에 실패했습니다.";
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateProject, isLoading, error };
};

export default usePutProject;
