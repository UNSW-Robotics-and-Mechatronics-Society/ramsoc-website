export interface RubricEvent {
  eventid: string;
  title: string;
  subtitle?: string; // venue
  image?: string;
  formatteddate?: string;
  upcoming: number; // 1 = upcoming, 0 = past
  eventsortindex?: number;
  sortindex?: number;
}

export interface RubricSection {
  sectionname: string;
  array: RubricEvent[];
}


export interface RubricLandingPageResponse {
  status?: string;
  sections?: RubricSection[];
}
