import TeamService from "../service/teamService";

export async function getTeamId(urlTeamId?: string, email?: string): Promise<number | null> {
  try {
    const teamService = new TeamService();
    const response = await teamService.getMyTeams();

    // URL에 teamId가 있는 경우 해당 팀이 내 팀인지 확인
    if (urlTeamId) {
      const teamId = parseInt(urlTeamId);
      const isMyTeam = response.teams.some(team => team.teamId === teamId);
      if (isMyTeam) {
        return teamId;
      }
    }

    // 기본적으로 email과 동일한 팀명을 가진 팀 찾기
    if (email) {
      const defaultTeam = response.teams.find(team => team.teamName === email);
      if (defaultTeam) {
        return defaultTeam.teamId;
      }
    }

    // 마지막으로 첫 번째 팀을 기본값으로 사용
    if (response.teams.length > 0) {
      return response.teams[0].teamId;
    }

    return null;
  } catch (error) {
    console.error("팀 조회 실패:", error);
    return null;
  }
}
