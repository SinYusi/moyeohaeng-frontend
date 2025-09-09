import { Plus, ThumbsUp } from "lucide-react";
import type { PlaceBlock } from "../../../types/planTypes";
import GrayBgTextBtn from "../../common/GrayBgTextBtn";
import { useSpotCollectionStore } from "../../../stores/useSpotCollectionStore";
import FilledThumbsUp from "../../../assets/images/FilledThumbsUp.svg";
import { useModalStore } from "../../../stores/useModalStore";

const BlockCommentSection = ({
  userInteraction,
  id,
}: {
  userInteraction: PlaceBlock;
  id: string;
}) => {
  const { toggleLike } = useSpotCollectionStore();
  const { openCommentModal } = useModalStore();

  const handleLikeClick = () => {
    toggleLike(id);
  };

  const handleCommentClick = () => {
    openCommentModal(Number(id));
  };

  return (
    <div className="flex flex-col px-[2px] items-start gap-1 self-stretch">
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
              className="cursor-pointer"
              onClick={handleLikeClick}
            />
          ) : (
            <ThumbsUp
              size={16}
              color="#3b4553"
              fill={`${userInteraction.likeSummary.liked ? "#3b4553" : "none"}`}
              className="cursor-pointer"
              onClick={handleLikeClick}
            />
          )}
          <p className="text-sm font-medium text-[#131416] w-[10px]">
            {userInteraction.likeSummary.totalCount}
          </p>
        </div>
      </div>
      {/* CommentArea */}
      <div className="flex flex-col justify-center items-center px-3 py-2 rounded-[12px] self-stretch bg-[#f9fafb]">
        {/* FirstComment */}
        <div className="flex items-start py-1 gap-[6px] self-stretch">
          {userInteraction.commentSummary.totalCount > 0 ? (
            <div></div>
          ) : (
            <p className="text-xs font-medium text-[#7b8482]">
              가장 먼저 의견을 남겨보세요
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlockCommentSection;
