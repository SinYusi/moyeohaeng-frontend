import type { Project } from "../../types/project";
import { useMemo } from "react";
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
  const teamsWithCounts = useMemo(() => {
    const m = new Map<number, { team: Project["team"]; count: number }>();
    for (const p of projects) {
      const entry = m.get(p.team.id);
      if (entry) entry.count += 1;
      else m.set(p.team.id, { team: p.team, count: 1 });
    }
    return Array.from(m.values());
  }, [projects]);

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
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
        {teamsWithCounts.map(({ team, count }) => (
          <TeamCard key={team.id} team={team} projectCount={count} />
        ))}
      </div>
    </DashboardLayout>
  );
};
