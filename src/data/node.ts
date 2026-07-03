import type { Topic } from "../types";

export const node: Topic = {
  key: "node",
  name: "Node.js",
  color: "#8cc84b",
  items: [
    {
      q: "¿Qué es Node.js?",
      a: `**Node.js** es un entorno de ejecución que corre JavaScript **fuera del navegador**, construido sobre el motor **V8** de Chrome. Permite usar JS en el servidor: APIs, herramientas de build, CLIs. Es **single-threaded**, *event-driven* y de **I/O no bloqueante**, lo que lo hace eficiente para apps con mucha entrada/salida (red, archivos) y muchas conexiones concurrentes.`,
    },
    {
      q: "I/O no bloqueante y libuv",
      a: `Node no se queda *esperando* (bloqueado) en operaciones lentas como leer un archivo o una petición de red: las delega y sigue ejecutando; cuando terminan, corre su callback. Por debajo, la librería **libuv** aporta el event loop y un **thread pool** para tareas que el sistema no resuelve de forma asíncrona (parte del acceso a disco, criptografía).

\`\`\`js
const fs = require('fs');
fs.readFile('a.txt', (err, data) => {
  // se ejecuta luego, sin bloquear
});
console.log('sigo corriendo');
\`\`\``,
    },
    {
      q: "Event loop de Node (fases)",
      a: `El event loop de Node (vía libuv) procesa callbacks en **fases**, en orden: *timers* (setTimeout) → *pending* → *poll* (I/O) → *check* (setImmediate) → *close*. Entre fases se vacían las microtasks, con dos colas de máxima prioridad: \`process.nextTick()\` primero y luego las Promises. Por eso en Node hay matices que no existen en el navegador, como la diferencia entre \`setImmediate()\` y \`setTimeout(…,0)\`.`,
    },
    {
      q: "Módulos: CommonJS vs ESM",
      a: `**CommonJS** (tradicional en Node): \`const x = require('mod')\` y \`module.exports = …\`, carga síncrona. **ES Modules** (estándar moderno): \`import\` / \`export\`, estático y asíncrono. Se activa ESM con \`'type': 'module'\` en package.json o la extensión \`.mjs\`.

\`\`\`js
// CommonJS
const fs = require('fs');
module.exports = miFn;

// ES Modules
import fs from 'fs';
export default miFn;
\`\`\``,
    },
    {
      q: "npm y package.json",
      a: `**npm** es el gestor de paquetes de Node. \`package.json\` describe el proyecto:
- **dependencies**: lo que la app necesita en producción.
- **devDependencies**: solo para desarrollo (tests, linters, bundlers).
- **scripts**: comandos como \`npm run build\`.

Las versiones usan **semver** (\`^1.2.0\` = compatibles con 1.x). \`package-lock.json\` fija las versiones exactas instaladas para builds reproducibles.`,
    },
    {
      q: "process y variables de entorno",
      a: `El objeto global \`process\` da info y control del proceso: \`process.env\` (variables de entorno, p. ej. \`process.env.NODE_ENV\`), \`process.argv\` (argumentos de la CLI), \`process.cwd()\` (directorio actual). Las **variables de entorno** son la forma estándar de pasar configuración y secretos sin escribirlos en el código.`,
    },
    {
      q: "EventEmitter",
      a: `El patrón **publicador/suscriptor** está en el corazón de Node. \`EventEmitter\` permite emitir eventos con nombre y reaccionar a ellos; muchos objetos del core (streams, servidores HTTP) lo extienden.

\`\`\`js
const EventEmitter = require('events');
const bus = new EventEmitter();
bus.on('msg', (d) => console.log(d));
bus.emit('msg', 'hola');
\`\`\``,
    },
    {
      q: "Streams y Buffers",
      a: `Los **streams** procesan datos en *chunks* a medida que llegan, sin cargar todo en memoria — clave para archivos grandes o respuestas HTTP. Tipos: **Readable**, **Writable**, **Duplex** y **Transform**. Un **Buffer** representa datos binarios en bruto (bytes), útil para archivos, red o cifrado donde no aplica el texto.`,
    },
    {
      q: "Express y middleware",
      a: `**Express** es el framework web minimalista más usado en Node. Su pieza central es el **middleware**: funciones \`(req, res, next)\` que se ejecutan en cadena para procesar la petición (parsear el body, autenticación, logging) antes de responder. Se llama \`next()\` para pasar al siguiente.

\`\`\`js
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next(); // continúa la cadena
});
\`\`\``,
    },
    {
      q: "Node vs navegador",
      a: `Mismo lenguaje, entornos distintos:
- **Navegador**: hay \`window\`, \`document\`, el DOM y APIs web; no hay acceso al sistema de archivos.
- **Node**: hay \`process\`, \`require\`, \`Buffer\`, \`global\` y módulos como \`fs\`, \`http\`, \`path\`; no hay DOM ni \`window\`.

Por eso el código que toca el DOM no corre en Node, y el que lee archivos no corre en el navegador.`,
    },
  ],
};