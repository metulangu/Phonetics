import React, { useEffect, useRef, useState } from 'react';
import { Volume2, Star, Globe, RefreshCw, ChevronDown, Layers, Sparkles } from 'lucide-react';
import { WordItem, VoiceSettings } from '../types';
import { translateText } from '../services/translateService';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { renderHighlightedWord, renderHighlightedIPA } from '../utils/highlightUtils';

interface WordColumnViewProps {
  words: WordItem[];
  activeWordId: string | null;
  favorites: string[];
  voiceSettings: VoiceSettings;
  onPlayWord: (word: WordItem, mode?: 'english' | 'translation' | 'both') => void;
  onPlaySentence: (sentence: string, langCode?: string, followUp?: { text: string; langCode: string }) => void;
  onToggleFavorite: (wordId: string) => void;
  theme: 'light' | 'dark';
  highlightEnabled?: boolean;
  onToggleHighlight?: () => void;
  groupSymbol?: string;
  selectedPattern?: string | null;
}

export const WordColumnView: React.FC<WordColumnViewProps> = ({
  words,
  activeWordId,
  favorites,
  voiceSettings,
  onPlayWord,
  onPlaySentence,
  onToggleFavorite,
  theme,
  highlightEnabled = true,
  onToggleHighlight,
  groupSymbol,
  selectedPattern,
}) => {
  const [visibleCount, setVisibleCount] = useState<number>(10);
  const [dynamicTranslations, setDynamicTranslations] = useState<Record<string, string>>({});
  const [dynamicSentenceTranslations, setDynamicSentenceTranslations] = useState<Record<string, string>>({});
  const [loadingTranslations, setLoadingTranslations] = useState<boolean>(false);
  const activeCardRef = useRef<HTMLDivElement | null>(null);

  const isLight = theme === 'light';
  const targetLang = voiceSettings.targetLanguage || 'tr';
  const langConfig =
    SUPPORTED_LANGUAGES.find((l) => l.code === targetLang) || SUPPORTED_LANGUAGES[0];

  // Auto-expand visible range if activeWordId is beyond currently visibleCount
  useEffect(() => {
    if (activeWordId) {
      const activeIndex = words.findIndex((w) => w.id === activeWordId);
      if (activeIndex >= 0 && activeIndex >= visibleCount) {
        const nextMultiple = Math.ceil((activeIndex + 1) / 10) * 10;
        setVisibleCount(nextMultiple);
      }
    }
  }, [activeWordId, words, visibleCount]);

  // Auto-scroll active card into view
  useEffect(() => {
    if (activeWordId && activeCardRef.current) {
      activeCardRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeWordId]);

  // Load word & sentence translations on the fly for visible words
  useEffect(() => {
    let isMounted = true;
    const visibleWords = words.slice(0, visibleCount);

    async function loadTranslations() {
      if (targetLang === 'en') return;

      const missingWords = visibleWords.filter((w) => {
        const wordKey = `${w.id}_${targetLang}`;
        if (!dynamicTranslations[wordKey]) {
          if (targetLang === 'tr' && w.translation) return false;
          if (w.translation && typeof w.translation === 'object' && w.translation[targetLang]) return false;
          return true;
        }
        return false;
      });

      const missingSentences = visibleWords.filter((w) => {
        if (!w.exampleSentence) return false;
        if (w.sentenceTranslation && w.sentenceTranslation[targetLang]) return false;
        const sentenceKey = `${w.id}_sent_${targetLang}`;
        return !dynamicSentenceTranslations[sentenceKey];
      });

      if (missingWords.length === 0 && missingSentences.length === 0) return;

      setLoadingTranslations(true);
      const newWordTrans: Record<string, string> = {};
      const newSentenceTrans: Record<string, string> = {};

      for (const item of missingWords) {
        if (!isMounted) break;
        const res = await translateText(item.word, targetLang);
        newWordTrans[`${item.id}_${targetLang}`] = res;
      }

      for (const item of missingSentences) {
        if (!isMounted) break;
        if (item.exampleSentence) {
          const res = await translateText(item.exampleSentence, targetLang);
          newSentenceTrans[`${item.id}_sent_${targetLang}`] = res;
        }
      }

      if (isMounted) {
        if (Object.keys(newWordTrans).length > 0) {
          setDynamicTranslations((prev) => ({ ...prev, ...newWordTrans }));
        }
        if (Object.keys(newSentenceTrans).length > 0) {
          setDynamicSentenceTranslations((prev) => ({ ...prev, ...newSentenceTrans }));
        }
        setLoadingTranslations(false);
      }
    }

    loadTranslations();

    return () => {
      isMounted = false;
    };
  }, [words, visibleCount, targetLang]);

  if (words.length === 0) {
    return (
      <div
        className={`border rounded-2xl p-12 text-center my-4 ${
          isLight
            ? 'bg-white border-slate-200 text-slate-500 shadow-sm'
            : 'bg-slate-900/60 border-slate-800 text-slate-400'
        }`}
      >
        <Volume2 className="w-12 h-12 mx-auto text-slate-400 mb-3" />
        <p className="text-base font-semibold">No words found</p>
        <p className="text-xs text-slate-500 mt-1">
          Try changing your search query or selecting a different group.
        </p>
      </div>
    );
  }

  const currentVisibleWords = words.slice(0, visibleCount);
  const totalCount = words.length;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-3.5 pb-24">
      {/* Top Controls Row for Column View */}
      {onToggleHighlight && (
        <div className="flex items-center justify-between gap-3 px-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Toplam {totalCount} kelime listeleniyor
          </span>
          <button
            type="button"
            onClick={onToggleHighlight}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all shadow-2xs ${
              highlightEnabled
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-indigo-600/30'
                : isLight
                ? 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Harf Deseni ve IPA Vurgusunu Göster / Gizle"
          >
            <Sparkles className={`w-3.5 h-3.5 ${highlightEnabled ? 'text-amber-300 fill-amber-300' : 'text-slate-400'}`} />
            <span className="text-[11px] font-bold">
              {highlightEnabled ? 'Vurgu Açık' : 'Vurgu Kapalı'}
            </span>
            <div
              className={`w-7 h-4 rounded-full p-0.5 transition-colors relative flex items-center ${
                highlightEnabled ? 'bg-indigo-300 dark:bg-indigo-400' : 'bg-slate-300 dark:bg-slate-600'
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full bg-white shadow-xs transition-transform duration-200 ${
                  highlightEnabled ? 'translate-x-3' : 'translate-x-0'
                }`}
              />
            </div>
          </button>
        </div>
      )}

      {/* Translation notice banner */}
      {loadingTranslations && (
        <div
          className={`flex items-center gap-2 px-3.5 py-2 border rounded-xl text-xs font-semibold animate-pulse ${
            isLight
              ? 'bg-indigo-50 border-indigo-200 text-indigo-800'
              : 'bg-indigo-950/40 border-indigo-500/30 text-indigo-300'
          }`}
        >
          <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-500" />
          <span>
            Fetching Google Translate {langConfig.flag} {langConfig.name} equivalents...
          </span>
        </div>
      )}

      {/* Vertical Column of Word Cards */}
      {currentVisibleWords.map((item, index) => {
        const isActive = activeWordId === item.id;
        const isFav = favorites.includes(item.id);

        let translationText = '';
        if (targetLang === 'en') {
          translationText = 'Direct Learning';
        } else if (typeof item.translation === 'string' && targetLang === 'tr') {
          translationText = item.translation;
        } else if (item.translation && typeof item.translation === 'object' && item.translation[targetLang]) {
          translationText = item.translation[targetLang];
        } else if (dynamicTranslations[`${item.id}_${targetLang}`]) {
          translationText = dynamicTranslations[`${item.id}_${targetLang}`];
        } else if (targetLang === 'tr' && item.translation && typeof item.translation === 'object' && item.translation['tr']) {
          translationText = item.translation['tr'];
        } else {
          translationText = '...';
        }

        let sentenceTrans = '';
        if (item.sentenceTranslation && item.sentenceTranslation[targetLang]) {
          sentenceTrans = item.sentenceTranslation[targetLang];
        } else if (dynamicSentenceTranslations[`${item.id}_sent_${targetLang}`]) {
          sentenceTrans = dynamicSentenceTranslations[`${item.id}_sent_${targetLang}`];
        }

        return (
          <div
            key={item.id}
            ref={isActive ? activeCardRef : null}
            className={`group relative rounded-2xl border transition-all duration-200 p-4 sm:p-5 ${
              isActive
                ? isLight
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg ring-4 ring-indigo-100 scale-[1.01]'
                  : 'bg-gradient-to-r from-indigo-900/90 via-blue-900/80 to-slate-900 border-indigo-400 shadow-xl ring-2 ring-indigo-500/50 scale-[1.01]'
                : isLight
                ? 'bg-white hover:bg-slate-50/90 border-slate-200/90 text-slate-900 shadow-2xs'
                : 'bg-slate-900/90 hover:bg-slate-900 border-slate-800 text-slate-100'
            }`}
          >
            {/* Header Row: Index, Word, IPA, Translation & Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Left Info Group */}
              <div className="flex items-center gap-3 flex-wrap flex-1">
                {/* Row Index Badge */}
                <span
                  className={`w-7 h-7 rounded-lg border text-xs font-mono font-bold flex items-center justify-center shrink-0 ${
                    isActive
                      ? 'bg-white/20 text-white border-white/30'
                      : isLight
                      ? 'bg-slate-100 border-slate-200 text-slate-600'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  #{index + 1}
                </span>

                {/* English Word with click-to-speak */}
                <div
                  onClick={() => onPlayWord(item, 'english')}
                  className="cursor-pointer inline-flex items-center gap-2 group/word"
                  title="Click to speak English word"
                >
                  <span
                    className={`text-xl sm:text-2xl font-black tracking-tight group-hover/word:underline decoration-2 ${
                      isActive ? 'text-white' : isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {renderHighlightedWord(
                      item.word,
                      item.spellingPattern || selectedPattern || undefined,
                      highlightEnabled,
                      isLight,
                      isActive,
                      item.ipa,
                      item.phonemeSymbol || groupSymbol || undefined
                    )}
                  </span>
                  <Volume2
                    className={`w-4 h-4 transition-transform group-hover/word:scale-110 ${
                      isActive ? 'text-amber-300' : isLight ? 'text-indigo-600' : 'text-indigo-400'
                    }`}
                  />
                </div>

                {/* IPA Phonetic Badge */}
                <span
                  onClick={() => onPlayWord(item, 'english')}
                  className={`cursor-pointer font-mono text-xs sm:text-sm font-bold px-2.5 py-0.5 rounded-full border transition-all ${
                    isActive
                      ? 'bg-amber-400/20 border-amber-300/40 text-amber-200'
                      : isLight
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100'
                      : 'bg-indigo-950/80 border-indigo-800 text-indigo-300 hover:bg-indigo-900'
                  }`}
                  title="Phonetic IPA"
                >
                  /
                  {renderHighlightedIPA(
                    item.ipa.replace(/^\/|\/$/g, ''),
                    item.phonemeSymbol || groupSymbol || undefined,
                    highlightEnabled,
                    isLight,
                    isActive
                  )}
                  /
                </span>

                {/* Target Language Translation Badge (Only if targetLang !== 'en') */}
                {targetLang !== 'en' ? (
                  <div
                    onClick={() => onPlayWord(item, 'translation')}
                    className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border text-sm font-extrabold transition-all ${
                      isActive
                        ? 'bg-white/20 border-white/30 text-white'
                        : isLight
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                        : 'bg-emerald-950/70 border-emerald-800/80 text-emerald-200 hover:bg-emerald-900/80'
                    }`}
                    title={`Click to speak ${langConfig.name}`}
                  >
                    <span className="text-xs">{langConfig.flag}</span>
                    <span>{translationText}</span>
                    <Volume2 className="w-3.5 h-3.5 opacity-80" />
                  </div>
                ) : (
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg border text-[11px] font-bold ${
                      isActive
                        ? 'bg-white/20 border-white/30 text-white'
                        : isLight
                        ? 'bg-slate-100 border-slate-200 text-slate-600'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    🇺🇸 Monolingual
                  </span>
                )}

                {/* Level Badge */}
                {item.level && (
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border ${
                      isActive
                        ? 'bg-white/20 border-white/30 text-white'
                        : isLight
                        ? 'bg-amber-100 border-amber-300 text-amber-900'
                        : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                    }`}
                  >
                    {item.level}
                  </span>
                )}
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                {/* EN + Translation Dual Speaker (Only if targetLang !== 'en') */}
                {targetLang !== 'en' && (
                  <button
                    onClick={() => onPlayWord(item, 'both')}
                    className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs ${
                      isActive
                        ? 'bg-white/20 border-white/30 text-white hover:bg-white/30'
                        : isLight
                        ? 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-800'
                        : 'bg-indigo-950/60 hover:bg-indigo-900/60 border-indigo-800 text-indigo-300'
                    }`}
                    title="Speak English + Translation in sequence"
                  >
                    <Globe className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                    <span>EN + {langConfig.code.toUpperCase()}</span>
                  </button>
                )}

                {/* Favorite Star button */}
                <button
                  onClick={() => onToggleFavorite(item.id)}
                  className={`p-2 rounded-xl border transition-all ${
                    isFav
                      ? 'bg-amber-400 border-amber-300 text-slate-950 font-bold shadow-2xs'
                      : isActive
                      ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                      : isLight
                      ? 'bg-slate-100 hover:bg-slate-200/80 border-slate-200 text-slate-400 hover:text-amber-500'
                      : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-400 hover:text-amber-400'
                  }`}
                  title={isFav ? 'Remove from Favorites' : 'Add to Favorites'}
                >
                  <Star className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Example Sentence Section - Always Visible & Highly Readable */}
            {item.exampleSentence && (
              <div
                onClick={() =>
                  onPlaySentence(
                    item.exampleSentence!,
                    'en-US',
                    sentenceTrans ? { text: sentenceTrans, langCode: langConfig.code } : undefined
                  )
                }
                className={`mt-3.5 p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all hover:scale-[1.005] space-y-2.5 ${
                  isActive
                    ? 'bg-white/10 border-white/20 text-white'
                    : isLight
                    ? 'bg-slate-50 hover:bg-slate-100/90 border-slate-200/80 text-slate-900'
                    : 'bg-slate-950/60 hover:bg-slate-950/90 border-slate-800 text-slate-100'
                }`}
              >
                {/* English Example Sentence */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2 flex-1 min-w-0">
                    <span
                      className={`shrink-0 text-[10px] font-black px-1.5 py-0.5 rounded border uppercase mt-0.5 ${
                        isActive
                          ? 'bg-white/20 border-white/30 text-white'
                          : isLight
                          ? 'bg-indigo-100 border-indigo-200 text-indigo-900'
                          : 'bg-indigo-950 border-indigo-800 text-indigo-200'
                      }`}
                    >
                      EN
                    </span>
                    <p className="text-sm sm:text-base font-bold leading-snug tracking-tight">
                      "{item.exampleSentence}"
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlaySentence(item.exampleSentence!, 'en-US');
                    }}
                    className={`p-1.5 sm:p-2 rounded-lg shrink-0 transition-all ${
                      isLight
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-2xs'
                        : 'bg-indigo-500 text-slate-950 hover:bg-indigo-400 shadow-2xs'
                    }`}
                    title="Speak English Sentence"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Sentence Translation */}
                {sentenceTrans && (
                  <div className="flex items-start justify-between gap-3 pt-2 border-t border-slate-200/80 dark:border-slate-800">
                    <div className="flex items-start gap-2 flex-1 min-w-0">
                      <span
                        className={`shrink-0 text-[10px] font-black px-1.5 py-0.5 rounded border uppercase mt-0.5 ${
                          isActive
                            ? 'bg-white/20 border-white/30 text-white'
                            : isLight
                            ? 'bg-emerald-100 border-emerald-200 text-emerald-900'
                            : 'bg-emerald-950 border-emerald-800 text-emerald-200'
                        }`}
                      >
                        {langConfig.code.toUpperCase()}
                      </span>
                      <p className="text-xs sm:text-sm font-semibold leading-relaxed opacity-90">
                        {sentenceTrans}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlaySentence(sentenceTrans, langConfig.code);
                      }}
                      className={`p-1.5 sm:p-2 rounded-lg shrink-0 transition-all ${
                        isLight
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-2xs'
                          : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-2xs'
                      }`}
                      title={`Speak ${langConfig.name} Sentence`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Pagination Controls (10 by 10 Load More) */}
      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center gap-3">
        {/* Progress Counter Badge */}
        <div
          className={`px-4 py-1.5 rounded-full border text-xs font-bold flex items-center gap-2 ${
            isLight
              ? 'bg-slate-100 border-slate-200 text-slate-700'
              : 'bg-slate-900 border-slate-800 text-slate-300'
          }`}
        >
          <Layers className="w-4 h-4 text-indigo-500" />
          <span>
            {Math.min(visibleCount, totalCount)} / {totalCount} Kelime Gösteriliyor (%
            {Math.round((Math.min(visibleCount, totalCount) / totalCount) * 100)})
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {visibleCount < totalCount && (
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + 10, totalCount))}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95"
            >
              <ChevronDown className="w-4 h-4" />
              <span>Daha Fazla Göster (+10 Kelime)</span>
            </button>
          )}

          {visibleCount < totalCount && (
            <button
              onClick={() => setVisibleCount(totalCount)}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                isLight
                  ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
              }`}
            >
              Hepsini Göster ({totalCount})
            </button>
          )}

          {visibleCount > 10 && (
            <button
              onClick={() => setVisibleCount(10)}
              className={`px-3 py-2.5 rounded-xl border text-xs font-semibold opacity-70 hover:opacity-100 transition-all ${
                isLight
                  ? 'bg-slate-100 border-slate-200 text-slate-600'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              İlk 10'a Dön
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
