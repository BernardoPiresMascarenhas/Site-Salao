"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type BookingContextValue = {
  /** Serviço pré-selecionado a partir de outra seção (ex.: lista de serviços) */
  preselectedService: string | null;
  requestBooking: (serviceId?: string) => void;
  consumePreselection: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [preselectedService, setPreselected] = useState<string | null>(null);

  const requestBooking = useCallback((serviceId?: string) => {
    if (serviceId) setPreselected(serviceId);
    document.getElementById("agendamento")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const consumePreselection = useCallback(() => setPreselected(null), []);

  const value = useMemo(
    () => ({ preselectedService, requestBooking, consumePreselection }),
    [preselectedService, requestBooking, consumePreselection],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking deve ser usado dentro de BookingProvider");
  return ctx;
}
