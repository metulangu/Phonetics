export type PhonemeCategory = 'monophthongs' | 'diphthongs' | 'consonants_voiced' | 'consonants_voiceless' | 'common_words';

export interface SpellingPattern {
  spelling: string;
  examples: string[];
}

export interface WordItem {
  id: string;
  word: string;
  ipa: string;
  phonemeSymbol?: string;
  spellingPattern?: string;
  translation: { [langCode: string]: string };
  exampleSentence?: string;
  sentenceTranslation?: { [langCode: string]: string };
  category?: string;
  level?: '1K' | '2K' | '3K' | '4K' | '5K';
  isCustom?: boolean;
}

export interface PhonemeGroup {
  id: string;
  symbol: string;
  exampleWord: string;
  ipa: string;
  type: PhonemeCategory;
  descriptionTr: string;
  descriptionEn: string;
  spellingPatterns?: SpellingPattern[];
  words: WordItem[];
}

export type PlayMode =
  | 'm1_en_word'
  | 'm2_tr_word'
  | 'm3_en_sentence'
  | 'm4_tr_sentence'
  | 'm5_1_2'
  | 'm6_1_3'
  | 'm7_1_4'
  | 'm8_2_3'
  | 'm9_2_4'
  | 'm10_3_4'
  | 'm11_1_2_3'
  | 'm12_1_2_4'
  | 'm13_1_3_4'
  | 'm14_2_3_4'
  | 'm15_1_2_3_4'
  | 'english_only'
  | 'translation_only'
  | 'sentence_only'
  | 'sentence_trans_only'
  | 'english_then_translation'
  | 'english_then_sentence'
  | 'sentence_en_then_trans'
  | 'full_sequence';

export interface VoiceSettings {
  englishVoiceURI: string;
  translationVoiceURI: string;
  rate: number; // 0.25 to 2.0
  pitch: number; // 0.5 to 1.5
  volume: number; // 0 to 1
  playMode: PlayMode;
  repeatCount: number; // 1 to 10
  autoDelaySeconds: number; // delay between words (0 to 5s)
  targetLanguage: string; // 'tr' | 'es' | 'de' | 'fr' | 'it' | 'ru' | 'ar' | 'ja'
}

export type AppStep = 'language' | 'category' | 'slide';

export interface LanguageOption {
  code: string;
  name: string;
  nativeName?: string;
  flag: string;
  speechLang: string;
  hasTTS?: boolean;
}
