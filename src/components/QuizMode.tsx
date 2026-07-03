import { useCallback, useState } from "react";
import type { Card } from "../types";
import { MarkdownAnswer } from "./MarkdownAnswer";
import { useQuizKeyboard } from "../hooks/useQuizKeyboard";

interface QuizModeProps {
  items: Card[];
  accent: string;
  topicName: string;
}

export function QuizMode({ items, accent, topicName }: QuizModeProps) {
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

  if (items.length === 0) {
    return (
      <div className="text-dim font-mono text-[0.85rem]">Sin resultados.</div>
    );
  }
  if (!card) return null;

  return (
    <QuizCard
      card={card}
      accent={accent}
      topicName={topicName}
      revealed={revealed}
      onReveal={reveal}
      onPrev={prev}
      onNext={next}
      canPrev={safeQi > 0}
      canNext={safeQi < items.length - 1}
      progress={((safeQi + 1) / items.length) * 100}
      label={`${safeQi + 1} / ${items.length}`}
    />
  );
}

interface QuizCardProps {
  card: Card;
  accent: string;
  topicName: string;
  revealed: boolean;
  onReveal: () => void;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  progress: number;
  label: string;
}

function QuizCard({
  card,
  accent,
  topicName,
  revealed,
  onReveal,
  onPrev,
  onNext,
  canPrev,
  canNext,
  progress,
  label,
}: QuizCardProps) {
  useQuizKeyboard({ enabled: true, onReveal, onPrev, onNext });

  return (
    <div>
      <div
        onClick={onReveal}
        className="bg-surface border border-border rounded-[16px] px-[28px] py-[32px] min-h-[300px] flex flex-col cursor-pointer"
        style={{ borderTop: `3px solid ${accent}` }}
      >
        <div className="font-mono text-[0.72rem] tracking-[0.16em] uppercase text-dim mb-4">
          {topicName} · pregunta
        </div>
        <div className="text-[1.3rem] font-bold leading-[1.35] mb-5">
          {card.q}
        </div>
        {revealed ? (
          <MarkdownAnswer>{card.a}</MarkdownAnswer>
        ) : (
          <div className="mt-auto font-mono text-[0.78rem] text-dim pt-[18px]">
            Toca la tarjeta o pulsa <strong className="text-muted">Espacio</strong>{" "}
            para ver la respuesta
          </div>
        )}
      </div>
      <div className="flex items-center gap-3 mt-[18px] flex-wrap">
        <button
          disabled={!canPrev}
          onClick={onPrev}
          className="font-mono text-[0.82rem] font-semibold py-[11px] px-[20px] rounded-[10px] border border-border bg-surface text-ink"
          style={{ opacity: canPrev ? 1 : 0.35, cursor: canPrev ? "pointer" : "default" }}
        >
          ← Anterior
        </button>
        <div className="flex-1 min-w-[100px] h-[6px] bg-[#1b2236] rounded-[99px] overflow-hidden">
          <div
            className="h-full transition-[width] duration-300"
            style={{ background: accent, width: `${progress}%` }}
          />
        </div>
        <span className="font-mono text-[0.78rem] text-muted whitespace-nowrap">
          {label}
        </span>
        <button
          disabled={!canNext}
          onClick={onNext}
          className="font-mono text-[0.82rem] font-semibold py-[11px] px-[20px] rounded-[10px]"
          style={{
            border: `1px solid ${accent}`,
            background: accent,
            color: "#0e1320",
            opacity: canNext ? 1 : 0.4,
            cursor: canNext ? "pointer" : "default",
          }}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}

