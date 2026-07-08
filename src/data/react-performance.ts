import type { Topic } from "../types";

export const reactPerformance: Topic = {
  key: "react-perf",
  name: "React Performance",
  color: "#f59e0b",
  items: [
    {
      q: {
        es: "Rendimiento de carga vs rendimiento de ejecución",
        en: "Loading performance vs runtime performance",
      },
      a: {
        es: `El rendimiento de una app React se divide en dos áreas:

**Rendimiento de carga** (*loading*):
- Tamaño del bundle.
- Tiempo de descarga e interpretación del JS.
- Render inicial y hidratación.
- Carga progresiva de recursos.

**Rendimiento de ejecución** (*runtime*):
- Re-renders innecesarios.
- Cálculos costosos en cada render.
- Gestión de estado ineficiente.
- Bloqueo del hilo principal.

Para entrevistas es útil separarlas y nombrar técnicas específicas de cada una.`,
        en: `React app performance splits into two areas:

**Loading performance**:
- Bundle size.
- JS download and parse time.
- Initial render and hydration.
- Progressive resource loading.

**Runtime performance**:
- Unnecessary re-renders.
- Expensive calculations on each render.
- Inefficient state management.
- Main thread blocking.

In interviews it's useful to separate them and name specific techniques for each.`,
      },
    },
    {
      q: {
        es: "React.memo",
        en: "React.memo",
      },
      a: {
        es: `\`React.memo\` memoriza un componente funcional. Si sus props no cambian, React reutiliza el resultado anterior y salta el render.

\`\`\`tsx
const UserCard = React.memo(function UserCard({ user }) {
  return <div>{user.name}</div>;
});
\`\`\`

Importante:
- Solo compara props superficialmente.
- No sirve si recibe funciones u objetos creados en cada render (a menos que uses \`useCallback\` / \`useMemo\`).
- No tiene sentido memorizar componentes muy baratos o que siempre cambian.
- Puedes pasar una función de comparación personalizada como segundo argumento.`,
        en: `\`React.memo\` memoizes a functional component. If its props don't change, React reuses the previous result and skips rendering.

\`\`\`tsx
const UserCard = React.memo(function UserCard({ user }) {
  return <div>{user.name}</div>;
});
\`\`\`

Important:
- Only does shallow prop comparison.
- Doesn't help if it receives functions or objects created on every render (unless you use \`useCallback\` / \`useMemo\`).
- Not worth memoizing very cheap components or those that always change.
- You can pass a custom comparison function as the second argument.`,
      },
    },
    {
      q: {
        es: "useMemo y useCallback",
        en: "useMemo and useCallback",
      },
      a: {
        es: `**\`useMemo\`** memoriza un valor calculado entre renders si las dependencias no cambian. Útil para cálculos costosos o para mantener referencias estables.

\`\`\`tsx
const total = useMemo(() => items.reduce((a, b) => a + b.price, 0), [items]);
\`\`\`

**\`useCallback\`** memoriza una función para que la referencia sea la misma si las dependencias no cambian. Evita invalidar \`React.memo\` en hijos.

\`\`\`tsx
const onSubmit = useCallback((data) => save(data), []);
\`\`\`

**Regla de oro**: no optimices prematuramente. Perfil primero, luego memoriza.`,
        en: `**\`useMemo\`** memoizes a computed value across renders if dependencies don't change. Useful for expensive calculations or keeping stable references.

\`\`\`tsx
const total = useMemo(() => items.reduce((a, b) => a + b.price, 0), [items]);
\`\`\`

**\`useCallback\`** memoizes a function so its reference stays the same if dependencies don't change. Prevents invalidating \`React.memo\` in children.

\`\`\`tsx
const onSubmit = useCallback((data) => save(data), []);
\`\`\`

**Golden rule**: don't optimize prematurely. Profile first, then memoize.`,
      },
    },
    {
      q: {
        es: "Cuándo NO usar useMemo/useCallback",
        en: "When NOT to use useMemo/useCallback",
      },
      a: {
        es: `Abusar de estos hooks añade complejidad y puede ralentizar más de lo que ayuda. Evítalos cuando:

- El cálculo sea trivial (concatenar strings, sumar pocos números).
- El componente hijo no esté memorizado (\`useCallback\` no evita re-render si el hijo no usa \`React.memo\`).
- Las dependencias cambien casi siempre.
- Aún no hayas medido un problema real.

El costo de mantener el cache y comparar dependencias solo se amortiza si el cálculo o el subárbol son costosos.`,
        en: `Overusing these hooks adds complexity and can slow things down. Avoid them when:

- The calculation is trivial (concatenating strings, summing a few numbers).
- The child component isn't memoized (\`useCallback\` won't prevent re-render if the child doesn't use \`React.memo\`).
- Dependencies change almost every render.
- You haven't measured a real problem yet.

The cost of maintaining the cache and comparing dependencies only pays off if the calculation or subtree is expensive.`,
      },
    },
    {
      q: {
        es: "Code splitting y lazy loading",
        en: "Code splitting and lazy loading",
      },
      a: {
        es: `Dividir el bundle permite cargar solo el código necesario para la ruta o componente actual.

\`\`\`tsx
const Dashboard = lazy(() => import("./Dashboard"));

<Suspense fallback={<Spinner />}>
  <Dashboard />
</Suspense>
\`\`\`

Técnicas comunes:
- **Route-based splitting**: una ruta = un chunk.
- **Component-based splitting**: modales, wizards, pesados editores.
- **Bibliotecas grandes**: cargar gráficas, mapas o editores solo cuando se usen.

Herramientas: Webpack/Vite/Rollup generan los chunks; React \`lazy\` + \`Suspense\` los consume.`,
        en: `Splitting the bundle lets you load only the code needed for the current route or component.

\`\`\`tsx
const Dashboard = lazy(() => import("./Dashboard"));

<Suspense fallback={<Spinner />}>
  <Dashboard />
</Suspense>
\`\`\`

Common techniques:
- **Route-based splitting**: one route = one chunk.
- **Component-based splitting**: modals, wizards, heavy editors.
- **Large libraries**: load charts, maps, or editors only when needed.

Tools: Webpack/Vite/Rollup generate the chunks; React \`lazy\` + \`Suspense\` consume them.`,
      },
    },
    {
      q: {
        es: "Virtualización de listas",
        en: "List virtualization",
      },
      a: {
        es: `Renderizar miles de filas o elementos DOM impacta memoria y scroll. La virtualización solo pinta lo visible.

Librerías populares:
- **react-window** → ligero, API simple.
- **react-virtualized** → más antiguo y completo.
- **@tanstack/react-virtual** → moderno, headless, flexible.

\`\`\`tsx
import { FixedSizeList as List } from "react-window";

<List
  height={400}
  itemCount={items.length}
  itemSize={35}
  width="100%"
>
  {({ index, style }) => <div style={style}>{items[index].name}</div>}
</List>
\`\`\``,
        en: `Rendering thousands of DOM rows or items impacts memory and scrolling. Virtualization only paints what's visible.

Popular libraries:
- **react-window** → lightweight, simple API.
- **react-virtualized** → older and more complete.
- **@tanstack/react-virtual** → modern, headless, flexible.

\`\`\`tsx
import { FixedSizeList as List } from "react-window";

<List
  height={400}
  itemCount={items.length}
  itemSize={35}
  width="100%"
>
  {({ index, style }) => <div style={style}>{items[index].name}</div>}
</List>
\`\`\``,
      },
    },
    {
      q: {
        es: "Colocación de estado (state colocation)",
        en: "State colocation",
      },
      a: {
        es: `Mantén el estado lo más cerca posible de donde se usa. Si un estado solo afecta a un hijo, no lo subas al ancestro global.

Beneficios:
- Menos re-renders en componentes que no dependen de ese estado.
- Código más fácil de entender y testear.
- Menos prop drilling.

\`\`\`tsx
// Mejor: el estado vive en el hijo
function Parent() {
  return <Counter />;
}

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
\`\`\``,
        en: `Keep state as close as possible to where it's used. If a state only affects one child, don't lift it to a global ancestor.

Benefits:
- Fewer re-renders in components that don't depend on that state.
- Code is easier to understand and test.
- Less prop drilling.

\`\`\`tsx
// Better: state lives in the child
function Parent() {
  return <Counter />;
}

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
\`\`\``,
      },
    },
    {
      q: {
        es: "Evitar inline objects y funciones en props",
        en: "Avoid inline objects and functions in props",
      },
      a: {
        es: `Crear objetos o funciones inline en cada render produce nuevas referencias, rompiendo memorizaciones.

\`\`\`tsx
// Mal: nuevo objeto en cada render
<Chart options={{ responsive: true }} />

// Mejor: definir fuera del componente o memoizar
const options = useMemo(() => ({ responsive: true }), []);
<Chart options={options} />
\`\`\`

Lo mismo aplica a funciones inline: usa \`useCallback\` cuando se pasen a componentes memorizados.

Excepción: si el hijo no está memorizado, la nueva referencia no importa.`,
        en: `Creating inline objects or functions on every render produces new references, breaking memoization.

\`\`\`tsx
// Bad: new object every render
<Chart options={{ responsive: true }} />

// Better: define outside the component or memoize
const options = useMemo(() => ({ responsive: true }), []);
<Chart options={options} />
\`\`\`

Same for inline functions: use \`useCallback\` when passing them to memoized components.

Exception: if the child isn't memoized, the new reference doesn't matter.`,
      },
    },
    {
      q: {
        es: "useTransition y useDeferredValue",
        en: "useTransition and useDeferredValue",
      },
      a: {
        es: `React 18 introduce actualizaciones concurrentes para mejorar la capacidad de respuesta.

**\`useTransition\`** marca una actualización como **no urgente**, permitiendo que React la interrumpa si llega algo más prioritario.

\`\`\`tsx
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setQuery(value); // puede retrasarse si hay input urgente
});
\`\`\`

**\`useDeferredValue\`** aplaza la actualización de un valor derivado para evitar bloquear renders urgentes.

\`\`\`tsx
const deferredQuery = useDeferredValue(query);
// Usa deferredQuery en listas filtradas pesadas
\`\`\``,
        en: `React 18 introduces concurrent updates to improve responsiveness.

**\`useTransition\`** marks an update as **non-urgent**, allowing React to interrupt it if something more important arrives.

\`\`\`tsx
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setQuery(value); // can be delayed if urgent input arrives
});
\`\`\`

**\`useDeferredValue\`** defers the update of a derived value to avoid blocking urgent renders.

\`\`\`tsx
const deferredQuery = useDeferredValue(query);
// Use deferredQuery in heavy filtered lists
\`\`\``,
      },
    },
    {
      q: {
        es: "Profiler de React",
        en: "React Profiler",
      },
      a: {
        es: `El **Profiler** mide cuánto tarda renderizar un árbol y qué componentes son los más costosos.

\`\`\`tsx
import { Profiler } from "react";

<Profiler id="App" onRender={onRenderCallback}>
  <App />
</Profiler>;

function onRenderCallback(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) {
  console.log({ id, phase, actualDuration, baseDuration });
}
\`\`\`

- \`actualDuration\` → tiempo real del render actual.
- \`baseDuration\` → tiempo estimado sin memorización.
- \`phase\` → \`'mount'\` o \`'update'\`.

En desarrollo puedes usar React DevTools Profiler para una interfaz visual.`,
        en: `The **Profiler** measures how long it takes to render a tree and which components are most expensive.

\`\`\`tsx
import { Profiler } from "react";

<Profiler id="App" onRender={onRenderCallback}>
  <App />
</Profiler>;

function onRenderCallback(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) {
  console.log({ id, phase, actualDuration, baseDuration });
}
\`\`\`

- \`actualDuration\` → actual render time.
- \`baseDuration\` → estimated time without memoization.
- \`phase\` → \`'mount'\` or \`'update'\`.

In development you can use the React DevTools Profiler for a visual interface.`,
      },
    },
    {
      q: {
        es: "Optimización del bundle",
        en: "Bundle optimization",
      },
      a: {
        es: `Técnicas para reducir el JavaScript enviado al navegador:

1. **Tree shaking** → elimina código no usado. Usa imports nombrados y ESM.
2. **Code splitting** → \`React.lazy\` + \`Suspense\`.
3. **Dynamic imports** para librerías pesadas.
4. **Analizar el bundle** con herramientas como \`vite-bundle-visualizer\` o Webpack Bundle Analyzer.
5. **Reemplazar librerías** por alternativas más pequeñas cuando sea posible.
6. **Polyfills solo cuando sea necesario** y para navegadores objetivo.
7. **Compresión** gzip/brotli en el servidor.`,
        en: `Techniques to reduce JavaScript sent to the browser:

1. **Tree shaking** → removes unused code. Use named imports and ESM.
2. **Code splitting** → \`React.lazy\` + \`Suspense\`.
3. **Dynamic imports** for heavy libraries.
4. **Analyze the bundle** with tools like \`vite-bundle-visualizer\` or Webpack Bundle Analyzer.
5. **Replace libraries** with smaller alternatives when possible.
6. **Polyfills only when needed** and for target browsers.
7. **Compression** gzip/brotli on the server.`,
      },
    },
    {
      q: {
        es: "Imágenes y recursos lazy",
        en: "Lazy images and assets",
      },
      a: {
        es: `Las imágenes son uno de los recursos más pesados. Buenas prácticas:

- Usa \`loading="lazy"\` en imágenes fuera del viewport.
- Proporciona \`width\` y \`height\` para evitar saltos de layout (CLS).
- Usa formatos modernos: WebP, AVIF.
- Sirve tamaños responsivos con \`srcset\`.
- Considera \`decode="async"\` para no bloquear el hilo principal.

\`\`\`html
<img
  src="hero.avif"
  alt="Hero"
  width="800"
  height="600"
  loading="lazy"
  decoding="async"
/>
\`\`\``,
        en: `Images are one of the heaviest resources. Best practices:

- Use \`loading="lazy"\` for images outside the viewport.
- Provide \`width\` and \`height\` to avoid layout shifts (CLS).
- Use modern formats: WebP, AVIF.
- Serve responsive sizes with \`srcset\`.
- Consider \`decode="async"\` to avoid blocking the main thread.

\`\`\`html
<img
  src="hero.avif"
  alt="Hero"
  width="800"
  height="600"
  loading="lazy"
  decoding="async"
/>
\`\`\``,
      },
    },
    {
      q: {
        es: "Web Workers y tareas pesadas",
        en: "Web Workers and heavy tasks",
      },
      a: {
        es: `Operaciones costosas (procesar grandes datasets, compresión, cálculos criptográficos) bloquean el hilo principal y congelan la UI.

**Web Workers** ejecutan código en un hilo separado.

\`\`\`js
// worker.js
self.onmessage = (e) => {
  const result = heavyCalculation(e.data);
  self.postMessage(result);
};

// componente
const worker = useMemo(() => new Worker("./worker.js"), []);
worker.postMessage(largeData);
worker.onmessage = (e) => setResult(e.data);
\`\`\`

Alternativas modernas: **WebAssembly** para cálculos intensivos y **scheduler** de React para fragmentar trabajo.`,
        en: `Expensive operations (processing large datasets, compression, cryptographic calculations) block the main thread and freeze the UI.

**Web Workers** run code on a separate thread.

\`\`\`js
// worker.js
self.onmessage = (e) => {
  const result = heavyCalculation(e.data);
  self.postMessage(result);
};

// component
const worker = useMemo(() => new Worker("./worker.js"), []);
worker.postMessage(largeData);
worker.onmessage = (e) => setResult(e.data);
\`\`\`

Modern alternatives: **WebAssembly** for intensive calculations and React's **scheduler** for chunking work.`,
      },
    },
    {
      q: {
        es: "SSR, SSG y Server Components para carga",
        en: "SSR, SSG, and Server Components for loading",
      },
      a: {
        es: `Reducir el trabajo en el cliente mejora el tiempo de carga inicial.

- **SSR** (Server-Side Rendering): el servidor renderiza HTML en cada petición. Mejora FCP pero requiere hidratación.
- **SSG** (Static Site Generation): HTML se genera en build. Ideal para contenido estático; muy rápido.
- **Server Components (RSC)**: componentes que ejecutan solo en el servidor. No envían su código JS al cliente, reduciendo el bundle.

\`\`\`tsx
// Server Component en Next.js App Router
async function ProductList() {
  const products = await getProducts(); // solo en servidor
  return <ul>{products.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}
\`\`\``,
        en: `Reducing client-side work improves initial load time.

- **SSR** (Server-Side Rendering): the server renders HTML on each request. Improves FCP but requires hydration.
- **SSG** (Static Site Generation): HTML is generated at build time. Ideal for static content; very fast.
- **Server Components (RSC)**: components that run only on the server. Their JS code isn't sent to the client, reducing the bundle.

\`\`\`tsx
// Server Component in Next.js App Router
async function ProductList() {
  const products = await getProducts(); // server only
  return <ul>{products.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}
\`\`\``,
      },
    },
    {
      q: {
        es: "Reducer de renders con composición",
        en: "Reducing renders through composition",
      },
      a: {
        es: `A veces es mejor reestructurar el árbol en lugar de memorizar.

\`\`\`tsx
// Antes: el contador fuerza el re-render de todo Form
function Form() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Counter count={count} setCount={setCount} />
      <HeavyFields />
    </div>
  );
}

// Después: solo Counter re-renderiza
function Form() {
  return (
    <div>
      <Counter />
      <HeavyFields />
    </div>
  );
}
\`\`\`

Mover el estado hacia abajo limita el alcance de los re-renders.`,
        en: `Sometimes it's better to restructure the tree rather than memoize.

\`\`\`tsx
// Before: counter forces the whole Form to re-render
function Form() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Counter count={count} setCount={setCount} />
      <HeavyFields />
    </div>
  );
}

// After: only Counter re-renders
function Form() {
  return (
    <div>
      <Counter />
      <HeavyFields />
    </div>
  );
}
\`\`\`

Moving state down limits the scope of re-renders.`,
      },
    },
    {
      q: {
        es: "Métricas Web Vitals relevantes",
        en: "Relevant Web Vitals metrics",
      },
      a: {
        es: `Métricas clave para evaluar carga y respuesta:

- **LCP** (Largest Contentful Paint) → tiempo hasta que el elemento más grande es visible. Ideal < 2.5s.
- **INP** (Interaction to Next Paint) → latencia de interacciones. Ideal < 200ms.
- **CLS** (Cumulative Layout Shift) → estabilidad visual. Ideal < 0.1.
- **TTFB** (Time to First Byte) → tiempo del primer byte desde el servidor.
- **FCP** (First Contentful Paint) → primer contenido visible.

Herramientas: Lighthouse, PageSpeed Insights, \`web-vitals\` library, Chrome DevTools Performance.`,
        en: `Key metrics to evaluate loading and responsiveness:

- **LCP** (Largest Contentful Paint) → time until the largest element is visible. Ideal < 2.5s.
- **INP** (Interaction to Next Paint) → interaction latency. Ideal < 200ms.
- **CLS** (Cumulative Layout Shift) → visual stability. Ideal < 0.1.
- **TTFB** (Time to First Byte) → time until first byte from the server.
- **FCP** (First Contentful Paint) → first visible content.

Tools: Lighthouse, PageSpeed Insights, \`web-vitals\` library, Chrome DevTools Performance.`,
      },
    },
    {
      q: {
        es: "Errores comunes de performance en React",
        en: "Common React performance mistakes",
      },
      a: {
        es: `Patrones que suelen causar lentitud:

1. **Context con estado que cambia mucho** → todos los consumidores re-renderizan.
2. **Hooks de estado mal colocados** → re-render en cascada por todo el árbol.
3. **Crear funciones/objetos inline** en props de componentes memorizados.
4. **useEffect mal configurado** sin dependencias o con dependencias que cambian siempre.
5. **Renderizar listas grandes sin virtualizar**.
6. **Cargar librerías enteras** en lugar de imports específicos (tree shaking).
7. **Hidratar más de lo necesario** en SSR sin Server Components.

Siempre perfila antes de optimizar para no caer en optimizaciones inútiles.`,
        en: `Patterns that commonly cause slowness:

1. **Context with frequently changing state** → all consumers re-render.
2. **Poorly placed state hooks** → cascading re-renders across the tree.
3. **Creating inline functions/objects** in props of memoized components.
4. **Misconfigured useEffect** without dependencies or with dependencies that always change.
5. **Rendering large lists without virtualization**.
6. **Loading entire libraries** instead of specific imports (tree shaking).
7. **Over-hydrating** in SSR without Server Components.

Always profile before optimizing to avoid useless optimizations.`,
      },
    },
  ],
};
