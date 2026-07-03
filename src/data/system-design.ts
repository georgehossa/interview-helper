import type { Topic } from "../types";

export const systemDesign: Topic = {
  key: "sysdesign",
  name: "System Design",
  color: "#a78bfa",
  items: [
    {
      q: {
        es: "¿Cómo abordar una pregunta de system design?",
        en: "How to approach a system design question?",
      },
      a: {
        es: `Pregunta abierta típica de senior. Sigue un marco estructurado para no perderte:

1. **Entender el problema** — aclara requisitos funcionales (qué hace el sistema) y no funcionales (escala, latencia, disponibilidad, consistencia).
2. **Estimar escala** — usuarios, QPS, almacenamiento, ancho de banda (back-of-the-envelope).
3. **APIs y modelo de datos** — define los endpoints y el esquema de datos principal.
4. **Diseño de alto nivel** — dibuja los bloques: clientes, CDN, load balancers, app servers, DB, caché, colas.
5. **Diseño detallado** — profundiza en los cuellos de botella: caché, particionado de DB, replicación, sharding.
6. **Trade-offs** — discute alternatives y justifica cada decisión. No hay respuestas únicas.

Clave senior: comunicas el *porqué* de cada elección, no solo el *qué*.`,
        en: `A typical open-ended senior question. Follow a structured framework to avoid getting lost:

1. **Understand the problem** — clarify functional (what the system does) and non-functional (scale, latency, availability, consistency) requirements.
2. **Estimate scale** — users, QPS, storage, bandwidth (back-of-the-envelope).
3. **APIs and data model** — define the endpoints and the main data schema.
4. **High-level design** — draw the blocks: clients, CDN, load balancers, app servers, DB, cache, queues.
5. **Detailed design** — dive into bottlenecks: caching, DB partitioning, replication, sharding.
6. **Trade-offs** — discuss alternatives and justify each decision. There are no single answers.

Senior key: you communicate the *why* of each choice, not just the *what*.`,
      },
    },
    {
      q: {
        es: "Escalabilidad: escala vertical vs horizontal",
        en: "Scalability: vertical vs horizontal scaling",
      },
      a: {
        es: `Dos formas de crecer ante más carga:
- **Vertical (scale up)**: más CPU/RAM en la misma máquina. Simple, sin cambios de código, pero hay un límite físico y un punto único de fallo.
- **Horizontal (scale out)**: más máquinas (nodos) que comparten el trabajo. Requiere stateless servers, load balancing y datos distribuidos, pero no tiene límite teórico y tolera fallos.

En producción se combina: vertical hasta donde es rentable, horizontal para disponibilidad y crecer sin límite. El estado (sesiones, datos) se externaliza a caché o base — si no, no puedes añadir nodos libremente.`,
        en: `Two ways to grow under more load:
- **Vertical (scale up)**: more CPU/RAM on the same machine. Simple, no code changes, but there's a physical ceiling and a single point of failure.
- **Horizontal (scale out)**: more machines (nodes) sharing the work. Requires stateless servers, load balancing, and distributed data, but has no theoretical limit and tolerates failures.

In production you combine them: vertical up to what's profitable, horizontal for availability and unbounded growth. State (sessions, data) is externalized to cache or a database — otherwise you can't add nodes freely.`,
      },
    },
    {
      q: {
        es: "Load balancing: estrategias y capas",
        en: "Load balancing: strategies and layers",
      },
      a: {
        es: `Un **load balancer** reparte tráfico entre varios servidores para maximizar throughput y tolerancia a fallos. Actúa en distintas capas:
- **L4** (transporte): balancea por IP/puerto, muy rápido, sin inspeccionar contenido (HAProxy, NLB).
- **L7** (aplicación): inspecciona HTTP, puede rutear por path, header o cookie (NGINX, ALB, Envoy).

Estrategias comunes:
- **Round-robin**: turnos, simple.
- **Least-connections**: al nodo con menos carga activa.
- **IP-hash**: mismo cliente → mismo servidor (sesiones pegajosas).
- **Weighted**: nodos más potentes reciben más tráfico.

Seniors añaden: *health checks* para quitar nodos caídos, *session affinity* cuando conviene, y TLS termination en el LB para descargar criptografía de las apps.`,
        en: `A **load balancer** distributes traffic across multiple servers to maximize throughput and fault tolerance. It operates at different layers:
- **L4** (transport): balances by IP/port, very fast, no content inspection (HAProxy, NLB).
- **L7** (application): inspects HTTP, can route by path, header, or cookie (NGINX, ALB, Envoy).

Common strategies:
- **Round-robin**: turns, simple.
- **Least-connections**: to the node with the least active load.
- **IP-hash**: same client → same server (sticky sessions).
- **Weighted**: more powerful nodes get more traffic.

Seniors add: *health checks* to remove down nodes, *session affinity* when appropriate, and TLS termination at the LB to offload crypto from the apps.`,
      },
    },
    {
      q: {
        es: "Caching: estrategias y patrones",
        en: "Caching: strategies and patterns",
      },
      a: {
        es: `La caché guarda resultados frecuentes cerca del consumidor para reducir latencia y carga. Patrones clave:
- **Cache-aside** (lazy): la app lee la caché; si falla, lee la DB y la rellena. Simple, ampliamente usado.
- **Write-through**: toda escritura va a caché y DB a la vez (fuertemente consistente, más lento en escritura).
- **Write-behind** (write-back): escribe en caché y responde ya; la DB se actualiza después (rápido, riesgo de pérdida si cae la caché).
- **Eviction**: LRU (least recently used), LFU, TTL. Elegir según el patrón de acceso.

Capas típicas: **CDN** (contenido estático en el edge), **caché de app** (Redis/Memcached para datos calientes), **caché de DB** (Postgres shared buffers). El reto senior no es poner caché, sino *invalidarla* bien y evitar *thundering herd* (stampede) con locks o *stampede protection*.`,
        en: `The cache stores frequent results close to the consumer to reduce latency and load. Key patterns:
- **Cache-aside** (lazy): the app reads the cache; on miss, it reads the DB and refills it. Simple, widely used.
- **Write-through**: every write goes to cache and DB at once (strongly consistent, slower writes).
- **Write-behind** (write-back): write to cache and respond immediately; the DB is updated later (fast, risk of loss if cache crashes).
- **Eviction**: LRU (least recently used), LFU, TTL. Choose based on the access pattern.

Typical layers: **CDN** (static content at the edge), **app cache** (Redis/Memcached for hot data), **DB cache** (Postgres shared buffers). The senior challenge isn't adding cache — it's *invalidating* it well and avoiding the *thundering herd* (stampede) with locks or *stampede protection*.`,
      },
    },
    {
      q: { es: "CAP theorem", en: "CAP theorem" },
      a: {
        es: `En un sistema distribuido solo puedes garantizar **dos de tres** propiedades:
- **Consistency** (C): todas las lecturas ven la escritura más reciente.
- **Availability** (A): toda petición recibe respuesta (no timeout).
- **Partition tolerance** (P): el sistema sigue funcionando si la red se particiona (caen enlaces entre nodos).

Como las particiones de red *suceden*, en la práctica se elige entre:
- **CP**: prioriza consistencia — bloquea escrituras durante la partición (MongoDB, HBase,consenso tipo Raft).
- **AP**: prioriza disponibilidad — acepta escrituras y se reconcilia después (Cassandra, DynamoDB, *eventual consistency*).

Aclaración senior: el teorema original es un "pick two", pero en realidad siempre se asume P y se decide el balance C/A por operación. **PACELC** lo extiende: en ausencia de partición, se elige entre latencia (L) y consistencia (C).`,
        en: `In a distributed system you can only guarantee **two of three** properties:
- **Consistency** (C): all reads see the latest write.
- **Availability** (A): every request gets a response (no timeout).
- **Partition tolerance** (P): the system keeps working if the network partitions (links between nodes drop).

Since network partitions *do happen*, in practice you choose between:
- **CP**: prioritizes consistency — blocks writes during the partition (MongoDB, HBase, Raft-style consensus).
- **AP**: prioritizes availability — accepts writes and reconciles later (Cassandra, DynamoDB, *eventual consistency*).

Senior clarification: the original theorem is a "pick two", but in reality P is always assumed and you decide the C/A balance per operation. **PACELC** extends it: with no partition, you choose between latency (L) and consistency (C).`,
      },
    },
    {
      q: {
        es: "Partitioning / sharding de bases de datos",
        en: "Database partitioning / sharding",
      },
      a: {
        es: `El **sharding** divide los datos en particiones horizontales distribuidas entre varios nodos para escalar escritura y almacenamiento más allá de una máquina.

Estrategias de **shard key**:
- **Range-based**: por rango (id 1–1000 en nodo A, 1001–2000 en B). Rápido para consultas por rango, pero *hotspots* si la clave crece monótonamente.
- **Hash-based**: hash de la clave → nodo. Distribución uniforme, pero las consultas por rango requieren consultar todos los nodos.
- **Consistent hashing**: minimize reubicación al añadir/quitar nodos (uso de anillos virtuales). Clave en Dynamo, Cassandra.
- **Geo-sharding**: por región (usuarios EU en nodos EU). Mejora latencia, complica la consistencia global.

Retos senior: *resharding* (redistribuir sin downtime), *hot shards* (una partición recibe todo el tráfico), **cross-shard joins** (difíciles — se prefiere desnormalizar), y transacciones distribuidas (2PC, Saga, outbox pattern).`,
        en: `**Sharding** splits data into horizontal partitions distributed across multiple nodes to scale writes and storage beyond one machine.

**Shard key** strategies:
- **Range-based**: by range (ids 1–1000 on node A, 1001–2000 on B). Fast for range queries, but *hotspots* if the key grows monotonically.
- **Hash-based**: hash of the key → node. Uniform distribution, but range queries must hit all nodes.
- **Consistent hashing**: minimizes relocation when adding/removing nodes (virtual rings). Key in Dynamo, Cassandra.
- **Geo-sharding**: by region (EU users on EU nodes). Improves latency, complicates global consistency.

Senior challenges: *resharding* (redistributing without downtime), *hot shards* (one partition takes all the traffic), **cross-shard joins** (hard — denormalize instead), and distributed transactions (2PC, Saga, outbox pattern).`,
      },
    },
    {
      q: {
        es: "Replicación de bases de datos",
        en: "Database replication",
      },
      a: {
        es: `Replicar es copiar datos entre nodos para **disponibilidad**, **lectura escalable** y **latencia** (réplicas cercanas al usuario).

Modelos:
- **Single-leader** (master-slave): toda escritura al líder; réplicas asíncronas o síncronas. Muy usado (Postgres streaming, MySQL). Las réplicas sirven lecturas, pero puede haber **replication lag**.
- **Multi-leader**: varios nodos aceptan escrituras y se replican entre sí. Escritura disponible en cada región, pero requiere **conflict resolution** (LWW, CRDTs, merge manual).
- **Leaderless** (Dynamo-style): cualquier nodo acepta lecturas/escrituras; consenso (Raft/Paxos) o *read repair* + *quorum* (\`W + R > N\`).

Seniors miden trade-offs: replicación síncrona = cero pérdida pero más latencia de escritura; asíncrona = rápida pero riesgo de pérdida al caer el líder. Por eso el líder nuevo se elige con **consenso** y se configura un *failover* automático.`,
        en: `Replicating means copying data across nodes for **availability**, **read scalability**, and **latency** (replicas closer to the user).

Models:
- **Single-leader** (master-slave): all writes go to the leader; replicas are async or sync. Very common (Postgres streaming, MySQL). Replicas serve reads, but **replication lag** can occur.
- **Multi-leader**: several nodes accept writes and replicate to each other. Write available in every region, but requires **conflict resolution** (LWW, CRDTs, manual merge).
- **Leaderless** (Dynamo-style): any node accepts reads/writes; consensus (Raft/Paxos) or *read repair* + *quorum* (\`W + R > N\`).

Seniors weigh trade-offs: synchronous replication = zero loss but higher write latency; async = fast but risk of loss if the leader falls. That's why the new leader is elected via **consensus** and an automatic *failover* is configured.`,
      },
    },
    {
      q: { es: "SQL vs NoSQL: cuándo elegir", en: "SQL vs NoSQL: when to choose" },
      a: {
        es: `No hay uno mejor — depende del caso:

- **SQL** (relacional: Postgres, MySQL): esquema rígido, transacciones ACID, joins, *fácil razonar* sobre la consistencia. Ideal para datos relacionados, finanzas, ERP, el core de la mayoría de sistemas.
- **NoSQL** engloba varias familias:
  - **Documento** (MongoDB, Couchbase): documentos JSON flexibles, buen para agregados que se leen completos.
  - **Clave-valor** (Redis, DynamoDB): latencia minúscula, sesiones, contadores, caché.
  - **Columna ancha** (Cassandra, HBase): escrituras masivas, time-series, escalado lineal con consistencia eventual.
  - **Grafo** (Neo4j): relaciones densas (recomendaciones, fraude).

Pregúntate: ¿necesito transacciones ACID? ¿el esquema cambia mucho? ¿crece de forma predecible? ¿consulto por clave primaria o con joins? Hoy muchos equipos mezclan: **Postgres** para lo relacional + **Redis** para caché + **Cassandra/S3** para series o blobs.`,
        en: `There's no single best — it depends on the case:

- **SQL** (relational: Postgres, MySQL): rigid schema, ACID transactions, joins, *easy to reason* about consistency. Ideal for related data, finance, ERP, the core of most systems.
- **NoSQL** covers several families:
  - **Document** (MongoDB, Couchbase): flexible JSON documents, good for aggregates read in full.
  - **Key-value** (Redis, DynamoDB): minimal latency, sessions, counters, cache.
  - **Wide-column** (Cassandra, HBase): massive writes, time-series, linear scaling with eventual consistency.
  - **Graph** (Neo4j): dense relationships (recommendations, fraud).

Ask yourself: do I need ACID transactions? Does the schema change a lot? Does it grow predictably? Do I query by primary key or with joins? Today many teams mix: **Postgres** for the relational part + **Redis** for cache + **Cassandra/S3** for series or blobs.`,
      },
    },
    {
      q: {
        es: "Microservicios vs monolito",
        en: "Microservices vs monolith",
      },
      a: {
        es: `No es una decisión binaria:
- **Monolito**: una sola deploy unit. Simple de operar, compartir código, y razonar. Hasta cierto tamaño es lo más productivo.
- **Microservicios**: servicios pequeños, independientes, con su propio ciclo de deploy y datos. Ejecutan *bounded contexts* (DDD). Escalado por servicio, equipos autónomos.

Ventajas microservicios: escalado y deploy independientes, aislamiento de fallos, diversidad tecnológica. Costes: latencia de red, complejidad operativa (observabilidad, contratos entre servicios), consistencia eventual distribuida, despliegues y testing más caros.

Senior rule: se empieza con un monolito modular y se extraen servicios solo cuando el dominio y el equipo los justifican. *Big ball of mud* monolítico o *distributed monolith* (microservicios fuertemente acoplados) son ambos antipatrones.`,
        en: `It's not a binary decision:
- **Monolith**: a single deploy unit. Simple to operate, share code, and reason about. Up to a certain size it's the most productive.
- **Microservices**: small, independent services, each with its own deploy cycle and data. They implement *bounded contexts* (DDD). Per-service scaling, autonomous teams.

Microservice advantages: independent scaling and deploy, fault isolation, technology diversity. Costs: network latency, operational complexity (observability, contracts between services), distributed eventual consistency, more expensive deploys and testing.

Senior rule: start with a modular monolith and extract services only when the domain and the team justify them. A *big ball of mud* monolith or a *distributed monolith* (tightly-coupled microservices) are both anti-patterns.`,
      },
    },
    {
      q: {
        es: "Colas de mensajes y event-driven architecture",
        en: "Message queues and event-driven architecture",
      },
      a: {
        es: `Las **colas** (RabbitMQ, SQS) y los **logs** (Kafka, Kinesis, Pulsar) desacoplan productores de consumidores para:
- Asincronizar trabajo pesado (envío de emails, generación de PDF).
- Absorber picos (buffer): el productor ESCRIBE rápido, el consumidores procesa a su ritmo.
- Eventos: emitir algo que pasó y que varios consumidores reaccionen.

Modelos:
- **Point-to-point** (cola): cada mensaje lo procesa un consumidor. RabbitMQ, SQS.
- **Pub/sub** (tópico): todos reciben el mismo evento. Kafka, SNS.
- **Log partitioning**: Kafka — eventos ordenados por partición, retenidos por tiempo. Permite re-leer el historial.

Seniorsostum: idempotencia en los consumidores (los mensajes pueden duplicarse), *at-least-once* vs *at-most-once* vs *exactly-once* (raro y caro), dead-letter queues para fallos, y backpressure para no ahogar a los consumidores.`,
        en: `**Queues** (RabbitMQ, SQS) and **logs** (Kafka, Kinesis, Pulsar) decouple producers from consumers to:
- Async heavy work (sending emails, generating PDFs).
- Absorb spikes (buffer): the producer writes fast, the consumer processes at its own pace.
- Events: emit something that happened and let several consumers react.

Models:
- **Point-to-point** (queue): each message is processed by one consumer. RabbitMQ, SQS.
- **Pub/sub** (topic): all receive the same event. Kafka, SNS.
- **Log partitioning**: Kafka — events ordered per partition, retained by time. You can re-read the history.

Senior note: idempotency in consumers (messages can be duplicated), *at-least-once* vs *at-most-once* vs *exactly-once* (rare and costly), dead-letter queues for failures, and backpressure so you don't overwhelm consumers.`,
      },
    },
    {
      q: { es: "API Gateway y BFF", en: "API Gateway and BFF" },
      a: {
        es: `Un **API Gateway** es la entrada única al backend: autentica, rutea, transforma, aplica rate-limit, cache y monitoriza. Aísla a los clientes del soporte interno de microservices y permite evolucionar el backend sin romper la API pública. Ejemplos: Kong, NGINX, AWS API Gateway, Envoy.

El patrón **BFF** (Backend For Frontend) va más allá: en vez de un gateway genérico, se crea un backend específico por tipo de cliente (web, mobile, partner), cada uno con su lógica de agregación y contrato. Ventajas: el cliente recibe justo lo que necesita (sin over-fetching), los equipos de frontend son autónomos. Coste: más servicios que mantener.

Aclaración: el gateway y el BFF no compiten — suelen combinarse. El gateway centraliza cross-cutting concerns (auth, rate-limit) y el BFF adapta la forma de los datos al cliente concreto.`,
        en: `An **API Gateway** is the single entry to the backend: it authenticates, routes, transforms, applies rate-limit, cache, and monitoring. It isolates clients from the internal microservices support and lets the backend evolve without breaking the public API. Examples: Kong, NGINX, AWS API Gateway, Envoy.

The **BFF** (Backend For Frontend) pattern goes further: instead of a generic gateway, you create a specific backend per type of client (web, mobile, partner), each with its own aggregation logic and contract. Advantages: the client receives exactly what it needs (no over-fetching), frontend teams are autonomous. Cost: more services to maintain.

Note: gateway and BFF don't compete — they're usually combined. The gateway centralizes cross-cutting concerns (auth, rate-limit) and the BFF adapts the data shape to the specific client.`,
      },
    },
    {
      q: {
        es: "Rate limiting y throttling",
        en: "Rate limiting and throttling",
      },
      a: {
        es: `Limitar la tasa de peticiones para proteger el sistema y repartir capacidad justamente. Estrategias:
- **Fixed window**: contamos en ventanas fijas (1 req/s a partir del segundo actual). Simple; permite picos en los bordes.
- **Sliding window**: ventana deslizante que suaviza los picos.
- **Token bucket**: hay tokens que se rellenan a ritmo constante; cada petición consume uno. Permite picos controlados (popular en AWS/GCP).
- **Leaky bucket**: peticiones salen a ritmo constante; suaviza tráfico irregular (bueno para shaping).

Dónde contar: por usuario (API key, IP, sesiones), en el gateway o en la app. Almacenar contadores en **Redis** para compartir entre instancias. Respuestas \`429 Too Many Requests\` con headers \`Retry-After\` y \`X-RateLimit-*\` para que el cliente retroceda. Patrones avanzados: *circuit breaker* ante upstream lento y **backpressure** para no ahogarse.`,
        en: `Limiting the request rate to protect the system and share capacity fairly. Strategies:
- **Fixed window**: count in fixed windows (1 req/s from the current second). Simple; allows spikes at the edges.
- **Sliding window**: a sliding window that smooths out spikes.
- **Token bucket**: tokens refill at a constant rate; each request consumes one. Allows controlled bursts (popular in AWS/GCP).
- **Leaky bucket**: requests leak out at a constant rate; smooths irregular traffic (good for shaping).

Where to count: per user (API key, IP, sessions), at the gateway or in the app. Store counters in **Redis** to share across instances. \`429 Too Many Requests\` responses with \`Retry-After\` and \`X-RateLimit-*\` headers so the client backs off. Advanced patterns: *circuit breaker* against a slow upstream and **backpressure** to avoid drowning.`,
      },
    },
    {
      q: { es: "Idempotencia", en: "Idempotency" },
      a: {
        es: `Una operación es **idempotente** si ejecutarla N veces produce el mismo estado que ejecutarla 1 vez. Crucial en sistemas distribuidos porque las redes reintentan y los mensajes se duplican.

Implementaciones habituales:
- **Claves de idempotencia**: el cliente envía un \`Idempotency-Key\` por petición; el servidor registra el resultado asociado. La segunda vez devuelve el cacheado en vez of reprocesar. Ejemplos: Stripe, APIs POST de pagos.
- **Unique constraints** en DB para detectar duplicados (\`INSERT … ON CONFLICT DO NOTHING\`).
- **Token+TTL** en Redis para marcar "ya procesado".
- Operaciones intrínsecamente idempotentes: \`PUT\` (reescribe el mismo estado), \`DELETE\` (borrar lo borrado no cambia nada).

Seniors: además de \`POST\` de creación (que no es idempotente por diseño), todo lo demás en una API debería diseñarse idempotente: pagos, mensajería, webhooks, jobs. Sin esto, las reintentos duplican cargos y rompen invariantes.`,
        en: `An operation is **idempotent** if executing it N times produces the same state as executing it once. Crucial in distributed systems because networks retry and messages duplicate.

Common implementations:
- **Idempotency keys**: the client sends an \`Idempotency-Key\` per request; the server stores the associated result. The second time it returns the cached one instead of reprocessing. Examples: Stripe, payment POST APIs.
- **Unique constraints** in the DB to detect duplicates (\`INSERT … ON CONFLICT DO NOTHING\`).
- **Token+TTL** in Redis to mark "already processed".
- Intrinsically idempotent operations: \`PUT\` (rewrites the same state), \`DELETE\` (deleting the deleted changes nothing).

Seniors: besides the POST to create (which isn't idempotent by design), everything else in an API should be designed idempotent: payments, messaging, webhooks, jobs. Without this, retries double charges and break invariants.`,
      },
    },
    {
      q: { es: "Circuit breaker", en: "Circuit breaker" },
      a: {
        es: `Patrón de resiliencia que protege a un servicio cuando su dependencia está fallando. Tres estados:
- **Closed**: todo normal — las peticiones pasan.
- **Open**: cuando hay demasiados fallos consecutivos, el circuito se abre y se rechazan peticiones *immediately* (sin esperar el timeout), devolviendo un fallback rápido.
- **Half-open**: tras un tiempo, se deja pasar una petición de prueba; si funciona, vuelve a *closed*, si no, vuelve a *open*.

Por qué importa: sin circuit breaker, una dependencia lenta arrastra a toda la app porque sus hilos se acumulan esperando (**cascading failure**). Con breaker, fallas rápido y te recuperas rápido. Bibliotecas: Resilience4j, Polly, Hystrix (legacy), o middlewares en Istio/Envoy.`,
        en: `A resilience pattern that protects a service when its dependency is failing. Three states:
- **Closed**: all normal — requests go through.
- **Open**: when there are too many consecutive failures, the circuit opens and requests are rejected *immediately* (without waiting for the timeout), returning a fast fallback.
- **Half-open**: after a while, a test request is allowed through; if it works, it goes back to *closed*, otherwise back to *open*.

Why it matters: without a circuit breaker, a slow dependency drags down the whole app because its threads pile up waiting (**cascading failure**). With a breaker, you fail fast and recover fast. Libraries: Resilience4j, Polly, Hystrix (legacy), or middlewares in Istio/Envoy.`,
      },
    },
    {
      q: {
        es: "Observabilidad: logs, métricas y traces",
        en: "Observability: logs, metrics, and traces",
      },
      a: {
        es: `Tres pilares para entender un sistema distribuido en producción:
- **Logs**: eventos discretos. Estructurados en JSON y centralizados (ELK, Loki, Datadog). Útiles para depurar casos puntuales; ruidosos para agregados.
- **Métricas**: series temporales agregadas (CPU, latencia p99, error rate). Consultables y alertables (Prometheus/Grafana, CloudWatch). Detectan tendencias y sirenas.
- **Traces**: un **trace ID** que sigue una petición por todos los servicios (*distributed tracing*, OpenTelemetry, Jaeger). Te dice dónde está el tiempo en cada salto.

Seniorsostum: **RED** (Rate, Errors, Duration) por servicio como base de alertas; **USE** (Utilization, Saturation, Errors) para recursos; **golden signals** de Google SRE. Y atomicidad del **traceId** y **correlationId** propagados por headers de cada servicio, para que un incidente sea reconstruible de punta a punta.`,
        en: `Three pillars to understand a distributed system in production:
- **Logs**: discrete events. Structured as JSON and centralized (ELK, Loki, Datadog). Useful to debug specific cases; noisy for aggregates.
- **Metrics**: aggregated time series (CPU, p99 latency, error rate). Queryable and alertable (Prometheus/Grafana, CloudWatch). They detect trends and trigger alerts.
- **Traces**: a **trace ID** that follows a request across all services (*distributed tracing*, OpenTelemetry, Jaeger). Tells you where the time goes on each hop.

Senior note: **RED** (Rate, Errors, Duration) per service as the alert base; **USE** (Utilization, Saturation, Errors) for resources; Google SRE's **golden signals**. And the **traceId** and **correlationId** propagated via headers in each service, so an incident can be reconstructed end to end.`,
      },
    },
    {
      q: {
        es: "Diseña un URL shortener (tipo bit.ly)",
        en: "Design a URL shortener (bit.ly-style)",
      },
      a: {
        es: `Clásico de entrevista. Marco:
1. **Requisitos**: acortar URLs largas, redirigir al original, alta lectura (10:1 read:write), URLs cortas únicas, expiración opcional.
2. **APIs**: \`POST /shorten {longUrl}\` → \`{shortUrl}\`; \`GET /{code}\` → redirect \`301\` o \`302\` (301 cacheable ahorra hits pero no cuenta clics).
3. **Generar el código**:
   - Opción A: hash (MD5 del longUrl + base62) — predecible, colisiones resueltas con sal.
   - Opción B: **counter global** + base62 — sin colisiones, pero punto de contención (según rango preasignado a nodos).
   - Opción C: **nanoid** aleatorio 7 chars — sin coordinación, colisiones extremadamente raras.
4. **Almacenamiento**: \`shortUrl → longUrl\` en algo rápido con réplica (Postgres o DynamoDB + caché Redis). 7 chars ≈ 62^7 ≈ 3.5B combinaciones.
5. **Cache**: las URLs más accedidas viven en Redis — el 99% de las lecturas no tocan la DB.
6. **Hot URLs**: crawler-friendly, probs en Redis con TTL largo + invalidación por escritura.
7. **Analytics**: clics contados en una cola → agregados a una DB analítica (ClickHouse, BigQuery) separada del hot path.

Trade-off senior: \`301\` mejora la latencia del cliente (lo cachea el browser) pero **no ve los clics**; \`302\` siempre pasa por tu servicio para medir, pero añade un hop. bit.ly usa \`301\` y cuenta en paralelo.`,
        en: `A classic interview question. Framework:
1. **Requirements**: shorten long URLs, redirect to the original, heavy reads (10:1 read:write), unique short URLs, optional expiration.
2. **APIs**: \`POST /shorten {longUrl}\` → \`{shortUrl}\`; \`GET /{code}\` → \`301\` or \`302\` redirect (301 cacheable saves hits but doesn't count clicks).
3. **Generating the code**:
   - Option A: hash (MD5 of longUrl + base62) — predictable, collisions resolved with a salt.
   - Option B: **global counter** + base62 — no collisions, but a contention point (use pre-assigned ranges per node).
   - Option C: random **nanoid** 7 chars — no coordination, collisions extremely rare.
4. **Storage**: \`shortUrl → longUrl\` in something fast with a replica (Postgres or DynamoDB + Redis cache). 7 chars ≈ 62^7 ≈ 3.5B combinations.
5. **Cache**: the most-accessed URLs live in Redis — 99% of reads never touch the DB.
6. **Hot URLs**: crawler-friendly, likely in Redis with a long TTL + invalidation on write.
7. **Analytics**: clicks counted into a queue → aggregated to an analytical DB (ClickHouse, BigQuery) separated from the hot path.

Senior trade-off: \`301\` improves client latency (the browser caches it) but **doesn't see clicks**; \`302\` always goes through your service to measure, but adds a hop. bit.ly uses \`301\` and counts in parallel.`,
      },
    },
    {
      q: {
        es: "Diseña un feed tipo Twitter/Instagram",
        en: "Design a Twitter/Instagram-style feed",
      },
      a: {
        es: `Clásico donde el modelo de datos marca todo. Pregunta clave: **¿cómo construir el feed de cada usuario al abrir la app?**

- **Pull (fan-out on read)**: cuando un usuario abre, consultas los posts recientes de a quién sigue y los ordenas. Simple, pero caro si el usuario sigue a muchos.
- **Push (fan-out on write)**: cuando un usuario postea, escribes una copia en el feed precalculado de cada seguidor (Redis sorted set con timestamp). Lee O(1) al abrir. Peso: los usuarios con millones de seguidores (celebridades) copian millones de veces.
- **Híbrido**: push para usuarios normales, pull para celebridades.

Otros puntos:
- **Modelo**: \`tweets\` (id, user, content, ts) + \`follows\` (follower, followee) + \`feeds\` (user_id → [tweet_ids]) en Redis.
- **Cache**: el feed vive en Redis, persistido eventualmente a DB.
- **Sharding**: por \`user_id\` para que escribir/leer feed sea local a un shard.
- **Orden**: cronológico inverso, o ranking con algoritmo de relevancia.
- **Media**: S3/CDN para imágenes y videos; los textos viven en el feed.

Senior takeaway: el truco está en *precomputarizar* los feeds comunes y decidir qué casos de celebridades rompen el modelo push.`,
        en: `A classic where the data model drives everything. Key question: **how do you build each user's feed when they open the app?**

- **Pull (fan-out on read)**: when a user opens, you query the recent posts of who they follow and sort them. Simple, but expensive if the user follows many.
- **Push (fan-out on write)**: when a user posts, you write a copy to each follower's precomputed feed (Redis sorted set with timestamp). O(1) read on open. Cost: users with millions of followers (celebrities) get copied millions of times.
- **Hybrid**: push for normal users, pull for celebrities.

Other points:
- **Model**: \`tweets\` (id, user, content, ts) + \`follows\` (follower, followee) + \`feeds\` (user_id → [tweet_ids]) in Redis.
- **Cache**: the feed lives in Redis, eventually persisted to a DB.
- **Sharding**: by \`user_id\` so that feed reads/writes are local to a shard.
- **Order**: reverse chronological, or ranking with a relevance algorithm.
- **Media**: S3/CDN for images and videos; the text lives in the feed.

Senior takeaway: the trick is to *precompute* popular feeds and decide which celebrity cases break the push model.`,
      },
    },
    {
      q: {
        es: "Diseña un sistema de notificaciones push multicanal",
        en: "Design a multi-channel push notification system",
      },
      a: {
        es: `Canales: push (iOS APNs, Android FCM), email, SMS, in-app. Pasos:

1. **Servicio de notificaciones**: recibe eventos ("pedido_enviado", "mensaje nuevo") y los transforma en notificaciones por canal preferido del usuario.
2. **Preferencias**: tabla \`user\` con preferencias por canal y por tipo de evento. Respeta silencio nocturno y zona horaria.
3. **Plantillas**: guardadas en DB o código; renderizadas con datos del evento.
4. **Despacho**: encolar a un **worker queue** (Redis + BullMQ, SQS) por canal. Workers llaman a las APIs externas (APNs, SendGrid, Twilio). Idempotencia por \`notification_id\` para no enviar duplicados al reintentar.
5. **Rate-limit** por usuario y por proveedor (APNs/iOS estrictos; SendGrid permite 100M/mes).
6. **Status + retries**: \`pending → sent → delivered/failed\`, dead-letter para fallos persistentes. Backoff exponencial.
7. **Multidevice**: un usuario puede tener varios dispositivos; envía una notificación a cada uno.
8. **In-app**: almacenadas en DB, leídas al abrir la app o vía WebSocket para tiempo real.

Senior: el patrón es **fan-out por evento**, con dispatcher asincronizado y proveedores del mundo real externos que pueden fallar — por eso rate limit + retry + alertas de fallo de proveedor.`,
        en: `Channels: push (iOS APNs, Android FCM), email, SMS, in-app. Steps:

1. **Notification service**: receives events ("order_shipped", "new message") and turns them into notifications on the user's preferred channel.
2. **Preferences**: a \`user\` table with per-channel and per-event preferences. Respect quiet hours and time zone.
3. **Templates**: stored in a DB or code; rendered with event data.
4. **Dispatch**: enqueue to a **worker queue** (Redis + BullMQ, SQS) per channel. Workers call external APIs (APNs, SendGrid, Twilio). Idempotency via \`notification_id\` so retries don't send duplicates.
5. **Rate-limit** per user and per provider (APNs/iOS strict; SendGrid allows 100M/month).
6. **Status + retries**: \`pending → sent → delivered/failed\`, dead-letter for persistent failures. Exponential backoff.
7. **Multi-device**: a user may have several devices; send a notification to each.
8. **In-app**: stored in a DB, read on app open or via WebSocket for real-time.

Senior: the pattern is **fan-out per event**, with an async dispatcher and real-world external providers that can fail — hence rate limit + retry + provider-failure alerts.`,
      },
    },
    {
      q: {
        es: "Consistency models en sistemas distribuidos",
        en: "Consistency models in distributed systems",
      },
      a: {
        es: `Qué tan fresca es la lectura en un sistema replicado:
- **Strong / linearizable**: la lectura siempre ve la última escritura confirmada. Caro: requiere coord. síncrona entre réplicas (Raft, 2PC).
- **Sequential**: las operaciones de un cliente se ven en orden; las de otros pueden verse arbitrariamente, pero todos los nodos coinciden.
- **Eventual**: sin nuevas escrituras, las réplicas terminan convergiendo. Barato, lo más común en AP (Dynamo, Cassandra).
- **Causal**: respeta relaciones causa-efecto (si A causó B, A se ve antes que B), sin exigir orden total.
- **Read-your-writes**: el propio autor ve siempre su escritura (con *sticky session* o *session variable*).
- **Monotonic reads**: una vez viste un dato más fresco, no lo ves más viejo en lecturas siguientes.

Seniorsostum: la mayoría de APIs públicas ofrecen eventual consistency y los equipos añaden reglas de negocio (read-your-writes al menos para el autor). Receta clásica: leer de la réplica *solo si es reciente* (\`max_replication_lag\`), si no, leer del líder.`,
        en: `How fresh a read is in a replicated system:
- **Strong / linearizable**: the read always sees the latest confirmed write. Expensive: requires synchronous coordination between replicas (Raft, 2PC).
- **Sequential**: a client's operations are seen in order; others may be seen arbitrarily, but all nodes agree.
- **Eventual**: with no new writes, replicas eventually converge. Cheap, the most common in AP (Dynamo, Cassandra).
- **Causal**: respects cause-effect (if A caused B, A is seen before B), without requiring total order.
- **Read-your-writes**: the author always sees their own write (with *sticky session* or *session variable*).
- **Monotonic reads**: once you've seen a fresher value, you won't see a staler one on subsequent reads.

Senior note: most public APIs offer eventual consistency and teams add business rules (read-your-writes at least for the author). Classic recipe: read from the replica *only if it's recent* (\`max_replication_lag\`), otherwise read from the leader.`,
      },
    },
    {
      q: {
        es: "Cómo diseñar una API rate-limited y escalable",
        en: "How to design a rate-limited, scalable API",
      },
      a: {
        es: `Combina ideas sueltas:
- Punto de aplicación: en el **API Gateway**, no en las apps — una sola política entre múltiples servicios.
- Contador compartido en **Redis** (INCR + EXPIRE), con un token-bucket por \`user_id\` (o \$apiKey o IP).
- Ventana sliding log para mejor distribución: \`ZADD ratelimit:{userId} {now} {reqId}\` y \`ZREMRANGEBYSCORE … {now-window}\`.
- En cada request lees el contador; si > límite → \`429\` con \`Retry-After\`.
- **Alta escala** (millones de keys): particiona Redis por hash del key, replica reads geo, y soporta pérdida puntual (los rate limits son heurísticos, no transaccionales).

Senior: rate-limit diferente por **tipo de cliente** (free tier 10 req/min, paid 1000), por endpoint (\`/login\` más estricto), con alertas internas al acercarse al límite.`,
        en: `Combines loose ideas:
- Where to apply: at the **API Gateway**, not in the apps — one policy across multiple services.
- A shared counter in **Redis** (INCR + EXPIRE), with a token bucket per \`user_id\` (or \$apiKey or IP).
- A sliding-log window for better distribution: \`ZADD ratelimit:{userId} {now} {reqId}\` and \`ZREMRANGEBYSCORE … {now-window}\`.
- On each request, read the counter; if > limit → \`429\` with \`Retry-After\`.
- **High scale** (millions of keys): partition Redis by key hash, geo-replicate reads, and tolerate occasional loss (rate limits are heuristic, not transactional).

Senior: rate-limit differently per **client tier** (free 10 req/min, paid 1000), per endpoint (\`/login\` stricter), with internal alerts as you approach the limit.`,
      },
    },
    {
      q: { es: "Patrones de resiliencia", en: "Resilience patterns" },
      a: {
        es: `Construir para que el sistema no se caiga cuando sus partes fallan:
- **Timeout**: nunca esperes indefinidamente — define y respeta timeouts por capa.
- **Retry con backoff exponencial y jitter**: reintenta, pero con demora creciente y aleatoria para evitar sincronización.
- **Circuit breaker**: falla rápido cuando un deps está en problemas.
- **Bulkhead**: aísla pools de recursos por dependencia, para que una lenta no consuma las conexiones de todas.
- **Fallback**: respuesta degradada en vez de error 500 (cache stale, valor por defecto, "datos no disponibles, reintente").
- **Idempotency** en retries para no duplicar side effects.
- **Rate-limit** en el cliente para no colapsar al servidor.

Principio senior: en una cadena de servicios, cada uno debe tener su **propio timeout**; si el más interno tarda 2s, el externo también limita. La **cascada de fallos** se evita fallando rápido, no acumulando esperando.`,
        en: `Build so the system doesn't go down when its parts fail:
- **Timeout**: never wait indefinitely — define and respect timeouts per layer.
- **Retry with exponential backoff and jitter**: retry, but with growing, randomized delay to avoid synchronization.
- **Circuit breaker**: fail fast when a dependency is in trouble.
- **Bulkhead**: isolate resource pools per dependency, so a slow one doesn't consume everyone's connections.
- **Fallback**: a degraded response instead of a 500 (stale cache, default value, "data unavailable, retry").
- **Idempotency** on retries so you don't duplicate side effects.
- **Rate-limit** on the client so you don't crush the server.

Senior principle: in a chain of services, each should have its **own timeout**; if the innermost takes 2s, the outer one limits too. The **cascade of failures** is avoided by failing fast, not by accumulating waits.`,
      },
    },
  ],
};