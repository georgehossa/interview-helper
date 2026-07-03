import { useEffect, useState } from "react";
import { TOPICS } from "./data";
import { TopicTabs } from "./components/TopicTabs";
import { Toolbar } from "./components/Toolbar";
import { StudyList } from "./components/StudyCard";
import { QuizMode } from "./components/QuizMode";
import { t, LANG_LABEL, LANGS } from "./i18n";
import type { Lang } from "./types";

type Mode = "study" | "quiz";

const LANG_KEY = "ih.lang";

function readLang(): Lang {
  const stored = localStorage.getItem(LANG_KEY);
  if (stored === "es" || stored === "en") return stored;
  return "es";
}

export default function App() {
  const [tech, setTech] = useState("js");
  const [mode, setMode] = useState<Mode>("study");
  const [query, setQuery] = useState("");
  const [lang, setLang] = useState<Lang>(readLang);

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const topic = TOPICS[tech];
  const accent = topic.color;
  const strings = t(lang);

  const items = topic.items.filter((it) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      it.q[lang].toLowerCase().includes(q) ||
      it.a[lang].toLowerCase().includes(q)
    );
  });

  const reset = (t: string) => {
    setTech(t);
    setQuery("");
  };

  const switchLang = (l: Lang) => {
    setLang(l);
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
          {topic.name} · {strings.prepLabel}
        </div>
        <h1 className="font-mono font-extrabold text-[clamp(1.8rem,5vw,2.8rem)] tracking-[-0.02em] leading-[1.05]">
          Web UI Developer<span style={{ color: accent }}>_</span>
        </h1>
        <p className="text-muted mt-3 max-w-[58ch] text-[0.95rem] leading-[1.6]">
          {strings.subtitle}{" "}
          <strong className="text-ink">{strings.subtitleEmph}</strong>{" "}
          {lang === "es"
            ? "para auto-evaluarte con flashcards."
            : "to self-assess with flashcards."}
        </p>

        <TopicTabs active={tech} onSelect={reset} />

        <Toolbar
          query={query}
          mode={mode}
          accent={accent}
          lang={lang}
          langs={LANGS}
          langLabel={LANG_LABEL}
          onQuery={(v) => setQuery(v)}
          onMode={(m) => setMode(m)}
          onLang={switchLang}
        />

        <div className="font-mono text-[0.75rem] text-dim mb-[14px]">
          {strings.conceptCount(items.length, topic.name)}
        </div>

        {mode === "study" ? (
          <StudyList items={items} accent={accent} lang={lang} />
        ) : (
          <QuizMode
            key={tech}
            items={items}
            accent={accent}
            topicName={topic.name}
            lang={lang}
          />
        )}

        <div className="mt-10 pt-5 border-t border-border font-mono text-[0.74rem] text-dim text-center">
          {strings.footer}
        </div>
      </div>
    </div>
  );
}