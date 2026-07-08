import type { Topic } from "../types";

export const reactQuery: Topic = {
  key: "react-query",
  name: "React Query",
  color: "#ff4154",
  items: [
    {
      q: {
        es: "¿Qué es React Query (TanStack Query)?",
        en: "What is React Query (TanStack Query)?",
      },
      a: {
        es: `React Query es una librería para **gestionar estado del servidor** en React. Separa claramente el estado que viene de una API (*server state*) del estado local de la UI (*client state*).

Proporciona caché inteligente, revalidación automática, paginación, mutaciones optimistas y sincronización del estado sin escribir mucho boilerplate de Redux o Context.

\`\`\`tsx
const { data, isLoading } = useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
});
\`\`\``,
        en: `React Query is a library for **managing server state** in React. It cleanly separates state coming from an API (*server state*) from local UI state (*client state*).

It provides smart caching, automatic revalidation, pagination, optimistic mutations, and state synchronization without writing a lot of Redux or Context boilerplate.

\`\`\`tsx
const { data, isLoading } = useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
});
\`\`\``,
      },
    },
    {
      q: {
        es: "useQuery: queryKey y queryFn",
        en: "useQuery: queryKey and queryFn",
      },
      a: {
        es: `**\`queryFn\`** es la función asíncrona que devuelve los datos (fetch, axios, etc.).

**\`queryKey\`** es el identificador único de la consulta. Actúa como clave de caché y de dependencia: si cambia, React Query vuelve a ejecutar la petición.

\`\`\`tsx
const { data, error, isLoading } = useQuery({
  queryKey: ["user", userId],
  queryFn: () => fetchUser(userId),
});
\`\`\``,
        en: `**\`queryFn\`** is the async function that returns the data (fetch, axios, etc.).

**\`queryKey\`** is the unique identifier of the query. It acts as the cache key and dependency: if it changes, React Query re-runs the request.

\`\`\`tsx
const { data, error, isLoading } = useQuery({
  queryKey: ["user", userId],
  queryFn: () => fetchUser(userId),
});
\`\`\``,
      },
    },
    {
      q: {
        es: "Estados de carga y error en useQuery",
        en: "Loading and error states in useQuery",
      },
      a: {
        es: `React Query expone banderas derivadas del estado interno:

- \`isLoading\` → aún no hay datos ni error (primera carga).
- \`isFetching\` → la petición está en curso, incluye revalidaciones en segundo plano.
- \`isError\` → la última petición falló.
- \`isSuccess\` → la petición tuvo éxito y hay datos.
- \`status\` → \`'pending'\`, \`'error'\` o \`'success'\`.

\`\`\`tsx
const { data, isLoading, isError, error } = useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
});

if (isLoading) return <Spinner />;
if (isError) return <p>Error: {error.message}</p>;
\`\`\``,
        en: `React Query exposes flags derived from its internal state:

- \`isLoading\` → no data or error yet (initial load).
- \`isFetching\` → a request is in progress, including background revalidations.
- \`isError\` → the last request failed.
- \`isSuccess\` → the request succeeded and data exists.
- \`status\` → \`'pending'\`, \`'error'\`, or \`'success'\`.

\`\`\`tsx
const { data, isLoading, isError, error } = useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
});

if (isLoading) return <Spinner />;
if (isError) return <p>Error: {error.message}</p>;
\`\`\``,
      },
    },
    {
      q: {
        es: "Stale time vs cache time (gcTime)",
        en: "Stale time vs cache time (gcTime)",
      },
      a: {
        es: `Ambas controlan la caché, pero en momentos distintos:

- **\`staleTime\`** → tiempo durante el cual los datos se consideran frescos. Mientras estén frescos, React Query no vuelve a pedirlos al montar o enfocar la ventana.
- **\`gcTime\`** (*garbage collection time*, antes \`cacheTime\`) → tiempo que los datos inactivos permanecen en caché después de que ningún componente los use. Cuando expira, se eliminan.

Regla práctica: \`staleTime\` evita peticiones; \`gcTime\` conserva datos para reutilizarlos rápidamente.

\`\`\`tsx
useQuery({
  queryKey: ["dashboard"],
  queryFn: fetchDashboard,
  staleTime: 1000 * 60 * 5, // 5 minutos frescos
  gcTime: 1000 * 60 * 30,   // 30 min en caché
});
\`\`\``,
        en: `Both control caching, but at different moments:

- **\`staleTime\`** → how long data is considered fresh. While fresh, React Query won't refetch on mount or window focus.
- **\`gcTime\`** (*garbage collection time*, formerly \`cacheTime\`) → how long inactive data stays cached after no component uses it. After it expires, it's removed.

Practical rule: \`staleTime\` prevents requests; \`gcTime\` keeps data around for quick reuse.

\`\`\`tsx
useQuery({
  queryKey: ["dashboard"],
  queryFn: fetchDashboard,
  staleTime: 1000 * 60 * 5, // 5 minutes fresh
  gcTime: 1000 * 60 * 30,   // 30 minutes cached
});
\`\`\``,
      },
    },
    {
      q: {
        es: "Revalidación automática",
        en: "Automatic revalidation",
      },
      a: {
        es: `React Query revalida las consultas *stale* automáticamente en varios eventos:

- Al montar un componente (\`refetchOnMount\`).
- Al recuperar el foco de la ventana (\`refetchOnWindowFocus\`).
- Al reconectar la red (\`refetchOnReconnect\`).
- Manualmente con \`queryClient.refetchQueries\`.

Esto mantiene la UI sincronizada sin lógica extra de polling o eventos de red.

\`\`\`tsx
useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
  refetchOnWindowFocus: false,
});
\`\`\``,
        en: `React Query automatically revalidates *stale* queries on several events:

- When a component mounts (\`refetchOnMount\`).
- When the window regains focus (\`refetchOnWindowFocus\`).
- When the network reconnects (\`refetchOnReconnect\`).
- Manually with \`queryClient.refetchQueries\`.

This keeps the UI in sync without extra polling or network event logic.

\`\`\`tsx
useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
  refetchOnWindowFocus: false,
});
\`\`\``,
      },
    },
    {
      q: {
        es: "useMutation",
        en: "useMutation",
      },
      a: {
        es: `\`useMutation\` se usa para operaciones que **modifican** datos del servidor: POST, PUT, PATCH, DELETE.

A diferencia de \`useQuery\`, no se cachea ni revalida sola. Tú la disparas explícitamente con \`mutate\` y luego invalidas consultas relacionadas.

\`\`\`tsx
const { mutate, isPending } = useMutation({
  mutationFn: createUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
  },
});

mutate({ name: "Ana" });
\`\`\``,
        en: `\`useMutation\` is used for operations that **modify** server data: POST, PUT, PATCH, DELETE.

Unlike \`useQuery\`, it isn't cached or revalidated automatically. You trigger it explicitly with \`mutate\` and then invalidate related queries.

\`\`\`tsx
const { mutate, isPending } = useMutation({
  mutationFn: createUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
  },
});

mutate({ name: "Ana" });
\`\`\``,
      },
    },
    {
      q: {
        es: "Invalidación de consultas",
        en: "Query invalidation",
      },
      a: {
        es: `Después de una mutación se invalidan las claves afectadas para marcar sus datos como *stale*. React Query las revalida automáticamente en el próximo ciclo.

\`\`\`tsx
queryClient.invalidateQueries({ queryKey: ["users"] });

// Invalida claves que empiecen por "users" (ej. ["users", 1])
queryClient.invalidateQueries({ queryKey: ["users"], exact: false });
\`\`\`

También puedes usar \`setQueryData\` para actualizar la caché directamente sin esperar una petición.

\`\`\`tsx
queryClient.setQueryData(["users", id], (old) => ({
  ...old,
  name: "Nuevo nombre",
}));
\`\`\``,
        en: `After a mutation, invalidate the affected keys to mark their data as *stale*. React Query will automatically revalidate them on the next cycle.

\`\`\`tsx
queryClient.invalidateQueries({ queryKey: ["users"] });

// Invalidate keys starting with "users" (e.g., ["users", 1])
queryClient.invalidateQueries({ queryKey: ["users"], exact: false });
\`\`\`

You can also use \`setQueryData\` to update the cache directly without waiting for a request.

\`\`\`tsx
queryClient.setQueryData(["users", id], (old) => ({
  ...old,
  name: "New name",
}));
\`\`\``,
      },
    },
    {
      q: {
        es: "Actualizaciones optimistas",
        en: "Optimistic updates",
      },
      a: {
        es: `La UI se actualiza **antes** de que el servidor confirme la operación. Si falla, se revierte.

\`\`\`tsx
useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo) => {
    await queryClient.cancelQueries({ queryKey: ["todos", newTodo.id] });
    const previous = queryClient.getQueryData(["todos", newTodo.id]);
    queryClient.setQueryData(["todos", newTodo.id], newTodo);
    return { previous };
  },
  onError: (err, newTodo, context) => {
    queryClient.setQueryData(["todos", newTodo.id], context?.previous);
  },
  onSettled: (newTodo) => {
    queryClient.invalidateQueries({ queryKey: ["todos", newTodo?.id] });
  },
});
\`\`\``,
        en: `The UI is updated **before** the server confirms the operation. If it fails, it's rolled back.

\`\`\`tsx
useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo) => {
    await queryClient.cancelQueries({ queryKey: ["todos", newTodo.id] });
    const previous = queryClient.getQueryData(["todos", newTodo.id]);
    queryClient.setQueryData(["todos", newTodo.id], newTodo);
    return { previous };
  },
  onError: (err, newTodo, context) => {
    queryClient.setQueryData(["todos", newTodo.id], context?.previous);
  },
  onSettled: (newTodo) => {
    queryClient.invalidateQueries({ queryKey: ["todos", newTodo?.id] });
  },
});
\`\`\``,
      },
    },
    {
      q: {
        es: "Paginación con useQuery",
        en: "Pagination with useQuery",
      },
      a: {
        es: `La paginación normal usa un parámetro de página dentro de la \`queryKey\` para que cada página sea una entrada de caché independiente.

\`\`\`tsx
const [page, setPage] = useState(1);

const { data } = useQuery({
  queryKey: ["users", page],
  queryFn: () => fetchUsers(page),
  keepPreviousData: true, // evita pantalla en blanco al cambiar de página
});
\`\`\`

Para listas infinitas (scroll) se usa \`useInfiniteQuery\`, que mantiene un array de páginas y una función \`getNextPageParam\` para saber cuándo pedir más datos.`,
        en: `Regular pagination uses a page parameter inside the \`queryKey\` so each page is an independent cache entry.

\`\`\`tsx
const [page, setPage] = useState(1);

const { data } = useQuery({
  queryKey: ["users", page],
  queryFn: () => fetchUsers(page),
  keepPreviousData: true, // avoids blank screen when switching pages
});
\`\`\`

For infinite lists (scroll) use \`useInfiniteQuery\`, which keeps an array of pages and a \`getNextPageParam\` function to know when to fetch more data.`,
      },
    },
    {
      q: {
        es: "useInfiniteQuery",
        en: "useInfiniteQuery",
      },
      a: {
        es: `Hook especial para listados que crecen dinámicamente (scroll infinito o "load more").

\`\`\`tsx
const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
  useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: ({ pageParam = 1 }) => fetchProjects(pageParam),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });
\`\`\`

- \`fetchNextPage\` → pide la siguiente página.
- \`hasNextPage\` → indica si hay más contenido.
- \`isFetchingNextPage\` → carga de la siguiente página en curso.
- \`data.pages\` → array con cada página cargada.`,
        en: `Special hook for lists that grow dynamically (infinite scroll or "load more").

\`\`\`tsx
const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
  useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: ({ pageParam = 1 }) => fetchProjects(pageParam),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });
\`\`\`

- \`fetchNextPage\` → fetches the next page.
- \`hasNextPage\` → whether there is more content.
- \`isFetchingNextPage\` → next page loading in progress.
- \`data.pages\` → array with each loaded page.`,
      },
    },
    {
      q: {
        es: "Selectores en useQuery",
        en: "Selectors in useQuery",
      },
      a: {
        es: `La opción \`select\` transforma o filtra los datos devueltos por \`queryFn\`. Ayuda a evitar re-renders cuando solo una parte de los datos cambia.

\`\`\`tsx
const { data: completedCount } = useQuery({
  queryKey: ["todos"],
  queryFn: fetchTodos,
  select: (todos) => todos.filter((t) => t.done).length,
});
\`\`\`

Si el resultado de \`select\` no cambia (gracias a una referencia estable), el componente no se re-renderiza aunque otros campos del todo cambien.`,
        en: `The \`select\` option transforms or filters the data returned by \`queryFn\`. It helps avoid re-renders when only part of the data changes.

\`\`\`tsx
const { data: completedCount } = useQuery({
  queryKey: ["todos"],
  queryFn: fetchTodos,
  select: (todos) => todos.filter((t) => t.done).length,
});
\`\`\`

If the result of \`select\` doesn't change (thanks to a stable reference), the component won't re-render even if other todo fields change.`,
      },
    },
    {
      q: {
        es: "Manejo de errores y reintentos",
        en: "Error handling and retries",
      },
      a: {
        es: `React Query reintenta automáticamente las consultas fallidas con *backoff* exponencial. Puedes configurarlo por consulta o globalmente.

\`\`\`tsx
useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
  retry: 3,              // número de reintentos
  retryDelay: (attempt) => attempt * 1000,
});
\`\`\`

- \`retry\` en \`useMutation\` controla reintentos de mutaciones.
- El error se expone en \`error\` / \`isError\`.
- Puedes usar \`throwOnError\` o un \`ErrorBoundary\` para errores críticos.`,
        en: `React Query automatically retries failed queries with exponential *backoff*. You can configure it per query or globally.

\`\`\`tsx
useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
  retry: 3,              // number of retries
  retryDelay: (attempt) => attempt * 1000,
});
\`\`\`

- \`retry\` in \`useMutation\` controls mutation retries.
- The error is exposed via \`error\` / \`isError\`.
- You can use \`throwOnError\` or an \`ErrorBoundary\` for critical errors.`,
      },
    },
    {
      q: {
        es: "React Query vs Redux / Context",
        en: "React Query vs Redux / Context",
      },
      a: {
        es: `React Query **no reemplaza** a Redux o Context; resuelve un problema distinto.

| Aspecto | React Query | Redux / Context |
|---|---|---|
| Propósito | Estado del servidor | Estado global de la UI |
| Caché | Integrada y automática | Manual |
| Revalidación | Automática | Manual |
| Dependencias | \`queryKey\` | Selectores o contexto |
| Boilerplate | Muy reducido | Mayor |

Uso común: React Query para datos remotos, Context o Zustand/Jotai para tema, autenticación o estado local compartido.`,
        en: `React Query **doesn't replace** Redux or Context; it solves a different problem.

| Aspect | React Query | Redux / Context |
|---|---|---|
| Purpose | Server state | Global UI state |
| Caching | Built-in and automatic | Manual |
| Revalidation | Automatic | Manual |
| Dependencies | \`queryKey\` | Selectors or context |
| Boilerplate | Very reduced | Higher |

Common pattern: React Query for remote data, Context or Zustand/Jotai for theme, auth, or shared local state.`,
      },
    },
    {
      q: {
        es: "QueryClient y proveedores",
        en: "QueryClient and providers",
      },
      a: {
        es: `\`QueryClient\` es el cerebro de la caché. Normalmente se crea una vez y se provee en la raíz de la app.

\`\`\`tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
\`\`\`

\`ReactQueryDevtools\` permite inspeccionar caché, queries y mutaciones en desarrollo.`,
        en: `\`QueryClient\` is the brain of the cache. Usually created once and provided at the app root.

\`\`\`tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
\`\`\`

\`ReactQueryDevtools\` lets you inspect cache, queries, and mutations during development.`,
      },
    },
    {
      q: {
        es: "Prefetching y carga anticipada",
        en: "Prefetching and eager loading",
      },
      a: {
        es: `Puedes precargar datos antes de que sean necesarios para mejorar la velocidad percibida.

\`\`\`tsx
// Precarga al pasar el mouse sobre un enlace
function UserLink({ userId }: { userId: string }) {
  return (
    <Link
      to={\`/users/\${userId}\`}
      onMouseEnter={() =>
        queryClient.prefetchQuery({
          queryKey: ["users", userId],
          queryFn: () => fetchUser(userId),
          staleTime: 1000 * 60 * 10,
        })
      }
    >
      Ver usuario
    </Link>
  );
}
\`\`\`

También puedes usar \`queryClient.fetchQuery\` para datos que requieren espera explícita.`,
        en: `You can preload data before it's needed to improve perceived speed.

\`\`\`tsx
// Prefetch on hover
function UserLink({ userId }: { userId: string }) {
  return (
    <Link
      to={\`/users/\${userId}\`}
      onMouseEnter={() =>
        queryClient.prefetchQuery({
          queryKey: ["users", userId],
          queryFn: () => fetchUser(userId),
          staleTime: 1000 * 60 * 10,
        })
      }
    >
      View user
    </Link>
  );
}
\`\`\`

You can also use \`queryClient.fetchQuery\` for data that requires explicit waiting.`,
      },
    },
    {
      q: {
        es: "Dependent queries",
        en: "Dependent queries",
      },
      a: {
        es: `Una consulta depende de otra cuando necesita datos previos. Se controla con la opción \`enabled\`.

\`\`\`tsx
const { data: user } = useQuery({
  queryKey: ["user", id],
  queryFn: () => fetchUser(id),
});

const { data: projects } = useQuery({
  queryKey: ["projects", user?.id],
  queryFn: () => fetchProjects(user!.id),
  enabled: !!user?.id,
});
\`\`\`

Mientras \`enabled\` sea \`false\`, \`useQuery\` no ejecuta \`queryFn\` y permanece en \`pending\`.`,
        en: `A query depends on another when it needs previous data. Use the \`enabled\` option to control this.

\`\`\`tsx
const { data: user } = useQuery({
  queryKey: ["user", id],
  queryFn: () => fetchUser(id),
});

const { data: projects } = useQuery({
  queryKey: ["projects", user?.id],
  queryFn: () => fetchProjects(user!.id),
  enabled: !!user?.id,
});
\`\`\`

While \`enabled\` is \`false\`, \`useQuery\` won't run \`queryFn\` and stays in \`pending\`.`,
      },
    },
  ],
};
