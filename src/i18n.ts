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
  ai: string;
  conceptCount: (n: number, name: string) => string;
  quizQuestionLabel: string;
  quizRevealHint: (highlighted: string) => string;
  quizPrev: string;
  quizNext: string;
  noResults: string;
  noResultsQuiz: string;
  footer: string;
  aiApiKeyLabel: string;
  aiApiKeyHint: string;
  aiApiKeySteps: string[];
  aiApiKeySave: string;
  aiPlaceholder: string;
  aiGenerate: string;
  aiGenerating: string;
  aiErrorKey: string;
  aiErrorRate: string;
  aiErrorTruncated: string;
  aiErrorGeneric: string;
  aiConceptCount: (n: number) => string;
  aiUseInQuiz: string;
  aiBackToTopics: string;
  aiShowingGenerated: string;
  aiClear: string;
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
    ai: "AI",
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
    aiApiKeyLabel: "API Key de Gemini",
    aiApiKeyHint: "Necesitas una API key gratuita de Google Gemini para usar esta función.",
    aiApiKeySteps: [
      "1. Ve a aistudio.google.com/apikey",
      "2. Inicia sesión con tu cuenta de Google",
      "3. Haz clic en 'Create API Key'",
      "4. Copia la key y pégala aquí",
    ],
    aiApiKeySave: "Guardar",
    aiPlaceholder: "Describe el puesto o lista de temas (ej: Senior React Developer, Redux, GraphQL)...",
    aiGenerate: "Generar",
    aiGenerating: "Generando...",
    aiErrorKey: "API key inválida. Verifica tu clave.",
    aiErrorRate: "Límite de solicitudes alcanzado. Intenta en unos segundos.",
    aiErrorTruncated: "La respuesta fue truncada. Se recuperaron algunas tarjetas. Intenta con un tema más específico.",
    aiErrorGeneric: "Error al generar. Intenta de nuevo.",
    aiConceptCount: (n) => `${n} concepto${n !== 1 ? "s" : ""} generado${n !== 1 ? "s" : ""}`,
    aiUseInQuiz: "Usar en Quiz",
    aiBackToTopics: "Volver a temas",
    aiShowingGenerated: "Mostrando tarjetas generadas por AI",
    aiClear: "Limpiar",
  },
  en: {
    prepLabel: "interview prep",
    subtitle:
      "Core concepts to review. Switch topics, open each card to study, or use the",
    subtitleEmph: "quiz mode",
    searchPlaceholder: "Search concept…",
    study: "Study",
    quiz: "Quiz",
    ai: "AI",
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
    aiApiKeyLabel: "Gemini API Key",
    aiApiKeyHint: "You need a free Google Gemini API key to use this feature.",
    aiApiKeySteps: [
      "1. Go to aistudio.google.com/apikey",
      "2. Sign in with your Google account",
      "3. Click 'Create API Key'",
      "4. Copy the key and paste it here",
    ],
    aiApiKeySave: "Save",
    aiPlaceholder: "Describe the position or list of topics (e.g. Senior React Developer, Redux, GraphQL)...",
    aiGenerate: "Generate",
    aiGenerating: "Generating...",
    aiErrorKey: "Invalid API key. Check your key.",
    aiErrorRate: "Rate limit reached. Try again in a few seconds.",
    aiErrorTruncated: "Response was truncated. Some cards were recovered. Try a more specific topic.",
    aiErrorGeneric: "Generation failed. Try again.",
    aiConceptCount: (n) => `${n} concept${n !== 1 ? "s" : ""} generated`,
    aiUseInQuiz: "Use in Quiz",
    aiBackToTopics: "Back to topics",
    aiShowingGenerated: "Showing AI-generated cards",
    aiClear: "Clear",
  },
};

export function t(lang: Lang): UIStrings {
  return STRINGS[lang];
}