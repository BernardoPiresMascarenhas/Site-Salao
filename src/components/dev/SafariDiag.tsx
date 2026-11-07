"use client";

import { useEffect, useState } from "react";

/**
 * TEMPORÁRIO — painel de diagnóstico do header no Safari iOS 26 (?teste=diag).
 * Imita a checagem que o Safari faz para colorir a barra de status: pega o que está no topo, no centro
 * da tela, e sobe até o primeiro ancestral fixed/sticky. Fica no rodapé, fora da área analisada.
 * Remover após a validação.
 */
function describe(el: Element) {
  const id = el.id ? `#${el.id}` : "";
  const cls = typeof el.className === "string" && el.className ? `.${el.className.trim().split(/\s+/).slice(0, 3).join(".")}` : "";
  return `${el.tagName.toLowerCase()}${id}${cls}`.slice(0, 60);
}

export function SafariDiag() {
  const [on, setOn] = useState(false);
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    setOn(document.documentElement.dataset.teste?.split(" ").includes("diag") ?? false);
  }, []);

  useEffect(() => {
    if (!on) return;
    const probe = document.createElement("div");
    probe.style.cssText = "position:fixed;left:0;top:0;width:1px;visibility:hidden;pointer-events:none;padding-top:env(safe-area-inset-top,0px)";
    document.body.appendChild(probe);

    let raf = 0;
    const update = () => {
      raf = 0;
      const x = innerWidth / 2;
      const stack = document.elementsFromPoint(x, 4);
      let pinned: Element | null = null;
      for (let el: Element | null = stack[0] ?? null; el; el = el.parentElement) {
        const p = getComputedStyle(el).position;
        if (p === "fixed" || p === "sticky") {
          pinned = el;
          break;
        }
      }
      const ps = pinned ? getComputedStyle(pinned) : null;
      const r = pinned?.getBoundingClientRect();
      const grain = getComputedStyle(document.body, "::after");
      const meta = document.querySelector('meta[name="viewport"]')?.getAttribute("content") ?? "";
      const vv = window.visualViewport;
      setLines([
        `build de teste v3 · teste: ${document.documentElement.dataset.teste} · ${location.pathname}`,
        `viewport: ${meta.includes("cover") ? "cover" : "SEM cover"} · safe-top: ${getComputedStyle(probe).paddingTop}`,
        `scrollY ${Math.round(scrollY)} · innerH ${innerHeight} · vv ${vv ? `${Math.round(vv.height)} off ${Math.round(vv.offsetTop)}` : "-"}`,
        `topo (centro, y=4): ${stack.slice(0, 3).map(describe).join(" > ") || "nada"}`,
        pinned && ps && r
          ? `fixo/sticky: ${describe(pinned)} · ${ps.position} top ${Math.round(r.top)} w ${Math.round((r.width / innerWidth) * 100)}% h ${Math.round(r.height)}`
          : "fixo/sticky: NENHUM",
        ps ? `  bg ${ps.backgroundColor} · blur ${ps.backdropFilter || (ps as unknown as Record<string, string>).webkitBackdropFilter || "-"}` : "",
        `blur na pilha do topo: ${
          stack
            .filter((el) => {
              const cs = getComputedStyle(el) as CSSStyleDeclaration & { webkitBackdropFilter?: string };
              return (cs.backdropFilter && cs.backdropFilter !== "none") || (cs.webkitBackdropFilter && cs.webkitBackdropFilter !== "none");
            })
            .map(describe)
            .join(", ") || "nenhum"
        }`,
        `grão ::after: ${grain.display === "none" ? "desligado" : `${grain.position} z ${grain.zIndex}`}`,
      ]);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const vv = window.visualViewport;
    update();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    vv?.addEventListener("resize", schedule);
    return () => {
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      vv?.removeEventListener("resize", schedule);
      probe.remove();
      cancelAnimationFrame(raf);
    };
  }, [on]);

  if (!on) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-[calc(var(--safe-bottom)+5.5rem)] left-2 z-[200] w-[72%] rounded-md bg-black/85 p-2 font-mono text-[10px] leading-snug text-lime-300"
    >
      {lines.filter(Boolean).map((l, i) => (
        <div key={i} className="break-all">
          {l}
        </div>
      ))}
    </div>
  );
}
