import ColorBackgroundBtn from "../common/ColorBackgroundBtn";
import kakaoLogo from "../../assets/images/kakaoLogo.svg";
import googleLogo from "../../assets/images/googleLogo.png";

const SocialSignupSection = () => {
  return (
    <div className="w-full space-y-3">
      {/* 카카오 로그인 버튼 */}
      <ColorBackgroundBtn
        backgroundColor="#FEE500"
        textColor="#000000"
        className="w-full py-4 rounded-lg flex items-center justify-center gap-3"
      >
        <img src={kakaoLogo} alt="카카오" className="w-[18px] h-[18px]" />
        카카오로 시작하기
      </ColorBackgroundBtn>

      {/* Google 로그인 버튼 */}
      <ColorBackgroundBtn
        backgroundColor="#FFFFFF"
        textColor="#000000"
        className="w-full py-4 rounded-lg border border-gray-300 flex items-center justify-center gap-3"
      >
        <img src={googleLogo} alt="Google" className="w-[18px] h-[18px]" />
        Google 계정으로 가입
      </ColorBackgroundBtn>
    </div>
  );
};

export default SocialSignupSection;
