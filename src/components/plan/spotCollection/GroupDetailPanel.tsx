import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGetGroupDetail from "../../../hooks/plan/group/useGetGroupDetail";
import GrayBgTextBtn from "../../common/GrayBgTextBtn";
import { ArrowLeft, Ellipsis } from "lucide-react";
import sortIcon from "../../../assets/images/sort.svg";
import SelectionScheduleBlock from "./SpotCollectionScheduleBlock";

const GroupDetailPanel = () => {
  const [searchParams] = useSearchParams();
  const groupId = searchParams.get("groupId");
  const { groupDetail, getGroupDetail } = useGetGroupDetail();
  const navigate = useNavigate();

  useEffect(() => {
    if (groupId) {
      getGroupDetail(groupId);
    }
  }, [groupId, getGroupDetail]);

  return (
    <div className="flex py-12 px-9 flex-col items-start gap-6 shrink-0">
      {/* GroupHeader */}
      <div className="flex px-[2px] justify-between items-center w-full">
        {/* LeftSide */}
        <div className="flex items-center gap-4">
          <GrayBgTextBtn onClick={() => navigate(-1)}>
            <ArrowLeft size={26} />
          </GrayBgTextBtn>
          <div className="flex items-end gap-3">
            <p className="text-[#131416] text-[32px] font-bold">
              {groupDetail?.name}
            </p>
            <p className="text-sm text-[#5a6572] mb-2.5">
              총 장소 {groupDetail?.placeBlocks.length}개
            </p>
          </div>
        </div>
        <GrayBgTextBtn>
          <Ellipsis size={28} color="#3b4553" />
        </GrayBgTextBtn>
      </div>
      {/* BlockListSection */}
      <div className="flex flex-col w-full gap-1 items-center self-stretch">
        {/* SortBar */}
        <div className="flex justify-end w-full gap-1 items-center">
          <p className="text-base font-medium text-[#000]">최근 담은순</p>
          <img src={sortIcon} alt="sort" className="w-4 h-4 cursor-pointer" />
        </div>
        <div className="grid gap-x-3 grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3">
          {groupDetail?.placeBlocks.map((block) => (
            <SelectionScheduleBlock key={block.id} place={block} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupDetailPanel;
