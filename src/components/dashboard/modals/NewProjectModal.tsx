import React, { useState } from "react";
import { useParams } from "react-router-dom";
import BaseModal from "../../common/modal/BaseModal";
import ModalButton from "../../common/modal/ModalButton";
import usePostProject from "../../../hooks/project/usePostProject";
import useMemberStore from "../../../stores/useMemberStore";
import { getTeamId } from "../../../utils/teamUtils";
import usePutProject from "../../../hooks/project/usePutProject";
import { MOYOEHANG_COLORS } from "../../../types/colors";

interface NewProjectModalProps {
  isOpen: boolean;
  modalTitle?: string;
  projectId?: string;
  initialProjectName?: string;
  initialProjectColor?: string;
  type: "create" | "update";
  onClose: () => void;
  onSuccess?: () => void;
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  modalTitle,
  projectId,
  initialProjectName,
  initialProjectColor,
  type,
  onClose,
  onSuccess,
}) => {
  const [projectName, setProjectName] = useState(initialProjectName ?? "");
  const [selectedColor, setSelectedColor] = useState(initialProjectColor ?? "");
  const { member } = useMemberStore();
  const { createProject, isLoading, error } = usePostProject();
  const { updateProject } = usePutProject();

  const handleClose = () => {
    setProjectName(initialProjectName ?? "");
    setSelectedColor(initialProjectColor ?? "");
    onClose();
  };

  const { teamId: urlTeamId } = useParams();

  const handleSubmit = async () => {
    if (!projectName.trim() || isLoading) return;

    if (type === "create") {
      await create();
    } else {
      await update();
    }
    handleClose();
    onSuccess?.();
  };

  const create = async () => {
    try {
      const teamId = await getTeamId(urlTeamId, member?.email);

      if (!teamId) {
        alert("팀을 찾을 수 없습니다.");
        return;
      }

      await createProject({
        title: projectName.trim(),
        color: selectedColor,
        teamId: teamId,
      });
    } catch (err) {
      alert(error || `프로젝트 생성에 실패했습니다. 다시 시도해주세요.`);
    }
  };

  const update = async () => {
    try {
      await updateProject(projectId!, {
        title: projectName.trim(),
        color: selectedColor,
      });
    } catch (err) {
      alert(error || `프로젝트 수정에 실패했습니다. 다시 시도해주세요.`);
    }
  };

  // TODO 나중에 전역으로 빼기
  const colors = [
    { id: "coral", value: MOYOEHANG_COLORS.coral },
    { id: "lemon", value: MOYOEHANG_COLORS.lemon },
    { id: "lime", value: MOYOEHANG_COLORS.lime },
    { id: "mint", value: MOYOEHANG_COLORS.mint },
    { id: "sky", value: MOYOEHANG_COLORS.sky },
    { id: "purple", value: MOYOEHANG_COLORS.purple },
    { id: "rose", value: MOYOEHANG_COLORS.rose },
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
          {isLoading ? "생성 중..." : type === "create" ? "만들기" : "수정하기"}
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
