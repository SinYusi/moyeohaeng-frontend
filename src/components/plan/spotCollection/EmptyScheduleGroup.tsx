import { Plus } from "lucide-react";
import { useModalStore } from "../../../stores/useModalStore";

const EmptyScheduleGroup: React.FC = () => {
  const { openCreateGroupModal } = useModalStore();
  const handleAddGroup = () => {
    openCreateGroupModal();
  };

  return (
    <div
      className="flex items-start content-start gap-4 self-stretch flex-wrap"
      onClick={handleAddGroup}
    >
      <div className="flex px-[2px] flex-col group cursor-pointer">
        <div className="w-[80%] h-2 rounded-[12px] border-t border-t-[1.5px] border-x border-x-[1.5px] border-dashed border-[#c0c7ce] group-hover:border-solid group-hover:border-[#4f5fbf]"></div>
        <div className="flex h-28 py-3 px-6 flex-col justify-center items-center gap-1 self-stretch border border-[#c0c7ce] border-[1.5px] border-dashed rounded-r-[12px] rounded-bl-[12px] group-hover:border-solid group-hover:border-[#4f5fbf]">
          <Plus size={32} color="#4f5fbf" />
          <p className="text-center text-xs text-[#4f5fbf] font-bold">
            회의하고 싶은 장소만 모아보세요
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyScheduleGroup;
