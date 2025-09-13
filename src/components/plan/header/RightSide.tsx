import UserSection from "./UserSection";

const RightSide = () => {
  return (
    <div className="flex items-center gap-3">
      <UserSection />
      <button
        className="px-3 h-9 flex justify-center items-center rounded-[6px] bg-[#4f5fbf] text-[#fff] text-base font-semibold hover:bg-[#4253b1] cursor-pointer"
        onClick={() => alert("구현되지 않은 기능입니다.")}
      >
        초대하기
      </button>
    </div>
  );
};

export default RightSide;
