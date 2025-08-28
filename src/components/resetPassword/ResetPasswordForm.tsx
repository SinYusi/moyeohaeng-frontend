import TextInput from "../common/TextInput";
import ColorBackgroundBtn from "../common/ColorBackgroundBtn";
import { useState } from "react";
const ResetPasswordForm = ({
  email,
  setEmail,
  setIsEmailSent,
}: {
  email: string;
  setEmail: (email: string) => void;
  setIsEmailSent: (isEmailSent: boolean) => void;
}) => {
  const correctEmail = "test@test.com";
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === correctEmail) {
      setIsEmailSent(true);
    } else {
      setIsEmailError(true);
      setErrorMessage("이메일 정보를 찾을 수 없습니다.");
    }
  };
  return (
    <form className="flex flex-col" onSubmit={handleResetPassword}>
      <div className="flex flex-col gap-2 mb-13">
        <p className="text-[24px] font-bold text-[#131416]">
          비밀번호를 잊어버리셨나요?
        </p>
        <p className="text-[16px] font-medium text-[#131416]">
          비밀번호 재설정을 위해 가입한 이메일을 입력해주세요.
        </p>
      </div>
      <TextInput
        label="이메일"
        placeholder="이메일을 입력해주세요."
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        subtitle={errorMessage}
        subtitleColor="#F8536b"
        borderColor={isEmailError ? "#F8536b" : undefined}
      />
      <ColorBackgroundBtn className="mt-16" type="submit">
        비밀번호 재설정
      </ColorBackgroundBtn>
    </form>
  );
};

export default ResetPasswordForm;
