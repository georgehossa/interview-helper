import type { Topic } from "../types";

export const html: Topic = {
  key: "html",
  name: "HTML",
  color: "#ff7a59",
  items: [
    {
      q: "HTML semántico",
      a: `Usar la etiqueta que describe el *significado*: \`<header>\`, \`<nav>\`, \`<main>\`, \`<article>\`, \`<section>\`, \`<footer>\`. Mejora accesibilidad, SEO y mantenibilidad frente a un mar de \`<div>\`.`,
    },
    {
      q: "Accesibilidad (a11y)",
      a: `- HTML semántico primero; ARIA solo cuando hace falta.
- \`alt\` descriptivo en imágenes.
- \`<label>\` asociado a cada input.
- Navegable por teclado y foco visible.
- Contraste suficiente (WCAG).`,
    },
    {
      q: "Formularios",
      a: `\`<form>\` agrupa controles. Atributos clave: \`type\` (email, number, password…), \`required\`, \`name\` (clave al enviar). La validación nativa reduce JS.`,
    },
    {
      q: "Metadatos y head",
      a: `\`<meta charset>\`, el **viewport** para responsive (\`width=device-width, initial-scale=1\`), \`<title>\`, descripción y Open Graph para previsualizaciones al compartir.`,
    },
    {
      q: "async vs defer",
      a: `En \`<script>\`: **async** descarga en paralelo y ejecuta apenas llega (orden no garantizado). **defer** descarga en paralelo y ejecuta en orden tras parsear el HTML. Para scripts de app: \`defer\`.`,
    },
    {
      q: "data-* y atributos",
      a: `Los atributos \`data-*\` guardan datos personalizados en el HTML, leíbles desde JS con \`element.dataset\`. Útiles para pasar info al script sin clases falsas.`,
    },
  ],
};