"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const lastScrollValue = useRef(0);
  useEffect(() => {
    setIsScrolled(window.scrollY > 125);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 125);
      setIsScrollingDown(lastScrollValue.current < window.scrollY);
      lastScrollValue.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={cn(
        "fixed left-0 top-0 z-50 h-24 w-full px-8 transition-all duration-500 ease-out",
        isScrolled ? "bg-primary-950" : "bg-primary-transparent",
        isScrollingDown ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <div className="mx-auto hidden size-full max-w-[3000px] items-center text-primary-50 sm:flex">
        <Link href="/" aria-label="Logo to go to home page">
          <Image
            src="/logo.svg"
            alt="logo for ramsoc"
            width={24}
            height={24}
            className="size-16"
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
            href="/careers"
            className="flex h-full items-center px-4 hover:bg-black/50"
            aria-label="Go to careers page"
          >
            Careers
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
          <Link
            href="/store"
            className="flex h-full items-center px-4 hover:bg-black/50"
            aria-label="Go to store page"
          >
            Store
          </Link>
        </div>
      </div>
      <Sheet open={isModalOpen} onOpenChange={setIsModalOpen}>
        <SheetTrigger
          onClick={() => setIsModalOpen(true)}
          className="ml-auto flex h-full items-center gap-2 text-xl text-white sm:hidden"
        >
          <LuMenu size={32} />
        </SheetTrigger>
        <SheetContent className="bg-primary-950">
          <SheetHeader>
            <SheetTitle hidden>Navbar for RAMSOC</SheetTitle>
            <SheetDescription hidden>Navbar for RAMSOC</SheetDescription>
            <div className="ml-auto flex w-full flex-col text-2xl text-white">
              <Link
                onClick={() => setIsModalOpen(false)}
                href="/"
                className="flex h-full items-center p-4 hover:bg-black/50"
                aria-label="Go to home page"
              >
                Home
              </Link>
              <Link
                onClick={() => setIsModalOpen(false)}
                href="/events"
                className="flex h-full items-center p-4 hover:bg-black/50"
                aria-label="Go to events page"
              >
                Events
              </Link>
              <Link
                href="/careers"
                className="flex h-full items-center p-4 hover:bg-black/50"
                aria-label="Go to careers page"
              >
                Careers
              </Link>
              <Link
                onClick={() => setIsModalOpen(false)}
                href="/teams"
                className="flex h-full items-center p-4 hover:bg-black/50"
                aria-label="Go to team page"
              >
                Team
              </Link>
              <Link
                onClick={() => setIsModalOpen(false)}
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
