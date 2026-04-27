import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import AnimatedContent from "./_components/AnimatedContent";
import FlipCard from "./_components/FlipCard";
import VictorShapeGrid from "./_components/VictorShapeGrid";
import VictorProfileCard from "./_components/VictorProfileCard";

export default function VictorPage() {
  return (
    <main className="w-full py-12">
      <Script
        src="https://elfsightcdn.com/platform.js"
        strategy="lazyOnload"
      />

      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <Link
          href="/team"
          className="text-muted-foreground mb-6 block text-sm hover:underline"
        >
          ← Back to team
        </Link>
      </div>

      <section className="bg-primary-950 relative w-full overflow-hidden shadow-lg">
        <video
          src="/team/victor/Cartographer_mapping.mp4"
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="bg-primary-700/45 absolute inset-0 mix-blend-multiply" />
        <div className="bg-primary-950/50 absolute inset-0" />

        <div className="relative z-10 mx-auto grid max-w-5xl gap-8 p-6 md:grid-cols-[minmax(260px,320px)_1fr] md:items-center md:p-8 lg:p-10">
          <div className="mx-auto w-full max-w-[320px] -translate-x-8">
            <VictorProfileCard />
          </div>

          <div className="flex h-full items-center">
            <div className="max-w-2xl translate-x-8 rounded-xl bg-[#020a17]/50 p-6 shadow-xl backdrop-blur-sm md:p-8">
              <div className="space-y-4 text-lg leading-relaxed font-bold text-white drop-shadow md:text-2xl">
                <h1 className="text-primary-400 text-3xl font-black italic">
                  About Me:
                </h1>
                <p>4th Year Robotics and Mechatronics Engineering Student</p>
                <ul className="list-disc space-y-2 pl-6 text-lg font-bold text-white">
                  <li>RoboCup Rescue Team Lead & Thesis Project</li>
                  <li>Mechatronics Intern at Polymaya</li>
                  <li>UNSW Taste of Research Scholarship with P2AgentX</li>
                  <li>Student Mentor/EEA at Engineers Australia</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <VictorShapeGrid />
        </div>

        <section className="relative z-10 mx-auto max-w-6xl px-3 py-16 md:px-5">
          <div className="space-y-10">
            <div className="grid items-start gap-5 md:grid-cols-[160px_1fr] md:gap-8">
              <div className="mx-auto flex size-32 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm md:size-36">
                <Image
                  src="/team/victor/RobocupRescueLogo.png"
                  alt="RoboCup Rescue logo"
                  width={128}
                  height={128}
                  className="h-full w-full object-contain p-3"
                />
              </div>

              <div className="relative border-l-4 border-primary-500 py-2 pl-5 md:pl-7">
                <h2 className="text-primary-950 mb-4 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                  RoboCup Rescue Team Lead & Thesis Project
                </h2>
                <ul className="text-primary-950 list-disc space-y-1 pl-5 text-base leading-relaxed md:text-lg">
                  <li>Working with HERO the Unitree Go2 robot quadruped</li>
                  <li>Completing urban search and rescue tasks</li>
                  <li>
                    Aiming to compete in the international RoboCup Rescue
                    Competition
                  </li>
                  <li>Apart of the 2025 VIP: AI4Everyone</li>
                </ul>
              </div>
            </div>

            <div className="relative grid gap-8 md:grid-cols-3 md:items-start">
              <div className="bg-primary-400 absolute left-0 top-2 hidden h-18 w-1 md:block" />
              <div className="bg-primary-400 absolute bottom-4 right-0 hidden h-18 w-1 md:block" />

              {[
                {
                  title: "Teleop-Control",
                  src: "/team/victor/VIP_controller.jpg",
                  alt: "Controller interface",
                  description:
                    "A logitech controller that has been programmed with the movement capeabilities given by the base Unitree Go2, used to test and control the robot's movement.",
                  className: "md:col-start-1 md:row-start-1 md:px-6",
                },
                {
                  title: "SLAM",
                  src: "/team/victor/GLIM_SLAM.jpg",
                  alt: "SLAM map",
                  description:
                    "SLAM(Simultaneous Localization and Mapping) is used to build and refine spatial maps so the robot can localise itself and autonomously navigate.",
                  className: "md:col-start-2 md:row-start-1 md:px-6",
                },
                {
                  title: "Camera Vision",
                  src: "/team/victor/YOLO.png",
                  alt: "YOLO camera vision output",
                  description:
                    "The vision pipeline detects key objects and scene features in real time, helping the robot interpret its surroundings more intelligently.",
                  className: "md:col-start-3 md:row-start-1 md:px-6",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className={`space-y-3 ${item.className ?? ""}`}
                >
                  <h3 className="text-primary-600 text-center text-2xl font-bold tracking-tight md:text-[2.2rem]">
                    {item.title}
                  </h3>
                  <AnimatedContent
                    distance={170}
                    direction="horizontal"
                    reverse
                    duration={1.5}
                    ease="power3.out"
                    initialOpacity={0.2}
                    animateOpacity
                    scale={0.7}
                    threshold={0.1}
                    delay={0.2}
                  >
                    <FlipCard {...item} />
                  </AnimatedContent>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="h-10" />
      </div>

      <section className="w-full bg-[#040b18] py-10 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_260px] md:items-start md:gap-10 md:px-8">
          <div className="md:col-start-1">
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              Undergraduate Mechatronics Thesis
            </h2>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-white/35 md:text-2xl">
              Developing a Perception-Informed Optimised Reinforcement Learning
              Workflow for Quadruped Locomotion Control
            </p>
          </div>

          <div className="md:col-start-2 md:pt-4">
            <h3 className="text-primary-400 text-2xl font-bold tracking-tight md:text-4xl">
              Key Concepts
            </h3>
            <ul className="mt-3 list-disc space-y-1 pl-6 text-lg leading-relaxed text-white/70 md:text-2xl">
              <li>Reinforcement Learning</li>
              <li>Behavioural Cloning</li>
              <li>Perception-Based Locomotion</li>
              <li>Sim-to-Real Transfer</li>
            </ul>
          </div>

          <div className="mx-auto w-full max-w-[210px] md:col-start-3 md:row-start-1 md:mx-0 md:w-[260px] md:max-w-none">
            <div className="relative aspect-[1.55/1] overflow-hidden rounded-2xl bg-neutral-300">
              <Image
                src="/team/victor/More_to_come.png"
                alt="More to come thesis teaser"
                fill
                sizes="(min-width: 768px) 260px, 210px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16 md:px-8">
        <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-primary-600 text-center text-2xl font-black italic md:text-3xl">
            LinkedIn Feed
          </h2>
          <div
            className="elfsight-app-7a246483-c4a5-4958-bd86-00bbe1af7b11 mt-6"
            data-elfsight-app-lazy
          />
        </div>
      </section>
    </main>
  );
}
