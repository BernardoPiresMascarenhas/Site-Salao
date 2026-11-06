"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { team } from "@/data/team";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealLines } from "@/components/ui/RevealLines";
import { Reveal } from "@/components/ui/Reveal";

/** Intervalo da passagem automática no carrossel mobile */
const AUTOPLAY_MS = 3800;
/** Tempo de espera após uma interação manual antes de retomar */
const RESUME_AFTER_MS = 7000;

export function Team() {
  const reduce = useReducedMotionSafe();
  const trackRef = useRef<HTMLUListElement>(null);
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  currentRef.current = current;
  const pausedUntil = useRef(0);

  const goTo = useCallback((index: number, smooth = true) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    const padding = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    track.scrollTo({ left: card.offsetLeft - padding, behavior: smooth ? "smooth" : "auto" });
  }, []);

  // Acompanha qual integrante está em destaque durante a rolagem
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cards = Array.from(track.children) as HTMLElement[];
      const padding = parseFloat(getComputedStyle(track).paddingLeft) || 0;
      let nearest = 0;
      let best = Infinity;
      cards.forEach((c, i) => {
        const d = Math.abs(c.offsetLeft - padding - track.scrollLeft);
        if (d < best) {
          best = d;
          nearest = i;
        }
      });
      setCurrent(nearest);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  // Passagem automática: só no carrossel (abaixo de 1024px), só com a seção visível,
  // pausa ao tocar/arrastar/focar e respeita prefers-reduced-motion
  useEffect(() => {
    const track = trackRef.current;
    if (!track || reduce) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    let visible = false;

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0.5 });
    io.observe(track);

    const pause = () => (pausedUntil.current = Date.now() + RESUME_AFTER_MS);
    track.addEventListener("pointerdown", pause, { passive: true });
    track.addEventListener("touchstart", pause, { passive: true });
    track.addEventListener("wheel", pause, { passive: true });
    track.addEventListener("focusin", pause);

    const timer = window.setInterval(() => {
      if (mq.matches || !visible || document.hidden || Date.now() < pausedUntil.current) return;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      const cards = track.children.length;
      goTo(atEnd ? 0 : (currentRef.current + 1) % cards);
    }, AUTOPLAY_MS);

    return () => {
      window.clearInterval(timer);
      io.disconnect();
      track.removeEventListener("pointerdown", pause);
      track.removeEventListener("touchstart", pause);
      track.removeEventListener("wheel", pause);
      track.removeEventListener("focusin", pause);
    };
  }, [reduce, goTo]);

  return (
    <section id="equipe" aria-labelledby="equipe-title" className="relative overflow-hidden bg-linho py-24 text-cacau-900 sm:py-32 lg:py-40">
      <div className="container-site">
        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-12 md:items-end md:gap-x-8">
          <div className="md:col-span-7">
            <SectionLabel index="05">Equipe</SectionLabel>
            <RevealLines
              id="equipe-title"
              className="display mt-8 text-[clamp(2.6rem,9vw,4rem)] md:text-[clamp(3.5rem,6vw,5.75rem)]"
              lines={[
                <>As mãos por trás</>,
                <>
                  do <em className="italic text-bronze-600">atelier.</em>
                </>,
              ]}
            />
          </div>
          <Reveal delay={0.15} className="md:col-span-4 md:col-start-9">
            <p className="leading-relaxed text-cacau-900/75">
              Especialistas com olhar próprio, unidos pela mesma forma de trabalhar: com calma, precisão e honestidade
              sobre o que funciona para você.
            </p>
            <p className="label mt-5 text-cacau-900/45">Equipe fictícia · retratos ilustrativos</p>
          </Reveal>
        </div>
      </div>

      {/* Carrossel por toque no mobile, grid escalonado a partir do tablet largo */}
      <ul
        ref={trackRef}
        className="no-scrollbar relative mt-14 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4 xs:px-6 md:px-10 lg:mx-auto lg:mt-20 lg:grid lg:max-w-site lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:pb-0 xl:gap-8 xl:px-14"
        aria-label="Especialistas"
      >
        {team.map((m, i) => (
          <motion.li
            key={m.id}
            className={cn(
              "group w-[78%] shrink-0 snap-start xs:w-[70%] sm:w-[46%] lg:w-auto",
              i % 2 === 1 && "lg:pt-16",
            )}
            initial={{ opacity: 0, y: reduce ? 0 : 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1, ease: ease.expo, delay: i * 0.1 }}
          >
            <article>
              <div className="relative aspect-[4/5] overflow-hidden bg-cacau-900">
                <Image
                  src={m.image.src}
                  alt={m.image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 46vw, 78vw"
                  className="object-cover transition-transform duration-[1400ms] ease-expo group-hover:scale-[1.05]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-bronze-500 opacity-0 mix-blend-soft-light transition-opacity duration-700 group-hover:opacity-60"
                />
                <span className="label absolute left-4 top-4 text-linho/80">0{i + 1}</span>
              </div>
              <div className="pt-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-[1.6rem] leading-tight">{m.name}</h3>
                </div>
                <p className="label mt-2 text-bronze-600">{m.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-cacau-900/70">{m.bio}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {m.specialties.map((s) => (
                    <li key={s} className="rounded-full border border-cacau-900/15 px-3 py-1 text-xs text-cacau-900/75">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </motion.li>
        ))}
      </ul>
      {/* Indicadores do carrossel — mostram a passagem automática e permitem navegar */}
      <div className="container-site mt-5 flex items-center justify-between gap-6 lg:hidden">
        <p className="label hidden whitespace-nowrap text-cacau-900/45 xs:block" aria-hidden>
          Deslize para conhecer
        </p>
        <div className="ml-auto flex items-center gap-1.5" role="group" aria-label="Escolher especialista">
          {team.map((m, i) => (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                pausedUntil.current = Date.now() + RESUME_AFTER_MS;
                goTo(i);
              }}
              aria-label={`Ver ${m.name}`}
              aria-current={current === i ? "true" : undefined}
              className="grid h-11 w-8 place-items-center"
            >
              <span
                className={cn(
                  "block h-[2px] w-full rounded-full transition-colors duration-500",
                  current === i ? "bg-cacau-900" : "bg-cacau-900/20",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
