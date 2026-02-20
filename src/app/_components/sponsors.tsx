"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { InfiniteMovingCards } from "@/components/infinite-moving-cards";

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
    {
      name: "Domino's",
      logo: "/home/dominos.svg",
      url: "https://www.dominos.com.au/",
    },
    {
      name: "KOKO amuesment",
      logo: "/home/koko.jpg",
      url: "https://kokoamusement.com.au/",
    },
  ];

  return (
    <section className="relative bg-white py-24" id="sponsors">
      {/* Top border */}
      <div className="absolute top-0 left-0 h-px w-full bg-neutral-200" />

      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 block text-xs font-bold tracking-[0.3em] text-primary-500 uppercase">
            // 05 — Partners
          </span>
          <h2 className="mb-4 text-4xl font-bold text-primary-950 md:text-5xl lg:text-6xl">
            Our Sponsors
            <br />
            <span className="text-primary-500">&amp; Partners</span>
          </h2>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-neutral-500">
            Supported by leading organizations that believe in fostering the
            next generation of mechatronics engineers
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex justify-center"
      >
        <InfiniteMovingCards
          direction="left"
          pauseOnHover={true}
          className="mx-auto"
          items={sponsors.map((sponsor) => (
            <Link
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex size-full items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <Image
                src={sponsor.logo}
                alt={`${sponsor.name} logo`}
                width={120}
                height={120}
                className="object-contain transition-opacity duration-300"
              />
            </Link>
          ))}
        />
      </motion.div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-neutral-200" />
    </section>
  );
}
