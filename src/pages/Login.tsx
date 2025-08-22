import { useState } from "react";
import BlueTextBtn from "../components/common/BlueTextBtn";
import Checkbox from "../components/common/CheckBox";
import TextInput from "../components/common/TextInput";
import Divider from "../components/login/Divider";
import kakaoLogo from "../assets/images/kakaoLogo.svg";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import ColorBackgroundBtn from "../components/common/ColorBackgroundBtn";
import googleLogo from "../assets/images/google_logo.png";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const route = useNavigate();
  const login = useLogin();

  const handleLogin = async () => {
    await login(email, password);
    // TODO: 로그인 성공 시 전역 상태 관리 및 홈 화면 이동
  };

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center">
      <p className="font-bold text-[24px] leading-[34px] tracking-[-0.6px] mb-[42px]">
        로그인
      </p>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-[390px]">
        {/* 카카오 로그인 버튼 */}
        <ColorBackgroundBtn
          backgroundColor="#FEE500"
          textColor="#000"
          type="button"
        >
          <img src={kakaoLogo} alt="kakao-logo" className="w-[18px] h-[18px]" />
          카카오 로그인
        </ColorBackgroundBtn>

        {/* 구글 로그인 버튼 */}
        <ColorBackgroundBtn
          backgroundColor="#fff"
          textColor="#000"
          className="border border-[#747775]"
          type="button"
        >
          <img
            src={googleLogo}
            alt="google-logo"
            className="w-[18px] h-[18px]"
          />
          Google 계정으로 로그인
        </ColorBackgroundBtn>
        <Divider />

        {/* 이메일 입력 필드 */}
        <TextInput
          label="이메일"
          placeholder="abcdefg@goorm.com"
          type="email"
          required
          autoComplete="email"
          aria-label="이메일"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />

        {/* 비밀번호 입력 필드 */}
        <TextInput
          label="비밀번호"
          placeholder="비밀번호를 입력해 주세요."
          type="password"
          required
          autoComplete="current-password"
          aria-label="비밀번호"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />

        <div className="flex flex-row justify-between items-center">
          {/* 로그인 상태 유지 체크박스 */}
          <Checkbox
            label="로그인 상태 유지"
            checked={isChecked}
            onChange={(checked) => setIsChecked(checked)}
          />

          {/* 비밀번호 재설정 버튼 */}
          <BlueTextBtn
            text="비밀번호 재설정"
            type="button"
            onClick={() => {
              route("/forgot-password");
            }}
          />
        </div>

        {/* 로그인 버튼 */}
        <ColorBackgroundBtn
          disabled={!email || !password}
          type="submit"
          backgroundColor="#4f5fbf"
          textColor="#fff"
          className="my-[22px]"
        >
          로그인
        </ColorBackgroundBtn>

        {/* 이메일로 회원가입 버튼 */}
        <BlueTextBtn
          text="이메일로 회원가입 →"
          onClick={() => {
            route("/signup");
          }}
        />
      </form>
    </div>
  );
};

export default Login;
