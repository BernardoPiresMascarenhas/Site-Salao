/** Curvas e tempos compartilhados — mantêm o ritmo de animação consistente. */
export const ease = {
  expo: [0.16, 1, 0.3, 1] as const,
  silk: [0.65, 0, 0.35, 1] as const,
  soft: [0.33, 1, 0.68, 1] as const,
};

export const duration = {
  fast: 0.35,
  base: 0.7,
  slow: 1.1,
  reveal: 1.4,
};
