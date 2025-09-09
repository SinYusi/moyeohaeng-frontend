import React from "react";
import { ArrowUp } from "lucide-react";

interface CommentInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
}

const CommentInput: React.FC<CommentInputProps> = ({
  value,
  onChange,
  onSend,
  placeholder = "장소에 대한 의견을 나눠주세요",
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSend();
    }
  };

  return (
    <form
      className="w-full self-stretch inline-flex justify-start items-start gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSend();
      }}
    >
      <figure className="w-6 h-6 bg-yellow-500 rounded-[999px] flex justify-center items-center">
        <span className="w-5 h-5 relative bg-yellow-100 rounded-[999px] outline-1 outline-offset-[-1px] outline-white overflow-hidden">
          <span className="w-4 h-3.5 left-[3.25px] top-[5.50px] absolute bg-yellow-500" />
        </span>
      </figure>
      <section className="flex-1 px-3 pt-1.5 pb-3 bg-[#F3F4F6] rounded-lg outline-1 outline-offset-[-1px] outline-[#E5E7EB] inline-flex flex-col justify-start items-end gap-2">
        <fieldset className="self-stretch py-0.5 inline-flex justify-start items-start">
          <label className="flex-1 flex justify-start items-center overflow-hidden">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="flex-1 justify-start text-[#9CA3AF] text-xs font-medium leading-tight bg-transparent outline-none placeholder:text-[#9CA3AF]"
              onKeyPress={handleKeyPress}
              aria-label="댓글 입력"
            />
          </label>
        </fieldset>
        <button
          type="submit"
          className="w-6 h-6 bg-[#111827] rounded-[999px] inline-flex justify-center items-center"
          aria-label="댓글 전송"
        >
          <span className="w-4 h-4 relative overflow-hidden">
            <ArrowUp className="w-2.5 h-2.5 absolute left-[2.83px] top-[2.83px] text-white" />
          </span>
        </button>
      </section>
    </form>
  );
};

export default CommentInput;
