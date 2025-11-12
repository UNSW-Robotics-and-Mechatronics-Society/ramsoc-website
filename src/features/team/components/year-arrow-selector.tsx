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

  return (
    <div className="bg-primary-50/30 border-primary-200/50 border-b py-6">
      <div className="mx-auto flex max-w-[1400px] items-center justify-center gap-4 px-4">
        <button
          onClick={() => router.push(`${selectedYear - 1}/`, { scroll: false })}
          disabled={currentIndex === 0}
          className="border-primary-300 hover:bg-primary-50 group flex size-10 items-center justify-center rounded-full border bg-white transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
          aria-label="Previous year"
        >
          <HiChevronLeft className="text-primary-600 size-5 transition-transform group-hover:-translate-x-0.5" />
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
              isCurrentYear ? "text-primary-500" : "text-primary-900"
            }`}
          >
            {selectedYear}
          </span>
        </motion.div>

        <button
          onClick={() => router.push(`${selectedYear + 1}/`, { scroll: false })}
          disabled={currentIndex === availableYears.length - 1}
          className="border-primary-300 hover:bg-primary-50 group flex size-10 items-center justify-center rounded-full border bg-white transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
          aria-label="Next year"
        >
          <HiChevronRight className="text-primary-600 size-5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
};

export default YearArrowSelector;
