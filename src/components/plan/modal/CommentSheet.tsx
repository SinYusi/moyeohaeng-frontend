import { useState, useRef } from "react";
import { useModalStore } from "../../../stores/useModalStore";
import { useSpotCollectionStore } from "../../../stores/useSpotCollectionStore";
import SlideModal from "../SlideModal";
import ScheduleBlock from "../spotCollection/ScheduleBlock";
import { ArrowUp } from "lucide-react";
import usePostComment from "../../../hooks/plan/comment/usePostComment";
import useGetComment from "../../../hooks/plan/comment/useGetComment";
import type { Comment } from "../../../types/planTypes";
import { getTimeAgo } from "../../../utils/timeUtils";

const CommentSheet = () => {
  const [comment, setComment] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { modalData } = useModalStore();
  const { getPlaceById } = useSpotCollectionStore();
  const { postComment } = usePostComment();

  const formatTimeAgo = (createdAt: string) => {
    const timeAgo = getTimeAgo(createdAt);
    return timeAgo.value === 0
      ? "방금 전"
      : `${timeAgo.value}${timeAgo.unit} 전`;
  };

  const placeId = modalData.placeId;
  if (!placeId) {
    console.log("placeId is not defined");
    return null;
  }

  const place = getPlaceById(placeId.toString());
  if (!place) {
    console.log("place is not defined");
    return null;
  }

  const { comments, getComment } = useGetComment({ placeBlockId: place.id });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim() === "") {
      return;
    }
    await postComment(place.id, comment);
    setComment("");
    inputRef.current?.blur();
    getComment();
  };

  return (
    <SlideModal>
      {/* ContentBody */}
      <div className="flex flex-col items-center gap-6 flex-1 self-stretch overflow-y-auto hide-scroll">
        {/* SelectedBlockView */}
        <div className="min-h-[180px] flex flex-col justify-center items-center self-stretch rounded-[8px] bg-[#f9fafb] w-full px-[10%] py-[8%]">
          <ScheduleBlock place={place} />
        </div>
        {/* CommentSection */}
        {/* TODO: 코멘트 배열 페치하기 */}
        {comments.map((comment: Comment) => (
          <div key={comment.id} className="flex items-start w-full gap-2">
            {/* TODO: 실제 프로필 이미지 사용하기 */}
            <div className="w-6 h-6 flex justify-center items-center rounded-full bg-[#3864f4]" />
            {/* CommentContent */}
            <div className="flex flex-col justify-center items-start gap-1 flex-1">
              {/* CommentHeader */}
              <div className="flex items-center gap-[6px] self-stretch">
                <p className="text-base font-bold text-[#131416]">
                  {comment.name}
                </p>
                <p className="text-xs text-[#7b848e]">
                  {formatTimeAgo(comment.createdAt)}
                </p>
              </div>
              {/* CommentBody */}
              <p className="text-sm text-[#131416]">{comment.content}</p>
            </div>
          </div>
        ))}
        {/* CommentComposer */}
        <div className="flex gap-2 self-stretch mb-6">
          {/* Avatar */}
          {/* TODO: 실제 프로필 이미지 사용하기 */}
          <div className="w-6 h-6 flex justify-center rounded-full bg-[#3864f4]" />
          {/* CommentForm */}
          <form
            className="flex flex-col gap-2 px-3 py-[6px] flex-1 rounded-[8px] border border-[1px] border-[#c0c7ce] bg-[#f9fafb] overflow-hidden"
            onSubmit={handleSubmit}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="장소에 대한 의견을 자유롭게 나눠보세요."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex flex-1 items-center placeholder:text-[#7b848e] placeholder:text-sm text-sm text-[#131416] py-2 outline-none focus:outline-none"
            />
            <button
              className="flex w-6 h-6 justify-center items-center rounded-full bg-[#3b4553] cursor-pointer hover:bg-[#131416] self-end"
              type="submit"
            >
              <ArrowUp size={16} color="#fff" />
            </button>
          </form>
        </div>
      </div>
    </SlideModal>
  );
};

export default CommentSheet;
