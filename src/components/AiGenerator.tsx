import { useState } from "react";
import type { Card, Lang, AiGeneration } from "../types";
import { generateCards, type GeminiError } from "../services/gemini";
import { StudyList } from "./StudyCard";
import { t } from "../i18n";

const API_KEY_STORAGE = "ih.geminiKey";

interface AiGeneratorProps {
  accent: string;
  lang: Lang;
  onUseInQuiz: (cards: Card[]) => void;
  onBackToTopics: () => void;
  existingGeneration: AiGeneration | null;
}

export function AiGenerator({
  accent,
  lang,
  onUseInQuiz,
  onBackToTopics,
  existingGeneration,
}: AiGeneratorProps) {
  const strings = t(lang);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem(API_KEY_STORAGE) || "");
  const [keyInput, setKeyInput] = useState("");
  const [showKeyInput, setShowKeyInput] = useState(!apiKey);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generation, setGeneration] = useState<AiGeneration | null>(existingGeneration);

  const saveKey = () => {
    if (keyInput.trim()) {
      localStorage.setItem(API_KEY_STORAGE, keyInput.trim());
      setApiKey(keyInput.trim());
      setShowKeyInput(false);
      setKeyInput("");
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || !apiKey) return;
    setLoading(true);
    setError(null);

    try {
      const cards = await generateCards(apiKey, prompt.trim());
      setGeneration({
        prompt: prompt.trim(),
        cards,
        timestamp: Date.now(),
      });
    } catch (err) {
      const errorType = err as GeminiError;
      if (errorType === "invalid_key") {
        setError(strings.aiErrorKey);
      } else if (errorType === "rate_limit") {
        setError(strings.aiErrorRate);
      } else if (errorType === "truncated") {
        setError(strings.aiErrorTruncated);
      } else {
        setError(strings.aiErrorGeneric);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setGeneration(null);
    setPrompt("");
  };

  return (
    <div>
      {showKeyInput && (
        <div className="bg-surface border border-border rounded-[14px] p-[18px] mb-[18px]">
          <label className="block font-mono text-[0.78rem] font-semibold text-ink mb-2">
            {strings.aiApiKeyLabel}
          </label>
          <p className="text-muted text-[0.82rem] mb-3">
            {strings.aiApiKeyHint}
          </p>
          <ol className="text-muted text-[0.82rem] mb-4 space-y-1 pl-4">
            {strings.aiApiKeySteps.map((step, i) => (
              <li key={i}>
                {i === 0 ? (
                  <>
                    {step.split("aistudio.google.com/apikey")[0]}
                    <a
                      href="https://aistudio.google.com/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-ink"
                      style={{ color: accent }}
                    >
                      aistudio.google.com/apikey
                    </a>
                  </>
                ) : (
                  step
                )}
              </li>
            ))}
          </ol>
          <div className="flex gap-2">
            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveKey()}
              placeholder="AIza..."
              className="flex-1 bg-bg border border-border rounded-[8px] px-[12px] py-[8px] text-ink font-mono text-[0.85rem] outline-none focus:border-[var(--accent)]"
            />
            <button
              onClick={saveKey}
              disabled={!keyInput.trim()}
              className="font-mono text-[0.78rem] font-semibold py-[8px] px-[16px] rounded-[8px] border-none cursor-pointer"
              style={{
                background: keyInput.trim() ? accent : "#2a3347",
                color: keyInput.trim() ? "#0e1320" : "#5a6478",
              }}
            >
              {strings.aiApiKeySave}
            </button>
          </div>
        </div>
      )}

      <div className="bg-surface border border-border rounded-[14px] p-[18px] mb-[18px]">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={strings.aiPlaceholder}
          rows={3}
          className="w-full bg-bg border border-border rounded-[10px] px-[14px] py-[12px] text-ink font-sans text-[0.92rem] outline-none resize-none focus:border-[var(--accent)]"
        />
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || loading || !apiKey}
            className="font-mono text-[0.82rem] font-semibold py-[11px] px-[20px] rounded-[10px] border-none cursor-pointer transition-all duration-150"
            style={{
              background: prompt.trim() && !loading && apiKey ? accent : "#2a3347",
              color: prompt.trim() && !loading && apiKey ? "#0e1320" : "#5a6478",
              cursor: prompt.trim() && !loading && apiKey ? "pointer" : "default",
            }}
          >
            {loading ? strings.aiGenerating : strings.aiGenerate}
          </button>
          {generation && (
            <button
              onClick={handleClear}
              className="font-mono text-[0.78rem] font-semibold py-[11px] px-[16px] rounded-[10px] border border-border bg-transparent text-muted cursor-pointer"
            >
              {strings.aiClear}
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-500/30 rounded-[10px] px-[16px] py-[12px] mb-[18px] text-red-300 text-[0.88rem]">
          {error}
        </div>
      )}

      {generation && (
        <>
          <div className="flex items-center justify-between mb-[14px]">
            <span className="font-mono text-[0.75rem] text-dim">
              {strings.aiConceptCount(generation.cards.length)}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => onUseInQuiz(generation.cards)}
                className="font-mono text-[0.78rem] font-semibold py-[7px] px-[14px] rounded-[8px] border-none cursor-pointer"
                style={{ background: accent, color: "#0e1320" }}
              >
                {strings.aiUseInQuiz}
              </button>
              <button
                onClick={onBackToTopics}
                className="font-mono text-[0.78rem] font-semibold py-[7px] px-[14px] rounded-[8px] border border-border bg-transparent text-muted cursor-pointer"
              >
                {strings.aiBackToTopics}
              </button>
            </div>
          </div>
          <StudyList items={generation.cards} accent={accent} lang={lang} />
        </>
      )}
    </div>
  );
}
