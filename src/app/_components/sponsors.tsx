"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { InfiniteMovingCards } from "@/components/infinite-moving-cards";
import { Container } from "@/components/ui/container";

export default function SponsoredSection() {
  return (
    <section className="border-primary-200/50 bg-primary-50/50 border-y py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3">Proudly Sponsored By</h2>
          <p className="text-primary-700 mx-auto max-w-2xl">
            Supported by leading organizations that believe in fostering the
            next generation of engineers
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
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
        </motion.div>
      </Container>
    </section>
  );
}
