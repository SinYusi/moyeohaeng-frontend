import { useState, useEffect } from "react";
import baseService from "../../service/baseService";
import useMemberStore, { type Member } from "../../stores/useMemberStore";

interface GetMemberResponse {
  data: {
    member: Member;
  };
  status: number;
  message: string;
}

const useGetMember = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMember = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await baseService.get<GetMemberResponse>("/v1/members");

      if (response.data.status === 200) {
        const memberData = response.data.data.member;
        useMemberStore.getState().setMember(memberData);
        return memberData;
      }

      return null;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "멤버 데이터를 불러오는데 실패했습니다.";
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMember();
  }, []);

  return { fetchMember, isLoading, error };
};

export default useGetMember;
