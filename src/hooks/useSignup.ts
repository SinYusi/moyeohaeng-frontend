import { useState } from "react";
import baseService from "../service/baseService";

interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

interface SignupResponse {
  status: number;
  message: string;
}

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (userData: SignupRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await baseService.post<SignupResponse>(
        "/v1/auth/signup",
        userData
      );

      return response.data.status === 201;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "회원가입에 실패했습니다.";
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};

export default useSignup;
