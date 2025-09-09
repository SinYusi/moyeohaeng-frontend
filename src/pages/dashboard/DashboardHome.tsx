import ActionButton from "../../components/common/ActionButton";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import ProjectSection from "../../components/dashboard/project/ProjectSection";
import useGetMyProjects from "../../hooks/project/useGetMyProjects";

interface DashboardHomeProps {
  onNewProject: () => void;
}

const DashboardHome = ({ onNewProject }: DashboardHomeProps) => {
  const { projects, isLoading: loading, error } = useGetMyProjects();

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
