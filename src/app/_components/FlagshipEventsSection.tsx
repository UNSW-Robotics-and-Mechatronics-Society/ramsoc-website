"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { Button } from "@/components/ui/Button";
import ParallaxText from "@/components/ui/ParallaxText";

interface ScrollBannerProps {
  velocity: number;
  text: string;
}

const ScrollBanner = ({ velocity, text }: ScrollBannerProps) => {
  return (
    <div className="w-full border-y-4 border-primary-950 bg-primary-800 text-3xl font-bold italic tracking-tight text-primary-100">
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
      className="overflow-hidden bg-primary-500"
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      initial="initial"
      animate={isExpanded ? "expanded" : "initial"}
      whileHover={isExpanded || isMobile ? {} : "hover"}
      variants={cardVariants}
      onClick={handleClick}
      onHoverEnd={() => setIsExpanded(false)}
    >
      <div
        className={`flex size-full flex-col-reverse overflow-hidden lg:flex-row ${isExpanded ? "backdrop-brightness-50" : "backdrop-blur-sm backdrop-brightness-[.3]"}`}
      >
        <div
          className={`flex flex-col ${isExpanded ? "h-1/2 w-full place-content-between bg-primary-950/60 md:h-1/3 lg:h-full lg:w-1/3" : "size-full place-content-center"} overflow-hidden px-4 py-8`}
        >
          <h1
            className={`${isExpanded ? "self-start text-3xl" : "self-center text-5xl md:text-6xl"} overflow-hidden whitespace-nowrap italic text-primary-50`}
          >
            {name.toUpperCase()}
          </h1>
          {isExpanded && (
            <>
              <p className="text-primary-50">{description}</p>
              <Button
                asChild
                variant={"outline_prime_BW"}
                size={"none"}
                className="text-md w-fit px-3 py-2"
              >
                <a href={url} target="_blank" rel="noopener noreferrer">
                  CHECK IT OUT
                </a>
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const FlagshipEventsSection = () => {
  return (
    <div className="my-10">
      <ScrollBanner velocity={3} text={"Flagship Events"} />
      {/* TODO: Change URL and description later */}
      <div className="flex h-screen flex-col gap-1 lg:h-[50vh] lg:flex-row">
        <FlagshipEventCard
          name={"Sumobots"}
          imageSrc="/home/sumobots-finals.jpg"
          url={"http://localhost:3001/2024/sumobots"}
          description="Sumobots is a competition where robots are designed to push each other out of a ring. The robots are autonomous and must be able to detect the edge of the ring and the opponent."
        />
        {/* TODO: Change URL and description later */}
        <FlagshipEventCard
          name={"Buildathon"}
          imageSrc="/home/buildathon-finals.jpg"
          url={"http://localhost:3001/2024/sumobots"}
          description="Buildathon is a competition where teams are given a problem statement and are required to build a solution within a limited time frame. The teams are judged based on the creativity, feasibility, and scalability of their solution."
        />
      </div>
      <ScrollBanner velocity={-3} text={"Flagship Events"} />
    </div>
  );
};

export default FlagshipEventsSection;
