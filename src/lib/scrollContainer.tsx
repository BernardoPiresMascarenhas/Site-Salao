"use client";

import { createContext, useContext, useRef, type ReactNode, type RefObject } from "react";

/**
 * Contêiner de rolagem do "app-shell" (versão de teste para o Safari iOS 26).
 * Fora do app-shell o valor é undefined e tudo continua usando a rolagem da janela.
 */
const ScrollContainerContext = createContext<RefObject<HTMLElement> | null>(null);

/**
 * Ref do contêiner que rola, para passar ao `useScroll({ container, layoutEffect: !container })`.
 * undefined = janela. Com contêiner o Framer liga a rolagem num effect comum, porque a ref do
 * #scroll-root só é preenchida depois dos layout effects dos componentes filhos.
 */
export function useScrollContainer(): RefObject<HTMLElement> | undefined {
  return useContext(ScrollContainerContext) ?? undefined;
}

/** Elemento que realmente rola: o contêiner do app-shell ou o documento. */
export function getScrollRoot(container?: RefObject<HTMLElement>): HTMLElement {
  return container?.current ?? document.documentElement;
}

/**
 * Header fixo fora do contêiner; todo o conteúdo rola dentro de #scroll-root.
 * O html/body ficam travados (classe `app-shell`, aplicada pela rota de teste).
 */
export function AppShell({ header, overlay, children }: { header: ReactNode; overlay?: ReactNode; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <ScrollContainerContext.Provider value={ref}>
      {header}
      <div id="scroll-root" ref={ref}>
        {children}
      </div>
      {overlay}
    </ScrollContainerContext.Provider>
  );
}
