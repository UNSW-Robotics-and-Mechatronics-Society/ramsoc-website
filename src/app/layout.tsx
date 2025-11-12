import "@/styles/globals.css";

import Footer from "@/components/footer";
import NavBar from "@/components/nav-bar";
import { SITE_OG_IMAGE, SITE_URL } from "@/lib/constants/urls";
import { type Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import Providers from "./providers";

export const metadata: Metadata = {
  title: "Home | RAMSoc UNSW",
  description:
    "UNSW Robotics and Mechatronics Society (RAMSoc) is a student-run engineering society that aims to provide Mechatronic Engineering opportunities and pathways between mechatronic students and the professional community.",
  openGraph: {
    title: "Home | RAMSoc UNSW",
    description:
      "UNSW Robotics and Mechatronics Society - Connecting mechatronic students with opportunities and the professional community.",
    url: SITE_URL,
    siteName: "RAMSoc UNSW",
    images: `${SITE_URL}${SITE_OG_IMAGE}`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Home | RAMSoc UNSW",
    description:
      "UNSW Robotics and Mechatronics Society - Connecting mechatronic students with opportunities and the professional community.",
  },
};

const SpaceGroteskFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`overflow-x-hidden ${SpaceGroteskFont.variable}`}
    >
      <body className="overflow-x-hidden">
        <Providers>
          <NavBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
