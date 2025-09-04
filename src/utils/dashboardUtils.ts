interface Project {
  team: {
    id: number;
    name: string;
  };
}

export const getDashboardTitle = (pathname: string, teamId: string | undefined, projects: Project[]) => {
  if (pathname === "/dashboard" || pathname === "/dashboard/home") return "홈";
  if (pathname === "/dashboard/all-team") return "전체 팀";
  if (pathname === "/dashboard/shared-projects") return "공유된 프로젝트";
  if (pathname.startsWith("/dashboard/team/")) {
    const team = projects.find((p) => p.team.id.toString() === teamId);
    return team ? team.team.name : "";
  }
  return "";
};
