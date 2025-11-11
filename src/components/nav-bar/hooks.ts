"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollBehavior(threshold: number = 125) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const lastScrollValue = useRef(0);

  useEffect(() => {
    setIsScrolled(window.scrollY > threshold);

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsScrolled(currentScroll > threshold);
      setIsScrollingDown(lastScrollValue.current < currentScroll);
      lastScrollValue.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return { isScrolled, isScrollingDown };
}

export function useSheet() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    setIsOpen,
    toggle,
    open,
    close,
  };
}
