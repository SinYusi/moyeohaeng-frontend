import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/usetLogout";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await logout();
        navigate("/login", { replace: true });
      } catch (e) {
        console.error("로그아웃 처리 중 오류:", e);
        navigate("/login", { replace: true });
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
