"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useEffect, useMemo, useRef, useState } from "react";
import { services } from "@/data/services";
import { team } from "@/data/team";
import { site } from "@/data/site";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealLines } from "@/components/ui/RevealLines";
import { Reveal } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Arrow";
import { useBooking } from "@/components/providers/BookingProvider";

const STEPS = ["Serviço", "Profissional", "Data e horário", "Revisão"] as const;
/** Horários puramente ilustrativos — não representam disponibilidade real. */
const TIMES = ["09:30", "11:00", "13:30", "15:00", "16:30", "18:00"];
const ANY = "sem-preferencia";

type DateOption = { iso: string; weekday: string; day: string; month: string; full: string };

function buildDates(count = 8): DateOption[] {
  const out: DateOption[] = [];
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  while (out.length < count) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) continue; // domingo fora do exemplo
    out.push({
      iso: d.toISOString().slice(0, 10),
      weekday: new Intl.DateTimeFormat("pt-BR", { weekday: "short" }).format(d).replace(".", ""),
      day: new Intl.DateTimeFormat("pt-BR", { day: "2-digit" }).format(d),
      month: new Intl.DateTimeFormat("pt-BR", { month: "short" }).format(d).replace(".", ""),
      full: new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "numeric", month: "long" }).format(d),
    });
  }
  return out;
}

export function Booking() {
  const reduce = useReducedMotionSafe();
  const { preselectedService, consumePreselection } = useBooking();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [proId, setProId] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [dates, setDates] = useState<DateOption[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // Datas geradas no cliente (relativas ao dia de hoje) para evitar divergência de hidratação
  useEffect(() => setDates(buildDates()), []);

  // Pré-seleção vinda da seção de serviços
  useEffect(() => {
    if (!preselectedService) return;
    setServiceId(preselectedService);
    setProId(null);
    setDone(false);
    setDirection(1);
    setStep(1);
    consumePreselection();
  }, [preselectedService, consumePreselection]);

  // Leva o foco ao título da etapa para leitores de tela (sem rolar a página)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [step, done]);

  const service = services.find((s) => s.id === serviceId) ?? null;
  const pros = useMemo(() => (serviceId ? team.filter((m) => m.services.includes(serviceId)) : team), [serviceId]);
  const pro = team.find((m) => m.id === proId) ?? null;
  const dateOption = dates.find((d) => d.iso === date) ?? null;

  const canContinue = [!!serviceId, !!proId, !!date && !!time, true][step];

  const goTo = (target: number) => {
    setDirection(target > step ? 1 : -1);
    setStep(target);
  };

  const reset = () => {
    setServiceId(null);
    setProId(null);
    setDate(null);
    setTime(null);
    setDone(false);
    setDirection(-1);
    setStep(0);
  };

  const slide = {
    initial: (dir: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: dir * 40 }),
    animate: { opacity: 1, x: 0 },
    exit: (dir: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: dir * -40 }),
  };

  return (
    <section
      id="agendamento"
      aria-labelledby="agendamento-title"
      className="relative overflow-hidden bg-cacau-950 py-24 text-linho sm:py-32 lg:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[20%] bottom-0 h-[70vmax] w-[70vmax] rounded-full opacity-60"
        style={{ background: "radial-gradient(closest-side, rgba(165,124,101,0.16), transparent)" }}
      />
      <div className="container-site relative grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
            <SectionLabel index="06" tone="light">
              Agendamento
            </SectionLabel>
            <RevealLines
              id="agendamento-title"
              className="display mt-8 text-[clamp(2.6rem,9vw,4rem)] md:text-[clamp(3.5rem,5.4vw,5.25rem)]"
              lines={[
                <>Reserve o seu</>,
                <>
                  <em className="italic text-bronze-300">momento.</em>
                </>,
              ]}
            />
            <Reveal delay={0.15}>
              <p className="mt-7 max-w-md leading-relaxed text-linho/70">
                Escolha o serviço, a pessoa que vai cuidar de você e o melhor momento. Um fluxo pensado para ser simples
                no celular e claro em cada etapa.
              </p>
              <div className="mt-9 max-w-md border-l border-bronze-400 pl-5">
                <p className="label text-bronze-300">Demonstração interativa</p>
                <p className="mt-2 text-sm leading-relaxed text-linho/65">
                  Nenhum dado pessoal é solicitado ou enviado. Datas e horários são ilustrativos e não representam
                  disponibilidade real — não existe agenda conectada.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="border border-linho/10 bg-cacau-900/80">
            {/* Progresso */}
            <div className="border-b border-linho/10 px-5 pt-5 sm:px-8 sm:pt-7">
              <ol className="flex gap-2" aria-label="Etapas do agendamento">
                {STEPS.map((label, i) => {
                  const state = done || i < step ? "done" : i === step ? "current" : "next";
                  return (
                    <li key={label} className="flex-1" aria-current={state === "current" ? "step" : undefined}>
                      <span className="block h-[2px] overflow-hidden bg-linho/10">
                        <span
                          className={cn(
                            "block h-full origin-left bg-bronze-300 transition-transform duration-700 ease-expo",
                            state === "next" ? "scale-x-0" : "scale-x-100",
                          )}
                        />
                      </span>
                      <span
                        className={cn(
                          "mt-3 block pb-5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] transition-colors sm:text-[0.7rem]",
                          state === "next" ? "text-linho/35" : "text-linho/85",
                        )}
                      >
                        <span className="font-display text-xs normal-case italic tracking-normal text-bronze-300">0{i + 1}</span>
                        <span className="ml-1.5 hidden sm:inline">{label}</span>
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="relative min-h-[27rem] overflow-hidden px-5 py-8 sm:px-8 sm:py-10">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                {done ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: ease.expo }}
                    className="flex flex-col"
                  >
                    <span aria-hidden className="grid h-14 w-14 place-items-center rounded-full border border-bronze-300 text-bronze-300">
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
                        <path d="M4 12.5 9.5 18 20 6.5" stroke="currentColor" strokeWidth="1.3" />
                      </svg>
                    </span>
                    <h3 ref={headingRef} tabIndex={-1} className="display mt-7 text-[clamp(2.2rem,7vw,3.25rem)] outline-none">
                      Simulação <em className="italic text-bronze-300">concluída.</em>
                    </h3>
                    <p className="mt-5 max-w-lg leading-relaxed text-linho/75">
                      Você percorreu o fluxo completo de agendamento do AURÉ. Como este é um projeto demonstrativo,{" "}
                      <strong className="font-semibold text-linho">nenhuma reserva foi criada e nenhum dado foi enviado.</strong>
                    </p>
                    <p className="mt-4 max-w-lg text-sm leading-relaxed text-linho/60">
                      Na versão personalizada para um salão real, esta etapa pode abrir uma conversa no WhatsApp com os
                      detalhes já preenchidos ou registrar o horário diretamente em uma plataforma de agenda online.
                    </p>
                    <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                      <button type="button" onClick={reset} className="btn btn-light">
                        Nova simulação <Arrow className="btn-arrow" />
                      </button>
                      <a
                        href={site.credit.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-draw py-2 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-bronze-200"
                      >
                        Quero um site assim
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={slide}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.5, ease: ease.expo }}
                  >
                    <h3 ref={headingRef} tabIndex={-1} className="font-display text-[1.75rem] leading-tight outline-none sm:text-[2rem]">
                      {
                        [
                          "Qual serviço você procura?",
                          "Com quem você prefere?",
                          "Escolha um dia e um horário",
                          "Revise sua simulação",
                        ][step]
                      }
                    </h3>

                    {step === 0 && (
                      <fieldset className="mt-7">
                        <legend className="sr-only">Serviço</legend>
                        <div className="grid gap-2.5 sm:grid-cols-2">
                          {services.map((s) => (
                            <OptionCard
                              key={s.id}
                              name="servico"
                              value={s.id}
                              checked={serviceId === s.id}
                              onChange={() => {
                                setServiceId(s.id);
                                if (proId && proId !== ANY && !team.find((m) => m.id === proId)?.services.includes(s.id)) setProId(null);
                              }}
                            >
                              <span className="font-display text-xs italic text-bronze-300">{s.number}</span>
                              <span className="mt-1 block font-display text-xl leading-tight">{s.name}</span>
                              <span className="mt-1 block text-xs text-linho/55">{s.short}</span>
                            </OptionCard>
                          ))}
                        </div>
                      </fieldset>
                    )}

                    {step === 1 && (
                      <fieldset className="mt-7">
                        <legend className="sr-only">Profissional</legend>
                        <p className="-mt-3 mb-6 text-sm text-linho/55">
                          Especialistas que atendem <span className="text-linho/85">{service?.name}</span>
                        </p>
                        <div className="grid gap-2.5 sm:grid-cols-2">
                          {pros.map((m) => (
                            <OptionCard key={m.id} name="profissional" value={m.id} checked={proId === m.id} onChange={() => setProId(m.id)}>
                              <span className="flex items-center gap-4">
                                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                                  <Image src={m.image.src} alt="" fill sizes="56px" className="object-cover" />
                                </span>
                                <span>
                                  <span className="block font-display text-xl leading-tight">{m.name}</span>
                                  <span className="mt-1 block text-xs text-linho/55">{m.role}</span>
                                </span>
                              </span>
                            </OptionCard>
                          ))}
                          <OptionCard name="profissional" value={ANY} checked={proId === ANY} onChange={() => setProId(ANY)}>
                            <span className="flex items-center gap-4">
                              <span aria-hidden className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-dashed border-linho/30 font-display text-lg italic text-bronze-300">
                                A
                              </span>
                              <span>
                                <span className="block font-display text-xl leading-tight">Sem preferência</span>
                                <span className="mt-1 block text-xs text-linho/55">O studio indica o especialista</span>
                              </span>
                            </span>
                          </OptionCard>
                        </div>
                      </fieldset>
                    )}

                    {step === 2 && (
                      <div className="mt-7">
                        <fieldset>
                          <legend className="label text-linho/55">Dia</legend>
                          <div className="no-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:grid sm:grid-cols-4 sm:px-0">
                            {dates.length === 0 && <p className="text-sm text-linho/50">Carregando datas…</p>}
                            {dates.map((d) => (
                              <label key={d.iso} className="relative shrink-0 cursor-pointer">
                                <input
                                  type="radio"
                                  name="data"
                                  value={d.iso}
                                  checked={date === d.iso}
                                  onChange={() => setDate(d.iso)}
                                  className="peer sr-only"
                                />
                                <span className="flex w-[4.75rem] flex-col items-center border border-linho/15 py-3 transition-colors duration-300 hover:border-linho/40 peer-checked:border-bronze-300 peer-checked:bg-bronze-300 peer-checked:text-cacau-950 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-bronze-300 sm:w-auto">
                                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] opacity-70">{d.weekday}</span>
                                  <span className="mt-1 font-display text-2xl leading-none">{d.day}</span>
                                  <span className="mt-1 text-[0.65rem] uppercase tracking-[0.14em] opacity-70">{d.month}</span>
                                </span>
                              </label>
                            ))}
                          </div>
                        </fieldset>
                        <fieldset className="mt-8">
                          <legend className="label text-linho/55">Horário ilustrativo</legend>
                          <div className="mt-4 grid grid-cols-3 gap-2">
                            {TIMES.map((t) => (
                              <label key={t} className="cursor-pointer">
                                <input
                                  type="radio"
                                  name="horario"
                                  value={t}
                                  checked={time === t}
                                  onChange={() => setTime(t)}
                                  className="peer sr-only"
                                />
                                <span className="block border border-linho/15 py-3 text-center text-sm tabular-nums transition-colors duration-300 hover:border-linho/40 peer-checked:border-bronze-300 peer-checked:bg-bronze-300 peer-checked:text-cacau-950 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-bronze-300">
                                  {t}
                                </span>
                              </label>
                            ))}
                          </div>
                        </fieldset>
                        <p className="mt-5 text-xs text-linho/45">Exemplos para a demonstração — não refletem disponibilidade real.</p>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="mt-7">
                        <dl className="border-t border-linho/10">
                          {[
                            { label: "Serviço", value: service?.name, step: 0 },
                            { label: "Profissional", value: proId === ANY ? "Sem preferência" : pro?.name, step: 1 },
                            { label: "Data", value: dateOption?.full, step: 2 },
                            { label: "Horário", value: time, step: 2 },
                          ].map((row) => (
                            <div key={row.label} className="grid grid-cols-[6.5rem_1fr_auto] items-baseline gap-3 border-b border-linho/10 py-4 sm:grid-cols-[9rem_1fr_auto]">
                              <dt className="label text-linho/50">{row.label}</dt>
                              <dd className="font-display text-lg first-letter:uppercase sm:text-xl">{row.value}</dd>
                              <dd>
                                <button
                                  type="button"
                                  onClick={() => goTo(row.step)}
                                  className="link-draw py-1 text-xs text-bronze-200"
                                  aria-label={`Alterar ${row.label.toLowerCase()}`}
                                >
                                  Alterar
                                </button>
                              </dd>
                            </div>
                          ))}
                        </dl>
                        <p className="mt-6 text-sm leading-relaxed text-linho/55">
                          Ao concluir, nenhuma reserva é criada. Esta etapa apenas demonstra a experiência.
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {!done && (
              <div className="flex items-center justify-between gap-4 border-t border-linho/10 px-5 py-5 sm:px-8">
                <button
                  type="button"
                  onClick={() => goTo(step - 1)}
                  disabled={step === 0}
                  className="flex min-h-[3rem] items-center gap-3 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-linho/70 transition-opacity hover:text-linho disabled:pointer-events-none disabled:opacity-0"
                >
                  <Arrow direction="left" className="w-5" /> Voltar
                </button>
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => goTo(step + 1)}
                    disabled={!canContinue}
                    className="btn btn-bronze disabled:cursor-not-allowed disabled:bg-linho/10 disabled:text-linho/35 disabled:before:hidden"
                  >
                    Continuar <Arrow className="btn-arrow" />
                  </button>
                ) : (
                  <button type="button" onClick={() => setDone(true)} className="btn btn-light">
                    Concluir simulação <Arrow className="btn-arrow" />
                  </button>
                )}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function OptionCard({
  name,
  value,
  checked,
  onChange,
  children,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <label className="group relative block cursor-pointer">
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="block h-full border border-linho/[0.12] p-4 pr-12 transition-colors duration-300 group-hover:border-linho/35 peer-checked:border-bronze-300 peer-checked:bg-bronze-300/[0.08] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-bronze-300">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute right-4 top-4 grid h-5 w-5 place-items-center rounded-full border border-linho/30 transition-colors peer-checked:border-bronze-300 [&>span]:scale-0 peer-checked:[&>span]:scale-100"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-bronze-300 transition-transform duration-300" />
      </span>
    </label>
  );
}
