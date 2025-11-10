import { Container } from "@/components/ui/container";
import {
  DirectorsSection,
  ExecutivesSection,
  SubcommitteeSection,
  type TeamStructure,
} from "@/features/team";

interface TeamSectionProps extends TeamStructure {}

const Team = (team: TeamSectionProps) => {
  return (
    <Container width="full" className="px-4">
      <ExecutivesSection execs={team.executives} />
      <DirectorsSection directors={team.directors} />
      <SubcommitteeSection subcomProfileData={team.subcommittees} />
    </Container>
  );
};

export default Team;
