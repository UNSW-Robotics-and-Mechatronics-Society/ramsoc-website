import { SITE_OG_IMAGE, SITE_URL } from "@/lib/constants/urls";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsor Us | RAMSoc UNSW",
  description:
    "Partner with RAMSoc to connect with 1,800+ robotics and mechatronics students at UNSW. Explore our sponsorship packages and become part of the largest robotics society in NSW.",
  openGraph: {
    title: "Sponsor Us | RAMSoc UNSW",
    description:
      "Partner with RAMSoc to connect with 1,800+ robotics and mechatronics students. Explore sponsorship opportunities.",
    url: `${SITE_URL}/sponsors`,
    siteName: "RAMSoc UNSW",
    images: `${SITE_URL}${SITE_OG_IMAGE}`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Sponsor Us | RAMSoc UNSW",
    description:
      "Partner with RAMSoc to connect with 1,800+ robotics and mechatronics students. Explore sponsorship opportunities.",
  },
};

export default function SponsorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
