// Constants for team year search range
export const YEAR_SEARCH_INIT = 2023;
export const YEAR_SEARCH_END = new Date().getFullYear() + 1;
export const YEAR_SEARCH_RANGE = Array.from(
  { length: YEAR_SEARCH_END - YEAR_SEARCH_INIT + 1 },
  (_, i) => YEAR_SEARCH_INIT + i,
);

export const EXECUTIVES_IN_ORDER = [
  "president",
  "vice president",
  "secretary",
  "arc delegate",
  "treasurer",
  "grievance & edi officer",
  "marketing executive",
  "technical executive",
  "industry & sponsorships executive",
];
