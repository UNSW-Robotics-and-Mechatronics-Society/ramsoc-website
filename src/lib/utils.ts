import { clsx, type ClassValue } from "clsx";
import { parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

import { SchoolTerm, Term } from "@/types/term";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUnswTermAndYear(dateString: string): SchoolTerm {
  const date = parseISO(dateString);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  let term: Term;
  if (year > 2019) {
    if (month >= 1 && month <= 5) {
      term = Term.Term1; // Term 1: February - May
    } else if (month >= 6 && month <= 8) {
      term = Term.Term2; // Term 2: June - August
    } else {
      term = Term.Term3; // Term 3: September - January
    }
  } else {
    if (month >= 2 && month <= 6) {
      term = Term.Term1; // Term 1: February - June
    } else {
      term = Term.Term2; // Term 2: July - December
    }
  }

  return {
    year,
    term,
  };
}
