import axios from "axios";
import useAuthStore from "../stores/useAuthStore";

// 개발 환경에서의 기본값 설정
const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';


// TypeScript와 Axios 호환성 문제 피하기 위해 일반 객체로 생성
const baseService = axios.create({
  withCredentials: true
});

// URL 직접 설정 (이렇게 하면 TypeScript 오류를 피할 수 있음)
(baseService.defaults as any).baseURL = URL;


// 인증이 필요없는 경로들 (토큰을 첨부하지 않아야 함)
const nonAuthPaths = ["/v1/auth/signup", "/v1/auth/login"];

// 요청 인터셉터 - accessToken 붙이기
baseService.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    
    // URL이 nonAuthPaths에 포함되지 않는 경우에만 토큰을 추가
    const isAuthExempt = nonAuthPaths.some((path: string) =>
      config?.url?.includes(path)
    );

    if (token && !isAuthExempt) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 - accessToken 만료 시 자동 리프레시
baseService.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // accessToken 만료 + 한 번만 재시도
    if (
      status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/v1/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const accessToken = useAuthStore.getState().accessToken;
        
        // URL 구성 - authService와 동일한 방식으로 URL 생성
        const baseUrl = URL.endsWith('/') ? URL.slice(0, -1) : URL;
        const refreshUrl = `${baseUrl}/v1/auth/refresh`;
        

        const res = await axios.post(
          refreshUrl,
          { accessToken },
          { withCredentials: true }
        );

        const { accessToken: newAccessToken } =
          res.data.data;

        // Zustand 스토어 갱신
        useAuthStore.getState().setAccessToken(newAccessToken);

        // 실패했던 요청 Authorization 갱신
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 이후 요청들을 위해 api 인스턴스 기본 헤더 갱신
        baseService.defaults.headers.common["Authorization"] =
          `Bearer ${newAccessToken}`;

        // 실패했던 요청 재시도
        return baseService(originalRequest);
      } catch (refreshError) {
        console.error("리프레시 실패:", refreshError);

        useAuthStore.getState().clearAuth();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default baseService;
