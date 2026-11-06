import { cn } from "@/lib/cn";

/** Rótulo de seção no formato editorial: (03) ——— Serviços */
export function SectionLabel({
  index,
  children,
  className,
  tone = "dark",
}: {
  index: string;
  children: string;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <p
      className={cn(
        "label flex items-center gap-4",
        tone === "dark" ? "text-bronze-600" : "text-bronze-300",
        className,
      )}
    >
      <span className="font-display text-[0.95rem] font-normal normal-case italic tracking-normal">({index})</span>
      <span aria-hidden className="h-px w-10 bg-current opacity-60" />
      <span>{children}</span>
    </p>
  );
}
