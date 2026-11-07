"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

/**
 * App-shell para o Safari iOS 26.
 *
 * No iOS 26 o Safari desenha o conteúdo que rola por trás da barra de status (acima do header fixo).
 * Com o documento travado e o conteúdo rolando dentro de #scroll-root, não há conteúdo do documento
 * para aparecer ali e a área fica com o fundo escuro do body. Validado no iPhone 17 (iOS 26.4.1).
 *
 * Só é ativado em iPhone/iPad (classe `app-shell` no <html>, aplicada antes da pintura pelo
 * script do layout). Nos demais navegadores #scroll-root é um bloco comum e a janela rola.
 */
const ScrollContainerContext = createContext<RefObject<HTMLElement> | null>(null);

/**
 * Ref do contêiner que rola, para passar ao `useScroll({ container, layoutEffect: false })`.
 * undefined = janela. `layoutEffect: false` porque a ref do #scroll-root só é preenchida depois
 * dos layout effects dos componentes filhos.
 */
export function useScrollContainer(): RefObject<HTMLElement> | undefined {
  return useContext(ScrollContainerContext) ?? undefined;
}

/** Elemento que realmente rola: o contêiner do app-shell ou o documento. */
export function getScrollRoot(container?: RefObject<HTMLElement>): HTMLElement {
  return container?.current ?? document.documentElement;
}

/** Header fixo fora do contêiner; todo o conteúdo fica dentro de #scroll-root. */
export function AppShell({ header, children }: { header: ReactNode; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(document.documentElement.classList.contains("app-shell"));
  }, []);

  return (
    <ScrollContainerContext.Provider value={active ? ref : null}>
      {header}
      <div id="scroll-root" ref={ref}>
        {children}
      </div>
    </ScrollContainerContext.Provider>
  );
}
