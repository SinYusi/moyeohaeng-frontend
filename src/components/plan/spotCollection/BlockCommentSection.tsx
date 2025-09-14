import { CircleUser, Plus, ThumbsUp } from "lucide-react";
import type { PlaceBlock } from "../../../types/planTypes";
import GrayBgTextBtn from "../../common/GrayBgTextBtn";
import { useSpotCollectionStore } from "../../../stores/useSpotCollectionStore";
import FilledThumbsUp from "../../../assets/images/FilledThumbsUp.svg";
import { useModalStore } from "../../../stores/useModalStore";
import useToggleLike from "../../../hooks/plan/placeBlock/useToggleLike";

const BlockCommentSection = ({
  userInteraction,
  id,
  isSelectionMode = false,
}: {
  userInteraction: PlaceBlock;
  id: string;
  isSelectionMode?: boolean;
}) => {
  const { updateCollection } = useSpotCollectionStore();
  const { openCommentModal } = useModalStore();
  const { toggleLike: apiToggleLike, loading } = useToggleLike();

  const handleLikeClick = async () => {
    if (loading || isSelectionMode) return; // 로딩 중이거나 선택 모드면 클릭 무시

    const result = await apiToggleLike(id);
    
    if (result) {
      // API 성공 시 store 업데이트 - 좋아요 상태 토글
      const newLiked = !userInteraction.likeSummary.liked;
      const newTotalCount = Math.max(
        0,
        userInteraction.likeSummary.totalCount + (newLiked ? 1 : -1)
      );

      updateCollection(id, {
        likeSummary: {
          ...userInteraction.likeSummary,
          liked: newLiked,
          totalCount: newTotalCount,
        },
      });
    }
  };

  const handleCommentClick = () => {
    if (isSelectionMode) return;
    openCommentModal(Number(id));
  };

  return (
    <div className={`flex flex-col px-[2px] items-start gap-1 self-stretch ${isSelectionMode ? 'opacity-50' : ''}`}>
      {/* CommentHeader */}
      <div className="flex justify-between items-center self-stretch">
        <GrayBgTextBtn onClick={handleCommentClick}>
          <Plus size={16} color="#3b4553" />
          <p className="text-sm font-bold text-[#131416]">코멘트 추가</p>
        </GrayBgTextBtn>
        <div className="flex items-center gap-[2px]">
          {userInteraction.likeSummary.liked ? (
            <img
              src={FilledThumbsUp}
              alt="좋아요"
              width={16}
              height={16}
              className={`${!isSelectionMode ? 'cursor-pointer' : ''} ${loading || isSelectionMode ? "opacity-50" : ""}`}
              onClick={handleLikeClick}
            />
          ) : (
            <ThumbsUp
              size={16}
              color="#3b4553"
              fill={`${userInteraction.likeSummary.liked ? "#3b4553" : "none"}`}
              className={`${!isSelectionMode ? 'cursor-pointer' : ''} ${loading || isSelectionMode ? "opacity-50" : ""}`}
              onClick={handleLikeClick}
            />
          )}
          <p className="text-sm font-medium text-[#131416] w-[10px]">
            {userInteraction.likeSummary.totalCount}
          </p>
        </div>
      </div>
      {/* CommentArea */}
      <div
        className={`flex flex-col justify-center px-3 py-2 rounded-[12px] self-stretch bg-[#f9fafb] ${
          !isSelectionMode ? 'cursor-pointer hover:bg-[#e7edf6]' : ''
        }`}
        onClick={handleCommentClick}
      >
        {/* FirstComment */}
        {userInteraction.commentSummary.totalCount > 0 ? (
          // CommentArea
          <>
            <div className="flex py-1 items-center gap-[6px] self-stretch">
              <CircleUser size={16} color="#fa6060" />
              <p className="text-xs text-[#131416]">
                {userInteraction.commentSummary.lastComment.content}
              </p>
            </div>
            <p className="text-xs text-[#7b8482] self-end">
              {userInteraction.commentSummary.totalCount - 1}개 더보기
            </p>
          </>
        ) : (
          <p className="text-xs font-medium text-[#7b8482]">
            가장 먼저 의견을 남겨보세요
          </p>
        )}
      </div>
    </div>
  );
};

export default BlockCommentSection;
