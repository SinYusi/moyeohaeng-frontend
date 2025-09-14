import { Fragment } from "react/jsx-runtime";
import SlideModal from "../SlideModal";
import { useState } from "react";
import { Check, X } from "lucide-react";
import { useModalStore } from "../../../stores/useModalStore";
import ScheduleBlock from "../spotCollection/ScheduleBlock";

const COLORS = [
  "#fb7354",
  "#ffe74c",
  "#8ee888",
  "#7feddc",
  "#73c3fb",
  "#cf94ff",
  "#ffa6bf",
];

const CreateGroupSheet = () => {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]); // 기본값으로 첫 번째 색상 선택
  const { modalData, removeSelectedPlace } = useModalStore();

  const selectedPlaces = modalData.selectedPlaces || [];

  return (
    <SlideModal>
      <Fragment>
        <div className="flex flex-col justify-center items-start self-stretch">
          <p className="text-sm text-[#5a6572] tracking-[-0.3px]">그룹 이름</p>
          <div className="flex h-11 items-center shrink-0 self-stretch">
            <input
              type="text"
              className="flex py-1 items-center flex-1 text-[#131416] placeholder:text-[#7b8482] text-xs 2xl:text-sm  outline-none"
              placeholder="회의하고 싶은 장소만 모아보세요"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <p className="text-xs text-[#7b8482] ">{`(${groupName.length}/30)`}</p>
          </div>
          <div className="w-full border-t border-[#c0c7ce]" />
        </div>
        <div className="flex flex-col justify-center items-start gap-2 w-full">
          <p className="text-xs text-[#5a6572] tracking-[-0.3px]">그룹 컬러</p>
          <div className="flex px-4 justify-center items-center gap-2 rounded-[8px] border border-[#c0c7ce] h-12">
            {COLORS.map((color) => (
              <div
                key={color}
                className={`w-5 h-5 rounded-full cursor-pointer relative flex items-center justify-center ${
                  selectedColor === color
                    ? "ring-2 ring-[#4f5fbf] ring-offset-3"
                    : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              >
                {selectedColor === color && (
                  <Check size={12} color="#4f5fbf" strokeWidth={3} />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center items-start gap-2 w-full flex-1 self-stretch min-h-0">
          <p className="text-[#5a6572] text-xs">
            선택된 장소 ({selectedPlaces.length})
          </p>
          <div className="flex py-6 px-4 flex-col items-start gap-4 flex-1 self-stretch rounded-[8px] border border-[#c0c7ce] bg-[#f9fafb] overflow-y-auto hide-scroll min-h-0">
            {selectedPlaces.length === 0 ? (
              <div className="flex flex-col items-center justify-center w-full h-full py-8">
                <p className="text-[#7b8482] text-sm">선택된 장소가 없습니다</p>
                <p className="text-[#7b8482] text-xs mt-1">
                  장소를 선택해주세요
                </p>
              </div>
            ) : (
              selectedPlaces.map((place) => (
                <ScheduleBlock place={place} key={place.id} />
              ))
            )}
          </div>
        </div>
        <button
          className={`mb-4 w-full flex flex-col pl-3 pr-4 items-center justify-center shrink-0 rounded-[6px] font-semibold h-12 transition-colors ${
            groupName.trim() && selectedPlaces.length > 0
              ? "bg-[#131416] text-[#fff] hover:bg-[#3b4553] cursor-pointer"
              : "bg-[#edf0f3] text-[#7b8482] cursor-not-allowed"
          }`}
          disabled={!groupName.trim() || selectedPlaces.length === 0}
        >
          + 그룹 만들기
        </button>
      </Fragment>
    </SlideModal>
  );
};

export default CreateGroupSheet;
