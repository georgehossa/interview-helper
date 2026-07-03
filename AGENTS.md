# AGENTS.md — Interview Helper

A study/quiz web app for preparing tech interviews. Built with **Vite + React + TypeScript + Tailwind CSS**. Answers are authored in Markdown and rendered with `react-markdown` + `rehype-highlight`.

The app is **bilingual (Spanish + English)**. Each `Card` carries both language versions; the user toggles between them from the toolbar and the choice persists in `localStorage`.

## Project layout

```
src/
├─ App.tsx                  # top-level state (topic, mode, query, lang) + layout
├─ types.ts                # Card, Topic, Lang, LocalizedText interfaces
├─ i18n.ts                 # UI strings per language + LANG_LABEL
├─ data/
│   ├─ index.ts             # TOPICS map + ORDER array (hero registry)
│   ├─ javascript.ts        # one file per topic
│   └─ … (typescript, node, apis, react, nextjs, react-native, html, css,
│         system-design, design-patterns, react-patterns, architecture-patterns)
├─ components/
│   ├─ TopicTabs.tsx        # topic pill row
│   ├─ Toolbar.tsx          # search input + Estudio/Quiz toggle + ES/EN toggle
│   ├─ StudyCard.tsx        # collapsible card + StudyList container
│   ├─ QuizMode.tsx         # flashcard, progress bar, prev/next
│   └─ MarkdownAnswer.tsx   # react-markdown renderer (shared by study & quiz)
├─ hooks/
│   └─ useQuizKeyboard.ts   # Space reveals, ←/→ navigate
└─ index.css                # Tailwind base + hljs theme + prose-answer tweaks
```

## How to add or update content

This is the most common task — **only edit files in `src/data/`**. No component changes needed.

### Add a new card to an existing topic

Open `src/data/<topic>.ts` and append a new entry to the `items` array:

```ts
{
  q: {
    es: "Texto de la pregunta (texto plano)",
    en: "Question text (plain text)",
  },
  a: {
    es: `Respuesta en **Markdown**. Usa listas, \`código inline\`, y bloques cercados:

\`\`\`ts
const x: number = 1;
\`\`\`
`,
    en: `Answer in **Markdown**. Use lists, \`inline code\`, and fenced blocks:

\`\`\`ts
const x: number = 1;
\`\`\`
`,
  },
}
```

Rules:
- `q.es` / `q.en` are plain text (no Markdown).
- `a.es` / `a.en` are Markdown strings. Use template literals (backticks) so you can write multi-line content.
- For code, use fenced blocks with a language tag: ` ```js `, ` ```ts `, ` ```tsx `, ` ```graphql `, etc. Syntax highlighting is automatic — **never write manual `<span class="k">` tags**.
- Use `**bold**`, `-` bullet lists, and `` `inline code` `` for emphasis. Avoid raw HTML.
- **Both languages are mandatory.** If you only have one, copy it to the other or leave a `TODO` and merge later — do not drop one.

### Add a new topic

1. Create `src/data/<name>.ts` exporting a `Topic`:

   ```ts
   import type { Topic } from "../types";

   export const myTopic: Topic = {
     key: "mt",
     name: "My Topic",
     color: "#aabbcc", // accent color, drives borders/dots/progress bar
     items: [
       // Card[] — each card carries both es and en (see "Add a new card" above)
     ],
   };
   ```

2. Register it in `src/data/index.ts`:
   - Import the module.
   - Add an entry to the `TOPICS` record keyed by its `key`.
   - Add the `key` to the `ORDER` array (this controls the tab order in the UI).

### Change a topic's accent color

Edit the `color` field in the topic's data file. The CSS variable `--accent` and Tailwind utilities like `text-[var(--accent)]` propagate it automatically.

## Tooling

- Package manager: **pnpm**
- `pnpm dev` — start the dev server
- `pnpm build` — type-check and produce a production bundle in `dist/`
- `pnpm typecheck` — run `tsc --noEmit` only
- `pnpm preview` — serve the production build

## Conventions

- Spanish copy is used in the UI strings (Estudio, Quiz, "Buscar concepto…", footer). Keep this when adding UI text.
- Answers are written in Spanish; preserve tone when editing existing cards.
- All UI strings are duplicated per language in `src/i18n.ts`; if you add a new UI string, add it for both `es` and `en`.
- Do not edit the original `guia-entrevista-ui.jsx` — it has been removed. The current app is the source of truth.
- Keep the public contract in `src/types.ts` (`Card`, `Topic`) stable; components depend on it.