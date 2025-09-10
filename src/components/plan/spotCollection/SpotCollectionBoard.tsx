import GroupSection from "./GroupSection";
import AllBlockSection from "./AllBlockSection";
import { useSpotCollectionStore } from "../../../stores/useSpotCollectionStore";
import emptyCollection from "../../../assets/images/empty.png";

const SpotCollectionBoard = () => {
  const { collections } = useSpotCollectionStore();
  if (collections.length === 0)
    return (
      <div className="w-full h-full px-9 py-6 flex flex-col items-center justify-center gap-8">
        <img
          src={emptyCollection}
          alt="emptyCollection"
          className="w-[70%]"
        />
        <p className="text-[24px] text-[#131416] font-[700]">
          마음에 드는 장소를 모아 함께 이야기해 보세요.
        </p>
      </div>
    );
  return (
    <div className="w-full px-9 py-6 flex flex-col items-center gap-8">
      <GroupSection />
      <AllBlockSection />
    </div>
  );
};

export default SpotCollectionBoard;
