import googleLogo from "../../assets/images/google_logo.png";

const GoogleLoginBtn = () => {
  return (
    <button className="flex flex-row justify-center items-center p-2 gap-2 h-12 bg-white border border-[#747775] rounded cursor-pointer">
      <img src={googleLogo} alt="google-logo" className="w-[18px] h-[18px]" />
      Google 계정으로 로그인
    </button>
  );
};

export default GoogleLoginBtn;
