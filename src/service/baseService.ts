import axios from "axios";
import useAuthStore from "../stores/useAuthStore";

// 개발 환경에서의 기본값 설정
const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

// TypeScript와 Axios 호환성 문제 피하기 위해 일반 객체로 생성
const baseService = axios.create({
  withCredentials: true,
});

// URL 직접 설정 (이렇게 하면 TypeScript 오류를 피할 수 있음)
(baseService.defaults as any).baseURL = URL;

// 인증이 필요없는 경로들 (토큰을 첨부하지 않아야 함)
const nonAuthPaths = ["/v1/auth/signup", "/v1/auth/login", "/v1/auth/refresh"];

// 요청 인터셉터 - accessToken 붙이기
baseService.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    const url = config?.url ?? "";
    // 경로 비교: 쿼리스트링 제거 후 끝부분 일치 여부로 판정
    const pathname = url.split("?")[0];
    const isAuthExempt = nonAuthPaths.some((path) => pathname.endsWith(path));
    if (token && !isAuthExempt) {
      config.headers = config.headers || {};
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
        // URL 구성 - authService와 동일한 방식으로 URL 생성
        const baseUrl = URL.endsWith("/") ? URL.slice(0, -1) : URL;
        const refreshUrl = `${baseUrl}/v1/auth/refresh`;

        // HTTP-only 쿠키의 refreshToken을 사용하므로 body는 비움
        const res = await axios.post(refreshUrl, {}, { withCredentials: true });

        const newAccessToken = res?.data?.data;
        if (!newAccessToken || typeof newAccessToken !== "string") {
          throw new Error("토큰 리프레시 응답에 accessToken이 없습니다."); // TODO Error handler 추가
        }
        // Zustand 스토어 갱신
        useAuthStore.getState().setAccessToken(newAccessToken);

        // 실패했던 요청 Authorization 갱신
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 이후 요청들을 위해 api 인스턴스 기본 헤더 갱신
        baseService.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;

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
