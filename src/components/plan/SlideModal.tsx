import React from "react";
import { useModalStore } from "../../stores/useModalStore";
import { AnimatePresence, motion } from "framer-motion";

interface SlideModalProps {
  children: React.ReactNode;
  title?: string;
  header?: React.ReactNode;
}

const SlideModal: React.FC<SlideModalProps> = ({ children, title, header }) => {
  const { activeModal, closeModal } = useModalStore();

  return (
    <AnimatePresence>
      {activeModal !== null && (
        // outer wrapper도 motion으로 만들어서 바로 제거되는 걸 방지
        <motion.div
          key="overlay"
          className="absolute inset-0 z-50 flex items-end bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          // 배경(오버레이) 자체를 클릭했을 때만 닫히도록 가드
          onClick={(e) => {
            if (e.target !== e.currentTarget) return;
            closeModal();
          }}
        >
          <motion.div
            key="slide-modal"
            // 슬라이드 애니메이션
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full mx-2 bg-white rounded-t-2xl shadow-2xl flex flex-col ring-black ring-[1.5px] overflow-hidden box-border transform-gpu will-change-transform"
            style={{ height: "calc(100% - 16px)" }}
            // 오버레이 클릭 시 내부 클릭은 닫히지 않게 막기
            onClick={(e) => e.stopPropagation()}
          >
            {/* 헤더 */}
            {header ? (
              <div>{header}</div>
            ) : (
              <div>
                <div className="flex items-center justify-center h-7">
                  <div className="w-10 h-1 bg-[#E5E7EB] rounded-full" />
                </div>
                <div className="flex items-center justify-between p-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {title ?? ""}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="close"
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
              </div>
            )}
            {/* 내용 영역 */}
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SlideModal;
