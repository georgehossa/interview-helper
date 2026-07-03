import { useState } from "react";
import type { Card } from "../types";
import { MarkdownAnswer } from "./MarkdownAnswer";

interface StudyCardProps {
  card: Card;
  index: number;
  accent: string;
  open: boolean;
  onToggle: () => void;
}

export function StudyCard({
  card,
  index,
  accent,
  open,
  onToggle,
}: StudyCardProps) {
  return (
    <div
      className="bg-surface rounded-[14px] mb-[10px] overflow-hidden transition-[border-color] duration-200"
      style={{ border: `1px solid ${open ? accent : "#262f47"}` }}
    >
      <div
        onClick={onToggle}
        className="flex items-center gap-[14px] px-[18px] py-[16px] cursor-pointer"
      >
        <span className="font-mono text-[0.72rem] text-dim min-w-[26px]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-semibold text-[0.98rem] flex-1">{card.q}</span>
        <span
          className="transition-transform duration-200 text-[1.1rem]"
          style={{
            color: open ? accent : "#8a94ad",
            transform: open ? "rotate(90deg)" : "none",
          }}
        >
          ›
        </span>
      </div>
      {open && (
        <div className="px-[18px] pb-[18px] pl-[58px] text-muted text-[0.93rem] leading-[1.6]">
          <MarkdownAnswer>{card.a}</MarkdownAnswer>
        </div>
      )}
    </div>
  );
}

interface StudyListProps {
  items: Card[];
  accent: string;
}

export function StudyList({ items, accent }: StudyListProps) {
  const [open, setOpen] = useState<Record<number, boolean>>({});

  if (items.length === 0) {
    return (
      <div className="text-dim font-mono text-[0.85rem]">
        Sin resultados para tu búsqueda.
      </div>
    );
  }

  return (
    <div>
      {items.map((it, i) => (
        <StudyCard
          key={i}
          card={it}
          index={i}
          accent={accent}
          open={!!open[i]}
          onToggle={() => setOpen((o) => ({ ...o, [i]: !o[i] }))}
        />
      ))}
    </div>
  );
}