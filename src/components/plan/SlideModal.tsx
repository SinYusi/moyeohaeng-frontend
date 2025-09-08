import React from "react";
import { useModalStore } from "../../stores/useModalStore";
import { AnimatePresence, motion } from "framer-motion";

interface SlideModalProps {
  children: React.ReactNode;
}

const SlideModal: React.FC<SlideModalProps> = ({ children }) => {
  const { activeModal, closeModal } = useModalStore();

  return (
    <AnimatePresence>
      {activeModal === "comment" && (
        // outer wrapper도 motion으로 만들어서 바로 제거되는 걸 방지
        <motion.div
          key="overlay"
          className="absolute inset-0 z-50 flex items-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          // 오버레이 클릭으로 닫기 원하면 아래 주석 해제
          onClick={closeModal}
        >
          <motion.div
            key="slide-modal"
            // 슬라이드 애니메이션
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full bg-white rounded-t-2xl shadow-2xl flex flex-col"
            style={{ height: "calc(100% - 16px)" }}
            // 오버레이 클릭 시 내부 클릭은 닫히지 않게 막기
            onClick={(e) => e.stopPropagation()}
          >
            {/* 헤더 */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">코멘트</h2>
              <button
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* 내용 영역 */}
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SlideModal;
