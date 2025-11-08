import { Container } from "@/components/ui/container";
import {
  DirectorsSection,
  ExecutivesSection,
  SubcommitteeSection,
} from "@/features/team/components";
import type { TeamStructure } from "@/features/team/hooks";

type TeamSectionProps = TeamStructure;

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
