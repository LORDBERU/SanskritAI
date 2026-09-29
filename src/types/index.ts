export interface WordAnalysis {
  sanskrit: string;
  transliteration: string;
  meaning: string;
  role?: string;
  gender?: string;
  number?: string;
  case?: string;
  person?: string;
  tense?: string;
  voice?: string;
  root?: string;
  partOfSpeech?: string;
}

export interface SandhiAnalysis {
  combined: string;
  split: string;
  type?: string;
  explanation: string;
  isProbable: boolean;
}

export interface SamasaAnalysis {
  compound: string;
  split: string;
  type?: string;
  explanation: string;
  meaning: string;
  isProbable: boolean;
}

export interface SentenceStructureNode {
  word: string;
  role: string;
  transliteration: string;
}

export interface TranslationResult {
  input: string;
  transliteration: string;
  translation: string;
  meaning: string;
  words: WordAnalysis[];
  grammar: {
    notes: string;
  };
  sandhi: SandhiAnalysis[];
  samasa: SamasaAnalysis[];
  structure: SentenceStructureNode[];
  confidence: number;
}
