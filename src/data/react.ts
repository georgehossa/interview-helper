import type { Topic } from "../types";

export const react: Topic = {
  key: "react",
  name: "React",
  color: "#61dafb",
  items: [
    {
      q: { es: "Componentes y props", en: "Components and props" },
      a: {
        es: `Un componente es una función que recibe **props** (entrada inmutable de solo lectura) y retorna JSX. Los props fluyen de padre a hijo (*one-way data flow*). Para comunicar de hijo a padre se pasan callbacks como props.`,
        en: `A component is a function that receives **props** (immutable read-only input) and returns JSX. Props flow from parent to child (*one-way data flow*). To communicate from child to parent, you pass callbacks as props.`,
      },
    },
    {
      q: {
        es: "Virtual DOM y reconciliación",
        en: "Virtual DOM and reconciliation",
      },
      a: {
        es: `React mantiene una representación en memoria del UI (**Virtual DOM**). En cada render compara el árbol nuevo con el anterior (**diffing**) y aplica solo los cambios mínimos al DOM real, que es lo costoso.`,
        en: `React keeps an in-memory representation of the UI (**Virtual DOM**). On each render it diffs the new tree against the previous one (**diffing**) and applies only the minimal changes to the real DOM — which is the expensive part.`,
      },
    },
    {
      q: { es: "Keys en listas", en: "Keys in lists" },
      a: {
        es: `La \`key\` identifica de forma estable cada elemento de una lista para que la reconciliación sepa qué se movió, agregó o quitó. Debe ser **única y estable** (un id), nunca el índice si la lista se reordena o filtra.`,
        en: `The \`key\` stably identifies each list item so reconciliation knows what moved, was added, or was removed. It must be **unique and stable** (an id), never the index if the list is reordered or filtered.`,
      },
    },
    {
      q: { es: "useState", en: "useState" },
      a: {
        es: `Declara estado local. Cambiarlo re-renderiza el componente.

\`\`\`jsx
const [count, setCount] = useState(0);
setCount(c => c + 1); // updater funcional
\`\`\`

Usa la forma de función cuando el nuevo estado depende del anterior.`,
        en: `Declares local state. Changing it re-renders the component.

\`\`\`jsx
const [count, setCount] = useState(0);
setCount(c => c + 1); // functional updater
\`\`\`

Use the function form when the new state depends on the previous one.`,
      },
    },
    {
      q: { es: "useEffect", en: "useEffect" },
      a: {
        es: `Ejecuta efectos secundarios (fetch, suscripciones, timers) tras el render. El **array de dependencias** controla cuándo corre:
- \`[]\`: solo al montar.
- \`[x]\`: cuando \`x\` cambia.
- sin array: en cada render.

El \`return\` es la función de **cleanup**.`,
        en: `Runs side effects (fetch, subscriptions, timers) after render. The **dependency array** controls when it runs:
- \`[]\`: only on mount.
- \`[x]\`: when \`x\` changes.
- no array: on every render.

The \`return\` is the **cleanup** function.`,
      },
    },
    {
      q: { es: "useMemo y useCallback", en: "useMemo and useCallback" },
      a: {
        es: `Optimizaciones. **useMemo** memoriza un *valor* calculado; **useCallback** memoriza una *función*. Ambos recalculan solo si cambian sus dependencias. No abuses de ellos.`,
        en: `Optimizations. **useMemo** memoizes a computed *value*; **useCallback** memoizes a *function*. Both recompute only when their dependencies change. Don't overuse them.`,
      },
    },
    {
      q: { es: "useRef", en: "useRef" },
      a: {
        es: `Devuelve un objeto mutable \`{current}\` que **persiste entre renders sin causarlos**. Usos: referenciar nodos del DOM, guardar valores que no deben re-renderizar (id de timers, valor previo).`,
        en: `Returns a mutable \`{current}\` object that **persists across renders without causing them**. Uses: referencing DOM nodes, storing values that shouldn't trigger re-renders (timer IDs, previous values).`,
      },
    },
    {
      q: { es: "useContext", en: "useContext" },
      a: {
        es: `Lee un valor de un \`Context\` sin pasar props por todos los niveles (*prop drilling*). Ideal para tema, usuario autenticado, idioma. Para estado complejo se combina con \`useReducer\`.`,
        en: `Reads a value from a \`Context\` without passing props through every level (*prop drilling*). Ideal for theme, authenticated user, language. Combine with \`useReducer\` for complex state.`,
      },
    },
    {
      q: {
        es: "Componentes controlados",
        en: "Controlled components",
      },
      a: {
        es: `Un input es **controlado** cuando su valor lo dicta el estado de React (\`value={x}\` + \`onChange\`). React es la única fuente de verdad. **No controlado**: el DOM mantiene el valor y se lee con un ref.`,
        en: `An input is **controlled** when its value is driven by React's state (\`value={x}\` + \`onChange\`). React is the single source of truth. **Uncontrolled**: the DOM keeps the value and you read it with a ref.`,
      },
    },
    {
      q: { es: "Lifting state up", en: "Lifting state up" },
      a: {
        es: `Cuando dos hermanos necesitan compartir estado, se **sube** al ancestro común más cercano y se pasa hacia abajo por props. Evita duplicar y desincronizar estado.`,
        en: `When two siblings need to share state, you **lift** it to the closest common ancestor and pass it down via props. It avoids duplicating and desynchronizing state.`,
      },
    },
    {
      q: { es: "Reglas de los Hooks", en: "Rules of Hooks" },
      a: {
        es: `- Solo se llaman en el **nivel superior** — nunca dentro de condicionales, loops o funciones anidadas.
- Solo en componentes de función o hooks personalizados.

Garantiza que el orden de los hooks sea estable entre renders.`,
        en: `- Only call them at the **top level** — never inside conditionals, loops, or nested functions.
- Only in function components or custom hooks.

This guarantees the hook order is stable across renders.`,
      },
    },
    {
      q: { es: "Custom hooks", en: "Custom hooks" },
      a: {
        es: `Funciones que empiezan por \`use\` y componen otros hooks para reutilizar lógica con estado (\`useFetch\`, \`useToggle\`). Comparten *lógica*, no estado: cada componente obtiene su propia instancia.`,
        en: `Functions starting with \`use\` that compose other hooks to reuse stateful logic (\`useFetch\`, \`useToggle\`). They share *logic*, not state — each component gets its own instance.`,
      },
    },
    {
      q: {
        es: "HOC (Higher-Order Components)",
        en: "HOC (Higher-Order Components)",
      },
      a: {
        es: `Un **HOC** es una función que **recibe un componente y devuelve otro componente** con funcionalidad añadida. Es un patrón para reutilizar lógica transversal (auth, logging, datos) entre varios componentes.

\`\`\`jsx
function withAuth(Component) {
  return (props) => {
    const user = useUser();
    if (!user) return <Login />;
    return <Component {...props} user={user} />;
  };
}
const Privado = withAuth(Dashboard);
\`\`\`

Convención: el nombre empieza por \`with\` (\`withRouter\`, \`withTheme\`). Hoy los **custom hooks** cubren la mayoría de estos casos de forma más simple, pero los HOC siguen apareciendo en librerías y código existente — por eso es buena pregunta de entrevista.`,
        en: `An **HOC** is a function that **takes a component and returns another component** with added functionality. It's a pattern for reusing cross-cutting logic (auth, logging, data) across several components.

\`\`\`jsx
function withAuth(Component) {
  return (props) => {
    const user = useUser();
    if (!user) return <Login />;
    return <Component {...props} user={user} />;
  };
}
const Protected = withAuth(Dashboard);
\`\`\`

Convention: the name starts with \`with\` (\`withRouter\`, \`withTheme\`). Today **custom hooks** cover most of these cases more simply, but HOCs still appear in libraries and existing code — that's why they're a good interview question.`,
      },
    },
    {
      q: { es: "Funciones puras", en: "Pure functions" },
      a: {
        es: `Una **función pura** cumple dos reglas:
- Con las mismas entradas, siempre devuelve la misma salida.
- No tiene **efectos secundarios**: no muta variables externas ni props, no escribe en el DOM, no hace llamadas de red.

React espera que tus componentes sean **puros durante el render**: dados los mismos props y estado, deben producir el mismo JSX sin mutar nada por fuera. Los efectos secundarios van en \`useEffect\` o en manejadores de eventos, nunca en el cuerpo del render.

\`\`\`js
// pura ✓
const doble = (n) => n * 2;

// impura ✗ — muta algo externo
let total = 0;
const suma = (n) => { total += n; };
\`\`\`

Beneficios: es predecible, fácil de testear y habilita optimizaciones como \`React.memo\`, que confía en que un mismo input produce un mismo output.`,
        en: `A **pure function** follows two rules:
- For the same inputs, always returns the same output.
- Has no **side effects**: doesn't mutate external variables or props, doesn't write to the DOM, makes no network calls.

React expects your components to be **pure during render**: given the same props and state, they should produce the same JSX without mutating anything outside. Side effects go in \`useEffect\` or event handlers, never in the render body.

\`\`\`js
// pure ✓
const double = (n) => n * 2;

// impure ✗ — mutates something external
let total = 0;
const add = (n) => { total += n; };
\`\`\`

Benefits: predictable, easy to test, and it enables optimizations like \`React.memo\`, which trusts that the same input produces the same output.`,
      },
    },
    {
      q: {
        es: "Componentes de clase vs funcionales",
        en: "Class vs functional components",
      },
      a: {
        es: `**Funcionales** son funciones que reciben props y retornan JSX. Son el estándar actual: más simples, fáciles de testear y pueden usar Hooks.

**De clase** extienden \`React.Component\`, usan \`render()\` y manejan estado en \`this.state\`. Requieren entender \`this\`, \`bind\` y el ciclo de vida.

| Aspecto | Clase | Funcional |
|---|---|---|
| Estado | \`this.state\` / \`this.setState\` | \`useState\` |
| Ciclo de vida | Métodos (\`componentDidMount\`, etc.) | \`useEffect\` |
| \`this\` | Sí | No |
| Hooks | No | Sí |

Hoy casi todo el código nuevo se escribe con componentes funcionales; las clases siguen vivas en bases de código antiguas.`,
        en: `**Functional** components are functions that receive props and return JSX. They are the current standard: simpler, easier to test, and can use Hooks.

**Class** components extend \`React.Component\`, use \`render()\`, and manage state in \`this.state\`. They require understanding \`this\`, \`bind\`, and the lifecycle.

| Aspect | Class | Functional |
|---|---|---|
| State | \`this.state\` / \`this.setState\` | \`useState\` |
| Lifecycle | Methods (\`componentDidMount\`, etc.) | \`useEffect\` |
| \`this\` | Yes | No |
| Hooks | No | Yes |

Today almost all new code is written with functional components; classes remain in older codebases.`,
      },
    },
    {
      q: {
        es: "Ciclo de vida en componentes de clase",
        en: "Lifecycle in class components",
      },
      a: {
        es: `Un componente de clase pasa por tres fases:

**1. Montaje (Mounting)**
- \`constructor()\` → inicializa estado y \`bind\`.
- \`static getDerivedStateFromProps()\` → raro, para derivar estado de props.
- \`render()\` → devuelve JSX.
- \`componentDidMount()\` → ideal para fetch, suscripciones o timers.

**2. Actualización (Updating)**
- \`static getDerivedStateFromProps()\`
- \`shouldComponentUpdate()\` → permite evitar re-render.
- \`render()\`
- \`getSnapshotBeforeUpdate()\` → captura info del DOM antes del cambio.
- \`componentDidUpdate(prevProps, prevState, snapshot)\` → responde a cambios.

**3. Desmontaje (Unmounting)**
- \`componentWillUnmount()\` → cleanup: cancelar fetch, timers, suscripciones.

**Manejo de errores**
- \`static getDerivedStateFromError()\`
- \`componentDidCatch()\` — *Error Boundaries*.`,
        en: `A class component goes through three phases:

**1. Mounting**
- \`constructor()\` → initialize state and \`bind\`.
- \`static getDerivedStateFromProps()\` → rare, derive state from props.
- \`render()\` → returns JSX.
- \`componentDidMount()\` → ideal for fetching, subscriptions, or timers.

**2. Updating**
- \`static getDerivedStateFromProps()\`
- \`shouldComponentUpdate()\` → can prevent re-render.
- \`render()\`
- \`getSnapshotBeforeUpdate()\` → capture DOM info before the change.
- \`componentDidUpdate(prevProps, prevState, snapshot)\` → react to changes.

**3. Unmounting**
- \`componentWillUnmount()\` → cleanup: cancel fetches, timers, subscriptions.

**Error handling**
- \`static getDerivedStateFromError()\`
- \`componentDidCatch()\` — *Error Boundaries*.`,
      },
    },
    {
      q: {
        es: "Ciclo de vida con Hooks",
        en: "Lifecycle with Hooks",
      },
      a: {
        es: `Los Hooks reemplazan los métodos de ciclo de vida con una API basada en sincronización:

\`\`\`jsx
useEffect(() => {
  // componentDidMount + componentDidUpdate
  console.log("montaje o cambio de dependencias");

  return () => {
    // componentWillUnmount + cleanup antes del próximo efecto
    console.log("cleanup");
  };
}, [deps]);
\`\`\`

**Equivalencias**
- Montaje: efecto con \`[]\`.
- Actualización: efecto con dependencias.
- Desmontaje: función de retorno del efecto.

**Nuevos hooks de ciclo de vida (React 18+)**
- \`useId\` → genera ids estables para accesibilidad.
- \`useTransition\` → marca actualizaciones como no urgentes.
- \`useDeferredValue\` → aplaza la actualización de un valor.
- \`useSyncExternalStore\` → suscripción a stores externas.
- \`useInsertionEffect\` → para inyectar estilos antes de layout.

A diferencia de las clases, un mismo componente puede tener varios \`useEffect\` separados por responsabilidad.`,
        en: `Hooks replace lifecycle methods with a synchronization-based API:

\`\`\`jsx
useEffect(() => {
  // componentDidMount + componentDidUpdate
  console.log("mount or dependency change");

  return () => {
    // componentWillUnmount + cleanup before the next effect
    console.log("cleanup");
  };
}, [deps]);
\`\`\`

**Equivalents**
- Mount: effect with \`[]\`.
- Update: effect with dependencies.
- Unmount: returned cleanup function.

**New lifecycle-related hooks (React 18+)**
- \`useId\` → stable ids for accessibility.
- \`useTransition\` → mark updates as non-urgent.
- \`useDeferredValue\` → defer a value update.
- \`useSyncExternalStore\` → subscribe to external stores.
- \`useInsertionEffect\` → inject styles before layout.

Unlike classes, a single component can have multiple \`useEffect\` calls split by responsibility.`,
      },
    },
    {
      q: {
        es: "useEffect vs useLayoutEffect",
        en: "useEffect vs useLayoutEffect",
      },
      a: {
        es: `Ambos ejecutan efectos secundarios, pero en **momentos distintos del commit**:

- \`useEffect\` → corre **después** de que React pinta el DOM en pantalla. No bloquea el render. Es el valor por defecto para fetch, suscripciones, timers.
- \`useLayoutEffect\` → corre **sincrónicamente** después de mutar el DOM pero **antes** de que el navegador lo pinte. Bloquea el pintado.

\`\`\`jsx
useLayoutEffect(() => {
  // Mide o muta el DOM antes de que el usuario vea el frame
  const { width } = ref.current.getBoundingClientRect();
  setWidth(width);
}, []);
\`\`\`

**Regla**: empieza con \`useEffect\`. Solo usa \`useLayoutEffect\` cuando notes parpadeo visual o necesites medir/mutar el DOM antes del paint.

En SSR, \`useLayoutEffect\` emite una advertencia porque no hay navegador; usa \`useEffect\` o un check de \`typeof window\`.`,
        en: `Both run side effects, but at **different points in the commit**:

- \`useEffect\` → runs **after** React paints the DOM to the screen. Does not block rendering. The default for fetch, subscriptions, timers.
- \`useLayoutEffect\` → runs **synchronously** after DOM mutations but **before** the browser paints. Blocks the paint.

\`\`\`jsx
useLayoutEffect(() => {
  // Measure or mutate the DOM before the user sees the frame
  const { width } = ref.current.getBoundingClientRect();
  setWidth(width);
}, []);
\`\`\`

**Rule**: start with \`useEffect\`. Only use \`useLayoutEffect\` when you see visual flicker or need to measure/mutate the DOM before paint.

In SSR, \`useLayoutEffect\` warns because there is no browser; use \`useEffect\` or a \`typeof window\` check.`,
      },
    },
    {
      q: {
        es: "Suspense",
        en: "Suspense",
      },
      a: {
        es: `\`<Suspense fallback={<Spinner />}>\` permite mostrar un UI temporal mientras los componentes hijos están **cargando** (datos, imágenes, código lazy).

\`\`\`jsx
const Perfil = lazy(() => import("./Perfil"));

<Suspense fallback={<Cargando />}>
  <Perfil />
</Suspense>
\`\`\`

**Cómo funciona**
- Un componente hijo levanta una "señal" de suspensión (por ejemplo, \`throw\` de una promesa o lazy load).
- React detiene el render de ese árbol y muestra el \`fallback\` más cercano.
- Cuando la promesa se resuelve, React reintenta el render.

**Caso clásico**: code splitting con \`React.lazy\`.

**React 18+**: Suspense también funciona con data fetching en frameworks compatibles (Next.js, Relay) y mejora la experiencia de carga concurrente.

**\`<SuspenseList>\`** (experimental) controla el orden en que se revelan múltiples Suspenses.`,
        en: `\`<Suspense fallback={<Spinner />}>\` lets you show a temporary UI while child components are **loading** (data, images, lazy code).

\`\`\`jsx
const Profile = lazy(() => import("./Profile"));

<Suspense fallback={<Loading />}>
  <Profile />
</Suspense>
\`\`\`

**How it works**
- A child component triggers a suspension signal (e.g., \`throw\`ing a promise or lazy loading).
- React pauses rendering that tree and shows the nearest \`fallback\`.
- When the promise resolves, React retries the render.

**Classic use case**: code splitting with \`React.lazy\`.

**React 18+**: Suspense also works with data fetching in compatible frameworks (Next.js, Relay) and improves concurrent loading UX.

**\`<SuspenseList>\`** (experimental) controls the reveal order of multiple Suspense boundaries.`,
      },
    },
  ],
};