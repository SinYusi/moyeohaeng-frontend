import { create } from "zustand";

interface ModalState {
  activeModal: "comment" | "createGroup" | null;
  modalData: {
    // comment modal을 위한 데이터
    placeId?: number;
    // createGroup modal을 위한 데이터
    // TODO: 추후 추가
  };
  openCommentModal: (placeId: number) => void;
  openCreateGroupModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  modalData: {},
  openCommentModal: (placeId: number) =>
    set({ activeModal: "comment", modalData: { placeId } }),
  openCreateGroupModal: () => set({ activeModal: "createGroup" }),
  closeModal: () => set({ activeModal: null, modalData: {} }),
}));
