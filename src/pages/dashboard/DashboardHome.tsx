import DashboardHeader from "../../components/dashboard/DashboardHeader";
import ProjectSection from "../../components/dashboard/project/ProjectSection";
import MainLayout from "../../components/layouts/MainLayout";
import { useDashboards } from "../../contexts/DashboardContext";

const DashboardHome = () => {
  const { projects, loading, error } = useDashboards();

  const handleNewProject = () => {
    // TODO: Implement new project creation
    console.log("New project button clicked");
  };

  return (
    <MainLayout loading={loading} error={error}>
      <DashboardHeader
        title="내 프로젝트"
        buttonText="새 프로젝트"
        onButtonClick={handleNewProject}
      />
      <ProjectSection projects={projects} />
    </MainLayout>
  );
};

export default DashboardHome;
