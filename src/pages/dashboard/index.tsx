import { useLocation, useParams, Navigate } from "react-router-dom";
import { useState } from "react";
import MainLayout from "../../components/layouts/MainLayout";
import { useDashboards } from "../../contexts/DashboardContext";
import DashboardTeam from "./DashboardTeam";
import { DashboardAllTeam } from "./DashboardAllTeam";
import DashboardHome from "./DashboardHome";
import NewProjectModal from "../../components/dashboard/modals/NewProjectModal";
import TeamCreateModal from "../../components/dashboard/team/TeamCreateModal";

const Dashboard = () => {
  const location = useLocation();
  const { teamId } = useParams();
  const { projects, loading, error } = useDashboards();
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  // 팀 ID가 유효하지 않으면 /dashboard/home으로 리디렉션 (로딩 완료 후에만 검사)
  if (
    teamId &&
    !loading &&
    !projects.some((p) => p.team.id.toString() === teamId)
  ) {
    return <Navigate to="/dashboard/home" replace />;
  }

  const handleNewProject = () => {
    setIsProjectModalOpen(true);
  };

  const handleNewTeam = () => {
    setIsTeamModalOpen(true);
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
      return <DashboardAllTeam projects={projects} onNewTeam={handleNewTeam} />;
    }

    // /dashboard 및 /dashboard/home의 경우 기본적으로 홈으로 설정
    return (
      <DashboardHome projects={projects} onNewProject={handleNewProject} />
    );
  };

  return (
    <MainLayout loading={loading} error={error}>
      {renderContent()}

      {/* Project Create Modal */}
      <NewProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSubmit={(projectName, color) => {
          // TODO: 프로젝트 생성 API 연동 후 목록 갱신
          // 현재는 모달 내부에서 onClose를 호출하므로 여기서는 추가 동작 없음
          console.log("Create Project:", { projectName, color });
        }}
      />

      {/* Team Create Modal */}
      <TeamCreateModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
      />
    </MainLayout>
  );
};

export default Dashboard;
