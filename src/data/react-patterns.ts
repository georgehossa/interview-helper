import type { Topic } from "../types";

export const reactPatterns: Topic = {
  key: "react-patterns",
  name: "React Patterns",
  color: "#38bdf8",
  items: [
    {
      q: { es: "Compound Components", en: "Compound Components" },
      a: {
        es: `Patrón donde un componente expone subcomponentes que cooperan para compartir estado implícito. El padre maneja el estado vía Context y los hijos lo consumen — el consumidor final arma la composición libremente.

\`\`\`jsx
<Select default="es">
  <Select.Option value="es">Español</Select.Option>
  <Select.Option value="en">Inglés</Select.Option>
</Select>
\`\`\`

\`\`\`jsx
const SelectCtx = createContext();
function Select({ default: d, children }) {
  const [value, setValue] = useState(d);
  return (
    <SelectCtx.Provider value={{ value, setValue }}>
      {children}
    </SelectCtx.Provider>
  );
}
Select.Option = function ({ value, children }) {
  const { setValue } = useContext(SelectCtx);
  return <button onClick={() => setValue(value)}>{children}</button>;
};
\`\`\`

Es el patrón detrás de \`<select>/<option>\`, Radix UI, Headless UI, Reach UI. Ventaja senior: API declarativa y flexible — el usuario final controla el orden, className y la estructura del DOM, mientras el equipo mantiene la lógica con estado.`,
        en: `A pattern where a component exposes subcomponents that cooperate to share implicit state. The parent manages state via Context and the children consume it — the end consumer assembles the composition freely.

\`\`\`jsx
<Select default="en">
  <Select.Option value="es">Spanish</Select.Option>
  <Select.Option value="en">English</Select.Option>
</Select>
\`\`\`

\`\`\`jsx
const SelectCtx = createContext();
function Select({ default: d, children }) {
  const [value, setValue] = useState(d);
  return (
    <SelectCtx.Provider value={{ value, setValue }}>
      {children}
    </SelectCtx.Provider>
  );
}
Select.Option = function ({ value, children }) {
  const { setValue } = useContext(SelectCtx);
  return <button onClick={() => setValue(value)}>{children}</button>;
};
\`\`\`

It's the pattern behind \`<select>/<option>\`, Radix UI, Headless UI, Reach UI. Senior advantage: a declarative, flexible API — the end user controls the order, className, and DOM structure while the team keeps the stateful logic.`,
      },
    },
    {
      q: {
        es: "Custom Hooks como unidad de reutilización",
        en: "Custom Hooks as the unit of reuse",
      },
      a: {
        es: `Los **custom hooks** son el patrón moderno de React para reutilizar lógica con estado — suplen a HOCs y render props en la mayoría de casos.

\`\`\`jsx
function useUser(id) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch(\`/api/users/\${id}\`).then(r => r.json()).then(setUser);
  }, [id]);
  return user;
}
\`\`\`

Principios:
- Nombre con prefijo \`use\` (obligatorio para las reglas de hooks).
- Devuelve un valor o un array \`[state, actions]\` estilo \`useState\`.
- Encapsula **lógica**, no estado — cada componente obtiene su propia instancia.

Seniorostum: un hook puede componer otros hooks y ser testeado independientemente. Permite extraer lógica de fetch, de debounce, de media query, de auth — y el componente se queda solo con JSX. Es el principal motivo de que los HOC clásicos casi no se usen hoy.`,
        en: `**Custom hooks** are the modern React pattern to reuse stateful logic — they replace HOCs and render props in most cases.

\`\`\`jsx
function useUser(id) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch(\`/api/users/\${id}\`).then(r => r.json()).then(setUser);
  }, [id]);
  return user;
}
\`\`\`

Principles:
- Name with the \`use\` prefix (required by the rules of hooks).
- Return a value or a \`[state, actions]\` array \`useState\`-style.
- Encapsulate **logic**, not state — each component gets its own instance.

Senior note: a hook can compose other hooks and be tested independently. It lets you extract fetch, debounce, media-query, and auth logic — and the component is left with just JSX. It's the main reason classic HOCs are barely used today.`,
      },
    },
    {
      q: { es: "Render Props vs Hooks", en: "Render Props vs Hooks" },
      a: {
        es: `El patrón **render prop** pasa una función como prop que el componente invoca para saber qué renderizar — útil para compartir lógica entre componentes:

\`\`\`jsx
<Mouse>{pos => <Cursor x={pos.x} y={pos.y} /></Mouse>
\`\`\`

Hoy **se prefiere un custom hook** (\`useMouse()\` que retorna \`{x, y}\`) porque:
- No anida JSX — el componente queda más plano.
- No sufre del infierno de anidamiento de render props.
- Es más fácil testear y componer.

Conclusión senior: render props es un patrón histórico válido (React Router y Formik lo usaron), pero en código nuevo casi siempre un hook es más limpio. Render props sigue siendo útil cuando necesitas un **boundary de render** o inyectar children calculados por el padre.`,
        en: `The **render prop** pattern passes a function as a prop that the component invokes to decide what to render — useful to share logic between components:

\`\`\`jsx
<Mouse>{pos => <Cursor x={pos.x} y={pos.y} /></Mouse>
\`\`\`

Today **a custom hook is preferred** (\`useMouse()\` returning \`{x, y}\`) because:
- It doesn't nest JSX — the component stays flatter.
- It doesn't suffer the render-prop nesting hell.
- It's easier to test and compose.

Senior conclusion: render props is a valid historical pattern (React Router and Formik used it), but in new code a hook is almost always cleaner. Render props remain useful when you need a **render boundary** or to inject children computed by the parent.`,
      },
    },
    {
      q: {
        es: "Control Props (controlled pattern)",
        en: "Control Props (controlled pattern)",
      },
      a: {
        es: `Un componente es **controlado** cuando su estado lo dicta el padre via props (\`value\` + \`onChange\`); es **no controlado** cuando se autoadministra con estado interno y se expone via ref.

\`\`\`jsx
// Controlado — la fuente de verdad está arriba
<Input value={email} onChange={setEmail} />

// No controlado — input autónomo, se lee con ref al final
<input ref={emailRef} defaultValue="" />
\`\`\`

Principio senior: el patrón controlado da un **single source of truth** arriba en el árbol, lo que facilita validar, formatear, persistir y sincronizar varios campos. Por eso todos los form libs (React Hook Form, Formik) lo soportan. El no controlado se reserva para inputs donde no necesitas vivir el valor en cada keystroke (menos renders).

Híbrido: puedes empezar no controlado y "levantar" el estado cuando necesites controlarlo (\`defaultValue\` + \`ref\`), o usar un patrón híbrido donde el componente tiene estado interno si el padre **no pasa** \`value\` (ver \`unstated\`, \`downshift\`).`,
        en: `A component is **controlled** when its state is dictated by the parent via props (\`value\` + \`onChange\`); it's **uncontrolled** when it self-manages with internal state and is read via ref.

\`\`\`jsx
// Controlled — the source of truth is up above
<Input value={email} onChange={setEmail} />

// Uncontrolled — autonomous input, read with a ref at the end
<input ref={emailRef} defaultValue="" />
\`\`\`

Senior principle: the controlled pattern gives a **single source of truth** higher in the tree, which makes validating, formatting, persisting, and synchronizing multiple fields easier. That's why all form libs (React Hook Form, Formik) support it. Uncontrolled is reserved for inputs where you don't need the value on every keystroke (fewer renders).

Hybrid: you can start uncontrolled and "lift" the state when you need to control it (\`defaultValue\` + \`ref\`), or use a hybrid pattern where the component keeps internal state if the parent **doesn't pass** \`value\` (see \`unstated\`, \`downshift\`).`,
      },
    },
    {
      q: {
        es: "Prop drilling y cómo evitarlo",
        en: "Prop drilling and how to avoid it",
      },
      a: {
        es: `**Prop drilling** es pasar props por varios niveles intermedios que no las usan, solo para que lleguen al fondo. Se vuelve insostenible en árboles grandes.

Soluciones comunes:
- **Composition**: pasar el componente ya renderizado como \`children\` en vez de props sueltas — los intermediarios no necesitan saber nada.
- **Context**: exponer un valor global (tema, usuario, idioma) accesible por cualquier descendiente sin props.
- **Custom hook + estado local**: si el estado es de un subtree, encapsularlo en un hook y usar el hook donde haga falta.
- **Store externo** (Zustand, Jotai, Redux): cuando muchas partes del árbol necesitan el mismo estado y el Context provoca renders excesivos.

Cuidado senior: Context causa re-render de todos los consumidores en cada cambio. Para valores que cambian mucho (contador, texto de un input) usa \`useContext selector\` o una store con suscripciones selectivas.`,
        en: `**Prop drilling** is passing props through several intermediate levels that don't use them, just so they reach the bottom. It becomes unsustainable in large trees.

Common solutions:
- **Composition**: pass the component already rendered as \`children\` instead of loose props — intermediaries don't need to know anything.
- **Context**: expose a global value (theme, user, language) accessible by any descendant without props.
- **Custom hook + local state**: if the state belongs to a subtree, encapsulate it in a hook and use the hook where needed.
- **External store** (Zustand, Jotai, Redux): when many parts of the tree need the same state and Context causes excessive re-renders.

Senior note: Context causes a re-render of all consumers on every change. For values that change often (a counter, an input's text) use \`useContext selector\` or a store with selective subscriptions.`,
      },
    },
    {
      q: {
        es: "Context: uso correcto y trampas",
        en: "Context: correct use and pitfalls",
      },
      a: {
        es: `Context permite pasar datos a través del árbol **sin props en cada nivel**. Perfecto para **estado que cambia poco**: tema, usuario, locale, config.

Trampas senior:
- **Re-render de todos los consumidores** en cada cambio del \`Provider\`. Si guardas un objeto en Context y lo recreas cada render, todos los consumidores se re-renderizan aunque no les afecte.
- **Split de contexto**: divide contextos por frecuencia de cambio (\`ThemeContext\` vs \`UserContext\` vs \`CartContext\`).
- **Memoiza el valor**: \`value\` pasa por \`useMemo\` o lo construyes fuera del render.
- **Selectivo**: usa **context selector** o zustand/jotai para consumir solo el slice que te interesa.

\`\`\`jsx
const value = useMemo(() => ({ user, logout }), [user]);
<UserContext.Provider value={value}>{children}</UserContext.Provider>
\`\`\`

Anti-patrón: usar Context como sustituto de un store global para datos que cambian mucho (\`count\`, \`text\`). Ahí mejor un store de verdad.`,
        en: `Context lets data flow through the tree **without props at every level**. Perfect for **state that changes rarely**: theme, user, locale, config.

Senior pitfalls:
- **Re-render of all consumers** on every \`Provider\` change. If you store an object in Context and recreate it each render, all consumers re-render even if it doesn't affect them.
- **Split contexts**: divide them by frequency of change (\`ThemeContext\` vs \`UserContext\` vs \`CartContext\`).
- **Memoize the value**: \`value\` goes through \`useMemo\` or you build it outside the render.
- **Selective**: use a **context selector** or zustand/jotai to consume only the slice you care about.

\`\`\`jsx
const value = useMemo(() => ({ user, logout }), [user]);
<UserContext.Provider value={value}>{children}</UserContext.Provider>
\`\`\`

Anti-pattern: using Context as a substitute for a global store for data that changes often (\`count\`, \`text\`). There, a real store is better.`,
      },
    },
    {
      q: {
        es: "HOC (Higher-Order Component)",
        en: "HOC (Higher-Order Component)",
      },
      a: {
        es: `Un **HOC** es una función que **recibe un componente y devuelve otro** con funcionalidad añadida. Antes era el patrón estándar para auth, logging, fetch — hoy los custom hooks cubren la mayoría de casos.

\`\`\`jsx
function withAuth(Component) {
  return function Wrapped(props) {
    const user = useUser();
    if (!user) return <Login />;
    return <Component {...props} user={user} />;
  };
}
const Dashboard = withAuth(Home);
\`\`\`

Reglas senior:
- **No mutas el componente original** — envuelves.
- **Refs forward**: usa \`forwardRef\` para no perder el ref.
- **DisplayName**: setea \`WrappedComponent.displayName\` para debugging.
- **Cuidado con el inventario de props** — no pises las que ya recibe.

HOC sigue siendo válido para **interoperabilidad con librerías** (React Router's \`withRouter\` legacy, Redux's \`connect\`) pero en código nuevo prefiere un hook.`,
        en: `An **HOC** is a function that **takes a component and returns another** with added functionality. It used to be the standard pattern for auth, logging, fetch — today custom hooks cover most cases.

\`\`\`jsx
function withAuth(Component) {
  return function Wrapped(props) {
    const user = useUser();
    if (!user) return <Login />;
    return <Component {...props} user={user} />;
  };
}
const Dashboard = withAuth(Home);
\`\`\`

Senior rules:
- **Don't mutate the original component** — wrap it.
- **Forward refs**: use \`forwardRef\` so you don't lose the ref.
- **DisplayName**: set \`WrappedComponent.displayName\` for debugging.
- **Careful with the prop inventory** — don't overwrite the ones it already receives.

HOCs are still valid for **library interop** (legacy React Router's \`withRouter\`, Redux's \`connect\`) but in new code prefer a hook.`,
      },
    },
    {
      q: {
        es: "Render optimization: memo, useMemo, useCallback",
        en: "Render optimization: memo, useMemo, useCallback",
      },
      a: {
        es: `React renderiza por defecto cuando cambian props o estado. Para evitar renders innecesarios:
- **React.memo**: envuelve un componente para saltar re-renders cuando las props son iguales (shallow).
- **useMemo**: cachea un valor calculado entre renders si las deps no cambiaron.
- **useCallback**: cachea una función — útil cuando se pasa como prop a un componente memoizado.

\`\`\`jsx
const HeavyList = React.memo(({ items }) => /* … */);
const Parent = () => {
  const [q, setQ] = useState("");
  const items = useMemo(() => filter(huge, q), [q]);
  return <HeavyList items={items} />;
};
\`\`\`

Trampas senior:
- **No abuses** — memoizar tiene coste. Solo acelera si el render original es caro y las props son estables.
- **Refs de props**: si pasas objetos/funcs inline, \`memo\` no sirve — \`useMemo\`/\`useCallback\` son necesarios.
- **React Compiler (experimental)**: próximamente hará esto automáticamente para muchos casos.`,
        en: `React re-renders by default when props or state change. To avoid unnecessary renders:
- **React.memo**: wraps a component to skip re-renders when props are equal (shallow).
- **useMemo**: caches a computed value across renders if deps didn't change.
- **useCallback**: caches a function — useful when passed as a prop to a memoized component.

\`\`\`jsx
const HeavyList = React.memo(({ items }) => /* … */);
const Parent = () => {
  const [q, setQ] = useState("");
  const items = useMemo(() => filter(huge, q), [q]);
  return <HeavyList items={items} />;
};
\`\`\`

Senior pitfalls:
- **Don't overuse** — memoizing has a cost. It only speeds things up if the original render is expensive and props are stable.
- **Prop refs**: if you pass inline objects/funcs, \`memo\` is useless — \`useMemo\`/\`useCallback\` are required.
- **React Compiler (experimental)**: soon it will do this automatically for many cases.`,
      },
    },
    {
      q: {
        es: "Lifting state up vs colocación de estado",
        en: "Lifting state up vs state colocation",
      },
      a: {
        es: `Dos fuerzas en tensión:
- **Lifting up**: cuando dos hermanos necesitan compartir estado, sube al ancestro común. Fuente única de verdad. Pero puede acoplar componentes distantes y provocar renders en cadena.
- **Colocar cerca**: dejar el estado en el componente más bajo que lo usa — reduce renders y acoplamiento.

Decisión senior:
- Si solo lo usa uno → local.
- Si lo usan dos hermanos → sube al padre común inmediato.
- Si lo usan partes lejanas del árbol → Context o store externa.
- Si es estado de servidor (server state) → \`React Query\`/\`SWR\` y desaparece del árbol (cache global, dedupe, invalidation).

Goal: minimizar la distancia entre el estado y donde se consume, y usar el server-cache para datos que vienen de la red.`,
        en: `Two forces in tension:
- **Lifting up**: when two siblings need to share state, lift it to the common ancestor. Single source of truth. But it can couple distant components and cause chain re-renders.
- **Place it close**: keep the state in the lowest component that uses it — fewer re-renders and less coupling.

Senior decisions:
- If only one uses it → local.
- If two siblings use it → lift it to the immediate common parent.
- If distant parts use it → Context or an external store.
- If it's server state → \`React Query\`/\`SWR\` and it disappears from the tree (global cache, dedupe, invalidation).

Goal: minimize the distance between the state and where it's consumed, and use the server-cache for data that comes from the network.`,
      },
    },
    {
      q: {
        es: "Prop combination / spread props",
        en: "Prop combination / spread props",
      },
      a: {
        es: `Patrón pequeño pero idiomático: reunir props en un objeto y esparcirlas sobre el componente, opcionalmente sobrescribiendo algunas.

\`\`\`jsx
function Button({ size, ...rest }) {
  return <button className={\`btn-\${size}\`} {...rest} />;
}
\`\`\`

Reglas senior:
- **Orden importa**: \`{...rest}\` primero permite que las props explícitas ganen; al revés, las externas pisan las tuyas. Decisión consciente.
- **className**: combina con \`clsx\`/\`twMerge\` en vez de pisar — \`className={clsx(base, rest.className)}\`.
- **Evita \`{...props}\` ciego**: documenta y控制a qué aceptas — de lo contrario expones cualquier atributo del DOM yrompes el contrato.`,
        en: `A small but idiomatic pattern: gather props into an object and spread them onto the component, optionally overriding some.

\`\`\`jsx
function Button({ size, ...rest }) {
  return <button className={\`btn-\${size}\`} {...rest} />;
}
\`\`\`

Senior rules:
- **Order matters**: \`{...rest}\` first lets explicit props win; the other way, external ones override yours. A conscious decision.
- **className**: combine with \`clsx\`/\`twMerge\` instead of overwriting — \`className={clsx(base, rest.className)}\`.
- **Avoid blind \`{...props}\`**: document and control what you accept — otherwise you expose any DOM attribute and break the contract.`,
      },
    },
    {
      q: {
        es: "Compound state con useReducer",
        en: "Compound state with useReducer",
      },
      a: {
        es: `Cuando un componente maneja **varias variables de estado relacionadas** (form, stepper, juego), \`useState\` suelta se vuelve un infierno de \`setState\` secuenciados y states desincronizados.

\`\`\`jsx
function reducer(state, action) {
  switch (action.type) {
    case "next": return { ...state, step: state.step + 1, error: null };
    case "error": return { ...state, error: action.message };
    default: return state;
  }
}
const [state, dispatch] = useReducer(reducer, { step: 1, error: null });
\`\`\`

Beneficios senior:
- **Transiciones atómicas**: un dispatch actualiza varias propiedades a la vez.
- **Lógica centralizada**: en lugar de callbacks esparcidos, el reducer describe las transiciones válidas.
- **Debuggable**: log cada action, reproducción determinista.
- **Extracción**: el reducer es una función pura, fácil de testear por fuera de React.

Regla práctica: 3+ states relacionados + transiciones → useReducer. 1–2 states independientes → useState.`,
        en: `When a component manages **several related state variables** (form, stepper, game), loose \`useState\` becomes a hell of sequenced \`setState\` calls and desynced state.

\`\`\`jsx
function reducer(state, action) {
  switch (action.type) {
    case "next": return { ...state, step: state.step + 1, error: null };
    case "error": return { ...state, error: action.message };
    default: return state;
  }
}
const [state, dispatch] = useReducer(reducer, { step: 1, error: null });
\`\`\`

Senior benefits:
- **Atomic transitions**: one dispatch updates several properties at once.
- **Centralized logic**: instead of scattered callbacks, the reducer describes valid transitions.
- **Debuggable**: log each action, deterministic replay.
- **Extraction**: the reducer is a pure function, easy to test outside of React.

Practical rule: 3+ related states + transitions → useReducer. 1–2 independent states → useState.`,
      },
    },
    {
      q: { es: "Error Boundaries", en: "Error Boundaries" },
      a: {
        es: `Un **error boundary** es un componente que captura errores de JavaScript en su subárbol durante el render y muestra un fallback en vez de romper todo el árbol. Solo de clases (aún no hay hook equivalente).

\`\`\`jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { logError(error, info); }
  render() {
    return this.state.hasError
      ? this.props.fallback
      : this.props.children;
  }
}
\`\`\`

Capturan errores de **render**, de **lifecycle** y de **constructores de hijos**. NO atrapan: event handlers, setTimeout, async, SSR. Para esos usa \`try/catch\`.

Senior:
- Ubica boundaries **estratégicamente**: uno cerca de cada feature crítica (un boundary por widget, no uno solo global — así una falla en un componente no rompe toda la página).
- \`react-error-boundary\` aporta esta API con \`resetKeys\`, \`onError\` y recovery.`,
        en: `An **error boundary** is a component that catches JavaScript errors in its subtree during render and shows a fallback instead of breaking the whole tree. Class components only (no hook equivalent yet).

\`\`\`jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { logError(error, info); }
  render() {
    return this.state.hasError
      ? this.props.fallback
      : this.props.children;
  }
}
\`\`\`

They catch **render**, **lifecycle**, and **child constructor** errors. They do NOT catch: event handlers, setTimeout, async, SSR. For those use \`try/catch\`.

Senior:
- Place boundaries **strategically**: one near each critical feature (a boundary per widget, not a single global one — so a failure in one component doesn't break the whole page).
- \`react-error-boundary\` provides this API with \`resetKeys\`, \`onError\`, and recovery.`,
      },
    },
    {
      q: { es: "Portals", en: "Portals" },
      a: {
        es: `createPortal renderiza un subárbol en un **nodo del DOM distinto al del padre React**, normalmente \`document.body\`. Perfecto para modales, tooltips, popovers y overlays que no deben heredar \`overflow:hidden\` ni \`z-index\` del contexto.

\`\`\`jsx
function Modal({ children }) {
  return createPortal(
    <div className="modal">{children}</div>,
    document.body,
  );
}
\`\`\`

Aun renderizado en otro nodo, **el árbol de React sigue siendo el del padre** — el event bubbling es según el árbol React, no según el DOM real. Esto significa que un click dentro del modal sigue llegando al \`onClick\` del ancestro React. Muy valorado en senior para implementar componentes overlay que escapen de contenedores con overflow sin romper el árbol de eventos.`,
        en: `createPortal renders a subtree into a **DOM node different from the React parent's**, usually \`document.body\`. Perfect for modals, tooltips, popovers, and overlays that shouldn't inherit \`overflow:hidden\` or \`z-index\` from the context.

\`\`\`jsx
function Modal({ children }) {
  return createPortal(
    <div className="modal">{children}</div>,
    document.body,
  );
}
\`\`\`

Even though it's rendered in a different node, **the React tree is still the parent's** — event bubbling follows the React tree, not the real DOM. This means a click inside the modal still reaches the React ancestor's \`onClick\`. Highly valued at the senior level for implementing overlay components that escape \`overflow\` containers without breaking the event tree.`,
      },
    },
    {
      q: {
        es: "Sucio vs limpio: presentational vs container",
        en: "Dirty vs clean: presentational vs container",
      },
      a: {
        es: `Patrón clásico (pre-hooks): separa componentes en dos roles:
- **Presentational**: cómo se ve — UI pura, recibe datos por props, sin lógica.
- **Container**: qué hace — obtiene datos, maneja estado, pasa todo al presentacional.

\`\`\`jsx
// Container — lógica
function UserListContainer() {
  const users = useUsers();
  return <UserList users={users} />;
}
// Presentational — vista
function UserList({ users }) {
  return <ul>{users.map(u => <li>{u.name}</li>)}</ul>;
}
\`\`\`

**Nota senior**: hoy este split se hace con **custom hooks** — \`useUsers()\` es el "container", el componente solo lo consume. La idea de separar lógica de vista **sigue siendo válida**; lo que cambió es la herramienta. No dividas por dogma — solo si realmente reutilizas la vista o testeas independientemente.`,
        en: `A classic pattern (pre-hooks): split components into two roles:
- **Presentational**: how it looks — pure UI, receives data via props, no logic.
- **Container**: what it does — fetches data, manages state, passes everything to the presentational.

\`\`\`jsx
// Container — logic
function UserListContainer() {
  const users = useUsers();
  return <UserList users={users} />;
}
// Presentational — view
function UserList({ users }) {
  return <ul>{users.map(u => <li>{u.name}</li>)}</ul>;
}
\`\`\`

**Senior note**: today this split is done with **custom hooks** — \`useUsers()\` is the "container", the component just consumes it. The idea of separating logic from view **is still valid**; what changed is the tool. Don't split by dogma — only if you actually reuse the view or test it independently.`,
      },
    },
    {
      q: { es: "State colocation", en: "State colocation" },
      a: {
        es: `Principio: **coloca el estado lo más cerca posible de donde se usa**. Si un estado lo lee un solo componente, no lo subas al árbol "por si acaso". Cada prop que baja por el árbol es acoplamiento.

Guía senior:
- Estado local de UI (open/close, hover, valor de input intermedio) → local.
- Estado compartido por hermanos → sube al padre común **inmediato**.
- Estado compartido por primos lejanos → \`Context\` o \`store\` externa.
- Estado que simula servidor (cache, paginación) → **React Query / SWR** (lo gestiona fuera del árbol, con cache global y dedupe).

Coste de no respetar: componentes que re-renderizan sin razón, prop drilling, bugs de sincronización. Penaliza el rendimiento y la claridad.`,
        en: `Principle: **place the state as close as possible to where it's used**. If a state is read by a single component, don't lift it up the tree "just in case". Every prop that goes down the tree is coupling.

Senior guide:
- Local UI state (open/close, hover, intermediate input value) → local.
- Shared by siblings → lift to the **immediate** common parent.
- Shared by distant cousins → \`Context\` or an external \`store\`.
- State that mimics the server (cache, pagination) → **React Query / SWR** (managed outside the tree, with a global cache and dedupe).

Cost of not respecting it: components that re-render for no reason, prop drilling, sync bugs. It hurts performance and clarity.`,
      },
    },
    {
      q: { es: "Lazy loading y Suspense", en: "Lazy loading and Suspense" },
      a: {
        es: `Carga componentes pesados **bajo demanda** para reducir el bundle inicial y mejorar el TTI:

\`\`\`jsx
const Monaco = lazy(() => import("./Monaco"));
<Suspense fallback={<Spinner />}>
  <Monaco />
</Suspense>
\`\`\`

Usos típicos: editores, charts, mapas, modales. Combinado con \`next/dynamic\` o \`React.lazy\` se code-splitea por ruta o por feature.

Senior:
- **Prefetch** en idle: \`const mod = await import("…")\` cuando el usuario hover un botón — poco antes de necesitarlo.
- **SSR**: \`React.lazy\` no funciona en SSR; para Next usa \`next/dynamic\` o \`React.lazy + Suspense\` con \`ssr:false\`.
- **Error boundary** alrededor de \`Suspense\` para si falla la carga.
- **Streaming SSR** envía el fallback primero y reemplaza cuando el chunk llega.`,
        en: `Load heavy components **on demand** to reduce the initial bundle and improve TTI:

\`\`\`jsx
const Monaco = lazy(() => import("./Monaco"));
<Suspense fallback={<Spinner />}>
  <Monaco />
</Suspense>
\`\`\`

Typical uses: editors, charts, maps, modals. Combined with \`next/dynamic\` or \`React.lazy\` you code-split per route or per feature.

Senior:
- **Prefetch on idle**: \`const mod = await import("…")\` when the user hovers a button — a moment before they need it.
- **SSR**: \`React.lazy\` doesn't work in SSR; for Next use \`next/dynamic\` or \`React.lazy + Suspense\` with \`ssr:false\`.
- **Error boundary** around \`Suspense\` in case loading fails.
- **Streaming SSR** sends the fallback first and replaces it when the chunk arrives.`,
      },
    },
    {
      q: {
        es: "Patrones de data fetching en React",
        en: "Data fetching patterns in React",
      },
      a: {
        es: `Evolución histórica:
- **fetch-in-useEffect** (clásico): sencillo, pero race conditions, no cache, no dedupe, no invalidation. No recomendado hoy.
- **Custom hook + fetch**: aisla lógica, mejor pero sigue sin cache/invalidation.
- **React Query / SWR / RTK Query**: estado de servidor cacheado, dedupe de peticiones, retry, invalidation por key, stale-while-revalidate, mutations. Hoy es **el estándar**.
- **Server Components**: en Next App Router, el fetch se hace directamente en componentes del servidor async — no hay estado de cliente ni efectos.

Regla senior: trata la cache del servidor como **server state**, no como state local. No copies datos de una response a \`useState\` — usa el hook con su \`queryKey\` y deja a la lib invalidar/refetch cuando algo muta esa key.`,
        en: `Historical evolution:
- **fetch-in-useEffect** (classic): simple, but race conditions, no cache, no dedupe, no invalidation. Not recommended today.
- **Custom hook + fetch**: isolates logic, better but still no cache/invalidation.
- **React Query / SWR / RTK Query**: cached server state, request dedupe, retry, per-key invalidation, stale-while-revalidate, mutations. Today it's **the standard**.
- **Server Components**: in Next App Router, the fetch is done directly in async server components — no client state or effects.

Senior rule: treat server cache as **server state**, not as local state. Don't copy data from a response into \`useState\` — use the hook with its \`queryKey\` and let the lib invalidate/refetch when something mutates that key.`,
      },
    },
    {
      q: { es: "Optimistic UI", en: "Optimistic UI" },
      a: {
        es: `Actualizar la UI **antes** de que el servidor confirme, para dar respuesta instantánea. Si la mutation falla, se revierte.

\`\`\`jsx
const mutation = useMutation({
  mutationFn: api.like,
  onMutate: async (newLike) => {
    await queryClient.cancelQueries("likes");
    const prev = queryClient.getQueryData("likes");
    queryClient.setQueryData("likes", (old) => [...old, newLike]);
    return { prev };
  },
  onError: (_e, _v, ctx) => queryClient.setQueryData("likes", ctx.prev),
  onSettled: () => queryClient.invalidateQueries("likes"),
});
\`\`\`

Se usa en likes, toggles, drag&drop, edición inline. **Base senior**: el usuario percibe la app como instantánea, pero el backend sigue siendo la fuente de verdad — el rollback debe ser limpio. No abuses en operaciones críticas (pagos, órdenes) — ahí prefieres confirmed solo cuando el server responde.`,
        en: `Update the UI **before** the server confirms, to give an instant response. If the mutation fails, you roll back.

\`\`\`jsx
const mutation = useMutation({
  mutationFn: api.like,
  onMutate: async (newLike) => {
    await queryClient.cancelQueries("likes");
    const prev = queryClient.getQueryData("likes");
    queryClient.setQueryData("likes", (old) => [...old, newLike]);
    return { prev };
  },
  onError: (_e, _v, ctx) => queryClient.setQueryData("likes", ctx.prev),
  onSettled: () => queryClient.invalidateQueries("likes"),
});
\`\`\`

Used for likes, toggles, drag&drop, inline editing. **Senior baseline**: the user perceives the app as instant, but the backend remains the source of truth — the rollback must be clean. Don't overuse it for critical operations (payments, orders) — there you prefer confirmation only when the server responds.`,
      },
    },
    {
      q: {
        es: "Server Components y arquitectura de componentes",
        en: "Server Components and component architecture",
      },
      a: {
        es: `Con el **App Router** de Next 13+ el árbol React se divide en:
- **Server Components** (default): no llegan al cliente. Pueden \`await\` datos directamente, acceder a secretos, pero sin hooks ni handlers.
- **Client Components** (\`'use client'\`): se hidratan y son interactivos — hooks, eventos, browser APIs.

Patrones senior:
- **Server Component pasa Client Component como \`children\`** — el client sigue siendo interact aunque el padre haya sido renderizado en server.
- **Push 'use client' a las hojas**: no lo pongas en \`page.tsx\`, ponlo en el botón concreto. Minimiza el JS enviado al cliente.
- **Composición**: un Server Component orquesta fetch y pasa props serializables a un Client Component pequeño para interactivar.

Gran ganancia: el código de fetch y los secretos nunca llegan al bundle del navegador; el coste de fetch se mueve del cliente al servidor.`,
        en: `With Next 13+'s **App Router** the React tree splits into:
- **Server Components** (default): they never reach the client. They can \`await\` data directly and access secrets, but no hooks or handlers.
- **Client Components** (\`'use client'\`): they hydrate and are interactive — hooks, events, browser APIs.

Senior patterns:
- **A Server Component passes a Client Component as \`children\`** — the client stays interactive even though the parent was rendered on the server.
- **Push 'use client' to the leaves**: don't put it on \`page.tsx\`, put it on the concrete button. It minimizes the JS sent to the client.
- **Composition**: a Server Component orchestrates the fetch and passes serializable props to a small Client Component for interactivity.

Big win: the fetch code and secrets never reach the browser bundle; the cost of fetching moves from the client to the server.`,
      },
    },
    {
      q: { es: "Unidirectional Data Flow", en: "Unidirectional Data Flow" },
      a: {
        es: `Principio fundamental de React: **los datos fluyen en una sola dirección** (padre → hijo vía props), y la UI es una función pura del estado.

\`\`\`
State → UI → Event → State' → UI'
\`\`\`

- **State** vive en un lugar (useState, useReducer, store).
- La **UI** se deriva del state (sin mutar el DOM directamente).
- Los **events** (onClick, onChange) disparan updates del state.
- Al cambiar el state, la UI se re-renderiza — no comandos imperativos, no two-way binding mágico.

Contraste con Angular / Vue con two-way binding: ahí un cambio en el input actualiza el modelo y viceversa; en React, ambas direcciones son explícitas (controlado).

Ventaja senior: fácil razonar y testear — dado un estado, la UI es determinista. Redux/Zustand extienden esto a un **flujo unidireccional de acciones**, donde las acciones describen el cambio y el reducer lo aplica.`,
        en: `A fundamental React principle: **data flows in a single direction** (parent → child via props), and the UI is a pure function of the state.

\`\`\`
State → UI → Event → State' → UI'
\`\`\`

- **State** lives in one place (useState, useReducer, a store).
- The **UI** is derived from the state (without mutating the DOM directly).
- **Events** (onClick, onChange) trigger state updates.
- When the state changes, the UI re-renders — no imperative commands, no magical two-way binding.

Contrast with Angular / Vue's two-way binding: there, a change in the input updates the model and vice-versa; in React, both directions are explicit (controlled).

Senior advantage: easy to reason about and test — given a state, the UI is deterministic. Redux/Zustand extend this to a **unidirectional flow of actions**, where actions describe the change and the reducer applies it.`,
      },
    },
    {
      q: {
        es: "Compound Components con \`cloneElement\` (legacy)",
        en: "Compound Components with \`cloneElement\` (legacy)",
      },
      a: {
        es: `Forma histórica de implementar compound components antes de Context: \`React.cloneElement\` inyecta props a los hijos al vuelo.

\`\`\`jsx
function Tabs({ children }) {
  const [active, setActive] = useState(0);
  return React.Children.map(children, (child, i) =>
    React.cloneElement(child, { active: i === active, onClick: () => setActive(i) })
  );
}
\`\`\`

**Cuidado senior**: \`cloneElement\` sigue funcionando pero es **frágil**:
- Conflicto entre la prop que el usuario pasa y la que tú inyectas (\`onClick\` conflictivo).
- Type-safety débil en TS — los hijos pierden sus props tipadas.
- Difícil de componer y debugar.

En código nuevo **usa Context explícito** — queda claro qué props se comparten y TS puede tiparlas. Nota histórica porque lo verás en librerías antiguas (react-tabs, Material UI legacy).`,
        en: `Historical way to implement compound components before Context: \`React.cloneElement\` injects props into the children on the fly.

\`\`\`jsx
function Tabs({ children }) {
  const [active, setActive] = useState(0);
  return React.Children.map(children, (child, i) =>
    React.cloneElement(child, { active: i === active, onClick: () => setActive(i) })
  );
}
\`\`\`

**Senior caution**: \`cloneElement\` still works but it's **fragile**:
- A conflict between the prop the user passes and the one you inject (conflicting \`onClick\`).
- Weak type-safety in TS — children lose their typed props.
- Hard to compose and debug.

In new code **use explicit Context** — it's clear which props are shared and TS can type them. Historical note because you'll see it in old libraries (react-tabs, Material UI legacy).`,
      },
    },
    {
      q: {
        es: "Slot pattern con \`children\` y \`as\` prop",
        en: "Slot pattern with \`children\` and \`as\` prop",
      },
      a: {
        es: `Patrones de composición para evitar acoplar un componente a una etiqueta concreta:

**Slots con \`children\`**: en vez de aceptar \`header\`, \`body\`, \`footer\` props, acepta ya JSX.

\`\`\`jsx
<Card>
  <Header />
  <Body />
</Card>
\`\`\`

**\`as\` prop**: permite que el componente renderice una etiqueta distinta a la default.

\`\`\`jsx
<Button as="a" href="/x">Ir</Button>
// dentro: const Comp = as || "button"; return <Comp {...} />;
\`\`\`

Polymorphic components en TS: combinar \`as\` + tipos de \`ComponentProps\` permite reusar el mismo \`Button\` como \`<button>\` o \`<a>\` con tipos correctos. Es el patrón que usan Radix, Chakra, Mantine para componentes primitivos.`,
        en: `Composition patterns to avoid coupling a component to a specific tag:

**Slots with \`children\`**: instead of accepting \`header\`, \`body\`, \`footer\` props, accept JSX directly.

\`\`\`jsx
<Card>
  <Header />
  <Body />
</Card>
\`\`\`

**\`as\` prop**: lets the component render a different tag than the default.

\`\`\`jsx
<Button as="a" href="/x">Go</Button>
// inside: const Comp = as || "button"; return <Comp {...} />;
\`\`\`

Polymorphic components in TS: combining \`as\` + \`ComponentProps\` types lets you reuse the same \`Button\` as a \`<button>\` or an \`<a>\` with correct types. It's the pattern used by Radix, Chakra, and Mantine for primitive components.`,
      },
    },
  ],
};