import type { Topic } from "../types";

export const css: Topic = {
  key: "css",
  name: "CSS",
  color: "#ec5f9e",
  items: [
    {
      q: { es: "Box model", en: "Box model" },
      a: {
        es: `Cada elemento es una caja: **content → padding → border → margin**. Con \`box-sizing: border-box\` el \`width\` incluye padding y border, evitando cálculos sorpresa.`,
        en: `Every element is a box: **content → padding → border → margin**. With \`box-sizing: border-box\`, \`width\` includes padding and border, avoiding surprise calculations.`,
      },
    },
    {
      q: { es: "Flexbox", en: "Flexbox" },
      a: {
        es: `Layout en **una dimensión**. Contenedor: \`display:flex\`, \`flex-direction\`, \`justify-content\` (eje principal), \`align-items\` (eje cruzado), \`gap\`. Hijos: \`flex:1\`.`,
        en: `One-dimensional **layout**. Container: \`display:flex\`, \`flex-direction\`, \`justify-content\` (main axis), \`align-items\` (cross axis), \`gap\`. Children: \`flex:1\`.`,
      },
    },
    {
      q: { es: "Grid", en: "Grid" },
      a: {
        es: `Layout en **dos dimensiones**. \`display:grid\`, \`grid-template-columns: repeat(3, 1fr)\`, \`gap\`, áreas nombradas. Grid para layouts de página; Flexbox para componentes lineales.`,
        en: `Two-dimensional **layout**. \`display:grid\`, \`grid-template-columns: repeat(3, 1fr)\`, \`gap\`, named areas. Grid for page layouts; Flexbox for linear components.`,
      },
    },
    {
      q: { es: "Especificidad", en: "Specificity" },
      a: {
        es: `Qué regla gana cuando varias aplican. Peso (mayor a menor): **inline > id > clase/atributo/pseudo-clase > elemento**. \`!important\` rompe la cascada — evítalo. Ante empate, gana la última declarada.`,
        en: `Which rule wins when several apply. Weight (highest to lowest): **inline > id > class/attribute/pseudo-class > element**. \`!important\` breaks the cascade — avoid it. On a tie, the last declared wins.`,
      },
    },
    {
      q: { es: "Position", en: "Position" },
      a: {
        es: `- **static**: por defecto.
- **relative**: se desplaza respecto a sí mismo.
- **absolute**: respecto al ancestro posicionado.
- **fixed**: respecto al viewport.
- **sticky**: relative hasta cruzar un umbral, luego fixed.`,
        en: `- **static**: default.
- **relative**: offsets relative to itself.
- **absolute**: relative to the nearest positioned ancestor.
- **fixed**: relative to the viewport.
- **sticky**: relative until crossing a threshold, then fixed.`,
      },
    },
    {
      q: { es: "Unidades", en: "Units" },
      a: {
        es: `**px** fijos. **%** relativo al padre. **rem** relativo al root (escala accesible). **em** relativo al font-size propio. **vw/vh** relativos al viewport. Para tipografía y espaciado, \`rem\` suele ser lo mejor.`,
        en: `**px** fixed. **%** relative to parent. **rem** relative to the root (accessible scaling). **em** relative to the element's own font-size. **vw/vh** relative to the viewport. For typography and spacing, \`rem\` is usually best.`,
      },
    },
    {
      q: { es: "Stacking y z-index", en: "Stacking and z-index" },
      a: {
        es: `\`z-index\` solo funciona en elementos posicionados y dentro del mismo **contexto de apilamiento**. \`transform\`, \`opacity<1\` o \`position:fixed\` crean nuevos contextos — por eso a veces un z-index alto 'no funciona'.`,
        en: `\`z-index\` only works on positioned elements within the same **stacking context**. \`transform\`, \`opacity<1\`, or \`position:fixed\` create new contexts — that's why a high z-index sometimes 'doesn't work'.`,
      },
    },
    {
      q: {
        es: "Pseudo-clases y pseudo-elementos",
        en: "Pseudo-classes and pseudo-elements",
      },
      a: {
        es: `**Pseudo-clase** (\`:hover\`, \`:focus\`, \`:nth-child\`) selecciona por estado o posición. **Pseudo-elemento** (\`::before\`, \`::after\`) crea sub-elementos virtuales para decoración.`,
        en: `**Pseudo-class** (\`:hover\`, \`:focus\`, \`:nth-child\`) selects by state or position. **Pseudo-element** (\`::before\`, \`::after\`) creates virtual sub-elements for decoration.`,
      },
    },
    {
      q: { es: "Responsive design", en: "Responsive design" },
      a: {
        es: `Adaptar al dispositivo con **media queries** (\`@media (max-width:768px)\`), unidades relativas, imágenes flexibles y enfoque **mobile-first** (estilos base para móvil, se amplían hacia arriba).`,
        en: `Adapt to the device with **media queries** (\`@media (max-width:768px)\`), relative units, flexible images, and a **mobile-first** approach (base styles for mobile, scaled up).`,
      },
    },
    {
      q: {
        es: "Transiciones y animaciones",
        en: "Transitions and animations",
      },
      a: {
        es: `**transition** interpola entre dos estados ante un cambio: \`transition: all .2s ease\`. **@keyframes** + \`animation\` define secuencias repetibles. Anima preferentemente \`transform\` y \`opacity\` (no disparan reflow).`,
        en: `**transition** interpolates between two states on a change: \`transition: all .2s ease\`. **@keyframes** + \`animation\` defines repeatable sequences. Prefer animating \`transform\` and \`opacity\` (they don't trigger reflow).`,
      },
    },
  ],
};