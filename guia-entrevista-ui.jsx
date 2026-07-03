import React, { useState, useEffect } from "react";

const DATA = {
  js: { name: "JavaScript", color: "#f7df1e", items: [
    { q: "Closures", a: "Una <strong>closure</strong> es una función que recuerda el ámbito léxico donde fue creada, incluso al ejecutarse fuera de él. Da acceso a variables de la función externa después de que esta retornó.<pre><code><span class='k'>function</span> <span class='f'>contador</span>(){\n  <span class='k'>let</span> n = <span class='s'>0</span>;\n  <span class='k'>return</span> () => ++n;\n}\n<span class='k'>const</span> c = <span class='f'>contador</span>();\nc(); <span class='c'>// 1</span>\nc(); <span class='c'>// 2 — n persiste</span></code></pre>Usos: encapsular estado privado, memoization, currying, callbacks." },
    { q: "Hoisting", a: "El motor 'eleva' las declaraciones al inicio de su ámbito. <code>var</code> y <code>function</code> se hoistean; <code>var</code> queda como <code>undefined</code> hasta su asignación. <code>let</code>/<code>const</code> también se hoistean pero quedan en la <strong>Temporal Dead Zone</strong>: acceder antes de declararlas lanza <code>ReferenceError</code>." },
    { q: "== vs ===", a: "<code>==</code> compara con <strong>coerción</strong> de tipos (<code>0 == '0'</code> → true). <code>===</code> compara valor <strong>y</strong> tipo sin coerción (<code>0 === '0'</code> → false). Regla de entrevista: usa siempre <code>===</code> salvo <code>x == null</code> para chequear null o undefined a la vez." },
    { q: "var, let, const", a: "<ul><li><strong>var</strong>: ámbito de función, se hoistea, redeclarable.</li><li><strong>let</strong>: ámbito de bloque, reasignable, no redeclarable.</li><li><strong>const</strong>: ámbito de bloque, no reasignable. El binding es constante, pero el contenido de objetos/arrays sí muta.</li></ul>" },
    { q: "Event loop", a: "JS corre en <strong>un solo hilo</strong>: un único <strong>call stack</strong> que ejecuta el código síncrono. Cuando aparece una tarea asíncrona (timer, fetch, evento), se delega a las <strong>Web APIs</strong> del entorno y el hilo sigue sin bloquearse. Al completarse, el callback se encola. El <strong>event loop</strong> vigila el stack: cuando queda vacío, mueve callbacks de las colas hacia él.<br><br>Hay dos colas con prioridades distintas:<ul><li><strong>Microtasks</strong> (Promises, <code>queueMicrotask</code>): se vacían <em>todas</em> antes de pasar a la siguiente macrotask.</li><li><strong>Macrotasks</strong> (<code>setTimeout</code>, <code>setInterval</code>, eventos): una por vuelta del loop.</li></ul>Pregunta clásica — ¿qué imprime esto?<pre><code><span class='f'>console</span>.<span class='f'>log</span>(<span class='s'>'1'</span>);\n<span class='f'>setTimeout</span>(() => <span class='f'>console</span>.<span class='f'>log</span>(<span class='s'>'2'</span>), <span class='s'>0</span>);\n<span class='f'>Promise</span>.<span class='f'>resolve</span>().<span class='f'>then</span>(() => <span class='f'>console</span>.<span class='f'>log</span>(<span class='s'>'3'</span>));\n<span class='f'>console</span>.<span class='f'>log</span>(<span class='s'>'4'</span>);</code></pre>Orden: <code>1, 4, 3, 2</code>. Primero todo el síncrono (1 y 4); luego se vacía la cola de microtasks (la Promise → 3) <em>antes</em> que la macrotask del <code>setTimeout</code> (→ 2), aunque su delay sea 0. Entenderlo explica por qué un <code>setTimeout(…,0)</code> nunca corre 'ya mismo'." },
    { q: "Promises y async/await", a: "Una <strong>Promise</strong> representa un valor futuro: <em>pending → fulfilled / rejected</em>. <code>async/await</code> es azúcar sobre Promises para escribir async como si fuera síncrono.<pre><code><span class='k'>async function</span> <span class='f'>load</span>(){\n  <span class='k'>try</span> {\n    <span class='k'>const</span> r = <span class='k'>await</span> <span class='f'>fetch</span>(url);\n    <span class='k'>return</span> <span class='k'>await</span> r.<span class='f'>json</span>();\n  } <span class='k'>catch</span>(e){ <span class='f'>console</span>.<span class='f'>error</span>(e); }\n}</code></pre>Para paralelo: <code>Promise.all([a, b])</code>." },
    { q: "this y binding", a: "El valor de <code>this</code> <strong>no depende de dónde se define la función, sino de cómo se invoca</strong>. Hay cuatro reglas, de menor a mayor prioridad:<ul><li><strong>Default</strong>: función suelta → <code>undefined</code> en modo estricto (o el objeto global fuera de él).</li><li><strong>Implícito</strong>: <code>obj.metodo()</code> → <code>this</code> es <code>obj</code> (lo que está antes del punto).</li><li><strong>Explícito</strong>: <code>call</code>, <code>apply</code> y <code>bind</code> fijan <code>this</code> a mano.</li><li><strong>new</strong>: con un constructor, <code>this</code> es el objeto recién creado.</li></ul>El error clásico es <em>perder</em> el <code>this</code> al desligar un método de su objeto:<pre><code><span class='k'>const</span> obj = { nombre: <span class='s'>'Ana'</span>, <span class='f'>saluda</span>(){ <span class='k'>return</span> <span class='k'>this</span>.nombre; } };\n<span class='k'>const</span> fn = obj.saluda;\nfn(); <span class='c'>// undefined — this ya no es obj</span></code></pre><strong>Arrow functions</strong> son la excepción clave: no tienen su propio <code>this</code>, lo <strong>heredan del ámbito léxico</strong> donde se definieron. Por eso se usan en callbacks dentro de métodos o componentes, para conservar el <code>this</code> externo.<pre><code><span class='c'>// fija this de inmediato e invoca:</span>\nfn.<span class='f'>call</span>(obj);          <span class='c'>// argumentos sueltos</span>\nfn.<span class='f'>apply</span>(obj, [a, b]);  <span class='c'>// argumentos en array</span>\n<span class='c'>// devuelve una función nueva con this fijado:</span>\n<span class='k'>const</span> ligada = fn.<span class='f'>bind</span>(obj);</code></pre>Resumen: <code>call</code>/<code>apply</code> invocan ya mismo (uno recibe args sueltos, el otro un array); <code>bind</code> no invoca, retorna una copia con el <code>this</code> amarrado." },
    { q: "Prototipos y herencia", a: "Cada objeto tiene un enlace interno (<code>[[Prototype]]</code>) a otro objeto. Al leer una propiedad que no existe, JS la busca subiendo por la <strong>cadena de prototipos</strong>. Las <code>class</code> son azúcar sobre este modelo prototipal." },
    { q: "map, filter, reduce", a: "Métodos inmutables de array:<ul><li><strong>map</strong>: transforma cada elemento → nuevo array igual de largo.</li><li><strong>filter</strong>: conserva los que cumplen una condición.</li><li><strong>reduce</strong>: acumula a un solo valor.</li></ul><pre><code>[<span class='s'>1,2,3</span>].<span class='f'>reduce</span>((acc, n) => acc + n, <span class='s'>0</span>); <span class='c'>// 6</span></code></pre>" },
    { q: "Spread, rest y destructuring", a: "<strong>Spread</strong> (<code>...</code>) expande: <code>[...a, ...b]</code>. <strong>Rest</strong> agrupa: <code>function f(...args){}</code>. <strong>Destructuring</strong> extrae: <code>const {id, name} = user</code>, <code>const [first] = arr</code>." },
    { q: "Debounce vs throttle", a: "<strong>Debounce</strong>: espera a que pasen N ms <em>sin</em> eventos para ejecutar (búsqueda mientras escribes). <strong>Throttle</strong>: ejecuta como máximo una vez cada N ms (scroll/resize)." },
  ]},
  ts: { name: "TypeScript", color: "#4a90e2", items: [
    { q: "type vs interface", a: "Ambos describen la forma de un objeto.<ul><li><strong>interface</strong>: extensible, soporta <em>declaration merging</em>, ideal para contratos de objetos/clases.</li><li><strong>type</strong>: más flexible — uniones, intersecciones, tuplas, tipos mapeados.</li></ul>Regla práctica: <code>interface</code> para objetos públicos, <code>type</code> para uniones y composiciones." },
    { q: "Generics", a: "Parametrizan tipos para reutilizar lógica conservando el tipo exacto.<pre><code><span class='k'>function</span> <span class='f'>first</span>&lt;T&gt;(arr: T[]): T | <span class='k'>undefined</span> {\n  <span class='k'>return</span> arr[<span class='s'>0</span>];\n}\n<span class='f'>first</span>&lt;<span class='k'>number</span>&gt;([<span class='s'>1,2,3</span>]);</code></pre>" },
    { q: "Union e intersection", a: "<strong>Union</strong> (<code>A | B</code>): el valor es A <em>o</em> B. <strong>Intersection</strong> (<code>A & B</code>): combina propiedades de ambos. Las uniones requieren <em>narrowing</em> antes de usar propiedades específicas." },
    { q: "Utility types", a: "Tipos predefinidos que transforman otros:<ul><li><code>Partial&lt;T&gt;</code>: todo opcional.</li><li><code>Required&lt;T&gt;</code>: todo obligatorio.</li><li><code>Pick&lt;T,K&gt;</code> / <code>Omit&lt;T,K&gt;</code>: selecciona o excluye claves.</li><li><code>Record&lt;K,V&gt;</code>: objeto con claves K y valores V.</li><li><code>Readonly&lt;T&gt;</code>: inmutable.</li></ul>" },
    { q: "any vs unknown vs never", a: "<strong>any</strong>: desactiva el chequeo (evítalo). <strong>unknown</strong>: como any pero <em>seguro</em> — debes hacer narrowing antes de usarlo. <strong>never</strong>: valor que nunca ocurre (funciones que lanzan o bucles infinitos)." },
    { q: "Type narrowing", a: "Reducir una unión a un tipo concreto con guards: <code>typeof</code>, <code>instanceof</code>, <code>in</code>, o <em>discriminated unions</em> con una propiedad literal.<pre><code><span class='k'>if</span> (<span class='k'>typeof</span> x === <span class='s'>'string'</span>) {\n  x.<span class='f'>toUpperCase</span>(); <span class='c'>// TS sabe que es string</span>\n}</code></pre>" },
    { q: "Enums vs union de literales", a: "<code>enum</code> crea un objeto en runtime. Muchos equipos prefieren <strong>uniones de literales</strong> (<code>type Estado = 'on' | 'off'</code>) por ser más ligeras y sin código generado." },
    { q: "Type assertions", a: "<code>valor as Tipo</code> le dice al compilador que confíe en ti — no convierte en runtime, solo silencia el chequeo. Úsalo con cuidado; prefiere narrowing real. Evita <code>as any as X</code>." },
  ]},
  react: { name: "React", color: "#61dafb", items: [
    { q: "Componentes y props", a: "Un componente es una función que recibe <strong>props</strong> (entrada inmutable de solo lectura) y retorna JSX. Los props fluyen de padre a hijo (<em>one-way data flow</em>). Para comunicar de hijo a padre se pasan callbacks como props." },
    { q: "Virtual DOM y reconciliación", a: "React mantiene una representación en memoria del UI (<strong>Virtual DOM</strong>). En cada render compara el árbol nuevo con el anterior (<strong>diffing</strong>) y aplica solo los cambios mínimos al DOM real, que es lo costoso." },
    { q: "Keys en listas", a: "La <code>key</code> identifica de forma estable cada elemento de una lista para que la reconciliación sepa qué se movió, agregó o quitó. Debe ser <strong>única y estable</strong> (un id), nunca el índice si la lista se reordena o filtra." },
    { q: "useState", a: "Declara estado local. Cambiarlo re-renderiza el componente.<pre><code><span class='k'>const</span> [count, setCount] = <span class='f'>useState</span>(<span class='s'>0</span>);\n<span class='f'>setCount</span>(c => c + <span class='s'>1</span>); <span class='c'>// updater funcional</span></code></pre>Usa la forma de función cuando el nuevo estado depende del anterior." },
    { q: "useEffect", a: "Ejecuta efectos secundarios (fetch, suscripciones, timers) tras el render. El <strong>array de dependencias</strong> controla cuándo corre:<ul><li><code>[]</code>: solo al montar.</li><li><code>[x]</code>: cuando <code>x</code> cambia.</li><li>sin array: en cada render.</li></ul>El <code>return</code> es la función de <strong>cleanup</strong>." },
    { q: "useMemo y useCallback", a: "Optimizaciones. <strong>useMemo</strong> memoriza un <em>valor</em> calculado; <strong>useCallback</strong> memoriza una <em>función</em>. Ambos recalculan solo si cambian sus dependencias. No abuses de ellos." },
    { q: "useRef", a: "Devuelve un objeto mutable <code>{current}</code> que <strong>persiste entre renders sin causarlos</strong>. Usos: referenciar nodos del DOM, guardar valores que no deben re-renderizar (id de timers, valor previo)." },
    { q: "useContext", a: "Lee un valor de un <code>Context</code> sin pasar props por todos los niveles (<em>prop drilling</em>). Ideal para tema, usuario autenticado, idioma. Para estado complejo se combina con <code>useReducer</code>." },
    { q: "Componentes controlados", a: "Un input es <strong>controlado</strong> cuando su valor lo dicta el estado de React (<code>value={x}</code> + <code>onChange</code>). React es la única fuente de verdad. <strong>No controlado</strong>: el DOM mantiene el valor y se lee con un ref." },
    { q: "Lifting state up", a: "Cuando dos hermanos necesitan compartir estado, se <strong>sube</strong> al ancestro común más cercano y se pasa hacia abajo por props. Evita duplicar y desincronizar estado." },
    { q: "Reglas de los Hooks", a: "<ul><li>Solo se llaman en el <strong>nivel superior</strong> — nunca dentro de condicionales, loops o funciones anidadas.</li><li>Solo en componentes de función o hooks personalizados.</li></ul>Garantiza que el orden de los hooks sea estable entre renders." },
    { q: "Custom hooks", a: "Funciones que empiezan por <code>use</code> y componen otros hooks para reutilizar lógica con estado (<code>useFetch</code>, <code>useToggle</code>). Comparten <em>lógica</em>, no estado: cada componente obtiene su propia instancia." },
    { q: "HOC (Higher-Order Components)", a: "Un <strong>HOC</strong> es una función que <strong>recibe un componente y devuelve otro componente</strong> con funcionalidad añadida. Es un patrón para reutilizar lógica transversal (auth, logging, datos) entre varios componentes.<pre><code><span class='k'>function</span> <span class='f'>withAuth</span>(Component){\n  <span class='k'>return</span> (props) => {\n    <span class='k'>const</span> user = <span class='f'>useUser</span>();\n    <span class='k'>if</span> (!user) <span class='k'>return</span> &lt;Login /&gt;;\n    <span class='k'>return</span> &lt;Component {...props} user={user} /&gt;;\n  };\n}\n<span class='k'>const</span> Privado = <span class='f'>withAuth</span>(Dashboard);</code></pre>Convención: el nombre empieza por <code>with</code> (<code>withRouter</code>, <code>withTheme</code>). Hoy los <strong>custom hooks</strong> cubren la mayoría de estos casos de forma más simple, pero los HOC siguen apareciendo en librerías y código existente — por eso es buena pregunta de entrevista." },
    { q: "Funciones puras", a: "Una <strong>función pura</strong> cumple dos reglas:<ul><li>Con las mismas entradas, siempre devuelve la misma salida.</li><li>No tiene <strong>efectos secundarios</strong>: no muta variables externas ni props, no escribe en el DOM, no hace llamadas de red.</li></ul>React espera que tus componentes sean <strong>puros durante el render</strong>: dados los mismos props y estado, deben producir el mismo JSX sin mutar nada por fuera. Los efectos secundarios van en <code>useEffect</code> o en manejadores de eventos, nunca en el cuerpo del render.<pre><code><span class='c'>// pura ✓</span>\n<span class='k'>const</span> <span class='f'>doble</span> = (n) => n * <span class='s'>2</span>;\n\n<span class='c'>// impura ✗ — muta algo externo</span>\n<span class='k'>let</span> total = <span class='s'>0</span>;\n<span class='k'>const</span> <span class='f'>suma</span> = (n) => { total += n; };</code></pre>Beneficios: es predecible, fácil de testear y habilita optimizaciones como <code>React.memo</code>, que confía en que un mismo input produce un mismo output." },
  ]},
  next: { name: "Next.js", color: "#e2e8f0", items: [
    { q: "¿Qué es Next.js y qué resuelve?", a: "<strong>Next.js</strong> es el framework de React para producción: agrega lo que React no trae de fábrica — <strong>routing</strong> basado en archivos, <strong>renderizado en servidor</strong>, optimización de imágenes y fuentes, code splitting automático y API routes. Respuesta senior a '¿por qué Next y no React solo?': React puro renderiza todo en el cliente (mal SEO y primer pintado lento en apps grandes); Next permite elegir <em>por página</em> la estrategia de renderizado óptima." },
    { q: "SSR, SSG, ISR y CSR", a: "Las cuatro estrategias de renderizado — la pregunta senior por excelencia:<ul><li><strong>CSR</strong> (Client-Side): el navegador recibe JS y construye la UI. Interactivo, pero SEO y primer pintado pobres.</li><li><strong>SSR</strong> (Server-Side): el HTML se genera <em>en cada petición</em>. Contenido siempre fresco y buen SEO; más carga en el servidor.</li><li><strong>SSG</strong> (Static Generation): el HTML se genera <em>en build</em> y se sirve desde CDN. Lo más rápido; ideal para contenido que no cambia por usuario.</li><li><strong>ISR</strong> (Incremental Static Regeneration): SSG que se <em>regenera</em> en segundo plano tras un intervalo (<code>revalidate</code>). Estático con datos razonablemente frescos, sin rebuild completo.</li></ul>Criterio: dashboard personalizado → SSR/CSR; blog o marketing → SSG; e-commerce con miles de productos que cambian de precio → ISR." },
    { q: "App Router vs Pages Router", a: "Los dos sistemas de rutas que conviven:<ul><li><strong>Pages Router</strong> (<code>/pages</code>, clásico): cada archivo es una ruta; data fetching con <code>getServerSideProps</code> / <code>getStaticProps</code>.</li><li><strong>App Router</strong> (<code>/app</code>, desde v13, recomendado): basado en <strong>React Server Components</strong>, layouts anidados, streaming, y data fetching con <code>fetch</code> directamente en componentes async.</li></ul>Archivos especiales del App Router: <code>page.tsx</code> (la ruta), <code>layout.tsx</code> (UI compartida que <em>no se re-renderiza</em> al navegar), <code>loading.tsx</code> (Suspense automático), <code>error.tsx</code> (error boundary), <code>route.ts</code> (endpoints API)." },
    { q: "Server Components vs Client Components", a: "El corazón del App Router. <strong>Server Components</strong> (el <em>default</em>) se ejecutan solo en el servidor: su JS <strong>nunca llega al bundle del cliente</strong>, pueden acceder a BD o secretos directamente, pero no usan estado ni eventos. <strong>Client Components</strong> (marcados con <code>'use client'</code>) sí se hidratan en el navegador: hooks, eventos, APIs del browser.<pre><code><span class='c'>// Server Component (default) — puede ser async</span>\n<span class='k'>async function</span> <span class='f'>Page</span>(){\n  <span class='k'>const</span> data = <span class='k'>await</span> db.<span class='f'>query</span>(…);\n  <span class='k'>return</span> &lt;Lista items={data} /&gt;;\n}\n\n<span class='c'>// Client Component</span>\n<span class='s'>'use client'</span>;\n<span class='k'>function</span> <span class='f'>Boton</span>(){ <span class='k'>const</span> [n, setN] = <span class='f'>useState</span>(<span class='s'>0</span>); … }</code></pre>Patrón senior: empujar <code>'use client'</code> a las <strong>hojas</strong> del árbol (el botón interactivo, no la página entera) para minimizar el JS enviado. Un Server Component puede pasar otro como <code>children</code> de un Client Component, pero no importarse dentro de él." },
    { q: "Hidratación", a: "<strong>Hydration</strong> es el proceso donde React toma el HTML ya renderizado por el servidor y le <em>conecta</em> los event listeners y el estado para volverlo interactivo. El usuario ve contenido rápido (HTML del servidor) pero no puede interactuar hasta que termina la hidratación. El clásico <strong>hydration mismatch</strong> ocurre cuando el HTML del servidor no coincide con el primer render del cliente — causas típicas: usar <code>Date.now()</code>, <code>Math.random()</code> o <code>window</code> durante el render. Se resuelve moviendo eso a <code>useEffect</code> o renderizando esa parte solo en cliente." },
    { q: "Data fetching y caching (App Router)", a: "En el App Router se hace <code>fetch</code> directo en Server Components, y Next extiende <code>fetch</code> con caché:<ul><li><code>cache: 'force-cache'</code> → tipo SSG.</li><li><code>cache: 'no-store'</code> → tipo SSR, siempre fresco.</li><li><code>next: { revalidate: 60 }</code> → tipo ISR.</li></ul>Para invalidar bajo demanda: <code>revalidatePath('/ruta')</code> y <code>revalidateTag('tag')</code>. Punto senior: Next tiene <strong>varias capas de caché</strong> (Request Memoization, Data Cache, Full Route Cache, Router Cache) y saber cuál está sirviendo datos viejos es una habilidad de debugging muy valorada." },
    { q: "Streaming y Suspense", a: "Con el App Router, el servidor puede <strong>enviar la página por partes</strong>: el shell llega de inmediato y las secciones lentas se transmiten cuando sus datos resuelven, envueltas en <code>&lt;Suspense&gt;</code> con un fallback.<pre><code>&lt;Suspense fallback={&lt;Skeleton /&gt;}&gt;\n  &lt;VentasLentas /&gt;  <span class='c'>// llega después, sin bloquear</span>\n&lt;/Suspense&gt;</code></pre><code>loading.tsx</code> hace esto automáticamente a nivel de ruta. Mejora el <strong>TTFB</strong> y los Core Web Vitals porque nada espera al dato más lento." },
    { q: "Server Actions", a: "Funciones marcadas con <code>'use server'</code> que se ejecutan en el servidor pero se invocan desde el cliente (típicamente en formularios), sin escribir un endpoint API manual.<pre><code><span class='s'>'use server'</span>;\n<span class='k'>export async function</span> <span class='f'>crearItem</span>(formData){\n  <span class='k'>await</span> db.<span class='f'>insert</span>(…);\n  <span class='f'>revalidatePath</span>(<span class='s'>'/items'</span>);\n}</code></pre>Se usan con <code>&lt;form action={crearItem}&gt;</code> y funcionan incluso sin JS cargado (<em>progressive enhancement</em>). Nota senior: siguen siendo endpoints públicos — hay que validar y autorizar dentro de la acción." },
    { q: "Routing avanzado", a: "Sobre el file-based routing:<ul><li><strong>Rutas dinámicas</strong>: <code>[id]</code>, catch-all <code>[...slug]</code>.</li><li><strong>Route groups</strong> <code>(marketing)</code>: organizan carpetas sin afectar la URL.</li><li><strong>Parallel routes</strong> <code>@modal</code> y <strong>intercepting routes</strong> <code>(.)</code>: patrones como abrir un detalle en modal manteniendo la URL navegable.</li><li>Navegación con <code>&lt;Link&gt;</code> (hace <strong>prefetch</strong> automático de rutas visibles en viewport) y <code>useRouter</code>.</li></ul>" },
    { q: "Middleware", a: "Código que corre <strong>antes</strong> de que la petición llegue a la ruta, en el edge runtime (<code>middleware.ts</code> en la raíz). Usos típicos: redirecciones de auth, geolocalización, A/B testing, reescritura de URLs, headers de seguridad.<pre><code><span class='k'>export function</span> <span class='f'>middleware</span>(req){\n  <span class='k'>if</span> (!req.cookies.<span class='f'>get</span>(<span class='s'>'token'</span>))\n    <span class='k'>return</span> NextResponse.<span class='f'>redirect</span>(<span class='k'>new</span> URL(<span class='s'>'/login'</span>, req.url));\n}</code></pre>Al correr en el edge, debe ser ligero: sin acceso a Node APIs completas ni consultas pesadas." },
    { q: "Optimización: imágenes, fuentes y bundle", a: "Herramientas de rendimiento integradas que un senior debe dominar:<ul><li><code>next/image</code>: redimensiona, sirve WebP/AVIF, lazy-load por defecto y evita <strong>CLS</strong> reservando el espacio (width/height obligatorios).</li><li><code>next/font</code>: self-host de fuentes sin peticiones externas y sin layout shift.</li><li><code>next/dynamic</code>: importa componentes pesados bajo demanda (<code>ssr:false</code> si dependen del browser).</li><li>Code splitting automático por ruta; <code>@next/bundle-analyzer</code> para auditar qué engorda el bundle.</li></ul>Todo apunta a los <strong>Core Web Vitals</strong>: LCP, CLS e INP." },
    { q: "SEO y metadata", a: "En el App Router el SEO se maneja con la <strong>Metadata API</strong>: exportar un objeto <code>metadata</code> estático o la función <code>generateMetadata()</code> para metadatos dinámicos (título por producto, Open Graph). Junto con SSR/SSG garantiza que los crawlers reciban HTML completo. Extras: <code>sitemap.ts</code> y <code>robots.ts</code> generan esos archivos, y <code>generateStaticParams()</code> pre-renderiza las variantes de rutas dinámicas en build." },
  ]},
  rn: { name: "React Native", color: "#c792ea", items: [
    { q: "Componentes core", a: "En vez de elementos HTML usas componentes que mapean a vistas nativas:<ul><li><code>View</code> → contenedor (≈ div).</li><li><code>Text</code> → todo texto debe ir dentro de un Text.</li><li><code>Image</code>, <code>TextInput</code>, <code>ScrollView</code>.</li><li><code>Pressable</code> para toques.</li></ul>" },
    { q: "FlatList vs ScrollView", a: "<strong>ScrollView</strong> renderiza todos sus hijos de una vez — contenido corto. <strong>FlatList</strong> es virtualizada: solo renderiza lo visible y recicla filas. Listas largas → FlatList, con <code>keyExtractor</code> y <code>renderItem</code>." },
    { q: "StyleSheet y estilos", a: "No hay CSS; los estilos son objetos JS con camelCase. <code>StyleSheet.create</code> los valida y optimiza.<pre><code><span class='k'>const</span> s = StyleSheet.<span class='f'>create</span>({\n  box: { padding: <span class='s'>16</span> }\n});</code></pre>No se heredan (salvo algunos de texto) y no hay cascada." },
    { q: "Flexbox en RN", a: "El layout es Flexbox, con diferencias vs web:<ul><li><code>flexDirection</code> por defecto es <strong>column</strong> (en web es row).</li><li>Todo es flex; no hay <code>display:block</code>.</li><li>Medidas en números sin unidad (dp).</li></ul>" },
    { q: "Código por plataforma", a: "Para diferencias iOS/Android: el módulo <code>Platform</code> (<code>Platform.OS</code>, <code>Platform.select</code>) o archivos <code>.ios.tsx</code> / <code>.android.tsx</code> que el bundler resuelve automáticamente." },
    { q: "El bridge y la nueva arquitectura", a: "Clásicamente JS y nativo se comunican por un <strong>bridge</strong> asíncrono que serializa mensajes (cuello de botella). La nueva arquitectura usa <strong>JSI</strong> (C++ directo) con <em>Fabric</em> y <em>TurboModules</em>: llamadas síncronas y mejor rendimiento." },
    { q: "Native modules", a: "Cuando necesitas una API nativa no expuesta (Bluetooth, sensores), escribes un <strong>módulo nativo</strong> en Kotlin/Swift y lo expones a JS. Muchas librerías de la comunidad ya lo hacen." },
    { q: "RN vs web", a: "Misma idea de React (componentes, hooks, estado) pero: sin DOM ni CSS, sin etiquetas HTML, navegación con librerías (React Navigation) en vez de URLs. La lógica y los hooks se reutilizan; la capa de UI no." },
  ]},
  html: { name: "HTML", color: "#ff7a59", items: [
    { q: "HTML semántico", a: "Usar la etiqueta que describe el <em>significado</em>: <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;footer&gt;</code>. Mejora accesibilidad, SEO y mantenibilidad frente a un mar de <code>&lt;div&gt;</code>." },
    { q: "Accesibilidad (a11y)", a: "<ul><li>HTML semántico primero; ARIA solo cuando hace falta.</li><li><code>alt</code> descriptivo en imágenes.</li><li><code>&lt;label&gt;</code> asociado a cada input.</li><li>Navegable por teclado y foco visible.</li><li>Contraste suficiente (WCAG).</li></ul>" },
    { q: "Formularios", a: "<code>&lt;form&gt;</code> agrupa controles. Atributos clave: <code>type</code> (email, number, password…), <code>required</code>, <code>name</code> (clave al enviar). La validación nativa reduce JS." },
    { q: "Metadatos y head", a: "<code>&lt;meta charset&gt;</code>, el <strong>viewport</strong> para responsive (<code>width=device-width, initial-scale=1</code>), <code>&lt;title&gt;</code>, descripción y Open Graph para previsualizaciones al compartir." },
    { q: "async vs defer", a: "En <code>&lt;script&gt;</code>: <strong>async</strong> descarga en paralelo y ejecuta apenas llega (orden no garantizado). <strong>defer</strong> descarga en paralelo y ejecuta en orden tras parsear el HTML. Para scripts de app: <code>defer</code>." },
    { q: "data-* y atributos", a: "Los atributos <code>data-*</code> guardan datos personalizados en el HTML, leíbles desde JS con <code>element.dataset</code>. Útiles para pasar info al script sin clases falsas." },
  ]},
  css: { name: "CSS", color: "#ec5f9e", items: [
    { q: "Box model", a: "Cada elemento es una caja: <strong>content → padding → border → margin</strong>. Con <code>box-sizing: border-box</code> el <code>width</code> incluye padding y border, evitando cálculos sorpresa." },
    { q: "Flexbox", a: "Layout en <strong>una dimensión</strong>. Contenedor: <code>display:flex</code>, <code>flex-direction</code>, <code>justify-content</code> (eje principal), <code>align-items</code> (eje cruzado), <code>gap</code>. Hijos: <code>flex:1</code>." },
    { q: "Grid", a: "Layout en <strong>dos dimensiones</strong>. <code>display:grid</code>, <code>grid-template-columns: repeat(3, 1fr)</code>, <code>gap</code>, áreas nombradas. Grid para layouts de página; Flexbox para componentes lineales." },
    { q: "Especificidad", a: "Qué regla gana cuando varias aplican. Peso (mayor a menor): <strong>inline &gt; id &gt; clase/atributo/pseudo-clase &gt; elemento</strong>. <code>!important</code> rompe la cascada — evítalo. Ante empate, gana la última declarada." },
    { q: "Position", a: "<ul><li><strong>static</strong>: por defecto.</li><li><strong>relative</strong>: se desplaza respecto a sí mismo.</li><li><strong>absolute</strong>: respecto al ancestro posicionado.</li><li><strong>fixed</strong>: respecto al viewport.</li><li><strong>sticky</strong>: relative hasta cruzar un umbral, luego fixed.</li></ul>" },
    { q: "Unidades", a: "<strong>px</strong> fijos. <strong>%</strong> relativo al padre. <strong>rem</strong> relativo al root (escala accesible). <strong>em</strong> relativo al font-size propio. <strong>vw/vh</strong> relativos al viewport. Para tipografía y espaciado, <code>rem</code> suele ser lo mejor." },
    { q: "Stacking y z-index", a: "<code>z-index</code> solo funciona en elementos posicionados y dentro del mismo <strong>contexto de apilamiento</strong>. <code>transform</code>, <code>opacity&lt;1</code> o <code>position:fixed</code> crean nuevos contextos — por eso a veces un z-index alto 'no funciona'." },
    { q: "Pseudo-clases y pseudo-elementos", a: "<strong>Pseudo-clase</strong> (<code>:hover</code>, <code>:focus</code>, <code>:nth-child</code>) selecciona por estado o posición. <strong>Pseudo-elemento</strong> (<code>::before</code>, <code>::after</code>) crea sub-elementos virtuales para decoración." },
    { q: "Responsive design", a: "Adaptar al dispositivo con <strong>media queries</strong> (<code>@media (max-width:768px)</code>), unidades relativas, imágenes flexibles y enfoque <strong>mobile-first</strong> (estilos base para móvil, se amplían hacia arriba)." },
    { q: "Transiciones y animaciones", a: "<strong>transition</strong> interpola entre dos estados ante un cambio: <code>transition: all .2s ease</code>. <strong>@keyframes</strong> + <code>animation</code> define secuencias repetibles. Anima preferentemente <code>transform</code> y <code>opacity</code> (no disparan reflow)." },
  ]},
  node: { name: "Node.js", color: "#8cc84b", items: [
    { q: "¿Qué es Node.js?", a: "<strong>Node.js</strong> es un entorno de ejecución que corre JavaScript <strong>fuera del navegador</strong>, construido sobre el motor <strong>V8</strong> de Chrome. Permite usar JS en el servidor: APIs, herramientas de build, CLIs. Es <strong>single-threaded</strong>, <em>event-driven</em> y de <strong>I/O no bloqueante</strong>, lo que lo hace eficiente para apps con mucha entrada/salida (red, archivos) y muchas conexiones concurrentes." },
    { q: "I/O no bloqueante y libuv", a: "Node no se queda <em>esperando</em> (bloqueado) en operaciones lentas como leer un archivo o una petición de red: las delega y sigue ejecutando; cuando terminan, corre su callback. Por debajo, la librería <strong>libuv</strong> aporta el event loop y un <strong>thread pool</strong> para tareas que el sistema no resuelve de forma asíncrona (parte del acceso a disco, criptografía).<pre><code><span class='k'>const</span> fs = <span class='f'>require</span>(<span class='s'>'fs'</span>);\nfs.<span class='f'>readFile</span>(<span class='s'>'a.txt'</span>, (err, data) => {\n  <span class='c'>// se ejecuta luego, sin bloquear</span>\n});\n<span class='f'>console</span>.<span class='f'>log</span>(<span class='s'>'sigo corriendo'</span>);</code></pre>" },
    { q: "Event loop de Node (fases)", a: "El event loop de Node (vía libuv) procesa callbacks en <strong>fases</strong>, en orden: <em>timers</em> (setTimeout) → <em>pending</em> → <em>poll</em> (I/O) → <em>check</em> (setImmediate) → <em>close</em>. Entre fases se vacían las microtasks, con dos colas de máxima prioridad: <code>process.nextTick()</code> primero y luego las Promises. Por eso en Node hay matices que no existen en el navegador, como la diferencia entre <code>setImmediate()</code> y <code>setTimeout(…,0)</code>." },
    { q: "Módulos: CommonJS vs ESM", a: "<strong>CommonJS</strong> (tradicional en Node): <code>const x = require('mod')</code> y <code>module.exports = …</code>, carga síncrona. <strong>ES Modules</strong> (estándar moderno): <code>import</code> / <code>export</code>, estático y asíncrono. Se activa ESM con <code>'type': 'module'</code> en package.json o la extensión <code>.mjs</code>.<pre><code><span class='c'>// CommonJS</span>\n<span class='k'>const</span> fs = <span class='f'>require</span>(<span class='s'>'fs'</span>);\nmodule.exports = miFn;\n\n<span class='c'>// ES Modules</span>\n<span class='k'>import</span> fs <span class='k'>from</span> <span class='s'>'fs'</span>;\n<span class='k'>export default</span> miFn;</code></pre>" },
    { q: "npm y package.json", a: "<strong>npm</strong> es el gestor de paquetes de Node. <code>package.json</code> describe el proyecto:<ul><li><strong>dependencies</strong>: lo que la app necesita en producción.</li><li><strong>devDependencies</strong>: solo para desarrollo (tests, linters, bundlers).</li><li><strong>scripts</strong>: comandos como <code>npm run build</code>.</li></ul>Las versiones usan <strong>semver</strong> (<code>^1.2.0</code> = compatibles con 1.x). <code>package-lock.json</code> fija las versiones exactas instaladas para builds reproducibles." },
    { q: "process y variables de entorno", a: "El objeto global <code>process</code> da info y control del proceso: <code>process.env</code> (variables de entorno, p. ej. <code>process.env.NODE_ENV</code>), <code>process.argv</code> (argumentos de la CLI), <code>process.cwd()</code> (directorio actual). Las <strong>variables de entorno</strong> son la forma estándar de pasar configuración y secretos sin escribirlos en el código." },
    { q: "EventEmitter", a: "El patrón <strong>publicador/suscriptor</strong> está en el corazón de Node. <code>EventEmitter</code> permite emitir eventos con nombre y reaccionar a ellos; muchos objetos del core (streams, servidores HTTP) lo extienden.<pre><code><span class='k'>const</span> EventEmitter = <span class='f'>require</span>(<span class='s'>'events'</span>);\n<span class='k'>const</span> bus = <span class='k'>new</span> <span class='f'>EventEmitter</span>();\nbus.<span class='f'>on</span>(<span class='s'>'msg'</span>, (d) => <span class='f'>console</span>.<span class='f'>log</span>(d));\nbus.<span class='f'>emit</span>(<span class='s'>'msg'</span>, <span class='s'>'hola'</span>);</code></pre>" },
    { q: "Streams y Buffers", a: "Los <strong>streams</strong> procesan datos en <em>chunks</em> a medida que llegan, sin cargar todo en memoria — clave para archivos grandes o respuestas HTTP. Tipos: <strong>Readable</strong>, <strong>Writable</strong>, <strong>Duplex</strong> y <strong>Transform</strong>. Un <strong>Buffer</strong> representa datos binarios en bruto (bytes), útil para archivos, red o cifrado donde no aplica el texto." },
    { q: "Express y middleware", a: "<strong>Express</strong> es el framework web minimalista más usado en Node. Su pieza central es el <strong>middleware</strong>: funciones <code>(req, res, next)</code> que se ejecutan en cadena para procesar la petición (parsear el body, autenticación, logging) antes de responder. Se llama <code>next()</code> para pasar al siguiente.<pre><code>app.<span class='f'>use</span>((req, res, next) => {\n  <span class='f'>console</span>.<span class='f'>log</span>(req.method, req.url);\n  <span class='f'>next</span>(); <span class='c'>// continúa la cadena</span>\n});</code></pre>" },
    { q: "Node vs navegador", a: "Mismo lenguaje, entornos distintos:<ul><li><strong>Navegador</strong>: hay <code>window</code>, <code>document</code>, el DOM y APIs web; no hay acceso al sistema de archivos.</li><li><strong>Node</strong>: hay <code>process</code>, <code>require</code>, <code>Buffer</code>, <code>global</code> y módulos como <code>fs</code>, <code>http</code>, <code>path</code>; no hay DOM ni <code>window</code>.</li></ul>Por eso el código que toca el DOM no corre en Node, y el que lee archivos no corre en el navegador." },
  ]},
  apis: { name: "APIs", color: "#f0584e", items: [
    { q: "REST", a: "<strong>REST</strong> (Representational State Transfer) es un <em>estilo de arquitectura</em> para APIs sobre HTTP. Principios clave:<ul><li>Todo es un <strong>recurso</strong> con su URL (<code>/users/42</code>).</li><li>Se opera con los <strong>verbos HTTP</strong> (GET, POST, PUT, DELETE).</li><li><strong>Stateless</strong>: cada petición lleva toda la info necesaria; el servidor no guarda estado de sesión entre llamadas.</li></ul>Normalmente devuelve JSON. Es simple, cacheable y el estándar más extendido para APIs web." },
    { q: "GraphQL", a: "<strong>GraphQL</strong> es un lenguaje de consulta para APIs (creado por Facebook) con <strong>un solo endpoint</strong>. El cliente pide <em>exactamente</em> los campos que necesita y recibe justo eso, en una sola petición.<pre><code><span class='k'>query</span> {\n  user(id: <span class='s'>42</span>) {\n    name\n    posts { title }\n  }\n}</code></pre>Se apoya en un <strong>schema</strong> tipado que define qué se puede pedir. Operaciones: <strong>query</strong> (leer), <strong>mutation</strong> (escribir) y <strong>subscription</strong> (tiempo real)." },
    { q: "REST vs GraphQL", a: "Comparación que suele preguntarse:<ul><li><strong>Endpoints</strong>: REST tiene muchos (uno por recurso); GraphQL, uno solo.</li><li><strong>Over/under-fetching</strong>: en REST a veces traes campos de más, o te faltan y haces varias llamadas; GraphQL trae exactamente lo pedido en una.</li><li><strong>Tipado</strong>: GraphQL incluye schema tipado; REST no por defecto.</li><li><strong>Caché</strong>: REST se cachea fácil con HTTP; en GraphQL es más manual.</li></ul>No hay un 'mejor' absoluto: REST brilla por simplicidad y caché; GraphQL, cuando el cliente necesita datos flexibles y anidados." },
    { q: "Métodos HTTP", a: "Los <strong>verbos</strong> indican la intención sobre un recurso:<ul><li><strong>GET</strong>: leer (sin efectos, idempotente).</li><li><strong>POST</strong>: crear.</li><li><strong>PUT</strong>: reemplazar por completo (idempotente).</li><li><strong>PATCH</strong>: actualizar parcialmente.</li><li><strong>DELETE</strong>: eliminar.</li></ul><strong>Idempotente</strong> = repetir la llamada da el mismo resultado (GET, PUT, DELETE); POST no lo es." },
    { q: "Status codes", a: "Familias de códigos de respuesta HTTP:<ul><li><strong>2xx</strong> éxito — <code>200</code> OK, <code>201</code> Created, <code>204</code> No Content.</li><li><strong>3xx</strong> redirección — <code>301</code> movido, <code>304</code> Not Modified (caché).</li><li><strong>4xx</strong> error del cliente — <code>400</code> Bad Request, <code>401</code> no autenticado, <code>403</code> sin permiso, <code>404</code> no existe, <code>429</code> demasiadas peticiones.</li><li><strong>5xx</strong> error del servidor — <code>500</code> Internal, <code>503</code> Service Unavailable.</li></ul>Regla mental: 4xx es culpa del cliente, 5xx del servidor." },
    { q: "CORS", a: "<strong>CORS</strong> (Cross-Origin Resource Sharing) controla si un navegador permite que una página haga peticiones a un <strong>origen distinto</strong> (otro dominio, puerto o protocolo). El servidor autoriza con cabeceras como <code>Access-Control-Allow-Origin</code>. Es una protección del <em>navegador</em> (la <em>same-origin policy</em>): por eso ves errores de CORS en el front, pero la misma llamada funciona desde el servidor o Postman." },
    { q: "Autenticación de APIs (JWT)", a: "Patrones comunes para proteger una API:<ul><li><strong>JWT</strong> (JSON Web Token): token firmado que el cliente envía en la cabecera <code>Authorization: Bearer …</code>; el servidor lo verifica sin guardar sesión (stateless).</li><li><strong>API keys</strong> para identificar apps, <strong>OAuth</strong> para acceso de terceros.</li></ul>El token viaja en cada petición. Nunca se guardan secretos sensibles en el cliente, y los tokens deben ir siempre sobre HTTPS." },
  ]},
};

const ORDER = ["js", "ts", "node", "apis", "react", "next", "rn", "html", "css"];

export default function GuiaEntrevista() {
  const [tech, setTech] = useState("js");
  const [mode, setMode] = useState("study");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState({});
  const [qi, setQi] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const accent = DATA[tech].color;
  const items = DATA[tech].items.filter((it) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return it.q.toLowerCase().includes(q) || it.a.toLowerCase().includes(q);
  });

  const reset = (t) => { setTech(t); setQuery(""); setOpen({}); setQi(0); setRevealed(false); };
  const safeQi = qi >= items.length ? 0 : qi;
  const card = items[safeQi];

  useEffect(() => {
    const onKey = (e) => {
      if (mode !== "quiz") return;
      if (document.activeElement?.tagName === "INPUT") return;
      if (e.code === "Space") { e.preventDefault(); setRevealed((r) => !r); }
      if (e.key === "ArrowRight") { setRevealed(false); setQi((i) => Math.min(i + 1, items.length - 1)); }
      if (e.key === "ArrowLeft") { setRevealed(false); setQi((i) => Math.max(i - 1, 0)); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, items.length]);

  return (
    <div style={{ minHeight: "100vh", background: "#0e1320", color: "#e6eaf3", fontFamily: "Inter, system-ui, sans-serif" }}>
      <style>{`
        .content code{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:.85em;background:#1b2236;padding:1px 6px;border-radius:5px;color:${accent}}
        .content strong{color:#e6eaf3;font-weight:600}
        .content em{color:#b9c2d8;font-style:italic}
        .content ul{margin:6px 0 10px 18px;list-style:disc}
        .content li{margin-bottom:5px}
        .content pre{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:.8rem;line-height:1.55;background:#0b0f1a;border:1px solid #262f47;border-left:3px solid ${accent};border-radius:8px;padding:13px 15px;margin:8px 0 12px;overflow-x:auto;color:#cdd6e8;white-space:pre}
        .content pre code{background:none;padding:0;color:inherit;font-size:1em}
        .content .k{color:#c792ea}.content .f{color:#82aaff}.content .s{color:#c3e88d}.content .c{color:#5a6483;font-style:italic}
      `}</style>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 18px 70px" }}>
        {/* Header */}
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".72rem", letterSpacing: ".2em", textTransform: "uppercase", color: "#5a6483", display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: accent, boxShadow: `0 0 12px ${accent}` }} />
          {DATA[tech].name} · prep de entrevista
        </div>
        <h1 style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, fontSize: "clamp(1.8rem,5vw,2.8rem)", letterSpacing: "-.02em", lineHeight: 1.05 }}>
          Web UI Developer<span style={{ color: accent }}>_</span>
        </h1>
        <p style={{ color: "#8a94ad", marginTop: 12, maxWidth: "58ch", fontSize: ".95rem", lineHeight: 1.6 }}>
          Conceptos core para repasar. Cambia de tecnología, abre cada tarjeta para estudiar, o usa el <strong style={{ color: "#e6eaf3" }}>modo quiz</strong> para auto-evaluarte con flashcards.
        </p>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "26px 0 18px" }}>
          {ORDER.map((k) => {
            const active = k === tech;
            const c = DATA[k].color;
            return (
              <button key={k} onClick={() => reset(k)}
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".82rem", fontWeight: 600, padding: "9px 15px", borderRadius: 999, cursor: "pointer", border: `1px solid ${active ? c : "#262f47"}`, background: active ? c : "#151b2b", color: active ? "#0e1320" : "#8a94ad", display: "flex", alignItems: "center", gap: 8, transition: "all .15s" }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: active ? "#0e1320" : c, opacity: active ? 0.55 : 1 }} />
                {DATA[k].name}
              </button>
            );
          })}
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
          <div style={{ flex: 1, minWidth: 200, display: "flex", alignItems: "center", gap: 10, background: "#151b2b", border: "1px solid #262f47", borderRadius: 10, padding: "10px 14px" }}>
            <span style={{ color: "#5a6483" }}>⌕</span>
            <input value={query} onChange={(e) => { setQuery(e.target.value); setQi(0); setRevealed(false); }}
              placeholder="Buscar concepto…"
              style={{ flex: 1, background: "none", border: "none", outline: "none", color: "#e6eaf3", fontFamily: "Inter, sans-serif", fontSize: ".92rem" }} />
          </div>
          <div style={{ display: "flex", background: "#151b2b", border: "1px solid #262f47", borderRadius: 10, padding: 4, gap: 4 }}>
            {["study", "quiz"].map((m) => (
              <button key={m} onClick={() => { setMode(m); setQi(0); setRevealed(false); }}
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", fontWeight: 600, padding: "7px 14px", borderRadius: 7, cursor: "pointer", border: "none", background: mode === m ? accent : "transparent", color: mode === m ? "#0e1320" : "#8a94ad", transition: "all .15s" }}>
                {m === "study" ? "Estudio" : "Quiz"}
              </button>
            ))}
          </div>
        </div>

        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".75rem", color: "#5a6483", marginBottom: 14 }}>
          {items.length} concepto{items.length !== 1 ? "s" : ""} · {DATA[tech].name}
        </div>

        {/* Study */}
        {mode === "study" && (
          <div>
            {items.map((it, i) => {
              const isOpen = open[i];
              return (
                <div key={i} style={{ background: "#151b2b", border: `1px solid ${isOpen ? accent : "#262f47"}`, borderRadius: 14, marginBottom: 10, overflow: "hidden", transition: "border-color .2s" }}>
                  <div onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))}
                    style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", cursor: "pointer" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".72rem", color: "#5a6483", minWidth: 26 }}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ fontWeight: 600, fontSize: ".98rem", flex: 1 }}>{it.q}</span>
                    <span style={{ color: isOpen ? accent : "#8a94ad", transform: isOpen ? "rotate(90deg)" : "none", transition: "transform .2s", fontSize: "1.1rem" }}>›</span>
                  </div>
                  {isOpen && (
                    <div className="content" style={{ padding: "0 18px 18px 58px", color: "#8a94ad", fontSize: ".93rem", lineHeight: 1.6 }}
                      dangerouslySetInnerHTML={{ __html: it.a }} />
                  )}
                </div>
              );
            })}
            {items.length === 0 && <div style={{ color: "#5a6483", fontFamily: "'JetBrains Mono', monospace", fontSize: ".85rem" }}>Sin resultados para tu búsqueda.</div>}
          </div>
        )}

        {/* Quiz */}
        {mode === "quiz" && items.length > 0 && card && (
          <div>
            <div onClick={() => setRevealed((r) => !r)}
              style={{ background: "#151b2b", border: "1px solid #262f47", borderTop: `3px solid ${accent}`, borderRadius: 16, padding: "32px 28px", minHeight: 300, display: "flex", flexDirection: "column", cursor: "pointer" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".72rem", letterSpacing: ".16em", textTransform: "uppercase", color: "#5a6483", marginBottom: 16 }}>
                {DATA[tech].name} · pregunta
              </div>
              <div style={{ fontSize: "1.3rem", fontWeight: 700, lineHeight: 1.35, marginBottom: 20 }}>{card.q}</div>
              {revealed ? (
                <div className="content" style={{ color: "#8a94ad", fontSize: ".95rem", lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: card.a }} />
              ) : (
                <div style={{ marginTop: "auto", fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", color: "#5a6483", paddingTop: 18 }}>
                  Toca la tarjeta o pulsa <strong style={{ color: "#8a94ad" }}>Espacio</strong> para ver la respuesta
                </div>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
              <button disabled={safeQi === 0} onClick={() => { setRevealed(false); setQi(Math.max(safeQi - 1, 0)); }}
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".82rem", fontWeight: 600, padding: "11px 20px", borderRadius: 10, cursor: safeQi === 0 ? "default" : "pointer", border: "1px solid #262f47", background: "#151b2b", color: "#e6eaf3", opacity: safeQi === 0 ? 0.35 : 1 }}>
                ← Anterior
              </button>
              <div style={{ flex: 1, minWidth: 100, height: 6, background: "#1b2236", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", background: accent, width: `${((safeQi + 1) / items.length) * 100}%`, transition: "width .3s" }} />
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", color: "#8a94ad", whiteSpace: "nowrap" }}>{safeQi + 1} / {items.length}</span>
              <button disabled={safeQi >= items.length - 1} onClick={() => { setRevealed(false); setQi(Math.min(safeQi + 1, items.length - 1)); }}
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".82rem", fontWeight: 600, padding: "11px 20px", borderRadius: 10, cursor: safeQi >= items.length - 1 ? "default" : "pointer", border: `1px solid ${accent}`, background: accent, color: "#0e1320", opacity: safeQi >= items.length - 1 ? 0.4 : 1 }}>
                Siguiente →
              </button>
            </div>
          </div>
        )}
        {mode === "quiz" && items.length === 0 && <div style={{ color: "#5a6483", fontFamily: "'JetBrains Mono', monospace", fontSize: ".85rem" }}>Sin resultados.</div>}

        <div style={{ marginTop: 40, paddingTop: 20, borderTop: "1px solid #262f47", fontFamily: "'JetBrains Mono', monospace", fontSize: ".74rem", color: "#5a6483", textAlign: "center" }}>
          Buena suerte hoy 🚀 · en quiz navega con ← → · revela con espacio
        </div>
      </div>
    </div>
  );
}
