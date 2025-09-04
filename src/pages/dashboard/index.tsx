import { useLocation, useParams, Navigate } from "react-router-dom";
import MainLayout from "../../components/layouts/MainLayout";
import { useDashboards } from "../../contexts/DashboardContext";
import DashboardTeam from "./DashboardTeam";
import DashboardAllTeam from "./DashboardAllTeam";
import DashboardHome from "./DashboardHome";

const Dashboard = () => {
  const location = useLocation();
  const { teamId } = useParams();
  const { projects, loading, error } = useDashboards();

  // Redirect to /dashboard/home if team ID is invalid
  if (teamId && !projects.some((p) => p.team.id.toString() === teamId)) {
    return <Navigate to="/dashboard/home" replace />;
  }

  const handleNewProject = () => {
    // TODO: Implement new project creation
    console.log("New project button clicked");
  };

  const renderContent = () => {
    const path = location.pathname;

    if (path.startsWith("/dashboard/team/") && teamId) {
      return (
        <DashboardTeam
          teamId={teamId}
          projects={projects}
          onNewProject={handleNewProject}
        />
      );
    }

    if (path === "/dashboard/all-team") {
      return <DashboardAllTeam projects={projects} />;
    }

    // Default to home for /dashboard and /dashboard/home
    return (
      <DashboardHome projects={projects} onNewProject={handleNewProject} />
    );
  };

  return (
    <MainLayout loading={loading} error={error}>
      {renderContent()}
    </MainLayout>
  );
};

export default Dashboard;
