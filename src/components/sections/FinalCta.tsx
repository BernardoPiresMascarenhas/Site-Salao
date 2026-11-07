"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useScrollContainer } from "@/lib/scrollContainer";
import { useRef } from "react";
import { BOOKING_HREF } from "@/data/site";
import { RevealLines } from "@/components/ui/RevealLines";
import { Reveal } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Arrow";
import { useBooking } from "@/components/providers/BookingProvider";

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotionSafe();
  const { requestBooking } = useBooking();
  const container = useScrollContainer();
  const { scrollYProgress } = useScroll({ container, layoutEffect: !container, target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.3, 1]);
  const archWidth = useTransform(scrollYProgress, [0.05, 0.5], reduce ? ["100%", "100%"] : ["72%", "100%"]);

  return (
    <section ref={ref} aria-labelledby="cta-title" className="relative overflow-hidden bg-cacau-900 py-24 text-linho sm:py-32 lg:py-40">
      <div className="container-site grid grid-cols-1 items-center gap-y-14 lg:grid-cols-12 lg:gap-x-10">
        <div className="order-2 lg:order-1 lg:col-span-7">
          <p className="label flex items-center gap-4 text-bronze-300">
            <span aria-hidden className="h-px w-10 bg-current" /> Seu horário no AURÉ
          </p>
          <RevealLines
            id="cta-title"
            className="display mt-8 text-[clamp(3rem,13vw,5rem)] md:text-[clamp(4.5rem,8vw,8.25rem)]"
            lines={[
              <>Seu próximo</>,
              <>momento</>,
              <>
                começa <em className="italic text-bronze-300">aqui.</em>
              </>,
            ]}
          />
          <Reveal delay={0.25} className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-center">
            <a
              href={BOOKING_HREF}
              onClick={(e) => {
                e.preventDefault();
                requestBooking();
              }}
              className="btn btn-bronze self-start"
            >
              Agendar horário <Arrow className="btn-arrow" />
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-linho/60">
              Simulação demonstrativa — explore o fluxo completo em menos de um minuto.
            </p>
          </Reveal>
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end">
          <motion.div
            style={{ width: archWidth }}
            className="relative aspect-[3/4] max-w-[26rem] overflow-hidden rounded-t-full sm:max-w-[28rem] lg:max-w-none"
          >
            <motion.div className="absolute inset-0" style={{ scale }}>
              <Image
                src="/images/cta-studio.jpg"
                alt="Interior de salão sofisticado com espelhos em arco iluminados, poltronas pretas e detalhes dourados"
                fill
                sizes="(min-width: 1024px) 38vw, 80vw"
                className="object-cover object-[50%_45%]"
              />
            </motion.div>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-cacau-900/50 via-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
