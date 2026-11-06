import { cn } from "@/lib/cn";

/** Seta fina desenhada para combinar com a tipografia — evita ícones genéricos. */
export function Arrow({ className, direction = "right" }: { className?: string; direction?: "right" | "left" | "down" | "up" | "up-right" }) {
  const rotate = { right: "", left: "rotate-180", down: "rotate-90", up: "-rotate-90", "up-right": "-rotate-45" }[direction];
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 12"
      fill="none"
      className={cn("h-3 w-6 shrink-0", rotate, className)}
    >
      <path d="M0 6h22.5M17 .75 22.5 6 17 11.25" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
