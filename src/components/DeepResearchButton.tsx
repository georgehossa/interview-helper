import type { Card, Lang } from "../types";

interface DeepResearchButtonProps {
  card: Card;
  lang: Lang;
  label: string;
  title: string;
}

export function getDeepResearchUrl(card: Card, lang: Lang): string {
  const query = `${card.q[lang]} interview questions explained`;
  return `https://www.google.com/search?q=${encodeURIComponent(query)}&hl=${lang}`;
}

export function DeepResearchButton({
  card,
  lang,
  label,
  title,
}: DeepResearchButtonProps) {
  return (
    <a
      href={getDeepResearchUrl(card, lang)}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      className="inline-flex items-center gap-[6px] font-mono text-[0.72rem] font-semibold py-[6px] px-[10px] rounded-[8px] border border-border bg-surface text-muted hover:text-ink hover:border-[var(--accent)] transition-colors cursor-pointer shrink-0"
    >
      <span aria-hidden>✨</span>
      <span>{label}</span>
    </a>
  );
}
