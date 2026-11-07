"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { getScrollRoot, useScrollContainer } from "@/lib/scrollContainer";
import { useCallback, useEffect, useRef, useState } from "react";
import { BOOKING_HREF, nav, site } from "@/data/site";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/ui/Logo";
import { Arrow } from "@/components/ui/Arrow";

function scrollToHash(hash: string, reduce: boolean | null) {
  const el = document.querySelector(hash);
  if (!el) return;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", hash);
}

export function Header() {
  const container = useScrollContainer();
  const { scrollY } = useScroll({ container, layoutEffect: false });
  const reduce = useReducedMotionSafe();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Header sempre visível; apenas o fundo muda ao iniciar a rolagem
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Destaca o item de navegação da seção visível
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Menu mobile: trava a rolagem, isola o conteúdo, fecha com Escape e mantém o foco dentro do header
  useEffect(() => {
    if (!open) return;
    // trava o elemento que rola: documento (padrão) ou contêiner do app-shell
    const root = getScrollRoot(container);
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    const outside = [document.getElementById("conteudo"), document.querySelector("footer")];
    outside.forEach((el) => el?.setAttribute("inert", ""));

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && headerRef.current) {
        const focusables = headerRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
        const visible = Array.from(focusables).filter((el) => el.offsetParent !== null);
        const first = visible[0];
        const last = visible[visible.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prevOverflow;
      outside.forEach((el) => el?.removeAttribute("inert"));
      window.removeEventListener("keydown", onKey);
    };
  }, [open, container]);

  // Fecha o menu se a tela crescer para o layout desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const handleNav = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      if (open) {
        setOpen(false);
        // aguarda a liberação da rolagem antes de navegar
        window.setTimeout(() => scrollToHash(href, reduce), 60);
      } else {
        scrollToHash(href, reduce);
      }
    },
    [open, reduce],
  );

  const solid = scrolled || open;

  return (
    <header
      ref={headerRef}
      id="site-header"
      className={cn(
        "fixed inset-x-0 top-0 z-50 text-linho transition-[background-color] duration-700 ease-expo",
        // Fundo sólido no próprio header ao rolar (mantido como na versão validada no iPhone;
        // a correção da barra de status do Safari iOS 26 é o app-shell — ver @/lib/scrollContainer).
        solid ? "bg-cacau-950" : "bg-transparent",
      )}
      style={{ paddingTop: "var(--safe-top)" }}
    >
      <a
        href="#conteudo"
        className="label absolute left-4 top-3 z-[60] -translate-y-24 rounded-full bg-linho px-4 py-3 text-cacau-900 focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>

      {/* Com safe-area-inset-top > 0 (paisagem / app instalado), a faixa da barra de status também fica opaca */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 -z-10 bg-cacau-950 transition-opacity duration-700 ease-expo",
          solid ? "opacity-100" : "opacity-0",
        )}
        style={{ height: "var(--safe-top)" }}
      />

      {/* Fundo que surge ao rolar — sólido o bastante para manter contraste sobre qualquer seção */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 transition-[background-color,opacity] duration-700 ease-expo",
          solid ? "bg-cacau-950/[0.92] shadow-[0_1px_0_rgba(248,244,239,0.08)] backdrop-blur-md" : "bg-transparent",
        )}
      />
      {/* Véu suave sobre a Hero: garante contraste da navegação sem criar uma borda visível */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 -z-10 h-[180%] bg-gradient-to-b from-cacau-950/60 via-cacau-950/25 to-transparent transition-opacity duration-700",
          solid ? "opacity-0" : "opacity-100",
        )}
      />

      <div className="container-site flex h-[var(--header-h)] items-center justify-between gap-6">
        <a
          href="#inicio"
          onClick={(e) => handleNav(e, "#inicio")}
          className="relative z-10 -my-2 py-2"
          aria-label={`${site.name} — voltar ao início`}
        >
          <Logo />
        </a>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-3">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNav(e, item.href)}
                  aria-current={active === item.href ? "location" : undefined}
                  className={cn(
                    "group relative inline-flex items-center px-3 py-2 text-[0.8125rem] font-medium tracking-[0.04em] transition-colors duration-300",
                    active === item.href ? "text-linho" : "text-linho/70 hover:text-linho",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-3 bottom-1 h-px origin-left bg-bronze-300 transition-transform duration-500 ease-expo",
                      active === item.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={BOOKING_HREF}
            onClick={(e) => handleNav(e, BOOKING_HREF)}
            className="btn btn-outline-light hidden min-h-[2.75rem] px-6 text-[0.7rem] sm:inline-flex"
          >
            Agendar horário
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="relative z-10 -mr-2 flex h-12 items-center gap-3 px-2 lg:hidden"
          >
            <span className="label text-[0.65rem]">{open ? "Fechar" : "Menu"}</span>
            <span aria-hidden className="relative block h-3 w-7">
              <span
                className={cn(
                  "absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-expo",
                  open ? "top-1/2 rotate-[25deg]" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-px bg-current transition-all duration-500 ease-expo",
                  open ? "top-1/2 w-full -rotate-[25deg]" : "top-full w-4",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="fixed inset-0 -z-20 flex flex-col bg-cacau-950 lg:hidden"
            style={{ paddingTop: "calc(var(--header-h) + var(--safe-top))" }}
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.8, ease: ease.expo }}
          >
            {/* Brilho quente de fundo */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-1/3 top-1/4 h-[70vmax] w-[70vmax] rounded-full opacity-40"
              style={{ background: "radial-gradient(closest-side, rgba(165,124,101,0.35), transparent)" }}
            />
            <nav aria-label="Menu" className="container-site relative flex flex-1 flex-col overflow-y-auto pb-6 pt-6">
              <ul className="flex flex-col">
                {nav.map((item, i) => (
                  <li key={item.href} className="overflow-hidden border-b border-linho/10">
                    <motion.a
                      href={item.href}
                      onClick={(e) => handleNav(e, item.href)}
                      className="group flex items-baseline justify-between py-3.5 xs:py-4"
                      initial={reduce ? { opacity: 0 } : { y: "110%" }}
                      animate={reduce ? { opacity: 1 } : { y: "0%" }}
                      transition={{ duration: 0.9, ease: ease.expo, delay: 0.15 + i * 0.06 }}
                    >
                      <span className="display text-[2.5rem] leading-none text-linho transition-colors duration-300 group-hover:text-bronze-300 xs:text-[2.85rem]">
                        {item.label}
                      </span>
                      <span className="font-display text-sm italic text-bronze-300">0{i + 1}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>

              <motion.div
                className="mt-auto flex flex-col gap-6 pt-10"
                initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: ease.expo, delay: 0.55 }}
              >
                <a href={BOOKING_HREF} onClick={(e) => handleNav(e, BOOKING_HREF)} className="btn btn-bronze w-full">
                  Agendar horário <Arrow className="btn-arrow" />
                </a>
                <p className="text-xs leading-relaxed text-linho/50" style={{ paddingBottom: "var(--safe-bottom)" }}>
                  {site.tagline} · Projeto conceitual de portfólio
                </p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
