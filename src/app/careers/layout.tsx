import { Container } from "@/components/ui/container";

import { Hero } from "@/components/hero";
import { SITE_OG_IMAGE, SITE_URL } from "@/lib/constants/urls";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | RAMSoc UNSW",
  description:
    "Discover career opportunities in robotics and mechatronics. Browse internships, graduate positions, and job openings curated by RAMSoc UNSW.",
  openGraph: {
    title: "Careers | RAMSoc UNSW",
    description:
      "Explore career opportunities in robotics and mechatronics - internships, graduate roles, and jobs.",
    url: `${SITE_URL}/careers`,
    images: `${SITE_URL}${SITE_OG_IMAGE}`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers | RAMSoc UNSW",
    description:
      "Explore career opportunities in robotics and mechatronics - internships, graduate roles, and jobs.",
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mb-16 min-h-screen">
      <Hero
        imageSrc="/careers/hero.webp"
        imageAlt="Collage of careers at RAMSoc"
      >
        Careers
      </Hero>
      <Container className="px-4">{children}</Container>
    </main>
  );
}
