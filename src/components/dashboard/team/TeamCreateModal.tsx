import React, { useState } from "react";
import BaseModal from "../../common/modal/BaseModal";
import ModalButton from "../../common/modal/ModalButton";
import { Link } from "lucide-react";
import TeamService from "../../../service/teamService";

interface TeamCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TeamCreateModal: React.FC<TeamCreateModalProps> = ({
  isOpen,
  onClose,
}) => {
  const teamService = new TeamService();
  const [step, setStep] = useState(1);
  const [teamName, setTeamName] = useState("");
  const [copied, setCopied] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    if (teamName.trim() === "") return;
    setStep(2);
  };

  const handlePrevious = () => {
    setStep(1);
  };

  const handleClose = () => {
    setStep(1);
    setTeamName("");
    setCopied(false);
    onClose();
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const renderStep1 = () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="text-text-subtle text-sm font-medium font-['SUIT_Variable']">
          팀 이름
        </div>
        <div className="flex">
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="예 : 여행메이트"
            className="flex-1 h-12 px-4 bg-fill-white rounded-md outline-[1.5px] outline-stroke-subtle text-sm font-medium"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="self-stretch flex flex-col gap-2.5">
      <div className="self-stretch inline-flex justify-start items-center gap-4">
        <div className="flex-1 flex justify-start items-center gap-2">
          <div className="w-8 h-8 bg-fill-white rounded-md outline-[#4f5fbf] outline-[1.2px] outline-stroke-primary-default flex justify-center items-center">
            <Link className="w-4 h-4 text-[#4f5fbf]" />
          </div>
          <div className="flex-1 inline-flex flex-col justify-center items-start gap-1">
            <div className="text-text-default text-base font-medium font-['SUIT_Variable'] leading-snug">
              팀 초대 링크
            </div>
          </div>
        </div>
        <button
          onClick={handleCopyLink}
          className="w-22 h-10 px-3 bg-surface-default rounded-md  outline-[1.5px] outline-[#3864f4] flex justify-center items-center hover:bg-fill-primary-subtle transition-colors"
        >
          <span className=" text-text-primary-active text-[#3864f4] font-semibold font-['SUIT_Variable'] leading-snug flex items-center gap-1">
            {copied ? "복사됨" : "링크 복사"}
          </span>
        </button>
      </div>
    </div>
  );

  const renderFooter = () => (
    <div className="flex justify-between items-center">
      <div className="text-text-subtle text-sm font-medium font-['SUIT_Variable']">
        ({step}/2)
      </div>
      <div className="flex justify-end items-center gap-2">
        {step === 1 ? (
          <>
            <div className="w-16">
              <ModalButton variant="secondary" onClick={handleClose}>
                취소
              </ModalButton>
            </div>
            <div className="w-16">
              <ModalButton
                variant="primary"
                onClick={handleNext}
                disabled={!teamName.trim()}
              >
                다음
              </ModalButton>
            </div>
          </>
        ) : (
          <>
            <div className="w-16">
              <ModalButton variant="secondary" onClick={handlePrevious}>
                이전
              </ModalButton>
            </div>
            <div className="w-18">
              <ModalButton
                variant="primary"
                onClick={async () => {
                  setIsLoading(true);
                  try {
                    const team = await teamService.createTeam({
                      newTeamName: teamName,
                    });
                    // TODO: 초대 링크 생성 로직 추가 필요
                    setInviteLink(
                      `https://moyeohaeng.com/invite/${team.teamId}`
                    );
                    alert('팀이 성공적으로 생성되었습니다!');
                    handleClose();
                  } catch (error) {
                    console.error("팀 생성 실패:", error);
                    alert('팀 생성에 실패했습니다. 다시 시도해주세요.');
                  } finally {
                    setIsLoading(false);
                  }
                }}
                disabled={isLoading}
              >
                {isLoading ? "생성 중..." : "만들기"}
              </ModalButton>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title="새 팀 만들기"
      width={600}
      footer={renderFooter()}
    >
      {step === 1 ? renderStep1() : renderStep2()}
    </BaseModal>
  );
};

export default TeamCreateModal;
