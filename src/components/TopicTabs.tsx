import { TOPICS, ORDER } from "../data";

interface TopicTabsProps {
  active: string;
  onSelect: (key: string) => void;
}

export function TopicTabs({ active, onSelect }: TopicTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 my-[26px]">
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
  );
}