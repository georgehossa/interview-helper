import type { Card } from "../types";

const MODEL = "gemini-2.5-flash";
const BASE_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const SYSTEM_INSTRUCTION = `You are a tech interview preparation assistant. Generate interview questions and answers for IT positions.

Rules:
- Generate 8-10 question-answer pairs
- Questions should be plain text (no markdown)
- Answers should be in Markdown with code examples where relevant
- Use fenced code blocks with language tags (e.g. \`\`\`ts, \`\`\`js, \`\`\`tsx)
- Keep code examples concise (10-20 lines max)
- Include both conceptual and practical questions
- Cover the key topics relevant to the given position/role
- Both Spanish (es) and English (en) versions are REQUIRED for every question and answer
- Spanish translations should be natural, not literal`;

const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    cards: {
      type: "array",
      items: {
        type: "object",
        properties: {
          q: {
            type: "object",
            properties: {
              es: { type: "string" },
              en: { type: "string" },
            },
            required: ["es", "en"],
          },
          a: {
            type: "object",
            properties: {
              es: { type: "string" },
              en: { type: "string" },
            },
            required: ["es", "en"],
          },
        },
        required: ["q", "a"],
      },
    },
  },
  required: ["cards"],
};

export type GeminiError = "invalid_key" | "rate_limit" | "truncated" | "generic";

export async function generateCards(
  apiKey: string,
  prompt: string
): Promise<Card[]> {
  const url = `${BASE_URL}?key=${apiKey}`;

  const body = {
    system_instruction: {
      parts: { text: SYSTEM_INSTRUCTION },
    },
    contents: [
      {
        role: "user",
        parts: [{ text: `Generate interview questions for: ${prompt}` }],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 65536,
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA,
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    if (res.status === 400 || res.status === 401 || res.status === 403) {
      throw "invalid_key" as GeminiError;
    }
    if (res.status === 429) {
      throw "rate_limit" as GeminiError;
    }
    throw "generic" as GeminiError;
  }

  const data = await res.json();
  const candidate = data?.candidates?.[0];
  const text = candidate?.content?.parts?.[0]?.text;
  const finishReason = candidate?.finishReason;

  if (!text) {
    throw "generic" as GeminiError;
  }

  if (finishReason === "MAX_TOKENS") {
    const partialCards = tryParsePartial(text);
    if (partialCards.length > 0) {
      return partialCards;
    }
    throw "truncated" as GeminiError;
  }

  try {
    const parsed = JSON.parse(text);
    if (!parsed?.cards || !Array.isArray(parsed.cards)) {
      throw "generic" as GeminiError;
    }
    return parsed.cards as Card[];
  } catch {
    throw "generic" as GeminiError;
  }
}

function tryParsePartial(text: string): Card[] {
  const cards: Card[] = [];
  const regex = /\{\s*"q"\s*:\s*\{[^}]*"es"\s*:\s*"([^"]*)"[^}]*"en"\s*:\s*"([^"]*)"[^}]*\}\s*,\s*"a"\s*:\s*\{[^}]*"es"\s*:\s*"([\s\S]*?)"\s*,\s*"en"\s*:\s*"([\s\S]*?)"\s*\}\s*\}/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    try {
      const card: Card = {
        q: { es: match[1], en: match[2] },
        a: { es: match[3].replace(/\\n/g, "\n").replace(/\\"/g, '"'), en: match[4].replace(/\\n/g, "\n").replace(/\\"/g, '"') },
      };
      cards.push(card);
    } catch {
      continue;
    }
  }
  return cards;
}
