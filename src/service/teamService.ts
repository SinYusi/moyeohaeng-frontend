import type { AxiosInstance } from "axios";
import baseService from "./baseService";
import type { Team } from "../types/team";

interface CreateTeamRequest {
  newTeamName: string;
}

interface GetMyTeamsResponse {
  memberId: number;
  teams: Team[];
}

// TeamService 클래스는 baseService의 기능을 확장
export default class TeamService {
  private api: AxiosInstance;

  constructor() {
    // baseService의 인스턴스를 사용하여 모든 설정을 상속받음
    this.api = baseService;
  }

  async createTeam(request: CreateTeamRequest): Promise<Team> {
    try {
      const response = await this.api.post("/v1/teams", request);
      console.log(response.data);

      return response.data.data;
    } catch (error) {
      console.error("팀 생성 실패:", error);

      throw error;
    }
  }

  async getMyTeams(): Promise<GetMyTeamsResponse> {
    try {
      const response = await this.api.get("/v1/teams/me");
      console.log(response.data);

      return response.data.data;
    } catch (error) {
      console.error("팀 조회 실패:", error);

      throw error;
    }
  }
  async getTeam(teamId: number): Promise<Team> {
    try {
      const response = await this.api.get(`/v1/teams/${teamId}`);
      console.log(response.data);

      return response.data.data;
    } catch (error) {
      console.error("팀 조회 실패:", error);

      throw error;
    }
  }
}
