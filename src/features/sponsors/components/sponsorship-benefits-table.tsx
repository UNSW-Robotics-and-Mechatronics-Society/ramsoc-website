"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";

import { SPONSORSHIP_BENEFITS, SPONSORSHIP_TIERS } from "../types";

export function SponsorshipBenefitsTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="overflow-hidden border border-neutral-200 bg-white"
    >
      {/* Desktop view */}
      <div className="hidden lg:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="px-6 py-5 text-left">
                  <span className="text-xs font-bold tracking-[0.3em] text-neutral-400 uppercase">
                    Benefits
                  </span>
                </th>
                {SPONSORSHIP_TIERS.map((tier) => (
                  <th key={tier.tier} className="px-6 py-5 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span
                        className={cn(
                          "px-3 py-1 text-[0.65rem] font-bold tracking-[0.2em] text-white uppercase",
                          tier.color,
                        )}
                      >
                        {tier.name}
                      </span>
                      <span className="text-2xl font-black text-primary-950">
                        ${tier.price}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SPONSORSHIP_BENEFITS.map((category) => (
                <TableCategory key={category.category} category={category} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile view */}
      <div className="lg:hidden">
        {SPONSORSHIP_TIERS.map((tier, tierIdx) => (
          <div
            key={tier.tier}
            className={cn(
              "p-6",
              tierIdx !== SPONSORSHIP_TIERS.length - 1 &&
                "border-b border-neutral-200",
            )}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <span
                  className={cn(
                    "mb-2 inline-block px-3 py-1 text-[0.65rem] font-bold tracking-[0.2em] text-white uppercase",
                    tier.color,
                  )}
                >
                  {tier.name}
                </span>
                <div className="text-2xl font-black text-primary-950">
                  ${tier.price}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {SPONSORSHIP_BENEFITS.map((category) => (
                <div key={category.category}>
                  <h4 className="mb-2 text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase">
                    {category.category}
                  </h4>
                  <ul className="space-y-2">
                    {category.benefits.map((benefit) => {
                      const value = benefit[tier.tier];
                      return (
                        <li
                          key={benefit.name}
                          className="flex items-start gap-2 text-sm"
                        >
                          {typeof value === "boolean" ? (
                            value ? (
                              <Check className="mt-0.5 size-4 shrink-0 text-primary-500" />
                            ) : (
                              <X className="mt-0.5 size-4 shrink-0 text-neutral-300" />
                            )
                          ) : (
                            <Check className="mt-0.5 size-4 shrink-0 text-primary-500" />
                          )}
                          <span className="text-neutral-500">
                            {benefit.name}
                            {typeof value === "string" && (
                              <span className="text-neutral-400">
                                {" "}
                                — {value}
                              </span>
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function TableCategory({
  category,
}: {
  category: (typeof SPONSORSHIP_BENEFITS)[0];
}) {
  return (
    <>
      <tr className="border-b border-neutral-200 bg-neutral-50/50">
        <td
          colSpan={4}
          className="px-6 py-3 text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase"
        >
          {category.category}
        </td>
      </tr>
      {category.benefits.map((benefit, benefitIdx) => (
        <tr
          key={benefit.name}
          className={cn(
            "transition-colors hover:bg-neutral-50/50",
            benefitIdx !== category.benefits.length - 1 &&
              "border-b border-neutral-100",
          )}
        >
          <td className="px-6 py-4">
            <div>
              <span className="text-sm text-primary-950">{benefit.name}</span>
              {benefit.description && (
                <span className="ml-2 text-xs text-neutral-400">
                  ({benefit.description})
                </span>
              )}
            </div>
          </td>
          {SPONSORSHIP_TIERS.map((tier) => {
            const value = benefit[tier.tier];
            return (
              <td key={tier.tier} className="px-6 py-4 text-center">
                {typeof value === "boolean" ? (
                  value ? (
                    <Check className="mx-auto size-4 text-primary-500" />
                  ) : (
                    <X className="mx-auto size-4 text-neutral-300" />
                  )
                ) : (
                  <span className="text-sm text-neutral-500">{value}</span>
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
}
