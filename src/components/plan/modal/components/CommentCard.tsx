import React from "react";
import UserAvatar from "../../../common/UserAvatar";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import ContextMenu, {
  type ContextMenuItem,
} from "../../../common/menu/ContextMenu";

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  userColor: "red" | "yellow";
  isOwn: boolean;
}

interface CommentCardProps {
  comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const menuItems: ContextMenuItem[] = [
    {
      id: "edit",
      label: "코멘트 수정",
      icon: <Pencil className="w-4 h-4" />,
      onSelect: () => {
        // TODO: 팀 편집 로직/모달 연결
        console.log("팀 편집 클릭");
      },
      dividerBelow: true,
    },
    {
      id: "delete",
      label: "삭제",
      icon: <Trash2 className="w-4 h-4" />,
      onSelect: () => {},
    },
  ];
  return (
    <article className="w-full inline-flex items-start gap-3 relative">
      {/* User Avatar */}
      <UserAvatar userColor={comment.userColor} />

      {/* Comment Content */}
      <section className="flex-1 flex flex-col gap-2">
        {/* Author and timestamp */}
        <header className="flex items-center gap-2">
          <h3 className="text-base font-bold text-[#111827] leading-snug">
            {comment.author}
          </h3>
          <time className="text-xs font-medium text-[#9CA3AF] leading-none">
            {comment.timestamp}
          </time>
        </header>

        {/* Comment text */}
        <p className="text-sm font-medium text-[#111827] leading-tight whitespace-pre-line">
          {comment.content}
        </p>
      </section>

      {/* Ellipsis menu for own comments */}
      {comment.isOwn && (
        <nav className="absolute top-0 right-0 w-6 h-6 flex items-center justify-center">
          <ContextMenu
            trigger={<MoreHorizontal className="w-4 h-4 text-[#9CA3AF]" />}
            align="right"
            items={menuItems}
          />
        </nav>
      )}
    </article>
  );
};

export default CommentCard;
