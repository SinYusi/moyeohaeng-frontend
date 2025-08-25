import ColorBackgroundBtn from "../components/common/ColorBackgroundBtn";
import { useState } from "react";
import Divider from "../components/common/Divider";
import SignupTitleSection from "../components/signup/SignupTitleSection";
import SignupTextfieldSection from "../components/signup/SignupTextfieldSection";
import AgreementSection from "../components/signup/AgreementSection";
import SocialSignupSection from "../components/signup/SocialSignupSection";

const Signup = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAllRequiredChecked, setIsAllRequiredChecked] = useState(false);

  const handleRequiredAgreementChange = (isCompleted: boolean) => {
    setIsAllRequiredChecked(isCompleted);
  };

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
        />
        {/* 서비스 정책 동의 섹션 */}
        <AgreementSection
          onRequiredAgreementChange={handleRequiredAgreementChange}
        />

        {/* 회원가입 버튼 */}
        <ColorBackgroundBtn
          backgroundColor={isAllRequiredChecked ? "#3864F4" : "#F3F4F6"}
          textColor={isAllRequiredChecked ? "#FFFFFF" : "#9CA3AF"}
          className="w-full py-4 rounded-lg"
          disabled={!isAllRequiredChecked}
        >
          회원가입
        </ColorBackgroundBtn>

        {/* 구분선 */}
        <Divider label="또는 간편 회원가입" color="#131416" />

        {/* 소셜 로그인 섹션 */}
        <SocialSignupSection />
      </div>
    </div>
  );
};

export default Signup;
