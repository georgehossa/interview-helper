import type { Topic } from "../types";

export const nextjs: Topic = {
  key: "next",
  name: "Next.js",
  color: "#e2e8f0",
  items: [
    {
      q: {
        es: "¿Qué es Next.js y qué resuelve?",
        en: "What is Next.js and what does it solve?",
      },
      a: {
        es: `**Next.js** es el framework de React para producción: agrega lo que React no trae de fábrica — **routing** basado en archivos, **renderizado en servidor**, optimización de imágenes y fuentes, code splitting automático y API routes. Respuesta senior a '¿por qué Next y no React solo?': React puro renderiza todo en el cliente (mal SEO y primer pintado lento en apps grandes); Next permite elegir *por página* la estrategia de renderizado óptima.`,
        en: `**Next.js** is the production framework for React: it adds what React lacks out of the box — file-based **routing**, **server rendering**, image and font optimization, automatic code splitting, and API routes. Senior answer to 'why Next and not just React?': plain React renders everything on the client (poor SEO and slow first paint in large apps); Next lets you choose, *per page*, the optimal rendering strategy.`,
      },
    },
    {
      q: { es: "SSR, SSG, ISR y CSR", en: "SSR, SSG, ISR and CSR" },
      a: {
        es: `Las cuatro estrategias de renderizado — la pregunta senior por excelencia:
- **CSR** (Client-Side): el navegador recibe JS y construye la UI. Interactivo, pero SEO y primer pintado pobres.
- **SSR** (Server-Side): el HTML se genera *en cada petición*. Contenido siempre fresco y buen SEO; más carga en el servidor.
- **SSG** (Static Generation): el HTML se genera *en build* y se sirve desde CDN. Lo más rápido; ideal para contenido que no cambia por usuario.
- **ISR** (Incremental Static Regeneration): SSG que se *regenera* en segundo plano tras un intervalo (\`revalidate\`). Estático con datos razonablemente frescos, sin rebuild completo.

Criterio: dashboard personalizado → SSR/CSR; blog o marketing → SSG; e-commerce con miles de productos que cambian de precio → ISR.`,
        en: `The four rendering strategies — the senior question par excellence:
- **CSR** (Client-Side): the browser receives JS and builds the UI. Interactive, but poor SEO and first paint.
- **SSR** (Server-Side): HTML is generated *on every request*. Always-fresh content and good SEO; more server load.
- **SSG** (Static Generation): HTML is generated *at build* and served from a CDN. The fastest; ideal for content that doesn't change per user.
- **ISR** (Incremental Static Regeneration): SSG that *regenerates* in the background after an interval (\`revalidate\`). Static with reasonably fresh data, no full rebuild.

Criteria: custom dashboard → SSR/CSR; blog or marketing → SSG; e-commerce with thousands of price-changing products → ISR.`,
      },
    },
    {
      q: { es: "App Router vs Pages Router", en: "App Router vs Pages Router" },
      a: {
        es: `Los dos sistemas de rutas que conviven:
- **Pages Router** (\`/pages\`, clásico): cada archivo es una ruta; data fetching con \`getServerSideProps\` / \`getStaticProps\`.
- **App Router** (\`/app\`, desde v13, recomendado): basado en **React Server Components**, layouts anidados, streaming, y data fetching con \`fetch\` directamente en componentes async.

Archivos especiales del App Router: \`page.tsx\` (la ruta), \`layout.tsx\` (UI compartida que *no se re-renderiza* al navegar), \`loading.tsx\` (Suspense automático), \`error.tsx\` (error boundary), \`route.ts\` (endpoints API).`,
        en: `The two coexisting routing systems:
- **Pages Router** (\`/pages\`, classic): each file is a route; data fetching with \`getServerSideProps\` / \`getStaticProps\`.
- **App Router** (\`/app\`, from v13, recommended): based on **React Server Components**, nested layouts, streaming, and data fetching with \`fetch\` directly in async components.

App Router special files: \`page.tsx\` (the route), \`layout.tsx\` (shared UI that *doesn't re-render* on navigation), \`loading.tsx\` (automatic Suspense), \`error.tsx\` (error boundary), \`route.ts\` (API endpoints).`,
      },
    },
    {
      q: {
        es: "Server Components vs Client Components",
        en: "Server Components vs Client Components",
      },
      a: {
        es: `El corazón del App Router. **Server Components** (el *default*) se ejecutan solo en el servidor: su JS **nunca llega al bundle del cliente**, pueden acceder a BD o secretos directamente, pero no usan estado ni eventos. **Client Components** (marcados con \`'use client'\`) sí se hidratan en el navegador: hooks, eventos, APIs del browser.

\`\`\`tsx
// Server Component (default) — puede ser async
async function Page() {
  const data = await db.query(…);
  return <Lista items={data} />;
}

// Client Component
'use client';
function Boton() { const [n, setN] = useState(0); … }
\`\`\`

Patrón senior: empujar \`'use client'\` a las **hojas** del árbol (el botón interactivo, no la página entera) para minimizar el JS enviado. Un Server Component puede pasar otro como \`children\` de un Client Component, pero no importarse dentro de él.`,
        en: `The heart of the App Router. **Server Components** (the *default*) run only on the server: their JS **never reaches the client bundle**, they can access the DB or secrets directly, but they can't use state or events. **Client Components** (marked with \`'use client'\`) do hydrate in the browser: hooks, events, browser APIs.

\`\`\`tsx
// Server Component (default) — can be async
async function Page() {
  const data = await db.query(…);
  return <List items={data} />;
}

// Client Component
'use client';
function Button() { const [n, setN] = useState(0); … }
\`\`\`

Senior pattern: push \`'use client'\` to the **leaves** of the tree (the interactive button, not the whole page) to minimize the JS sent. A Server Component can be passed as \`children\` of a Client Component, but not imported inside it.`,
      },
    },
    {
      q: { es: "Hidratación", en: "Hydration" },
      a: {
        es: `**Hydration** es el proceso donde React toma el HTML ya renderizado por el servidor y le *conecta* los event listeners y el estado para volverlo interactivo. El usuario ve contenido rápido (HTML del servidor) pero no puede interactuar hasta que termina la hidratación. El clásico **hydration mismatch** ocurre cuando el HTML del servidor no coincide con el primer render del cliente — causas típicas: usar \`Date.now()\`, \`Math.random()\` o \`window\` durante el render. Se resuelve moviendo eso a \`useEffect\` o renderizando esa parte solo en cliente.`,
        en: `**Hydration** is the process where React takes the HTML rendered by the server and *connects* event listeners and state to make it interactive. The user sees content fast (server HTML) but can't interact until hydration finishes. The classic **hydration mismatch** occurs when the server HTML doesn't match the client's first render — typical causes: using \`Date.now()\`, \`Math.random()\`, or \`window\` during render. Fix by moving that to \`useEffect\` or rendering that part only on the client.`,
      },
    },
    {
      q: {
        es: "Data fetching y caching (App Router)",
        en: "Data fetching and caching (App Router)",
      },
      a: {
        es: `En el App Router se hace \`fetch\` directo en Server Components, y Next extiende \`fetch\` con caché:
- \`cache: 'force-cache'\` → tipo SSG.
- \`cache: 'no-store'\` → tipo SSR, siempre fresco.
- \`next: { revalidate: 60 }\` → tipo ISR.

Para invalidar bajo demanda: \`revalidatePath('/ruta')\` y \`revalidateTag('tag')\`. Punto senior: Next tiene **varias capas de caché** (Request Memoization, Data Cache, Full Route Cache, Router Cache) y saber cuál está sirviendo datos viejos es una habilidad de debugging muy valorada.`,
        en: `In the App Router you call \`fetch\` directly in Server Components, and Next extends \`fetch\` with caching:
- \`cache: 'force-cache'\` → SSG-like.
- \`cache: 'no-store'\` → SSR-like, always fresh.
- \`next: { revalidate: 60 }\` → ISR-like.

For on-demand invalidation: \`revalidatePath('/route')\` and \`revalidateTag('tag')\`. Senior point: Next has **several cache layers** (Request Memoization, Data Cache, Full Route Cache, Router Cache) and knowing which one is serving stale data is a highly valued debugging skill.`,
      },
    },
    {
      q: { es: "Streaming y Suspense", en: "Streaming and Suspense" },
      a: {
        es: `Con el App Router, el servidor puede **enviar la página por partes**: el shell llega de inmediato y las secciones lentas se transmiten cuando sus datos resuelven, envueltas en \`<Suspense>\` con un fallback.

\`\`\`tsx
<Suspense fallback={<Skeleton />}>
  <VentasLentas />  {/* llega después, sin bloquear */}
</Suspense>
\`\`\`

\`loading.tsx\` hace esto automáticamente a nivel de ruta. Mejora el **TTFB** y los Core Web Vitals porque nada espera al dato más lento.`,
        en: `With the App Router, the server can **stream the page in parts**: the shell arrives immediately and slow sections are sent when their data resolves, wrapped in \`<Suspense>\` with a fallback.

\`\`\`tsx
<Suspense fallback={<Skeleton />}>
  <SlowSales />  {/* arrives later, without blocking */}
</Suspense>
\`\`\`

\`loading.tsx\` does this automatically at the route level. It improves **TTFB** and the Core Web Vitals because nothing waits for the slowest data.`,
      },
    },
    {
      q: { es: "Server Actions", en: "Server Actions" },
      a: {
        es: `Funciones marcadas con \`'use server'\` que se ejecutan en el servidor pero se invocan desde el cliente (típicamente en formularios), sin escribir un endpoint API manual.

\`\`\`tsx
'use server';
export async function crearItem(formData) {
  await db.insert(…);
  revalidatePath('/items');
}
\`\`\`

Se usan con \`<form action={crearItem}>\` y funcionan incluso sin JS cargado (*progressive enhancement*). Nota senior: siguen siendo endpoints públicos — hay que validar y autorizar dentro de la acción.`,
        en: `Functions marked with \`'use server'\` that run on the server but are invoked from the client (typically in forms), without writing a manual API endpoint.

\`\`\`tsx
'use server';
export async function createItem(formData) {
  await db.insert(…);
  revalidatePath('/items');
}
\`\`\`

They're used with \`<form action={createItem}>\` and work even without JS loaded (*progressive enhancement*). Senior note: they're still public endpoints — validate and authorize inside the action.`,
      },
    },
    {
      q: { es: "Routing avanzado", en: "Advanced routing" },
      a: {
        es: `Sobre el file-based routing:
- **Rutas dinámicas**: \`[id]\`, catch-all \`[...slug]\`.
- **Route groups** \`(marketing)\`: organizan carpetas sin afectar la URL.
- **Parallel routes** \`@modal\` y **intercepting routes** \`(.)\`: patrones como abrir un detalle en modal manteniendo la URL navegable.
- Navegación con \`<Link>\` (hace **prefetch** automático de rutas visibles en viewport) y \`useRouter\`.`,
        en: `On file-based routing:
- **Dynamic routes**: \`[id]\`, catch-all \`[...slug]\`.
- **Route groups** \`(marketing)\`: organize folders without affecting the URL.
- **Parallel routes** \`@modal\` and **intercepting routes** \`(.)\`: patterns like opening a detail in a modal while keeping the URL navigable.
- Navigation with \`<Link>\` (auto-**prefetch** of routes visible in the viewport) and \`useRouter\`.`,
      },
    },
    {
      q: { es: "Middleware", en: "Middleware" },
      a: {
        es: `Código que corre **antes** de que la petición llegue a la ruta, en el edge runtime (\`middleware.ts\` en la raíz). Usos típicos: redirecciones de auth, geolocalización, A/B testing, reescritura de URLs, headers de seguridad.

\`\`\`ts
export function middleware(req) {
  if (!req.cookies.get('token'))
    return NextResponse.redirect(new URL('/login', req.url));
}
\`\`\`

Al correr en el edge, debe ser ligero: sin acceso a Node APIs completas ni consultas pesadas.`,
        en: `Code that runs **before** the request reaches the route, on the edge runtime (\`middleware.ts\` at the root). Typical uses: auth redirects, geolocation, A/B testing, URL rewrites, security headers.

\`\`\`ts
export function middleware(req) {
  if (!req.cookies.get('token'))
    return NextResponse.redirect(new URL('/login', req.url));
}
\`\`\`

Because it runs on the edge, it must be light: no full Node APIs or heavy queries.`,
      },
    },
    {
      q: {
        es: "Optimización: imágenes, fuentes y bundle",
        en: "Optimization: images, fonts and bundle",
      },
      a: {
        es: `Herramientas de rendimiento integradas que un senior debe dominar:
- \`next/image\`: redimensiona, sirve WebP/AVIF, lazy-load por defecto y evita **CLS** reservando el espacio (width/height obligatorios).
- \`next/font\`: self-host de fuentes sin peticiones externas y sin layout shift.
- \`next/dynamic\`: importa componentes pesados bajo demanda (\`ssr:false\` si dependen del browser).
- Code splitting automático por ruta; \`@next/bundle-analyzer\` para auditar qué engorda el bundle.

Todo apunta a los **Core Web Vitals**: LCP, CLS e INP.`,
        en: `Built-in performance tools a senior must master:
- \`next/image\`: resizes, serves WebP/AVIF, lazy-loads by default and avoids **CLS** by reserving space (width/height required).
- \`next/font\`: self-hosts fonts with no external requests and no layout shift.
- \`next/dynamic\`: imports heavy components on demand (\`ssr:false\` if they depend on the browser).
- Automatic code splitting per route; \`@next/bundle-analyzer\` to audit what bloats the bundle.

All of it targets the **Core Web Vitals**: LCP, CLS and INP.`,
      },
    },
    {
      q: { es: "SEO y metadata", en: "SEO and metadata" },
      a: {
        es: `En el App Router el SEO se maneja con la **Metadata API**: exportar un objeto \`metadata\` estático o la función \`generateMetadata()\` para metadatos dinámicos (título por producto, Open Graph). Junto con SSR/SSG garantiza que los crawlers reciban HTML completo. Extras: \`sitemap.ts\` y \`robots.ts\` generan esos archivos, y \`generateStaticParams()\` pre-renderiza las variantes de rutas dinámicas en build.`,
        en: `In the App Router, SEO is handled with the **Metadata API**: export a static \`metadata\` object or the \`generateMetadata()\` function for dynamic metadata (per-product title, Open Graph). Combined with SSR/SSG it ensures crawlers get full HTML. Extras: \`sitemap.ts\` and \`robots.ts\` generate those files, and \`generateStaticParams()\` pre-renders the variants of dynamic routes at build time.`,
      },
    },
  ],
};