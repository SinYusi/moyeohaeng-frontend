import { useNavigate } from "react-router-dom";
import ColorBackgroundBtn from "../components/common/ColorBackgroundBtn";
import { useState } from "react";
import TextInput from "../components/common/TextInput";

const ResetPassword = () => {
  const navigate = useNavigate();
  const correctEmail = "test@test.com";
  const [email, setEmail] = useState<string>("");
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
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
    <div className="w-full h-[100vh] flex flex-col items-center">
      <div className="w-[390px] flex flex-col">
        <div
          className="flex flex-row items-center w-full mb-36 mt-25"
          onClick={() => navigate(-1)}
        >
          <span className="w-12 h-12 text-[#131416] text-[24px] font-bold cursor-pointer flex items-center justify-center mr-4">
            &lt;
          </span>
          <p className="text-[24px] font-bold text-[#131416]">
            비밀번호 재설정
          </p>
        </div>
        {isEmailSent ? (
          <div className="flex flex-col items-center gap-2 mb-13">
            <p className="text-[24px] font-bold text-[#3864f4]">{email}</p>
            <p className="text-[24px] text-[#131416] font-bold">
              비밀번호 재설정 이메일을 전송했습니다.
            </p>
            <p className="text-[16px] text-[#131416] font-medium text-center">
              임시 비밀번호로 로그인하신 뒤, <br />
              보안을 위해 새로운 비밀번호로 변경해 주세요.
            </p>
            <ColorBackgroundBtn
              className="mt-22 w-full"
              type="button"
              onClick={() => navigate("/login")}
            >
              로그인하기
            </ColorBackgroundBtn>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
