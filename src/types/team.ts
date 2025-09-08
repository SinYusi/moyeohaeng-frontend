export interface TeamMember {
  id: number;
  name: string;
  profileImage?: string;
}

export interface Team {
  id: number;
  name: string;
  owner?: TeamMember;
  members?: TeamMember[];
}
