import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

export default function MeetTheTeamSection() {
  return (
    <div className="relative mx-auto mb-16 flex h-64 w-full flex-col items-center justify-center gap-8">
      <div className="absolute left-0 top-0 -z-10 h-full w-full">
        <Image
          className="h-full w-full object-cover"
          src="/home/team.jpg"
          width={1920}
          height={700}
          priority
          alt="Collage of events held by RAMSoc"
        ></Image>
        <div className="absolute left-0 top-0 h-full w-full bg-primary-950 bg-opacity-75"></div>
      </div>
      <h2 className="text-center text-5xl text-primary-50">
        Meet Our 2025 Team!
      </h2>
      <Button asChild>
        <Link href="/team">Learn More</Link>
      </Button>
    </div>
  );
}
