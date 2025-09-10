import { Star } from "lucide-react";

const FavoritePin = () => {
  return (
    <div className="relative cursor-pointer">
      {/* 원 배경 */}
      <div
        className="w-5 h-5 rounded-full flex items-center justify-center border border-[#3b4553]"
        style={{ backgroundColor: "#fee500" }}
      >
        {/* 별 아이콘 */}
        <Star fill="#fff" stroke="#3b4553" size={14}  />
      </div>
    </div>
  );
};

export default FavoritePin;
