import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="absolute z-50 h-24 w-full">
      <div className="mx-auto flex h-full w-full max-w-[1200px] items-center text-primary-50">
        <Image
          src="/logo.svg"
          alt="logo for ramsoc"
          width={91}
          height={56}
        ></Image>
        <div className="ml-auto flex h-full">
          <Link
            href="/"
            className="flex h-full items-center px-4 hover:bg-black hover:bg-opacity-50"
          >
            Home
          </Link>
          <Link
            href="/events"
            className="flex h-full items-center px-4 hover:bg-black hover:bg-opacity-50"
          >
            Events
          </Link>
          <Link
            href="/team"
            className="flex h-full items-center px-4 hover:bg-black hover:bg-opacity-50"
          >
            Team
          </Link>
          <Link
            href="/#contact"
            className="flex h-full items-center px-4 hover:bg-black hover:bg-opacity-50"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
}
