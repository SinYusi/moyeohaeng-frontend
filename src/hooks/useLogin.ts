import { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseService from "../service/baseService";
import useAuthStore from "../stores/useAuthStore";
import MemberService from "../service/memberService";

interface LoginResponse {
  data: string; // accessToken
  status: number;
  message: string;
}

const usePostLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const memberService = new MemberService();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await baseService.post<LoginResponse>("/v1/auth/login", {
        email,
        password,
      });

      if (response.data.status === 200) {
        const accessToken = response.data.data;
        useAuthStore.getState().setAccessToken(accessToken);

        memberService.getMyMembers();
        navigate("/dashboard");
      }

      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "로그인에 실패했습니다.";
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};

export default usePostLogin;
