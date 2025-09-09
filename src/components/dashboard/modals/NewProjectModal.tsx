import React, { useState } from "react";
import { useParams } from "react-router-dom";
import BaseModal from "../../common/modal/BaseModal";
import ModalButton from "../../common/modal/ModalButton";
import ProjectService from "../../../service/projectService";
import useMemberStore from "../../../stores/useMemberStore";
import { getTeamId } from "../../../utils/teamUtils";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalTitle?: string;
  initialName?: string;
  onSuccess?: () => void;
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  modalTitle,
  initialName,
  onSuccess,
}) => {
  const [projectName, setProjectName] = useState(initialName ?? "");
  const [selectedColor, setSelectedColor] = useState("coral");
  const [isLoading, setIsLoading] = useState(false);
  const { member } = useMemberStore();

  const handleClose = () => {
    setProjectName(initialName ?? "");
    setSelectedColor("coral");
    onClose();
  };

  const { teamId: urlTeamId } = useParams();

  const handleSubmit = async () => {
    if (!projectName.trim() || isLoading) return;

    try {
      setIsLoading(true);
      const teamId = await getTeamId(urlTeamId, member?.email);

      if (!teamId) {
        console.error("팀을 찾을 수 없습니다.");
        return;
      }

      const projectService = new ProjectService();
      await projectService.createProject({
        teamId,
        title: projectName.trim(),
        color: selectedColor,
      });

      handleClose();
      onSuccess?.();
    } catch (error) {
      console.error("프로젝트 생성 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // TODO 나중에 전역으로 빼기
  const colors = [
    { id: "coral", value: "#FB7354" },
    { id: "lemon", value: "#FFE74C" },
    { id: "lime", value: "#8EE888" },
    { id: "mint", value: "#7FEDDC" },
    { id: "sky", value: "#73C3FB" },
    { id: "purple", value: "#CF94FF" },
    { id: "rose", value: "#FFA6BF" },
  ];

  const modalFooter = (
    <div className="flex justify-end items-center gap-2">
      <div className="w-16">
        <ModalButton onClick={handleClose}>닫기</ModalButton>
      </div>
      <div className="w-20">
        <ModalButton
          onClick={handleSubmit}
          variant="primary"
          disabled={!projectName.trim() || isLoading}
        >
          {isLoading ? "생성 중..." : "만들기"}
        </ModalButton>
      </div>
    </div>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title={modalTitle ?? "새 프로젝트 만들기"}
      width={600}
      footer={modalFooter}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="text-text-subtle text-sm font-medium font-['SUIT_Variable'] leading-5">
            프로젝트 이름
          </div>
          <div className="h-[52px] px-4 bg-fill-white rounded-md border-[1.5px] border-stroke-subtle flex items-center">
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="예 : 여름 여행"
              className="w-full border-none outline-none text-sm font-medium font-['SUIT_Variable'] text-text-default placeholder-text-subtle"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-text-subtle text-sm font-medium font-['SUIT_Variable'] leading-5">
            프로젝트 컬러 선택
          </div>
          <div className="h-[52px] px-12 rounded-md border border-stroke-subtler flex justify-between items-center">
            {colors.map((color) => (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color.id)}
                className="w-7 h-7 rounded-full p-1 bg-transparent cursor-pointer"
              >
                <div
                  className={`w-5 h-5 rounded-full ${
                    selectedColor === color.id
                      ? "border-2 border-fill-primary-default"
                      : ""
                  }`}
                  style={{ backgroundColor: color.value }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default NewProjectModal;
