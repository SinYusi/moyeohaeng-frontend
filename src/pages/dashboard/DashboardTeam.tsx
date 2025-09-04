import DashboardHeader from "../../components/dashboard/DashboardHeader";
import ProjectSection from "../../components/dashboard/project/ProjectSection";
import type { Project } from "../../types/project";

// 팀 대시보드 페이지: 특정 팀의 프로젝트만 필터링하여 보여주고 해당 팀에서 새 프로젝트 생성 기능 제공
interface DashboardTeamProps {
  teamId: string;
  projects: Project[];
  onNewProject: () => void;
}

const DashboardTeam = ({
  teamId,
  projects,
  onNewProject,
}: DashboardTeamProps) => {
  const teamProjects = projects.filter((p) => p.team.id.toString() === teamId);
  const team = teamProjects[0]?.team;

  if (!team) {
    return null;
  }

  return (
    <>
      <DashboardHeader
        title={team.name}
        buttonText="새 프로젝트"
        onButtonClick={onNewProject}
      />
      <ProjectSection projects={teamProjects} />
    </>
  );
};

export default DashboardTeam;
