import { create } from "zustand";

type ActiveModal = "comment" | "createGroup" | "modifyGroup" | null;

interface ModalData {
  // comment modal을 위한 데이터
  placeId?: number;
  // creatGroup / modifyGroup modal을 위한 데이터
  // TODO: 추후 추가 필드 정의
}

interface ModalState {
  activeModal: ActiveModal;
  modalData: ModalData;
  // Generic open function for extensibility
  openModal: (type: Exclude<ActiveModal, null>, data?: ModalData) => void;
  // Specific helpers
  openCommentModal: (placeId: number) => void;
  openModifyGroupModal: () => void;
  // Backward compatibility (maps to creatGroup)
  openCreateGroupModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  modalData: {},
  openModal: (type, data = {}) => set({ activeModal: type, modalData: data }),
  openCommentModal: (placeId: number) =>
    set({ activeModal: "comment", modalData: { placeId } }),
  openCreateGroupModal: () =>
    set({ activeModal: "createGroup", modalData: {} }),
  openModifyGroupModal: () =>
    set({ activeModal: "modifyGroup", modalData: {} }),
  // Deprecated: kept for backward compatibility
  closeModal: () => set({ activeModal: null, modalData: {} }),
}));
