import type { Topic } from "../types";

export const systemDesign: Topic = {
  key: "sysdesign",
  name: "System Design",
  color: "#a78bfa",
  items: [
    {
      q: "¿Cómo abordar una pregunta de system design?",
      a: `Pregunta abierta típica de senior. Sigue un marco estructurado para no perderte:

1. **Entender el problema** — aclara requisitos funcionales (qué hace el sistema) y no funcionales (escala, latencia, disponibilidad, consistencia).
2. **Estimar escala** — usuarios, QPS, almacenamiento, ancho de banda (back-of-the-envelope).
3. **APIs y modelo de datos** — define los endpoints y el esquema de datos principal.
4. **Diseño de alto nivel** — dibuja los bloques: clientes, CDN, load balancers, app servers, DB, caché, colas.
5. **Diseño detallado** — profundiza en los cuellos de botella: caché, particionado de DB, replicación, sharding.
6. **Trade-offs** — discute alternatives y justifica cada decisión. No hay respuestas únicas.

Clave senior: comunicas el *porqué* de cada elección, no solo el *qué*.`,
    },
    {
      q: "Escalabilidad: escala vertical vs horizontal",
      a: `Dos formas de crecer ante más carga:
- **Vertical (scale up)**: más CPU/RAM en la misma máquina. Simple, sin cambios de código, pero hay un límite físico y un punto único de fallo.
- **Horizontal (scale out)**: más máquinas (nodos) que comparten el trabajo. Requiere stateless servers, load balancing y datos distribuidos, pero no tiene límite teórico y tolera fallos.

En producción se combina: vertical hasta donde es rentable, horizontal para disponibilidad y crecer sin límite. El estado (sesiones, datos) se externaliza a caché o base — si no, no puedes añadir nodos libremente.`,
    },
    {
      q: "Load balancing: estrategias y capas",
      a: `Un **load balancer** reparte tráfico entre varios servidores para maximizar throughput y tolerancia a fallos. Actúa en distintas capas:
- **L4** (transporte): balancea por IP/puerto, muy rápido, sin inspeccionar contenido (HAProxy, NLB).
- **L7** (aplicación): inspecciona HTTP, puede rutear por path, header o cookie (NGINX, ALB, Envoy).

Estrategias comunes:
- **Round-robin**: turnos, simple.
- **Least-connections**: al nodo con menos carga activa.
- **IP-hash**: mismo cliente → mismo servidor (sesiones pegajosas).
- **Weighted**: nodos más potentes reciben más tráfico.

Seniors añaden: *health checks* para quitar nodos caídos, *session affinity* cuando conviene, y TLS termination en el LB para descargar criptografía de las apps.`,
    },
    {
      q: "Caching: estrategias y patrones",
      a: `La caché guarda resultados frecuentes cerca del consumidor para reducir latencia y carga. Patrones clave:
- **Cache-aside** (lazy): la app lee la caché; si falla, lee la DB y la rellena. Simple, ampliamente usado.
- **Write-through**: toda escritura va a caché y DB a la vez (fuertemente consistente, más lento en escritura).
- **Write-behind** (write-back): escribe en caché y responde ya; la DB se actualiza después (rápido, riesgo de pérdida si cae la caché).
- **Eviction**: LRU (least recently used), LFU, TTL. Elegir según el patrón de acceso.

Capas típicas: **CDN** (contenido estático en el edge), **caché de app** (Redis/Memcached para datos calientes), **caché de DB** (Postgres shared buffers). El reto senior no es poner caché, sino *invalidarla* bien y evitar *thundering herd* (stampede) con locks o *stampede protection*.`,
    },
    {
      q: "CAP theorem",
      a: `En un sistema distribuido solo puedes garantizar **dos de tres** propiedades:
- **Consistency** (C): todas las lecturas ven la escritura más reciente.
- **Availability** (A): toda petición recibe respuesta (no timeout).
- **Partition tolerance** (P): el sistema sigue funcionando si la red se particiona (caen enlaces entre nodos).

Como las particiones de red *suceden*, en la práctica se elige entre:
- **CP**: prioriza consistencia — bloquea escrituras durante la partición (MongoDB, HBase,consenso tipo Raft).
- **AP**: prioriza disponibilidad — acepta escrituras y se reconcilia después (Cassandra, DynamoDB, *eventual consistency*).

Aclaración senior: el teorema original es un "pick two", pero en realidad siempre se asume P y se decide el balance C/A por operación. **PACELC** lo extiende: en ausencia de partición, se elige entre latencia (L) y consistencia (C).`,
    },
    {
      q: "Partitioning / sharding de bases de datos",
      a: `El **sharding** divide los datos en particiones horizontales distribuidas entre varios nodos para escalar escritura y almacenamiento más allá de una máquina.

Estrategias de **shard key**:
- **Range-based**: por rango (id 1–1000 en nodo A, 1001–2000 en B). Rápido para consultas por rango, pero *hotspots* si la clave crece monótonamente.
- **Hash-based**: hash de la clave → nodo. Distribución uniforme, pero las consultas por rango requieren consultar todos los nodos.
- **Consistent hashing**: minimize reubicación al añadir/quitar nodos (uso de anillos virtuales). Clave en Dynamo, Cassandra.
- **Geo-sharding**: por región (usuarios EU en nodos EU). Mejora latencia, complica la consistencia global.

Retos senior: *resharding* (redistribuir sin downtime), *hot shards* (una partición recibe todo el tráfico), **cross-shard joins** (difíciles — se prefiere desnormalizar), y transacciones distribuidas (2PC, Saga, outbox pattern).`,
    },
    {
      q: "Replicación de bases de datos",
      a: `Replicar es copiar datos entre nodos para **disponibilidad**, **lectura escalable** y **latencia** (réplicas cercanas al usuario).

Modelos:
- **Single-leader** (master-slave): toda escritura al líder; réplicas asíncronas o síncronas. Muy usado (Postgres streaming, MySQL). Las réplicas sirven lecturas, pero puede haber **replication lag**.
- **Multi-leader**: varios nodos aceptan escrituras y se replican entre sí. Escritura disponible en cada región, pero requiere **conflict resolution** (LWW, CRDTs, merge manual).
- **Leaderless** (Dynamo-style): cualquier nodo acepta lecturas/escrituras;共识 (Raft/Paxos) o *read repair* + *quorum* (\`W + R > N\`).

Seniors miden trade-offs: replicación síncrona = cero pérdida pero más latencia de escritura; asíncrona = rápida pero riesgo de pérdida al caer el líder. Por eso el líder nuevo se elige con **consenso** y se configura un *failover* automático.`,
    },
    {
      q: "SQL vs NoSQL: cuándo elegir",
      a: `No hay uno mejor — depende del caso:

- **SQL** (relacional: Postgres, MySQL): esquema rígido, transacciones ACID, joins, *fácil razonar* sobre la consistencia. Ideal para datos relacionados, finanzas, ERP, el core de la mayoría de sistemas.
- **NoSQL** engloba varias familias:
  - **Documento** (MongoDB, Couchbase): documentos JSON flexibles, buen para agregados que se leen completos.
  - **Clave-valor** (Redis, DynamoDB): latencia minúscula, sesiones, contadores, caché.
  - **Columna ancha** (Cassandra, HBase): escrituras masivas, time-series, escalado lineal con consistencia eventual.
  - **Grafo** (Neo4j): relaciones densas (recomendaciones, fraude).

Pregúntate: ¿necesito transacciones ACID? ¿el esquema cambia mucho? ¿crece de forma predecible? ¿consulto por clave primaria o con joins? Hoy muchos equipos mezclan: **Postgres** para lo relacional + **Redis** para caché + **Cassandra/S3** para series o blobs.`,
    },
    {
      q: "Microservicios vs monolito",
      a: `No es una decisión binaria:
- **Monolito**: una sola deploy unit. Simple de operar, compartir código, y razonar. Hasta cierto tamaño es lo más productivo.
- **Microservicios**: servicios pequeños, independientes, con su propio ciclo de deploy y datos. Ejecutan *bounded contexts* (DDD). Escalado por servicio, equipos autónomos.

Ventajas microservicios: escalado y deploy independientes, aislamiento de fallos, diversidad tecnológica. Costes: latencia de red, complejidad operativa (observabilidad, contratos entre servicios), consistencia eventual distribuida, despliegues y testing más caros.

Senior rule: se empieza con un monolito modular y se extraen servicios solo cuando el dominio y el equipo los justifican. *Big ball of mud* monolítico o *distributed monolith* (microservicios fuertemente acoplados) son ambos antipatrones.`,
    },
    {
      q: "Colas de mensajes y event-driven architecture",
      a: `Las **colas** (RabbitMQ, SQS) y los **logs** (Kafka, Kinesis, Pulsar) desacoplan productores de consumidores para:
- Asincronizar trabajo pesado (envío de emails, generación de PDF).
- Absorber picos (buffer): el productor ESCRIBE rápido, el consumidores procesa a su ritmo.
- Eventos: emitir algo que pasó y que varios consumidores reaccionen.

Modelos:
- **Point-to-point** (cola): cada mensaje lo procesa un consumidor. RabbitMQ, SQS.
- **Pub/sub** (tópico): todos reciben el mismo evento. Kafka, SNS.
- **Log partitioning**: Kafka — eventos ordenados por partición, retenidos por tiempo. Permite re-leer el historial.

Seniorsostum: idempotencia en los consumidores (los mensajes pueden duplicarse), *at-least-once* vs *at-most-once* vs *exactly-once* (raro y caro), dead-letter queues para fallos, y backpressure para no ahogar a los consumidores.`,
    },
    {
      q: "API Gateway y BFF",
      a: `Un **API Gateway** es la entrada única al backend: autentica, rutea, transforma, aplica rate-limit, cache y monitoriza. Aísla a los clientes del soporte interno de microservices y permite evolucionar el backend sin romper la API pública. Ejemplos: Kong, NGINX, AWS API Gateway, Envoy.

El patrón **BFF** (Backend For Frontend) va más allá: en vez de un gateway genérico, se crea un backend específico por tipo de cliente (web, mobile, partner), cada uno con su lógica de agregación y contrato. Ventajas: el cliente recibe justo lo que necesita (sin over-fetching), los equipos de frontend son autónomos. Coste: más servicios que mantener.

Aclaración: el gateway y el BFF no compiten — suelen combinarse. El gateway centraliza cross-cutting concerns (auth, rate-limit) y el BFF adapta la forma de los datos al cliente concreto.`,
    },
    {
      q: "Rate limiting y throttling",
      a: `Limitar la tasa de peticiones para proteger el sistema y repartir capacidad justamente. Estrategias:
- **Fixed window**: contamos en ventanas fijas (1 req/s a partir del segundo actual). Simple; permite picos en los bordes.
- **Sliding window**: ventana deslizante que suaviza los picos.
- **Token bucket**: hay tokens que se rellenan a ritmo constante; cada petición consume uno. Permite picos controlados (popular en AWS/GCP).
- **Leaky bucket**: peticiones salen a ritmo constante; suaviza tráfico irregular ( NearlyDetails bueno para shaping).

Dónde contar: por usuario (API key, IP, sesiones), en el gateway o en la app. Almacenar contadores en **Redis** (ño counter) para compartir entre instancias. Respuestas \`429 Too Many Requests\` con headers \`Retry-After\` y \`X-RateLimit-*\` para que el cliente retroceda. Patrones avanzados: *circuit breaker* ante upstream lento y **backpressure**para no ahogarse.`,
    },
    {
      q: "Idempotencia",
      a: `Una operación es **idempotente** si ejecutarla N veces produce el mismo estado que ejecutarla 1 vez. Crucial en sistemas distribuidos porque las redes reintentan y los mensajes se duplican.

Implementaciones habituales:
- **Claves de idempotencia**: el cliente envía un \`Idempotency-Key\` por petición; el servidor registra el resultado asociado. La segunda vez devuelve el cacheado en vez de reprocesar. Ejemplos: Stripe, APIs POST de pagos.
- **Unique constraints** en DB para detectar duplicados (\`INSERT … ON CONFLICT DO NOTHING\`).
- **Token+TTL** en Redis para marcar "ya procesado".
- Operaciones intrínsecamente idempotentes: \`PUT\` (reescribe el mismo estado), \`DELETE\` (borrar lo borrado no cambia nada).

Seniors Além de \`POST\` de creación ( que no es idempotente por diseño), todo lo demás en una API debería diseñarse idempotente: pagos, mensajería, webhooks, jobs. Sin esto, las reintencias duplican cargos y rompen invariantes.`,
    },
    {
      q: "Circuit breaker",
      a: `Patrón de resiliencia que protege a un servicio cuando su dependencia está fallando. Tres estados:
- **Closed**: todo normal — las peticiones pasan.
- **Open**: cuando hay demasiados fallos consecutivos, el circuito se abre y se rechazan peticiones *immediately* (sin esperar el timeout), devolviendo un fallback rápido.
- **Half-open**: tras un tiempo, se deja pasar una petición de prueba; si funciona, vuelve a *closed*, si no, vuelve a *open*.

Por qué importa: sin circuit breaker, una dependencia lenta arrastra a toda la app porque sus hilos se acumulan esperando (**cascading failure**). Con breaker, fallas rápido y te recuperas rápido. Bibliotecas: Resilience4j, Polly, Hystrix (legacy), o middlewares en Istio/Envoy.`,
    },
    {
      q: "Observabilidad: logs, métricas y traces",
      a: `Tres pilares para entender un sistema distribuido en producción:
- **Logs**: eventos discretos. Estructurados en JSON y centralizados (ELK, Loki, Datadog). Útiles para depurar casos puntuales; ruidosos para agregados.
- **Métricas**: series temporales agregadas (CPU, latencia p99, error rate). Consultables y alertables (Prometheus/Grafana, CloudWatch). Detectan tendencias y sirenas.
- **Traces**: un **trace ID** que sigue una petición por todos los servicios (*distributed tracing*, OpenTelemetry, Jaeger). Te dice dónde está el tiempo en cada salto.

Seniorsostum: **RED** (Rate, Errors, Duration) por servicio como base de alertas; **USE** (Utilization, Saturation, Errors) para recursos; **golden signals** de Google SRE. Y atomicidad del **traceId** y **correlationId** propagados por headers de cada servicio, para que un incidente sea reconstruible de punta a punta.`,
    },
    {
      q: "Diseña un URL shortener (tipo bit.ly)",
      a: `Clásico de entrevista. Marco:
1. **Requisitos**: acortar URLs largas, redirigir aloriginal, alta lectura (10:1 read:write), URLs cortas únicas, expiración opcional.
2. **APIs**: \`POST /shorten {longUrl}\` → \`{shortUrl}\`; \`GET /{code}\` → redirect \`301\` o \`302\` (301 cacheable ahorra hits pero no cuenta clics).
3. **Generar el código**: \
   - Opción A: hash (MD5 del longUrl + base62) — predecible, colisiones resueltas con sal.
   - Opción B: **counter global** + base62 — sin colisiones, pero punto de contención (según rango preasignado a nodos).
   - Opción C: **nanoid** aleatorio 7 chars — sin coordinación, colisiones extremadamente raras.
4. **Almacenamiento**: \`shortUrl → longUrl\` en algo Rápido con réplica (Postgres o DynamoDB + caché Redis). 7 chars ≈ 62^7 ≈ 3.5B combinaciones.
5. **Cache**: las URLs más accedidas viven en Redis — el 99% de las lecturas no tocan la DB.
6. **Hot URLs**: crawler-friendly, probs at Redis con TTL largo + invalidation por escritura.
7. **Analytics**: clics contados en una cola → agregados a una DB analítica (ClickHouse, BigQuery) separada del hot path.

Trade-off senior: \`301\` mejora el latency del cliente (cachea elbrowser) pero **no ve los clics**; \`302\` siempre pasa por tu servicio para medir, pero añade un hop. bit.ly usa \`301\` y cuenta en paralelo.`,
    },
    {
      q: "Diseña un feed tipo Twitter/Instagram",
      a: `Clásico donde el modelo de datos marca todo. Pregunta clave: **¿cómo construir el feed de cada usuario al abrir la app?**

- **Pull (fan-out on read)**: cuando un usuario abre, consultas los posts recientes de a quién sigue y los ordenas. Simple, pero caro si el usuario sigue a muchos.
- **Push (fan-out on write)**: cuando un usuario postea, escribes una copia en el feed precalculado de cada seguidor (Redis sorted set con timestamp). Lee O(1) al abrir. Pesi: los usuarios con millones de seguidores (celebridades) copian millones de veces.
- **Híbrido**: push para usuarios normales, pull para celebridades.

Otros puntos:
- **Modelo**: \`tweets\` (id, user, content, ts) + \`follows\` (follower, followee) + \`feeds\` (user_id → [tweet_ids]) en Redis.
- **Cache**: el feed vive en Redis, persistido eventualmente a DB.
- **Sharding**: por \`user_id\` para que escribir/leer feed sea local a un shard.
- **Orden**: cronológico inverso, o ranking con algoritmo de relevancia.
- **Media**: S3/CDN para imágenes y videos; los textos viven en el feed.

Senior takeaway: el truco está en * заранее computarizar* los feeds comunes y decidir qué casos celebridades rompen el modelo push.`,
    },
    {
      q: "Diseña un sistema de notificaciones push multicanal",
      a: `Canales: push (iOS APNs, Android FCM), email, SMS, in-app. Pasos:

1. **Servicio de notificaciones**: recibe eventos ("_pedido_enviado", "mensaje nuevo") y los transforma en notificaciones por canal preferido del usuario.
2. **Preferencias**: tabla \`user\` con preferencias por canal y sweaty tipos de evento. Respeta silencio nocturno y zona horaria.
3. **Plantillas**: guardadas en DB o código; renderizadas con datos del evento.
4. **Despacho**: encolar a un **worker queue** (Redis + BullMQ, SQS) por canal. Workers llaman a las APIs externas (APNs, SendGrid, Twilio). \
   Idempotencia por \`notification_id\` para no enviar duplicados al reintentar.
5. **Rate-limit** por usuario y por proveedor (APNs/LiOS estrictos; SendGrid permite 100M/mes).
6. **Status + retries**:\
   \`pending → sent → delivered/failed\`, dead-letter para fallos persistentes. Exponential backoff.
7. **Multidevice**: un usuario puede tener varios dispositivos; RR una notificación a cada uno.
8. **In-app**: almacenadas en DB, leídas al abrir la app o vía WebSocket para tiempo real.

Senior: el patrón es **fan-out por evento**, con dispatcher asincronizado y proveedores del mundo real externos que pueden fallar — por eso rate limit + retry + alertas de fallo de proveedor.`,
    },
    {
      q: "Consistency models en sistemas distribuidos",
      a: `Qué tan fresca es la lectura en un sistema replicado:
- **Strong / linearizable**: la lectura siempre ve la última escritura confirmada. Caro: requiere coord. síncrona entre réplicas (Raft, 2PC).
- **Sequential**: las operaciones de un cliente se ven en orden; las de otros pueden verse arbitrariamente, pero todos los nodos coinciden.
- **Eventual**: sin nuevas escrituras, las réplicas terminan convergiendo. Barato, lo más común en AP (Dynamo, Cassandra).
- **Causal**: respeta relaciones causa-efecto (si A causó B, A se ve antes que B), sin exigir orden total.
- **Read-your-writes**: el propio autor ve siempre su escritura (con *sticky session* o *session variable*).
- **Monotonic reads**: una vez viste un dato más fresco, no lo ves más viejo en lecturas siguientes.

Seniorsostum: la mayoría de APIs públicas ofrecen eventual consistency y los equipos añaden reglas de negocio (read-your-writes al menos para el autor). Receta clásica: leer de la réplica *solo si es reciente* (\`max_replication_lag\`), si no, leer del líder.`,
    },
    {
      q: "Cómo diseñar una API rate-limited y escalable",
      a: `Combina ideas sueltas:
- Punto de aplicación: en el **API Gateway**, no en las apps — una sola política entre múltiples serviços.
- Contador compartido en **Redis** (INCR + EXPIRE), con un token-bucket por \`user_id\` (o \$apiKey o IP).
- Ventana sliding log para mejor distribución: \`ZADD ratelimit:{userId} {now} {reqId}\` y \`ZREMRANGEBYSCORE … {now-window}\`.
- En cada request lees el contador; si > límite → \`429\` con \`Retry-After\`.
- **Alta escala** (millones de keys): particionarlas Redis por hash del key, replicar readsgeo, y soportar pérdida puntual (los rate limits son heurísticos, no transaccionales).

Senior: rate-limit diferente por **tipo de cliente** (free tier 10 req/min, paid 1000), por endpoint (\`/login\` más estricto), con pcaiedde alertas internas al acercarse al limite.`,
    },
    {
      q: "Patrones de resiliencia",
      a: `Construir para que el sistema no se caiga cuando sus partes fallan:
- **Timeout**: nunca esperes indefinidamente — define y respeta timeouts por capa.
- **Retry con backoff exponencial y jitter**: reintenta, pero con demora creciente y aleatoria para evitar sincronización.
- **Circuit breaker**: falla rápido cuando un deps está en problemas.
- **Bulkhead**: aísla pools de recursos por dependencia, para que una lenta no consuma las conexiones de todas.
- **Fallback**: respuesta degradeida en vez de error 500 (cache stale, valor por defecto, "datos no disponibles, reintente").
- **Idempotency** en retries para no duplicar side effects.
- **Rate-limit** en el cliente para no colapsar al servidor.

Principio senior: en una cadena de servicios, cada uno debe sus **propio timeout**; si el más interno tarda 2s, el externo tambien limita. La **cascada de fallos** se evita fallando rápido, no acumulando esperando.`,
    },
  ],
};