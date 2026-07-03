import type { Topic } from "../types";
import { javascript } from "./javascript";
import { typescript } from "./typescript";
import { node } from "./node";
import { apis } from "./apis";
import { react } from "./react";
import { nextjs } from "./nextjs";
import { reactNative } from "./react-native";
import { html } from "./html";
import { css } from "./css";

export const TOPICS: Record<string, Topic> = {
  js: javascript,
  ts: typescript,
  node: node,
  apis: apis,
  react: react,
  next: nextjs,
  rn: reactNative,
  html: html,
  css: css,
};

export const ORDER = [
  "js",
  "ts",
  "node",
  "apis",
  "react",
  "next",
  "rn",
  "html",
  "css",
];