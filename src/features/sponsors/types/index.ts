export type SponsorshipTier = "silver" | "gold" | "platinum";

export interface SponsorshipBenefit {
  category: string;
  benefits: {
    name: string;
    description?: string;
    silver: boolean | string;
    gold: boolean | string;
    platinum: boolean | string;
  }[];
}

export interface SponsorshipTierInfo {
  name: string;
  price: number;
  tier: SponsorshipTier;
  color: string;
  featured?: boolean;
}

export const SPONSORSHIP_TIERS: SponsorshipTierInfo[] = [
  {
    name: "Silver",
    price: 500,
    tier: "silver",
    color: "bg-neutral-400",
  },
  {
    name: "Gold",
    price: 750,
    tier: "gold",
    color: "bg-amber-500",
    featured: true,
  },
  {
    name: "Platinum",
    price: 1000,
    tier: "platinum",
    color: "bg-primary-600",
  },
];

export const SPONSORSHIP_BENEFITS: SponsorshipBenefit[] = [
  {
    category: "Competitions",
    benefits: [
      {
        name: "Official Sumobots sponsor",
        silver: true,
        gold: true,
        platinum: true,
      },
      {
        name: "Coffee chat with Sumobots winners",
        silver: false,
        gold: true,
        platinum: true,
      },
      {
        name: "Brand-specific optional workshop",
        silver: false,
        gold: true,
        platinum: true,
      },
      {
        name: "Invitation to judge competitions",
        silver: false,
        gold: true,
        platinum: true,
      },
      {
        name: "Main partner for Hackathon",
        description: "Limited to 1 company",
        silver: false,
        gold: false,
        platinum: true,
      },
    ],
  },
  {
    category: "Industry",
    benefits: [
      {
        name: "Site tour",
        silver: false,
        gold: true,
        platinum: true,
      },
      {
        name: "Speaker position on Women In Mechatronics Panel",
        silver: false,
        gold: false,
        platinum: true,
      },
      {
        name: "Presentation slot at industry night",
        silver: false,
        gold: false,
        platinum: true,
      },
    ],
  },
  {
    category: "Marketing",
    benefits: [
      {
        name: "Social media posts",
        silver: "2 posts",
        gold: "3+ posts",
        platinum: "3+ posts",
      },
      {
        name: "Job board",
        silver: true,
        gold: true,
        platinum: true,
      },
      {
        name: "Logo on website",
        silver: true,
        gold: true,
        platinum: true,
      },
      {
        name: "Linktree",
        silver: false,
        gold: true,
        platinum: true,
      },
      {
        name: "Company merch as competition prizes",
        silver: false,
        gold: true,
        platinum: true,
      },
      {
        name: "Logo on merch",
        silver: false,
        gold: false,
        platinum: true,
      },
    ],
  },
];
