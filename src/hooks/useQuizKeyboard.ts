import { useEffect } from "react";

interface UseQuizKeyboardArgs {
  enabled: boolean;
  onReveal: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function useQuizKeyboard({
  enabled,
  onReveal,
  onPrev,
  onNext,
}: UseQuizKeyboardArgs) {
  useEffect(() => {
    if (!enabled) return;
    const handler = (e: KeyboardEvent) => {
      const target = document.activeElement as HTMLElement | null;
      if (target?.tagName === "INPUT") return;
      if (e.code === "Space") {
        e.preventDefault();
        onReveal();
      } else if (e.key === "ArrowRight") {
        onNext();
      } else if (e.key === "ArrowLeft") {
        onPrev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [enabled, onReveal, onPrev, onNext]);
}