import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards";

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
          ></Image>,
          <Image
            key={"unsw engineering logo"}
            src="/home/unsw-engineering-logo.png"
            alt="unsw engineering logo"
            width={100}
            height={100}
          ></Image>,
          <Image
            key={"unsw founders logo"}
            src="/home/unsw-founders-logo.png"
            alt="unsw founders logo"
            width={100}
            height={100}
          ></Image>,
          <Image
            key={"engineers australia logo"}
            src="/home/engineers-australia-logo.png"
            alt="engineers australia logo"
            width={100}
            height={100}
          ></Image>,
        ]}
      ></InfiniteMovingCards>
    </Container>
  );
}
