import kakaoLogo from "../../assets/images/kakaoLogo.svg";

const KakaoLoginBtn = () => {
  return (
    <button className="flex flex-row justify-center items-center p-2 gap-2 h-12 bg-[#FEE500] rounded-md cursor-pointer">
      <img src={kakaoLogo} alt="kakao-logo" className="w-[18px] h-[18px]" />
      카카오 로그인
    </button>
  );
};

export default KakaoLoginBtn;
