'use client'
import { useRouter } from "next/navigation";
import { JSX } from "react";

import styles from "./YearArrowSelector.module.scss";

type YearArrowSelectorProps = {
  selectedYear: number;
  currentYear: number;
  availableYears: number[];
};

const YearArrowSelector = ({
  selectedYear,
  currentYear,
  availableYears,
}: YearArrowSelectorProps): JSX.Element => {
  const currentIndex = availableYears.indexOf(selectedYear);
  const router = useRouter();

  return (
    <div className={styles.yearSelectorContainer}>
      <button
        onClick={() => router.push(`${selectedYear - 1}/`, { scroll: false })}
        disabled={currentIndex === 0}
        className={styles.arrowButton}
      >
        <img src="/icons/leftArrowButton.svg" alt="Right Arrow" width={24} height={24} />
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
        className={styles.arrowButton}>
        <img src="/icons/rightArrowButton.svg" alt="Right Arrow" width={24} height={24} />
      </button>
    </div>
  );
};

export default YearArrowSelector;
