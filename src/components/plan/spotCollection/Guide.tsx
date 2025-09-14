import emptyCollection from "../../../assets/images/empty.png";

const Guide = () => {
  return (
    <div className="w-full h-full px-9 py-6 flex flex-col items-center justify-center gap-8">
      <img src={emptyCollection} alt="emptyCollection" className="w-[70%]" />
      <div className="flex flex-col items-center gap-4">
        <p className="text-[24px] text-[#131416] font-[700] text-center">
          마음에 드는 장소를 모아 함께 이야기해 보세요.
        </p>
        <p className="text-[18px] text-[#5a6572] font-[500] text-center tracking-[-0.4px]">
          지도에서 원하는 장소를 찾은 뒤, 장소 모음에 추가하면 <br /> 다른
          여행원과 비교하고 의견을 나눌 수 있어요.
        </p>
      </div>
    </div>
  );
};

export default Guide;
