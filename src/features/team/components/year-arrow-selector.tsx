"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

interface YearArrowSelectorProps {
  selectedYear: number;
  availableYears: number[];
}

export const YearArrowSelector = ({
  selectedYear,
  availableYears,
}: YearArrowSelectorProps) => {
  const currentIndex = availableYears.indexOf(selectedYear);
  const router = useRouter();

  const currentYear = new Date().getFullYear();
  const isCurrentYear = currentYear === selectedYear;

  const isFirst = currentIndex <= 0;
  const isLast =
    currentIndex === -1 || currentIndex === availableYears.length - 1;

  return (
    <div className="border-b border-neutral-200 bg-white py-6">
      <div className="mx-auto flex max-w-[1400px] items-center justify-center gap-4 px-4">
        <button
          onClick={() => {
            const prevYear = availableYears[currentIndex - 1];
            if (prevYear != null)
              router.push(`/team/${prevYear}`, { scroll: false });
          }}
          disabled={isFirst}
          className="group flex size-10 items-center justify-center border border-neutral-200 bg-white transition-all hover:border-primary-500/30 disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Previous year"
        >
          <HiChevronLeft className="size-5 text-primary-950 transition-transform group-hover:-translate-x-0.5" />
        </button>

        <motion.div
          key={selectedYear}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-baseline gap-2"
        >
          <span
            className={`text-3xl font-bold transition-colors ${
              isCurrentYear ? "text-primary-500" : "text-primary-950"
            }`}
          >
            {selectedYear}
          </span>
        </motion.div>

        <button
          onClick={() => {
            const nextYear = availableYears[currentIndex + 1];
            if (nextYear != null)
              router.push(`/team/${nextYear}`, { scroll: false });
          }}
          disabled={isLast}
          className="group flex size-10 items-center justify-center border border-neutral-200 bg-white transition-all hover:border-primary-500/30 disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Next year"
        >
          <HiChevronRight className="size-5 text-primary-950 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
};

export default YearArrowSelector;
