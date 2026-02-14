"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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

/**
 * Detects whether the navbar is over a light or dark section by sampling
 * the background color of the element directly behind the navbar's midpoint.
 */
export function useNavTheme() {
  const [isOverLight, setIsOverLight] = useState(false);

  const check = useCallback(() => {
    // Sample a point just below the top of the viewport (navbar midpoint ~40px)
    const sampleY = 40;
    const sampleX = window.innerWidth / 2;

    // Temporarily hide the nav so elementFromPoint hits the content behind it
    const nav = document.querySelector("nav");
    if (!nav) return;
    const prevPointerEvents = nav.style.pointerEvents;
    const prevVisibility = nav.style.visibility;
    nav.style.pointerEvents = "none";
    nav.style.visibility = "hidden";

    const el = document.elementFromPoint(sampleX, sampleY);

    nav.style.pointerEvents = prevPointerEvents;
    nav.style.visibility = prevVisibility;

    if (!el) return;

    // Walk up to find the nearest section or element with a background
    let target: Element | null = el;
    while (target) {
      const bg = getComputedStyle(target).backgroundColor;
      // Skip transparent backgrounds
      if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
        // Parse the rgb values
        const match = bg.match(/\d+/g);
        if (match) {
          const r = Number(match[0]);
          const g = Number(match[1]);
          const b = Number(match[2]);
          // Luminance check: light if > 128
          const luminance = (r * 299 + g * 587 + b * 114) / 1000;
          setIsOverLight(luminance > 128);
        }
        return;
      }
      target = target.parentElement;
    }
  }, []);

  useEffect(() => {
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [check]);

  return isOverLight;
}
