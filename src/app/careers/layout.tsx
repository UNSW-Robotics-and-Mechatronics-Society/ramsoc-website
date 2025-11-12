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
    siteName: "RAMSoc UNSW",
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
    <main className="min-h-screen">
      <Hero
        imageSrc="/careers/hero.webp"
        imageAlt="Collage of careers at RAMSoc"
      >
        Careers
      </Hero>
      <section className="bg-primary-50/30 py-20">
        <Container>
          <div className="mx-auto max-w-[1400px]">{children}</div>
        </Container>
      </section>
    </main>
  );
}
