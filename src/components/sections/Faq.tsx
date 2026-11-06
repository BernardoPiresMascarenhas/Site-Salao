"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import { faq } from "@/data/faq";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealLines } from "@/components/ui/RevealLines";
import { Reveal } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Arrow";
import { useBooking } from "@/components/providers/BookingProvider";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  const { requestBooking } = useBooking();

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative bg-linho py-24 text-cacau-900 sm:py-32 lg:py-40">
      <div className="container-site grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
            <SectionLabel index="07">Dúvidas</SectionLabel>
            <RevealLines
              id="faq-title"
              className="display mt-8 text-[clamp(2.6rem,9vw,4rem)] md:text-[clamp(3.5rem,5.4vw,5.25rem)]"
              lines={[
                <>Perguntas</>,
                <>
                  <em className="italic text-bronze-600">frequentes.</em>
                </>,
              ]}
            />
            <Reveal delay={0.15}>
              <p className="mt-7 max-w-sm leading-relaxed text-cacau-900/70">
                O essencial sobre o funcionamento do AURÉ — e sobre o caráter conceitual deste projeto.
              </p>
              <button
                type="button"
                onClick={() => requestBooking()}
                className="link-draw mt-8 inline-flex items-center gap-3 py-2 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-bronze-700"
              >
                Experimentar o agendamento <Arrow className="w-5" />
              </button>
            </Reveal>
          </div>
        </div>

        <ul className="border-t border-cacau-900/15 lg:col-span-7">
          {faq.map((item, i) => {
            const isOpen = open === i;
            const btnId = `${baseId}-q${i}`;
            const panelId = `${baseId}-a${i}`;
            return (
              <Reveal as="li" key={item.q} delay={i * 0.05} y={16} className="border-b border-cacau-900/15">
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group grid w-full grid-cols-[2.25rem_1fr_auto] items-center gap-x-3 py-6 text-left sm:grid-cols-[3rem_1fr_auto] sm:py-7"
                  >
                    <span className="font-display text-sm italic text-bronze-600">0{i + 1}</span>
                    <span
                      className={cn(
                        "font-display text-[1.3rem] leading-snug transition-colors duration-300 sm:text-[1.6rem]",
                        isOpen ? "text-cacau-900" : "text-cacau-900/80 group-hover:text-cacau-900",
                      )}
                    >
                      {item.q}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "relative grid h-10 w-10 place-items-center rounded-full border transition-colors duration-500",
                        isOpen ? "border-cacau-900 bg-cacau-900 text-linho" : "border-cacau-900/20 group-hover:border-cacau-900/50",
                      )}
                    >
                      <span className="absolute h-px w-3.5 bg-current" />
                      <span
                        className={cn(
                          "absolute h-3.5 w-px bg-current transition-transform duration-500 ease-expo",
                          isOpen && "rotate-90 scale-y-0",
                        )}
                      />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: ease.expo }}
                    >
                      <p className="max-w-2xl pb-7 pl-[3.25rem] pr-4 leading-relaxed text-cacau-900/70 sm:pl-[3.75rem] sm:pr-14">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
