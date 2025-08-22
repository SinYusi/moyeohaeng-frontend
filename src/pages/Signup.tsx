import { useNavigate } from "react-router-dom";
import TextInput from "../components/common/TextInput";
import ColorBackgroundBtn from "../components/common/ColorBackgroundBtn";
import { useState, useEffect } from "react";
import ColorTextBtn from "../components/common/ColorTextBtn";
import Checkbox from "../components/common/CheckBox";
import Divider from "../components/common/Divider";

const Signup = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 서비스 정책 동의 상태
  const [agreements, setAgreements] = useState({
    all: false,
    age: false,
    terms: false,
    privacy: false,
  });

  // 전체 동의 처리
  const handleAllAgreement = (checked: boolean) => {
    setAgreements({
      all: checked,
      age: checked,
      terms: checked,
      privacy: checked,
    });
  };

  // 개별 동의 처리
  const handleIndividualAgreement = (
    key: keyof typeof agreements,
    checked: boolean
  ) => {
    const newAgreements = { ...agreements, [key]: checked };

    // 모든 필수 항목이 체크되었는지 확인
    const allRequired =
      newAgreements.age && newAgreements.terms && newAgreements.privacy;

    setAgreements({
      ...newAgreements,
      all: allRequired,
    });
  };

  // 모든 필수 항목이 체크되었는지 확인
  const isAllRequiredChecked =
    agreements.age && agreements.terms && agreements.privacy;

  useEffect(() => {
    if (isCodeSent && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isCodeSent, timeLeft]);

  const handleSendCode = () => {
    if (email) {
      setIsCodeSent(true);
      setTimeLeft(300);
      console.log("인증번호 전송:", email);
    }
  };

  const handleResendCode = () => {
    console.log("인증번호 재전송:", email);
    setTimeLeft(300);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center py-15">
      <div className="w-[390px] h-auto flex flex-col items-center justify-center gap-13">
        <div
          className="flex flex-row items-center w-full"
          onClick={() => navigate(-1)}
        >
          <span className="w-12 h-12 text-[#131416] text-[24px] font-bold cursor-pointer flex items-center justify-center mr-4">
            &lt;
          </span>
          <p className="text-[24px] font-bold text-[#131416]">회원가입</p>
        </div>
        <div className="flex flex-col gap-6 w-full">
          <TextInput
            label="이름(닉네임)"
            placeholder="이름을 입력해주세요."
            aria-label="이름(닉넴임)"
            required
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <div className="flex flex-row gap-2 w-full items-end">
            <div className="flex-1">
              <TextInput
                label="이메일"
                placeholder="abcdefg@goorm.com"
                type="email"
                aria-label="이메일"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <ColorBackgroundBtn
              backgroundColor="#fff"
              textColor="#3864F4"
              className="border border-[#3864F4] px-6 py-[10px]"
              disabled={!email || isCodeSent}
              onClick={handleSendCode}
            >
              인증번호 전송
            </ColorBackgroundBtn>
          </div>
          {isCodeSent && (
            <div className="flex flex-row gap-2 w-full items-end">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[#5a6572] text-sm">
                    코드를 보냈습니다. {formatTime(timeLeft)}
                  </span>
                  <ColorTextBtn onClick={handleResendCode}>
                    코드 다시받기
                  </ColorTextBtn>
                </div>
                <TextInput
                  placeholder="6자리 숫자 입력"
                  type="text"
                  aria-label="인증번호"
                  required
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                />
              </div>
              <ColorBackgroundBtn
                backgroundColor="#3864F4"
                textColor="#fff"
                className="px-6 py-[10px]"
                disabled={!verificationCode || verificationCode.length < 6}
              >
                확인
              </ColorBackgroundBtn>
            </div>
          )}

          {/* 비밀번호 입력란 */}
          <TextInput
            label="비밀번호"
            placeholder="비밀번호를 입력해 주세요"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* 비밀번호 요구사항 */}
          <div className="text-xs text-gray-500 -mt-4">
            <p>최소 8자-최대 20자</p>
            <p>대문자/소문자/숫자/특수문자 각각 1자 이상 포함</p>
          </div>

          {/* 비밀번호 확인 입력란 */}
          <TextInput
            label="비밀번호 확인"
            placeholder="비밀번호를 한 번 더 입력해 주세요"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* 서비스 정책 동의 섹션 */}
          <div className="w-full">
            {/* 제목과 전체동의 */}
            <div className="flex justify-between items-center mb-6 border-b border-[#Edf0f4] pb-5">
              <h2 className="text-xl font-bold text-[#131416]">서비스 정책</h2>
              <Checkbox
                label="전체동의"
                checked={agreements.all}
                onChange={handleAllAgreement}
              />
            </div>

            {/* 개별 동의 항목들 */}
            <div className="space-y-4">
              <Checkbox
                label="만 14세 이상입니다. (필수)"
                checked={agreements.age}
                onChange={(checked) =>
                  handleIndividualAgreement("age", checked)
                }
              />

              <div className="flex justify-between items-center">
                <Checkbox
                  label="서비스 이용약관 동의 (필수)"
                  checked={agreements.terms}
                  onChange={(checked) =>
                    handleIndividualAgreement("terms", checked)
                  }
                />
                <ColorTextBtn color="#131416" className="underline">
                  내용보기
                </ColorTextBtn>
              </div>

              <div className="flex justify-between items-center">
                <Checkbox
                  label="개인정보 수집 및 이용 동의 (필수)"
                  checked={agreements.privacy}
                  onChange={(checked) =>
                    handleIndividualAgreement("privacy", checked)
                  }
                />
                <ColorTextBtn color="#131416" className="underline">
                  내용보기
                </ColorTextBtn>
              </div>
            </div>
          </div>

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
          <Divider label="또는 간편 회원가입" color="#E5E7EB" />

          {/* 소셜 로그인/회원가입 버튼들 */}
          <div className="w-full space-y-3">
            {/* 카카오 로그인 버튼 */}
            <ColorBackgroundBtn
              backgroundColor="#FEE500"
              textColor="#000000"
              className="w-full py-4 rounded-lg flex items-center justify-center gap-3"
            >
              <img 
                src="/src/assets/images/kakaoLogo.svg" 
                alt="카카오" 
                className="w-6 h-6"
              />
              카카오로 시작하기
            </ColorBackgroundBtn>

            {/* Google 로그인 버튼 */}
            <ColorBackgroundBtn
              backgroundColor="#FFFFFF"
              textColor="#000000"
              className="w-full py-4 rounded-lg border border-gray-300 flex items-center justify-center gap-3"
            >
              <img 
                src="/src/assets/images/google_logo.png" 
                alt="Google" 
                className="w-6 h-6"
              />
              Google 계정으로 가입
            </ColorBackgroundBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
