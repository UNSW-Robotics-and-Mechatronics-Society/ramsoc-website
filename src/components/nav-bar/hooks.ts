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

export function useHeroSubtitleVisibility() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleCheck = () => {
      const element = document.getElementById("hero-subtitle");
      if (!element) {
        // If hero subtitle doesn't exist (other pages), consider it as "not visible"
        // so the logo text will show (since showText={!isHeroSubtitleVisible})
        setIsVisible(false);
        return;
      }

      const rect = element.getBoundingClientRect();
      // Element is visible if any part is in viewport
      setIsVisible(rect.bottom > 0 && rect.top < window.innerHeight);
    };

    // Check immediately
    handleCheck();

    // Check on scroll
    window.addEventListener("scroll", handleCheck, { passive: true });

    // Use MutationObserver to detect DOM changes (when navigating between pages)
    const observer = new MutationObserver(handleCheck);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("scroll", handleCheck);
      observer.disconnect();
    };
  }, []);

  return isVisible;
}
