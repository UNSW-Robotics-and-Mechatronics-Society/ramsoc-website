"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { Button } from "@/components/ui/button";
import ParallaxText from "@/components/ui/parallax-text";
import { BUILDATHON_URL, SUMOBOTS_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { LuMousePointerClick } from "react-icons/lu";

interface ScrollBannerProps {
  velocity: number;
  text: string;
}

const ScrollBanner = ({ velocity, text }: ScrollBannerProps) => {
  return (
    <div className="border-primary-950 bg-primary-900 text-primary-50 w-full border-y-2 py-3 text-3xl font-bold tracking-tight italic">
      <ParallaxText baseVelocity={velocity}>{text.toUpperCase()}</ParallaxText>
    </div>
  );
};

interface EventCardProps {
  name: string;
  imageSrc: string;
  url: string;
  description: string;
}

const FlagshipEventCard = ({
  name,
  imageSrc,
  url,
  description,
}: EventCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const cardVariants = {
    initial: isMobile
      ? { width: "100%", height: "50%", cursor: "pointer" }
      : { width: "50%", height: "100%", cursor: "pointer" },
    expanded: isMobile
      ? { width: "100%", height: "200%", cursor: "default" }
      : { width: "200%", height: "100%", cursor: "default" },
    hover: isMobile
      ? { width: "100%", height: "75%", cursor: "pointer" }
      : { width: "75%", height: "100%", cursor: "pointer" },
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative overflow-hidden"
      initial="initial"
      animate={isExpanded ? "expanded" : "initial"}
      whileHover={isExpanded || isMobile ? {} : "hover"}
      variants={cardVariants}
      onClick={handleClick}
      onHoverEnd={() => setIsExpanded(false)}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <Image
        src={imageSrc}
        alt={name}
        fill
        sizes="(max-width: 1023px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        priority
        quality={85}
      />
      {/* Gradient overlay */}
      <div className="from-primary-950/80 via-primary-950/50 absolute inset-0 bg-linear-to-t to-transparent" />

      {/* Click indicator */}
      {!isExpanded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute top-6 right-6 z-20"
        >
          <div className="text-primary-100 border-primary-300/50 flex items-center gap-2 rounded-full border bg-black/50 px-4 py-2 backdrop-blur-sm">
            <LuMousePointerClick className="size-5 drop-shadow-lg" />
          </div>
        </motion.div>
      )}

      <div
        className={`relative z-10 flex size-full flex-col-reverse overflow-hidden lg:flex-row ${isExpanded ? "backdrop-brightness-75" : ""}`}
      >
        <div
          className={`flex flex-col ${isExpanded ? "bg-primary-950/80 h-1/2 w-full backdrop-blur-md md:h-1/3 lg:h-full lg:w-1/3" : "size-full place-content-center"} overflow-hidden px-6 transition-all duration-400`}
        >
          <h1
            className={cn(
              "text-primary-50 px-2 font-bold italic drop-shadow-lg",
              isExpanded
                ? "shrink-0 self-start py-6 text-3xl md:text-4xl"
                : "self-center text-5xl md:text-6xl lg:text-7xl",
            )}
          >
            {name.toUpperCase()}
          </h1>
          {isExpanded && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="scrollbar-thin scrollbar-track-primary-900/50 scrollbar-thumb-primary-500 hover:scrollbar-thumb-primary-400 min-h-0 flex-1 overflow-y-auto px-2"
              >
                <p className="text-primary-100 leading-relaxed">
                  {description}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="shrink-0 px-2 pt-4 pb-6"
              >
                <Button asChild variant={"outline_prime_BW"} size="sm">
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    CHECK IT OUT <FaArrowUpRightFromSquare />
                  </a>
                </Button>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const FlagshipEvents = () => {
  return (
    <section className="my-16">
      <ScrollBanner
        velocity={1}
        text={`Flagship Events\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0主力イベント`}
      />
      <div className="bg-primary-950 flex h-screen flex-col gap-0.5 lg:h-[60vh] lg:flex-row">
        <FlagshipEventCard
          name={"Sumobots"}
          imageSrc="/home/sumobots-finals.webp"
          url={SUMOBOTS_URL}
          description="Sumobots is a competition where robots are designed to push each other out of a ring. The robots are autonomous and must be able to detect the edge of the ring and the opponent."
        />
        <FlagshipEventCard
          name={"Buildathon"}
          imageSrc="/home/buildathon-finals.webp"
          url={BUILDATHON_URL}
          description="Buildathon is a competition where teams are given a problem statement and are required to build a solution within a limited time frame. The teams are judged based on the creativity, feasibility, and scalability of their solution."
        />
      </div>
      <ScrollBanner
        velocity={-1}
        text={"Flagship Events\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0主力イベント"}
      />
    </section>
  );
};

export default FlagshipEvents;
