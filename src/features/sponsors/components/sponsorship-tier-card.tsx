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
        "relative overflow-hidden rounded-lg border bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl",
        tier.featured
          ? "border-primary-300 ring-primary-200 ring-2"
          : "border-neutral-200",
      )}
    >
      {tier.featured && (
        <div className="bg-primary-600 absolute right-6 top-6 rounded-full px-3 py-1 text-xs font-semibold text-white">
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <div className={cn("mb-2 inline-block rounded px-3 py-1", tier.color)}>
          <span className="text-sm font-bold text-white">{tier.name}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold text-neutral-900">
            ${tier.price}
          </span>
          <span className="text-neutral-600">AUD</span>
        </div>
      </div>

      <a
        href={`mailto:industry@ramsocunsw.org?subject=Sponsorship Inquiry - ${tier.name} Tier`}
        className={cn(
          "mb-6 block w-full rounded-lg py-3 text-center font-semibold transition-all duration-300",
          tier.featured
            ? "bg-primary-600 text-white hover:bg-primary-700"
            : "border-primary-600 text-primary-600 hover:bg-primary-50 border-2",
        )}
      >
        Get Started
      </a>

      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Key Benefits
        </p>
        <ul className="space-y-2">
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
    <li className="flex items-start gap-2">
      <Check className="text-primary-600 mt-0.5 size-5 shrink-0" />
      <span className="text-sm text-neutral-700">{text}</span>
    </li>
  );
}
