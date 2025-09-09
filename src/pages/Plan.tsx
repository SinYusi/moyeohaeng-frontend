import MapSection from "../components/plan/map/MapSection";
import SpotCollectionBoard from "../components/plan/spotCollection/SpotCollectionBoard";
import CommentSlideModal from "../components/plan/modal/CommentSlideModal";
import { useModalStore } from "../stores/useModalStore";
import CreateGroupSlideModal from "../components/plan/modal/CreateGroupSlideModal";
import AddPlaceToGroupSlideModal from "../components/plan/modal/AddPlaceToGroupSlideModal";

const Plan = () => {
  const {
    activeModal,
    openCommentModal,
    openCreateGroupModal,
    openModifyGroupModal,
  } = useModalStore();
  return (
    <div className="flex w-full h-screen bg-gray-100">
      {/* 좌측 영역 (헤더 + 좌측 패널 + 중간 패널) */}
      <div className="flex flex-col w-[57.292%]">
        {/* 상단 헤더 - 좌측 패널과 중간 패널을 통과 */}
        <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200 px-6">
          <h1 className="text-xl font-semibold text-gray-800">프로젝트 이름</h1>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              초대하기
            </button>
            {/* 테스트용 모달 오픈 버튼들 */}
            <button
              className="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200"
              onClick={() => openCommentModal(1)}
            >
              모달 테스트(코멘트)
            </button>
            <button
              className="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200"
              onClick={() => openCreateGroupModal()}
            >
              모달 테스트(그룹 생성)
            </button>
            <button
              className="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200"
              onClick={() => openModifyGroupModal()}
            >
              모달 테스트(그룹 수정)
            </button>
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-pink-400 rounded-full"></div>
              <div className="w-8 h-8 bg-orange-400 rounded-full"></div>
              <div className="w-8 h-8 bg-green-400 rounded-full"></div>
              <div className="w-8 h-8 bg-purple-400 rounded-full"></div>
              <div className="w-8 h-8 bg-pink-400 rounded-full"></div>
              <div className="w-8 h-8 bg-orange-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* 좌측 패널과 중간 패널 컨테이너 */}
        <div className="flex flex-1">
          {/* 좌측 패널 - 셀렉션 및 스크랩북 */}
          <div className="w-[70.833%] h-full bg-white border-r border-gray-200 overflow-y-auto">
            <SpotCollectionBoard />
          </div>

          {/* 중간 패널 - 여행 일정 */}
          <div className="relative w-[29.167%] h-full bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-5">
              <h2 className="text-lg font-medium text-gray-800 mb-2">
                중간 패널
              </h2>
              <p className="text-sm text-gray-600">여행 일정 영역</p>
              {activeModal === "comment" && <CommentSlideModal />}
              {activeModal === "createGroup" && <CreateGroupSlideModal />}
              {activeModal === "modifyGroup" && <AddPlaceToGroupSlideModal />}
            </div>
          </div>
        </div>
      </div>

      {/* 우측 패널 - 지도 */}
      <div className="w-[42.708%] h-full bg-white overflow-y-auto">
        <MapSection />
      </div>
    </div>
  );
};

export default Plan;
