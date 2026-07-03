export interface Card {
  q: string;
  a: string;
}

export interface Topic {
  key: string;
  name: string;
  color: string;
  items: Card[];
}