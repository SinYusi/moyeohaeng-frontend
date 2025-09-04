import DashboardHeader from "../../components/dashboard/DashboardHeader";
import ProjectSection from "../../components/dashboard/project/ProjectSection";
import MainLayout from "../../components/layouts/MainLayout";
import { useParams, Navigate } from "react-router-dom";
import { useDashboards } from "../../contexts/DashboardContext";

// 팀 대시보드 페이지: 특정 팀의 프로젝트만 필터링하여 보여주고 해당 팀에서 새 프로젝트 생성 기능 제공
const DashboardTeam = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const { projects, loading, error } = useDashboards();

  // Redirect to /dashboard/home if team ID is invalid
  if (teamId && !projects.some((p) => p.team.id.toString() === teamId)) {
    return <Navigate to="/dashboard/home" replace />;
  }

  const handleNewProject = () => {
    // TODO: Implement new project creation
    console.log("New project button clicked");
  };
  const teamProjects = projects.filter((p) => p.team.id.toString() === teamId);
  const team = teamProjects[0]?.team;

  if (!team) {
    return null;
  }

  return (
    <MainLayout loading={loading} error={error}>
      <DashboardHeader
        title={team.name}
        buttonText="새 프로젝트"
        onButtonClick={handleNewProject}
      />
      <ProjectSection projects={teamProjects} />
    </MainLayout>
  );
};

export default DashboardTeam;
