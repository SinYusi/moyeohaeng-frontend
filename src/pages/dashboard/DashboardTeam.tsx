import { useEffect, useState } from "react";
import ActionButton from "../../components/common/ActionButton";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import TeamService from "../../service/teamService";
import ProjectService from "../../service/projectService";
import type { Project } from "../../types/project";
import ProjectSection from "../../components/dashboard/project/ProjectSection";

// 팀 대시보드 페이지: 특정 팀의 프로젝트만 필터링하여 보여주고 해당 팀에서 새 프로젝트 생성 기능 제공
interface DashboardTeamProps {
  teamId: string;
  onNewProject: () => void;
}

const DashboardTeam = ({ teamId, onNewProject }: DashboardTeamProps) => {
  const [team, setTeam] = useState<{ teamId: number; teamName: string } | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamService = new TeamService();
        const projectService = new ProjectService();

        // 팀 정보 및 프로젝트 동시 조회
        const [teamResponse, projectsResponse] = await Promise.all([
          teamService.getTeam(parseInt(teamId)),
          projectService.getMyProjects(parseInt(teamId))
        ]);

        setTeam(teamResponse);
        setProjects(projectsResponse.data.projects);
      } catch (err) {
        setError('데이터를 불러오는데 실패했습니다.');
        console.error('데이터 조회 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teamId]);

  if (loading) {
    return (
      <DashboardLayout
        headerLeft={<h1 className="text-[clamp(1.25rem,2vw,1.5rem)] font-semibold leading-normal">팀 정보</h1>}>
        <div className="flex justify-center items-center h-32">
          <p>팀 정보를 불러오는 중...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !team) {
    return (
      <DashboardLayout
        headerLeft={<h1 className="text-[clamp(1.25rem,2vw,1.5rem)] font-semibold leading-normal">팀 정보</h1>}>
        <div className="flex justify-center items-center h-32 text-red-500">
          <p>{error || '팀을 찾을 수 없습니다.'}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      headerLeft={
        <h1 className="text-[clamp(1.25rem,2vw,1.5rem)] font-semibold leading-normal">
          {team.teamName}
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

export default DashboardTeam;
