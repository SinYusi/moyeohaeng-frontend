import ColorBackgroundBtn from "../components/common/ColorBackgroundBtn";
import { useState } from "react";
import Divider from "../components/common/Divider";
import SignupTitleSection from "../components/signup/SignupTitleSection";
import SignupTextfieldSection from "../components/signup/SignupTextfieldSection";
import AgreementSection from "../components/signup/AgreementSection";
import SocialSignupSection from "../components/signup/SocialSignupSection";
import { useNavigate } from "react-router-dom";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAllRequiredChecked, setIsAllRequiredChecked] = useState(false);
  const { signup, isLoading, error } = useSignup();

  const [validation, setValidation] = useState({
    isNicknameValid: false,
    isEmailValid: false,
    isCodeConfirmed: false,
    isPasswordValid: false,
    isConfirmPasswordValid: false,
  });

  const handleRequiredAgreementChange = (isCompleted: boolean) => {
    setIsAllRequiredChecked(isCompleted);
  };

  const handleValidationChange = (newValidation: typeof validation) => {
    setValidation(newValidation);
  };

  const handleSignup = async () => {
    if (!isSignupButtonEnabled) return;

    try {
      const success = await signup({
        email,
        password,
        name: nickname,
      });

      if (success) {
        alert("회원가입에 성공했습니다. 로그인 페이지로 이동합니다.");
        navigate("/login");
      }
    } catch (err) {
      alert(error || "회원가입에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const isSignupButtonEnabled =
    validation.isNicknameValid &&
    validation.isEmailValid &&
    validation.isCodeConfirmed &&
    validation.isPasswordValid &&
    validation.isConfirmPasswordValid &&
    isAllRequiredChecked;

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center py-15">
      <div className="w-[390px] h-auto flex flex-col items-center justify-center gap-8">
        <SignupTitleSection />
        <SignupTextfieldSection
          nickname={nickname}
          setNickname={setNickname}
          email={email}
          setEmail={setEmail}
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          onValidationChange={handleValidationChange}
        />
        {/* 서비스 정책 동의 섹션 */}
        <AgreementSection
          onRequiredAgreementChange={handleRequiredAgreementChange}
        />

        {/* 회원가입 버튼 */}
        <ColorBackgroundBtn
          backgroundColor={isSignupButtonEnabled ? "#3864F4" : "#F3F4F6"}
          textColor={isSignupButtonEnabled ? "#FFFFFF" : "#9CA3AF"}
          className="w-full py-4 rounded-lg"
          disabled={!isSignupButtonEnabled || isLoading}
          onClick={handleSignup}
        >
          {isLoading ? "처리 중..." : "회원가입"}
        </ColorBackgroundBtn>

        {/* 구분선 */}
        <Divider label="또는 간편 회원가입" color="#131416" className="my-4" />

        {/* 소셜 로그인 섹션 */}
        <SocialSignupSection />
      </div>
    </div>
  );
};

export default Signup;
