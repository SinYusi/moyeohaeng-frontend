import baseService from './baseService';
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import useAuthStore from '../stores/useAuthStore';

const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

// TODO requestDto에 이메일 인증 번호가 필요할지 의논
type SignupRequest = {
  email: string;
  password: string;
  name: string;
}

type SignupResponse = {
  status: number;
  message: string;
}

type LoginRequest = {
  email: string;
  password: string;
}

type LoginResponse = {
  data: {
    accessToken: string;
  };
  status: number;
  message: string;
}

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
      const baseUrl = URL.endsWith('/') ? URL.slice(0, -1) : URL;
      const requestUrl = `${baseUrl}/v1/auth/signup`;
      
      const response = await axios.post(
        requestUrl, 
        userData, 
        { withCredentials: true }
      );
      
      return response.data;
    } catch (error) {
      console.error('회원가입 실패:', error);
      
      throw error;
    }
  }

  // 로그인 API
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const baseUrl = URL.endsWith('/') ? URL.slice(0, -1) : URL;
      const requestUrl = `${baseUrl}/v1/auth/login`;
      
      const response = await axios.post<LoginResponse>(
        requestUrl,
        credentials,
        { withCredentials: true }
      );
      
      // accessToken을 Zustand 스토어에 저장
      if (response.data.data?.accessToken) {
        useAuthStore.getState().setAccessToken(response.data.data.accessToken);
      }
      
      // refreshToken은 HTTP-only 쿠키로 자동 설정되므로 별도 처리 필요 없음
      return response.data;
    } catch (error) {
      console.error('로그인 실패:', error);
      
      throw error;
    }
  }
  
  // 로그아웃
  async logout(): Promise<void> {
    try {
      const baseUrl = URL.endsWith('/') ? URL.slice(0, -1) : URL;
      const requestUrl = `${baseUrl}/v1/auth/logout`;
      
      await axios.post(requestUrl, {}, { withCredentials: true });
      
      // Zustand 스토어에서 인증 정보 제거
      useAuthStore.getState().clearAuth();
    } catch (error) {
      console.error('로그아웃 실패:', error);
      
      throw error;
    }
  }

  // 토큰 리프래시 (필요한 경우 직접 호출용)
  async refreshToken(): Promise<string | null> {
    try {
      const accessToken = useAuthStore.getState().accessToken;
      
      const baseUrl = URL.endsWith('/') ? URL.slice(0, -1) : URL;
      const requestUrl = `${baseUrl}/v1/auth/refresh`;
      
      const response = await axios.post(
        requestUrl,
        { accessToken },
        { withCredentials: true }
      );

      const { accessToken: newAccessToken } = response.data.data;
      useAuthStore.getState().setAccessToken(newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error('토큰 리프래시 실패:', error);

      return null;
    }
  }
}

export default AuthService;
