"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import type { ReactNode } from "react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Props = {
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  lineClassName?: string;
  /** "mount" anima ao carregar; "view" anima ao entrar na viewport */
  trigger?: "mount" | "view";
  delay?: number;
  stagger?: number;
  id?: string;
};

/**
 * Título revelado linha a linha por máscara (overflow hidden + translateY).
 * Cada linha é um bloco — a quebra é intencional e controlada pelo design.
 */
export function RevealLines({
  lines,
  as = "h2",
  className,
  lineClassName,
  trigger = "view",
  delay = 0,
  stagger = 0.1,
  id,
}: Props) {
  const reduce = useReducedMotionSafe();
  const Tag = motion[as];
  const animateProps =
    trigger === "mount"
      ? { initial: "hidden", animate: "show" }
      : { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "0px 0px -12% 0px" } };

  return (
    <Tag id={id} className={className} {...animateProps}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span
            className={cn("block will-change-transform", lineClassName)}
            variants={{
              hidden: { y: "105%", rotate: 2 },
              show: {
                y: "0%",
                rotate: 0,
                transition: reduce
                  ? { duration: 0 }
                  : { duration: 1.15, ease: ease.expo, delay: delay + i * stagger },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
