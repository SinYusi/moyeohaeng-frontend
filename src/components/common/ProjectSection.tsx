import { useState } from "react";
import ProjectCard from "./ProjectCard";
import FilterButton from "./FilterButton";
import { mockTeamOptions } from "../../mockData";

interface ProjectSectionProps {
  projects: Array<{
    days: number;
    title: string;
    date: string;
    people: number;
    modifiedTime: string;
  }>;
}

const ProjectSection = ({ projects: travels }: ProjectSectionProps) => {
  const [sortBy, setSortBy] = useState("최근 수정한 순");
  const [selectedTeam, setSelectedTeam] = useState("모든 팀");

  const sortOptions = ["최근 수정한 순", "최근 생성한 순", "이름순"];

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <FilterButton
          options={sortOptions}
          selected={sortBy}
          onSelect={setSortBy}
        />
        <FilterButton
          options={mockTeamOptions}
          selected={selectedTeam}
          onSelect={setSelectedTeam}
        />
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,350px)] gap-7 justify-start">
        {travels.map((travel, index) => (
          <ProjectCard key={index} {...travel} />
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
