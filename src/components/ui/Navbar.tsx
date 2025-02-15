"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuMenu } from "react-icons/lu";

import { cn } from "@/lib/utils";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./Sheet";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    setIsScrolled(window.scrollY > 10);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={cn(
        "fixed left-0 top-0 z-50 h-24 w-full px-8 transition-colors ease-out",
        isScrolled ? "bg-primary-950" : "bg-primary-transparent",
      )}
    >
      <div className="mx-auto hidden size-full max-w-[1200px] items-center text-primary-50 sm:flex">
        <Link href="/" aria-label="Logo to go to home page">
          <Image
            src="/logo.svg"
            alt="logo for ramsoc"
            width={91}
            height={56}
          ></Image>
        </Link>
        <div className="ml-auto flex h-full">
          <Link
            href="/"
            className="flex h-full items-center px-4 hover:bg-black/50"
            aria-label="Go to home page"
          >
            Home
          </Link>
          <Link
            href="/events"
            className="flex h-full items-center px-4 hover:bg-black/50"
            aria-label="Go to events page"
          >
            Events
          </Link>
          <Link
            href="/teams"
            className="flex h-full items-center px-4 hover:bg-black/50"
            aria-label="Go to team page"
          >
            Team
          </Link>
          <Link
            href="/#contact"
            className="flex h-full items-center px-4 hover:bg-black/50"
            aria-label="Go to contact us page"
          >
            Contact Us
          </Link>
        </div>
      </div>
      <Sheet>
        <SheetTrigger className="ml-auto flex h-full items-center gap-2 text-xl text-white sm:hidden">
          <LuMenu size={32} />
        </SheetTrigger>
        <SheetContent className="bg-primary-950">
          <SheetHeader>
            <SheetTitle hidden>Navbar for RAMSOC</SheetTitle>
            <SheetDescription hidden>Navbar for RAMSOC</SheetDescription>
            <div className="ml-auto flex w-full flex-col text-2xl text-white">
              <Link
                href="/"
                className="flex h-full items-center p-4 hover:bg-black/50"
                aria-label="Go to home page"
              >
                Home
              </Link>
              <Link
                href="/events"
                className="flex h-full items-center p-4 hover:bg-black/50"
                aria-label="Go to events page"
              >
                Events
              </Link>
              <Link
                href="/teams"
                className="flex h-full items-center p-4 hover:bg-black/50"
                aria-label="Go to team page"
              >
                Team
              </Link>
              <Link
                href="/#contact"
                className="flex h-full items-center p-4 hover:bg-black/50"
                aria-label="Go to contact us page"
              >
                Contact Us
              </Link>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
