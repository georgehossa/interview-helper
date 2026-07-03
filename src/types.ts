export type Lang = "es" | "en";

export interface LocalizedText {
  es: string;
  en: string;
}

export interface Card {
  q: LocalizedText;
  a: LocalizedText;
}

export interface Topic {
  key: string;
  name: string;
  color: string;
  items: Card[];
}