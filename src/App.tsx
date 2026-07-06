import { useEffect, useState } from "react";
import { TOPICS } from "./data";
import { TopicTabs } from "./components/TopicTabs";
import { Toolbar } from "./components/Toolbar";
import { StudyList } from "./components/StudyCard";
import { QuizMode } from "./components/QuizMode";
import { AiGenerator } from "./components/AiGenerator";
import { t, LANG_LABEL, LANGS } from "./i18n";
import type { Lang, Mode, Card } from "./types";

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
  const [aiCards, setAiCards] = useState<Card[]>([]);
  const [usingAiCards, setUsingAiCards] = useState(false);

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const topic = TOPICS[tech];
  const accent = topic.color;
  const strings = t(lang);

  const baseItems = usingAiCards && aiCards.length > 0 ? aiCards : topic.items;

  const items = baseItems.filter((it) => {
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
    setUsingAiCards(false);
  };

  const switchLang = (l: Lang) => {
    setLang(l);
    setQuery("");
  };

  const handleUseInQuiz = (cards: Card[]) => {
    setAiCards(cards);
    setUsingAiCards(true);
    setMode("quiz");
  };

  const handleBackToTopics = () => {
    setUsingAiCards(false);
    setMode("study");
  };

  const displayName = usingAiCards && aiCards.length > 0
    ? (lang === "es" ? "AI Generado" : "AI Generated")
    : topic.name;

  return (
    <div
      className="min-h-screen bg-bg text-ink font-sans"
      style={{ ["--accent" as string]: accent }}
    >
      <div className="max-w-[1000px] mx-auto px-[18px] pt-8 pb-[70px]">
        <div className="font-mono text-[0.72rem] tracking-[0.2em] uppercase text-dim flex items-center gap-[10px] mb-[10px]">
          <span
            className="w-[7px] h-[7px] rounded-full"
            style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
          />
          {displayName} · {strings.prepLabel}
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

        {usingAiCards && aiCards.length > 0 && mode !== "ai" && (
          <div className="flex items-center justify-between bg-surface border border-border rounded-[10px] px-[14px] py-[10px] mb-[14px]">
            <span className="font-mono text-[0.78rem] text-muted">
              {strings.aiShowingGenerated}
            </span>
            <button
              onClick={handleBackToTopics}
              className="font-mono text-[0.75rem] font-semibold py-[5px] px-[12px] rounded-[6px] border border-border bg-transparent text-muted cursor-pointer"
            >
              {strings.aiBackToTopics}
            </button>
          </div>
        )}

        {mode === "ai" ? (
          <AiGenerator
            accent={accent}
            lang={lang}
            onUseInQuiz={handleUseInQuiz}
            onBackToTopics={handleBackToTopics}
            existingGeneration={null}
          />
        ) : (
          <>
            <div className="font-mono text-[0.75rem] text-dim mb-[14px]">
              {strings.conceptCount(items.length, displayName)}
            </div>
            {mode === "study" ? (
              <StudyList items={items} accent={accent} lang={lang} />
            ) : (
              <QuizMode
                key={usingAiCards ? "ai" : tech}
                items={items}
                accent={accent}
                topicName={displayName}
                lang={lang}
              />
            )}
          </>
        )}

        <div className="mt-10 pt-5 border-t border-border font-mono text-[0.74rem] text-dim text-center">
          {strings.footer}
        </div>
      </div>
    </div>
  );
}
