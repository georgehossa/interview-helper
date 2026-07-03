import type { Topic } from "../types";

export const reactNative: Topic = {
  key: "rn",
  name: "React Native",
  color: "#c792ea",
  items: [
    {
      q: "Componentes core",
      a: `En vez de elementos HTML usas componentes que mapean a vistas nativas:
- \`View\` → contenedor (≈ div).
- \`Text\` → todo texto debe ir dentro de un Text.
- \`Image\`, \`TextInput\`, \`ScrollView\`.
- \`Pressable\` para toques.`,
    },
    {
      q: "FlatList vs ScrollView",
      a: `**ScrollView** renderiza todos sus hijos de una vez — contenido corto. **FlatList** es virtualizada: solo renderiza lo visible y recicla filas. Listas largas → FlatList, con \`keyExtractor\` y \`renderItem\`.`,
    },
    {
      q: "StyleSheet y estilos",
      a: `No hay CSS; los estilos son objetos JS con camelCase. \`StyleSheet.create\` los valida y optimiza.

\`\`\`js
const s = StyleSheet.create({
  box: { padding: 16 }
});
\`\`\`

No se heredan (salvo algunos de texto) y no hay cascada.`,
    },
    {
      q: "Flexbox en RN",
      a: `El layout es Flexbox, con diferencias vs web:
- \`flexDirection\` por defecto es **column** (en web es row).
- Todo es flex; no hay \`display:block\`.
- Medidas en números sin unidad (dp).`,
    },
    {
      q: "Código por plataforma",
      a: `Para diferencias iOS/Android: el módulo \`Platform\` (\`Platform.OS\`, \`Platform.select\`) o archivos \`.ios.tsx\` / \`.android.tsx\` que el bundler resuelve automáticamente.`,
    },
    {
      q: "El bridge y la nueva arquitectura",
      a: `Clásicamente JS y nativo se comunican por un **bridge** asíncrono que serializa mensajes (cuello de botella). La nueva arquitectura usa **JSI** (C++ directo) con *Fabric* y *TurboModules*: llamadas síncronas y mejor rendimiento.`,
    },
    {
      q: "Native modules",
      a: `Cuando necesitas una API nativa no expuesta (Bluetooth, sensores), escribes un **módulo nativo** en Kotlin/Swift y lo expones a JS. Muchas librerías de la comunidad ya lo hacen.`,
    },
    {
      q: "RN vs web",
      a: `Misma idea de React (componentes, hooks, estado) pero: sin DOM ni CSS, sin etiquetas HTML, navegación con librerías (React Navigation) en vez de URLs. La lógica y los hooks se reutilizan; la capa de UI no.`,
    },
  ],
};