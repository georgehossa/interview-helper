import type { Topic } from "../types";

export const javascript: Topic = {
  key: "js",
  name: "JavaScript",
  color: "#f7df1e",
  items: [
    {
      q: { es: "Closures", en: "Closures" },
      a: {
        es: `Una **closure** es una función que recuerda el ámbito léxico donde fue creada, incluso al ejecutarse fuera de él. Da acceso a variables de la función externa después de que esta retornó.

\`\`\`js
function contador() {
  let n = 0;
  return () => ++n;
}
const c = contador();
c(); // 1
c(); // 2 — n persiste
\`\`\`

Usos: encapsular estado privado, memoization, currying, callbacks.`,
        en: `A **closure** is a function that remembers the lexical scope where it was created, even when executed outside of it. It grants access to the outer function's variables after that function returned.

\`\`\`js
function counter() {
  let n = 0;
  return () => ++n;
}
const c = counter();
c(); // 1
c(); // 2 — n persists
\`\`\`

Uses: encapsulating private state, memoization, currying, callbacks.`,
      },
    },
    {
      q: { es: "Hoisting", en: "Hoisting" },
      a: {
        es: `El motor 'eleva' las declaraciones al inicio de su ámbito. \`var\` y \`function\` se hoistean; \`var\` queda como \`undefined\` hasta su asignación. \`let\`/\`const\` también se hoistean pero quedan en la **Temporal Dead Zone**: acceder antes de declararlas lanza \`ReferenceError\`.`,
        en: `The engine 'hoists' declarations to the top of their scope. \`var\` and \`function\` are hoisted; \`var\` stays \`undefined\` until its assignment. \`let\`/\`const\` are also hoisted but land in the **Temporal Dead Zone**: accessing them before declaration throws \`ReferenceError\`.`,
      },
    },
    {
      q: { es: "== vs ===", en: "== vs ===" },
      a: {
        es: `\`==\` compara con **coerción** de tipos (\`0 == '0'\` → true). \`===\` compara valor **y** tipo sin coerción (\`0 === '0'\` → false). Regla de entrevista: usa siempre \`===\` salvo \`x == null\` para chequear null o undefined a la vez.`,
        en: `\`==\` compares with **type coercion** (\`0 == '0'\` → true). \`===\` compares value **and** type without coercion (\`0 === '0'\` → false). Interview rule: always use \`===\` except \`x == null\` to check for null or undefined at once.`,
      },
    },
    {
      q: { es: "var, let, const", en: "var, let, const" },
      a: {
        es: `- **var**: ámbito de función, se hoistea, redeclarable.
- **let**: ámbito de bloque, reasignable, no redeclarable.
- **const**: ámbito de bloque, no reasignable. El binding es constante, pero el contenido de objetos/arrays sí muta.`,
        en: `- **var**: function scope, hoisted, redeclarable.
- **let**: block scope, reassignable, not redeclarable.
- **const**: block scope, not reassignable. The binding is constant, but the contents of objects/arrays still mutate.`,
      },
    },
    {
      q: { es: "Event loop", en: "Event loop" },
      a: {
        es: `JS corre en **un solo hilo**: un único **call stack** que ejecuta el código síncrono. Cuando aparece una tarea asíncrona (timer, fetch, evento), se delega a las **Web APIs** del entorno y el hilo sigue sin bloquearse. Al completarse, el callback se encola. El **event loop** vigila el stack: cuando queda vacío, mueve callbacks de las colas hacia él.

Hay dos colas con prioridades distintas:
- **Microtasks** (Promises, \`queueMicrotask\`): se vacían *todas* antes de pasar a la siguiente macrotask.
- **Macrotasks** (\`setTimeout\`, \`setInterval\`, eventos): una por vuelta del loop.

Pregunta clásica — ¿qué imprime esto?

\`\`\`js
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
\`\`\`

Orden: \`1, 4, 3, 2\`. Primero todo el síncrono (1 y 4); luego se vacía la cola de microtasks (la Promise → 3) *antes* que la macrotask del \`setTimeout\` (→ 2), aunque su delay sea 0. Entenderlo explica por qué un \`setTimeout(…,0)\` nunca corre 'ya mismo'.`,
        en: `JS runs on **a single thread**: a single **call stack** that executes synchronous code. When an async task appears (timer, fetch, event), it is delegated to the environment's **Web APIs** and the thread keeps running unblocked. When it completes, its callback is enqueued. The **event loop** watches the stack: when it's empty, it moves callbacks from the queues onto it.

There are two queues with different priorities:
- **Microtasks** (Promises, \`queueMicrotask\`): drained *all* before moving to the next macrotask.
- **Macrotasks** (\`setTimeout\`, \`setInterval\`, events): one per loop iteration.

Classic question — what does this print?

\`\`\`js
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
\`\`\`

Order: \`1, 4, 3, 2\`. First all the synchronous code (1 and 4); then the microtask queue is drained (the Promise → 3) *before* the \`setTimeout\` macrotask (→ 2), even though its delay is 0. Understanding this explains why \`setTimeout(…,0)\` never runs 'right now'.`,
      },
    },
    {
      q: { es: "Promises y async/await", en: "Promises and async/await" },
      a: {
        es: `Una **Promise** representa un valor futuro: *pending → fulfilled / rejected*. \`async/await\` es azúcar sobre Promises para escribir async como si fuera síncrono.

\`\`\`js
async function load() {
  try {
    const r = await fetch(url);
    return await r.json();
  } catch (e) { console.error(e); }
}
\`\`\`

Para paralelo: \`Promise.all([a, b])\`.`,
        en: `A **Promise** represents a future value: *pending → fulfilled / rejected*. \`async/await\` is sugar over Promises to write async code as if it were synchronous.

\`\`\`js
async function load() {
  try {
    const r = await fetch(url);
    return await r.json();
  } catch (e) { console.error(e); }
}
\`\`\`

For parallel work: \`Promise.all([a, b])\`.`,
      },
    },
    {
      q: { es: "this y binding", en: "this and binding" },
      a: {
        es: `El valor de \`this\` **no depende de dónde se define la función, sino de cómo se invoca**. Hay cuatro reglas, de menor a mayor prioridad:
- **Default**: función suelta → \`undefined\` en modo estricto (o el objeto global fuera de él).
- **Implícito**: \`obj.metodo()\` → \`this\` es \`obj\` (lo que está antes del punto).
- **Explícito**: \`call\`, \`apply\` y \`bind\` fijan \`this\` a mano.
- **new**: con un constructor, \`this\` es el objeto recién creado.

El error clásico es *perder* el \`this\` al desligar un método de su objeto:

\`\`\`js
const obj = { nombre: 'Ana', saluda(){ return this.nombre; } };
const fn = obj.saluda;
fn(); // undefined — this ya no es obj
\`\`\`

**Arrow functions** son la excepción clave: no tienen su propio \`this\`, lo **heredan del ámbito léxico** donde se definieron. Por eso se usan en callbacks dentro de métodos o componentes, para conservar el \`this\` externo.

\`\`\`js
// fija this de inmediato e invoca:
fn.call(obj);          // argumentos sueltos
fn.apply(obj, [a, b]); // argumentos en array
// devuelve una función nueva con this fijado:
const ligada = fn.bind(obj);
\`\`\`

Resumen: \`call\`/\`apply\` invocan ya mismo (uno recibe args sueltos, el otro un array); \`bind\` no invoca, retorna una copia con el \`this\` amarrado.`,
        en: `The value of \`this\` **doesn't depend on where the function is defined, but on how it's invoked**. Four rules, from lowest to highest priority:
- **Default**: a loose function → \`undefined\` in strict mode (or the global object otherwise).
- **Implicit**: \`obj.method()\` → \`this\` is \`obj\` (whatever is before the dot).
- **Explicit**: \`call\`, \`apply\` and \`bind\` set \`this\` manually.
- **new**: with a constructor, \`this\` is the newly created object.

The classic mistake is *losing* \`this\` when detaching a method from its object:

\`\`\`js
const obj = { name: 'Ana', greet(){ return this.name; } };
const fn = obj.greet;
fn(); // undefined — this is no longer obj
\`\`\`

**Arrow functions** are the key exception: they don't have their own \`this\`, they **inherit it from the lexical scope** where they were defined. That's why they're used in callbacks inside methods or components — to keep the outer \`this\`.

\`\`\`js
// sets this immediately and invokes:
fn.call(obj);          // loose args
fn.apply(obj, [a, b]); // args as array
// returns a new function with this bound:
const bound = fn.bind(obj);
\`\`\`

Summary: \`call\`/\`apply\` invoke immediately (one takes loose args, the other an array); \`bind\` doesn't invoke — it returns a copy with \`this\` bound.`,
      },
    },
    {
      q: { es: "Prototipos y herencia", en: "Prototypes and inheritance" },
      a: {
        es: `Cada objeto tiene un enlace interno (\`[[Prototype]]\`) a otro objeto. Al leer una propiedad que no existe, JS la busca subiendo por la **cadena de prototipos**. Las \`class\` son azúcar sobre este modelo prototipal.`,
        en: `Every object has an internal link (\`[[Prototype]]\`) to another object. When reading a property that doesn't exist, JS looks it up by walking up the **prototype chain**. \`class\` is sugar on top of this prototypal model.`,
      },
    },
    {
      q: { es: "map, filter, reduce", en: "map, filter, reduce" },
      a: {
        es: `Métodos inmutables de array:
- **map**: transforma cada elemento → nuevo array igual de largo.
- **filter**: conserva los que cumplen una condición.
- **reduce**: acumula a un solo valor.

\`\`\`js
[1, 2, 3].reduce((acc, n) => acc + n, 0); // 6
\`\`\``,
        en: `Immutable array methods:
- **map**: transforms every element → a new array of the same length.
- **filter**: keeps the ones that meet a condition.
- **reduce**: accumulates into a single value.

\`\`\`js
[1, 2, 3].reduce((acc, n) => acc + n, 0); // 6
\`\`\``,
      },
    },
    {
      q: {
        es: "Spread, rest y destructuring",
        en: "Spread, rest and destructuring",
      },
      a: {
        es: `**Spread** (\`...\`) expande: \`[...a, ...b]\`. **Rest** agrupa: \`function f(...args){}\`. **Destructuring** extrae: \`const {id, name} = user\`, \`const [first] = arr\`.`,
        en: `**Spread** (\`...\`) expands: \`[...a, ...b]\`. **Rest** gathers: \`function f(...args){}\`. **Destructuring** extracts: \`const {id, name} = user\`, \`const [first] = arr\`.`,
      },
    },
    {
      q: { es: "Debounce vs throttle", en: "Debounce vs throttle" },
      a: {
        es: `**Debounce**: espera a que pasen N ms *sin* eventos para ejecutar (búsqueda mientras escribes). **Throttle**: ejecuta como máximo una vez cada N ms (scroll/resize).`,
        en: `**Debounce**: waits for N ms *without* events before executing (search as you type). **Throttle**: executes at most once every N ms (scroll/resize).`,
      },
    },
  ],
};