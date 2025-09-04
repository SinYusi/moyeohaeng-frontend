import DashboardHeader from "../../components/dashboard/DashboardHeader";
import ProjectSection from "../../components/dashboard/project/ProjectSection";
import type { Project } from "../../types/project";

interface DashboardHomeProps {
  projects: Project[];
  onNewProject: () => void;
}

const DashboardHome = ({ projects, onNewProject }: DashboardHomeProps) => {
  return (
    <>
      <DashboardHeader
        title="내 프로젝트"
        buttonText="새 프로젝트"
        onButtonClick={onNewProject}
      />
      <ProjectSection projects={projects} />
    </>
  );
};

export default DashboardHome;
