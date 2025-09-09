import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../service/authService';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        const authService = new AuthService();
        await authService.logout();
      } catch (e) {
        // 에러는 콘솔에만 남기고, 사용자 흐름은 유지
        console.error('로그아웃 처리 중 오류:', e);
      } finally {
        navigate('/login', { replace: true });
      }
    };

    doLogout();
  }, [navigate]);

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center text-sm text-[var(--text-default,#131416)]">
      로그아웃 중...
    </div>
  );
};

export default Logout;
