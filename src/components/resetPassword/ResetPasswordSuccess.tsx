import ColorBackgroundBtn from "../common/ColorBackgroundBtn";
import { useNavigate } from "react-router-dom";

const ResetPasswordSuccess = ({ email }: { email: string }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-2">
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
  );
};

export default ResetPasswordSuccess;
