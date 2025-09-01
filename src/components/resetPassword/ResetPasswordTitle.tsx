import { useNavigate } from "react-router-dom";

const ResetPasswordTitle = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row items-center w-full mb-36 mt-25">
      <span
        className="w-12 h-12 text-[#131416] text-[24px] font-bold cursor-pointer flex items-center justify-center mr-4"
        onClick={() => navigate(-1)}
      >
        &lt;
      </span>
      <p className="text-[24px] font-bold text-[#131416] select-none">
        비밀번호 재설정
      </p>
    </div>
  );
};

export default ResetPasswordTitle;
