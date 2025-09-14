export interface TeamMember {
  id: number;
  name: string;
  profileImage?: string;
}

export interface Team {
  teamId: number;
  teamName: string;
  owner?: TeamMember;
  members?: TeamMember[];
}
