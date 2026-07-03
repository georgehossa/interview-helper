import type { Topic } from "../types";

export const node: Topic = {
  key: "node",
  name: "Node.js",
  color: "#8cc84b",
  items: [
    {
      q: { es: "¿Qué es Node.js?", en: "What is Node.js?" },
      a: {
        es: `**Node.js** es un entorno de ejecución que corre JavaScript **fuera del navegador**, construido sobre el motor **V8** de Chrome. Permite usar JS en el servidor: APIs, herramientas de build, CLIs. Es **single-threaded**, *event-driven* y de **I/O no bloqueante**, lo que lo hace eficiente para apps con mucha entrada/salida (red, archivos) y muchas conexiones concurrentes.`,
        en: `**Node.js** is a runtime that runs JavaScript **outside the browser**, built on Chrome's **V8** engine. It lets you use JS on the server: APIs, build tools, CLIs. It is **single-threaded**, *event-driven* and uses **non-blocking I/O**, which makes it efficient for I/O-heavy apps (network, files) and many concurrent connections.`,
      },
    },
    {
      q: {
        es: "I/O no bloqueante y libuv",
        en: "Non-blocking I/O and libuv",
      },
      a: {
        es: `Node no se queda *esperando* (bloqueado) en operaciones lentas como leer un archivo o una petición de red: las delega y sigue ejecutando; cuando terminan, corre su callback. Por debajo, la librería **libuv** aporta el event loop y un **thread pool** para tareas que el sistema no resuelve de forma asíncrona (parte del acceso a disco, criptografía).

\`\`\`js
const fs = require('fs');
fs.readFile('a.txt', (err, data) => {
  // se ejecuta luego, sin bloquear
});
console.log('sigo corriendo');
\`\`\``,
        en: `Node doesn't *wait* (block) on slow operations like reading a file or a network request: it delegates them and keeps running; when they finish, it runs the callback. Under the hood, the **libuv** library provides the event loop and a **thread pool** for tasks the OS doesn't resolve asynchronously (some disk access, crypto).

\`\`\`js
const fs = require('fs');
fs.readFile('a.txt', (err, data) => {
  // runs later, without blocking
});
console.log('still running');
\`\`\``,
      },
    },
    {
      q: {
        es: "Event loop de Node (fases)",
        en: "Node's event loop (phases)",
      },
      a: {
        es: `El event loop de Node (vía libuv) procesa callbacks en **fases**, en orden: *timers* (setTimeout) → *pending* → *poll* (I/O) → *check* (setImmediate) → *close*. Entre fases se vacían las microtasks, con dos colas de máxima prioridad: \`process.nextTick()\` primero y luego las Promises. Por eso en Node hay matices que no existen en el navegador, como la diferencia entre \`setImmediate()\` y \`setTimeout(…,0)\`.`,
        en: `Node's event loop (via libuv) processes callbacks in **phases**, in order: *timers* (setTimeout) → *pending* → *poll* (I/O) → *check* (setImmediate) → *close*. Between phases, microtasks are drained, with two maximum-priority queues: \`process.nextTick()\` first, then Promises. That's why Node has nuances that don't exist in the browser, like the difference between \`setImmediate()\` and \`setTimeout(…,0)\`.`,
      },
    },
    {
      q: {
        es: "Módulos: CommonJS vs ESM",
        en: "Modules: CommonJS vs ESM",
      },
      a: {
        es: `**CommonJS** (tradicional en Node): \`const x = require('mod')\` y \`module.exports = …\`, carga síncrona. **ES Modules** (estándar moderno): \`import\` / \`export\`, estático y asíncrono. Se activa ESM con \`'type': 'module'\` en package.json o la extensión \`.mjs\`.

\`\`\`js
// CommonJS
const fs = require('fs');
module.exports = miFn;

// ES Modules
import fs from 'fs';
export default miFn;
\`\`\``,
        en: `**CommonJS** (traditional in Node): \`const x = require('mod')\` and \`module.exports = …\`, synchronous loading. **ES Modules** (modern standard): \`import\` / \`export\`, static and asynchronous. ESM is enabled with \`'type': 'module'\` in package.json or the \`.mjs\` extension.

\`\`\`js
// CommonJS
const fs = require('fs');
module.exports = myFn;

// ES Modules
import fs from 'fs';
export default myFn;
\`\`\``,
      },
    },
    {
      q: { es: "npm y package.json", en: "npm and package.json" },
      a: {
        es: `**npm** es el gestor de paquetes de Node. \`package.json\` describe el proyecto:
- **dependencies**: lo que la app necesita en producción.
- **devDependencies**: solo para desarrollo (tests, linters, bundlers).
- **scripts**: comandos como \`npm run build\`.

Las versiones usan **semver** (\`^1.2.0\` = compatibles con 1.x). \`package-lock.json\` fija las versiones exactas instaladas para builds reproducibles.`,
        en: `**npm** is Node's package manager. \`package.json\` describes the project:
- **dependencies**: what the app needs in production.
- **devDependencies**: development only (tests, linters, bundlers).
- **scripts**: commands like \`npm run build\`.

Versions use **semver** (\`^1.2.0\` = compatible with 1.x). \`package-lock.json\` pins the exact installed versions for reproducible builds.`,
      },
    },
    {
      q: {
        es: "process y variables de entorno",
        en: "process and environment variables",
      },
      a: {
        es: `El objeto global \`process\` da info y control del proceso: \`process.env\` (variables de entorno, p. ej. \`process.env.NODE_ENV\`), \`process.argv\` (argumentos de la CLI), \`process.cwd()\` (directorio actual). Las **variables de entorno** son la forma estándar de pasar configuración y secretos sin escribirlos en el código.`,
        en: `The global \`process\` object gives info and control over the process: \`process.env\` (environment variables, e.g. \`process.env.NODE_ENV\`), \`process.argv\` (CLI arguments), \`process.cwd()\` (current directory). **Environment variables** are the standard way to pass configuration and secrets without hardcoding them.`,
      },
    },
    {
      q: { es: "EventEmitter", en: "EventEmitter" },
      a: {
        es: `El patrón **publicador/suscriptor** está en el corazón de Node. \`EventEmitter\` permite emitir eventos con nombre y reaccionar a ellos; muchos objetos del core (streams, servidores HTTP) lo extienden.

\`\`\`js
const EventEmitter = require('events');
const bus = new EventEmitter();
bus.on('msg', (d) => console.log(d));
bus.emit('msg', 'hola');
\`\`\``,
        en: `The **publisher/subscriber** pattern is at the heart of Node. \`EventEmitter\` lets you emit named events and react to them; many core objects (streams, HTTP servers) extend it.

\`\`\`js
const EventEmitter = require('events');
const bus = new EventEmitter();
bus.on('msg', (d) => console.log(d));
bus.emit('msg', 'hello');
\`\`\``,
      },
    },
    {
      q: { es: "Streams y Buffers", en: "Streams and Buffers" },
      a: {
        es: `Los **streams** procesan datos en *chunks* a medida que llegan, sin cargar todo en memoria — clave para archivos grandes o respuestas HTTP. Tipos: **Readable**, **Writable**, **Duplex** y **Transform**. Un **Buffer** representa datos binarios en bruto (bytes), útil para archivos, red o cifrado donde no aplica el texto.`,
        en: `**Streams** process data in *chunks* as it arrives, without loading everything into memory — key for large files or HTTP responses. Types: **Readable**, **Writable**, **Duplex** and **Transform**. A **Buffer** represents raw binary data (bytes), useful for files, network, or crypto where text doesn't apply.`,
      },
    },
    {
      q: { es: "Express y middleware", en: "Express and middleware" },
      a: {
        es: `**Express** es el framework web minimalista más usado en Node. Su pieza central es el **middleware**: funciones \`(req, res, next)\` que se ejecutan en cadena para procesar la petición (parsear el body, autenticación, logging) antes de responder. Se llama \`next()\` para pasar al siguiente.

\`\`\`js
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next(); // continúa la cadena
});
\`\`\``,
        en: `**Express** is the most popular minimalist web framework in Node. Its core piece is **middleware**: functions \`(req, res, next)\` that run in a chain to process the request (parse the body, auth, logging) before responding. Call \`next()\` to pass to the next one.

\`\`\`js
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next(); // continues the chain
});
\`\`\``,
      },
    },
    {
      q: { es: "Node vs navegador", en: "Node vs browser" },
      a: {
        es: `Mismo lenguaje, entornos distintos:
- **Navegador**: hay \`window\`, \`document\`, el DOM y APIs web; no hay acceso al sistema de archivos.
- **Node**: hay \`process\`, \`require\`, \`Buffer\`, \`global\` y módulos como \`fs\`, \`http\`, \`path\`; no hay DOM ni \`window\`.

Por eso el código que toca el DOM no corre en Node, y el que lee archivos no corre en el navegador.`,
        en: `Same language, different environments:
- **Browser**: has \`window\`, \`document\`, the DOM and web APIs; no file system access.
- **Node**: has \`process\`, \`require\`, \`Buffer\`, \`global\` and modules like \`fs\`, \`http\`, \`path\`; no DOM or \`window\`.

That's why DOM-touching code doesn't run in Node, and file-reading code doesn't run in the browser.`,
      },
    },
  ],
};