import ProjectSection from "../../components/dashboard/project/ProjectSection";
import type { Project } from "../../types/project";
import ActionButton from "../../components/common/ActionButton";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

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
    <DashboardLayout
      headerLeft={
        <h1 className="text-[clamp(1.25rem,2vw,1.5rem)] font-semibold leading-normal">
          {team.name}
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
