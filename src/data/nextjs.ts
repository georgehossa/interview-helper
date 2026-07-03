import type { Topic } from "../types";

export const nextjs: Topic = {
  key: "next",
  name: "Next.js",
  color: "#e2e8f0",
  items: [
    {
      q: "¿Qué es Next.js y qué resuelve?",
      a: `**Next.js** es el framework de React para producción: agrega lo que React no trae de fábrica — **routing** basado en archivos, **renderizado en servidor**, optimización de imágenes y fuentes, code splitting automático y API routes. Respuesta senior a '¿por qué Next y no React solo?': React puro renderiza todo en el cliente (mal SEO y primer pintado lento en apps grandes); Next permite elegir *por página* la estrategia de renderizado óptima.`,
    },
    {
      q: "SSR, SSG, ISR y CSR",
      a: `Las cuatro estrategias de renderizado — la pregunta senior por excelencia:
- **CSR** (Client-Side): el navegador recibe JS y construye la UI. Interactivo, pero SEO y primer pintado pobres.
- **SSR** (Server-Side): el HTML se genera *en cada petición*. Contenido siempre fresco y buen SEO; más carga en el servidor.
- **SSG** (Static Generation): el HTML se genera *en build* y se sirve desde CDN. Lo más rápido; ideal para contenido que no cambia por usuario.
- **ISR** (Incremental Static Regeneration): SSG que se *regenera* en segundo plano tras un intervalo (\`revalidate\`). Estático con datos razonablemente frescos, sin rebuild completo.

Criterio: dashboard personalizado → SSR/CSR; blog o marketing → SSG; e-commerce con miles de productos que cambian de precio → ISR.`,
    },
    {
      q: "App Router vs Pages Router",
      a: `Los dos sistemas de rutas que conviven:
- **Pages Router** (\`/pages\`, clásico): cada archivo es una ruta; data fetching con \`getServerSideProps\` / \`getStaticProps\`.
- **App Router** (\`/app\`, desde v13, recomendado): basado en **React Server Components**, layouts anidados, streaming, y data fetching con \`fetch\` directamente en componentes async.

Archivos especiales del App Router: \`page.tsx\` (la ruta), \`layout.tsx\` (UI compartida que *no se re-renderiza* al navegar), \`loading.tsx\` (Suspense automático), \`error.tsx\` (error boundary), \`route.ts\` (endpoints API).`,
    },
    {
      q: "Server Components vs Client Components",
      a: `El corazón del App Router. **Server Components** (el *default*) se ejecutan solo en el servidor: su JS **nunca llega al bundle del cliente**, pueden acceder a BD o secretos directamente, pero no usan estado ni eventos. **Client Components** (marcados con \`'use client'\`) sí se hidratan en el navegador: hooks, eventos, APIs del browser.

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
    },
    {
      q: "Hidratación",
      a: `**Hydration** es el proceso donde React toma el HTML ya renderizado por el servidor y le *conecta* los event listeners y el estado para volverlo interactivo. El usuario ve contenido rápido (HTML del servidor) pero no puede interactuar hasta que termina la hidratación. El clásico **hydration mismatch** ocurre cuando el HTML del servidor no coincide con el primer render del cliente — causas típicas: usar \`Date.now()\`, \`Math.random()\` o \`window\` durante el render. Se resuelve moviendo eso a \`useEffect\` o renderizando esa parte solo en cliente.`,
    },
    {
      q: "Data fetching y caching (App Router)",
      a: `En el App Router se hace \`fetch\` directo en Server Components, y Next extiende \`fetch\` con caché:
- \`cache: 'force-cache'\` → tipo SSG.
- \`cache: 'no-store'\` → tipo SSR, siempre fresco.
- \`next: { revalidate: 60 }\` → tipo ISR.

Para invalidar bajo demanda: \`revalidatePath('/ruta')\` y \`revalidateTag('tag')\`. Punto senior: Next tiene **varias capas de caché** (Request Memoization, Data Cache, Full Route Cache, Router Cache) y saber cuál está sirviendo datos viejos es una habilidad de debugging muy valorada.`,
    },
    {
      q: "Streaming y Suspense",
      a: `Con el App Router, el servidor puede **enviar la página por partes**: el shell llega de inmediato y las secciones lentas se transmiten cuando sus datos resuelven, envueltas en \`<Suspense>\` con un fallback.

\`\`\`tsx
<Suspense fallback={<Skeleton />}>
  <VentasLentas />  {/* llega después, sin bloquear */}
</Suspense>
\`\`\`

\`loading.tsx\` hace esto automáticamente a nivel de ruta. Mejora el **TTFB** y los Core Web Vitals porque nada espera al dato más lento.`,
    },
    {
      q: "Server Actions",
      a: `Funciones marcadas con \`'use server'\` que se ejecutan en el servidor pero se invocan desde el cliente (típicamente en formularios), sin escribir un endpoint API manual.

\`\`\`tsx
'use server';
export async function crearItem(formData) {
  await db.insert(…);
  revalidatePath('/items');
}
\`\`\`

Se usan con \`<form action={crearItem}>\` y funcionan incluso sin JS cargado (*progressive enhancement*). Nota senior: siguen siendo endpoints públicos — hay que validar y autorizar dentro de la acción.`,
    },
    {
      q: "Routing avanzado",
      a: `Sobre el file-based routing:
- **Rutas dinámicas**: \`[id]\`, catch-all \`[...slug]\`.
- **Route groups** \`(marketing)\`: organizan carpetas sin afectar la URL.
- **Parallel routes** \`@modal\` y **intercepting routes** \`(.)\`: patrones como abrir un detalle en modal manteniendo la URL navegable.
- Navegación con \`<Link>\` (hace **prefetch** automático de rutas visibles en viewport) y \`useRouter\`.`,
    },
    {
      q: "Middleware",
      a: `Código que corre **antes** de que la petición llegue a la ruta, en el edge runtime (\`middleware.ts\` en la raíz). Usos típicos: redirecciones de auth, geolocalización, A/B testing, reescritura de URLs, headers de seguridad.

\`\`\`ts
export function middleware(req) {
  if (!req.cookies.get('token'))
    return NextResponse.redirect(new URL('/login', req.url));
}
\`\`\`

Al correr en el edge, debe ser ligero: sin acceso a Node APIs completas ni consultas pesadas.`,
    },
    {
      q: "Optimización: imágenes, fuentes y bundle",
      a: `Herramientas de rendimiento integradas que un senior debe dominar:
- \`next/image\`: redimensiona, sirve WebP/AVIF, lazy-load por defecto y evita **CLS** reservando el espacio (width/height obligatorios).
- \`next/font\`: self-host de fuentes sin peticiones externas y sin layout shift.
- \`next/dynamic\`: importa componentes pesados bajo demanda (\`ssr:false\` si dependen del browser).
- Code splitting automático por ruta; \`@next/bundle-analyzer\` para auditar qué engorda el bundle.

Todo apunta a los **Core Web Vitals**: LCP, CLS e INP.`,
    },
    {
      q: "SEO y metadata",
      a: `En el App Router el SEO se maneja con la **Metadata API**: exportar un objeto \`metadata\` estático o la función \`generateMetadata()\` para metadatos dinámicos (título por producto, Open Graph). Junto con SSR/SSG garantiza que los crawlers reciban HTML completo. Extras: \`sitemap.ts\` y \`robots.ts\` generan esos archivos, y \`generateStaticParams()\` pre-renderiza las variantes de rutas dinámicas en build.`,
    },
  ],
};