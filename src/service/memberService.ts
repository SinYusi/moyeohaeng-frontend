import baseService from "./baseService";
import type { AxiosInstance } from "axios";
import useMemberStore, { type Member } from "../stores/useMemberStore";

class MemberService {
  private api: AxiosInstance;

  constructor() {
    this.api = baseService;
  }

  async getMyMembers(): Promise<Member> {
    try {
      const response = await this.api.get("/v1/members/me");
      const memberData = response.data.data;

      // Store member data in Zustand store
      useMemberStore.getState().setMember(memberData);

      return memberData;
    } catch (error) {
      console.error("멤버 조회 실패:", error);
      throw error;
    }
  }
}

export default MemberService;
