"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Igual a useReducedMotion, mas retorna `false` até a montagem.
 * Assim o HTML do servidor e a primeira renderização do cliente coincidem
 * (sem erro de hidratação); a preferência do usuário vale logo em seguida.
 * O MotionConfig reducedMotion="user" já neutraliza transformações nesse intervalo.
 */
export function useReducedMotionSafe() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? !!reduce : false;
}
