import { useState, useEffect } from "react";
import baseService from "../../service/baseService";
import type { Project } from "../../types/project";
import useAuthStore from "../../stores/useAuthStore";

interface GetMyProjectsResponse {
  data: {
    projects: Project[];
  };
  status: number;
  message: string;
}

const useGetMyProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    const accessToken = useAuthStore.getState().accessToken;
    if (!accessToken) {
      setProjects([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await baseService.get<GetMyProjectsResponse>(
        "/v1/projects"
      );

      if (response.data.status === 200) {
        const projects = response.data.data.projects;

        setProjects(projects);
      }

      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "프로젝트 데이터를 불러오는데 실패했습니다.";
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, isLoading, error, refetch: fetchProjects };
};

export default useGetMyProjects;
