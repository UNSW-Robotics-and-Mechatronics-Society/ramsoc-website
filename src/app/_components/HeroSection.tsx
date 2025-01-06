import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="relative mb-16 flex h-[800] w-full items-center justify-center">
      <div className="absolute left-0 top-0 -z-10 h-full w-full">
        <Image
          className="h-full w-full object-cover"
          src="/home/hero.jpg"
          width={1920}
          height={700}
          alt="Collage of events held by RAMSoc"
        ></Image>
        <div className="absolute left-0 top-0 h-full w-full bg-primary-950 bg-opacity-75"></div>
      </div>
      <div className="flex flex-col items-center justify-center gap-8 px-4 text-white">
        <div className="flex flex-col items-center justify-center gap-y-4 md:flex-row md:gap-4">
          <Image
            className="w-[300px] md:order-2 xl:w-[400]"
            src="/logo.svg"
            alt="Ramsoc logo"
            width={400}
            height={247}
          ></Image>
          <h1 className="block text-6xl md:contents xl:text-8xl">
            <span className="font-bold md:order-1">RAM</span>
            <span className="font-light md:order-3">SOC</span>
          </h1>
        </div>
        <div className="h-1 w-full max-w-[1200px] bg-white"></div>
        <h2 className="text-center text-2xl xl:text-3xl">
          UNSW ROBOTICS AND MECHATRONICS SOCIETY
        </h2>
        <Button asChild>
          <Link
            href="https://member.arc.unsw.edu.au/s/clubdetail?clubid=0016F0000371VybQAE"
            target="_blank"
          >
            Join Us On SpArc
          </Link>
        </Button>
      </div>
    </div>
  );
}
