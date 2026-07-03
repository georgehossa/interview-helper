import type { Topic } from "../types";

export const typescript: Topic = {
  key: "ts",
  name: "TypeScript",
  color: "#4a90e2",
  items: [
    {
      q: "type vs interface",
      a: `Ambos describen la forma de un objeto.
- **interface**: extensible, soporta *declaration merging*, ideal para contratos de objetos/clases.
- **type**: más flexible — uniones, intersecciones, tuplas, tipos mapeados.

Regla práctica: \`interface\` para objetos públicos, \`type\` para uniones y composiciones.`,
    },
    {
      q: "Generics",
      a: `Parametrizan tipos para reutilizar lógica conservando el tipo exacto.

\`\`\`ts
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
first<number>([1, 2, 3]);
\`\`\``,
    },
    {
      q: "Union e intersection",
      a: `**Union** (\`A | B\`): el valor es A *o* B. **Intersection** (\`A & B\`): combina propiedades de ambos. Las uniones requieren *narrowing* antes de usar propiedades específicas.`,
    },
    {
      q: "Utility types",
      a: `Tipos predefinidos que transforman otros:
- \`Partial<T>\`: todo opcional.
- \`Required<T>\`: todo obligatorio.
- \`Pick<T,K>\` / \`Omit<T,K>\`: selecciona o excluye claves.
- \`Record<K,V>\`: objeto con claves K y valores V.
- \`Readonly<T>\`: inmutable.`,
    },
    {
      q: "any vs unknown vs never",
      a: `**any**: desactiva el chequeo (evítalo). **unknown**: como any pero *seguro* — debes hacer narrowing antes de usarlo. **never**: valor que nunca ocurre (funciones que lanzan o bucles infinitos).`,
    },
    {
      q: "Type narrowing",
      a: `Reducir una unión a un tipo concreto con guards: \`typeof\`, \`instanceof\`, \`in\`, o *discriminated unions* con una propiedad literal.

\`\`\`ts
if (typeof x === 'string') {
  x.toUpperCase(); // TS sabe que es string
}
\`\`\``,
    },
    {
      q: "Enums vs union de literales",
      a: `\`enum\` crea un objeto en runtime. Muchos equipos prefieren **uniones de literales** (\`type Estado = 'on' | 'off'\`) por ser más ligeras y sin código generado.`,
    },
    {
      q: "Type assertions",
      a: `\`valor as Tipo\` le dice al compilador que confíe en ti — no convierte en runtime, solo silencia el chequeo. Úsalo con cuidado; prefiere narrowing real. Evita \`as any as X\`.`,
    },
  ],
};