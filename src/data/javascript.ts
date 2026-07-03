import type { Topic } from "../types";

export const javascript: Topic = {
  key: "js",
  name: "JavaScript",
  color: "#f7df1e",
  items: [
    {
      q: "Closures",
      a: `Una **closure** es una función que recuerda el ámbito léxico donde fue creada, incluso al ejecutarse fuera de él. Da acceso a variables de la función externa después de que esta retornó.

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
    },
    {
      q: "Hoisting",
      a: `El motor 'eleva' las declaraciones al inicio de su ámbito. \`var\` y \`function\` se hoistean; \`var\` queda como \`undefined\` hasta su asignación. \`let\`/\`const\` también se hoistean pero quedan en la **Temporal Dead Zone**: acceder antes de declararlas lanza \`ReferenceError\`.`,
    },
    {
      q: "== vs ===",
      a: `\`==\` compara con **coerción** de tipos (\`0 == '0'\` → true). \`===\` compara valor **y** tipo sin coerción (\`0 === '0'\` → false). Regla de entrevista: usa siempre \`===\` salvo \`x == null\` para chequear null o undefined a la vez.`,
    },
    {
      q: "var, let, const",
      a: `- **var**: ámbito de función, se hoistea, redeclarable.
- **let**: ámbito de bloque, reasignable, no redeclarable.
- **const**: ámbito de bloque, no reasignable. El binding es constante, pero el contenido de objetos/arrays sí muta.`,
    },
    {
      q: "Event loop",
      a: `JS corre en **un solo hilo**: un único **call stack** que ejecuta el código síncrono. Cuando aparece una tarea asíncrona (timer, fetch, evento), se delega a las **Web APIs** del entorno y el hilo sigue sin bloquearse. Al completarse, el callback se encola. El **event loop** vigila el stack: cuando queda vacío, mueve callbacks de las colas hacia él.

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
    },
    {
      q: "Promises y async/await",
      a: `Una **Promise** representa un valor futuro: *pending → fulfilled / rejected*. \`async/await\` es azúcar sobre Promises para escribir async como si fuera síncrono.

\`\`\`js
async function load() {
  try {
    const r = await fetch(url);
    return await r.json();
  } catch (e) { console.error(e); }
}
\`\`\`

Para paralelo: \`Promise.all([a, b])\`.`,
    },
    {
      q: "this y binding",
      a: `El valor de \`this\` **no depende de dónde se define la función, sino de cómo se invoca**. Hay cuatro reglas, de menor a mayor prioridad:
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
    },
    {
      q: "Prototipos y herencia",
      a: `Cada objeto tiene un enlace interno (\`[[Prototype]]\`) a otro objeto. Al leer una propiedad que no existe, JS la busca subiendo por la **cadena de prototipos**. Las \`class\` son azúcar sobre este modelo prototipal.`,
    },
    {
      q: "map, filter, reduce",
      a: `Métodos inmutables de array:
- **map**: transforma cada elemento → nuevo array igual de largo.
- **filter**: conserva los que cumplen una condición.
- **reduce**: acumula a un solo valor.

\`\`\`js
[1, 2, 3].reduce((acc, n) => acc + n, 0); // 6
\`\`\``,
    },
    {
      q: "Spread, rest y destructuring",
      a: `**Spread** (\`...\`) expande: \`[...a, ...b]\`. **Rest** agrupa: \`function f(...args){}\`. **Destructuring** extrae: \`const {id, name} = user\`, \`const [first] = arr\`.`,
    },
    {
      q: "Debounce vs throttle",
      a: `**Debounce**: espera a que pasen N ms *sin* eventos para ejecutar (búsqueda mientras escribes). **Throttle**: ejecuta como máximo una vez cada N ms (scroll/resize).`,
    },
  ],
};