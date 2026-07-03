# AGENTS.md — Interview Helper

A study/quiz web app for preparing tech interviews. Built with **Vite + React + TypeScript + Tailwind CSS**. Answers are authored in Markdown and rendered with `react-markdown` + `rehype-highlight`.

## Project layout

```
src/
├─ App.tsx                  # top-level state (topic, mode, query) + layout
├─ types.ts                # Card and Topic interfaces
├─ data/
│   ├─ index.ts             # TOPICS map + ORDER array (hero registry)
│   ├─ javascript.ts        # one file per topic
│   └─ … (typescript, node, apis, react, nextjs, react-native, html, css)
├─ components/
│   ├─ TopicTabs.tsx        # topic pill row
│   ├─ Toolbar.tsx          # search input + Estudio/Quiz toggle
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
  q: "Question text (plain text)",
  a: `Answer in **Markdown**. Use lists, \`inline code\`, and fenced blocks:

\`\`\`ts
const x: number = 1;
\`\`\`
`,
}
```

Rules:
- `q` is plain text (no Markdown).
- `a` is a Markdown string. Use template literals (backticks) so you can write multi-line content.
- For code, use fenced blocks with a language tag: ` ```js `, ` ```ts `, ` ```tsx `, ` ```graphql `, etc. Syntax highlighting is automatic — **never write manual `<span class="k">` tags**.
- Use `**bold**`, `-` bullet lists, and `` `inline code` `` for emphasis. Avoid raw HTML.

### Add a new topic

1. Create `src/data/<name>.ts` exporting a `Topic`:

   ```ts
   import type { Topic } from "../types";

   export const myTopic: Topic = {
     key: "mt",
     name: "My Topic",
     color: "#aabbcc", // accent color, drives borders/dots/progress bar
     items: [/* Card[] */],
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
- Do not edit the original `guia-entrevista-ui.jsx` — it has been removed. The current app is the source of truth.
- Keep the public contract in `src/types.ts` (`Card`, `Topic`) stable; components depend on it.