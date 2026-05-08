"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef } from "react";

import AnimatedContent from "./_components/AnimatedContent";
import BorderGlow from "./_components/BorderGlow";
import BounceCards from "./_components/BounceCards";
import FlipCard from "./_components/FlipCard";
import LogoButton from "./_components/LogoButton";
import MagicRingsP2AgentX from "./_components/MagicRingsP2AgentX";
import P2AgentXLogoButton from "./_components/P2AgentXLogoButton";
import SoftAurora from "./_components/SoftAurora";
import UserInteractiveAppCarousel from "./_components/UserInteractiveAppCarousel";
import VictorProfileCard from "./_components/VictorProfileCard";
import VictorShapeGrid from "./_components/VictorShapeGrid";

gsap.registerPlugin(ScrollTrigger);

export default function VictorPage() {
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroProfileRef = useRef<HTMLDivElement>(null);
  const thesisSectionRef = useRef<HTMLElement>(null);
  const thesisContentRef = useRef<HTMLDivElement>(null);
  const thesisTopFoldRef = useRef<HTMLDivElement>(null);
  const thesisBottomFoldRef = useRef<HTMLDivElement>(null);
  const origamiSectionRef = useRef<HTMLDivElement>(null);
  const origamiContentRef = useRef<HTMLDivElement>(null);
  const origamiTopBarRef = useRef<HTMLDivElement>(null);
  const origamiBottomBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroSection = heroSectionRef.current;
    const heroVideo = heroVideoRef.current;
    const heroProfile = heroProfileRef.current;

    if (!heroSection || !heroVideo || !heroProfile) return;

    const context = gsap.context(() => {
      gsap.set(heroVideo, { scale: 1.18, filter: "brightness(0.5)" });
      gsap.set(heroProfile, {
        scale: 1,
        y: 0,
        transformOrigin: "center center",
        filter: "brightness(0.84)",
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      timeline
        .to(
          heroVideo,
          {
            scale: 1,
            filter: "brightness(1.22)",
            ease: "none",
          },
          0,
        )
        .to(
          heroProfile,
          {
            scale: 0.76,
            y: -22,
            filter: "brightness(1.24)",
            ease: "none",
          },
          0,
        );
    }, heroSection);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const thesisSection = thesisSectionRef.current;
    const thesisContent = thesisContentRef.current;
    const thesisTopFold = thesisTopFoldRef.current;
    const thesisBottomFold = thesisBottomFoldRef.current;

    if (
      !thesisSection ||
      !thesisContent ||
      !thesisTopFold ||
      !thesisBottomFold
    ) {
      return;
    }

    const context = gsap.context(() => {
      gsap.set(thesisSection, { perspective: 1200 });
      gsap.set([thesisTopFold, thesisBottomFold], {
        scaleY: 1,
        opacity: 1,
        visibility: "visible",
      });
      gsap.set(thesisTopFold, { transformOrigin: "top center", rotateX: 0 });
      gsap.set(thesisBottomFold, {
        transformOrigin: "bottom center",
        rotateX: 0,
      });
      gsap.set(thesisContent, { opacity: 0.4, scale: 0.96 });

      const openThesis = () => {
        gsap.to(thesisTopFold, {
          scaleY: 0,
          rotateX: -86,
          opacity: 0.35,
          duration: 0.95,
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.to(thesisBottomFold, {
          scaleY: 0,
          rotateX: 86,
          opacity: 0.35,
          duration: 0.95,
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.to(thesisContent, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const closeThesis = () => {
        gsap.to(thesisTopFold, {
          scaleY: 1,
          rotateX: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power2.inOut",
          overwrite: "auto",
        });
        gsap.to(thesisBottomFold, {
          scaleY: 1,
          rotateX: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power2.inOut",
          overwrite: "auto",
        });
        gsap.to(thesisContent, {
          opacity: 0.4,
          scale: 0.96,
          duration: 0.55,
          ease: "power2.inOut",
          overwrite: "auto",
        });
      };

      const scrollTrigger = ScrollTrigger.create({
        trigger: thesisSection,
        start: "top 78%",
        end: "bottom 22%",
        onEnter: openThesis,
        onLeave: closeThesis,
        onEnterBack: openThesis,
        onLeaveBack: closeThesis,
      });

      return () => {
        scrollTrigger.kill();
        gsap.killTweensOf([thesisTopFold, thesisBottomFold, thesisContent]);
      };
    }, thesisSection);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const origamiSection = origamiSectionRef.current;
    const origamiContent = origamiContentRef.current;
    const origamiTopBar = origamiTopBarRef.current;
    const origamiBottomBar = origamiBottomBarRef.current;

    if (
      !origamiSection ||
      !origamiContent ||
      !origamiTopBar ||
      !origamiBottomBar
    ) {
      return;
    }

    const context = gsap.context(() => {
      gsap.set(origamiSection, { perspective: 1200 });
      gsap.set([origamiTopBar, origamiBottomBar], {
        scaleY: 1,
        opacity: 1,
        visibility: "visible",
      });
      gsap.set(origamiTopBar, { transformOrigin: "top center", rotateX: 0 });
      gsap.set(origamiBottomBar, {
        transformOrigin: "bottom center",
        rotateX: 0,
      });
      gsap.set(origamiContent, { opacity: 0.3, scale: 0.97 });

      const openOrigami = () => {
        gsap.to(origamiTopBar, {
          scaleY: 0,
          rotateX: -88,
          opacity: 0.25,
          duration: 0.95,
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.to(origamiBottomBar, {
          scaleY: 0,
          rotateX: 88,
          opacity: 0.25,
          duration: 0.95,
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.to(origamiContent, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const closeOrigami = () => {
        gsap.to(origamiTopBar, {
          scaleY: 1,
          rotateX: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power2.inOut",
          overwrite: "auto",
        });
        gsap.to(origamiBottomBar, {
          scaleY: 1,
          rotateX: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power2.inOut",
          overwrite: "auto",
        });
        gsap.to(origamiContent, {
          opacity: 0.3,
          scale: 0.97,
          duration: 0.55,
          ease: "power2.inOut",
          overwrite: "auto",
        });
      };

      const scrollTrigger = ScrollTrigger.create({
        trigger: origamiSection,
        start: "top 78%",
        end: "bottom 22%",
        onEnter: openOrigami,
        onLeave: closeOrigami,
        onEnterBack: openOrigami,
        onLeaveBack: closeOrigami,
      });

      return () => {
        scrollTrigger.kill();
        gsap.killTweensOf([origamiTopBar, origamiBottomBar, origamiContent]);
      };
    }, origamiSection);

    return () => context.revert();
  }, []);

  return (
    <main className="w-full py-12">
      <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />

      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <Link
          href="/team"
          className="text-muted-foreground mb-6 block text-sm hover:underline"
        >
          ← Back to team
        </Link>
      </div>

      <section
        ref={heroSectionRef}
        className="bg-primary-950 relative w-full overflow-hidden shadow-lg"
      >
        <video
          ref={heroVideoRef}
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
          <div
            ref={heroProfileRef}
            className="mx-auto w-full max-w-[320px] -translate-x-8"
          >
            <VictorProfileCard />
          </div>

          <div className="flex h-full items-center">
            <BorderGlow
              className="victor-about-glow max-w-2xl translate-x-8"
              edgeSensitivity={42}
              glowColor="198 88 74"
              backgroundColor="rgba(2, 10, 23, 0.5)"
              borderRadius={12}
              glowRadius={34}
              glowIntensity={1.35}
              coneSpread={22}
              animated
              fillOpacity={0.3}
              colors={["#63bbf1", "#5b4eea", "#89f0ff"]}
            >
              <div className="rounded-xl p-6 md:p-8">
                <div className="space-y-4 text-lg leading-relaxed font-bold text-white drop-shadow md:text-2xl">
                  <h1 className="text-primary-400 text-3xl font-black italic">
                    About Me:
                  </h1>
                  <p>4th Year Robotics and Mechatronics Engineering Student</p>
                  <ul className="list-disc space-y-2 pl-6 text-lg font-bold text-white">
                    <li>RoboCup Rescue Team Lead & Thesis Project</li>
                    <li>UNSW Taste of Research Scholarship with P2AgentX</li>
                    <li>Mechatronics Intern at Polymaya</li>
                    <li>Student Mentor/EEA at Engineers Australia</li>
                  </ul>
                </div>
              </div>
            </BorderGlow>
          </div>
        </div>
      </section>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <VictorShapeGrid direction="left" />
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

              <div className="border-primary-500 relative border-l-4 py-2 pl-5 md:pl-7">
                <h2 className="text-primary-950 mb-4 text-3xl leading-tight font-bold tracking-tight md:text-4xl">
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
              <div className="bg-primary-400 absolute top-2 left-0 hidden h-18 w-1 md:block" />
              <div className="bg-primary-400 absolute right-0 bottom-4 hidden h-18 w-1 md:block" />

              {[
                {
                  title: "Teleop-Control",
                  src: "/team/victor/Web_controller.jpg",
                  alt: "Web controller interface",
                  description:
                    "This interface lets me remotely command the robot and test how different locomotion behaviors respond during rescue-style missions.",
                  className: "md:col-start-1 md:row-start-1 md:px-6",
                },
                {
                  title: "SLAM",
                  src: "/team/victor/GLIM_SLAM.jpg",
                  alt: "SLAM map",
                  description:
                    "I use SLAM to build and refine spatial maps so the robot can localise itself and navigate through complex, changing environments.",
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
                    replay
                    exitDistance={170}
                    exitScale={0.7}
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

      <section
        ref={thesisSectionRef}
        className="relative w-full overflow-hidden bg-[#040b18] py-10 text-white"
      >
        <div
          ref={thesisTopFoldRef}
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-1/2 bg-[#040b18] shadow-[0_14px_28px_rgba(0,0,0,0.35)]"
        />
        <div
          ref={thesisBottomFoldRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1/2 bg-[#040b18] shadow-[0_-14px_28px_rgba(0,0,0,0.35)]"
        />

        <div
          ref={thesisContentRef}
          className="relative z-10 mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_260px] md:items-start md:gap-10 md:px-8"
        >
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

      <section className="relative w-full overflow-hidden bg-white py-12 md:py-16">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <VictorShapeGrid direction="diagonal" />
        </div>
        {/* Left diagonal blue panel */}
        <div
          className="absolute inset-y-0 left-0 z-10 w-full bg-[#1353af]"
          style={{ clipPath: "polygon(0 0, 65% 0, 0 92%)" }}
        >
          <video
            src="/team/victor/P2DingoVideo.mp4"
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="bg-primary-700/45 absolute inset-0 mix-blend-multiply" />
          <div className="bg-primary-950/50 absolute inset-0" />
        </div>

        <div className="relative z-20 mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            {/* Left visual/logo area */}
            <div className="relative min-h-[220px] md:min-h-[280px] lg:min-h-[420px]">
              <div className="pointer-events-none absolute top-[34%] left-[28%] h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 opacity-95 md:h-[320px] md:w-[320px]">
                <MagicRingsP2AgentX
                  color="#5b4eea"
                  colorTwo="#63bbf1"
                  ringCount={3}
                  speed={0.6}
                  attenuation={10}
                  lineThickness={2}
                  baseRadius={0.2}
                  radiusStep={0.1}
                  scaleRate={0.14}
                  opacity={1}
                  blur={0}
                  noiseAmount={0.1}
                  rotation={0}
                  ringGap={1.5}
                  fadeIn={0.7}
                  fadeOut={0.5}
                  followMouse={false}
                  mouseInfluence={0.2}
                  hoverScale={1.2}
                  parallax={0.05}
                  clickBurst
                />
              </div>
              <div className="absolute top-[42%] left-[28%]">
                <P2AgentXLogoButton />
              </div>
            </div>

            {/* Right content */}
            <div className="space-y-8 lg:pt-0">
              <div className="border-primary-400 ml-auto max-w-2xl border-r-4 py-2 pr-5 text-center lg:text-right">
                <p className="text-primary-400 text-2xl font-extrabold tracking-tight md:text-2xl">
                  P2AGENTX
                </p>

                <h2 className="text-primary-950 mt-4 text-2xl leading-tight font-bold md:text-4xl">
                  UNSW Taste of Research
                  <br />
                  Scholarship
                </h2>

                <p className="mt-4 text-base leading-relaxed text-neutral-500 md:text-xl">
                  Development of SLAM-Based Autonomous
                  <br />
                  Inspection System for Solar Power Plants
                </p>
              </div>

              {/* Cards row */}
              <div className="grid gap-8 md:grid-cols-[320px_400px] md:items-start md:justify-center">
                {/* P2Sim card - matches regular site card size */}
                <AnimatedContent
                  distance={170}
                  direction="horizontal"
                  duration={1.4}
                  ease="power3.out"
                  initialOpacity={0.2}
                  animateOpacity
                  scale={0.7}
                  threshold={0.15}
                  delay={0.15}
                  replay
                  exitDistance={170}
                  exitScale={0.7}
                >
                  <article className="space-y-3">
                    <h3 className="text-primary-600 text-center text-xl font-bold tracking-tight italic md:text-3xl">
                      Working in Isaac Sim
                    </h3>

                    <div className="mx-auto w-full max-w-[320px]">
                      <FlipCard
                        title="Working in Isaac Sim"
                        src="/team/victor/P2Sim.jpg"
                        alt="Isaac Sim working environment"
                        description="Isaac Sim is used to simulate the environment and test algorithims before deploying to the real robot."
                      />
                    </div>
                  </article>
                </AnimatedContent>

                <AnimatedContent
                  distance={190}
                  direction="horizontal"
                  duration={1.4}
                  ease="power3.out"
                  initialOpacity={0.2}
                  animateOpacity
                  scale={0.7}
                  threshold={0.15}
                  delay={0.22}
                  replay
                  exitDistance={190}
                  exitScale={0.7}
                >
                  <UserInteractiveAppCarousel />
                </AnimatedContent>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mt-6 w-full overflow-hidden bg-white pb-12 md:-mt-8 md:pb-16">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <VictorShapeGrid direction="up" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1280px] px-2 md:px-3">
          <div className="grid gap-8 lg:min-h-[430px] lg:grid-cols-[1fr_0.92fr_1fr] lg:items-stretch">
            <AnimatedContent
              direction="vertical"
              reverse
              distance={140}
              duration={1.2}
              ease="power3.out"
              initialOpacity={0.15}
              animateOpacity
              scale={0.92}
              threshold={0.2}
              replay
              exitDistance={140}
              exitScale={0.92}
            >
              <article
                className="relative isolate overflow-hidden px-7 py-10 text-white shadow-xl md:px-10 lg:px-8 lg:py-12"
                style={{
                  clipPath:
                    "polygon(0 5%, 3% 1%, 8% 0, 12% 6%, 19% 2%, 24% 8%, 31% 1%, 37% 5%, 44% 0, 53% 7%, 60% 2%, 68% 6%, 76% 1%, 83% 4%, 91% 0, 97% 3%, 100% 1%, 100% 97%, 95% 100%, 89% 96%, 84% 92%, 76% 98%, 70% 94%, 63% 99%, 56% 91%, 47% 97%, 40% 90%, 31% 95%, 24% 88%, 17% 94%, 9% 89%, 4% 92%, 0 87%)",
                }}
              >
                <div className="absolute inset-0">
                  <Image
                    src="/team/victor/SurfaceMineBackground.png"
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[#081632]/82" />
                </div>

                <div className="relative z-10 flex h-full flex-col items-start">
                  <LogoButton
                    href="https://surfacemine.com/"
                    src="/team/victor/SurfaceMineLogo.jpg"
                    alt="SurfaceMine logo"
                    ariaLabel="Open SurfaceMine website"
                    containerClassName="mx-auto"
                    linkClassName="flex size-32 items-center justify-center overflow-hidden rounded-full bg-white/80 shadow-lg transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-2 md:size-36"
                  />

                  <div className="mt-8 w-full text-center lg:text-left">
                    <p className="text-xl font-black tracking-tight text-lime-400 md:text-2xl">
                      SURFACE MINE
                    </p>
                    <h2 className="mt-3 text-lg font-bold tracking-tight text-sky-400 md:text-xl">
                      Sustainability in Ewaste
                    </h2>
                  </div>

                  <div className="mt-7 flex items-start gap-5">
                    <span className="mt-1 h-16 w-1 shrink-0 bg-lime-400/80" />
                    <p className="max-w-xs text-sm leading-relaxed text-white/75 md:text-base">
                      Turning E-Waste plastic into recycled filament and 3D
                      printed products
                    </p>
                  </div>
                </div>
              </article>
            </AnimatedContent>

            <article className="relative isolate flex flex-col items-center justify-center overflow-hidden px-2 py-6 text-center md:px-6 lg:py-12">
              <span className="h-2 w-32 bg-sky-300 md:w-36" />
              <p className="relative z-10 mt-6 text-3xl font-black tracking-tight text-sky-500">
                POLYMAYA
              </p>
              <h2 className="relative z-10 mt-6 text-2xl leading-tight font-bold tracking-tight text-[#111111] md:text-[2.2rem]">
                Undergraduate Mechatronics
                <br />
                Engineering Intern
              </h2>

              <div className="relative z-10 mt-10 flex size-32 items-center justify-center overflow-hidden rounded-full bg-white shadow-lg md:size-36">
                <Image
                  src="/team/victor/polymaya_logo.png"
                  alt="Polymaya logo"
                  width={144}
                  height={144}
                  className="h-full w-full object-contain p-3"
                />
              </div>
            </article>

            <AnimatedContent
              direction="vertical"
              distance={140}
              duration={1.2}
              ease="power3.out"
              initialOpacity={0.15}
              animateOpacity
              scale={0.92}
              threshold={0.2}
              replay
              exitDistance={140}
              exitScale={0.92}
            >
              <article
                className="relative isolate overflow-hidden px-7 py-10 text-white shadow-xl md:px-10 lg:px-8 lg:py-12"
                style={{
                  clipPath:
                    "polygon(0 2%, 5% 6%, 11% 1%, 18% 5%, 26% 0, 33% 7%, 39% 3%, 47% 8%, 55% 2%, 63% 6%, 71% 1%, 80% 4%, 88% 0, 95% 5%, 100% 4%, 100% 95%, 96% 92%, 90% 97%, 83% 94%, 77% 100%, 69% 95%, 61% 98%, 53% 93%, 46% 99%, 37% 94%, 29% 97%, 21% 91%, 14% 95%, 7% 90%, 0 93%)",
                }}
              >
                <div className="absolute inset-0">
                  <Image
                    src="/team/victor/Refit8Background.png"
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[#081632]/84" />
                </div>

                <div className="relative z-10 flex h-full flex-col items-start">
                  <div className="w-full text-center lg:text-right">
                    <p className="text-xl font-black tracking-tight text-orange-400 md:text-2xl">
                      REFIT8
                    </p>
                    <h2 className="mt-3 text-lg font-bold tracking-tight text-sky-400 md:text-xl">
                      Sustainability in Construction
                    </h2>
                  </div>

                  <div className="mt-7 flex items-start gap-5 lg:flex-row-reverse">
                    <span className="mt-1 h-24 w-1 shrink-0 bg-orange-400/80" />
                    <p className="max-w-xs text-sm leading-relaxed text-white/75 md:text-base lg:text-right">
                      Capturing data on asset lifecycles to reduce waste and
                      plan for reuse and recycling in fit-outs and de-fits
                    </p>
                  </div>

                  <div className="mt-8 flex w-full flex-1 items-center justify-center">
                    <LogoButton
                      href="https://www.refit8.io/"
                      src="/team/victor/refit8Logo.png"
                      alt="Refit8 logo"
                      ariaLabel="Open Refit8 website"
                      imageClassName="h-full w-full object-contain p-3"
                      linkClassName="flex size-32 items-center justify-center overflow-hidden rounded-full bg-white shadow-lg transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 md:size-36"
                    />
                  </div>
                </div>
              </article>
            </AnimatedContent>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-8 md:px-8 md:py-12">
        <div
          ref={origamiSectionRef}
          className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[32px] bg-white px-0 py-0 text-white shadow-[0_28px_70px_rgba(9,20,59,0.18)]"
        >
          <div className="absolute inset-x-0 top-0 z-[15] h-[25px] bg-[#040b18]" />
          <div className="absolute inset-x-0 bottom-0 z-[15] h-[25px] bg-[#040b18]" />
          <div
            ref={origamiTopBarRef}
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-1/2 bg-[#040b18] shadow-[0_14px_28px_rgba(0,0,0,0.35)]"
          />
          <div
            ref={origamiBottomBarRef}
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1/2 bg-[#040b18] shadow-[0_-14px_28px_rgba(0,0,0,0.35)]"
          />

          <div
            ref={origamiContentRef}
            className="relative z-10 flex min-h-[560px] flex-col justify-between gap-2 bg-white px-5 pt-[56px] pb-[44px] md:min-h-[600px] md:px-8 md:pt-[62px] md:pb-[48px]"
          >
            <div className="pointer-events-none absolute inset-x-0 top-[25px] bottom-[25px] opacity-55">
              <VictorShapeGrid
                direction="down"
                speed={0.2}
                squareSize={54}
                borderColor="#d8e8ff"
                hoverFillColor="#eef6ff"
                className="h-full w-full"
              />
            </div>

            <div className="grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
              <div className="flex items-start justify-center md:justify-end">
                <div className="relative z-10 w-full max-w-[240px] text-center md:text-left">
                  <span className="mx-auto mb-5 block h-2 w-36 bg-sky-300/95 md:mr-auto md:ml-0" />
                  <p className="text-3xl font-black tracking-tight text-sky-300 md:text-[2.2rem]">
                    V.ARTPOSTS.L
                  </p>
                  <a
                    href="https://www.instagram.com/v.artposts.l/?hl="
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-white/85 px-4 py-2 text-sm font-bold text-sky-500 shadow-sm transition hover:scale-[1.02] hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2"
                    aria-label="Check out V.ARTPOSTS.L on Instagram"
                  >
                    <Instagram className="size-4" />
                    <span>Check it out</span>
                  </a>
                </div>
              </div>

              <div className="relative z-10 mx-auto flex size-36 items-center justify-center overflow-hidden rounded-full bg-[#c7c7c7] shadow-xl md:size-40">
                <Image
                  src="/team/victor/Alexandria_origami.png"
                  alt="Alexandria origami logo"
                  width={180}
                  height={180}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex items-end justify-center md:justify-start">
                <div className="relative z-10 w-full max-w-[260px] text-center md:text-left">
                  <p className="text-3xl font-black tracking-tight text-black md:text-[2.2rem]">
                    Origami and more!
                  </p>
                  <span className="mx-auto mt-5 block h-2 w-36 bg-sky-300/95 md:ml-0" />
                </div>
              </div>
            </div>

            <div className="relative z-10 mx-auto flex w-full max-w-[760px] justify-center overflow-hidden rounded-[28px] bg-[#040b18] px-4 py-[18px] shadow-[0_18px_40px_rgba(13,41,110,0.28)] md:px-6 md:py-[26px]">
              <Image
                src="/team/victor/origami_background.png"
                alt=""
                fill
                sizes="(min-width: 768px) 760px, 100vw"
                className="object-cover opacity-50 brightness-110"
              />
              <div className="absolute inset-0 z-[3] opacity-100 mix-blend-plus-lighter">
                <SoftAurora
                  speed={0.6}
                  scale={1.5}
                  brightness={1.4}
                  color1="#06B6D4"
                  color2="#0a4ee5"
                  noiseFrequency={2.5}
                  noiseAmplitude={2}
                  bandHeight={0.5}
                  bandSpread={1}
                  octaveDecay={0.1}
                  layerOffset={0.2}
                  colorSpeed={1.3}
                  enableMouseInteraction={true}
                  mouseInfluence={0.35}
                />
              </div>
              <div className="absolute inset-0 z-[2] bg-[#040b18]/8" />
              <div className="relative z-10 flex w-full justify-center overflow-hidden">
                <BounceCards
                  className="max-w-full"
                  images={[
                    "/team/victor/Alexandria_origami.png",
                    "/team/victor/firery_dragon_2_origami.png",
                    "/team/victor/phoenix_origami.png",
                    "/team/victor/origami_shinlong.png",
                    "/team/victor/guitar_origami.png",
                  ]}
                  containerWidth={500}
                  containerHeight={250}
                  animationDelay={1}
                  animationStagger={0.08}
                  easeType="elastic.out(1, 0.5)"
                  transformStyles={[
                    "rotate(5deg) translate(-150px)",
                    "rotate(0deg) translate(-70px)",
                    "rotate(-5deg)",
                    "rotate(5deg) translate(70px)",
                    "rotate(-5deg) translate(150px)",
                  ]}
                  enableHover
                />
              </div>
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
