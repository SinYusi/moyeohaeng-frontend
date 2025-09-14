import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LeftSide: React.FC<{ projectName: string }> = ({ projectName }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-3">
      <ChevronLeft
        size={24}
        color="#3b4553"
        onClick={() => navigate('/dashboard')}
        className="cursor-pointer"
      />
      <h1 className="text-xl font-semibold text-[#131416] tracking-[-0.4px]">
        {projectName}
      </h1>
    </div>
  );
};

export default LeftSide;
