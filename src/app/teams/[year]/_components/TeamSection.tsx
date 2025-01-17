import { JSX } from "react";
import ProfileCards from "./profileCard/ProfileCards";
import styles from "./team.module.scss";
import SubcomProfileCards from "./profileCard/SubcomProfileCards";

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
    <div>
      <ExecutivesSection execs={team.executives} />
      <DirectorsSection directors={team.directors} />
      <SectionSubcommittee subcomProfileData={team.subcommittees} />
    </div>
  );
};

export default TeamSection;
