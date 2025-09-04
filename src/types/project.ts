export interface Project {
  id: number;
  title: string;
  description: string;
  days: number;
  people: number;
  modifiedTime: string;
  startDate: string;
  endDate: string;
  updatedAt: string;
  createdAt: number;
  team: {
    id: number;
    name: string;
  };
}
