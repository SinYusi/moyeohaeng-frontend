import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import MainLayout from "../../components/layouts/MainLayout";
import DashboardTeam from "./DashboardTeam";
import { DashboardAllTeam } from "./DashboardAllTeam";
import DashboardHome from "./DashboardHome";
import NewProjectModal from "../../components/dashboard/modals/NewProjectModal";
import TeamCreateModal from "../../components/dashboard/team/TeamCreateModal";

const Dashboard = () => {
  const location = useLocation();
  const { teamId } = useParams();
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  const handleNewProject = () => {
    setIsProjectModalOpen(true);
  };

  const handleNewTeam = () => {
    setIsTeamModalOpen(true);
  };

  const renderContent = () => {
    const path = location.pathname;

    if (path.startsWith("/dashboard/team/") && teamId) {
      return <DashboardTeam onNewProject={handleNewProject} />;
    }

    if (path === "/dashboard/all-team") {
      return <DashboardAllTeam onNewTeam={handleNewTeam} />;
    }

    // /dashboard 및 /dashboard/home의 경우 기본적으로 홈으로 설정
    return (
      <DashboardHome onNewProject={handleNewProject} />
    );
  };

  return (
    <MainLayout>
      {renderContent()}

      {/* Project Create Modal */}
      <NewProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSuccess={() => {
          // 프로젝트 생성 후 페이지 새로고침
          window.location.reload();
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
