import { useEffect, useState } from "react";
import ColorBackgroundBtn from "../common/ColorBackgroundBtn";
import ColorTextBtn from "../common/ColorTextBtn";
import TextInput from "../common/TextInput";

interface SignupTextfieldSectionProps {
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  onValidationChange: (validation: {
    isNicknameValid: boolean;
    isEmailValid: boolean;
    isCodeConfirmed: boolean;
    isPasswordValid: boolean;
    isConfirmPasswordValid: boolean;
  }) => void;
}

const SignupTextfieldSection = ({
  nickname,
  setNickname,
  email,
  setEmail,
  timeLeft,
  setTimeLeft,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  onValidationChange,
}: SignupTextfieldSectionProps) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);
  const [isCodeConfirmed, setIsCodeConfirmed] = useState<boolean | undefined>(
    undefined
  );

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const maxLength = password.length <= 20;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      minLength &&
      maxLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const isPasswordValid = validatePassword(password);
  const shouldShowError = isPasswordFocused && !isPasswordValid;

  // 유효성 검사 결과를 상위 컴포넌트로 전달
  useEffect(() => {
    const validation = {
      isNicknameValid: nickname.trim().length > 0,
      isEmailValid: email.trim().length > 0,
      isCodeConfirmed: isCodeConfirmed === true,
      isPasswordValid: isPasswordValid,
      isConfirmPasswordValid:
        password === confirmPassword && password.length > 0,
    };
    onValidationChange(validation);
  }, [
    nickname,
    email,
    isCodeConfirmed,
    isPasswordValid,
    password,
    confirmPassword,
  ]);

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
      // TODO: 인증번호 전송 로직 추가
    }
  };

  const handleResendCode = () => {
    setTimeLeft(300);
    console.log("인증번호 재전송:", email);
    // TODO: 인증번호 재전송 로직 추가
  };

  const handleConfirmCode = () => {
    // TODO: 인증번호 확인 로직 추가
    if (verificationCode === "123456") {
      console.log("인증번호 확인:", verificationCode);
      setIsCodeConfirmed(true);
    } else {
      console.log("인증번호 확인 실패:", verificationCode);
      setIsCodeConfirmed(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <TextInput
        label="이름(닉네임)"
        placeholder="이름을 입력해주세요."
        aria-label="이름(닉넴임)"
        required
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <div className="flex flex-row gap-2 w-full items-center">
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
          className="border border-[#3864F4] px-6 py-[10px] mt-[2px]"
          disabled={!email || isCodeSent}
          onClick={handleSendCode}
        >
          인증번호 전송
        </ColorBackgroundBtn>
      </div>
      {isCodeSent && (
        <div className="flex flex-row gap-2 w-full items-center">
          <div className="flex-1">
            <TextInput
              placeholder="6자리 숫자 입력"
              type="number"
              ariaLabel="인증번호"
              label={
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[#5a6572] text-sm">
                    코드를 보냈습니다. {formatTime(timeLeft)}
                  </span>
                  <ColorTextBtn onClick={handleResendCode}>
                    코드 다시받기
                  </ColorTextBtn>
                </div>
              }
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              maxLength={6}
              borderColor={isCodeConfirmed === false ? "#f8536b" : undefined}
              subtitle={
                isCodeConfirmed === false ? (
                  <div className="text-xs text-[#f8536b]">
                    코드가 틀렸습니다.
                  </div>
                ) : (
                  <div className="text-xs text-[#131416]">인증되었습니다.</div>
                )
              }
            />
          </div>
          <ColorBackgroundBtn
            backgroundColor="#3864F4"
            textColor="#fff"
            className="px-6 py-[10px] mt-[2px]"
            disabled={!verificationCode || verificationCode.length < 6}
            onClick={handleConfirmCode}
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
        ariaLabel="비밀번호"
        subtitle={
          <div
            className={`text-xs mb-6 ${
              shouldShowError ? "text-[#f8536b]" : "text-[#131416]"
            }`}
          >
            <p>최소 8자-최대 20자</p>
            <p>대문자/소문자/숫자/특수문자 각각 1자 이상 포함</p>
          </div>
        }
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => setIsPasswordFocused(true)}
        borderColor={shouldShowError ? "#f8536b" : undefined}
      />

      {/* 비밀번호 확인 입력란 */}
      <TextInput
        label="비밀번호 확인"
        placeholder="비밀번호를 한 번 더 입력해 주세요"
        type="password"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        onBlur={() => setIsConfirmPasswordFocused(true)}
        borderColor={
          isConfirmPasswordFocused && confirmPassword !== password
            ? "#f8536b"
            : undefined
        }
        subtitle={
          isConfirmPasswordFocused &&
          confirmPassword !== password && (
            <div className="text-xs text-[#f8536b]">
              비밀번호가 일치하지 않습니다.
            </div>
          )
        }
      />
    </div>
  );
};

export default SignupTextfieldSection;
