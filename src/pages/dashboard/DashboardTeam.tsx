import ActionButton from "../../components/common/ActionButton";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import ProjectSection from "../../components/dashboard/project/ProjectSection";
import useGetTeam from "../../hooks/team/useGetTeam";
import useGetMyProjects from "../../hooks/project/useGetMyProjects";
import { useParams } from "react-router-dom";

// 팀 대시보드 페이지: 특정 팀의 프로젝트만 필터링하여 보여주고 해당 팀에서 새 프로젝트 생성 기능 제공
interface DashboardTeamProps {
  onNewProject: () => void;
}

const DashboardTeam = ({ onNewProject }: DashboardTeamProps) => {
  const { teamId } = useParams<{ teamId: string }>();

  if (!teamId) {
    return (
      <DashboardLayout
        headerLeft={
          <h1 className="text-[clamp(1.25rem,2vw,1.5rem)] font-semibold leading-normal">
            팀 정보
          </h1>
        }
      >
        <div className="flex justify-center items-center h-32">
          <p>잘못된 팀 ID입니다.</p>
        </div>
      </DashboardLayout>
    );
  }

  const { team, isLoading: teamLoading, error: teamError } = useGetTeam(teamId);
  const {
    projects,
    isLoading: projectsLoading,
    error: projectsError,
  } = useGetMyProjects();

  const loading = teamLoading || projectsLoading;
  const error = teamError || projectsError;

  if (loading) {
    return (
      <DashboardLayout
        headerLeft={
          <h1 className="text-[clamp(1.25rem,2vw,1.5rem)] font-semibold leading-normal">
            팀 정보
          </h1>
        }
      >
        <div className="flex justify-center items-center h-32">
          <p>팀 정보를 불러오는 중...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !team) {
    return (
      <DashboardLayout
        headerLeft={
          <h1 className="text-[clamp(1.25rem,2vw,1.5rem)] font-semibold leading-normal">
            팀 정보
          </h1>
        }
      >
        <div className="flex justify-center items-center h-32 text-red-500">
          <p>{error || "팀을 찾을 수 없습니다."}</p>
        </div>
      </DashboardLayout>
    );
  }

  const currentTeamId = parseInt(teamId);
  const teamProjects = projects.filter((project) => {
    const projectTeamId = Number(project.team?.teamId);
    return !isNaN(projectTeamId) && projectTeamId === currentTeamId;
  });

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
      <ProjectSection projects={teamProjects} />
    </DashboardLayout>
  );
};

export default DashboardTeam;
