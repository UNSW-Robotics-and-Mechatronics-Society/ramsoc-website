import Link from "next/link";
import {
  FaDiscord,
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

export default function ContactUsSection() {
  return (
    <div className="w-full bg-gradient-to-b from-neutral-50 via-primary-100 to-primary-100 pb-16">
      <div className="mx-auto flex w-full max-w-[1200] flex-col items-center">
        <h2 id="contact" className="text-center text-5xl">
          Contact Us
        </h2>
        <p className="mt-16 text-xl">info@ramsocunsw.org</p>
        <div className="mt-16 flex gap-8">
          <Link
            href="https://www.linkedin.com/company/unsw-mechatronics-society/"
            target="_blank"
          >
            <FaLinkedin size={32}></FaLinkedin>
          </Link>
          <Link href="https://www.facebook.com/UNSWMTRNSOC" target="_blank">
            <FaFacebookSquare size={32}></FaFacebookSquare>
          </Link>
          <Link href="https://www.instagram.com/unswmtrnsoc/" target="_blank">
            <FaInstagram size={32}></FaInstagram>
          </Link>
          <Link href="https://discord.com/invite/4dWMWAjWm9" target="_blank">
            <FaDiscord size={32}></FaDiscord>
          </Link>
        </div>
      </div>
    </div>
  );
}
