"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { InfiniteMovingCards } from "@/components/infinite-moving-cards";
import { Container } from "@/components/ui/container";

export default function SponsoredSection() {
  const sponsors = [
    {
      name: "UNSW Arc",
      logo: "/home/unsw-arc-logo.png",
      url: "https://www.arc.unsw.edu.au/",
    },
    {
      name: "UNSW Engineering",
      logo: "/home/unsw-engineering-logo.png",
      url: "https://www.engineering.unsw.edu.au/",
    },
    {
      name: "UNSW Founders",
      logo: "/home/unsw-founders-logo.png",
      url: "https://www.founders.unsw.edu.au/",
    },
    {
      name: "Engineers Australia",
      logo: "/home/engineers-australia-logo.png",
      url: "https://www.engineersaustralia.org.au/",
    },
    {
      name: "Jinro",
      logo: "/home/Jinro_logo_-_no_background.png",
      url: "https://jinro.com.au/",
    },
    {
      name: "Pure Matcha",
      logo: "/home/purematcha-logo.avif",
      url: "https://purematcha.com.au/",
    },
  ];

  return (
    <section
      className="border-primary-200/50 bg-primary-50/50 border-y py-20"
      id="sponsors"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3">Our Sponsors & Partners</h2>
          <p className="text-primary-700 mx-auto max-w-2xl">
            Supported by leading organizations that believe in fostering the
            next generation of mechatronics engineers
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
            pauseOnHover={true}
            items={sponsors.map((sponsor) => (
              <Link
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex size-full items-center justify-center transition-transform duration-300 hover:scale-110"
              >
                <Image
                  src={sponsor.logo}
                  alt={`${sponsor.name} logo`}
                  width={120}
                  height={120}
                  className="object-contain transition-opacity duration-300 group-hover:opacity-80"
                />
              </Link>
            ))}
          />
        </motion.div>
      </Container>
    </section>
  );
}
