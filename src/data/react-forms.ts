import type { Topic } from "../types";

export const reactForms: Topic = {
  key: "react-forms",
  name: "React Forms",
  color: "#8b5cf6",
  items: [
    {
      q: {
        es: "Formularios controlados vs no controlados",
        en: "Controlled vs uncontrolled forms",
      },
      a: {
        es: `En un formulario **controlado**, React posee el estado de cada campo a través de \`value\` y \`onChange\`. Es predecible, fácil de validar y sincronizar.

En un formulario **no controlado**, el DOM mantiene el valor. Se lee con \`ref\` o al enviar con \`FormData\`, lo que reduce re-renders pero dificulta la validación en tiempo real.

\`\`\`tsx
// Controlado
const [email, setEmail] = useState("");
<input value={email} onChange={(e) => setEmail(e.target.value)} />;

// No controlado
const ref = useRef<HTMLInputElement>(null);
<form onSubmit={() => console.log(ref.current?.value)}>
  <input ref={ref} />
</form>;
\`\`\``,
        en: `In a **controlled** form, React owns the state of each field through \`value\` and \`onChange\`. It's predictable, easy to validate, and synchronize.

In an **uncontrolled** form, the DOM keeps the value. You read it with \`ref\` or on submit with \`FormData\`, which reduces re-renders but makes real-time validation harder.

\`\`\`tsx
// Controlled
const [email, setEmail] = useState("");
<input value={email} onChange={(e) => setEmail(e.target.value)} />;

// Uncontrolled
const ref = useRef<HTMLInputElement>(null);
<form onSubmit={() => console.log(ref.current?.value)}>
  <input ref={ref} />
</form>;
\`\`\``,
      },
    },
    {
      q: {
        es: "Manejo de estado de formularios con useState",
        en: "Form state management with useState",
      },
      a: {
        es: `Para formularios pequeños, un objeto de estado central funciona bien.

\`\`\`tsx
const [form, setForm] = useState({ name: "", email: "" });

const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};
\`\`\`

Claves:
- Usa \`name\` en cada input para poder escalarlo.
- Nunca mutas el estado anterior: usa spread.
- Considera extraer la lógica a un custom hook \`useForm\` cuando crezca.`,
        en: `For small forms, a central state object works well.

\`\`\`tsx
const [form, setForm] = useState({ name: "", email: "" });

const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};
\`\`\`

Key points:
- Use \`name\` on each input to make it scalable.
- Never mutate previous state: use spread.
- Consider extracting logic into a custom \`useForm\` hook as it grows.`,
      },
    },
    {
      q: {
        es: "React Hook Form",
        en: "React Hook Form",
      },
      a: {
        es: `React Hook Form es la librería más popular para formularios en React. Basada en inputs **no controlados**, minimiza re-renders y delega la validación en reglas declarativas.

\`\`\`tsx
import { useForm } from "react-hook-form";

function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })} />
      {errors.email && <span>Email inválido</span>}
      <button type="submit">Enviar</button>
    </form>
  );
}
\`\`\``,
        en: `React Hook Form is the most popular form library for React. It's based on **uncontrolled** inputs, minimizes re-renders, and delegates validation to declarative rules.

\`\`\`tsx
import { useForm } from "react-hook-form";

function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })} />
      {errors.email && <span>Invalid email</span>}
      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\``,
      },
    },
    {
      q: {
        es: "register y Controller en React Hook Form",
        en: "register and Controller in React Hook Form",
      },
      a: {
        es: `**\`register\`** conecta inputs nativos directamente. Devuelve \`name\`, \`ref\`, y manejadores de eventos.

\`\`\`tsx
<input {...register("username", { required: "Campo obligatorio" })} />
\`\`\`

**\`Controller\`** se usa cuando el input es un componente de terceros o de UI controlado (MUI, react-select, date pickers) que no expone un ref nativo.

\`\`\`tsx
<Controller
  name="country"
  control={control}
  rules={{ required: true }}
  render={({ field }) => (
    <Select {...field} options={countries} />
  )}
/>
\`\`\``,
        en: `**\`register\`** connects native inputs directly. It returns \`name\`, \`ref\`, and event handlers.

\`\`\`tsx
<input {...register("username", { required: "Field is required" })} />
\`\`\`

**\`Controller\`** is used when the input is a third-party or controlled UI component (MUI, react-select, date pickers) that doesn't expose a native ref.

\`\`\`tsx
<Controller
  name="country"
  control={control}
  rules={{ required: true }}
  render={({ field }) => (
    <Select {...field} options={countries} />
  )}
/>
\`\`\``,
      },
    },
    {
      q: {
        es: "Validación de formularios",
        en: "Form validation",
      },
      a: {
        es: `Estrategias comunes:

1. **Validación nativa HTML5** (\`required\`, \`minLength\`, \`type="email"\`). Simple pero limitada.
2. **Validación manual** en \`onChange\` / \`onSubmit\`. Da control total pero genera más código.
3. **Validación con esquemas** usando zod, yup o joi junto a resolvers de React Hook Form.

\`\`\`tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  age: z.number().min(18),
});

const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) });
\`\`\``,
        en: `Common strategies:

1. **Native HTML5 validation** (\`required\`, \`minLength\`, \`type="email"\`). Simple but limited.
2. **Manual validation** in \`onChange\` / \`onSubmit\`. Full control but more code.
3. **Schema validation** using zod, yup, or joi with React Hook Form resolvers.

\`\`\`tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  age: z.number().min(18),
});

const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) });
\`\`\``,
      },
    },
    {
      q: {
        es: "Validación síncrona vs asíncrona",
        en: "Synchronous vs asynchronous validation",
      },
      a: {
        es: `**Síncrona**: se ejecuta al instante. Útil para reglas locales como formato o longitud mínima.

**Asíncrona**: consulta al servidor (por ejemplo, verificar si un username está disponible). Puede causar carreras si no se cancelan peticiones previas.

\`\`\`tsx
const validateUsername = async (value: string) => {
  const res = await fetch(\`/api/check-username?user=\${value}\`);
  const { available } = await res.json();
  return available || "Nombre de usuario no disponible";
};

<input {...register("username", { validate: validateUsername })} />
\`\`\`

En React Hook Form, \`validate\` puede devolver una promesa.`,
        en: `**Synchronous**: runs instantly. Useful for local rules like format or minimum length.

**Asynchronous**: queries the server (e.g., checking username availability). Can cause race conditions if previous requests aren't cancelled.

\`\`\`tsx
const validateUsername = async (value: string) => {
  const res = await fetch(\`/api/check-username?user=\${value}\`);
  const { available } = await res.json();
  return available || "Username not available";
};

<input {...register("username", { validate: validateUsername })} />
\`\`\`

In React Hook Form, \`validate\` can return a promise.`,
      },
    },
    {
      q: {
        es: "Envío de formularios (submit)",
        en: "Form submission",
      },
      a: {
        es: `El evento \`onSubmit\` del formulario se dispara al pulsar Enter o un botón \`type="submit"\`. Es el lugar correcto para validar y enviar datos.

\`\`\`tsx
<form
  onSubmit={async (e) => {
    e.preventDefault();
    if (!isValid) return;
    await save(form);
  }}
>
  <button type="submit" disabled={isSubmitting}>
    {isSubmitting ? "Guardando..." : "Guardar"}
  </button>
</form>
\`\`\`

React Hook Form abstrae esto con \`handleSubmit(fnValida, fnError)\`. Evita usar \`onClick\` en el botón para enviar.`,
        en: `The form's \`onSubmit\` event fires when pressing Enter or a \`type="submit"\` button. This is the right place to validate and send data.

\`\`\`tsx
<form
  onSubmit={async (e) => {
    e.preventDefault();
    if (!isValid) return;
    await save(form);
  }}
>
  <button type="submit" disabled={isSubmitting}>
    {isSubmitting ? "Saving..." : "Save"}
  </button>
</form>
\`\`\`

React Hook Form abstracts this with \`handleSubmit(onValid, onError)\`. Avoid using \`onClick\` on the button to submit.`,
      },
    },
    {
      q: {
        es: "Campos dinámicos (arrays)",
        en: "Dynamic fields (arrays)",
      },
      a: {
        es: `Para formularios con múltiples entradas repetibles (líneas de factura, teléfonos), React Hook Form provee \`useFieldArray\`.

\`\`\`tsx
const { control, register } = useForm({
  defaultValues: { phones: [{ number: "" }] },
});
const { fields, append, remove } = useFieldArray({ control, name: "phones" });

return (
  <>
    {fields.map((field, index) => (
      <div key={field.id}>
        <input {...register(\`phones.\${index}.number\`)} />
        <button type="button" onClick={() => remove(index)}>Eliminar</button>
      </div>
    ))}
    <button type="button" onClick={() => append({ number: "" })}>Agregar</button>
  </>
);
\`\`\``,
        en: `For forms with repeatable multiple entries (invoice lines, phones), React Hook Form provides \`useFieldArray\`.

\`\`\`tsx
const { control, register } = useForm({
  defaultValues: { phones: [{ number: "" }] },
});
const { fields, append, remove } = useFieldArray({ control, name: "phones" });

return (
  <>
    {fields.map((field, index) => (
      <div key={field.id}>
        <input {...register(\`phones.\${index}.number\`)} />
        <button type="button" onClick={() => remove(index)}>Remove</button>
      </div>
    ))}
    <button type="button" onClick={() => append({ number: "" })}>Add</button>
  </>
);
\`\`\``,
      },
    },
    {
      q: {
        es: "FormData API",
        en: "FormData API",
      },
      a: {
        es: `\`FormData\` es una API del navegador para leer formularios no controlados o enviar archivos.

\`\`\`tsx
<form
  onSubmit={(e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
  }}
>
  <input name="email" />
</form>
\`\`\`

Ventajas:
- No requiere estado React para cada campo.
- Funciona bien con archivos.
- Útil para migraciones progresivas o formularios simples.

Desventajas:
- Validación en tiempo real más difícil.
- Todos los valores llegan como strings.`,
        en: `\`FormData\` is a browser API for reading uncontrolled forms or sending files.

\`\`\`tsx
<form
  onSubmit={(e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
  }}
>
  <input name="email" />
</form>
\`\`\`

Advantages:
- No React state needed for each field.
- Works well with files.
- Useful for progressive migrations or simple forms.

Disadvantages:
- Harder real-time validation.
- All values arrive as strings.`,
      },
    },
    {
      q: {
        es: "Inputs de archivos",
        en: "File inputs",
      },
      a: {
        es: `Los inputs de tipo \`file\` son de solo lectura en React, por lo que no pueden ser completamente controlados. Se combina \`onChange\` con estado o FormData.

\`\`\`tsx
const [file, setFile] = useState<File | null>(null);

<input
  type="file"
  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
/>;

// Envío
const formData = new FormData();
if (file) formData.append("avatar", file);
await fetch("/api/upload", { method: "POST", body: formData });
\`\`\``,
        en: `\`file\` inputs are read-only in React, so they can't be fully controlled. Combine \`onChange\` with state or FormData.

\`\`\`tsx
const [file, setFile] = useState<File | null>(null);

<input
  type="file"
  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
/>;

// Submission
const formData = new FormData();
if (file) formData.append("avatar", file);
await fetch("/api/upload", { method: "POST", body: formData });
\`\`\``,
      },
    },
    {
      q: {
        es: "Accesibilidad en formularios",
        en: "Form accessibility",
      },
      a: {
        es: `Buenas prácticas:

- Asocia cada \`<label>\` con su input mediante \`htmlFor\` y \`id\`.
- Usa \`aria-describedby\` para enlazar mensajes de error.
- Marca errores con \`aria-invalid="true"\`.
- Permite enviar con \`Enter\`.
- Muestra mensajes de error claros y cercanos al campo.

\`\`\`tsx
<label htmlFor="email">Email</label>
<input
  id="email"
  aria-invalid={!!errors.email}
  aria-describedby="email-error"
  {...register("email", { required: true })}
/>
{errors.email && <span id="email-error">{errors.email.message}</span>}
\`\`\``,
        en: `Best practices:

- Associate each \`<label>\` with its input using \`htmlFor\` and \`id\`.
- Use \`aria-describedby\` to link error messages.
- Mark errors with \`aria-invalid="true"\`.
- Allow submission with \`Enter\`.
- Show clear error messages near the field.

\`\`\`tsx
<label htmlFor="email">Email</label>
<input
  id="email"
  aria-invalid={!!errors.email}
  aria-describedby="email-error"
  {...register("email", { required: true })}
/>
{errors.email && <span id="email-error">{errors.email.message}</span>}
\`\`\``,
      },
    },
    {
      q: {
        es: "Performance de formularios",
        en: "Form performance",
      },
      a: {
        es: `Formularios controlados con muchos campos pueden re-renderizar demasiado. Estrategias:

1. **Descomponer** el formulario en subcomponentes. Si el estado está bien colocado, solo cambia lo necesario.
2. **React Hook Form** evita re-renders porque no guarda cada pulsación en el estado de React.
3. **Memoizar** componentes con \`React.memo\` si reciben callbacks generadas por \`useCallback\`.
4. **Evitar validaciones síncronas costosas** en cada \`onChange\`; usa \`onBlur\` o debounce.
5. **No renderizar la lista de errores completa** en cada cambio; usa componentes aislados por campo.`,
        en: `Controlled forms with many fields can re-render too much. Strategies:

1. **Decompose** the form into subcomponents. If state is well placed, only what needs to change re-renders.
2. **React Hook Form** avoids re-renders because it doesn't store every keystroke in React state.
3. **Memoize** components with \`React.memo\` if they receive callbacks created with \`useCallback\`.
4. **Avoid expensive synchronous validations** on every \`onChange\`; use \`onBlur\` or debounce.
5. **Don't render the full error list** on every change; use isolated components per field.`,
      },
    },
    {
      q: {
        es: "Formik vs React Hook Form",
        en: "Formik vs React Hook Form",
      },
      a: {
        es: `Ambas librerías simplifican formularios complejos, pero con filosofías distintas:

| Aspecto | Formik | React Hook Form |
|---|---|---|
| Modelo | Inputs controlados | Inputs no controlados |
| Re-renders | Más frecuentes | Mínimos |
| Validación | yup, zod, manual | yup, zod, resolver nativo |
| API | Más explícita | Más declarativa |
| Tamaño | Mayor | Más ligero |

Hoy React Hook Form suele preferirse por rendimiento y menor boilerplate, aunque Formik sigue siendo común en bases de código antiguas.`,
        en: `Both libraries simplify complex forms, but with different philosophies:

| Aspect | Formik | React Hook Form |
|---|---|---|
| Model | Controlled inputs | Uncontrolled inputs |
| Re-renders | More frequent | Minimal |
| Validation | yup, zod, manual | yup, zod, native resolver |
| API | More explicit | More declarative |
| Size | Larger | Lighter |

Today React Hook Form is usually preferred for performance and less boilerplate, though Formik remains common in older codebases.`,
      },
    },
    {
      q: {
        es: "defaultValues y reset",
        en: "defaultValues and reset",
      },
      a: {
        es: `Proporcionar \`defaultValues\` evita que React Hook Form trate los campos como no definidos y mejora la experiencia de edición.

\`\`\`tsx
const { reset, handleSubmit } = useForm({
  defaultValues: { name: "", active: true },
});

// Cargar datos para editar
useEffect(() => {
  if (user) reset(user);
}, [user, reset]);
\`\`\`

- \`reset\` actualiza todos los valores y el estado de validación.
- También existe \`resetField\` y \`setValue\` para actualizaciones parciales.
- \`setValue\` puede omitir la revalidación con \`{ shouldValidate: false }\`.`,
        en: `Providing \`defaultValues\` prevents React Hook Form from treating fields as undefined and improves the editing experience.

\`\`\`tsx
const { reset, handleSubmit } = useForm({
  defaultValues: { name: "", active: true },
});

// Load data for editing
useEffect(() => {
  if (user) reset(user);
}, [user, reset]);
\`\`\`

- \`reset\` updates all values and validation state.
- \`resetField\` and \`setValue\` exist for partial updates.
- \`setValue\` can skip revalidation with \`{ shouldValidate: false }\`.`,
      },
    },
  ],
};
