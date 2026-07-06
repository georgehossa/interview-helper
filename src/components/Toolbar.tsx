import type { Lang, Mode } from "../types";

interface ToolbarProps {
  query: string;
  mode: Mode;
  accent: string;
  lang: Lang;
  langs: Lang[];
  langLabel: Record<Lang, string>;
  onQuery: (v: string) => void;
  onMode: (m: Mode) => void;
  onLang: (l: Lang) => void;
}

export function Toolbar({
  query,
  mode,
  accent,
  lang,
  langs,
  langLabel,
  onQuery,
  onMode,
  onLang,
}: ToolbarProps) {
  const modes: Array<{ id: Mode; label: string }> = [
    { id: "study", label: lang === "es" ? "Estudio" : "Study" },
    { id: "quiz", label: "Quiz" },
    { id: "ai", label: "AI" },
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-[18px]">
      <div className="flex-1 min-w-[200px] flex items-center gap-[10px] bg-surface border border-border rounded-[10px] px-[14px] py-[10px]">
        <span className="text-dim">⌕</span>
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder={lang === "es" ? "Buscar concepto…" : "Search concept…"}
          className="flex-1 bg-transparent border-none outline-none text-ink font-sans text-[0.92rem]"
        />
      </div>
      <div className="flex bg-surface border border-border rounded-[10px] p-1 gap-1">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => onMode(m.id)}
            className="font-mono text-[0.78rem] font-semibold py-[7px] px-[14px] rounded-[7px] cursor-pointer border-none transition-all duration-150"
            style={{
              background: mode === m.id ? accent : "transparent",
              color: mode === m.id ? "#0e1320" : "#8a94ad",
            }}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div className="flex bg-surface border border-border rounded-[10px] p-1 gap-1">
        {langs.map((l) => (
          <button
            key={l}
            onClick={() => onLang(l)}
            className="font-mono text-[0.78rem] font-semibold py-[7px] px-[14px] rounded-[7px] cursor-pointer border-none transition-all duration-150"
            style={{
              background: lang === l ? accent : "transparent",
              color: lang === l ? "#0e1320" : "#8a94ad",
            }}
          >
            {langLabel[l]}
          </button>
        ))}
      </div>
    </div>
  );
}