type TeamMember = {
  id: string;
  name: string;
  role: string;
  year: number;
  selfie: string;
  email: string;
  linkedin: string;
};

type TeamStructure = {
  executives: TeamMember[];
  directors: TeamMember[];
  subcommittees: SubcomProfileData[];
}