"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useEffect, useRef, useState } from "react";
import type { GalleryItem } from "@/data/gallery";
import { galleryFilters } from "@/data/gallery";
import { ease } from "@/lib/motion";
import { Arrow } from "@/components/ui/Arrow";

type Props = {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
};

const categoryLabel = (id: string) => galleryFilters.find((f) => f.id === id)?.label ?? id;

export function Lightbox({ items, index, onClose, onIndexChange }: Props) {
  const reduce = useReducedMotionSafe();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [direction, setDirection] = useState(0);
  // Evita que o "click" disparado ao soltar um arraste feche a visualização
  const draggedRef = useRef(false);
  const open = index !== null;
  const item = open ? items[index] : null;

  // Ref garante que o atalho de teclado sempre use o índice atual
  const indexRef = useRef(index);
  indexRef.current = index;

  const go = (delta: number) => {
    const current = indexRef.current;
    if (current === null) return;
    setDirection(delta);
    onIndexChange((current + delta + items.length) % items.length);
  };

  // Teclado, trava de rolagem, foco inicial e restauração do foco
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      root.style.overflow = prevOverflow;
      previouslyFocused?.focus({ preventScroll: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Imagem ampliada: ${item.title}`}
          className="fixed inset-0 z-[100] flex flex-col bg-cacau-950 text-linho"
          style={{ paddingTop: "var(--safe-top)", paddingBottom: "var(--safe-bottom)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: ease.soft }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div className="container-site flex h-16 shrink-0 items-center justify-between sm:h-20">
            <p className="label text-linho/60" aria-live="polite">
              <span className="text-linho">{String(index + 1).padStart(2, "0")}</span> / {String(items.length).padStart(2, "0")}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="group -mr-3 flex h-12 items-center gap-3 px-3"
              aria-label="Fechar visualização"
            >
              <span className="label hidden text-[0.65rem] sm:inline">Fechar</span>
              <span aria-hidden className="relative block h-5 w-5">
                <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-current transition-transform duration-500 group-hover:rotate-[135deg]" />
                <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-current transition-transform duration-500 group-hover:rotate-45" />
              </span>
            </button>
          </div>

          <div
            className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-4 sm:px-20"
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={item.id}
                custom={direction}
                className="relative h-full max-h-[78svh] w-full max-w-6xl touch-pan-y"
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: direction * 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: direction * -80 }}
                transition={{ duration: 0.6, ease: ease.expo }}
                drag={reduce ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragStart={() => {
                  draggedRef.current = true;
                }}
                onDragEnd={(_, info) => {
                  window.setTimeout(() => (draggedRef.current = false), 0);
                  if (info.offset.x < -70) go(1);
                  else if (info.offset.x > 70) go(-1);
                }}
                onClick={(e) => {
                  // toque fora da área da foto (letterbox) também fecha — exceto ao final de um arraste
                  if (draggedRef.current) return;
                  const r = e.currentTarget.getBoundingClientRect();
                  const ratio = item.width / item.height;
                  let w = r.width;
                  let h = w / ratio;
                  if (h > r.height) {
                    h = r.height;
                    w = h * ratio;
                  }
                  const x0 = r.left + (r.width - w) / 2;
                  const y0 = r.top + (r.height - h) / 2;
                  const inside = e.clientX >= x0 && e.clientX <= x0 + w && e.clientY >= y0 && e.clientY <= y0 + h;
                  if (!inside) onClose();
                }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1280px) 1152px, 100vw"
                  className="pointer-events-none select-none object-contain"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Imagem anterior"
              className="absolute left-4 top-1/2 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-linho/20 transition-colors duration-300 hover:bg-linho hover:text-cacau-900 sm:grid"
            >
              <Arrow direction="left" className="w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Próxima imagem"
              className="absolute right-4 top-1/2 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-linho/20 transition-colors duration-300 hover:bg-linho hover:text-cacau-900 sm:grid"
            >
              <Arrow className="w-5" />
            </button>
          </div>

          <div className="container-site flex shrink-0 items-center justify-between gap-4 py-5 sm:py-6">
            <div className="min-w-0">
              <p className="font-display text-xl sm:text-2xl">{item.title}</p>
              <p className="label mt-1.5 text-bronze-300">{categoryLabel(item.category)} · Imagem ilustrativa</p>
            </div>
            <div className="flex shrink-0 gap-2 sm:hidden">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Imagem anterior"
                className="grid h-12 w-12 place-items-center rounded-full border border-linho/20 active:bg-linho active:text-cacau-900"
              >
                <Arrow direction="left" className="w-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Próxima imagem"
                className="grid h-12 w-12 place-items-center rounded-full border border-linho/20 active:bg-linho active:text-cacau-900"
              >
                <Arrow className="w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
