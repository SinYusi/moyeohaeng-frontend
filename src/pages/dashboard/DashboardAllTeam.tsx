import DashboardHeader from "../../components/dashboard/DashboardHeader";
import type { Project } from "../../types/project";
import { Link } from "react-router-dom";

// 전체 팀 목록 페이지: 사용자가 속한 모든 팀을 보여주고 팀별 대시보드로 이동할 수 있는 링크 제공
interface DashboardAllTeamProps {
  projects: Project[];
}

const DashboardAllTeam = ({ projects }: DashboardAllTeamProps) => {
  const teams = Array.from(new Set(projects.map((p) => p.team.id)))
    .map((teamId) => {
      const project = projects.find((p) => p.team.id === teamId);
      return project?.team;
    })
    .filter((team): team is NonNullable<typeof team> => team != null);

  return (
    <>
      <DashboardHeader title="전체 팀" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <Link
            key={team.id}
            to={`/dashboard/team/${team.id}`}
            className="p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
          </Link>
        ))}
      </div>
    </>
  );
};

export default DashboardAllTeam;
