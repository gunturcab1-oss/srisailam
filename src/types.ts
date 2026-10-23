
export interface Car {
  id: string;
  name: string;
  type: string;
  capacity: string;
  image: string;
  description: string;
}

export interface Place {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface SearchResponse {
  answer: string;
  sources?: { title: string; uri: string }[];
}

export interface SEOQuickFact {
  label: string;
  value: string;
}

export interface SEOContentTable {
  title?: string;
  headers: string[];
  rows: string[][];
  note?: string;
}

export interface SEOContentSection {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: SEOContentTable;
}

export interface SEOFAQ {
  question: string;
  answer: string;
}

export interface SEOInternalLink {
  label: string;
  url: string;
  description?: string;
}

export interface SEOPageData {
  topic: string;
  url: string;
  seoTitle: string;
  metaDescription: string;
  content?: string;
  updatedAt?: string;
  quickFacts?: SEOQuickFact[];
  sections?: SEOContentSection[];
  faqs?: SEOFAQ[];
  internalLinks?: SEOInternalLink[];
}
