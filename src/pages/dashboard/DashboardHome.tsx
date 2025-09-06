import ProjectSection from "../../components/dashboard/project/ProjectSection";
import type { Project } from "../../types/project";
import ActionButton from "../../components/common/ActionButton";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

interface DashboardHomeProps {
  projects: Project[];
  onNewProject: () => void;
}

const DashboardHome = ({ projects, onNewProject }: DashboardHomeProps) => {
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
