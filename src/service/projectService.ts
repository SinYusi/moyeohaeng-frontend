import type { Project } from "../types/project";
import baseService from "./baseService";
import type { AxiosInstance } from "axios";

export type ProjectSortType =
  | "MODIFIED_AT_DESC"
  | "MODIFIED_AT_ASC"
  | "CREATED_AT_DESC"
  | "CREATED_AT_ASC";

export const ProjectSortType = {
  MODIFIED_AT_DESC: "MODIFIED_AT_DESC",
  MODIFIED_AT_ASC: "MODIFIED_AT_ASC",
  CREATED_AT_DESC: "CREATED_AT_DESC",
  CREATED_AT_ASC: "CREATED_AT_ASC",
} as const;

// Date 대신 string을 사용하도록 타입을 수정합니다.
type CreateProjectRequest = {
  teamId: number;
  title: string;
  startDate?: string; // "2025-10-01"과 같은 형식의 문자열
  endDate?: string; // "2025-11-30"과 같은 형식의 문자열
  validDateRange?: boolean;
  color?: string;
};

interface CreateProjectResponse {
  project: Project;
}
interface GetMyProjectsResponse {
  data: {
    projects: Project[];
  };
  status: number;
  message: string;
}

export class ProjectService {
  private api: AxiosInstance;

  constructor() {
    this.api = baseService;
  }

  // 프로젝트 생성
  async createProject(
    request: CreateProjectRequest
  ): Promise<CreateProjectResponse> {
    try {
      const response = await this.api.post("/v1/projects", request);
      return response.data;
    } catch (error) {
      console.error("프로젝트 생성 실패:", error);
      throw error;
    }
  }

  // 내 프로젝트 목록 조회
  async getMyProjects(
    teamId?: number,
    sortType: ProjectSortType = ProjectSortType.MODIFIED_AT_DESC
  ): Promise<GetMyProjectsResponse> {
    try {
      const params = new URLSearchParams();
      if (teamId) params.append("teamId", teamId.toString());
      params.append("sort", sortType);

      const response = await this.api.get(`/v1/projects?${params.toString()}`);
      console.log("프로젝트 조회 성공:", response.data);
      return response.data;
    } catch (error) {
      console.error("프로젝트 조회 실패:", error);
      throw error;
    }
  }
}

export default ProjectService;
