"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useState } from "react";
import { services } from "@/data/services";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealLines } from "@/components/ui/RevealLines";
import { Reveal } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Arrow";
import { useBooking } from "@/components/providers/BookingProvider";

export function Services() {
  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState<number | null>(0);
  const reduce = useReducedMotionSafe();
  const { requestBooking } = useBooking();
  const current = services[active];

  return (
    <section
      id="servicos"
      aria-labelledby="servicos-title"
      className="relative overflow-hidden bg-cacau-900 py-24 text-linho sm:py-32 lg:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[25%] -top-[10%] h-[80vmax] w-[80vmax] rounded-full opacity-50"
        style={{ background: "radial-gradient(closest-side, rgba(165,124,101,0.16), transparent)" }}
      />

      <div className="container-site relative">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7 lg:col-start-6">
            <SectionLabel index="02" tone="light">
              Serviços
            </SectionLabel>
            <RevealLines
              id="servicos-title"
              className="display mt-8 text-[clamp(2.6rem,9vw,4rem)] md:text-[clamp(3.5rem,6vw,5.75rem)]"
              lines={[
                <>Cada serviço,</>,
                <>
                  uma <em className="italic text-bronze-300">assinatura.</em>
                </>,
              ]}
            />
            <Reveal delay={0.2}>
              <p className="mt-7 max-w-md leading-relaxed text-linho/70">
                Seis frentes de cuidado, um mesmo princípio: entender você antes de propor qualquer técnica.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:mt-20 lg:grid-cols-12 lg:gap-x-10">
          {/* Painel fixo (desktop): imagem que troca com máscara + detalhes do serviço ativo */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[calc(var(--header-h)+2rem)]">
              <div className="relative aspect-[4/5] max-h-[calc(100svh-var(--header-h)-17rem)] w-full overflow-hidden bg-cacau-850">
                {services.map((s, i) => (
                  <motion.div
                    key={s.id}
                    className="absolute inset-0"
                    style={{ zIndex: i === active ? 2 : 1 }}
                    initial={false}
                    animate={{ clipPath: i === active ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
                    transition={
                      i === active
                        ? { duration: reduce ? 0 : 0.9, ease: ease.expo }
                        : { duration: 0, delay: reduce ? 0 : 0.9 }
                    }
                  >
                    <motion.div
                      className="absolute inset-0"
                      initial={false}
                      animate={{ scale: i === active || reduce ? 1 : 1.12 }}
                      transition={{ duration: 1.4, ease: ease.expo }}
                    >
                      <Image
                        src={s.image.src}
                        alt={s.image.alt}
                        fill
                        sizes="(min-width: 1440px) 560px, 40vw"
                        className="object-cover"
                        style={{ objectPosition: s.image.position }}
                      />
                    </motion.div>
                  </motion.div>
                ))}
                <div aria-hidden className="absolute inset-0 z-[3] bg-gradient-to-t from-cacau-950/70 via-transparent via-40%" />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={current.number}
                    aria-hidden
                    className="display absolute bottom-5 left-6 z-[4] text-[7rem] leading-none text-linho/90"
                    initial={{ y: reduce ? 0 : "40%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: reduce ? 0 : "-30%", opacity: 0 }}
                    transition={{ duration: 0.6, ease: ease.expo }}
                  >
                    {current.number}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="relative mt-7 min-h-[11rem]" aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                    transition={{ duration: 0.45, ease: ease.expo }}
                  >
                    <p className="max-w-md text-[0.95rem] leading-relaxed text-linho/75">{current.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {current.highlights.map((h) => (
                        <li key={h} className="rounded-full border border-linho/15 px-3.5 py-1.5 text-xs text-linho/80">
                          {h}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => requestBooking(current.id)}
                      className="link-draw mt-6 inline-flex items-center gap-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-bronze-200"
                    >
                      Simular agendamento <Arrow className="w-5" />
                    </button>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Lista editorial */}
          <ul className="border-t border-linho/15 lg:col-span-7">
            {services.map((s, i) => {
              const isActive = active === i;
              const isOpen = mobileOpen === i;
              return (
                <li key={s.id} className="border-b border-linho/15">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => {
                      setActive(i);
                      setMobileOpen((v) => (v === i ? null : i));
                    }}
                    aria-expanded={isOpen}
                    aria-controls={`servico-${s.id}`}
                    className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-x-3 py-6 text-left sm:grid-cols-[4rem_1fr_auto] lg:py-8"
                  >
                    <span
                      className={cn(
                        "font-display text-sm italic transition-colors duration-500",
                        isActive ? "text-bronze-300" : "text-linho/40",
                      )}
                    >
                      {s.number}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={cn(
                          "display block text-[clamp(1.7rem,7vw,2.4rem)] leading-[1.05] transition-all duration-700 ease-expo sm:text-[2.6rem] lg:text-[clamp(2.4rem,3.4vw,3.4rem)]",
                          isActive ? "text-linho lg:translate-x-4 lg:italic lg:text-bronze-200" : "text-linho/55 lg:group-hover:text-linho/80",
                          isOpen && "text-linho",
                        )}
                      >
                        {s.name}
                      </span>
                      <span className="mt-1.5 block text-sm text-linho/50 lg:hidden">{s.short}</span>
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "grid h-11 w-11 place-items-center rounded-full border transition-all duration-500 ease-expo",
                        isActive ? "border-bronze-300 bg-bronze-300 text-cacau-900" : "border-linho/20 text-linho/60",
                      )}
                    >
                      <Arrow className={cn("w-4 transition-transform duration-500 ease-expo lg:rotate-0", isOpen ? "rotate-90" : "")} />
                    </span>
                  </button>

                  {/* Detalhe no mobile/tablet — acordeão com fotografia */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`servico-${s.id}`}
                        className="overflow-hidden lg:hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: ease.expo }}
                      >
                        <div className="grid gap-6 pb-8 sm:grid-cols-2 sm:gap-8">
                          <div className="relative aspect-[4/3] overflow-hidden bg-cacau-850 sm:aspect-[4/5]">
                            <Image
                              src={s.image.src}
                              alt={s.image.alt}
                              fill
                              sizes="(min-width: 640px) 45vw, 100vw"
                              className="object-cover"
                              style={{ objectPosition: s.image.position }}
                            />
                          </div>
                          <div className="flex flex-col">
                            <p className="leading-relaxed text-linho/75">{s.description}</p>
                            <ul className="mt-5 flex flex-wrap gap-2">
                              {s.highlights.map((h) => (
                                <li key={h} className="rounded-full border border-linho/15 px-3.5 py-1.5 text-xs text-linho/80">
                                  {h}
                                </li>
                              ))}
                            </ul>
                            <button
                              type="button"
                              onClick={() => requestBooking(s.id)}
                              className="link-draw mt-7 inline-flex items-center gap-3 self-start py-2 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-bronze-200"
                            >
                              Simular agendamento <Arrow className="w-5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
