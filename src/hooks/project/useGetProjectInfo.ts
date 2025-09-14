import { useParams } from "react-router-dom";
import type { Project } from "../../types/project";
import { useCallback, useEffect, useState } from "react";
import baseService from "../../service/baseService";

interface ProjectInfoResponse {
  data: {
    project: Project;
  };
  status: number;
  message: string;
}

const useGetProjectInfo = () => {
  const [projectInfo, setProjectInfo] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const projectId = useParams().id;

  const getProjectInfo = useCallback(async () => {
    if (!projectId) {
      setError("프로젝트 ID가 없습니다.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await baseService.get<ProjectInfoResponse>(
        `/v1/projects/${projectId}`
      );
      setProjectInfo(response.data.data.project);
    } catch (error) {
      console.error("프로젝트 정보 조회 실패", error);
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    getProjectInfo();
  }, [getProjectInfo]);

  return { projectInfo, isLoading, error, getProjectInfo };
};

export default useGetProjectInfo;
