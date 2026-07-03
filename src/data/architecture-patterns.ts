import type { Topic } from "../types";

export const architecturePatterns: Topic = {
  key: "arch",
  name: "Architecture Patterns",
  color: "#fb7185",
  items: [
    {
      q: "Arquitectura en capas (Layered / N-Tier)",
      a: `Divide el sistema en **capas horizontales**, cada una con una responsabilidad y solo habla con la adyacente. La más común:
- **Presentation** (UI/controllers): recibe input, devuelve output.
- **Business / Domain**: reglas de negocio.
- **Data access**: persistencia.
- A veces **Service layer** intermedia.

Ventajas: separación clara, fácil testeo de cada capa, cambiabilidad (swap DB sin tocar UI). Inconveniente senior: tiende a anémica — muchas capas "pasivas" que delegan y añaden overhead. Hay equipos que añaden capas "por costumbre" sin valor real.

Regla práctica: las capas no son un dogma, son un scaffolding. Vale la pena empezar con 3 capas y solo añadir más cuando un dominio las justifica (hooks de dominio, aplicación por bounded context).`,
    },
    {
      q: "Hexagonal Architecture (Ports & Adapters)",
      a: `Alistair Cockburn, 2005. Aísla la **lógica de negocio** en el centro rodeada de **puertos** (interfaces) que los **adaptadores** implementan. La app no sabe quién está al otro lado de un puerto — DB, queue, API externa.

\`\`\`
[ Adaptadores → ] ── ┐
                      ├─→ [ Dominio / Casos de uso ]
[ Adaptadores ← ] ── ┘
\`\`\`

- **Puerto**: interfaz que define qué necesita el dominio (ej: \`UserRepository.findByEmail\`).
- **Adaptador**: implementación concreta — \`PgUserRepository\`, \`InMemoryUserRepository\`, \`MockUserRepository\`.

Ventaja senior: el núcleo es **agnóstico** del framework, DB, transporte. Tests unitarios del dominio sin levantar nada. Cambiar Postgres por Mongo es solo escribir un nuevo adaptador. Es la base de muchos *clean architecture* modernos y de DDD liviano.`,
    },
    {
      q: "Clean Architecture (Robert Martin)",
      a: `Generalización de hexagonal con concentric layers — **dependency rule**: las dependencias solo van **hacia adentro**.

\`\`\`
        ┌────────────────────┐
        │ Entities / Domain  │   ← sin dependencias
        ├────────────────────┤
        │ Use Cases          │
        ├────────────────────┤
        │ Interface Adapters │ (controllers, presenters, gateways)
        ├────────────────────┤
        │ Frameworks & DB    │ (web, DB, UI, libs)
        └────────────────────┘
\`\`\`

- **Entities**: reglas de negocio más estables.
- **Use cases**: reglas de aplicación — orquestan entities.
- **Interface adapters**: convierten entre use cases y frameworks.
- **Frameworks**: React, Express, Postgres, etc.

Principio senior: **la dependencia apunta al dominio**. Una change en React o Postgres no toca el dominio; un cambio en el dominio puede propagarse hacia afuera. Trade-off real: boilerplate alto — solo vale la pena en sistemas con lógica de negocio compleja y larga vida. En CRUD no lo justifiques.`,
    },
    {
      q: "Domain-Driven Design (DDD)",
      a: `Eric Evans, 2003. Metodología (no solo arquitectura) para modelar software complejo alineado con el negocio:
- **Ubiquitous Language**: el código usa el mismo vocabulario que el negocio. Si el experto dice \`Factura\`, \`Cliente\`, el código tiene \`Factura\`, \`Cliente\` — no \`Record\`, \`User\`.
- **Bounded Contexts**: divide el sistema en contextos acotados, cada uno con su propio modelo coherente (un \`User\` para billing no es el mismo \`User\` para auth).
- **Entities**: objetos con identidad (ID) que persistan en el tiempo.
- **Value Objects**: objetos sin identidad, inmutables, comparables por valor (\`Address\`, \`Money\`).
- **Aggregates**: cluster de entidades coherentes, con una **aggregate root** que es la única entrada a modificarlas — garantiza invariantes.
- **Repositories**: abstracción del acceso a aggregates.
- **Domain Events**: el aggregate emite eventos cuando algo relevante ocurre.

Seniorostum: DDD completo es caro — solo para **dominios complejos** donde el modelado paga. En CRUD sigue siendo útil el **ubiquitous language** y separar Bounded Contexts lógicamente sin organizar toda esa maquinaria.`,
    },
    {
      q: "CQRS (Command Query Responsibility Segregation)",
      a: `Separa el **modelo de escritura** (commands) del **modelo de lectura** (queries). En vez de una sola entidad que sirve para todo, tienes dos — optimizadas independientemente.

\`\`\`
       ┌────────┐  Command  ┌────────────┐
Client │        ├──────────→│ Write Model │──→ Event store / DB
       │ (API)  │←──────────┤             │
       │        │  Query    ┌────────────┐
       └────────┴──────────→│ Read Model  │←─ proyectado de events
\`\`\`

- Las **queries** leen de vistas optimizadas (materialized views, Elasticsearch, Redis).
- Los **commands** mutating el write model y emiten **events**.
- Suele combinarse con **Event Sourcing**.

Beneficio senior: escalindependiente de lecturas (90% del tráfico) y escrituras. Puedes remodelar la vista de lectura sin tocar el modelo de negocio. Coste: complejidad operativa, eventual consistency entre write y read, infraestructura de proyecciones. No usar en CRUD simple — aquí es overhead.`,
    },
    {
      q: "Event Sourcing",
      a: `En vez de guardar el **estado actual** de una entidad, guardas la **secuencia de events** que la modificaron. El estado se *reconstruye* replaying los eventos.

\`\`\`
Account: open(balance=100) → deposit(50) → withdraw(30) → deposit(20)
Estado actual: 100 + 50 - 30 + 20 = 140
\`\`\`

Ventajas:
- **Auditabilidad total** — tienes el historial completo, no el resultado.
- **Time travel**: consultar el estado en cualquier momento.
- **Repurpose**: puedes proyectar los events a cualquier read model.

Desventajas senior:
- Event schema versioning — los eventos viejos viven para siempre.
- **Eventual consistency** con las proyecciones.
- Reemplazar una proyección rota = re-replay completo, que puede ser caro.
- Idempotencia, event ordering y conflict resolution son no triviales.

Combinar con CQRS. Usos reales: banking, ERP, sistemas críticos auditados. \`EventStoreDB\`, \`Kafka + key-store\` implementarlo.`,
    },
    {
      q: "Microservicios",
      a: `Arquitectura en la que el sistema se compone de **servicios pequeños autónomos**, cada uno:
- **Bounded context** propio (DDD).
- **Base de datos propia** — no comparten schema.
- Ciclo de deploy independiente.
- Comunican por **API/HTTP** o **eventos/mensajes**.

Ventajas: escalado por servicio, equipos autónomos, diversidad tecnológica, aislamiento de fallos. Costes senior:
- Latencia de red entre servicios.
- **Observabilidad complicada** (tracing distribuido).
- Consistencia eventual entre servicios — \`Saga pattern\`, **outbox pattern**.
- Despliegues, CI/CD, contratos de API — más ingeniería de plataforma.
- **Distributed monolith**: servicios acoplados que rompen el aislamiento.

**Inicia como monolito modular** y extrae servicios cuando un bounded context y un equipo propio lo justifiquen — no como paso cero.`,
    },
    {
      q: "Monolito modular",
      a: `Un solo deploy unit, pero internamente dividido en **módulos** independientes con border claro entre sí — casi un "microservicios sin red". Cada módulo:
- Expone una API pública (los demás solo consumen eso).
- Tiene su propio modelo y datos (idealmente su schema).
- No importar internals de otros módulos.

\`\`\`
app/
├─ billing/    (exports BillingService)
├─ catalog/    (exports ProductService)
└─ shipping/   (exports ShippingService)
\`\`\`

Ventaja senior: simplitud operativa de un monolito + el aislamiento de microservicios. Permite extraer un módulo a microservicio cuando sea necesario con poco costo — porque ya tiene su API y su schema. Es el camino recomendado hoy para startups y la mayoría de equipos.`,
    },
    {
      q: "Saga pattern",
      a: `En microservicios, una operación de negocio que toca varios servicios no puede usar una transaction ACID distribuida (lenta y frágil). La **Saga** la descompone en una **secuencia de transacciones locales**, cada una más un **compensating action** para revertir si algo falla.

- **OrderCreated** → \`Payment\` cobra → \`Inventory\` decrementa → \`Shipping\` crea envío.
- Si \`Shipping\` falla: "compensate" con \`Inventory.addBack()\` y \`Payment.refund()\`.

Tipos:
- **Choreography**: cada servicio emite un evento y otros reaccionan. Simple, sin coord., pero difícil seguir el flujo.
- **Orchestration**: un coordinador (Saga manager) envía commands y escucha respuestas. Más control, pero introduce punto central.

Seniorostum: garantiza **idempotencia** en cada step — los eventos se duplican. Y diseñar las compensaciones con cuidado: no siempre son reversibles (mandar un email no se deshace). Se complementa con outbox pattern para asegurar que events se emiten tras commit.`,
    },
    {
      q: "Outbox pattern",
      a: `Problema: una transacción en la DB y publicar un mensaje a una cola deben ser **atómicos**, pero no pueden estar en la misma transacción (DB y broker son distintos).

Solución: en la misma transacción DB, **insertas también una fila en la tabla \`outbox\`** con el evento a publicar. Un proceso aparte lee \`outbox\` y publica al broker, marcando las filas como enviadas.

\`\`\`
BEGIN TX
  UPDATE accounts SET balance -= 100
  INSERT INTO outbox(event) VALUES('AccountDebited')
COMMIT
// publisher aparte: lee outbox → Kafka → marca como sent
\`\`\`

Garantiza **exactly-once publishing** (al menos al podría duplicar, por eso consumidores también idempotentes). Combinado con idempotency keys y \`message_id\` deduplication en consumidores, es el patrón estándar para **transacciones distribuidas fiables** sin 2PC.`,
    },
    {
      q: "Strangler Fig pattern",
      a: `Martin Fowler. Migra un sistema legacy **incrementalmente** poniendo una "fachada" (gateway) delante. Las nuevas features se implementan en un nuevo servicio; el gateway rutea las antiguas al sistema legacy. Con el tiempo, el nuevo "estrangula" al viejo.

\`\`\`
            ┌───────────────┐
request ──→│  API Gateway  │──→  New service (cubre features A, C)
            └──┬────────────┘──→ Legacy (todavía features B, D)
\`\`\`

Cuando una feature se mueve al nuevo servicio, el gateway re-rutea sin tocar el cliente. Finalmente el legacy se apaga cuando ya no hay rutas hacia él.

Aplícalo senior para modernizaciones reales — expectancy: no rewrite de golpe. \`feature flags\` y \`canary deployments\` ayudan a validar cada pieza migrada.`,
    },
    {
      q: "BFF (Backend For Frontend)",
      a: `Un **BFF** es un backend específico para un frontend. En vez de un API Gateway genérico, tienes un backend por cliente (web, mobile, partner, IoT) que **agrega y adapta** los datos que ese cliente necesita.

\`\`\`
   Web app  → Web BFF ─┐
                        ├─→ [ Microservicios / Domain services ]
   Mobile  → Mobile BFF ┘
\`\`\`

Ventaja senior:
- El cliente recibe **justo lo que necesita** — sin over-fetching ni under-fetching.
- Los equipos frontend son autónomos: añaden campos, endpoints específicos sin tocar los demás.
- El BFF puede **ocultar complejidad** del dominio (varios servicios) en una API simple.

Coste: más servicios que mantener. No abuses — un BFF por cliente solo si de verdad los perfiles de datos son distintos. Si web y mobile son casi idénticos, un solo BFF basta.`,
    },
    {
      q: "Event-Driven Architecture (EDA)",
      a: `Los servicios **emiten eventos** cuando algo pasa; otros servicios **reaccionan** a esos eventos. Los productores no conocen a los consumidores — totalmente desacoplados.

\`\`\`
OrderService → [ OrderCreated event ] → Kafka topic
                                          ├─→ InventoryService (consume)
                                          ├─→ NotificationService (consume)
                                          └─→ AnalyticsService (consume)
\`\`\`

Beneficios senior:
- **Desacoplamiento**: añadir consumidores no toca al productor.
- **Asincronía**: el productor responde rápido; el trabajo sigue en cola.
- **Resiliencia**: si un consumidor cae, los eventos se bufferizar.
- **Replay**: puedes volver a procesar el historial.

Coste: **eventual consistency** notable, ordering por partición, idempotencia en consumidores, schema evolution, **observabilidad distribuida** obligatoria. \`Kafka\`, \`Pulsar\`, \`Kinesis\` son los buses habituales; \`RabbitMQ\` más para colas punto a punto.`,
    },
    {
      q: "Arquitectura Serverless",
      a: `El cloud provider gestiona servidores, escalado y provisionamiento. Tú despliegues **funciones** (FaaS) o servicios gestionados que escalan a cero y se cobran por invocación.

- **FaaS**: AWS Lambda, Google Cloud Functions, Cloudflare Workers, Vercel Edge Functions.
- **Backend-as-a-Service**: DynamoDB, Firestore, AppSync, Cognito.
- **Orquestación**: Step Functions, EventBridge.

Ventajas senior:
- Sin gestión de servidores.
- Escalado automático (de 0 a miles, pagando por ms de ejecución).
- Time-to-market corto para MVPs y cargas esporádicas.

Trampas:
- **Cold starts** — penaliza latencia p99 en FaaS.
- **Encadenamiento de funciones** introduce latencia.
- **State externo**: las funciones son stateless — todo a DB / cache / queue.
- **Vendor lock-in fuerte** y debugging complicado (distributed tracing obligatorio).

Combinar serverless es inteligente para **endpoints de tráfico esporádico o molto variable**; para cargas constantes y predecibles, contenedores dedicados suelen ser más baratos.`,
    },
    {
      q: "Arquitectura de Plugins / Extensiones",
      a: `El núcleo de la app es pequeño y expone **hooks** (puntos de extensión) que los plugins implementan. El núcleo no conoce a los plugins concretos — los descubre por registro o importación dinámica.

\`\`\`ts
// core
interface Plugin { id: string; init(app: App): void; }
class App {
  private plugins: Plugin[] = [];
  register(p: Plugin) { this.plugins.push(p); p.init(this); }
  on(event: string, fn: Function) { /* … */ }
}
// plugin
const myPlugin: Plugin = {
  id: "analytics",
  init(app) { app.on("click", e => track(e)); }
};
\`\`\`

Base de VSCode, Webpack, Babel, Vite, Rollup, Gatsby, Telerik Platform. Principio senior: \
- **Kernel mínimo + Registry** — los plugins se registran a un bus común. \
- **Contracts estables**: el API de hooks debe cambiar lentamente; los plugins, rápido. \
- **Aislamiento**: los plugins no deben romper el core — sandboxes, try/catch en cada hook. \
- **Carga dinámica**: importación condicional para no inflar el bundle base.`,
    },
    {
      q: "Microfrontends",
      a: `Aplica la idea de microservicios al front: divides una SPA grande en **apps independientes** que se integran en tiempo de ejecución, cada una con su propio build, deploy y equipo.

\`\`\`
           ┌─────────────────────────────┐
           │  Shell / Container App      │
           ├──────┬──────────┬───────────┤
           │  ←   │  MFE A   │   MFE B   │  ← cada uno: build/deploy/route propios
           │ nav  │ (catalog)│ (checkout)│
           └──────┴──────────┴───────────┘
\`\`\`

Estrategias de integración:
- **Build-time**: NPM packages que el shell compila. Simple pero acopla versiones — pierde autonomía.
- **Run-time via iframe**: aislamiento total (DOM, JS, CSS), pero routing y comunicación engorrosos.
- **Run-time via JS**: el shell carga un bundle remoto y lo monta en un nodo. **Module Federation** (Webpack 5) o \`@module-federation\` lo hace nativo.
- **Server-side composition**: el servidor ensambla HTML desde varios MFEs (Next.js multi-zone, SSRI).

Beneficios senior:
- Equipos autónomos end-to-end (deployan su MFE sin coordinar con el resto).
- Diversidad tecnológica gradual (puedes migrar un MFE de Angular a React sin tocar los demás).
- Escalado organizativo — cada team posee una vertical de negocio.

Costes:
- **Bundle duplicado** (React cargado N veces) → shared dependencies con Module Federation.
- **UX fragmentada**: diseño inconsistente, navegación entre MFEs, latencia al cambiar.
- **Performance**: más código, hydration repetida, liñas de carga en cascada.
- **Contratos de integración**: eventos globales, Query params, custom events — no hay estado global de verdad.
- **Observabilidad**: tracing entre MFEs, CI/CD propio por MFE.

Decisión senior: se justifican en **organizaciones grandes** (50+ devs, múltiples equipos) con dominios estables — no en startups ni apps medianas. En la mayoría de casos un monolito modular es más rentable.`,
    },
  ],
};