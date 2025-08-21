import Divider from "../components/login/Divider";
import GoogleLoginBtn from "../components/login/GoogleLoginBtn";
import KakaoLoginBtn from "../components/login/KakaoLoginBtn";

const Login = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4 w-[390px]">
        <KakaoLoginBtn />
        <GoogleLoginBtn />
        <Divider />
      </div>
    </div>
  );
};

export default Login;
