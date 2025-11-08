import Link from "next/link";
import {
  FaDiscord,
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

import { Container } from "@/components/ui/container";
import {
  DISCORD_URL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
} from "@/lib/constants/urls";

export default function ContactUs() {
  return (
    <Container
      outerProps={{ variant: "gradient" }}
      className="flex flex-col items-center py-16"
    >
      <h2 id="contact" className="text-center">
        Contact Us
      </h2>
      <h3 className="mt-16 text-xl">info@ramsocunsw.org</h3>
      <div className="mt-16 flex gap-8">
        <Link
          href={LINKEDIN_URL}
          target="_blank"
          title="Linkedin"
          aria-label="Go to our Linkedin"
        >
          <FaLinkedin size={32} />
        </Link>
        <Link
          href={FACEBOOK_URL}
          target="_blank"
          title="Facebook"
          aria-label="Go to our Facebook"
        >
          <FaFacebookSquare size={32} />
        </Link>
        <Link
          href={INSTAGRAM_URL}
          target="_blank"
          title="Instagram"
          aria-label="Go to our Instagram"
        >
          <FaInstagram size={32} />
        </Link>
        <Link
          href={DISCORD_URL}
          target="_blank"
          title="Discord"
          aria-label="Go to our Discord"
        >
          <FaDiscord size={32} />
        </Link>
      </div>
    </Container>
  );
}
