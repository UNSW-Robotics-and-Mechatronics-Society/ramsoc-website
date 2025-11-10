"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import styles from "./year-arrow-selector.module.scss";

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

  return (
    <div className={styles.yearSelectorContainer}>
      <button
        onClick={() => router.push(`${selectedYear - 1}/`, { scroll: false })}
        disabled={currentIndex === 0}
        className={styles.arrowButton}
      >
        <Image
          src="/icons/leftArrowButton.svg"
          alt="Left Arrow"
          width={24}
          height={24}
        />
      </button>
      <span
        className={`${styles.yearDisplay} ${
          currentYear === selectedYear ? "text-primary-400" : "text-primary-950"
        }`}
      >
        {selectedYear}
      </span>
      <button
        onClick={() => router.push(`${selectedYear + 1}/`, { scroll: false })}
        disabled={currentIndex === availableYears.length - 1}
        className={styles.arrowButton}
      >
        <Image
          src="/icons/rightArrowButton.svg"
          alt="Right Arrow"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};

export default YearArrowSelector;
