import type { Topic } from "../types";

export const apis: Topic = {
  key: "apis",
  name: "APIs",
  color: "#f0584e",
  items: [
    {
      q: "REST",
      a: `**REST** (Representational State Transfer) es un *estilo de arquitectura* para APIs sobre HTTP. Principios clave:
- Todo es un **recurso** con su URL (\`/users/42\`).
- Se opera con los **verbos HTTP** (GET, POST, PUT, DELETE).
- **Stateless**: cada petición lleva toda la info necesaria; el servidor no guarda estado de sesión entre llamadas.

Normalmente devuelve JSON. Es simple, cacheable y el estándar más extendido para APIs web.`,
    },
    {
      q: "GraphQL",
      a: `**GraphQL** es un lenguaje de consulta para APIs (creado por Facebook) con **un solo endpoint**. El cliente pide *exactamente* los campos que necesita y recibe justo eso, en una sola petición.

\`\`\`graphql
query {
  user(id: 42) {
    name
    posts { title }
  }
}
\`\`\`

Se apoya en un **schema** tipado que define qué se puede pedir. Operaciones: **query** (leer), **mutation** (escribir) y **subscription** (tiempo real).`,
    },
    {
      q: "REST vs GraphQL",
      a: `Comparación que suele preguntarse:
- **Endpoints**: REST tiene muchos (uno por recurso); GraphQL, uno solo.
- **Over/under-fetching**: en REST a veces traes campos de más, o te faltan y haces varias llamadas; GraphQL trae exactamente lo pedido en una.
- **Tipado**: GraphQL incluye schema tipado; REST no por defecto.
- **Caché**: REST se cachea fácil con HTTP; en GraphQL es más manual.

No hay un 'mejor' absoluto: REST brilla por simplicidad y caché; GraphQL, cuando el cliente necesita datos flexibles y anidados.`,
    },
    {
      q: "Métodos HTTP",
      a: `Los **verbos** indican la intención sobre un recurso:
- **GET**: leer (sin efectos, idempotente).
- **POST**: crear.
- **PUT**: reemplazar por completo (idempotente).
- **PATCH**: actualizar parcialmente.
- **DELETE**: eliminar.

**Idempotente** = repetir la llamada da el mismo resultado (GET, PUT, DELETE); POST no lo es.`,
    },
    {
      q: "Status codes",
      a: `Familias de códigos de respuesta HTTP:
- **2xx** éxito — \`200\` OK, \`201\` Created, \`204\` No Content.
- **3xx** redirección — \`301\` movido, \`304\` Not Modified (caché).
- **4xx** error del cliente — \`400\` Bad Request, \`401\` no autenticado, \`403\` sin permiso, \`404\` no existe, \`429\` demasiadas peticiones.
- **5xx** error del servidor — \`500\` Internal, \`503\` Service Unavailable.

Regla mental: 4xx es culpa del cliente, 5xx del servidor.`,
    },
    {
      q: "CORS",
      a: `**CORS** (Cross-Origin Resource Sharing) controla si un navegador permite que una página haga peticiones a un **origen distinto** (otro dominio, puerto o protocolo). El servidor autoriza con cabeceras como \`Access-Control-Allow-Origin\`. Es una protección del *navegador* (la *same-origin policy*): por eso ves errores de CORS en el front, pero la misma llamada funciona desde el servidor o Postman.`,
    },
    {
      q: "Autenticación de APIs (JWT)",
      a: `Patrones comunes para proteger una API:
- **JWT** (JSON Web Token): token firmado que el cliente envía en la cabecera \`Authorization: Bearer …\`; el servidor lo verifica sin guardar sesión (stateless).
- **API keys** para identificar apps, **OAuth** para acceso de terceros.

El token viaja en cada petición. Nunca se guardan secretos sensibles en el cliente, y los tokens deben ir siempre sobre HTTPS.`,
    },
  ],
};