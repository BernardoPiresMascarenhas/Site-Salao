import type { Viewport } from "next";
import Home from "../page";

/**
 * TEMPORÁRIO — mesma página inicial, mas SEM viewport-fit=cover (teste B2 do header no Safari iOS 26).
 * O viewport-fit precisa vir no HTML do servidor; por isso é uma rota e não um parâmetro.
 * Remover após a validação.
 */
export const viewport: Viewport = {
  themeColor: "#140E0C",
  width: "device-width",
  initialScale: 1,
  viewportFit: "auto",
};

export default Home;
