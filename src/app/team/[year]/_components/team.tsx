"use client";

import { Container } from "@/components/ui/container";
import {
  DirectorsSection,
  ExecutivesSection,
  SubcommitteeSection,
  type TeamStructure,
} from "@/features/team";

interface TeamSectionProps extends TeamStructure {
  year: number;
}

const Team = (team: TeamSectionProps) => {
  return (
    <section className="bg-primary-50/30 overflow-hidden py-20" key={team.year}>
      <Container>
        <div className="mx-auto max-w-[1400px]">
          {/* Executives Section */}
          <div className="mb-20">
            <div className="mb-8">
              <h3 className="text-primary-900 mb-3 text-2xl font-semibold">
                Executives
              </h3>
              <p className="text-primary-700 max-w-2xl text-sm leading-relaxed">
                Our executive team leads the society's strategic direction,
                ensures smooth operations, and fosters a welcoming environment
                for all members.
              </p>
            </div>
            <ExecutivesSection execs={team.executives} />
          </div>

          {/* Directors Section */}
          <div className="mb-20">
            <div className="mb-8">
              <h3 className="text-primary-900 mb-3 text-2xl font-semibold">
                Directors
              </h3>
              <p className="text-primary-700 max-w-2xl text-sm leading-relaxed">
                Our directors oversee key areas of the society, from events and
                sponsorships to marketing and IT infrastructure.
              </p>
            </div>
            <DirectorsSection directors={team.directors} />
          </div>

          {/* Subcommittee Section */}
          <div>
            <div className="mb-8">
              <h3 className="text-primary-900 mb-3 text-2xl font-semibold">
                Subcommittee
              </h3>
              <p className="text-primary-700 max-w-2xl text-sm leading-relaxed">
                Our subcommittee members support directors in executing
                initiatives, from content creation to event logistics and member
                engagement.
              </p>
            </div>
            <SubcommitteeSection subcomProfileData={team.subcommittees} />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Team;
