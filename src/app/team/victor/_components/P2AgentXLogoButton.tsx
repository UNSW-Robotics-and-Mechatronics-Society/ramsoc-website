"use client";

import Image from "next/image";
import { useState } from "react";

export default function P2AgentXLogoButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="-translate-x-1/2 -translate-y-1/2">
        <a
          href="https://www.p2agentx.com/"
          target="_blank"
          rel="noreferrer"
          className="flex size-28 items-center justify-center overflow-hidden rounded-full bg-[#222a34] shadow-xl transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 md:size-36"
          aria-label="Open P2AgentX website"
        >
          <Image
            src="/team/victor/P2AgentXLogo.jpg"
            alt="P2AgentX logo"
            width={144}
            height={144}
            className="h-full w-full object-cover"
          />
        </a>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="mx-auto mt-3 block rounded-full border border-sky-400/60 bg-[#10284a]/85 px-5 py-1.5 text-sm font-black tracking-[0.18em] text-sky-300 uppercase shadow-[0_0_18px_rgba(56,189,248,0.28)] transition hover:scale-[1.03] hover:bg-[#14345f] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
          aria-label="Open P2AgentX video"
        >
          [ Video ]
        </button>
      </div>

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
