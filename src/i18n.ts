import type { Lang } from "./types";

export const LANGS: Lang[] = ["es", "en"];

export const LANG_LABEL: Record<Lang, string> = {
  es: "ES",
  en: "EN",
};

interface UIStrings {
  prepLabel: string;
  subtitle: string;
  subtitleEmph: string;
  searchPlaceholder: string;
  study: string;
  quiz: string;
  conceptCount: (n: number, name: string) => string;
  quizQuestionLabel: string;
  quizRevealHint: (highlighted: string) => string;
  quizPrev: string;
  quizNext: string;
  noResults: string;
  noResultsQuiz: string;
  footer: string;
}

const STRINGS: Record<Lang, UIStrings> = {
  es: {
    prepLabel: "prep de entrevista",
    subtitle:
      "Conceptos core para repasar. Cambia de tecnología, abre cada tarjeta para estudiar, o usa el",
    subtitleEmph: "modo quiz",
    searchPlaceholder: "Buscar concepto…",
    study: "Estudio",
    quiz: "Quiz",
    conceptCount: (n, name) =>
      `${n} concepto${n !== 1 ? "s" : ""} · ${name}`,
    quizQuestionLabel: "pregunta",
    quizRevealHint: (h) =>
      `Toca la tarjeta o pulsa ${h} para ver la respuesta`,
    quizPrev: "← Anterior",
    quizNext: "Siguiente →",
    noResults: "Sin resultados para tu búsqueda.",
    noResultsQuiz: "Sin resultados.",
    footer: "Buena suerte hoy 🚀 · en quiz navega con ← → · revela con espacio",
  },
  en: {
    prepLabel: "interview prep",
    subtitle:
      "Core concepts to review. Switch topics, open each card to study, or use the",
    subtitleEmph: "quiz mode",
    searchPlaceholder: "Search concept…",
    study: "Study",
    quiz: "Quiz",
    conceptCount: (n, name) =>
      `${n} concept${n !== 1 ? "s" : ""} · ${name}`,
    quizQuestionLabel: "question",
    quizRevealHint: (h) =>
      `Tap the card or press ${h} to reveal the answer`,
    quizPrev: "← Previous",
    quizNext: "Next →",
    noResults: "No results for your search.",
    noResultsQuiz: "No results.",
    footer: "Good luck today 🚀 · in quiz navigate with ← → · reveal with space",
  },
};

export function t(lang: Lang): UIStrings {
  return STRINGS[lang];
}