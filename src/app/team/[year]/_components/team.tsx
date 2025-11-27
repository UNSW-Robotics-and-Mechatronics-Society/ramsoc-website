"use client";

import { Container } from "@/components/ui/container";
import {
  DirectorsSection,
  ExecutivesSection,
  SubcommitteeSection,
  type TeamStructure,
} from "@/features/team";
import { HiArrowLeft } from "react-icons/hi2";

interface TeamSectionProps extends TeamStructure {
  year: number;
}

const Team = (team: TeamSectionProps) => (
  <section className="bg-primary-50/30 overflow-hidden py-20" key={team.year}>
    <Container>
      {team.executives.length === 0 ? (
        <div className="mx-auto max-w-[1400px]">
          <div className="border-primary-200 flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white p-12 text-center">
            <h2 className="text-primary-900 mb-4 text-3xl font-bold">
              Team Not Found
            </h2>
            <p className="text-primary-700 mb-6 max-w-md text-lg">
              No team information available for {team.year}. Check back later or
              explore other years.
            </p>
            <a
              href="/team"
              className="text-primary-600 hover:text-primary-700 inline-flex items-center font-medium transition-colors"
            >
              <HiArrowLeft className="mr-2" /> Back to Teams
            </a>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-[1400px]">
          <ExecutivesSection execs={team.executives} />
          <DirectorsSection directors={team.directors} />
          <SubcommitteeSection
            subcomProfileData={team.subcommittees}
            year={team.year}
          />
        </div>
      )}
    </Container>
  </section>
);

export default Team;
