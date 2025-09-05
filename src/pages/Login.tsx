import { useState } from "react";
import BlueTextBtn from "../components/common/ColorTextBtn";
import Checkbox from "../components/common/CheckBox";
import TextInput from "../components/common/TextInput";
import Divider from "../components/common/Divider";
import kakaoLogo from "../assets/images/kakaoLogo.svg";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import ColorBackgroundBtn from "../components/common/ColorBackgroundBtn";
import googleLogo from "../assets/images/googleLogo.png";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const route = useNavigate();
  const login = useLogin();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      // 로그인 성공 시 useLogin 훅 내에서 홈으로 리다이렉트됨
    } catch (error: any) {
      // 로그인 실패 처리
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      console.error("로그인 에러:", error);
    } finally {
      setIsLoading(false);
    }
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
        <Divider
          color="#131416"
          label="또는 이메일로 로그인"
          className="my-4"
        />

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
            type="button"
            color="#3864f4"
            onClick={() => {
              route("/reset-password");
            }}
          >
            비밀번호 재설정
          </BlueTextBtn>
        </div>

        {/* 로그인 버튼 */}
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

        <ColorBackgroundBtn
          disabled={!email || !password || isLoading}
          type="submit"
          backgroundColor="#4f5fbf"
          textColor="#fff"
          className="my-[22px]"
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </ColorBackgroundBtn>

        {/* 이메일로 회원가입 버튼 */}
        <BlueTextBtn
          color="#3864f4"
          onClick={() => {
            route("/signup");
          }}
        >
          이메일로 회원가입 →
        </BlueTextBtn>
      </form>
    </div>
  );
};

export default Login;
