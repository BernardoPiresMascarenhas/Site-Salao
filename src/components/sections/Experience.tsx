"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useState } from "react";
import { experience } from "@/data/experience";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealLines } from "@/components/ui/RevealLines";
import { Reveal } from "@/components/ui/Reveal";

export function Experience() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotionSafe();

  return (
    <section id="experiencia" aria-labelledby="experiencia-title" className="relative bg-areia py-24 text-cacau-900 sm:py-32 lg:py-40">
      <div className="container-site">
        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-12 md:items-end md:gap-x-8">
          <div className="md:col-span-7">
            <SectionLabel index="03">Experiência AURÉ</SectionLabel>
            <RevealLines
              id="experiencia-title"
              className="display mt-8 text-[clamp(2.6rem,9vw,4rem)] md:text-[clamp(3.5rem,6vw,5.75rem)]"
              lines={[
                <>Três tempos</>,
                <>
                  de um mesmo <em className="italic text-bronze-600">ritual.</em>
                </>,
              ]}
            />
          </div>
          <Reveal delay={0.15} className="md:col-span-4 md:col-start-9">
            <p className="leading-relaxed text-cacau-900/75">
              Uma visita ao AURÉ tem começo, meio e cuidado contínuo. Cada momento foi pensado para que você entenda o
              que está sendo feito — e por quê.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:mt-24 lg:grid-cols-12 lg:gap-x-10">
          {/* Quadro em arco fixo (desktop) */}
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-[calc(var(--header-h)+2.5rem)] flex h-[calc(100svh-var(--header-h)-5rem)] items-center">
              <div className="relative h-full max-h-[44rem] w-full">
                <div className="relative mx-auto aspect-[4/5] h-full max-w-full overflow-hidden rounded-t-full bg-cacau-900/10">
                  {experience.map((step, i) => (
                    <motion.div
                      key={step.number}
                      className="absolute inset-0"
                      style={{ zIndex: i === active ? 2 : 1 }}
                      initial={false}
                      animate={{ clipPath: i === active ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" }}
                      transition={i === active ? { duration: reduce ? 0 : 1.1, ease: ease.expo } : { duration: 0, delay: reduce ? 0 : 1.1 }}
                    >
                      <motion.div
                        className="absolute inset-0"
                        initial={false}
                        animate={{ scale: i === active || reduce ? 1 : 1.15 }}
                        transition={{ duration: 1.6, ease: ease.expo }}
                      >
                        <Image
                          src={step.image.src}
                          alt={step.image.alt}
                          fill
                          sizes="(min-width: 1440px) 600px, 45vw"
                          className="object-cover"
                          style={{ objectPosition: step.image.position }}
                        />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                {/* Numeral gigante com troca animada — dentro do arco, sobre um véu escuro */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute bottom-0 left-1/2 z-10 aspect-[4/5] h-full max-w-full -translate-x-1/2"
                >
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-cacau-950/70 to-transparent" />
                  <div className="absolute bottom-6 left-8 h-[9.5rem] overflow-hidden xl:h-[11rem]">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={active}
                        className="display block text-[9.5rem] leading-none text-linho xl:text-[11rem]"
                        initial={{ y: reduce ? 0 : "100%", opacity: reduce ? 0 : 1 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: reduce ? 0 : "-100%", opacity: reduce ? 0 : 1 }}
                        transition={{ duration: 0.9, ease: ease.expo }}
                      >
                        {experience[active].number}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <p className="label absolute bottom-10 right-8 text-linho/80">{experience[active].title}</p>
                </div>

                <div className="absolute -left-2 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-3" aria-hidden>
                  {experience.map((s, i) => (
                    <span
                      key={s.number}
                      className={cn(
                        "block w-px bg-cacau-900 transition-all duration-700 ease-expo",
                        i === active ? "h-12 opacity-90" : "h-5 opacity-25",
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Etapas */}
          <ol className="flex flex-col gap-20 sm:gap-24 lg:col-span-5 lg:col-start-8 lg:gap-0">
            {experience.map((step, i) => (
              <motion.li
                key={step.number}
                onViewportEnter={() => setActive(i)}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                className="flex flex-col lg:min-h-[85svh] lg:justify-center"
              >
                {/* Imagem da etapa no mobile/tablet */}
                <div className="relative mb-9 lg:hidden">
                  <Reveal className="relative mx-auto aspect-[4/5] w-[86%] max-w-md overflow-hidden rounded-t-full sm:w-[70%]">
                    <Image
                      src={step.image.src}
                      alt={step.image.alt}
                      fill
                      sizes="(min-width: 640px) 60vw, 86vw"
                      className="object-cover"
                      style={{ objectPosition: step.image.position }}
                    />
                    <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-cacau-950/70 to-transparent" />
                    <span aria-hidden className="display absolute bottom-4 left-5 text-[6rem] leading-none text-linho sm:text-[7.5rem]">
                      {step.number}
                    </span>
                  </Reveal>

                </div>

                <div
                  className={cn(
                    "transition-opacity duration-700 ease-expo",
                    active === i ? "lg:opacity-100" : "lg:opacity-35",
                  )}
                >
                  <p className="label text-bronze-600">Momento {step.number}</p>
                  <h3 className="display mt-4 text-[clamp(2.2rem,8vw,3rem)] lg:text-[clamp(2.6rem,3.6vw,3.6rem)]">{step.title}</h3>
                  <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-cacau-900/75">{step.text}</p>
                  <ul className="mt-7 flex flex-col border-t border-cacau-900/15">
                    {step.points.map((p) => (
                      <li key={p} className="flex items-center gap-3 border-b border-cacau-900/15 py-3.5 text-sm text-cacau-900/80">
                        <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-bronze-500" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
