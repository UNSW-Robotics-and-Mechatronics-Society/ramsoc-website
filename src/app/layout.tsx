import "@/styles/globals.css";

import Footer from "@/components/footer";
import NavBar from "@/components/nav-bar";
import { SITE_OG_IMAGE, SITE_URL } from "@/lib/constants/urls";
import { type Metadata } from "next";

import Providers from "./providers";

const title = "RAMSoc UNSW";
const description =
  "UNSW Robotics and Mechatronics Society (RAMSoc) is a student-run engineering society that aims to provide Mechatronic Engineering opportunities and pathways between mechatronic students and the professional community.";
const url = SITE_URL;
const image = `${SITE_URL}${SITE_OG_IMAGE}`;

export const metadata: Metadata = {
  title: "RAMSoc UNSW",
  description,
  icons: { icon: "/favicon.svg", apple: "/favicon.svg" },
  openGraph: {
    url,
    type: "website",
    title,
    description,
    images: image,
  },
  twitter: {
    card: "summary_large_image",
    images: image,
    description,
    site: url,
    title,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="overflow-x-hidden">
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
