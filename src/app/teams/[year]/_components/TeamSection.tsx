import { JSX } from "react";

import { Container } from "@/components/ui/Container";
import { SubcomProfileData } from "@/types/subcomData";
import { TeamMember, TeamStructure } from "@/types/teamData";

import ProfileCards from "./profileCard/ProfileCards";
import SubcomProfileCards from "./profileCard/SubcomProfileCards";
import styles from "./team.module.scss";

type TitleHeaderProps = {
  text: string;
};

const TitleHeader = ({ text }: TitleHeaderProps): JSX.Element => {
  return <h1 className={styles.title}>{text.toUpperCase()}</h1>;
};

type SectionExecutivesProps = {
  execs: TeamMember[];
};

const ExecutivesSection = ({ execs }: SectionExecutivesProps): JSX.Element => {
  return (
    <div className={styles.sectionContainer}>
      <TitleHeader text={"Executives"} />
      <ProfileCards profileData={execs} background="executive" />
    </div>
  );
};

type SectionDirectorsProps = {
  directors: TeamMember[];
};

const DirectorsSection = ({
  directors,
}: SectionDirectorsProps): JSX.Element => {
  return (
    <div className={styles.sectionContainer}>
      <TitleHeader text={"Directors"} />
      <ProfileCards profileData={directors} background="director" />
    </div>
  );
};

type SectionSubcommitteeProps = {
  subcomProfileData: SubcomProfileData[];
};

const SectionSubcommittee = ({
  subcomProfileData,
}: SectionSubcommitteeProps): JSX.Element => {
  return (
    <div className={styles.sectionContainer}>
      <TitleHeader text="Subcommittees" />
      <SubcomProfileCards subcomData={subcomProfileData} />
    </div>
  );
};

type TeamSectionProps = TeamStructure;

const TeamSection = async (team: TeamSectionProps) => {
  return (
    <Container width="full" className="px-4">
      <ExecutivesSection execs={team.executives} />
      <DirectorsSection directors={team.directors} />
      <SectionSubcommittee subcomProfileData={team.subcommittees} />
    </Container>
  );
};

export default TeamSection;
