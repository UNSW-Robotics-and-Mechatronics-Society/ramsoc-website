export interface RubricEvent {
  eventid: number;
  title: string;
  subtitle?: string;
  image?: string;
  formatteddate?: string;
  upcoming: number;
  eventsortindex?: number;
  sortindex?: number;
  destination?: string;
  info?: string;
  month?: string;
  day?: string;
}

export interface RubricSection {
  sectionname: string;
  array: RubricEvent[];
}

export interface RubricLandingPageResponse {
  success?: boolean;
  status?: string;
  sections?: RubricSection[];
}
