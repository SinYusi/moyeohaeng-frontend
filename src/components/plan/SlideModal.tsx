import React, { useState, useEffect } from "react";
import { useModalStore } from "../../stores/useModalStore";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface SlideModalProps {
  children: React.ReactNode;
}

const SlideModal: React.FC<SlideModalProps> = ({ children }) => {
  const { activeModal, closeModal } = useModalStore();
  const [isClosing, setIsClosing] = useState(false);

  // activeModal이 변경되면 isClosing 상태 초기화
  useEffect(() => {
    if (activeModal !== null) {
      setIsClosing(false);
    }
  }, [activeModal]);

  const handleClose = () => {
    setIsClosing(true);
    // 애니메이션 시간과 맞춰서 실제 닫기 실행
    setTimeout(() => {
      closeModal();
    }, 300); // exit transition duration과 동일
  };

  return (
    <AnimatePresence>
      {activeModal !== null && (
        <motion.div
          key="overlay"
          className="absolute inset-0 z-50 flex items-end bg-white/50" // 배경 반투명
          initial={{ opacity: 0 }}
          animate={{ opacity: isClosing ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            if (e.target !== e.currentTarget) return;
            handleClose();
          }}
        >
          <motion.div
            key="slide-modal"
            initial={{ y: "100%" }}
            animate={{ y: isClosing ? "100%" : 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full bg-white rounded-t-[32px] flex flex-col ring-[#131416] ring-[1.5px] box-border px-4 gap-3 items-center"
            style={{ height: "calc(100% - 16px)" }}
            onClick={(e) => e.stopPropagation()}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }} // 위아래로만 드래그
            dragElastic={0.2} // 살짝 늘어나는 탄성 효과
            onDragEnd={(_, info) => {
              // 드래그가 충분히 내려갔으면 닫기
              if (info.offset.y > 150) {
                handleClose();
              }
            }}
          >
            {/* 드래그 핸들 */}
            <div className="flex items-center justify-center w-full h-7 cursor-grab active:cursor-grabbing">
              <div className="w-10 h-1 rounded-[999px] bg-[#c0c7ce]" />
            </div>

            <div className="flex flex-row items-center justify-between h-12 self-stretch w-full">
              <p className="font-semibold text-xl">
                {activeModal === "comment" && "코멘트"}
              </p>
              <X size={32} className="cursor-pointer" onClick={handleClose} />
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SlideModal;
