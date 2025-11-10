import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function MeetTheTeam() {
  return (
    <Container
      className="relative flex h-64 flex-col items-center justify-center gap-8"
      width="full"
    >
      <div className="absolute top-0 left-0 size-full">
        <Image
          className="size-full object-cover"
          src="/home/team.webp"
          width={1920}
          height={700}
          priority
          alt="Our team members"
        />
        <div className="bg-primary-950/75 absolute top-0 left-0 size-full"></div>
      </div>
      <h2 className="text-primary-50 z-10 text-center">Meet Our 2025 Team!</h2>
      <Button asChild>
        <Link className="z-10" href="/team">
          Learn More
        </Link>
      </Button>
    </Container>
  );
}
