import React from "react";
import BaseModal from "../../common/modal/BaseModal";
import ModalButton from "../../common/modal/ModalButton";

interface DeleteProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  projectName: string;
}

const DeleteProjectModal: React.FC<DeleteProjectModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  projectName,
}) => {
  const handleClose = () => {
    onClose();
  };
  const modalFooter = (
    <div className="self-stretch inline-flex justify-end items-center">
      <div className="flex justify-start items-center gap-2">
        <div className="w-16 h-9">
          <ModalButton onClick={handleClose} variant="secondary">
            취소
          </ModalButton>
        </div>
        <div className="h-9">
          <ModalButton onClick={onDelete} variant="primary">
            프로젝트삭제
          </ModalButton>
        </div>
      </div>
    </div>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title="프로젝트를 삭제하시겠습니까?"
      width={384}
      footer={modalFooter}
    >
      <div className="self-stretch inline-flex flex-col justify-start items-start gap-2.5">
        <div className="self-stretch justify-start text-[var(--text-primary-hover,#4253b1)] text-xl font-semibold font-['SUIT_Variable'] leading-7">
          [{projectName}]
        </div>
        <div className="self-stretch justify-start text-[var(--text-subtle,#5a6572)] text-base font-medium font-['SUIT_Variable'] leading-snug">
          해당 프로젝트를 삭제하면, 프로젝트 내 모든 일정, 장소, 코멘트 등
          관련된 데이터가 즉시 영구적으로 삭제됩니다. 삭제 후에는 되돌릴 수
          없습니다.
          <br />
          <br />
          삭제를 진행하시겠습니까?
        </div>
      </div>
    </BaseModal>
  );
};

export default DeleteProjectModal;
