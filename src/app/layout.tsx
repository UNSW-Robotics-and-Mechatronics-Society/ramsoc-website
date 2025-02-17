import type { Metadata } from "next";

import "./globals.css";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";

import Providers from "./providers";

const title = "RAMSoc UNSW";
const description =
  "UNSW Robotics and Mechatronics Society (RAMSoc) is a student-run engineering society that aims to provide Mechatronic Engineering opportunities and pathways between mechatronic students and the professional community.";
const url = "https://ramsocunsw.org";
const image = "https://ramsocunsw.org/og.svg";

export const metadata: Metadata = {
  title: "RAMSoc UNSW",
  description:
    "UNSW Robotics and Mechatronics Society (RAMSoc) is a student-run engineering society that aims to provide Mechatronic Engineering opportunities and pathways between mechatronic students and the professional community.",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-stone-50 text-primary-800 antialiased`}>
        <Providers>
          <Navbar></Navbar>
          {children}
          <Footer></Footer>
        </Providers>
      </body>
    </html>
  );
}
