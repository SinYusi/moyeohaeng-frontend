import ActionButton from "../../components/common/ActionButton";
import TeamCard from "../../components/dashboard/team/TeamCard";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import useGetMyTeams from "../../hooks/team/useGetMyTeams";

// 전체 팀 목록 페이지: 사용자가 속한 모든 팀을 보여주고 팀별 대시보드로 이동할 수 있는 링크 제공
interface DashboardAllTeamProps {
  onNewTeam: () => void;
}

export const DashboardAllTeam = ({ onNewTeam }: DashboardAllTeamProps) => {
  const { teams, isLoading: loading, error } = useGetMyTeams();

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
          <span className="text-xl mr-1">+</span>새 팀 만들기
        </ActionButton>
      }
      className="w-full h-full flex flex-col gap-6"
    >
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <p>팀 목록을 불러오는 중...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-32 text-red-500">
          <p>{error}</p>
        </div>
      ) : teams.length === 0 ? (
        <div className="flex justify-center items-center h-32 text-gray-500">
          <p>소속된 팀이 없습니다. 새로운 팀을 만들어보세요!</p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
          {teams.map((team) => (
            <TeamCard
              key={team.teamId}
              team={{ teamId: team.teamId, teamName: team.teamName }}
              projectCount={0}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};
