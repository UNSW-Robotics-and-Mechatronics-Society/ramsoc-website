"use client";

import { motion } from "framer-motion";
import {
  Award,
  BarChart3,
  Building2,
  Calendar,
  Mail,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import {
  SponsorshipBenefitsTable,
  SponsorshipTierCard,
} from "@/features/sponsors/components";
import { SPONSORSHIP_TIERS } from "@/features/sponsors/types";
import Link from "next/link";

export default function SponsorsPage() {
  const currentSponsors = [
    {
      name: "UNSW Arc",
      logo: "/home/unsw-arc-logo.png",
      url: "https://www.arc.unsw.edu.au/",
    },
    {
      name: "UNSW Engineering",
      logo: "/home/unsw-engineering-logo.png",
      url: "https://www.engineering.unsw.edu.au/",
    },
    {
      name: "UNSW Founders",
      logo: "/home/unsw-founders-logo.png",
      url: "https://www.founders.unsw.edu.au/",
    },
    {
      name: "Engineers Australia",
      logo: "/home/engineers-australia-logo.png",
      url: "https://www.engineersaustralia.org.au/",
    },
    {
      name: "Jinro",
      logo: "/home/Jinro_logo_-_no_background.png",
      url: "https://jinro.com.au/",
    },
    {
      name: "Pure Matcha",
      logo: "/home/purematcha-logo.avif",
      url: "https://purematcha.com.au/",
    },
  ];

  const stats = [
    {
      icon: Users,
      value: "1,800+",
      label: "Active Members",
    },
    {
      icon: Calendar,
      value: "41",
      label: "Annual Events",
    },
    {
      icon: BarChart3,
      value: "100,000+",
      label: "Monthly Social Media Views",
    },
    {
      icon: TrendingUp,
      value: "20.3%",
      label: "Growth in Female Engagement",
    },
  ];

  const achievements = [
    "2025 ARC Clubs Outstanding Event Series Award (Sumobots) - Winners",
    "2025 ARC Club of the Year Award - Runners Up",
    "Largest robotics-related society in NSW",
    "Over 300 students in annual competitions",
  ];

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-primary-600 relative overflow-hidden py-20 text-white md:py-32">
        <div className="absolute inset-0 bg-[url('/patterns/circuit-board.svg')] opacity-10" />
        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              Partner with RAMSoc
            </h1>
            <p className="mb-8 text-lg md:text-xl">
              Connect with the next generation of robotics and mechatronics
              engineers at UNSW
            </p>
            <a
              href="mailto:industry@ramsocunsw.org?subject=Sponsorship Inquiry"
              className="bg-white text-primary-600 hover:bg-primary-50 inline-flex items-center gap-2 rounded-lg px-8 py-3 font-semibold transition-colors"
            >
              <Mail className="size-5" />
              Get in Touch
            </a>
          </motion.div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="border-neutral-200 border-y py-16">
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="text-primary-600 mx-auto mb-3 size-8" />
                <div className="mb-1 text-3xl font-bold text-neutral-900">
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Current Sponsors Section */}
      <section className="bg-neutral-50 py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-neutral-900">
              Our Current Sponsors & Partners
            </h2>
            <p className="text-neutral-600 mx-auto max-w-2xl">
              We're proud to work with these leading organizations who support
              our mission to foster the next generation of mechatronics
              engineers
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
            {currentSponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:shadow-lg flex aspect-square items-center justify-center rounded-lg border border-neutral-200 p-6 transition-all duration-300 hover:scale-105"
                >
                  <Image
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    width={120}
                    height={120}
                    className="object-contain transition-opacity duration-300 hover:opacity-80"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* About Section */}
      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6 text-3xl font-bold text-neutral-900">
                About RAMSoc
              </h2>
              <div className="space-y-4 text-neutral-700">
                <p className="leading-relaxed">
                  The UNSW Robotics and Mechatronics Society (RAMSoc) is a
                  student-led society that brings together students passionate
                  about robotics and its applications. As the largest
                  robotics-related society within the university and in all of
                  NSW, we proudly represent a rapidly growing member base of
                  over 1,800 students.
                </p>
                <p className="leading-relaxed">
                  We organize and host over 30 events each year, including
                  competitions, workshops, industry nights, site visits, and
                  socials. Our aim is to offer students a wide variety of
                  opportunities to develop their engineering skills, participate
                  in team-based challenges, and grow their professional
                  networks.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-neutral-900">
                  <Award className="text-primary-600 size-6" />
                  Our Achievements
                </h3>
                <ul className="space-y-2">
                  {achievements.map((achievement, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="text-primary-700 flex items-start gap-2 text-sm"
                    >
                      <span className="text-primary-600 mt-1">•</span>
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="bg-primary-50 border-primary-200 rounded-lg border p-6">
                <Target className="text-primary-600 mb-4 size-8" />
                <h3 className="mb-3 text-xl font-semibold text-neutral-900">
                  2026 Goals
                </h3>
                <ul className="space-y-2 text-sm text-neutral-700">
                  <li className="flex gap-2">
                    <span className="text-primary-600">1.</span>
                    <span>
                      Expand and strengthen our Women in Mechatronics community
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary-600">2.</span>
                    <span>
                      Give back through impactful fundraising and outreach
                      initiatives
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary-600">3.</span>
                    <span>
                      Elevate our flagship events to reflect our growing
                      audience
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-neutral-50 rounded-lg p-6">
                <Building2 className="text-primary-600 mb-4 size-8" />
                <h3 className="mb-3 text-xl font-semibold text-neutral-900">
                  Why Sponsor RAMSoc?
                </h3>
                <ul className="space-y-3 text-sm text-neutral-700">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">✓</span>
                    <span>
                      Access to top engineering talent passionate about robotics
                      and mechatronics
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">✓</span>
                    <span>
                      Direct engagement with 1,800+ motivated students through
                      events and workshops
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">✓</span>
                    <span>
                      Brand visibility across social media platforms with
                      100,000+ monthly views
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">✓</span>
                    <span>
                      Opportunity to shape future engineers through mentorship
                      and collaboration
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Sponsorship Tiers */}
      <section className="bg-neutral-50 py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-neutral-900">
              Sponsorship Packages
            </h2>
            <p className="text-neutral-600 mx-auto max-w-2xl">
              Choose the package that best fits your goals and budget. All tiers
              include valuable benefits to help you connect with our community.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {SPONSORSHIP_TIERS.map((tier, index) => (
              <SponsorshipTierCard key={tier.tier} tier={tier} index={index} />
            ))}
          </div>
        </Container>
      </section>

      {/* Detailed Benefits Table */}
      <section className="py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-neutral-900">
              Detailed Benefits Comparison
            </h2>
            <p className="text-neutral-600 mx-auto max-w-2xl">
              Compare all the benefits included in each sponsorship tier
            </p>
          </motion.div>

          <SponsorshipBenefitsTable />
        </Container>
      </section>

      {/* Events Highlight */}
      <section className="bg-neutral-50 py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-neutral-900">
              Featured Events
            </h2>
            <p className="text-neutral-600 mx-auto max-w-2xl">
              Our flagship events that attract hundreds of students and provide
              unique sponsorship opportunities
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            <EventCard
              title="Sumobots"
              description="Our flagship annual competition where students design and build autonomous robots. With engagement more than doubling every year, Sumobots attracted 371 participants in 2025 and won the ARC Clubs Outstanding Event Series Award."
              stats={["371 participants", "Standard & Open streams", "Term-long competition"]}
              index={0}
            />
            <EventCard
              title="Buildathon"
              description="A humanitarian engineering event in partnership with CSESoc and MCIC, centered on UN Sustainable Development Goals. Teams create mechatronic solutions judged on technical execution, aesthetics, and impact."
              stats={["193 participants", "41 teams", "$300 prize money"]}
              index={1}
            />
            <EventCard
              title="Industry Night"
              description="Annual booth-based networking event connecting students with industry representatives. Students learn about experiences and discover internship or graduate opportunities."
              stats={["409 attendees in 2025", "Booth presentations", "Direct networking"]}
              index={2}
            />
            <EventCard
              title="Women in Mechatronics Panel"
              description="Part of the UNSW Diversity Festival, promoting equity of opportunity. The 2025 panel featured representatives from leading companies including Lunar Outpost, Quantium, Breaker, Stryker, and UNSW Redback Racing."
              stats={["90 attendees", "Industry speakers", "First-of-its-kind"]}
              index={3}
            />
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-20 text-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Ready to Partner with Us?
            </h2>
            <p className="mb-8 text-lg">
              Join leading organizations in supporting the next generation of
              mechatronics engineers. Contact us to discuss customized
              sponsorship packages.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="mailto:industry@ramsocunsw.org?subject=Sponsorship Inquiry"
                className="hover:bg-primary-50 inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-semibold text-primary-600 transition-colors"
              >
                <Mail className="size-5" />
                Email Us
              </a>
              <a
                href="/RAMSoc Prospectus 2026.pdf"
                download
                className="border-white hover:bg-primary-700 inline-flex items-center gap-2 rounded-lg border-2 px-8 py-3 font-semibold text-white transition-colors"
              >
                Download Prospectus
              </a>
            </div>
            <p className="text-primary-100 mt-6 text-sm">
              industry@ramsocunsw.org | University of New South Wales,
              Kensington, NSW 2052
            </p>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}

function EventCard({
  title,
  description,
  stats,
  index,
}: {
  title: string;
  description: string;
  stats: string[];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <h3 className="mb-3 text-xl font-bold text-neutral-900">{title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-neutral-700">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {stats.map((stat, idx) => (
          <span
            key={idx}
            className="bg-primary-100 text-primary-700 rounded-full px-3 py-1 text-xs font-medium"
          >
            {stat}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
