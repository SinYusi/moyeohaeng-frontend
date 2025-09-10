import GroupSection from "./GroupSection";
import AllBlockSection from "./AllBlockSection";
import { useSpotCollectionStore } from "../../../stores/useSpotCollectionStore";
import useGetPlaceBlock from "../../../hooks/plan/placeBlock/useGetPlaceBlock";
import { useEffect } from "react";
import Guide from "./Guide";

const SpotCollectionBoard = () => {
  const { collections, fetchCollections } = useSpotCollectionStore();
  const { placeBlocks, loading, error } = useGetPlaceBlock();

  useEffect(() => {
    if (placeBlocks.length > 0) {
      fetchCollections(placeBlocks);
    }
  }, [placeBlocks, fetchCollections]);

  if (loading) {
    return (
      <div className="w-full h-full px-9 py-6 flex flex-col items-center justify-center gap-8">
        <div className="text-lg text-[#131416]">데이터를 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full px-9 py-6 flex flex-col items-center justify-center gap-8">
        <div className="text-lg text-red-500">에러가 발생했습니다: {error}</div>
      </div>
    );
  }
  if (collections.length === 0) {
    return <Guide />;
  }
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 px-9 py-6 flex flex-col items-center gap-8 overflow-y-auto">
        <GroupSection />
        <AllBlockSection />
      </div>
    </div>
  );
};

export default SpotCollectionBoard;
