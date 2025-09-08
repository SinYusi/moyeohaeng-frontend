import { create } from "zustand";

interface ModalState {
  activeModal: "comment" | "createGroup" | null;
  modalData: {
    // comment modal을 위한 데이터
    id?: string;
    // createGroup modal을 위한 데이터
    // TODO: 추후 추가
  };
  openCommentModal: (id: string) => void;
  openCreateGroupModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  modalData: {},
  openCommentModal: (id: string) =>
    set({ activeModal: "comment", modalData: { id } }),
  openCreateGroupModal: () => set({ activeModal: "createGroup" }),
  closeModal: () => set({ activeModal: null, modalData: {} }),
}));
