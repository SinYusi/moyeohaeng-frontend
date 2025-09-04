import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { Project } from "../types/project";
import { mockProjects } from "../mockData"; // 임시로 mock데이터 사용

interface DashboardContextType {
  projects: Project[];
  teamProjects: Map<string, Project[]>;
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const useDashboards = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboards()는 반드시 DashboardProvider안에서 사용해야 합니다."
    );
  }
  return context;
};

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const teamProjects = React.useMemo(() => {
    const map = new Map<string, Project[]>();
    projects.forEach((project) => {
      const teamName = project.team.name;
      const teamProjects = map.get(teamName) || [];
      teamProjects.push(project);
      map.set(teamName, teamProjects);
    });
    return map;
  }, [projects]);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // TODO: 실제 API 호출로 변경
      // const response = await fetch('API_ENDPOINT');
      // const data = await response.json();

      // 임시로 mock 데이터 사용
      await new Promise((resolve) => setTimeout(resolve, 500)); // API 호출 시간 시뮬레이션
      setProjects(mockProjects);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "프로젝트 목록을 불러오는데 실패했습니다."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <DashboardContext.Provider
      value={{ projects, teamProjects, loading, error, fetchProjects }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
