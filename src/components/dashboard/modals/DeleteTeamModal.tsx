import React from "react";
import BaseModal from "../../common/modal/BaseModal";
import TextInput from "../../common/TextInput";
import ModalButton from "../../common/modal/ModalButton";

interface DeleteTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  teamName: string;
  projectCount: number;
}

const DeleteTeamModal: React.FC<DeleteTeamModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  teamName,
  projectCount,
}) => {
  const [inputTeamName, setInputTeamName] = React.useState("");
  const [showError, setShowError] = React.useState(false);
  const isTeamNameMatch = inputTeamName === teamName;

  const handleDelete = () => {
    if (!inputTeamName) {
      setShowError(true);
      return;
    }

    if (isTeamNameMatch) {
      onDelete();
    } else {
      setShowError(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTeamName(e.target.value);
    if (showError) setShowError(false);
  };
  const modalFooter = (
    <div className="self-stretch inline-flex justify-end items-center">
      <div className="flex justify-start items-center gap-2">
        <div className="w-16 h-9">
          <ModalButton onClick={onClose} variant="secondary">
            취소
          </ModalButton>
        </div>

        <div className="w-20">
          <ModalButton
            onClick={handleDelete}
            variant="primary"
            disabled={!isTeamNameMatch}
          >
            팀 삭제
          </ModalButton>
        </div>
      </div>
    </div>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="팀을 삭제하시겠습니까?"
      width={400}
      footer={modalFooter}
    >
      <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
        <div className="self-stretch text-text-subtle text-base text-[#5a6572] font-medium font-['SUIT_Variable'] leading-snug">
          [{teamName}]팀을 삭제하면 이 팀에 속한 모든 멤버가 접근할 수 없게
          됩니다.
          <br />
          <br />
          <div className="flex flex-col gap-1.5 mb-4">
            <div className="flex items-start gap-2">
              <span className="text-[#5A6572]">•</span>
              <span>현재 진행 중인 프로젝트 {projectCount}개</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#5A6572]">•</span>
              <span>해당 프로젝트의 모든 일정, 장소, 코멘트 내용 등</span>
            </div>
          </div>
          팀을 삭제하면 위의 내용들이 함께 삭제됩니다.
          <br /> 삭제된 데이터는 되돌릴 수 없으니, 신중히 진행해주세요.
          <br />
          <br />
          안전을 위해 삭제하려는 팀의 이름을 입력해주세요.
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-2">
          <div className="self-stretch inline-flex justify-start items-start gap-2">
            <div className="flex flex-col gap-1 w-full">
              <TextInput
                type="text"
                placeholder={
                  showError
                    ? "팀 이름이 일치하지 않습니다"
                    : "팀 이름을 입력하세요"
                }
                value={inputTeamName}
                onChange={handleInputChange}
                borderColor={showError ? "#F04438" : undefined}
                subtitle={
                  showError ? "팀 이름을 정확히 입력해주세요" : undefined
                }
                subtitleColor="#F04438"
              />
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default DeleteTeamModal;
