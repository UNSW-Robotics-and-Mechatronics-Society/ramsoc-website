import Image from "next/image";
import Link from "next/link";

import { Hero } from "@/components/hero";
import { Button } from "@/components/ui/button";
import { JOIN_US_URL } from "@/lib/constants";

export default function HomeHero() {
  return (
    <Hero
      imageSrc="/home/hero.webp"
      imageAlt="Collage of events held by RAMSoc"
      wrapInHeading={false}
    >
      <div className="flex flex-col items-center justify-center gap-8 px-4 text-white">
        <div className="flex flex-col items-center justify-center gap-y-4 md:flex-row md:gap-4">
          <Image
            className="w-[250px] sm:w-[300px] md:order-2 xl:w-[400px]"
            src="/logo.svg"
            alt="Ramsoc logo"
            width={400}
            height={247}
          />
          <span className="block text-5xl md:contents xl:text-8xl">
            <span className="md:order-1">RAM</span>
            <span className="font-light md:order-3">SOC</span>
          </span>
        </div>
        <div className="h-1 w-full max-w-[1200px] bg-white" />
        <h2 className="text-center text-xl sm:text-2xl xl:text-3xl">
          UNSW ROBOTICS AND MECHATRONICS SOCIETY
        </h2>
        <Button asChild>
          <Link href={JOIN_US_URL} target="_blank">
            Join Us On SpArc
          </Link>
        </Button>
      </div>
    </Hero>
  );
}
