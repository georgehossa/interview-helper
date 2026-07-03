import type { Topic } from "../types";

export const designPatterns: Topic = {
  key: "patterns",
  name: "Design Patterns",
  color: "#34d399",
  items: [
    {
      q: "¿Qué son los patrones de diseño?",
      a: `Un **patrón de diseño** es una solución probada y reutilizable a un problema recurrente de diseño de software. No es código — es una plantilla conceptual que se adapta al contexto.

Se agrupan en tres familias (GoF, 1994):
- **Creacionales**: cómo se construyen objetos (Singleton, Factory, Builder, Prototype, Abstract Factory).
- **Estructurales**: cómo se componen objetos en estructuras mayores (Adapter, Decorator, Facade, Composite, Proxy).
- **De comportamiento**: cómo se comunican y reparten responsabilidades (Observer, Strategy, Command, State, Template Method, Iterator, Chain of Responsibility).

Clave senior: **no forzar patrones**. Son vocabulario para discutir soluciones; se aplican cuando el problema lo pide, no por moda. Sobreusarlos produce código acoplado y verboso.`,
    },
    {
      q: "Singleton",
      a: `Garantiza que una clase tenga **una sola instancia** y provee un punto de acceso global a ella. Útil para cosas como configuración, logging, pool de conexiones.

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
    },
    {
      q: "Factory Method y Abstract Factory",
      a: `**Factory Method**: una función/clase abstracta define *qué* crear, pero las subclases deciden *cómo*.

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

Diferencia: Factory Method = un producto, subclase decide. Abstract Factory = varias fábricas coherentes entre sí.olesterol

Se usan cuando no conoces de antemano los tipos exactos que necesitas o quieres desacoplar la creación del uso.`,
    },
    {
      q: "Builder",
      a: `Separa la **construcción** de un objeto complejo de su **representación**. Útil cuando hay muchos parámetros opcionales, combinaciones válidas, o la construcción es en varios pasos.

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
    },
    {
      q: "Observer / Pub-Sub",
      a: `Define una dependencia **uno-a-muchos**: cuando un *subject* cambia, todos sus *observers* son notificados automáticamente.

\`\`\`ts
class EventEmitter {
  private handlers: Record<string, Function[]> = {};
  on(ev: string, fn: Function) { (this.handlers[ev] ??= []).push(fn); }
  emit(ev: string, data: any) { this.handlers[ev]?.forEach(f => f(data)); }
}
\`\`\`

Es el patrón detrás de \`addEventListener\`, RxJS, EventEmitters de Node, stores de Redux/Zustand. Variante **Pub-Sub** (*publish-subscribe*): los suscriptores no conocen al emisor, solo al *topic* o *channel* — facilita desacoplar componentes de UI, microservicios o workers.

Senior: cuidado con **memory leaks** — siempre desuscribir en \`useEffect\` cleanup o \`unsubscribe()\`; zorgen con **propagación de eventos en cascada**.`,
    },
    {
      q: "Strategy",
      a: `Define una familia de algoritmos intercambiables y los encapsula para que sean intercambiables en tiempo de ejecución. Útil cuando tienes múltiples variantes de un mismo proceso.

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
    },
    {
      q: "Decorator",
      a: `Añade responsabilidades a un objeto **sin modificar su clase ni envolver mediante herencia**. Envuelve al objeto original y expone la misma interfaz.

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
    },
    {
      q: "Adapter",
      a: `Permite que interfaces incompatibles colaboren. Envuelve el objeto existente y traduce sus llamadas a la interfaz que el cliente espera.

\`\`\`ts
// API antigua con métodos snake_case
interface OldApi { get_user_data(): User; }
class OldApiAdapter implements NewApi {
  constructor(private old: OldApi) {}
  getUser(): User { return this.old.get_user_data(); }
}
\`\`\`

Uso clásico: integrar librería de terceros, SDKs de versiones distintas, o unificar microservicios heredados concontratos distintos. Sin este patrón tocarías el código del cliente en cada cambio — adapter aísla el cambio en una sola clase.`,
    },
    {
      q: "Facade",
      a: `Expone una interfaz **simple y unificada** a un subsistema complejo. No añade funcionalidad — la oculta tras una puerta "clara".

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
    },
    {
      q: "Command",
      a: `Encapsula una petición como un **objeto**, permitiendo parametrizar clientes con distintas peticiones, encolarlas, logarlas, deshacerlas.

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
    },
    {
      q: "State",
      a: `Permite que un objeto cambie su comportamiento cuando su estado interno cambia — parece como si cambiara de clase.

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

Elimina enormes \`switch\` sobre "en qué estado estoy". Cada estado es una clase con su lógica. Muy útil en máquinas de estado de workflows, UIs con pantallas, parsers.ooks`,
    },
    {
      q: "Template Method",
      a: `Define el **esqueleto** de un algoritmo en una clase base y permite a las subclases sobrescribir pasos individuales sin cambiar la estructura.

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
    },
    {
      q: "Iterator",
      a: `Proporciona una forma de recorrer los elementos de una colección **sin exponer su representación interna** (list, tree, graph).

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
    },
    {
      q: "Composite",
      a: `Compone objetos en estructuras de **árbol** y trata a hojas y compuestos de la misma manera. Útil para jerarquías UI, menús, ASTs.

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

El cliente no distingue un \`Leaf\` de un \`Group\` — pocos saben si renderiza igual todo él. Base del Virtual DOM de React: un nodo y una lista de nodos son ambos \`ReactNode\`.`,
    },
    {
      q: "Proxy",
      a: `Un **sustituto** que controla el acceso a otro objeto. Añade control: lazy init, caching, validación, logging, permisos, acceso remoto.

Tipos:
- **Virtual proxy**: lazy-loading — solo carga el dato real cuando se necesita (imágenes grandes, ORM relations).
- **Cache proxy**: guarda resultados y devuelve cacheados sin llamar al sujeto real.
- **Protection proxy**: verifica permisos antes de delegar.
- **Remote proxy**: representa un objeto remoto en otra máquina (gRPC stubs, CORBA).
- **Smart proxy**: contador de referencias, locks, métricas.

JS \`Proxy\` nativo permite interceptar cualquier operación de un objeto en tiempo de ejecución. Vuex, MobX y Vue's reactivity se basan en él.`,
    },
    {
      q: "Chain of Responsibility",
      a: `Pasa una petición por una **cadena de handlers**; cada uno decide procesarla, pasarla al siguiente o detener el flujo.

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

Implementación más visible: **middleware de Express/Koa** — \`next()\` pasa al siguiente eslabón. Otro caso: logging auto, sanitysactions aprobadas por una cadena de niveles, propagation de eventos DOM.ocal`,
    },
    {
      q: "SOLID: los 5 principios",
      a: `- **S**ingle Responsibility (SRP): una clase, una razón para cambiar.
- **O**pen/Closed (OCP): abierto a extensión, cerrado a modificación — extiende comportamientos sin tocar el existente.
- **L**iskov Substitution (LSP): una subclase debe poder sustituir a su padre sin romper el comportamiento esperado.
- **I**nterface Segregation (ISP): mejor muchas interfaces específicas que una general — los clientes no dependen de métodos que no usan.
- **D**ependency Inversion (DIP): depende de abstracciones, no de concreciones. Los módulos de alto nivel no deben depender de los de bajo nivel; ambos dependen de interfaces.

No son reglas absolutas — son guías para mantener código mantenible. Senior: aplicarlos cuando reduce complejidad, no dogmáticamente en cada clase.`,
    },
    {
      q: "Dependency Injection",
      a: `Un componente **recibe sus dependencias desde fuera** en vez de crearlas internamente. Inversión de control: el componente no busca, le dan.

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
    },
    {
      q: "Repository pattern",
      a: `Abstrae el acceso a datos detrás de una interfaz de **colección** (\`find\`, \`save\`, \`delete\`), separando la lógica de negocio del ORM/DB.

\`\`\`ts
interface UserRepo { findById(id: string): Promise<User>; save(u: User): Promise<void>; }
class PgUserRepo implements UserRepo { /* … Postgres … */ }
class InMemoryUserRepo implements UserRepo { /* … en tests … */ }
\`\`\`

Ventaja senior: el servicio de negocio depende de \`IUserRepo\`, no de \`Prisma\` o \`TypeORM\`. Puedes cambiar de DB o mockear en tests sin tocar el servicio. Refleja la inversión de dependencia DIP de SOLID.

Cuidado: en apps CRUD simples puede ser sobrecarga. Aparece mucho en DDD junto a **Unit of Work** y **Aggregate Root**.`,
    },
    {
      q: "MVC, MVP y MVVM",
      a: `Patrones para separar UI de la lógica:
- **MVC** (Model-View-Controller): el controlador recibe input, actualiza el modelo, la vista se actualiza soloྂ. Clásico en Rails, Spring MVC.
- **MVP** (Model-View-Presenter): el presenter actúa entre modelo y vista; la vista llama al presenter y este actualiza la vista. Usado en Android antiguo, WinForms.
- **MVVM** (Model-View-ViewModel): la vista se ata a propiedades del ViewModel con *data binding* bidireccional. Vue, Knockout, WPF, Angular.

La tendencia moderna (React, Vue 3) es MVVM o un "unidirectional data flow" (Flux/Redux): estado único, mutado por acciones explícitas, UI pura derivada del estado.`,
    },
    {
      q: "Patrones funcionales en el JS moderno",
      a: `El paradigma funcional ha reemplazado muchos GoF en el código TS/JS diario:
- **Higher-Order Functions**: \`map\`, \`filter\`, \`reduce\` —Strategy con función por parámetro.
- **Currying / partial application**: \`const add = a => b => a + b\` — Builder funcional.
- **Composition / pipe**: \`pipe(f, g, h)\` — Decorator como composición de funciones.
- **Memoization**: cache de resultados — Cache Proxy sin clase.
- **Monads (Option, Result, Either)**: manejo de nulos y errores sin ifs anidados.

Senior takeaway: muchos "patrones de diseño" son **soluciones a una carencia del lenguaje**. En lenguajes con funciones first-class y tipos algebraicos, bastan composición + interfaces + HOFs. No dejes de usar GoF en JS, pero evalúa si hay una opción más ligera.`,
    },
  ],
};