import React from "react";
import SlideModal from "../SlideModal";
import SelectedPlaceCard from "../SelectedPlaceCard";
import ModalCTAButton from "./components/ModalCTAButton";
import ScrollableListSection from "./components/ScrollableListSection";
import GroupSummaryCard from "./components/GroupSummaryCard";

/**
 * 그룹에 장소 추가하기 모달 (Mock UI)
 * - SlideModal을 사용해 구현
 * - 의미 있는 시맨틱 태그 사용: header/main/section/article/ul/li/footer/button 등
 */
const AddPlaceToGroupSlideModal: React.FC = () => {
  // 상단 장소 카드에 표시할 Mock 데이터
  const place = {
    title: "흰다정",
    subtitle: "강원특별자치도 속초시 수복로 248",
    category: "카페",
    categoryColor: "#FB923C",
    memo: "점심 식사 후 다 같이 빙수",
  };

  // 선택된 그룹 카드 Mock 데이터
  const selectedGroups = [
    {
      id: 1,
      name: "첫날 점심 먹을 곳",
      memo: "숙소에서 도보 15분 정도",
      totalPlaces: 8,
      colorBar: "#FFE74C", // lemon
    },
    {
      id: 2,
      name: "비 올 시 플랜 B",
      memo: "", // placeholder
      totalPlaces: 12,
      colorBar: "#73C3FB", // sky
    },
    {
      id: 3,
      name: "비 올 시 플랜 C",
      memo: "", // placeholder
      totalPlaces: 12,
      colorBar: "#73C3FB", // sky
    },
    {
      id: 4,
      name: "비 올 시 플랜 D",
      memo: "", // placeholder
      totalPlaces: 12,
      colorBar: "#73C3FB", // sky
    },
  ];

  return (
    <SlideModal title="그룹에 장소 추가하기">
      <main className="px-4 pb-4 pt-1 flex flex-col gap-3">
        {/* 상단 핸들바는 SlideModal 내부에서 처리됨 */}

        {/* 선택된 장소 카드 */}
        <section
          aria-label="선택된 장소"
          className="h-44 bg-[#F9FAFB] rounded-lg flex flex-col justify-center items-center"
        >
          <SelectedPlaceCard
            title={place.title}
            subtitle={place.subtitle}
            category={place.category}
            categoryColor={place.categoryColor}
            memo={place.memo}
          />
        </section>

        {/* 선택된 그룹 리스트 */}
        <ScrollableListSection
          title="선택된 그룹"
          count={selectedGroups.length}
        >
          <ul className="flex flex-col items-center gap-4">
            {selectedGroups.map((g) => (
              <li key={g.id} className="w-56">
                <GroupSummaryCard
                  name={g.name}
                  memo={g.memo}
                  totalPlaces={g.totalPlaces}
                  colorBar={g.colorBar}
                />
              </li>
            ))}
          </ul>
        </ScrollableListSection>

        {/* 하단 CTA 버튼 */}
        <footer>
          <ModalCTAButton label="그룹에 추가하기" leadingSymbol="＋" />
        </footer>
      </main>
    </SlideModal>
  );
};

export default AddPlaceToGroupSlideModal;
