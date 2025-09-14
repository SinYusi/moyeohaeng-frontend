import { create } from "zustand";
import type { PlaceBlock } from "../types/planTypes";

type ActiveModal = "comment" | "createGroup" | "modifyGroup" | "travelSchedule" | "addToSchedule" | null;

interface ModalData {
  // comment modal을 위한 데이터
  placeId?: number;
  // createGroup modal을 위한 데이터
  selectedPlaces?: PlaceBlock[];
  onGroupCreated?: () => void;
  // modifyGroup modal을 위한 데이터
  // travelSchedule modal을 위한 데이터
  projectTitle?: string;
  onTravelScheduleComplete?: () => void;
  // addToSchedule modal을 위한 데이터
  placeInfo?: {
    kakoPlaceId: string;
    placeName: string;
    address: string;
    category: string;
  };
  projectInfo?: {
    startDate: string;
    endDate: string;
    durationDays: number;
  };
}

interface ModalState {
  activeModal: ActiveModal;
  modalData: ModalData;
  // Generic open function for extensibility
  openModal: (type: Exclude<ActiveModal, null>, data?: ModalData) => void;
  // Specific helpers
  openCommentModal: (placeId: number) => void;
  openModifyGroupModal: () => void;
  openTravelScheduleModal: (projectTitle: string, onComplete?: () => void) => void;
  openAddToScheduleModal: (
    placeInfo: {
      kakoPlaceId: string;
      placeName: string;
      address: string;
      category: string;
    },
    projectInfo?: {
      startDate: string;
      endDate: string;
      durationDays: number;
    }
  ) => void;
  // Backward compatibility (maps to creatGroup)
  openCreateGroupModal: (onGroupCreated?: () => void) => void;
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
  openCreateGroupModal: (onGroupCreated?: () => void) =>
    set({ activeModal: "createGroup", modalData: { selectedPlaces: [], onGroupCreated } }),
  openModifyGroupModal: () =>
    set({ activeModal: "modifyGroup", modalData: {} }),
  openTravelScheduleModal: (projectTitle: string, onComplete?: () => void) =>
    set({ activeModal: "travelSchedule", modalData: { projectTitle, onTravelScheduleComplete: onComplete } }),
  openAddToScheduleModal: (
    placeInfo: {
      kakoPlaceId: string;
      placeName: string;
      address: string;
      category: string;
    },
    projectInfo?: {
      startDate: string;
      endDate: string;
      durationDays: number;
    }
  ) =>
    set({ activeModal: "addToSchedule", modalData: { placeInfo, projectInfo } }),
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
