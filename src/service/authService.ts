import baseService from "./baseService";
import type { AxiosInstance } from "axios";
import useAuthStore from "../stores/useAuthStore";
import useMemberStore from "../stores/useMemberStore";

// TODO requestDto에 이메일 인증 번호가 필요할지 의논
type SignupRequest = {
  email: string;
  password: string;
  name: string;
};

type SignupResponse = {
  status: number;
  message: string;
};

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  data: string; // accessToken 단일로 전달
  status: number;
  message: string;
};

type LogoutResponse = {
  status: number;
  message: string;
  data: null;
};

// AuthService 클래스는 baseService의 기능을 확장
class AuthService {
  private api: AxiosInstance;

  constructor() {
    // baseService의 인스턴스를 사용하여 모든 설정을 상속받음
    this.api = baseService;
  }

  // 회원가입 API
  async signup(userData: SignupRequest): Promise<SignupResponse> {
    try {
      const response = await this.api.post("/v1/auth/signup", userData);

      return response.data;
    } catch (error) {
      console.error("회원가입 실패:", error);

      throw error;
    }
  }

  // 로그인 API
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await this.api.post<LoginResponse>(
        "/v1/auth/login",
        credentials
      );

      // accessToken을 Zustand 스토어에 저장
      if (response.data) {
        const accessToken = response.data.data;
        useAuthStore.getState().setAccessToken(accessToken);
      }

      // refreshToken은 HTTP-only 쿠키로 자동 설정되므로 별도 처리 필요 없음
      return response.data;
    } catch (error) {
      console.error("AuthService 로그인 실패:", error);

      throw error;
    }
  }

  /**
   * 로그아웃 API
   * refresh token 쿠키를 제거하고 access token을 블랙리스트에 추가
   * 클라이언트의 accessToken도 제거
   */
  async logout(): Promise<LogoutResponse> {
    try {
      // 로그아웃 요청 (서버에서 refreshToken 쿠키 제거 및 accessToken 블랙리스트 추가)
      const response = await this.api.post<LogoutResponse>(
        "/v1/auth/logout",
        {}
      );

      // Zustand 스토어에서 인증 정보와 멤버 정보 제거
      useAuthStore.getState().clearAuth();
      useMemberStore.getState().clearMember();

      return response.data;
    } catch (error) {
      console.error("로그아웃 실패:", error);
      throw error;
    }
  }

  // 토큰 리프래시 (필요한 경우 직접 호출용)
  async refreshToken(): Promise<string | null> {
    try {
      const accessToken = useAuthStore.getState().accessToken;

      const response = await this.api.post("/v1/auth/refresh", { accessToken });

      const newAccessToken = response.data;
      useAuthStore.getState().setAccessToken(newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error("토큰 리프래시 실패:", error);

      return null;
    }
  }
}

export default AuthService;
