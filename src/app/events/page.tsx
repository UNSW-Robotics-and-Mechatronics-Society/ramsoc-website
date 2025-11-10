import { Hero } from "@/components/hero";
import { SITE_OG_IMAGE, SITE_URL } from "@/lib/constants/urls";
import type { Metadata } from "next";
import Events from "./_components/events";

export const metadata: Metadata = {
  title: "Events | RAMSoc UNSW",
  description:
    "Explore upcoming and past events hosted by RAMSoc UNSW. Join us for workshops, competitions, networking events, and more in robotics and mechatronics.",
  openGraph: {
    title: "Events | RAMSoc UNSW",
    description:
      "Join RAMSoc events - workshops, competitions, and networking opportunities in robotics and mechatronics.",
    url: `${SITE_URL}/events`,
    siteName: "RAMSoc UNSW",
    images: `${SITE_URL}${SITE_OG_IMAGE}`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Events | RAMSoc UNSW",
    description:
      "Join RAMSoc events - workshops, competitions, and networking opportunities in robotics and mechatronics.",
  },
};

export default function EventsPage() {
  return (
    <main className="w-full">
      <Hero imageSrc="/events/hero.webp" imageAlt="Collage of events at RAMSoc">
        Our Events
      </Hero>
      <Events />
    </main>
  );
}
