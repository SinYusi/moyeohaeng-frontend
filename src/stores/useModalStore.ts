import { create } from "zustand";
import type { PlaceBlock } from "../types/planTypes";

type ActiveModal = "comment" | "createGroup" | "modifyGroup" | null;

interface ModalData {
  // comment modal을 위한 데이터
  placeId?: number;
  // createGroup modal을 위한 데이터
  selectedPlaces?: PlaceBlock[];
  // modifyGroup modal을 위한 데이터
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
  // Group creation helpers
  addSelectedPlace: (place: PlaceBlock) => void;
  removeSelectedPlace: (placeId: string) => void;
  clearSelectedPlaces: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  modalData: {},
  openModal: (type, data = {}) => set({ activeModal: type, modalData: data }),
  openCommentModal: (placeId: number) =>
    set({ activeModal: "comment", modalData: { placeId } }),
  openCreateGroupModal: () =>
    set({ activeModal: "createGroup", modalData: { selectedPlaces: [] } }),
  openModifyGroupModal: () =>
    set({ activeModal: "modifyGroup", modalData: {} }),
  closeModal: () => set({ activeModal: null, modalData: {} }),
  addSelectedPlace: (place: PlaceBlock) =>
    set((state) => ({
      modalData: {
        ...state.modalData,
        selectedPlaces: [
          ...(state.modalData.selectedPlaces || []),
          place,
        ],
      },
    })),
  removeSelectedPlace: (placeId: string) =>
    set((state) => ({
      modalData: {
        ...state.modalData,
        selectedPlaces: (state.modalData.selectedPlaces || []).filter(
          (place) => place.id !== placeId
        ),
      },
    })),
  clearSelectedPlaces: () =>
    set((state) => ({
      modalData: {
        ...state.modalData,
        selectedPlaces: [],
      },
    })),
}));
