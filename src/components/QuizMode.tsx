import { useCallback, useState } from "react";
import type { Card, Lang } from "../types";
import { MarkdownAnswer } from "./MarkdownAnswer";
import { useQuizKeyboard } from "../hooks/useQuizKeyboard";

interface QuizModeProps {
  items: Card[];
  accent: string;
  topicName: string;
  lang: Lang;
}

export function QuizMode({ items, accent, topicName, lang }: QuizModeProps) {
  const [qi, setQi] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const safeQi = qi >= items.length ? 0 : qi;
  const card = items[safeQi];

  const reveal = useCallback(() => setRevealed((r) => !r), []);
  const prev = useCallback(() => {
    setRevealed(false);
    setQi((i) => Math.max(i - 1, 0));
  }, []);
  const next = useCallback(() => {
    setRevealed(false);
    setQi((i) => Math.min(i + 1, items.length - 1));
  }, [items.length]);

  useQuizKeyboard({
    enabled: true,
    onReveal: reveal,
    onPrev: prev,
    onNext: next,
  });

  if (items.length === 0) {
    return (
      <div className="text-dim font-mono text-[0.85rem]">
        {lang === "es" ? "Sin resultados." : "No results."}
      </div>
    );
  }
  if (!card) return null;

  const prevLabel = lang === "es" ? "← Anterior" : "← Previous";
  const nextLabel = lang === "es" ? "Siguiente →" : "Next →";
  const questionLabel = lang === "es" ? "pregunta" : "question";
  const revealHint = lang === "es"
    ? "Toca la tarjeta o pulsa"
    : "Tap the card or press";
  const spaceWord = lang === "es" ? "Espacio" : "Space";
  const revealSuffix = lang === "es"
    ? "para ver la respuesta"
    : "to reveal the answer";

  return (
    <div>
      <div
        onClick={reveal}
        className="bg-surface border border-border rounded-[16px] px-[28px] py-[32px] min-h-[300px] flex flex-col cursor-pointer"
        style={{ borderTop: `3px solid ${accent}` }}
      >
        <div className="font-mono text-[0.72rem] tracking-[0.16em] uppercase text-dim mb-4">
          {topicName} · {questionLabel}
        </div>
        <div className="text-[1.3rem] font-bold leading-[1.35] mb-5">
          {card.q[lang]}
        </div>
        {revealed ? (
          <MarkdownAnswer>{card.a[lang]}</MarkdownAnswer>
        ) : (
          <div className="mt-auto font-mono text-[0.78rem] text-dim pt-[18px]">
            {revealHint}{" "}
            <strong className="text-muted">{spaceWord}</strong>{" "}
            {revealSuffix}
          </div>
        )}
      </div>
      <div className="flex items-center gap-3 mt-[18px] flex-wrap">
        <button
          disabled={safeQi > 0 ? false : true}
          onClick={prev}
          className="font-mono text-[0.82rem] font-semibold py-[11px] px-[20px] rounded-[10px] border border-border bg-surface text-ink"
          style={{
            opacity: safeQi > 0 ? 1 : 0.35,
            cursor: safeQi > 0 ? "pointer" : "default",
          }}
        >
          {prevLabel}
        </button>
        <div className="flex-1 min-w-[100px] h-[6px] bg-[#1b2236] rounded-[99px] overflow-hidden">
          <div
            className="h-full transition-[width] duration-300"
            style={{
              background: accent,
              width: `${((safeQi + 1) / items.length) * 100}%`,
            }}
          />
        </div>
        <span className="font-mono text-[0.78rem] text-muted whitespace-nowrap">
          {safeQi + 1} / {items.length}
        </span>
        <button
          disabled={safeQi < items.length - 1 ? false : true}
          onClick={next}
          className="font-mono text-[0.82rem] font-semibold py-[11px] px-[20px] rounded-[10px]"
          style={{
            border: `1px solid ${accent}`,
            background: accent,
            color: "#0e1320",
            opacity: safeQi < items.length - 1 ? 1 : 0.4,
            cursor: safeQi < items.length - 1 ? "pointer" : "default",
          }}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}