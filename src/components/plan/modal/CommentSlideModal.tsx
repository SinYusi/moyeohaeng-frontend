import { useState } from "react";
import SlideModal from "../SlideModal";
import { useModalStore } from "../../../stores/useModalStore";
import SelectedPlaceCard from "../SelectedPlaceCard";
import CommentCard from "./components/CommentCard";
import CommentInput from "./components/CommentInput";
import { commentsByPlace } from "../../../mocks/comments";

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  userColor: "red" | "yellow";
  isOwn: boolean;
}

const CommentSlideModal = () => {
  const { modalData } = useModalStore();
  const { placeId } = modalData;
  const [newComment, setNewComment] = useState("");

  if (!placeId) return <p>placeId를 불러올 수 없습니다.</p>;
  // const place = getPlaceById(placeId); // TODO: Use actual place data instead of mock
  const comments: Comment[] = (commentsByPlace as Record<number, Comment[]>)[
    placeId
  ] ?? [];

  const handleSendComment = () => {
    if (newComment.trim()) {
      // TODO: Add comment to list
      console.log("Sending comment:", newComment);
      setNewComment("");
    }
  };

  return (
    <SlideModal title="코멘트">
      <main className="px-4 pb-4 pt-1 flex flex-col gap-6 h-full">
        {/* Place Card Display */}
        <section className="h-44 bg-[#F9FAFB] rounded-lg flex flex-col justify-center items-center">
          <SelectedPlaceCard
            title="흰다정"
            subtitle="강원특별자치도 속초시 수복로 248"
            category="카페"
            categoryColor="#FB923C"
            memo="점심 식사 후 다 같이 빙수"
          />
        </section>

        {/* Comments List */}
        <section className="flex-1 rounded-xl flex flex-col gap-8">
          <ul className="flex flex-col gap-8">
            {comments.map((comment) => (
              <li key={comment.id}>
                <CommentCard comment={comment} />
              </li>
            ))}
          </ul>

          {/* Comment Input */}
          <footer>
            <CommentInput
              value={newComment}
              onChange={setNewComment}
              onSend={handleSendComment}
            />
          </footer>
        </section>
      </main>
    </SlideModal>
  );
};

export default CommentSlideModal;
