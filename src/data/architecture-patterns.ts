import type { Topic } from "../types";

export const architecturePatterns: Topic = {
  key: "arch",
  name: "Architecture Patterns",
  color: "#fb7185",
  items: [
    {
      q: {
        es: "Arquitectura en capas (Layered / N-Tier)",
        en: "Layered architecture (Layered / N-Tier)",
      },
      a: {
        es: `Divide el sistema en **capas horizontales**, cada una con una responsabilidad y solo habla con la adyacente. La más común:
- **Presentation** (UI/controllers): recibe input, devuelve output.
- **Business / Domain**: reglas de negocio.
- **Data access**: persistencia.
- A veces **Service layer** intermedia.

Ventajas: separación clara, fácil testeo de cada capa, cambiabilidad (swap DB sin tocar UI). Inconveniente senior: tiende a anémica — muchas capas "pasivas" que delegan y añaden overhead. Hay equipos que añaden capas "por costumbre" sin valor real.

Regla práctica: las capas no son un dogma, son un scaffolding. Vale la pena empezar con 3 capas y solo añadir más cuando un dominio las justifica (hooks de dominio, aplicación por bounded context).`,
        en: `Splits the system into **horizontal layers**, each with a single responsibility, only talking to the adjacent one. The most common:
- **Presentation** (UI/controllers): receives input, returns output.
- **Business / Domain**: business rules.
- **Data access**: persistence.
- Sometimes an intermediate **Service layer**.

Advantages: clear separation, easy per-layer testing, changeability (swap the DB without touching the UI). Senior downside: it tends to be anemic — many "passive" layers that just delegate and add overhead. Some teams add layers "by habit" with no real value.

Practical rule: layers aren't dogma, they're scaffolding. Start with 3 layers and only add more when a domain justifies it (domain hooks, per-bounded-context application).`,
      },
    },
    {
      q: {
        es: "Hexagonal Architecture (Ports & Adapters)",
        en: "Hexagonal Architecture (Ports & Adapters)",
      },
      a: {
        es: `Alistair Cockburn, 2005. Aísla la **lógica de negocio** en el centro rodeada de **puertos** (interfaces) que los **adaptadores** implementan. La app no sabe quién está al otro lado de un puerto — DB, queue, API externa.

\`\`\`
[ Adaptadores → ] ── ┐
                      ├─→ [ Dominio / Casos de uso ]
[ Adaptadores ← ] ── ┘
\`\`\`

- **Puerto**: interfaz que define qué necesita el dominio (ej: \`UserRepository.findByEmail\`).
- **Adaptador**: implementación concreta — \`PgUserRepository\`, \`InMemoryUserRepository\`, \`MockUserRepository\`.

Ventaja senior: el núcleo es **agnóstico** del framework, DB, transporte. Tests unitarios del dominio sin levantar nada. Cambiar Postgres por Mongo es solo escribir un nuevo adaptador. Es la base de muchos *clean architecture* modernos y de DDD liviano.`,
        en: `Alistair Cockburn, 2005. Isolates the **business logic** in the center surrounded by **ports** (interfaces) that **adapters** implement. The app doesn't know what's on the other side of a port — DB, queue, external API.

\`\`\`
[ Adapters → ] ── ┐
                  ├─→ [ Domain / Use cases ]
[ Adapters ← ] ── ┘
\`\`\`

- **Port**: an interface defining what the domain needs (e.g. \`UserRepository.findByEmail\`).
- **Adapter**: a concrete implementation — \`PgUserRepository\`, \`InMemoryUserRepository\`, \`MockUserRepository\`.

Senior advantage: the core is **agnostic** to the framework, DB, transport. Unit-test the domain without standing anything up. Switching Postgres for Mongo is just writing a new adapter. It's the basis of many modern *clean architectures* and lightweight DDD.`,
      },
    },
    {
      q: {
        es: "Clean Architecture (Robert Martin)",
        en: "Clean Architecture (Robert Martin)",
      },
      a: {
        es: `Generalización de hexagonal con concentric layers — **dependency rule**: las dependencias solo van **hacia adentro**.

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

Principio senior: **la dependencia apunta al dominio**. Un change en React o Postgres no toca el dominio; un cambio en el dominio puede propagarse hacia afuera. Trade-off real: boilerplate alto — solo vale la pena en sistemas con lógica de negocio compleja y larga vida. En CRUD no lo justifiques.`,
        en: `A generalization of hexagonal with concentric layers — **dependency rule**: dependencies only point **inward**.

\`\`\`
        ┌────────────────────┐
        │ Entities / Domain  │   ← no dependencies
        ├────────────────────┤
        │ Use Cases          │
        ├────────────────────┤
        │ Interface Adapters │ (controllers, presenters, gateways)
        ├────────────────────┤
        │ Frameworks & DB    │ (web, DB, UI, libs)
        └────────────────────┘
\`\`\`

- **Entities**: the most stable business rules.
- **Use cases**: application rules — they orchestrate entities.
- **Interface adapters**: convert between use cases and frameworks.
- **Frameworks**: React, Express, Postgres, etc.

Senior principle: **the dependency points to the domain**. A change in React or Postgres doesn't touch the domain; a change in the domain can propagate outward. Real trade-off: high boilerplate — only worth it in systems with complex, long-lived business logic. Don't justify it in CRUD.`,
      },
    },
    {
      q: {
        es: "Domain-Driven Design (DDD)",
        en: "Domain-Driven Design (DDD)",
      },
      a: {
        es: `Eric Evans, 2003. Metodología (no solo arquitectura) para modelar software complejo alineado con el negocio:
- **Ubiquitous Language**: el código usa el mismo vocabulario que el negocio. Si el experto dice \`Factura\`, \`Cliente\`, el código tiene \`Factura\`, \`Cliente\` — no \`Record\`, \`User\`.
- **Bounded Contexts**: divide el sistema en contextos acotados, cada uno con su propio modelo coherente (un \`User\` para billing no es el mismo \`User\` para auth).
- **Entities**: objetos con identidad (ID) que persisten en el tiempo.
- **Value Objects**: objetos sin identidad, inmutables, comparables por valor (\`Address\`, \`Money\`).
- **Aggregates**: cluster de entidades coherentes, con una **aggregate root** que es la única entrada a modificarlas — garantiza invariantes.
- **Repositories**: abstracción del acceso a aggregates.
- **Domain Events**: el aggregate emite eventos cuando algo relevante ocurre.

Seniorostum: DDD completo es caro — solo para **dominios complejos** donde el modelado paga. En CRUD sigue siendo útil el **ubiquitous language** y separar Bounded Contexts lógicamente sin organizar toda esa maquinaria.`,
        en: `Eric Evans, 2003. A methodology (not just an architecture) to model complex software aligned with the business:
- **Ubiquitous Language**: the code uses the same vocabulary as the business. If the expert says \`Invoice\`, \`Customer\`, the code has \`Invoice\`, \`Customer\` — not \`Record\`, \`User\`.
- **Bounded Contexts**: split the system into bounded contexts, each with its own coherent model (a \`User\` for billing isn't the same \`User\` as for auth).
- **Entities**: objects with identity (ID) that persist over time.
- **Value Objects**: objects without identity, immutable, compared by value (\`Address\`, \`Money\`).
- **Aggregates**: a cluster of coherent entities, with an **aggregate root** that's the only entry point to modify them — it guarantees invariants.
- **Repositories**: an abstraction for accessing aggregates.
- **Domain Events**: the aggregate emits events when something relevant happens.

Senior note: full DDD is expensive — only for **complex domains** where the modeling pays off. In CRUD, the **ubiquitous language** and logically separating Bounded Contexts is still useful without organizing all that machinery.`,
      },
    },
    {
      q: {
        es: "CQRS (Command Query Responsibility Segregation)",
        en: "CQRS (Command Query Responsibility Segregation)",
      },
      a: {
        es: `Separa el **modelo de escritura** (commands) del **modelo de lectura** (queries). En vez de una sola entidad que sirve para todo, tienes dos — optimizadas independientemente.

\`\`\`
       ┌────────┐  Command  ┌────────────┐
Client │        ├──────────→│ Write Model │──→ Event store / DB
       │ (API)  │←──────────┤             │
       │        │  Query    ┌────────────┐
       └────────┴──────────→│ Read Model  │←─ proyectado de events
\`\`\`

- Las **queries** leen de vistas optimizadas (materialized views, Elasticsearch, Redis).
- Los **commands** mutan el write model y emiten **events**.
- Suele combinarse con **Event Sourcing**.

Beneficio senior: escalado independiente de lecturas (90% del tráfico) y escrituras. Puedes remodelar la vista de lectura sin tocar el modelo de negocio. Coste: complejidad operativa, eventual consistency entre write y read, infraestructura de proyecciones. No usar en CRUD simple — aquí es overhead.`,
        en: `Separates the **write model** (commands) from the **read model** (queries). Instead of a single entity serving everything, you have two — independently optimized.

\`\`\`
       ┌────────┐  Command  ┌────────────┐
Client │        ├──────────→│ Write Model │──→ Event store / DB
       │ (API)  │←──────────┤             │
       │        │  Query    ┌────────────┐
       └────────┴──────────→│ Read Model  │←─ projected from events
\`\`\`

- **Queries** read from optimized views (materialized views, Elasticsearch, Redis).
- **Commands** mutate the write model and emit **events**.
- Often combined with **Event Sourcing**.

Senior benefit: independent scaling of reads (90% of traffic) and writes. You can remodel the read view without touching the business model. Cost: operational complexity, eventual consistency between write and read, projection infrastructure. Don't use it in simple CRUD — there it's overhead.`,
      },
    },
    {
      q: { es: "Event Sourcing", en: "Event Sourcing" },
      a: {
        es: `En vez de guardar el **estado actual** de una entidad, guardas la **secuencia de events** que la modificaron. El estado se *reconstruye* replaying los eventos.

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
        en: `Instead of storing an entity's **current state**, you store the **sequence of events** that modified it. The state is *reconstructed* by replaying the events.

\`\`\`
Account: open(balance=100) → deposit(50) → withdraw(30) → deposit(20)
Current state: 100 + 50 - 30 + 20 = 140
\`\`\`

Advantages:
- **Full auditability** — you have the complete history, not just the result.
- **Time travel**: query the state at any point in time.
- **Repurpose**: you can project the events into any read model.

Senior downsides:
- Event schema versioning — old events live forever.
- **Eventual consistency** with the projections.
- Replacing a broken projection = a full re-replay, which can be expensive.
- Idempotency, event ordering, and conflict resolution are non-trivial.

Combine with CQRS. Real uses: banking, ERP, audited critical systems. \`EventStoreDB\`, \`Kafka + key-store\` implement it.`,
      },
    },
    {
      q: { es: "Microservicios", en: "Microservices" },
      a: {
        es: `Arquitectura en la que el sistema se compone de **servicios pequeños autónomos**, cada uno:
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
        en: `An architecture where the system is composed of **small autonomous services**, each with:
- Its own **bounded context** (DDD).
- Its own **database** — no shared schema.
- An independent deploy cycle.
- Communication via **API/HTTP** or **events/messages**.

Advantages: per-service scaling, autonomous teams, technology diversity, fault isolation. Senior costs:
- Network latency between services.
- **Complicated observability** (distributed tracing).
- Eventual consistency across services — \`Saga pattern\`, **outbox pattern**.
- Deploys, CI/CD, API contracts — more platform engineering.
- **Distributed monolith**: tightly-coupled services that break the isolation.

**Start as a modular monolith** and extract services when a bounded context and a dedicated team justify it — not as step zero.`,
      },
    },
    {
      q: { es: "Monolito modular", en: "Modular monolith" },
      a: {
        es: `Un solo deploy unit, pero internamente dividido en **módulos** independientes con border claro entre sí — casi un "microservicios sin red". Cada módulo:
- Expone una API pública (los demás solo consumen eso).
- Tiene su propio modelo y datos (idealmente su schema).
- No importar internals de otros módulos.

\`\`\`
app/
├─ billing/    (exports BillingService)
├─ catalog/    (exports ProductService)
└─ shipping/   (exports ShippingService)
\`\`\`

Ventaja senior: simplicidad operativa de un monolito + el aislamiento de microservicios. Permite extraer un módulo a microservicio cuando sea necesario con poco costo — porque ya tiene su API y su schema. Es el camino recomendado hoy para startups y la mayoría de equipos.`,
        en: `A single deploy unit, but internally split into independent **modules** with clear borders between them — almost "microservices without the network". Each module:
- Exposes a public API (the others only consume that).
- Has its own model and data (ideally its own schema).
- Doesn't import internals from other modules.

\`\`\`
app/
├─ billing/    (exports BillingService)
├─ catalog/    (exports ProductService)
└─ shipping/   (exports ShippingService)
\`\`\`

Senior advantage: a monolith's operational simplicity + microservices' isolation. It lets you extract a module into a microservice when needed at low cost — because it already has its API and schema. It's the recommended path today for startups and most teams.`,
      },
    },
    {
      q: { es: "Saga pattern", en: "Saga pattern" },
      a: {
        es: `En microservicios, una operación de negocio que toca varios servicios no puede usar una transaction ACID distribuida (lenta y frágil). La **Saga** la descompone en una **secuencia de transacciones locales**, cada una más un **compensating action** para revertir si algo falla.

- **OrderCreated** → \`Payment\` cobra → \`Inventory\` decrementa → \`Shipping\` crea envío.
- Si \`Shipping\` falla: "compensate" con \`Inventory.addBack()\` y \`Payment.refund()\`.

Tipos:
- **Choreography**: cada servicio emite un evento y otros reaccionan. Simple, sin coord., pero difícil seguir el flujo.
- **Orchestration**: un coordinador (Saga manager) envía commands y escucha respuestas. Más control, pero introduce punto central.

Seniorostum: garantiza **idempotencia** en cada step — los eventos se duplican. Y diseñar las compensaciones con cuidado: no siempre son reversibles (mandar un email no se deshace). Se complementa con outbox pattern para asegurar que events se emiten tras commit.`,
        en: `In microservices, a business operation that touches several services can't use a distributed ACID transaction (slow and fragile). The **Saga** breaks it into a **sequence of local transactions**, each with a **compensating action** to revert if something fails.

- **OrderCreated** → \`Payment\` charges → \`Inventory\` decrements → \`Shipping\` creates the shipment.
- If \`Shipping\` fails: "compensate" with \`Inventory.addBack()\` and \`Payment.refund()\`.

Types:
- **Choreography**: each service emits an event and others react. Simple, no coordination, but hard to follow the flow.
- **Orchestration**: a coordinator (Saga manager) sends commands and listens for responses. More control, but it introduces a central point.

Senior note: guarantee **idempotency** on every step — events get duplicated. And design compensations carefully: they're not always reversible (sending an email can't be undone). It's complemented by the outbox pattern to ensure events are emitted after commit.`,
      },
    },
    {
      q: { es: "Outbox pattern", en: "Outbox pattern" },
      a: {
        es: `Problema: una transacción en la DB y publicar un mensaje a una cola deben ser **atómicos**, pero no pueden estar en la misma transacción (DB y broker son distintos).

Solución: en la misma transacción DB, **insertas también una fila en la tabla \`outbox\`** con el evento a publicar. Un proceso aparte lee \`outbox\` y publica al broker, marcando las filas como enviadas.

\`\`\`
BEGIN TX
  UPDATE accounts SET balance -= 100
  INSERT INTO outbox(event) VALUES('AccountDebited')
COMMIT
// publisher aparte: lee outbox → Kafka → marca como sent
\`\`\`

Garantiza **exactly-once publishing** (al menos al podría duplicar, por eso consumidores también idempotentes). Combinado con idempotency keys y \`message_id\` deduplication en consumidores, es el patrón estándar para **transacciones distribuidas fiables** sin 2PC.`,
        en: `Problem: a DB transaction and publishing a message to a queue must be **atomic**, but they can't be in the same transaction (DB and broker are different).

Solution: in the same DB transaction, you **also insert a row in the \`outbox\` table** with the event to publish. A separate process reads \`outbox\` and publishes to the broker, marking the rows as sent.

\`\`\`
BEGIN TX
  UPDATE accounts SET balance -= 100
  INSERT INTO outbox(event) VALUES('AccountDebited')
COMMIT
// separate publisher: reads outbox → Kafka → marks as sent
\`\`\`

It guarantees **exactly-once publishing** (it could at least duplicate, hence consumers are also idempotent). Combined with idempotency keys and \`message_id\` deduplication on consumers, it's the standard pattern for **reliable distributed transactions** without 2PC.`,
      },
    },
    {
      q: { es: "Strangler Fig pattern", en: "Strangler Fig pattern" },
      a: {
        es: `Martin Fowler. Migra un sistema legacy **incrementalmente** poniendo una "fachada" (gateway) delante. Las nuevas features se implementan en un nuevo servicio; el gateway rutea las antiguas al sistema legacy. Con el tiempo, el nuevo "estrangula" al viejo.

\`\`\`
            ┌───────────────┐
request ──→│  API Gateway  │──→  New service (cubre features A, C)
            └──┬────────────┘──→ Legacy (todavía features B, D)
\`\`\`

Cuando una feature se mueve al nuevo servicio, el gateway re-rutea sin tocar el cliente. Finalmente el legacy se apaga cuando ya no hay rutas hacia él.

Aplícalo senior para modernizaciones reales — expectancy: no rewrite de golpe. \`feature flags\` y \`canary deployments\` ayudan a validar cada pieza migrada.`,
        en: `Martin Fowler. Migrates a legacy system **incrementally** by putting a "facade" (gateway) in front. New features are implemented in a new service; the gateway routes the old ones to the legacy system. Over time, the new one "strangles" the old one.

\`\`\`
            ┌───────────────┐
request ──→│  API Gateway  │──→  New service (covers features A, C)
            └──┬────────────┘──→ Legacy (still features B, D)
\`\`\`

When a feature moves to the new service, the gateway re-routes it without touching the client. Eventually the legacy is shut down when there are no more routes to it.

Apply it senior for real modernizations — the expectation: no big-bang rewrite. \`feature flags\` and \`canary deployments\` help validate each migrated piece.`,
      },
    },
    {
      q: { es: "BFF (Backend For Frontend)", en: "BFF (Backend For Frontend)" },
      a: {
        es: `Un **BFF** es un backend específico para un frontend. En vez de un API Gateway genérico, tienes un backend por cliente (web, mobile, partner, IoT) que **agrega y adapta** los datos que ese cliente necesita.

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
        en: `A **BFF** is a backend specific to a frontend. Instead of a generic API Gateway, you have a backend per client (web, mobile, partner, IoT) that **aggregates and adapts** the data that client needs.

\`\`\`
   Web app  → Web BFF ─┐
                        ├─→ [ Microservices / Domain services ]
   Mobile  → Mobile BFF ┘
\`\`\`

Senior advantage:
- The client receives **exactly what it needs** — no over-fetching or under-fetching.
- Frontend teams are autonomous: they add fields and specific endpoints without touching the others.
- The BFF can **hide domain complexity** (multiple services) behind a simple API.

Cost: more services to maintain. Don't overuse it — a BFF per client only if the data profiles are really different. If web and mobile are nearly identical, a single BFF is enough.`,
      },
    },
    {
      q: {
        es: "Event-Driven Architecture (EDA)",
        en: "Event-Driven Architecture (EDA)",
      },
      a: {
        es: `Los servicios **emiten eventos** cuando algo pasa; otros servicios **reaccionan** a esos eventos. Los productores no conocen a los consumidores — totalmente desacoplados.

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
        en: `Services **emit events** when something happens; other services **react** to those events. Producers don't know the consumers — fully decoupled.

\`\`\`
OrderService → [ OrderCreated event ] → Kafka topic
                                          ├─→ InventoryService (consume)
                                          ├─→ NotificationService (consume)
                                          └─→ AnalyticsService (consume)
\`\`\`

Senior benefits:
- **Decoupling**: adding consumers doesn't touch the producer.
- **Asynchrony**: the producer responds fast; the work continues in the queue.
- **Resilience**: if a consumer is down, events get buffered.
- **Replay**: you can reprocess the history.

Cost: **eventual consistency** is notable, per-partition ordering, idempotency in consumers, schema evolution, **distributed observability** is mandatory. \`Kafka\`, \`Pulsar\`, \`Kinesis\` are the usual buses; \`RabbitMQ\` more for point-to-point queues.`,
      },
    },
    {
      q: {
        es: "Arquitectura Serverless",
        en: "Serverless architecture",
      },
      a: {
        es: `El cloud provider gestiona servidores, escalado y provisionamiento. Tú despliegues **funciones** (FaaS) o servicios gestionados que escalan a cero y se cobran por invocación.

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

Combinar serverless es inteligente para **endpoints de tráfico esporádico o muy variable**; para cargas constantes y predecibles, contenedores dedicados suelen ser más baratos.`,
        en: `The cloud provider manages servers, scaling, and provisioning. You deploy **functions** (FaaS) or managed services that scale to zero and bill per invocation.

- **FaaS**: AWS Lambda, Google Cloud Functions, Cloudflare Workers, Vercel Edge Functions.
- **Backend-as-a-Service**: DynamoDB, Firestore, AppSync, Cognito.
- **Orchestration**: Step Functions, EventBridge.

Senior advantages:
- No server management.
- Automatic scaling (from 0 to thousands, paying per ms of execution).
- Short time-to-market for MVPs and sporadic workloads.

Pitfalls:
- **Cold starts** — penalizes p99 latency in FaaS.
- **Chaining functions** introduces latency.
- **External state**: functions are stateless — everything goes to DB / cache / queue.
- **Strong vendor lock-in** and hard debugging (distributed tracing mandatory).

Serverless is smart for **sporadic or highly variable traffic endpoints**; for constant, predictable workloads, dedicated containers are usually cheaper.`,
      },
    },
    {
      q: {
        es: "Arquitectura de Plugins / Extensiones",
        en: "Plugin / Extension architecture",
      },
      a: {
        es: `El núcleo de la app es pequeño y expone **hooks** (puntos de extensión) que los plugins implementan. El núcleo no conoce a los plugins concretos — los descubre por registro o importación dinámica.

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

Base de VSCode, Webpack, Babel, Vite, Rollup, Gatsby. Principio senior:
- **Kernel mínimo + Registry** — los plugins se registran a un bus común.
- **Contracts estables**: el API de hooks debe cambiar lentamente; los plugins, rápido.
- **Aislamiento**: los plugins no deben romper el core — sandboxes, try/catch en cada hook.
- **Carga dinámica**: importación condicional para no inflar el bundle base.`,
        en: `The app's core is small and exposes **hooks** (extension points) that plugins implement. The core doesn't know the concrete plugins — it discovers them via registration or dynamic import.

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

The basis of VSCode, Webpack, Babel, Vite, Rollup, Gatsby. Senior principle:
- **Minimal kernel + Registry** — plugins register with a common bus.
- **Stable contracts**: the hooks API should change slowly; plugins, fast.
- **Isolation**: plugins must not crash the core — sandboxes, try/catch on each hook.
- **Dynamic loading**: conditional import so you don't bloat the base bundle.`,
      },
    },
    {
      q: { es: "Microfrontends", en: "Microfrontends" },
      a: {
        es: `Aplica la idea de microservicios al front: divides una SPA grande en **apps independientes** que se integran en tiempo de ejecución, cada una con su propio build, deploy y equipo.

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
- **Performance**: más código, hydration repetida, cargas en cascada.
- **Contratos de integración**: eventos globales, query params, custom events — no hay estado global de verdad.
- **Observabilidad**: tracing entre MFEs, CI/CD propio por MFE.

Decisión senior: se justifican en **organizaciones grandes** (50+ devs, múltiples equipos) con dominios estables — no en startups ni apps medianas. En la mayoría de casos un monolito modular es más rentable.`,
        en: `Applies the microservices idea to the front: you split a large SPA into **independent apps** integrated at runtime, each with its own build, deploy, and team.

\`\`\`
            ┌─────────────────────────────┐
            │  Shell / Container App      │
            ├──────┬──────────┬───────────┤
            │  ←   │  MFE A   │   MFE B   │  ← each: its own build/deploy/route
            │ nav  │ (catalog)│ (checkout)│
            └──────┴──────────┴───────────┘
\`\`\`

Integration strategies:
- **Build-time**: NPM packages that the shell compiles. Simple, but it couples versions — you lose autonomy.
- **Run-time via iframe**: total isolation (DOM, JS, CSS), but routing and communication are cumbersome.
- **Run-time via JS**: the shell loads a remote bundle and mounts it on a node. **Module Federation** (Webpack 5) or \`@module-federation\` makes this native.
- **Server-side composition**: the server assembles HTML from several MFEs (Next.js multi-zone, SSRI).

Senior benefits:
- End-to-end autonomous teams (they deploy their MFE without coordinating with the rest).
- Gradual technology diversity (you can migrate an MFE from Angular to React without touching the others).
- Organizational scaling — each team owns a business vertical.

Costs:
- **Duplicate bundle** (React loaded N times) → shared dependencies with Module Federation.
- **Fragmented UX**: inconsistent design, navigation between MFEs, latency on switch.
- **Performance**: more code, repeated hydration, cascading loads.
- **Integration contracts**: global events, query params, custom events — no real global state.
- **Observability**: tracing across MFEs, per-MFE CI/CD.

Senior decision: they're justified in **large organizations** (50+ devs, multiple teams) with stable domains — not in startups or mid-size apps. In most cases a modular monolith is more profitable.`,
      },
    },
  ],
};