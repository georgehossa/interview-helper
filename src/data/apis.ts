import type { Topic } from "../types";

export const apis: Topic = {
  key: "apis",
  name: "APIs",
  color: "#f0584e",
  items: [
    {
      q: { es: "REST", en: "REST" },
      a: {
        es: `**REST** (Representational State Transfer) es un *estilo de arquitectura* para APIs sobre HTTP. Principios clave:
- Todo es un **recurso** con su URL (\`/users/42\`).
- Se opera con los **verbos HTTP** (GET, POST, PUT, DELETE).
- **Stateless**: cada petición lleva toda la info necesaria; el servidor no guarda estado de sesión entre llamadas.

Normalmente devuelve JSON. Es simple, cacheable y el estándar más extendido para APIs web.`,
        en: `**REST** (Representational State Transfer) is an *architectural style* for HTTP APIs. Key principles:
- Everything is a **resource** with its URL (\`/users/42\`).
- Operate with **HTTP verbs** (GET, POST, PUT, DELETE).
- **Stateless**: each request carries all the info needed; the server keeps no session state between calls.

It usually returns JSON. It's simple, cacheable and the most widely adopted standard for web APIs.`,
      },
    },
    {
      q: { es: "GraphQL", en: "GraphQL" },
      a: {
        es: `**GraphQL** es un lenguaje de consulta para APIs (creado por Facebook) con **un solo endpoint**. El cliente pide *exactamente* los campos que necesita y recibe justo eso, en una sola petición.

\`\`\`graphql
query {
  user(id: 42) {
    name
    posts { title }
  }
}
\`\`\`

Se apoya en un **schema** tipado que define qué se puede pedir. Operaciones: **query** (leer), **mutation** (escribir) y **subscription** (tiempo real).`,
        en: `**GraphQL** is a query language for APIs (created by Facebook) with **a single endpoint**. The client asks for *exactly* the fields it needs and gets just that, in one request.

\`\`\`graphql
query {
  user(id: 42) {
    name
    posts { title }
  }
}
\`\`\`

It relies on a typed **schema** that defines what you can ask for. Operations: **query** (read), **mutation** (write) and **subscription** (real-time).`,
      },
    },
    {
      q: { es: "REST vs GraphQL", en: "REST vs GraphQL" },
      a: {
        es: `Comparación que suele preguntarse:
- **Endpoints**: REST tiene muchos (uno por recurso); GraphQL, uno solo.
- **Over/under-fetching**: en REST a veces traes campos de más, o te faltan y haces varias llamadas; GraphQL trae exactamente lo pedido en una.
- **Tipado**: GraphQL incluye schema tipado; REST no por defecto.
- **Caché**: REST se cachea fácil con HTTP; en GraphQL es más manual.

No hay un 'mejor' absoluto: REST brilla por simplicidad y caché; GraphQL, cuando el cliente necesita datos flexibles y anidados.`,
        en: `A comparison that often comes up:
- **Endpoints**: REST has many (one per resource); GraphQL, a single one.
- **Over/under-fetching**: in REST you sometimes fetch too many fields, or lack some and make several calls; GraphQL fetches exactly what's asked in one.
- **Typing**: GraphQL includes a typed schema; REST doesn't by default.
- **Caching**: REST caches easily with HTTP; in GraphQL it's more manual.

There's no absolute 'better': REST shines for simplicity and caching; GraphQL when the client needs flexible, nested data.`,
      },
    },
    {
      q: { es: "Métodos HTTP", en: "HTTP methods" },
      a: {
        es: `Los **verbos** indican la intención sobre un recurso:
- **GET**: leer (sin efectos, idempotente).
- **POST**: crear.
- **PUT**: reemplazar por completo (idempotente).
- **PATCH**: actualizar parcialmente.
- **DELETE**: eliminar.

**Idempotente** = repetir la llamada da el mismo resultado (GET, PUT, DELETE); POST no lo es.`,
        en: `The **verbs** indicate the intent on a resource:
- **GET**: read (no side effects, idempotent).
- **POST**: create.
- **PUT**: replace entirely (idempotent).
- **PATCH**: update partially.
- **DELETE**: remove.

**Idempotent** = repeating the call yields the same result (GET, PUT, DELETE); POST is not.`,
      },
    },
    {
      q: { es: "Status codes", en: "Status codes" },
      a: {
        es: `Familias de códigos de respuesta HTTP:
- **2xx** éxito — \`200\` OK, \`201\` Created, \`204\` No Content.
- **3xx** redirección — \`301\` movido, \`304\` Not Modified (caché).
- **4xx** error del cliente — \`400\` Bad Request, \`401\` no autenticado, \`403\` sin permiso, \`404\` no existe, \`429\` demasiadas peticiones.
- **5xx** error del servidor — \`500\` Internal, \`503\` Service Unavailable.

Regla mental: 4xx es culpa del cliente, 5xx del servidor.`,
        en: `HTTP response code families:
- **2xx** success — \`200\` OK, \`201\` Created, \`204\` No Content.
- **3xx** redirection — \`301\` moved, \`304\` Not Modified (cache).
- **4xx** client error — \`400\` Bad Request, \`401\` not authenticated, \`403\` no permission, \`404\` not found, \`429\` too many requests.
- **5xx** server error — \`500\` Internal, \`503\` Service Unavailable.

Mental rule: 4xx is the client's fault, 5xx the server's.`,
      },
    },
    {
      q: { es: "CORS", en: "CORS" },
      a: {
        es: `**CORS** (Cross-Origin Resource Sharing) controla si un navegador permite que una página haga peticiones a un **origen distinto** (otro dominio, puerto o protocolo). El servidor autoriza con cabeceras como \`Access-Control-Allow-Origin\`. Es una protección del *navegador* (la *same-origin policy*): por eso ves errores de CORS en el front, pero la misma llamada funciona desde el servidor o Postman.`,
        en: `**CORS** (Cross-Origin Resource Sharing) controls whether a browser allows a page to make requests to a **different origin** (another domain, port, or protocol). The server authorizes with headers like \`Access-Control-Allow-Origin\`. It's a *browser* protection (the *same-origin policy*): that's why you see CORS errors in the front, but the same call works from the server or Postman.`,
      },
    },
    {
      q: {
        es: "Autenticación de APIs (JWT)",
        en: "API authentication (JWT)",
      },
      a: {
        es: `Patrones comunes para proteger una API:
- **JWT** (JSON Web Token): token firmado que el cliente envía en la cabecera \`Authorization: Bearer …\`; el servidor lo verifica sin guardar sesión (stateless).
- **API keys** para identificar apps, **OAuth** para acceso de terceros.

El token viaja en cada petición. Nunca se guardan secretos sensibles en el cliente, y los tokens deben ir siempre sobre HTTPS.`,
        en: `Common patterns to protect an API:
- **JWT** (JSON Web Token): a signed token the client sends in the \`Authorization: Bearer …\` header; the server verifies it without storing a session (stateless).
- **API keys** to identify apps, **OAuth** for third-party access.

The token travels with every request. Never store sensitive secrets in the client, and tokens should always go over HTTPS.`,
      },
    },
  ],
};