import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const PlanHeader: React.FC<{ projectName: string }> = ({ projectName }) => {
  return (
    <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200 pl-9 pr-4 border-r border-b border-r-[#131416] border-r-[1.5px] border-b-[#131416] border-b-[1.5px] bg-[#e7edf6]">
      <LeftSide projectName={projectName} />
      <RightSide />
    </div>
  );
};

export default PlanHeader;
