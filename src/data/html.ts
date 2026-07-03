import type { Topic } from "../types";

export const html: Topic = {
  key: "html",
  name: "HTML",
  color: "#ff7a59",
  items: [
    {
      q: { es: "HTML semántico", en: "Semantic HTML" },
      a: {
        es: `Usar la etiqueta que describe el *significado*: \`<header>\`, \`<nav>\`, \`<main>\`, \`<article>\`, \`<section>\`, \`<footer>\`. Mejora accesibilidad, SEO y mantenibilidad frente a un mar de \`<div>\`.`,
        en: `Using the tag that describes the *meaning*: \`<header>\`, \`<nav>\`, \`<main>\`, \`<article>\`, \`<section>\`, \`<footer>\`. It improves accessibility, SEO and maintainability over a sea of \`<div>\`s.`,
      },
    },
    {
      q: { es: "Accesibilidad (a11y)", en: "Accessibility (a11y)" },
      a: {
        es: `- HTML semántico primero; ARIA solo cuando hace falta.
- \`alt\` descriptivo en imágenes.
- \`<label>\` asociado a cada input.
- Navegable por teclado y foco visible.
- Contraste suficiente (WCAG).`,
        en: `- Semantic HTML first; ARIA only when needed.
- Descriptive \`alt\` on images.
- A \`<label>\` associated with each input.
- Keyboard-navigable with visible focus.
- Sufficient contrast (WCAG).`,
      },
    },
    {
      q: { es: "Formularios", en: "Forms" },
      a: {
        es: `\`<form>\` agrupa controles. Atributos clave: \`type\` (email, number, password…), \`required\`, \`name\` (clave al enviar). La validación nativa reduce JS.`,
        en: `\`<form>\` groups controls. Key attributes: \`type\` (email, number, password…), \`required\`, \`name\` (the key on submit). Native validation reduces JS.`,
      },
    },
    {
      q: { es: "Metadatos y head", en: "Metadata and head" },
      a: {
        es: `\`<meta charset>\`, el **viewport** para responsive (\`width=device-width, initial-scale=1\`), \`<title>\`, descripción y Open Graph para previsualizaciones al compartir.`,
        en: `\`<meta charset>\`, the **viewport** for responsive (\`width=device-width, initial-scale=1\`), \`<title>\`, description and Open Graph for share previews.`,
      },
    },
    {
      q: { es: "async vs defer", en: "async vs defer" },
      a: {
        es: `En \`<script>\`: **async** descarga en paralelo y ejecuta apenas llega (orden no garantizado). **defer** descarga en paralelo y ejecuta en orden tras parsear el HTML. Para scripts de app: \`defer\`.`,
        en: `On \`<script>\`: **async** downloads in parallel and executes as soon as it arrives (order not guaranteed). **defer** downloads in parallel and executes in order after HTML parsing. For app scripts: \`defer\`.`,
      },
    },
    {
      q: { es: "data-* y atributos", en: "data-* and attributes" },
      a: {
        es: `Los atributos \`data-*\` guardan datos personalizados en el HTML, leíbles desde JS con \`element.dataset\`. Útiles para pasar info al script sin clases falsas.`,
        en: `\`data-*\` attributes store custom data in the HTML, readable from JS with \`element.dataset\`. Handy for passing info to the script without fake classes.`,
      },
    },
  ],
};