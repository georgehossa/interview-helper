import type { Topic } from "../types";

export const css: Topic = {
  key: "css",
  name: "CSS",
  color: "#ec5f9e",
  items: [
    {
      q: "Box model",
      a: `Cada elemento es una caja: **content → padding → border → margin**. Con \`box-sizing: border-box\` el \`width\` incluye padding y border, evitando cálculos sorpresa.`,
    },
    {
      q: "Flexbox",
      a: `Layout en **una dimensión**. Contenedor: \`display:flex\`, \`flex-direction\`, \`justify-content\` (eje principal), \`align-items\` (eje cruzado), \`gap\`. Hijos: \`flex:1\`.`,
    },
    {
      q: "Grid",
      a: `Layout en **dos dimensiones**. \`display:grid\`, \`grid-template-columns: repeat(3, 1fr)\`, \`gap\`, áreas nombradas. Grid para layouts de página; Flexbox para componentes lineales.`,
    },
    {
      q: "Especificidad",
      a: `Qué regla gana cuando varias aplican. Peso (mayor a menor): **inline > id > clase/atributo/pseudo-clase > elemento**. \`!important\` rompe la cascada — evítalo. Ante empate, gana la última declarada.`,
    },
    {
      q: "Position",
      a: `- **static**: por defecto.
- **relative**: se desplaza respecto a sí mismo.
- **absolute**: respecto al ancestro posicionado.
- **fixed**: respecto al viewport.
- **sticky**: relative hasta cruzar un umbral, luego fixed.`,
    },
    {
      q: "Unidades",
      a: `**px** fijos. **%** relativo al padre. **rem** relativo al root (escala accesible). **em** relativo al font-size propio. **vw/vh** relativos al viewport. Para tipografía y espaciado, \`rem\` suele ser lo mejor.`,
    },
    {
      q: "Stacking y z-index",
      a: `\`z-index\` solo funciona en elementos posicionados y dentro del mismo **contexto de apilamiento**. \`transform\`, \`opacity<1\` o \`position:fixed\` crean nuevos contextos — por eso a veces un z-index alto 'no funciona'.`,
    },
    {
      q: "Pseudo-clases y pseudo-elementos",
      a: `**Pseudo-clase** (\`:hover\`, \`:focus\`, \`:nth-child\`) selecciona por estado o posición. **Pseudo-elemento** (\`::before\`, \`::after\`) crea sub-elementos virtuales para decoración.`,
    },
    {
      q: "Responsive design",
      a: `Adaptar al dispositivo con **media queries** (\`@media (max-width:768px)\`), unidades relativas, imágenes flexibles y enfoque **mobile-first** (estilos base para móvil, se amplían hacia arriba).`,
    },
    {
      q: "Transiciones y animaciones",
      a: `**transition** interpola entre dos estados ante un cambio: \`transition: all .2s ease\`. **@keyframes** + \`animation\` define secuencias repetibles. Anima preferentemente \`transform\` y \`opacity\` (no disparan reflow).`,
    },
  ],
};