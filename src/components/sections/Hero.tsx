"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useScrollContainer } from "@/lib/scrollContainer";
import { useRef } from "react";
import { BOOKING_HREF, site } from "@/data/site";
import { ease } from "@/lib/motion";
import { RevealLines } from "@/components/ui/RevealLines";
import { Arrow } from "@/components/ui/Arrow";
import { useBooking } from "@/components/providers/BookingProvider";

const BADGE_TEXT = "Hair & Beauty Atelier · Agende sua experiência · ";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotionSafe();
  const { requestBooking } = useBooking();
  const container = useScrollContainer();
  const { scrollYProgress } = useScroll({ container, layoutEffect: false, target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "14%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0.15]);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: ease.expo, delay },
  });

  return (
    <section
      id="inicio"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-screen-safe overflow-hidden bg-cacau-950 text-linho"
    >
      {/* Fotografia principal — painel lateral no desktop, topo em tela cheia no mobile */}
      <motion.div
        className="hero-mask absolute inset-x-0 top-0 h-[66%] overflow-hidden sm:h-[70%] lg:inset-y-0 lg:left-auto lg:right-0 lg:h-auto lg:w-[47%]"
        initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={reduce ? { duration: 0 } : { duration: 1.6, ease: ease.expo, delay: 0.1 }}
      >
        <motion.div className="absolute inset-0 will-change-transform" style={{ y: photoY }}>
          <motion.div
            className="absolute inset-0"
            initial={{ scale: reduce ? 1 : 1.18 }}
            animate={{ scale: 1.04 }}
            transition={{ duration: 2.4, ease: ease.expo, delay: 0.1 }}
          >
            <Image
              src="/images/hero-portrait.jpg"
              alt="Retrato editorial de mulher com cabelos castanhos longos em movimento, iluminada por luz quente em estúdio escuro"
              fill
              priority
              sizes="(min-width: 1024px) 47vw, 100vw"
              className="object-cover object-[50%_36%] lg:object-[50%_40%]"
            />
          </motion.div>
        </motion.div>
        {/* Integração da foto com o fundo chocolate */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-cacau-950/50 via-transparent via-35% to-cacau-950/30"
        />
        <div aria-hidden className="absolute inset-0 hidden bg-gradient-to-t from-cacau-950/60 via-transparent via-30% lg:block" />

        <motion.p
          {...fadeUp(1.5)}
          className="label absolute bottom-8 right-8 hidden text-linho/80 lg:block xl:right-14"
        >
          Coleção Essência <span className="mx-2 text-bronze-300">/</span> N° 01
        </motion.p>
      </motion.div>

      {/* Brilho quente atrás do título */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[20%] top-[30%] -z-10 h-[90vmin] w-[90vmin] rounded-full opacity-60"
        style={{ background: "radial-gradient(closest-side, rgba(165,124,101,0.22), transparent)" }}
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-site relative z-10 flex flex-col justify-end pb-safe pt-[calc(var(--header-h)+var(--safe-top))] lg:justify-center lg:pb-16"
      >
        <div className="lg:max-w-[56%] lg:pr-6">
          <motion.p {...fadeUp(0.55)} className="label mb-5 flex items-center gap-4 text-bronze-300 lg:mb-8">
            <span aria-hidden className="h-px w-10 bg-current" />
            {site.tagline}
          </motion.p>

          <RevealLines
            as="h1"
            id="hero-title"
            trigger="mount"
            delay={0.65}
            stagger={0.12}
            className="display text-[clamp(2.75rem,13.2vw,4.75rem)] sm:text-[clamp(4rem,10vw,5.75rem)] lg:text-[clamp(4.75rem,7.6vw,8.75rem)]"
            lines={[
              <>Beleza que</>,
              <>
                <em className="font-normal italic text-bronze-300">revela</em> sua
              </>,
              <>essência.</>,
            ]}
          />

          <div className="mt-6 flex flex-col gap-7 sm:mt-8 lg:mt-10 lg:block">
            <motion.p
              {...fadeUp(1.15)}
              className="max-w-[26rem] text-[0.95rem] leading-relaxed text-linho/75 lg:text-base"
            >
              Um atelier de cabelo e beleza onde cada corte, cor e cuidado começa pela escuta — e termina em você.
            </motion.p>

            <motion.div {...fadeUp(1.3)} className="flex flex-wrap items-center gap-x-7 gap-y-4 lg:mt-10">
              <a
                href={BOOKING_HREF}
                onClick={(e) => {
                  e.preventDefault();
                  requestBooking();
                }}
                className="btn btn-light"
              >
                Agendar horário <Arrow className="btn-arrow" />
              </a>
              <a
                href="#servicos"
                className="link-draw py-2 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-linho/85 hover:text-linho"
              >
                Conhecer serviços
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Selo giratório — sobrepõe a borda da fotografia */}
      <motion.a
        href={BOOKING_HREF}
        onClick={(e) => {
          e.preventDefault();
          requestBooking();
        }}
        aria-label="Agende sua experiência"
        initial={{ opacity: 0, scale: reduce ? 1 : 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: ease.expo, delay: 1.45 }}
        className="group absolute right-5 top-[calc(66%-3.75rem)] z-20 hidden h-[7.5rem] w-[7.5rem] place-items-center rounded-full bg-cacau-950/30 backdrop-blur-[2px] sm:top-[calc(70%-4rem)] md:grid lg:left-[53%] lg:right-auto lg:top-auto lg:bottom-[14%] lg:h-36 lg:w-36 lg:-translate-x-1/2"
      >
        <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-spin-slow text-linho/85" aria-hidden>
          <defs>
            <path id="badge-circle" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
          </defs>
          <text className="fill-current font-sans text-[8.4px] font-semibold uppercase tracking-[0.2em]">
            <textPath href="#badge-circle">{BADGE_TEXT}</textPath>
          </text>
        </svg>
        <span className="grid h-12 w-12 place-items-center rounded-full bg-linho text-cacau-900 transition-transform duration-700 ease-expo group-hover:scale-110 lg:h-14 lg:w-14">
          <Arrow direction="up-right" className="w-5" />
        </span>
      </motion.a>

      {/* Indicador de rolagem */}
      <motion.a
        href="#studio"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.7 }}
        className="absolute bottom-0 right-5 z-20 flex flex-col items-center gap-3 pb-safe text-linho/70 hover:text-linho md:right-10 lg:left-[max(2.5rem,calc((100vw-1440px)/2+2.5rem))] lg:right-auto xl:left-[max(3.5rem,calc((100vw-1440px)/2+3.5rem))]"
        aria-label="Rolar para a próxima seção"
      >
        <span className="label hidden [writing-mode:vertical-rl] lg:block">Role</span>
        <span aria-hidden className="relative block h-14 w-px overflow-hidden bg-linho/15">
          <span className="absolute inset-0 animate-scroll-line bg-bronze-300" />
        </span>
      </motion.a>
    </section>
  );
}
