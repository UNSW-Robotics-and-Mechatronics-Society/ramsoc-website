export interface CareerMetaData {
  id: string;
  logo: string;
  company: string;
  deadline: string;
  email: string;
  position: string;
  ctaUrl: string;
  location?: string;
  pay?: string;
  description?: string;
  type?: string;
  tags: string[];
  hasDetails: boolean;
}
