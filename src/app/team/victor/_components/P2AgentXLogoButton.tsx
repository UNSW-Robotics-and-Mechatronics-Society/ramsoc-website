"use client";

import { useState } from "react";

import LogoButton from "./LogoButton";

export default function P2AgentXLogoButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <LogoButton
        href="https://www.p2agentx.com/"
        src="/team/victor/P2AgentXLogo.jpg"
        alt="P2AgentX logo"
        ariaLabel="Open P2AgentX website"
        containerClassName="-translate-x-1/2 -translate-y-1/2"
      >
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="mx-auto mt-3 block rounded-full border border-sky-400/60 bg-[#10284a]/85 px-5 py-1.5 text-sm font-black tracking-[0.18em] text-sky-300 uppercase shadow-[0_0_18px_rgba(56,189,248,0.28)] transition hover:scale-[1.03] hover:bg-[#14345f] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
          aria-label="Open P2AgentX video"
        >
          [ Video ]
        </button>
      </LogoButton>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020a17]/80 p-6 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0"
            aria-label="Close P2Dingo video"
          />

          <div className="relative z-10 flex w-full max-w-5xl flex-col gap-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="self-end rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-white"
            >
              Close
            </button>

            <div className="overflow-hidden rounded-2xl bg-black shadow-2xl">
              <video
                src="/team/victor/P2DingoVideo.mp4"
                className="h-auto max-h-[80vh] w-full object-contain"
                controls
                autoPlay
                playsInline
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
