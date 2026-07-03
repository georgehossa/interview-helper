import type { Topic } from "../types";

export const designPatterns: Topic = {
  key: "patterns",
  name: "Design Patterns",
  color: "#34d399",
  items: [
    {
      q: {
        es: "¿Qué son los patrones de diseño?",
        en: "What are design patterns?",
      },
      a: {
        es: `Un **patrón de diseño** es una solución probada y reutilizable a un problema recurrente de diseño de software. No es código — es una plantilla conceptual que se adapta al contexto.

Se agrupan en tres familias (GoF, 1994):
- **Creacionales**: cómo se construyen objetos (Singleton, Factory, Builder, Prototype, Abstract Factory).
- **Estructurales**: cómo se componen objetos en estructuras mayores (Adapter, Decorator, Facade, Composite, Proxy).
- **De comportamiento**: cómo se comunican y reparten responsabilidades (Observer, Strategy, Command, State, Template Method, Iterator, Chain of Responsibility).

Clave senior: **no forzar patrones**. Son vocabulario para discutir soluciones; se aplican cuando el problema lo pide, no por moda. Sobreusarlos produce código acoplado y verboso.`,
        en: `A **design pattern** is a proven, reusable solution to a recurring software design problem. It's not code — it's a conceptual template you adapt to the context.

They're grouped into three families (GoF, 1994):
- **Creational**: how objects are constructed (Singleton, Factory, Builder, Prototype, Abstract Factory).
- **Structural**: how objects are composed into larger structures (Adapter, Decorator, Facade, Composite, Proxy).
- **Behavioral**: how they communicate and split responsibilities (Observer, Strategy, Command, State, Template Method, Iterator, Chain of Responsibility).

Senior key: **don't force patterns**. They're vocabulary to discuss solutions; apply them when the problem calls for it, not out of fashion. Overusing them produces coupled, verbose code.`,
      },
    },
    {
      q: { es: "Singleton", en: "Singleton" },
      a: {
        es: `Garantiza que una clase tenga **una sola instancia** y provee un punto de acceso global a ella. Útil para cosas como configuración, logging, pool de conexiones.

\`\`\`ts
class Config {
  private static instance: Config;
  private constructor() {} // no new desde fuera
  static getInstance() {
    if (!Config.instance) Config.instance = new Config();
    return Config.instance;
  }
}
\`\`\`

Crítica senior: introduce estado global — difícil testear, acopla todo a la misma instancia, esconde dependencias. En tests paralelos se contamina el estado. Alternativas mejores: **inyección de dependencias** o un módulo con estado cerrado. Si lo usas, que sea para algo que es realmente único en el proceso.`,
        en: `Guarantees a class has **only one instance** and provides a global access point to it. Useful for things like configuration, logging, connection pools.

\`\`\`ts
class Config {
  private static instance: Config;
  private constructor() {} // no new from outside
  static getInstance() {
    if (!Config.instance) Config.instance = new Config();
    return Config.instance;
  }
}
\`\`\`

Senior critique: it introduces global state — hard to test, couples everyone to the same instance, hides dependencies. In parallel tests the state gets polluted. Better alternatives: **dependency injection** or a module with closed state. If you use it, make it for something that's truly unique in the process.`,
      },
    },
    {
      q: {
        es: "Factory Method y Abstract Factory",
        en: "Factory Method and Abstract Factory",
      },
      a: {
        es: `**Factory Method**: una función/clase abstracta define *qué* crear, pero las subclases deciden *cómo*.

\`\`\`ts
abstract class Logger {
  abstract createAppender(): Appender;
  log(msg: string) { this.createAppender().write(msg); }
}
class FileLogger extends Logger {
  createAppender() { return new FileAppender(); }
}
\`\`\`

**Abstract Factory**: una familia de fábricas para crear *familias relacionadas* de productos (ej.: UI kits que producen Button+Input+Modal para Windows/Mac).

Diferencia: Factory Method = un producto, subclase decide. Abstract Factory = varias fábricas coherentes entre sí.

Se usan cuando no conoces de antemano los tipos exactos que necesitas o quieres desacoplar la creación del uso.`,
        en: `**Factory Method**: an abstract function/class defines *what* to create, but subclasses decide *how*.

\`\`\`ts
abstract class Logger {
  abstract createAppender(): Appender;
  log(msg: string) { this.createAppender().write(msg); }
}
class FileLogger extends Logger {
  createAppender() { return new FileAppender(); }
}
\`\`\`

**Abstract Factory**: a family of factories to create *related families* of products (e.g. UI kits producing Button+Input+Modal for Windows/Mac).

Difference: Factory Method = one product, subclass decides. Abstract Factory = several factories coherent with each other.

They're used when you don't know the exact types up front or want to decouple creation from usage.`,
      },
    },
    {
      q: { es: "Builder", en: "Builder" },
      a: {
        es: `Separa la **construcción** de un objeto complejo de su **representación**. Útil cuando hay muchos parámetros opcionales, combinaciones válidas, o la construcción es en varios pasos.

\`\`\`ts
class SQLBuilder {
  private q = '';
  select(c: string) { this.q += \`SELECT \${c} \`]; return this; }
  from(t: string) { this.q += \`FROM \${t} \`]; return this; }
  where(c: string) { this.q += \`WHERE \${c}\`; return this; }
  build() { return this.q; }
}
new SQLBuilder().select('*').from('users').where('age > 18').build();
\`\`\`

Variantes: **fluent builder** (encadenable), **director** (orquesta pasos comunes), **step builder** (cada método devuelve el siguiente tipo en la cadena para guiar el orden). En TypeScript se usa mucho para construir queries, configuraciones y objetos inmutables complejos.`,
        en: `Separates the **construction** of a complex object from its **representation**. Useful when there are many optional parameters, valid combinations, or multi-step construction.

\`\`\`ts
class SQLBuilder {
  private q = '';
  select(c: string) { this.q += \`SELECT \${c} \`]; return this; }
  from(t: string) { this.q += \`FROM \${t} \`]; return this; }
  where(c: string) { this.q += \`WHERE \${c}\`; return this; }
  build() { return this.q; }
}
new SQLBuilder().select('*').from('users').where('age > 18').build();
\`\`\`

Variants: **fluent builder** (chainable), **director** (orchestrates common steps), **step builder** (each method returns the next type in the chain to guide the order). In TypeScript it's widely used to build queries, configurations, and complex immutable objects.`,
      },
    },
    {
      q: { es: "Observer / Pub-Sub", en: "Observer / Pub-Sub" },
      a: {
        es: `Define una dependencia **uno-a-muchos**: cuando un *subject* cambia, todos sus *observers* son notificados automáticamente.

\`\`\`ts
class EventEmitter {
  private handlers: Record<string, Function[]> = {};
  on(ev: string, fn: Function) { (this.handlers[ev] ??= []).push(fn); }
  emit(ev: string, data: any) { this.handlers[ev]?.forEach(f => f(data)); }
}
\`\`\`

Es el patrón detrás de \`addEventListener\`, RxJS, EventEmitters de Node, stores de Redux/Zustand. Variante **Pub-Sub** (*publish-subscribe*): los suscriptores no conocen al emisor, solo al *topic* o *channel* — facilita desacoplar componentes de UI, microservicios o workers.

Senior: cuidado con **memory leaks** — siempre desuscribir en \`useEffect\` cleanup o \`unsubscribe()\`; cuidado con la **propagación de eventos en cascada**.`,
        en: `Defines a **one-to-many** dependency: when a *subject* changes, all its *observers* are notified automatically.

\`\`\`ts
class EventEmitter {
  private handlers: Record<string, Function[]> = {};
  on(ev: string, fn: Function) { (this.handlers[ev] ??= []).push(fn); }
  emit(ev: string, data: any) { this.handlers[ev]?.forEach(f => f(data)); }
}
\`\`\`

It's the pattern behind \`addEventListener\`, RxJS, Node's EventEmitters, Redux/Zustand stores. The **Pub-Sub** variant (*publish-subscribe*): subscribers don't know the emitter, only the *topic* or *channel* — it helps decouple UI components, microservices, or workers.

Senior: watch out for **memory leaks** — always unsubscribe in the \`useEffect\` cleanup or \`unsubscribe()\`; watch out for **cascading event propagation**.`,
      },
    },
    {
      q: { es: "Strategy", en: "Strategy" },
      a: {
        es: `Define una familia de algoritmos intercambiables y los encapsula para que sean intercambiables en tiempo de ejecución. Útil cuando tienes múltiples variantes de un mismo proceso.

\`\`\`ts
interface SortStrategy { sort<T>(arr: T[]): T[]; }
class QuickSort implements SortStrategy { sort<T>(a: T[]) { /* … */ return a; } }
class MergeSort implements SortStrategy { sort<T>(a: T[]) { /* … */ return a; } }

class Sorter {
  constructor(private strategy: SortStrategy) {}
  setStrategy(s: SortStrategy) { this.strategy = s; }
  run<T>(arr: T[]) { return this.strategy.sort(arr); }
}
\`\`\`

Elimina los \`if/switch\` enormes sobre "qué algoritmo usar". Permite añadir nuevos sin modificar el cliente (**Open/Closed**). Alternativa moderna: pasar funciones como argumentos — en lenguajes con first-class functions basta con esto.`,
        en: `Defines a family of interchangeable algorithms and encapsulates them so they can be swapped at runtime. Useful when you have multiple variants of the same process.

\`\`\`ts
interface SortStrategy { sort<T>(arr: T[]): T[]; }
class QuickSort implements SortStrategy { sort<T>(a: T[]) { /* … */ return a; } }
class MergeSort implements SortStrategy { sort<T>(a: T[]) { /* … */ return a; } }

class Sorter {
  constructor(private strategy: SortStrategy) {}
  setStrategy(s: SortStrategy) { this.strategy = s; }
  run<T>(arr: T[]) { return this.strategy.sort(arr); }
}
\`\`\`

It eliminates huge \`if/switch\` blocks over "which algorithm to use". It lets you add new ones without modifying the client (**Open/Closed**). Modern alternative: pass functions as arguments — in languages with first-class functions, that's enough.`,
      },
    },
    {
      q: { es: "Decorator", en: "Decorator" },
      a: {
        es: `Añade responsabilidades a un objeto **sin modificar su clase ni envolver mediante herencia**. Envuelve al objeto original y expone la misma interfaz.

\`\`\`ts
interface Coffee { price(): number; }
class Basic implements Coffee { price() { return 2; } }
class Milk implements Coffee {
  constructor(private c: Coffee) {}
  price() { return this.c.price() + 0.5; }
}
class Sugar implements Coffee {
  constructor(private c: Coffee) {}
  price() { return this.c.price() + 0.2; }
}
new Sugar(new Milk(new Basic())).price(); // 2.7
\`\`\`

Es justo lo que hace \`@decorator\` de TypeScript/Python, los **HOC** de React o los **middleware** de Express. Los TS \`@decorator\` son una propuesta del TC39; en Angular son piedra angular.`,
        en: `Adds responsibilities to an object **without modifying its class or wrapping it via inheritance**. It wraps the original object and exposes the same interface.

\`\`\`ts
interface Coffee { price(): number; }
class Basic implements Coffee { price() { return 2; } }
class Milk implements Coffee {
  constructor(private c: Coffee) {}
  price() { return this.c.price() + 0.5; }
}
class Sugar implements Coffee {
  constructor(private c: Coffee) {}
  price() { return this.c.price() + 0.2; }
}
new Sugar(new Milk(new Basic())).price(); // 2.7
\`\`\`

It's exactly what TypeScript/Python \`@decorator\`, React **HOCs**, or Express **middleware** do. TS \`@decorator\` is a TC39 proposal; in Angular it's a cornerstone.`,
      },
    },
    {
      q: { es: "Adapter", en: "Adapter" },
      a: {
        es: `Permite que interfaces incompatibles colaboren. Envuelve el objeto existente y traduce sus llamadas a la interfaz que el cliente espera.

\`\`\`ts
// API antigua con métodos snake_case
interface OldApi { get_user_data(): User; }
class OldApiAdapter implements NewApi {
  constructor(private old: OldApi) {}
  getUser(): User { return this.old.get_user_data(); }
}
\`\`\`

Uso clásico: integrar librería de terceros, SDKs de versiones distintas, o unificar microservicios heredados con contratos distintos. Sin este patrón tocarías el código del cliente en cada cambio — adapter aísla el cambio en una sola clase.`,
        en: `Lets incompatible interfaces collaborate. It wraps the existing object and translates its calls to the interface the client expects.

\`\`\`ts
// Old API with snake_case methods
interface OldApi { get_user_data(): User; }
class OldApiAdapter implements NewApi {
  constructor(private old: OldApi) {}
  getUser(): User { return this.old.get_user_data(); }
}
\`\`\`

Classic use: integrating third-party libraries, SDKs of different versions, or unifying legacy microservices with different contracts. Without this pattern you'd touch the client code on every change — the adapter isolates the change to a single class.`,
      },
    },
    {
      q: { es: "Facade", en: "Facade" },
      a: {
        es: `Expone una interfaz **simple y unificada** a un subsistema complejo. No añade funcionalidad — la oculta tras una puerta "clara".

\`\`\`ts
class NotificationsFacade {
  send(msg: string) {
    const email = new EmailService().setup(/* … */);
    const push = new PushService().connect(/* … */);
    email.send(msg);
    push.send(msg);
  }
}
// Cliente: new NotificationsFacade().send('hola')
\`\`\`

Reduce el acoplamiento entre cliente e interna del subsistema. Se confunde con Adapter: **Adapter convierte una interfaz en otra**, **Facade esconde muchas detrás de una**. Considera también que fachadas demasiadas se vuelven "dioses" que rompen SRP.`,
        en: `Exposes a **simple, unified interface** to a complex subsystem. It doesn't add functionality — it hides it behind a "clear" door.

\`\`\`ts
class NotificationsFacade {
  send(msg: string) {
    const email = new EmailService().setup(/* … */);
    const push = new PushService().connect(/* … */);
    email.send(msg);
    push.send(msg);
  }
}
// Client: new NotificationsFacade().send('hello')
\`\`\`

It reduces coupling between the client and the subsystem's internals. It's confused with Adapter: **Adapter converts one interface into another**, **Facade hides many behind one**. Also note that too many facades turn into "gods" that break SRP.`,
      },
    },
    {
      q: { es: "Command", en: "Command" },
      a: {
        es: `Encapsula una petición como un **objeto**, permitiendo parametrizar clientes con distintas peticiones, encolarlas, logarlas, deshacerlas.

\`\`\`ts
interface Command { execute(): void; undo?(): void; }
class SaveCommand implements Command {
  constructor(private doc: Doc) {}
  execute() { this.doc.save(); }
  undo() { this.doc.revert(); }
}
class Invoker {
  private queue: Command[] = [];
  private done: Command[] = [];
  run(c: Command) { c.execute(); this.done.push(c); }
  undoLast() { this.done.pop()?.undo?.(); }
}
\`\`\`

Usos: barras de **undo/redo**, jobs encolados, transacciones, macros. \`useReducer\` de React es esencialmente el patrón Command. En sistemas distribuidos, los **eventos de un event store** son comandos persistidos.`,
        en: `Encapsulates a request as an **object**, allowing you to parameterize clients with different requests, queue them, log them, or undo them.

\`\`\`ts
interface Command { execute(): void; undo?(): void; }
class SaveCommand implements Command {
  constructor(private doc: Doc) {}
  execute() { this.doc.save(); }
  undo() { this.doc.revert(); }
}
class Invoker {
  private queue: Command[] = [];
  private done: Command[] = [];
  run(c: Command) { c.execute(); this.done.push(c); }
  undoLast() { this.done.pop()?.undo?.(); }
}
\`\`\`

Uses: **undo/redo** bars, queued jobs, transactions, macros. React's \`useReducer\` is essentially the Command pattern. In distributed systems, the **events in an event store** are persisted commands.`,
      },
    },
    {
      q: { es: "State", en: "State" },
      a: {
        es: `Permite que un objeto cambie su comportamiento cuando su estado interno cambia — parece como si cambiara de clase.

\`\`\`ts
interface PhoneState { handle(phone: Phone): void; }
class Ringing implements PhoneState {
  handle(phone: Phone) { console.log('contestando…'); phone.setState(new Connected()); }
}
class Connected implements PhoneState {
  handle(phone: Phone) { console.log('colgando…'); phone.setState(new Ringing()); }
}
class Phone {
  constructor(private state: PhoneState = new Ringing()) {}
  setState(s: PhoneState) { this.state = s; }
  pressButton() { this.state.handle(this); }
}
\`\`\`

Elimina enormes \`switch\` sobre "en qué estado estoy". Cada estado es una clase con su lógica. Muy útil en máquinas de estado de workflows, UIs con pantallas, parsers.`,
        en: `Lets an object change its behavior when its internal state changes — it's as if it changed its class.

\`\`\`ts
interface PhoneState { handle(phone: Phone): void; }
class Ringing implements PhoneState {
  handle(phone: Phone) { console.log('answering…'); phone.setState(new Connected()); }
}
class Connected implements PhoneState {
  handle(phone: Phone) { console.log('hanging up…'); phone.setState(new Ringing()); }
}
class Phone {
  constructor(private state: PhoneState = new Ringing()) {}
  setState(s: PhoneState) { this.state = s; }
  pressButton() { this.state.handle(this); }
}
\`\`\`

It eliminates huge \`switch\` blocks over "which state am I in". Each state is a class with its own logic. Very useful for workflow state machines, multi-screen UIs, parsers.`,
      },
    },
    {
      q: { es: "Template Method", en: "Template Method" },
      a: {
        es: `Define el **esqueleto** de un algoritmo en una clase base y permite a las subclases sobrescribir pasos individuales sin cambiar la estructura.

\`\`\`ts
abstract class Report {
  build() {
    this.header();
    this.body();
    this.footer();
  }
  protected abstract body(): void;
  protected header() { console.log('--- Informe ---'); }
  protected footer() { console.log('---------------'); }
}
class SalesReport extends Report {
  body() { console.log('ventas por región…'); }
}
\`\`\`

Implementa el principio de Hollywood: *"No nos llames, te llamaremos"* — la base controla el flujo, las subclases rellenan los huecos. Es el viejo patrón de los frameworks (React's \`render()\`, hooks de ciclo de vida).`,
        en: `Defines the **skeleton** of an algorithm in a base class and lets subclasses override individual steps without changing the structure.

\`\`\`ts
abstract class Report {
  build() {
    this.header();
    this.body();
    this.footer();
  }
  protected abstract body(): void;
  protected header() { console.log('--- Report ---'); }
  protected footer() { console.log('----------------'); }
}
class SalesReport extends Report {
  body() { console.log('sales by region…'); }
}
\`\`\`

It implements the Hollywood principle: *"Don't call us, we'll call you"* — the base controls the flow, subclasses fill the gaps. It's the classic framework pattern (React's \`render()\`, lifecycle hooks).`,
      },
    },
    {
      q: { es: "Iterator", en: "Iterator" },
      a: {
        es: `Proporciona una forma de recorrer los elementos de una colección **sin exponer su representación interna** (list, tree, graph).

\`\`\`ts
interface Iterator<T> { next(): T | null; hasNext(): boolean; }
class TreeIterator implements Iterator<Node> {
  private stack: Node[] = [];
  constructor(root: Node) { this.stack.push(root); }
  next() { return this.stack.pop()?.value ?? null; }
  hasNext() { return this.stack.length > 0; }
}
\`\`\`

Es lo que hace \`for…of\` en JS: usa \`Symbol.iterator\`. Lo cumplen arrays, maps, sets y cualquier clase que implemente el protocolo. Abstrae la estructura: el cliente solo ve \`hasNext/next\`, no si hay tree, lista o JSON.`,
        en: `Provides a way to traverse the elements of a collection **without exposing its internal representation** (list, tree, graph).

\`\`\`ts
interface Iterator<T> { next(): T | null; hasNext(): boolean; }
class TreeIterator implements Iterator<Node> {
  private stack: Node[] = [];
  constructor(root: Node) { this.stack.push(root); }
  next() { return this.stack.pop()?.value ?? null; }
  hasNext() { return this.stack.length > 0; }
}
\`\`\`

It's what \`for…of\` does in JS: it uses \`Symbol.iterator\`. Arrays, maps, sets, and any class implementing the protocol satisfy it. It abstracts the structure: the client only sees \`hasNext/next\`, not whether it's a tree, list, or JSON.`,
      },
    },
    {
      q: { es: "Composite", en: "Composite" },
      a: {
        es: `Compone objetos en estructuras de **árbol** y trata a hojas y compuestos de la misma manera. Útil para jerarquías UI, menús, ASTs.

\`\`\`ts
interface Component { render(): string; }
class Leaf implements Component {
  constructor(private name: string) {}
  render() { return this.name; }
}
class Group implements Component {
  private children: Component[] = [];
  add(c: Component) { this.children.push(c); }
  render() { return \`(\${this.children.map(c => c.render()).join(',')})\`; }
}
\`\`\`

El cliente no distingue un \`Leaf\` de un \`Group\` — puede renderizar igual a cualquiera. Base del Virtual DOM de React: un nodo y una lista de nodos son ambos \`ReactNode\`.`,
        en: `Composes objects into **tree** structures and treats leaves and composites the same way. Useful for UI hierarchies, menus, ASTs.

\`\`\`ts
interface Component { render(): string; }
class Leaf implements Component {
  constructor(private name: string) {}
  render() { return this.name; }
}
class Group implements Component {
  private children: Component[] = [];
  add(c: Component) { this.children.push(c); }
  render() { return \`(\${this.children.map(c => c.render()).join(',')})\`; }
}
\`\`\`

The client doesn't distinguish a \`Leaf\` from a \`Group\` — it can render either the same way. It's the basis of React's Virtual DOM: a node and a list of nodes are both \`ReactNode\`.`,
      },
    },
    {
      q: { es: "Proxy", en: "Proxy" },
      a: {
        es: `Un **sustituto** que controla el acceso a otro objeto. Añade control: lazy init, caching, validación, logging, permisos, acceso remoto.

Tipos:
- **Virtual proxy**: lazy-loading — solo carga el dato real cuando se necesita (imágenes grandes, ORM relations).
- **Cache proxy**: guarda resultados y devuelve cacheados sin llamar al sujeto real.
- **Protection proxy**: verifica permisos antes de delegar.
- **Remote proxy**: representa un objeto remoto en otra máquina (gRPC stubs, CORBA).
- **Smart proxy**: contador de referencias, locks, métricas.

JS \`Proxy\` nativo permite interceptar cualquier operación de un objeto en tiempo de ejecución. Vuex, MobX y Vue's reactivity se basan en él.`,
        en: `A **substitute** that controls access to another object. It adds control: lazy init, caching, validation, logging, permissions, remote access.

Types:
- **Virtual proxy**: lazy-loading — only loads the real data when needed (large images, ORM relations).
- **Cache proxy**: stores results and returns cached ones without calling the real subject.
- **Protection proxy**: checks permissions before delegating.
- **Remote proxy**: represents a remote object on another machine (gRPC stubs, CORBA).
- **Smart proxy**: reference counting, locks, metrics.

Native JS \`Proxy\` lets you intercept any operation on an object at runtime. Vuex, MobX, and Vue's reactivity are built on it.`,
      },
    },
    {
      q: {
        es: "Chain of Responsibility",
        en: "Chain of Responsibility",
      },
      a: {
        es: `Pasa una petición por una **cadena de handlers**; cada uno decide procesarla, pasarla al siguiente o detener el flujo.

\`\`\`ts
abstract class Handler {
  next?: Handler;
  setNext(h: Handler) { this.next = h; return h; }
  abstract handle(req: Request): void;
}
class Auth extends Handler {
  handle(req: Request) {
    if (!req.user) return;
    this.next?.handle(req);
  }
}
\`\`\`

Implementación más visible: **middleware de Express/Koa** — \`next()\` pasa al siguiente eslabón. Otro caso: logging auto, transacciones aprobadas por una cadena de niveles, propagación de eventos DOM.`,
        en: `Passes a request through a **chain of handlers**; each one decides to process it, pass it to the next, or stop the flow.

\`\`\`ts
abstract class Handler {
  next?: Handler;
  setNext(h: Handler) { this.next = h; return h; }
  abstract handle(req: Request): void;
}
class Auth extends Handler {
  handle(req: Request) {
    if (!req.user) return;
    this.next?.handle(req);
  }
}
\`\`\`

Most visible implementation: **Express/Koa middleware** — \`next()\` passes to the next link. Other cases: auto logging, multi-level approval chains, DOM event propagation.`,
      },
    },
    {
      q: {
        es: "SOLID: los 5 principios",
        en: "SOLID: the 5 principles",
      },
      a: {
        es: `- **S**ingle Responsibility (SRP): una clase, una razón para cambiar.
- **O**pen/Closed (OCP): abierto a extensión, cerrado a modificación — extiende comportamientos sin tocar el existente.
- **L**iskov Substitution (LSP): una subclase debe poder sustituir a su padre sin romper el comportamiento esperado.
- **I**nterface Segregation (ISP): mejor muchas interfaces específicas que una general — los clientes no dependen de métodos que no usan.
- **D**ependency Inversion (DIP): depende de abstracciones, no de concreciones. Los módulos de alto nivel no deben depender de los de bajo nivel; ambos dependen de interfaces.

No son reglas absolutas — son guías para mantener código mantenible. Senior: aplicarlos cuando reduce complejidad, no dogmáticamente en cada clase.`,
        en: `- **S**ingle Responsibility (SRP): one class, one reason to change.
- **O**pen/Closed (OCP): open for extension, closed for modification — extend behavior without touching the existing.
- **L**iskov Substitution (LSP): a subclass must be substitutable for its parent without breaking expected behavior.
- **I**nterface Segregation (ISP): many specific interfaces are better than a general one — clients don't depend on methods they don't use.
- **D**ependency Inversion (DIP): depend on abstractions, not on concretions. High-level modules shouldn't depend on low-level ones; both depend on interfaces.

They're not absolute rules — they're guides to keep code maintainable. Senior: apply them when they reduce complexity, not dogmatically on every class.`,
      },
    },
    {
      q: { es: "Dependency Injection", en: "Dependency Injection" },
      a: {
        es: `Un componente **recibe sus dependencias desde fuera** en vez de crearlas internamente. Inversión de control: el componente no busca, le dan.

\`\`\`ts
// sin DI — acoplado a la implementación concreta
class OrderService {
  private repo = new OrderRepo(); // new fijo
}

// con DI — depende de una abstracción
class OrderService {
  constructor(private repo: IOrderRepo) {}
}
\`\`\`

Beneficios: testeable (pasas un mock en tests), desacoplado, fácil de cambiar implementaciones, fomenta SRP y DIP. Contenedores IoC (NestJS, Angular, InversifyJS) o composition root manual (en el main) lo gestionan.

Es la **D** de SOLID: depender de interfaces, no de concreciones.`,
        en: `A component **receives its dependencies from outside** instead of creating them internally. Inversion of control: the component doesn't fetch, it's given.

\`\`\`ts
// without DI — coupled to the concrete implementation
class OrderService {
  private repo = new OrderRepo(); // fixed new
}

// with DI — depends on an abstraction
class OrderService {
  constructor(private repo: IOrderRepo) {}
}
\`\`\`

Benefits: testable (you pass a mock in tests), decoupled, easy to swap implementations, fosters SRP and DIP. IoC containers (NestJS, Angular, InversifyJS) or a manual composition root (in main) manage it.

It's the **D** of SOLID: depend on interfaces, not on concretions.`,
      },
    },
    {
      q: { es: "Repository pattern", en: "Repository pattern" },
      a: {
        es: `Abstrae el acceso a datos detrás de una interfaz de **colección** (\`find\`, \`save\`, \`delete\`), separando la lógica de negocio del ORM/DB.

\`\`\`ts
interface UserRepo { findById(id: string): Promise<User>; save(u: User): Promise<void>; }
class PgUserRepo implements UserRepo { /* … Postgres … */ }
class InMemoryUserRepo implements UserRepo { /* … en tests … */ }
\`\`\`

Ventaja senior: el servicio de negocio depende de \`IUserRepo\`, no de \`Prisma\` o \`TypeORM\`. Puedes cambiar de DB o mockear en tests sin tocar el servicio. Refleja la inversión de dependencia DIP de SOLID.

Cuidado: en apps CRUD simples puede ser sobrecarga. Aparece mucho en DDD junto a **Unit of Work** y **Aggregate Root**.`,
        en: `Abstracts data access behind a **collection** interface (\`find\`, \`save\`, \`delete\`), separating the business logic from the ORM/DB.

\`\`\`ts
interface UserRepo { findById(id: string): Promise<User>; save(u: User): Promise<void>; }
class PgUserRepo implements UserRepo { /* … Postgres … */ }
class InMemoryUserRepo implements UserRepo { /* … in tests … */ }
\`\`\`

Senior advantage: the business service depends on \`IUserRepo\`, not on \`Prisma\` or \`TypeORM\`. You can switch DBs or mock in tests without touching the service. It reflects SOLID's DIP dependency inversion.

Careful: in simple CRUD apps it can be overhead. It appears a lot in DDD alongside **Unit of Work** and **Aggregate Root**.`,
      },
    },
    {
      q: { es: "MVC, MVP y MVVM", en: "MVC, MVP and MVVM" },
      a: {
        es: `Patrones para separar UI de la lógica:
- **MVC** (Model-View-Controller): el controlador recibe input, actualiza el modelo, la vista se actualiza solo. Clásico en Rails, Spring MVC.
- **MVP** (Model-View-Presenter): el presenter actúa entre modelo y vista; la vista llama al presenter y este actualiza la vista. Usado en Android antiguo, WinForms.
- **MVVM** (Model-View-ViewModel): la vista se ata a propiedades del ViewModel con *data binding* bidireccional. Vue, Knockout, WPF, Angular.

La tendencia moderna (React, Vue 3) es MVVM o un "unidirectional data flow" (Flux/Redux): estado único, mutado por acciones explícitas, UI pura derivada del estado.`,
        en: `Patterns to separate UI from logic:
- **MVC** (Model-View-Controller): the controller receives input, updates the model, the view updates itself. Classic in Rails, Spring MVC.
- **MVP** (Model-View-Presenter): the presenter sits between model and view; the view calls the presenter and it updates the view. Used in old Android, WinForms.
- **MVVM** (Model-View-ViewModel): the view binds to the ViewModel's properties via two-way *data binding*. Vue, Knockout, WPF, Angular.

The modern trend (React, Vue 3) is MVVM or a "unidirectional data flow" (Flux/Redux): a single state, mutated by explicit actions, pure UI derived from the state.`,
      },
    },
    {
      q: {
        es: "Patrones funcionales en el JS moderno",
        en: "Functional patterns in modern JS",
      },
      a: {
        es: `El paradigma funcional ha reemplazado muchos GoF en el código TS/JS diario:
- **Higher-Order Functions**: \`map\`, \`filter\`, \`reduce\` — Strategy con función por parámetro.
- **Currying / partial application**: \`const add = a => b => a + b\` — Builder funcional.
- **Composition / pipe**: \`pipe(f, g, h)\` — Decorator como composición de funciones.
- **Memoization**: cache de resultados — Cache Proxy sin clase.
- **Monads (Option, Result, Either)**: manejo de nulos y errores sin ifs anidados.

Senior takeaway: muchos "patrones de diseño" son **soluciones a una carencia del lenguaje**. En lenguajes con funciones first-class y tipos algebraicos, bastan composición + interfaces + HOFs. No dejes de usar GoF en JS, pero evalúa si hay una opción más ligera.`,
        en: `The functional paradigm has replaced many GoF patterns in day-to-day TS/JS code:
- **Higher-Order Functions**: \`map\`, \`filter\`, \`reduce\` — Strategy with a function as a parameter.
- **Currying / partial application**: \`const add = a => b => a + b\` — a functional Builder.
- **Composition / pipe**: \`pipe(f, g, h)\` — a Decorator as function composition.
- **Memoization**: result caching — a Cache Proxy without a class.
- **Monads (Option, Result, Either)**: handling nulls and errors without nested ifs.

Senior takeaway: many "design patterns" are **solutions to a missing language feature**. In languages with first-class functions and algebraic types, composition + interfaces + HOFs are enough. Don't stop using GoF in JS, but evaluate whether there's a lighter option.`,
      },
    },
  ],
};