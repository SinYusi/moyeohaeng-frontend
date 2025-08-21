import { useState } from "react";
import BlueBackgroundBtn from "../components/common/BlueBackgroundBtn";
import BlueTextBtn from "../components/common/BlueTextBtn";
import Checkbox from "../components/common/CheckBox";
import TextInput from "../components/common/TextInput";
import Divider from "../components/login/Divider";
import GoogleLoginBtn from "../components/login/GoogleLoginBtn";
import KakaoLoginBtn from "../components/login/KakaoLoginBtn";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const route = useNavigate();
  const login = useLogin();

  const handleLogin = async () => {
    await login(email, password);
  };

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center">
      <p className="font-bold text-[24px] leading-[34px] tracking-[-0.6px] mb-[42px]">
        로그인
      </p>
      <div className="flex flex-col gap-4 w-[390px]">
        <KakaoLoginBtn />
        <GoogleLoginBtn />
        <Divider />
        <TextInput
          label="이메일"
          placeholder="abcdefg@goorm.com"
          type="email"
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <TextInput
          label="비밀번호"
          placeholder="비밀번호를 입력해 주세요."
          type="password"
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <div className="flex flex-row justify-between items-center">
          <Checkbox
            label="로그인 상태 유지"
            checked={isChecked}
            onChange={(checked) => setIsChecked(checked)}
          />
          <BlueTextBtn
            text="비밀번호 재설정"
            onClick={() => {
              route("/forgot-password");
            }}
          />
        </div>
        <BlueBackgroundBtn
          text="로그인"
          onClick={handleLogin}
          disabled={!email || !password}
        />
        <BlueTextBtn
          text="이메일로 회원가입 →"
          onClick={() => {
            route("/signup");
          }}
        />
      </div>
    </div>
  );
};

export default Login;
