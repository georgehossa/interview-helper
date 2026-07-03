import type { Topic } from "../types";

export const typescript: Topic = {
  key: "ts",
  name: "TypeScript",
  color: "#4a90e2",
  items: [
    {
      q: { es: "type vs interface", en: "type vs interface" },
      a: {
        es: `Ambos describen la forma de un objeto.
- **interface**: extensible, soporta *declaration merging*, ideal para contratos de objetos/clases.
- **type**: más flexible — uniones, intersecciones, tuplas, tipos mapeados.

Regla práctica: \`interface\` para objetos públicos, \`type\` para uniones y composiciones.`,
        en: `Both describe the shape of an object.
- **interface**: extensible, supports *declaration merging*, ideal for object/class contracts.
- **type**: more flexible — unions, intersections, tuples, mapped types.

Practical rule: \`interface\` for public objects, \`type\` for unions and compositions.`,
      },
    },
    {
      q: { es: "Generics", en: "Generics" },
      a: {
        es: `Parametrizan tipos para reutilizar lógica conservando el tipo exacto.

\`\`\`ts
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
first<number>([1, 2, 3]);
\`\`\``,
        en: `They parameterize types so you can reuse logic while keeping the exact type.

\`\`\`ts
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
first<number>([1, 2, 3]);
\`\`\``,
      },
    },
    {
      q: { es: "Union e intersection", en: "Union and intersection" },
      a: {
        es: `**Union** (\`A | B\`): el valor es A *o* B. **Intersection** (\`A & B\`): combina propiedades de ambos. Las uniones requieren *narrowing* antes de usar propiedades específicas.`,
        en: `**Union** (\`A | B\`): the value is A *or* B. **Intersection** (\`A & B\`): combines properties of both. Unions require *narrowing* before using specific properties.`,
      },
    },
    {
      q: { es: "Utility types", en: "Utility types" },
      a: {
        es: `Tipos predefinidos que transforman otros:
- \`Partial<T>\`: todo opcional.
- \`Required<T>\`: todo obligatorio.
- \`Pick<T,K>\` / \`Omit<T,K>\`: selecciona o excluye claves.
- \`Record<K,V>\`: objeto con claves K y valores V.
- \`Readonly<T>\`: inmutable.`,
        en: `Predefined types that transform others:
- \`Partial<T>\`: everything optional.
- \`Required<T>\`: everything required.
- \`Pick<T,K>\` / \`Omit<T,K>\`: select or exclude keys.
- \`Record<K,V>\`: object with keys K and values V.
- \`Readonly<T>\`: immutable.`,
      },
    },
    {
      q: {
        es: "any vs unknown vs never",
        en: "any vs unknown vs never",
      },
      a: {
        es: `**any**: desactiva el chequeo (evítalo). **unknown**: como any pero *seguro* — debes hacer narrowing antes de usarlo. **never**: valor que nunca ocurre (funciones que lanzan o bucles infinitos).`,
        en: `**any**: disables checking (avoid it). **unknown**: like any but *safe* — you must narrow before using it. **never**: a value that never occurs (functions that throw or infinite loops).`,
      },
    },
    {
      q: { es: "Type narrowing", en: "Type narrowing" },
      a: {
        es: `Reducir una unión a un tipo concreto con guards: \`typeof\`, \`instanceof\`, \`in\`, o *discriminated unions* con una propiedad literal.

\`\`\`ts
if (typeof x === 'string') {
  x.toUpperCase(); // TS sabe que es string
}
\`\`\``,
        en: `Reducing a union to a concrete type with guards: \`typeof\`, \`instanceof\`, \`in\`, or *discriminated unions* with a literal property.

\`\`\`ts
if (typeof x === 'string') {
  x.toUpperCase(); // TS knows it's a string
}
\`\`\``,
      },
    },
    {
      q: {
        es: "Enums vs union de literales",
        en: "Enums vs union of literals",
      },
      a: {
        es: `\`enum\` crea un objeto en runtime. Muchos equipos prefieren **uniones de literales** (\`type Estado = 'on' | 'off'\`) por ser más ligeras y sin código generado.`,
        en: `\`enum\` creates an object at runtime. Many teams prefer **unions of literals** (\`type State = 'on' | 'off'\`) because they're lighter and generate no code.`,
      },
    },
    {
      q: { es: "Type assertions", en: "Type assertions" },
      a: {
        es: `\`valor as Tipo\` le dice al compilador que confíe en ti — no convierte en runtime, solo silencia el chequeo. Úsalo con cuidado; prefiere narrowing real. Evita \`as any as X\`.`,
        en: `\`value as Type\` tells the compiler to trust you — it doesn't convert at runtime, just silences the check. Use it carefully; prefer real narrowing. Avoid \`as any as X\`.`,
      },
    },
  ],
};