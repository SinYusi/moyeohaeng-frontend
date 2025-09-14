import type { Team } from "./team";

export const PROJECT_ACCESS = {
  PRIVATE: "PRIVATE",
  PUBLIC: "PUBLIC",
  PROTECTED: "PROTECTED",
};

export type ProjectAccess = keyof typeof PROJECT_ACCESS;
export interface Project {
  id: string;
  externalId: string;
  title: string;
  color: string;
  projectAccess: ProjectAccess; // Enum
  startDate: string;
  endDate: string;
  travelDays: number;
  isAllowGuest: boolean;
  isAllowViewer: boolean;
  modifiedAt: string;
  public: boolean;
  active: boolean;
  upcoming: boolean;
  finished: boolean;
  durationDays: number;
  remainingDays: number;
  team: Team;
}
