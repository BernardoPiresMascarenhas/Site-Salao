import { HomePage } from "@/components/pages/HomePage";

/**
 * TEMPORÁRIO — teste do "app-shell" para o Safari iOS 26.
 * html/body não rolam; o conteúdo rola dentro de #scroll-root e o header fixo fica fora dele.
 * A classe é aplicada por um script inline antes da primeira pintura (o <html> pertence ao layout raiz).
 * A versão atual (/) continua intacta. Remover ou consolidar após a validação no iPhone.
 */
export const metadata = { title: "Teste app-shell" };

const SHELL_SCRIPT = `document.documentElement.classList.add("app-shell")`;

export default function TesteScroll() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: SHELL_SCRIPT }} />
      <HomePage shell />
    </>
  );
}
