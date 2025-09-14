import { useState } from "react";
import baseService from "../service/baseService";
import useAuthStore from "../stores/useAuthStore";
import useMemberStore from "../stores/useMemberStore";

interface LogoutResponse {
  status: number;
  message: string;
  data: null;
}

const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await baseService.post<LogoutResponse>(
        "/v1/auth/logout",
        {}
      );

      if (response.data.status === 200) {
        // Clear auth and member information from stores
        useAuthStore.getState().clearAuth();
        useMemberStore.getState().clearMember();
        return true;
      }
      return false;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "로그아웃에 실패했습니다.";
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading, error };
};

export default useLogout;
