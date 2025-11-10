import Image from "next/image";

import { InfiniteMovingCards } from "@/components/infinite-moving-cards";
import { Container } from "@/components/ui/container";

export default function SponsoredSection() {
  return (
    <Container className="py-16">
      <h2 className="mb-16 text-center">Sponsored By</h2>
      <InfiniteMovingCards
        direction="left"
        pauseOnHover={false}
        items={[
          <Image
            key={"unsw arc logo"}
            src="/home/unsw-arc-logo.png"
            alt="unsw arc logo"
            width={100}
            height={100}
          />,
          <Image
            key={"unsw engineering logo"}
            src="/home/unsw-engineering-logo.png"
            alt="unsw engineering logo"
            width={100}
            height={100}
          />,
          <Image
            key={"unsw founders logo"}
            src="/home/unsw-founders-logo.png"
            alt="unsw founders logo"
            width={100}
            height={100}
          />,
          <Image
            key={"engineers australia logo"}
            src="/home/engineers-australia-logo.png"
            alt="engineers australia logo"
            width={100}
            height={100}
          />,
          <div
            key={"pure matcha logo"}
            className="flex size-full items-center justify-center"
          >
            <Image
              src="/home/purematcha-logo.avif"
              alt="pure matcha logo"
              width={100}
              height={100}
            />
          </div>,
        ]}
      />
    </Container>
  );
}
