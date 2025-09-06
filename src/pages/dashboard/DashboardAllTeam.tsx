import type { Project } from "../../types/project";
import ActionButton from "../../components/common/ActionButton";
import TeamCard from "../../components/dashboard/team/TeamCard";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

// 전체 팀 목록 페이지: 사용자가 속한 모든 팀을 보여주고 팀별 대시보드로 이동할 수 있는 링크 제공
interface DashboardAllTeamProps {
  projects: Project[];
  onNewTeam: () => void;
}

export const DashboardAllTeam = ({
  projects,
  onNewTeam,
}: DashboardAllTeamProps) => {
  const teams = Array.from(new Set(projects.map((p) => p.team.id)))
    .map((teamId) => {
      const project = projects.find((p) => p.team.id === teamId);
      return project?.team;
    })
    .filter((team): team is NonNullable<typeof team> => team != null);

  return (
    <DashboardLayout
      headerLeft={
        <div>
          <h1 className="text-2xl font-bold">모든 팀</h1>
          <p className="text-gray-500 text-sm mt-1">6개월</p>
        </div>
      }
      headerRight={
        <ActionButton onClick={onNewTeam} showIcon={false}>
          <span className="text-xl mr-1">+</span>
          새팀 만들기
        </ActionButton>
      }
      className="w-full h-full flex flex-col gap-6"
    >
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
        {teams.map((team) => {
          const teamProjects = projects.filter((p) => p.team.id === team.id);
          return (
            <TeamCard
              key={team.id}
              team={team}
              scheduleCount={teamProjects.length}
            />
          );
        })}
      </div>
    </DashboardLayout>
  );
};
