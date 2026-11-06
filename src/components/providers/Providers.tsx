"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { BookingProvider } from "./BookingProvider";

/** Respeita prefers-reduced-motion em todas as animações do Framer Motion. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <BookingProvider>{children}</BookingProvider>
    </MotionConfig>
  );
}
