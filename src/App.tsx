import { useState } from "react";
import { TOPICS } from "./data";
import { TopicTabs } from "./components/TopicTabs";
import { Toolbar } from "./components/Toolbar";
import { StudyList } from "./components/StudyCard";
import { QuizMode } from "./components/QuizMode";

type Mode = "study" | "quiz";

export default function App() {
  const [tech, setTech] = useState("js");
  const [mode, setMode] = useState<Mode>("study");
  const [query, setQuery] = useState("");

  const topic = TOPICS[tech];
  const accent = topic.color;

  const items = topic.items.filter((it) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      it.q.toLowerCase().includes(q) || it.a.toLowerCase().includes(q)
    );
  });

  const reset = (t: string) => {
    setTech(t);
    setQuery("");
  };

  return (
    <div
      className="min-h-screen bg-bg text-ink font-sans"
      style={{ ["--accent" as string]: accent }}
    >
      <div className="max-w-[1000px] mx-auto px-[18px] pt-8 pb-[70px]">
        {/* Header */}
        <div className="font-mono text-[0.72rem] tracking-[0.2em] uppercase text-dim flex items-center gap-[10px] mb-[10px]">
          <span
            className="w-[7px] h-[7px] rounded-full"
            style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
          />
          {topic.name} · prep de entrevista
        </div>
        <h1 className="font-mono font-extrabold text-[clamp(1.8rem,5vw,2.8rem)] tracking-[-0.02em] leading-[1.05]">
          Web UI Developer<span style={{ color: accent }}>_</span>
        </h1>
        <p className="text-muted mt-3 max-w-[58ch] text-[0.95rem] leading-[1.6]">
          Conceptos core para repasar. Cambia de tecnología, abre cada tarjeta
          para estudiar, o usa el{" "}
          <strong className="text-ink">modo quiz</strong> para auto-evaluarte
          con flashcards.
        </p>

        <TopicTabs active={tech} onSelect={reset} />

        <Toolbar
          query={query}
          mode={mode}
          accent={accent}
          onQuery={(v) => setQuery(v)}
          onMode={(m) => setMode(m)}
        />

        <div className="font-mono text-[0.75rem] text-dim mb-[14px]">
          {items.length} concepto{items.length !== 1 ? "s" : ""} · {topic.name}
        </div>

        {mode === "study" ? (
          <StudyList items={items} accent={accent} />
        ) : (
          <QuizMode
            key={tech}
            items={items}
            accent={accent}
            topicName={topic.name}
          />
        )}

        <div className="mt-10 pt-5 border-t border-border font-mono text-[0.74rem] text-dim text-center">
          Buena suerte hoy 🚀 · en quiz navega con ← → · revela con espacio
        </div>
      </div>
    </div>
  );
}