"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

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
}

const FlagshipEventCard = ({ name, imageSrc, url }: EventCardProps) => {
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
      ? { width: "100%", height: "75%" }
      : { width: "75%", height: "100%" },
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
      {/* TODO: Change Background image to GIF (Showcase the flagship event) */}
      <div
        className={`flex ${isExpanded ? "backdrop-brightness-50" : "justify-center backdrop-blur-sm backdrop-brightness-[.3]"} size-full overflow-hidden p-2`}
      >
        <h1
          className={`${isExpanded ? "self-end text-3xl" : "self-center text-5xl md:text-6xl"} overflow-hidden whitespace-nowrap italic text-primary-50`}
        >
          {name.toUpperCase()}
        </h1>
        {isExpanded && (
          <button
            className="absolute bottom-4 right-4 rounded bg-primary-700 px-4 py-2 text-primary-50"
            onClick={() => window.open(url, "_blank")}
          >
            {/* TODO: use global ui button */}
            Learn More
          </button>
        )}
      </div>
    </motion.div>
  );
};

const FlagshipEventsSection = () => {
  return (
    <div className="my-10">
      <ScrollBanner velocity={3} text={"Flagship Events"} />
      {/* TODO: Change URL later */}
      <div className="flex h-screen flex-col gap-1 lg:h-[50vh] lg:flex-row">
        <FlagshipEventCard
          name={"Sumobots"}
          imageSrc="/home/sumobots-finals.jpg"
          url={"http://localhost:3001/2024/sumobots"}
        />
        {/* TODO: Change URL later */}
        <FlagshipEventCard
          name={"Buildathon"}
          imageSrc="/home/buildathon-finals.jpg"
          url={"http://localhost:3001/2024/sumobots"}
        />
      </div>
      <ScrollBanner velocity={-3} text={"Flagship Events"} />
    </div>
  );
};

export default FlagshipEventsSection;
