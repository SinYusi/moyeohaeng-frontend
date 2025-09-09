import React from "react";
import { useParams, useLocation } from "react-router-dom";
import FilterButton from "../FilterButton";
import ProjectCard from "./ProjectCard";
import type { Project } from "../../../types/project";

interface ProjectSectionProps {
  projects: Project[];
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ projects }) => {
  const location = useLocation();
  const { teamId } = useParams();

  const [sortBy, setSortBy] = React.useState("최근 수정한 순");
  const [selectedTeam, setSelectedTeam] = React.useState("모든 팀");

  const sortOptions = ["최근 수정한 순", "최근 생성한 순", "이름순"];
  const teamOptions = [
    "모든 팀",
    ...(projects
      ? Array.from(
          new Set(projects.filter((p) => p.team).map((p) => p.team.teamName))
        ).sort()
      : []),
  ];

  // 경로나 팀 ID가 변경될 때 필터 상태 업데이트
  React.useEffect(() => {
    if (
      location.pathname === "/dashboard/home" ||
      location.pathname === "/dashboard"
    ) {
      setSortBy("최근 수정한 순");
      setSelectedTeam("모든 팀");
      return;
    }

    if (teamId && projects) {
      const team = projects.find(
        (p) => p.team?.teamId.toString() === teamId
      )?.team;
      if (team) {
        setSelectedTeam(team.teamName);
      }
    } else if (location.pathname === "/dashboard/all-team") {
      setSelectedTeam("모든 팀");
    }
  }, [teamId, location.pathname, projects]);

  // 선택된 팀과 정렬 기준에 따라 프로젝트 필터링 및 정렬
  const filteredProjects = React.useMemo(() => {
    const filtered = projects
      ? projects.filter(
          (project) =>
            selectedTeam === "모든 팀" ||
            (project.team && project.team.teamName === selectedTeam)
        )
      : [];

    return filtered.sort((a: Project, b: Project) => {
      switch (sortBy) {
        case "최근 수정한 순":
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        case "최근 생성한 순":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "이름순":
          return a.title.localeCompare(b.title);
        default:
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
      }
    });
  }, [projects, selectedTeam, sortBy]);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <FilterButton
          options={sortOptions}
          selected={sortBy}
          onSelect={setSortBy}
        />
        <FilterButton
          options={teamOptions}
          selected={selectedTeam}
          onSelect={setSelectedTeam}
        />
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.externalId} {...project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
