"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useScrollContainer } from "@/lib/scrollContainer";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  /** Intensidade do deslocamento vertical, em % da altura */
  strength?: number;
  position?: string;
  priority?: boolean;
  /** Revela a imagem com uma cortina (clip-path) ao entrar na tela */
  reveal?: boolean;
};

/**
 * Imagem com parallax leve vinculado à rolagem e revelação opcional por máscara.
 * O wrapper define o enquadramento; a imagem é ligeiramente maior para nunca expor bordas.
 */
export function ParallaxImage({
  src,
  alt,
  sizes,
  className,
  imageClassName,
  strength = 8,
  position = "50% 50%",
  priority,
  reveal = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const container = useScrollContainer();
  const { scrollYProgress } = useScroll({ container, layoutEffect: false, target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : [`-${strength}%`, `${strength}%`]);

  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      initial={reveal ? { clipPath: "inset(100% 0% 0% 0%)" } : false}
      whileInView={reveal ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={reduce ? { duration: 0 } : { duration: 1.4, ease: ease.expo }}
    >
      <motion.div
        className="absolute inset-x-0 will-change-transform"
        style={{ y, top: `-${strength + 2}%`, bottom: `-${strength + 2}%` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imageClassName)}
          style={{ objectPosition: position }}
        />
      </motion.div>
    </motion.div>
  );
}
