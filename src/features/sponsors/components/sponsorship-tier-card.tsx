"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

import type { SponsorshipTierInfo } from "../types";

interface SponsorshipTierCardProps {
  tier: SponsorshipTierInfo;
  index: number;
}

export function SponsorshipTierCard({ tier, index }: SponsorshipTierCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "relative bg-white p-8 md:p-10",
        tier.featured && "ring-2 ring-primary-500 ring-inset",
      )}
    >
      {tier.featured && (
        <span className="absolute top-6 right-6 bg-primary-500 px-3 py-1 text-[0.65rem] font-bold tracking-[0.2em] text-white uppercase">
          Most Popular
        </span>
      )}

      <div className="mb-8">
        <span
          className={cn(
            "mb-3 inline-block px-3 py-1 text-[0.65rem] font-bold tracking-[0.2em] text-white uppercase",
            tier.color,
          )}
        >
          {tier.name}
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-black tracking-tight text-primary-950 md:text-7xl">
            ${tier.price}
          </span>
          <span className="text-xs font-medium tracking-[0.2em] text-neutral-400 uppercase">
            AUD
          </span>
        </div>
      </div>

      <a
        href={`mailto:industry@ramsocunsw.org?subject=Sponsorship Inquiry - ${tier.name} Tier`}
        className={cn(
          "mb-8 block w-full py-3 text-center text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300",
          tier.featured
            ? "bg-primary-500 text-white hover:bg-primary-400"
            : "border border-neutral-200 text-primary-950 hover:border-primary-500 hover:text-primary-500",
        )}
      >
        Get Started
      </a>

      <div className="space-y-3">
        <p className="text-xs font-bold tracking-[0.3em] text-neutral-400 uppercase">
          Key Benefits
        </p>
        <ul className="space-y-2.5">
          {tier.tier === "silver" && (
            <>
              <BenefitItem text="Official Sumobots sponsor" />
              <BenefitItem text="2 social media posts" />
              <BenefitItem text="Job board listing" />
              <BenefitItem text="Logo on website" />
            </>
          )}
          {tier.tier === "gold" && (
            <>
              <BenefitItem text="All Silver benefits" />
              <BenefitItem text="Coffee chat with winners" />
              <BenefitItem text="Brand-specific workshop" />
              <BenefitItem text="Site tour opportunity" />
              <BenefitItem text="3+ social media posts" />
              <BenefitItem text="Linktree inclusion" />
            </>
          )}
          {tier.tier === "platinum" && (
            <>
              <BenefitItem text="All Gold benefits" />
              <BenefitItem text="Hackathon main partner" />
              <BenefitItem text="WIM Panel speaker" />
              <BenefitItem text="Industry night presentation" />
              <BenefitItem text="Logo on merch" />
            </>
          )}
        </ul>
      </div>
    </motion.div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2.5">
      <Check className="mt-0.5 size-4 shrink-0 text-primary-500" />
      <span className="text-sm text-neutral-500">{text}</span>
    </li>
  );
}
