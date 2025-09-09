import type { Team } from "./team";

export interface Project {
  externalId: string;
  title: string;
  description: string;
  days: number;
  people: number;
  modifiedTime: string;
  startDate: string;
  endDate: string;
  updatedAt: string;
  createdAt: number;
  active: boolean;
  color: string;
  durationDays: number;
  finished: boolean;
  isAllowGuest: boolean;
  isAllowViewer: boolean;
  projectAccess: string;
  public: boolean;
  remainingDays: number;
  travelDays: number;
  team: Team;
}
