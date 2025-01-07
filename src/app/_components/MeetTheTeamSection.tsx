import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function MeetTheTeamSection() {
  return (
    <Container
      className="relative flex h-64 flex-col items-center justify-center gap-8"
      width="full"
    >
      <div className="absolute left-0 top-0 size-full">
        <Image
          className="size-full object-cover"
          src="/home/team.jpg"
          width={1920}
          height={700}
          priority
          alt="Collage of events held by RAMSoc"
        ></Image>
        <div className="absolute left-0 top-0 size-full bg-primary-950/75"></div>
      </div>
      <h2 className="z-10 text-center text-primary-50">Meet Our 2025 Team!</h2>
      <Button asChild>
        <Link className="z-10" href="/team">
          Learn More
        </Link>
      </Button>
    </Container>
  );
}
