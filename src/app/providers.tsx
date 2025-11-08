"use client";
import { env } from "@/env";
import { TRPCReactProvider } from "@/trpc/react";
import { GoogleTagManager } from "@next/third-parties/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Analytics } from "@vercel/analytics/next";

export default function Providers({ children }: { children: React.ReactNode }) {
  const gtmId = env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID as string;
  return (
    <>
      <GoogleTagManager gtmId={gtmId} />
      <TRPCReactProvider>
        {children}
        <Analytics />
        <ReactQueryDevtools />
      </TRPCReactProvider>
    </>
  );
}
