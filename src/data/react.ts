import type { Topic } from "../types";

export const react: Topic = {
  key: "react",
  name: "React",
  color: "#61dafb",
  items: [
    {
      q: "Componentes y props",
      a: `Un componente es una función que recibe **props** (entrada inmutable de solo lectura) y retorna JSX. Los props fluyen de padre a hijo (*one-way data flow*). Para comunicar de hijo a padre se pasan callbacks como props.`,
    },
    {
      q: "Virtual DOM y reconciliación",
      a: `React mantiene una representación en memoria del UI (**Virtual DOM**). En cada render compara el árbol nuevo con el anterior (**diffing**) y aplica solo los cambios mínimos al DOM real, que es lo costoso.`,
    },
    {
      q: "Keys en listas",
      a: `La \`key\` identifica de forma estable cada elemento de una lista para que la reconciliación sepa qué se movió, agregó o quitó. Debe ser **única y estable** (un id), nunca el índice si la lista se reordena o filtra.`,
    },
    {
      q: "useState",
      a: `Declara estado local. Cambiarlo re-renderiza el componente.

\`\`\`jsx
const [count, setCount] = useState(0);
setCount(c => c + 1); // updater funcional
\`\`\`

Usa la forma de función cuando el nuevo estado depende del anterior.`,
    },
    {
      q: "useEffect",
      a: `Ejecuta efectos secundarios (fetch, suscripciones, timers) tras el render. El **array de dependencias** controla cuándo corre:
- \`[]\`: solo al montar.
- \`[x]\`: cuando \`x\` cambia.
- sin array: en cada render.

El \`return\` es la función de **cleanup**.`,
    },
    {
      q: "useMemo y useCallback",
      a: `Optimizaciones. **useMemo** memoriza un *valor* calculado; **useCallback** memoriza una *función*. Ambos recalculan solo si cambian sus dependencias. No abuses de ellos.`,
    },
    {
      q: "useRef",
      a: `Devuelve un objeto mutable \`{current}\` que **persiste entre renders sin causarlos**. Usos: referenciar nodos del DOM, guardar valores que no deben re-renderizar (id de timers, valor previo).`,
    },
    {
      q: "useContext",
      a: `Lee un valor de un \`Context\` sin pasar props por todos los niveles (*prop drilling*). Ideal para tema, usuario autenticado, idioma. Para estado complejo se combina con \`useReducer\`.`,
    },
    {
      q: "Componentes controlados",
      a: `Un input es **controlado** cuando su valor lo dicta el estado de React (\`value={x}\` + \`onChange\`). React es la única fuente de verdad. **No controlado**: el DOM mantiene el valor y se lee con un ref.`,
    },
    {
      q: "Lifting state up",
      a: `Cuando dos hermanos necesitan compartir estado, se **sube** al ancestro común más cercano y se pasa hacia abajo por props. Evita duplicar y desincronizar estado.`,
    },
    {
      q: "Reglas de los Hooks",
      a: `- Solo se llaman en el **nivel superior** — nunca dentro de condicionales, loops o funciones anidadas.
- Solo en componentes de función o hooks personalizados.

Garantiza que el orden de los hooks sea estable entre renders.`,
    },
    {
      q: "Custom hooks",
      a: `Funciones que empiezan por \`use\` y componen otros hooks para reutilizar lógica con estado (\`useFetch\`, \`useToggle\`). Comparten *lógica*, no estado: cada componente obtiene su propia instancia.`,
    },
    {
      q: "HOC (Higher-Order Components)",
      a: `Un **HOC** es una función que **recibe un componente y devuelve otro componente** con funcionalidad añadida. Es un patrón para reutilizar lógica transversal (auth, logging, datos) entre varios componentes.

\`\`\`jsx
function withAuth(Component) {
  return (props) => {
    const user = useUser();
    if (!user) return <Login />;
    return <Component {...props} user={user} />;
  };
}
const Privado = withAuth(Dashboard);
\`\`\`

Convención: el nombre empieza por \`with\` (\`withRouter\`, \`withTheme\`). Hoy los **custom hooks** cubren la mayoría de estos casos de forma más simple, pero los HOC siguen apareciendo en librerías y código existente — por eso es buena pregunta de entrevista.`,
    },
    {
      q: "Funciones puras",
      a: `Una **función pura** cumple dos reglas:
- Con las mismas entradas, siempre devuelve la misma salida.
- No tiene **efectos secundarios**: no muta variables externas ni props, no escribe en el DOM, no hace llamadas de red.

React espera que tus componentes sean **puros durante el render**: dados los mismos props y estado, deben producir el mismo JSX sin mutar nada por fuera. Los efectos secundarios van en \`useEffect\` o en manejadores de eventos, nunca en el cuerpo del render.

\`\`\`js
// pura ✓
const doble = (n) => n * 2;

// impura ✗ — muta algo externo
let total = 0;
const suma = (n) => { total += n; };
\`\`\`

Beneficios: es predecible, fácil de testear y habilita optimizaciones como \`React.memo\`, que confía en que un mismo input produce un mismo output.`,
    },
  ],
};