import { useState } from "react";
import baseService from "../../service/baseService";
import type { Project } from "../../types/project";

// 프로젝트 삭제: /v1/projects/{projectId}
interface DeleteProjectResponse {
  data: {
    project: Project;
  };
  status: number;
  message: string;
}

const useDeleteProject = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteProject = async (projectId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await baseService.delete<DeleteProjectResponse>(
        `/v1/projects/${projectId}`
      );
      return response.data;
    } catch (error) {
      console.error("프로젝트 삭제 실패:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteProject, isLoading, error };
};

export default useDeleteProject;
