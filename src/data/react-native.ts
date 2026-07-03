import type { Topic } from "../types";

export const reactNative: Topic = {
  key: "rn",
  name: "React Native",
  color: "#c792ea",
  items: [
    {
      q: { es: "Componentes core", en: "Core components" },
      a: {
        es: `En vez de elementos HTML usas componentes que mapean a vistas nativas:
- \`View\` → contenedor (≈ div).
- \`Text\` → todo texto debe ir dentro de un Text.
- \`Image\`, \`TextInput\`, \`ScrollView\`.
- \`Pressable\` para toques.`,
        en: `Instead of HTML elements you use components that map to native views:
- \`View\` → container (≈ div).
- \`Text\` → all text must live inside a Text.
- \`Image\`, \`TextInput\`, \`ScrollView\`.
- \`Pressable\` for touches.`,
      },
    },
    {
      q: { es: "FlatList vs ScrollView", en: "FlatList vs ScrollView" },
      a: {
        es: `**ScrollView** renderiza todos sus hijos de una vez — contenido corto. **FlatList** es virtualizada: solo renderiza lo visible y recicla filas. Listas largas → FlatList, con \`keyExtractor\` y \`renderItem\`.`,
        en: `**ScrollView** renders all its children at once — short content. **FlatList** is virtualized: only renders visible rows and recycles them. Long lists → FlatList, with \`keyExtractor\` and \`renderItem\`.`,
      },
    },
    {
      q: { es: "StyleSheet y estilos", en: "StyleSheet and styles" },
      a: {
        es: `No hay CSS; los estilos son objetos JS con camelCase. \`StyleSheet.create\` los valida y optimiza.

\`\`\`js
const s = StyleSheet.create({
  box: { padding: 16 }
});
\`\`\`

No se heredan (salvo algunos de texto) y no hay cascada.`,
        en: `There's no CSS; styles are JS objects in camelCase. \`StyleSheet.create\` validates and optimizes them.

\`\`\`js
const s = StyleSheet.create({
  box: { padding: 16 }
});
\`\`\`

They aren't inherited (except some text ones) and there's no cascade.`,
      },
    },
    {
      q: { es: "Flexbox en RN", en: "Flexbox in RN" },
      a: {
        es: `El layout es Flexbox, con diferencias vs web:
- \`flexDirection\` por defecto es **column** (en web es row).
- Todo es flex; no hay \`display:block\`.
- Medidas en números sin unidad (dp).`,
        en: `The layout is Flexbox, with differences from web:
- \`flexDirection\` defaults to **column** (on web it's row).
- Everything is flex; no \`display:block\`.
- Sizes are unitless numbers (dp).`,
      },
    },
    {
      q: { es: "Código por plataforma", en: "Per-platform code" },
      a: {
        es: `Para diferencias iOS/Android: el módulo \`Platform\` (\`Platform.OS\`, \`Platform.select\`) o archivos \`.ios.tsx\` / \`.android.tsx\` que el bundler resuelve automáticamente.`,
        en: `For iOS/Android differences: the \`Platform\` module (\`Platform.OS\`, \`Platform.select\`) or \`.ios.tsx\` / \`.android.tsx\` files that the bundler resolves automatically.`,
      },
    },
    {
      q: {
        es: "El bridge y la nueva arquitectura",
        en: "The bridge and the new architecture",
      },
      a: {
        es: `Clásicamente JS y nativo se comunican por un **bridge** asíncrono que serializa mensajes (cuello de botella). La nueva arquitectura usa **JSI** (C++ directo) con *Fabric* y *TurboModules*: llamadas síncronas y mejor rendimiento.`,
        en: `Classically JS and native communicate through an async **bridge** that serializes messages (a bottleneck). The new architecture uses **JSI** (direct C++) with *Fabric* and *TurboModules*: synchronous calls and better performance.`,
      },
    },
    {
      q: { es: "Native modules", en: "Native modules" },
      a: {
        es: `Cuando necesitas una API nativa no expuesta (Bluetooth, sensores), escribes un **módulo nativo** en Kotlin/Swift y lo expones a JS. Muchas librerías de la comunidad ya lo hacen.`,
        en: `When you need a native API that isn't exposed (Bluetooth, sensors), you write a **native module** in Kotlin/Swift and expose it to JS. Many community libraries already do this.`,
      },
    },
    {
      q: { es: "RN vs web", en: "RN vs web" },
      a: {
        es: `Misma idea de React (componentes, hooks, estado) pero: sin DOM ni CSS, sin etiquetas HTML, navegación con librerías (React Navigation) en vez de URLs. La lógica y los hooks se reutilizan; la capa de UI no.`,
        en: `Same React idea (components, hooks, state) but: no DOM or CSS, no HTML tags, navigation via libraries (React Navigation) instead of URLs. Logic and hooks are reused; the UI layer is not.`,
      },
    },
  ],
};