"use client";

import Script from "next/script";
import { initialiseerPlausible } from "@/lib/plausible";

export function PlausibleAnalytics() {
  const scriptUrl = process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL;

  if (!scriptUrl) {
    return null;
  }

  return (
    <Script
      id="plausible-analytics"
      src={scriptUrl}
      strategy="afterInteractive"
      onLoad={initialiseerPlausible}
    />
  );
}
