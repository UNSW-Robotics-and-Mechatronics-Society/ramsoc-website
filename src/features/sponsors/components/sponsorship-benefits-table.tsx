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
      className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-md"
    >
      {/* Desktop view */}
      <div className="hidden lg:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="border-neutral-200 border-b px-6 py-4 text-left">
                  <span className="text-sm font-semibold uppercase tracking-wide text-neutral-600">
                    Benefits
                  </span>
                </th>
                {SPONSORSHIP_TIERS.map((tier) => (
                  <th
                    key={tier.tier}
                    className="border-neutral-200 border-b px-6 py-4 text-center"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span
                        className={cn(
                          "rounded px-3 py-1 text-sm font-bold text-white",
                          tier.color,
                        )}
                      >
                        {tier.name}
                      </span>
                      <span className="text-2xl font-bold text-neutral-900">
                        ${tier.price}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SPONSORSHIP_BENEFITS.map((category, categoryIdx) => (
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
                "border-neutral-200 border-b",
            )}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <span
                  className={cn(
                    "mb-2 inline-block rounded px-3 py-1 text-sm font-bold text-white",
                    tier.color,
                  )}
                >
                  {tier.name}
                </span>
                <div className="text-2xl font-bold text-neutral-900">
                  ${tier.price}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {SPONSORSHIP_BENEFITS.map((category) => (
                <div key={category.category}>
                  <h4 className="mb-2 font-semibold text-neutral-900">
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
                              <Check className="text-primary-600 mt-0.5 size-5 shrink-0" />
                            ) : (
                              <X className="mt-0.5 size-5 shrink-0 text-neutral-300" />
                            )
                          ) : (
                            <Check className="text-primary-600 mt-0.5 size-5 shrink-0" />
                          )}
                          <span className="text-neutral-700">
                            {benefit.name}
                            {typeof value === "string" && (
                              <span className="text-neutral-500">
                                {" "}
                                - {value}
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
      <tr className="bg-neutral-50">
        <td
          colSpan={4}
          className="border-neutral-200 border-b px-6 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-700"
        >
          {category.category}
        </td>
      </tr>
      {category.benefits.map((benefit, benefitIdx) => (
        <tr
          key={benefit.name}
          className={cn(
            "transition-colors hover:bg-neutral-50",
            benefitIdx !== category.benefits.length - 1 &&
              "border-neutral-200 border-b",
          )}
        >
          <td className="px-6 py-4">
            <div>
              <span className="text-sm text-neutral-900">{benefit.name}</span>
              {benefit.description && (
                <span className="ml-2 text-xs text-neutral-500">
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
                    <Check className="text-primary-600 mx-auto size-5" />
                  ) : (
                    <X className="mx-auto size-5 text-neutral-300" />
                  )
                ) : (
                  <span className="text-sm text-neutral-700">{value}</span>
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
}
