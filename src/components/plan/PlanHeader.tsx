import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PlanHeader: React.FC<{ projectName: string }> = ({ projectName }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200 pl-9 pr-4 border-r border-b border-r-[#131416] border-r-[1.5px] border-b-[#131416] border-b-[1.5px] bg-[#e7edf6]">
      <div className="flex items-center gap-3">
        <ChevronLeft
          size={24}
          color="#3b4553"
          onClick={() => navigate(-1)}
          className="cursor-pointer"
        />
        <h1 className="text-xl font-semibold text-gray-800">{projectName}</h1>
      </div>
    </div>
  );
};

export default PlanHeader;
