import { cn } from "@/lib/cn";

/** Logotipo tipográfico: AURÉ em Bodoni + STUDIO espaçado. */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-baseline gap-2.5 leading-none", className)}>
      <span className="font-display text-[1.6rem] font-medium tracking-[0.08em]">AURÉ</span>
      {!compact && <span className="font-sans text-[0.6rem] font-semibold tracking-[0.42em]">STUDIO</span>}
    </span>
  );
}
