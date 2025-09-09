import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Member {
  memberId: number;
  name: string;
  email: string;
  profileImage: string;
}

interface MemberState {
  member: Member | null;
  setMember: (member: Member) => void;
  clearMember: () => void;
}

const useMemberStore = create<MemberState>()(
  persist(
    (set) => ({
      member: null,
      setMember: (member: Member) => set({ member }),
      clearMember: () => set({ member: null }),
    }),
    {
      name: "member-storage",
    }
  )
);

export default useMemberStore;
