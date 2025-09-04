import GroupSection from "./GroupSection";
import AllBlockSection from "./AllBlockSection";

const SpotCollectionBoard = () => {
  return (
    <div className="w-full px-9 py-6 flex flex-col items-center gap-8">
      <GroupSection />
      <AllBlockSection />
    </div>
  );
};

export default SpotCollectionBoard;
