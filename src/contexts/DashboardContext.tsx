import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Outlet } from "react-router-dom";
import type { Project } from "../types/project";
import { useAuthEventListener } from "../hooks/useAuthEventListener";

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

export const DashboardProvider: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 로그인 이벤트 리스너 사용
  useAuthEventListener();

  const teamProjects = React.useMemo(() => {
    const map = new Map<string, Project[]>();
    projects.forEach((project) => {
      const teamName = project.team.teamName; // team.name -> team.teamName으로 변경
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
      // TODO: API 구현 후 연동 예정
      setProjects([]);
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
      <Outlet />
    </DashboardContext.Provider>
  );
};
