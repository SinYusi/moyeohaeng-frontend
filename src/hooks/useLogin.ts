import AuthService from "../service/authService";
import { useNavigate } from "react-router-dom";
import TeamService from "../service/teamService";

const useLogin = () => {
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      // AuthService 인스턴스 생성 후 로그인 요청
      const authService = new AuthService();
      const response = await authService.login({ email, password });

      // 로그인 성공 시 팀 데이터를 가져오고 대시보드로 이동
      if (response.status === 200) {
        const teamService = new TeamService();
        await teamService.getMyTeams(); // 팀 데이터 미리 가져오기
        navigate("/dashboard");
      }

      return response;
    } catch (error) {
      console.error("useLogin로그인 실패:", error);
      throw error;
    }
  };

  return login;
};

export default useLogin;
