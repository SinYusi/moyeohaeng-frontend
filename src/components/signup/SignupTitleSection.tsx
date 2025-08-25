import { useNavigate } from "react-router-dom";

const SignupTitleSection = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-row items-center w-full"
      onClick={() => navigate(-1)}
    >
      <span className="w-12 h-12 text-[#131416] text-[24px] font-bold cursor-pointer flex items-center justify-center mr-4">
        &lt;
      </span>
      <p className="text-[24px] font-bold text-[#131416]">회원가입</p>
    </div>
  );
};

export default SignupTitleSection;
