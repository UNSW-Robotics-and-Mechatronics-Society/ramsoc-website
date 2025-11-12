import SubcomProfiles from "@/features/team/components/subcom-profiles";
import type { SubcomProfile } from "@/features/team/types";

interface SubcommitteeSectionProps {
  subcomProfileData: SubcomProfile[];
}

export const SubcommitteeSection = ({
  subcomProfileData,
}: SubcommitteeSectionProps) => {
  return <SubcomProfiles subcomData={subcomProfileData} />;
};
