import AuthService from '../service/authService';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const navigate = useNavigate();
  
  const login = async (email: string, password: string) => {
    try {
      // AuthService 인스턴스 생성 후 로그인 요청
      const authService = new AuthService();
      const response = await authService.login({ email, password });
      
      // 로그인 성공 시 홈 화면으로 이동
      if (response.status === 200) {
        navigate('/');
      }
      
      return response;
    } catch (error) {
      console.error('로그인 실패:', error);
      throw error;
    }
  };

  return login;
};

export default useLogin;
