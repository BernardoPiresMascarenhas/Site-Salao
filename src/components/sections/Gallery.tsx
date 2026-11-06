"use client";

import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useMemo, useState } from "react";
import { gallery, galleryFilters, type GalleryCategory } from "@/data/gallery";
import { site } from "@/data/site";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealLines } from "@/components/ui/RevealLines";
import { Lightbox } from "./Lightbox";

const shapeClass = {
  tall: "row-span-2",
  wide: "col-span-2",
  square: "",
} as const;

export function Gallery() {
  const [filter, setFilter] = useState<"todos" | GalleryCategory>("todos");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduce = useReducedMotionSafe();

  const items = useMemo(() => (filter === "todos" ? gallery : gallery.filter((g) => g.category === filter)), [filter]);

  return (
    <section id="galeria" aria-labelledby="galeria-title" className="relative bg-linho py-24 text-cacau-900 sm:py-32 lg:py-40">
      <div className="container-site">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel index="04">Galeria</SectionLabel>
            <RevealLines
              id="galeria-title"
              className="display mt-8 text-[clamp(3rem,13vw,4.5rem)] md:text-[clamp(4.5rem,8vw,7.5rem)]"
              lines={[
                <>Nosso</>,
                <>
                  <em className="italic text-bronze-600">universo</em>
                </>,
              ]}
            />
          </div>

          <LayoutGroup id="gallery-filters">
            <div
              role="toolbar"
              aria-label="Filtrar galeria por categoria"
              className="no-scrollbar -mx-5 flex gap-1 overflow-x-auto px-5 xs:-mx-6 xs:px-6 md:mx-0 md:px-0 lg:pb-3"
            >
              {galleryFilters.map((f) => {
                const selected = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      setFilter(f.id);
                      setOpenIndex(null);
                    }}
                    className={cn(
                      "relative shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300",
                      selected ? "text-linho" : "text-cacau-900/70 hover:text-cacau-900",
                    )}
                  >
                    {selected && (
                      <motion.span
                        layoutId="gallery-filter-pill"
                        className="absolute inset-0 -z-0 rounded-full bg-cacau-900"
                        transition={{ duration: reduce ? 0 : 0.6, ease: ease.expo }}
                      />
                    )}
                    <span className="relative">{f.label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>

        <motion.ul
          layout
          className="mt-12 grid grid-flow-dense auto-rows-[10.5rem] grid-cols-2 gap-2.5 xs:auto-rows-[12rem] sm:auto-rows-[15rem] sm:gap-3 md:grid-cols-3 lg:mt-16 lg:auto-rows-[17rem] lg:grid-cols-4 lg:gap-4 xl:auto-rows-[19.5rem]"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((item, i) => (
              <motion.li
                key={item.id}
                layout={!reduce}
                className={cn("relative", shapeClass[item.shape])}
                initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
                transition={{ duration: 0.6, ease: ease.expo }}
              >
                <motion.button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  aria-label={`Ampliar imagem: ${item.title}`}
                  className="group relative block h-full w-full overflow-hidden bg-areia text-left"
                  initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                  whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  viewport={{ once: true, margin: "0px 0px -6% 0px" }}
                  transition={reduce ? { duration: 0 } : { duration: 1.2, ease: ease.expo, delay: (i % 4) * 0.08 }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes={
                      item.shape === "wide"
                        ? "(min-width: 1024px) 50vw, (min-width: 768px) 66vw, 100vw"
                        : "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    }
                    className="object-cover transition-transform duration-[1400ms] ease-expo group-hover:scale-[1.06] group-focus-visible:scale-[1.06]"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-cacau-950/75 via-cacau-950/0 via-45% to-transparent transition-opacity duration-500 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:opacity-100"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 text-linho transition-all duration-500 ease-expo sm:p-5 [@media(hover:hover)]:translate-y-3 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:translate-y-0 [@media(hover:hover)]:group-focus-visible:opacity-100">
                    <span className="min-w-0">
                      <span className="block truncate font-display text-base sm:text-xl">{item.title}</span>
                      <span className="label mt-1 hidden text-[0.6rem] text-linho/70 sm:block">
                        {galleryFilters.find((f) => f.id === item.category)?.label}
                      </span>
                    </span>
                    <span className="hidden h-10 w-10 shrink-0 place-items-center rounded-full bg-linho text-cacau-900 sm:grid">
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
                        <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                    </span>
                  </span>
                </motion.button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <p className="mt-8 max-w-xl text-xs leading-relaxed text-cacau-900/55">
          {site.photoCredit} Toque ou clique em uma imagem para ampliar.
        </p>
      </div>

      <Lightbox items={items} index={openIndex} onClose={() => setOpenIndex(null)} onIndexChange={setOpenIndex} />
    </section>
  );
}
