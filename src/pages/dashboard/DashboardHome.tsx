import { useEffect, useState } from "react";
import ActionButton from "../../components/common/ActionButton";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import ProjectService from "../../service/projectService";
import type { Project } from "../../types/project";
import ProjectSection from "../../components/dashboard/project/ProjectSection";

interface DashboardHomeProps {
  onNewProject: () => void;
}

const DashboardHome = ({ onNewProject }: DashboardHomeProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectService = new ProjectService();
        const response = await projectService.getMyProjects();
        setProjects(response.data.projects);
      } catch (err) {
        setError("데이터를 불러오는데 실패했습니다.");
        console.error("데이터 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <DashboardLayout
        headerLeft={
          <h1 className="text-[clamp(1.25rem,2vw,1.5rem)] font-semibold leading-normal">
            내 프로젝트
          </h1>
        }
      >
        <div className="flex justify-center items-center h-32">
          <p>프로젝트를 불러오는 중...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout
        headerLeft={
          <h1 className="text-[clamp(1.25rem,2vw,1.5rem)] font-semibold leading-normal">
            내 프로젝트
          </h1>
        }
      >
        <div className="flex justify-center items-center h-32 text-red-500">
          <p>{error}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      headerLeft={
        <h1 className="text-[clamp(1.25rem,2vw,1.5rem)] font-semibold leading-normal">
          내 프로젝트
        </h1>
      }
      headerRight={
        <ActionButton onClick={onNewProject}>새 프로젝트</ActionButton>
      }
    >
      <ProjectSection projects={projects} />
    </DashboardLayout>
  );
};

export default DashboardHome;
