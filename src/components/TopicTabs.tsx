import { useEffect, useRef, useState } from "react";
import { TOPICS, ORDER } from "../data";

interface TopicTabsProps {
  active: string;
  onSelect: (key: string) => void;
}

export function TopicTabs({ active, onSelect }: TopicTabsProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTopic = TOPICS[active];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const handleSelect = (key: string) => {
    onSelect(key);
    setOpen(false);
  };

  return (
    <div className="my-[26px]">
      {/* Mobile: custom dropdown selector */}
      <div className="relative md:hidden" ref={containerRef}>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="w-full bg-surface border border-border rounded-[10px] py-[11px] px-[14px] flex items-center justify-between outline-none transition-colors duration-150 focus:border-[var(--accent)]"
        >
          <div className="flex items-center gap-2">
            <span
              className="w-[9px] h-[9px] rounded-full"
              style={{ background: activeTopic.color }}
            />
            <span className="font-mono text-[0.82rem] font-semibold text-ink">
              {activeTopic.name}
            </span>
          </div>
          <span
            className={`text-dim text-[0.7rem] transition-transform duration-150 ${
              open ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>

        {open && (
          <ul
            role="listbox"
            className="absolute z-20 top-full left-0 right-0 mt-2 bg-surface border border-border rounded-[10px] overflow-hidden shadow-xl max-h-[60vh] overflow-y-auto"
          >
            {ORDER.map((k) => {
              const t = TOPICS[k];
              const isActive = k === active;
              return (
                <li key={k} role="option" aria-selected={isActive}>
                  <button
                    type="button"
                    onClick={() => handleSelect(k)}
                    className={`w-full text-left px-[14px] py-[10px] flex items-center gap-2 font-mono text-[0.82rem] transition-colors duration-150 ${
                      isActive
                        ? "bg-[var(--accent)]/10 text-ink"
                        : "text-muted hover:bg-[#1b2236] hover:text-ink"
                    }`}
                  >
                    <span
                      className="w-[9px] h-[9px] rounded-full"
                      style={{ background: t.color }}
                    />
                    {t.name}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Desktop: pill tabs */}
      <div className="hidden md:flex flex-wrap gap-2">
        {ORDER.map((k) => {
          const t = TOPICS[k];
          const isActive = k === active;
          const c = t.color;
          return (
            <button
              key={k}
              onClick={() => onSelect(k)}
              className="font-mono text-[0.82rem] font-semibold py-[9px] px-[15px] rounded-full cursor-pointer flex items-center gap-2 transition-all duration-150"
              style={{
                border: `1px solid ${isActive ? c : "#262f47"}`,
                background: isActive ? c : "#151b2b",
                color: isActive ? "#0e1320" : "#8a94ad",
              }}
            >
              <span
                className="w-[9px] h-[9px] rounded-full"
                style={{
                  background: isActive ? "#0e1320" : c,
                  opacity: isActive ? 0.55 : 1,
                }}
              />
              {t.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
