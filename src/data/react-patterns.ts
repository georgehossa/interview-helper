import type { Topic } from "../types";

export const reactPatterns: Topic = {
  key: "react-patterns",
  name: "React Patterns",
  color: "#38bdf8",
  items: [
    {
      q: "Compound Components",
      a: `Patrón donde un componente expone subcomponentes que cooperan para compartir estado implícito. El padre maneja el estado vía Context y los hijos lo consumen — el consumidor final arma la composición libremente.

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

Es el patrón detrás de \`<select>/<option>\`, Radix UI, Headless UI, Reach UI. Ventaja senior: API declarativa y flexible — el usuario final controla el orden,ClassName y la estructura del DOM, mientras el equipo mantiene la lógica con estado.`,
    },
    {
      q: "Custom Hooks como unidad de reutilización",
      a: `Los **custom hooks** son el patrón moderno de React para reutilizar lógica con estado — suplen a HOCs y render props en la mayoría de casos.

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
    },
    {
      q: "Render Props vs Hooks",
      a: `El patrón **render prop** pasa una función como prop que el componente invoca para saber qué renderizar — útil para compartir lógica entre componentes:

\`\`\`jsx
<Mouse>{pos => <Cursor x={pos.x} y={pos.y} /></Mouse>
\`\`\`

Hoy **se prefiere un custom hook** (\`useMouse()\` que retorna \`{x, y}\`) porque:
- No anida JSX — el componente queda más plano.
- No sufre del infierno de anidamiento de render props.
- Es más fácil testear y componer.

Conclusión senior: render props es un patrón histórico válido (React Router y Formik lo usaron), pero en código nuevo casi siempre un hook es más limpio. Render props sigue siendo útil cuando necesitas un **boundary de render** o inyectar children calculados por el padre.`,
    },
    {
      q: "Control Props (controlled pattern)",
      a: `Un componente es **controlado** cuando su estado lo dicta el padre via props (\`value\` + \`onChange\`); es **no controlado** cuando se autoadministra con estado interno y se expone via ref.

\`\`\`jsx
// Controlado — la fuente de verdad está arriba
<Input value={email} onChange={setEmail} />

// No controlado — input autónomo, se lee con ref al final
<input ref={emailRef} defaultValue="" />
\`\`\`

Principio senior: el patrón controlado da un **single source of truth** arriba en el árbol, lo que facilita validar, formatear, persistir y sincronizar varios campos. Por eso todos los form libs (React Hook Form, Formik) lo soportan. El no controlado se reserva para inputs donde no necesitas vivir el valor en cada keystroke (menos renders).

Libmad\`: puedes empezar no controlado y "levantar" el estado cuando necesites controlarlo (\`defaultValue\` + \`ref\`), o usar un patrón híbrido donde el componente tiene estado interno si el padre **no pasa** \`value\` (VER \`unstated\`, \`downshift\`).`,
    },
    {
      q: "Prop drilling y cómo evitarlo",
      a: `**Prop drilling** es pasar props por varios niveles intermedios que no las usan, solo para que lleguen al fondo. Se vuelve insostenible en árboles grandes.

Soluciones comunes:
- **Composition**: pasar el componente ya renderizado como \`children\` en vez de props sueltas — los intermediarios no necesitan saber nada.
- **Context**: exponer un valor global (tema, usuario, idioma) accesible por cualquier descendiente sin props.
- **Custom hook + estado local**: si el estado es de un subtree, encapsularlo en un hook y usar el hook donde haga falta.
- **Store externo** (Zustand, Jotai, Redux): cuando muchas partes del árbol necesitan el mismo estado y el Context provoca renders excesivos.

Cuidado senior: Context causa re-render de todos los consumidores en cada cambio. Para valores que cambian mucho (contador, texto de un input) usa \`useContext selector\` o una store con suscripciones selectivas.`,
    },
    {
      q: "Context: uso correcto y trampas",
      a: `Context permite pasar datos a través del árbol **sin props en cada nivel**. Perfecto para **estado que cambia poco**: tema, usuario, locale, config.

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
    },
    {
      q: "HOC (Higher-Order Component)",
      a: `Un **HOC** es una función que **recibe un componente y devuelve otro** con funcionalidad añadida. Antes era el patrón estándar para auth, logging, fetch — hoy los custom hooks cubren la mayoría de casos.

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
    },
    {
      q: "Render optimization: memo, useMemo, useCallback",
      a: `React renderiza por defecto cuando cambian props o estado. Para evitar renders innecesarios:
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
- **No abuses** — memoizar tiene coste y DateTimeKind. Solo acelera si el render original es caro y las props son estables.
- **Refs de props**: si pasas objetos/funcs inline, \`memo\` no sirve — \`useMemo\`/\`useCallback\` son necesarios.
- **React Compiler (experimental)**: próximamente hará esto automáticamente para muchos casos.`,
    },
    {
      q: "Lifting state up vs colocación de estado",
      a: `Dos fuerzas en tensión:
- **Lifting up**: cuando dos hermanos necesitan compartir estado, sube al ancestro común. Fuente única de verdad. Pero puede acoplar componentes distantes y provocar renders en cadena.
- **Colocar cerca**: dejar el estado en el componente más bajo que lo usa — reduce renders y acoplamiento.

Decisión senior:
- Si solo lo usa uno → local.
- Si lo usan dos hermanos → sube al padre común inmediato.
- Si lo usan partes lejanas del árbol → Context o store externa.
- Si es estado de servidor (server state) → \`React Query\`/\`SWR\` y desaparece del árbol (cache global, dedupe, invalidation).

Goal: minimizar la distancia entre el estado y donde se consume, y usar el server-cache para datos que vienen de la red.`,
    },
    {
      q: "Prop combination / spread props",
      a: `Patrón pequeño pero idiomático: reunir props en un objeto y esparcirlas sobre el componente, opcionalmente sobrescribiendo algunas.

\`\`\`jsx
function Button({ size, ...rest }) {
  return <button className={\`btn-\${size}\`} {...rest} />;
}
\`\`\`

Reglas senior:
- **Orden importa**: \`{...rest}\` primero permite que las props explícitas ganen; al revés, las externas pisan las tuyas. Decisión consciente.
- **className**: combina con \`clsx\`/\`twMerge\` en vez de pisar — \`className={clsx(base, rest.className)}\`.
- **Evita \`{...props}\` ciego**: documenta y controla qué aceptas — de lo contrario expones cualquier atributo del DOM yrompes el contrato.`,
    },
    {
      q: "Compound state con useReducer",
      a: `Cuando un componente maneja **varias variables de estado relacionadas** (form, stepper, juego), \`useState\` suelta se vuelve un infierno de \`setState\` secuenciados y states desincronizados.

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
- **Debuggable**: log chaque action, reproducción deterministic.
- **Extracción**: el reducer es una función pura, fácil de testear por fuera de React.

Regla práctica: 3+ states relacionados + transiciones → useReducer. 1–2 states independientes → useState.`,
    },
    {
      q: "Error Boundaries",
      a: `Un **error boundary** es un componente que captura errores de JavaScript en su subárbol durante el render y muestra un fallback en vez de romper todo el árbol. Solo de clases (aún no hay hook equivalente).

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

capturan errores de **render**, de **lifecycle** y de **constructores de hijos**. NO atrapan: event handlers, setTimeout, async, SSR. Para esos usa \`try/catch\`.

Senior:
- Ubica boundaries **estratégicamente**: uno cerca de cada feature crítica (un boundary por widget, no uno solo global — así una falla en un componente no rompe toda la página).
- \`react-error-boundary\` aporta esta API con \`resetKeys\`, \`onError\` y recovery.`,
    },
    {
      q: "Portals",
      a: `createPortal renderiza un subárbol en un **nodo del DOM distinto al del padreReact**, normalmente \`document.body\`. Perfecto para modales, tooltips, popovers y overlays que no deben heredar \`overflow:hidden\` ni \`z-index\` del contexto.

\`\`\`jsx
function Modal({ children }) {
  return createPortal(
    <div className="modal">{children}</div>,
    document.body,
  );
}
\`\`\`

Aun renderizado en otro nodo, **el árbol de React sigue siendo el del padre** — el event bubbling es según el árbol React, no según el DOM real. Esto significa que un click dentro del modal sigue llegando al \`onClick\` del ancestroReact. Muy valorado en senior para implementar componentes overlay que escapen de contenedores con overflow sin roer el árbol de eventos.`,
    },
    {
      q: "Sucio vs limpio: presentational vs container",
      a: `Patrón clásico (pre-hooks): separa componentes en dos roles:
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
    },
    {
      q: "State colocation",
      a: `Principio: **coloca el estado lo más cerca posible de donde se usa**. Si un estado lo lee un solo componente, no lo subas al árbol "por si acaso". Cada prop que baja por el árbol es acoplamiento.

Guía senior:
- Estado local de UI (open/close, hover, valor de input intermedio) → local.
- Estado compartido por hermanos → sube al padre común **inmediato**.
- Estado compartido por primos lejanos → \`Context\` o \`store\` externa.
- Estado que simula servidor (cache, paginación) → **React Query / SWR** (lo gestiona fuera del árbol, con cache global y dedupe).

Coste de no respetar: componentes que re-renderizan sin razón, prop drilling, bugs de sincronización. Penaliza el rendimiento y la claridad.`,
    },
    {
      q: "Lazy loading y Suspense",
      a: `Carga componentes pesados **bajo demanda** para reducir el bundle inicial y mejorar el TTI:

\`\`\`jsx
const Monaco = lazy(() => import("./Monaco"));
<Suspense fallback={<Spinner />}>
  <Monaco />
</Suspense>
\`\`\`

Usos típicos: editores, charts, mapas, modales. Combinado con \`next/dynamic\` o \`React.lazy\` se code-splitea por ruta o por feature.

Senior:
- **Prefetch** en idle: \`const mod = await import("…")\` cuando el usuario hover un botón — nano órdem de antes de necesitar.
- **SSR\`: \`React.lazy\` no funciona en SSR; para Next usa \`next/dynamic\` o \`React.lazy + Suspense\` con \`ssr:false\`.
- **Error boundary** alrededor de \`Suspense\` para si falla la carga.
- **Streaming SSR\` envía el fallback primero y reemplaza cuando el chunk llega.`,
    },
    {
      q: "Patrones de data fetching en React",
      a: `Evolución histórica:
- **fetch-in-useEffect** (clásico): sencillo, pero race conditions, no cache, no dedupe, no invalidation. No recomendado hoy.
- **Custom hook + fetch**: aisla lógica, mejor pero sigue sin cache/invalidation.
- **React Query / SWR / RTK Query**: estado de servidor cacheado, dedupe de peticiones, retry, invalidation por key, stale-while-revalidate, mutations. Hoy es **el estándar**.
- **Server Components**: en Next App Router, el fetch se hace directamente en componentes del servidor async — no hay estado de cliente ni efectos.

Regla senior: trata la cache del servidor como **server state**, no como state local. No copies datos de una response a \`useState\` —usea el hook con su \`queryKey\` y deja a la lib invalidar/refetch cuando algo muta esa key.`,
    },
    {
      q: "Optimistic UI",
      a: `Actualizar la UI **antes** de que el servidor confirme, para dar respuesta instantánea. Si la mutation falla, se revierte.

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
    },
    {
      q: "Server Components y arquitectura de componentes",
      a: `Con el **App Router** de Next 13+ el árbol React se divide en:
- **Server Components** (default): no llegan al cliente. Pueden \`await\` datos directamente, acceder a secretos, pero sin hooks ni handlers.
- **Client Components** (\`'use client'\`): hidrát y se interactivos — hooks, eventos, browser APIs.

Patrones senior:
- **Server Component pasa Client Component como \`children\`** — el client sigue siendo interact aunque el padre haya sido renderizado en server.
- **Push 'use client' a las hojas**: no lo pongas en \`page.tsx\`, ponlo en el botón concreto. Minimiza el JS enviado al cliente.
- **Composición**: un Server Component orquesta fetch y pasa props serializables a un Client Component pequeño para interactivar.

Gran ganancia: el código de fetch y los secretos nunca llegan al bundle del navegador; el coste de fetch se mueve del cliente al servidor.`,
    },
    {
      q: "Unidirectional Data Flow",
      a: `Principio fundamental de React: **los datos fluyen en una sola dirección** (padre → hijo vía props), y la UI es una función pura del estado.

\`\`\`
State → UI → Event → State' → UI'
\`\`\`

- **State** vive en un lugar (useState, useReducer, store).
- La **UI** se deriva del state (sin mutar el DOM directamente).
- Los **events** (onClick, onChange) disparan updates del state.
- Al cambiar el state, la UI se re-renderiza — no comandos imperativos, no two-way binding mágico.

Contraste con Angular / Vue con two-way binding: ahí un cambio en el input actualiza el modelo y viceversa; en React, ambas direcciones son explícitas (controlado).

Ventaja senior: fácil razonar y testear — dado un estado, la UI es determinista. ReduxZustand extienden esto a un **flujo unidireccional de acciones**, donde las acciones describen el cambio y el reducer lo aplica.`,
    },
    {
      q: "Compound Components con \`cloneElement\` (legacy)",
      a: `Forma histórica de implementar compound components antes de Context: \`React.cloneElement\` inyecta props a los hijos al vuelo.

\`\`\`jsx
function Tabs({ children }) {
  const [active, setActive] = useState(0);
  return React.Children.map(children, (child, i) =>
    React.cloneElement(child, { active: i === active, onClick: () => setActive(i) })
  );
}
\`\`\`

**Cuidado senior**: \`cloneElement\` sigue funcionando pero es **fragile**:
- Hypocresía entre la prop que el usuario pasa y la que tú inyectas (\`onClick\` conflictivo).
- Type-safety débil en TS — los niños pierden sus props tipadas.
- Difícil de componer y debugar.

En código nuevo **usa Context explícito** — queda claro qué props se comparten y TS puede tiparlas. Nota histórica porque lo verás en librerías antiguas (react-tabs, Material UI legacy).`,
    },
    {
      q: "Slot pattern con \`children\` y \`as\` prop",
      a: `Patrones de composición para evitar acoplar un componente a una etiqueta concreta:

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

Polymorphic components en TS: combination de \`as\` + tipos de \`ComponentProps\` permite reusar el mismo \`Button\` como \`<button>\` o \`<a>\` con tipos correctos. Es el patrón que usan Radix, Chakra, Mantine para componentes primitivos.`,
    },
  ],
};