import React, { useEffect, useRef, useState } from 'react';
import { Volume2, Play, Star, ChevronDown, ChevronUp, Globe, RefreshCw } from 'lucide-react';
import { WordItem, VoiceSettings } from '../types';
import { translateText } from '../services/translateService';
import { SUPPORTED_LANGUAGES } from '../data/languages';

interface WordColumnViewProps {
  words: WordItem[];
  activeWordId: string | null;
  favorites: string[];
  voiceSettings: VoiceSettings;
  onPlayWord: (word: WordItem, mode?: 'english' | 'translation' | 'both') => void;
  onPlaySentence: (sentence: string) => void;
  onToggleFavorite: (wordId: string) => void;
  theme: 'light' | 'dark';
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
}) => {
  const [expandedSentenceId, setExpandedSentenceId] = useState<string | null>(null);
  const [dynamicTranslations, setDynamicTranslations] = useState<Record<string, string>>({});
  const [loadingTranslations, setLoadingTranslations] = useState<boolean>(false);
  const activeCardRef = useRef<HTMLDivElement | null>(null);

  const isLight = theme === 'light';
  const targetLang = voiceSettings.targetLanguage || 'tr';
  const langConfig =
    SUPPORTED_LANGUAGES.find((l) => l.code === targetLang) || SUPPORTED_LANGUAGES[0];

  // Auto-scroll active card into view during Auto-Play
  useEffect(() => {
    if (activeWordId && activeCardRef.current) {
      activeCardRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeWordId]);

  // Load translations on the fly if needed
  useEffect(() => {
    let isMounted = true;
    async function loadTranslations() {
      const missingWords = words.filter(
        (w) => (!w.translation || (typeof w.translation === 'object' && !w.translation[targetLang])) && !dynamicTranslations[`${w.id}_${targetLang}`]
      );

      if (missingWords.length === 0) return;

      setLoadingTranslations(true);
      const newTrans: Record<string, string> = {};

      for (const item of missingWords) {
        if (!isMounted) break;
        const result = await translateText(item.word, targetLang);
        newTrans[`${item.id}_${targetLang}`] = result;
      }

      if (isMounted) {
        setDynamicTranslations((prev) => ({ ...prev, ...newTrans }));
        setLoadingTranslations(false);
      }
    }

    loadTranslations();

    return () => {
      isMounted = false;
    };
  }, [words, targetLang]);

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

  return (
    <div className="flex flex-col gap-3 pb-24">
      {/* Translation notice banner */}
      {loadingTranslations && (
        <div
          className={`flex items-center gap-2 px-3 py-2 border rounded-xl text-xs font-medium animate-pulse ${
            isLight
              ? 'bg-indigo-50 border-indigo-200 text-indigo-800'
              : 'bg-blue-950/40 border-blue-500/30 text-blue-300'
          }`}
        >
          <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-500" />
          <span>
            Fetching Google Translate {langConfig.flag} {langConfig.name} equivalents...
          </span>
        </div>
      )}

      {/* Vertical Column of Word Cards */}
      {words.map((item, index) => {
        const isActive = activeWordId === item.id;
        const isFav = favorites.includes(item.id);
        const isExpanded = expandedSentenceId === item.id;

        const translationText =
          (typeof item.translation === 'string'
            ? item.translation
            : item.translation?.[targetLang]) ||
          dynamicTranslations[`${item.id}_${targetLang}`] ||
          (item.translation && typeof item.translation === 'object'
            ? item.translation['tr'] || Object.values(item.translation)[0]
            : '') ||
          '...';

        return (
          <div
            key={item.id}
            ref={isActive ? activeCardRef : null}
            className={`group relative rounded-2xl border transition-all duration-200 p-4 md:p-5 ${
              isActive
                ? isLight
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md ring-4 ring-indigo-50'
                  : 'bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900 border-blue-500 shadow-xl ring-2 ring-blue-500/50 scale-[1.01]'
                : isLight
                ? 'bg-slate-50 hover:bg-slate-100/90 border-slate-200 text-slate-900 shadow-sm'
                : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800/90 hover:border-slate-700/80 text-slate-100'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Word info */}
              <div className="flex items-center gap-3 md:gap-4 flex-1">
                {/* Row Number */}
                <span
                  className={`w-8 h-8 rounded-xl border text-xs font-mono font-bold flex items-center justify-center shrink-0 ${
                    isActive
                      ? 'bg-white/20 text-white border-white/30'
                      : isLight
                      ? 'bg-slate-200 border-slate-300 text-slate-700'
                      : 'bg-slate-800 border-slate-700/80 text-slate-400'
                  }`}
                >
                  #{index + 1}
                </span>

                {/* Primary Play Button */}
                <button
                  onClick={() => onPlayWord(item, 'english')}
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-all ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-400/30 animate-pulse'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 hover:scale-105'
                  }`}
                  title="Speak English"
                >
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </button>

                {/* Word & IPA & Translation */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span
                      className={`text-lg md:text-xl font-bold tracking-wide ${
                        isActive ? 'text-white' : isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {item.word}
                    </span>
                    <span
                      className={`text-xs md:text-sm font-mono font-medium ${
                        isActive
                          ? 'text-amber-200'
                          : isLight
                          ? 'text-indigo-600'
                          : 'text-indigo-300'
                      }`}
                    >
                      {item.ipa}
                    </span>
                  </div>

                  {/* Translation pill */}
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`px-2.5 py-0.5 rounded-lg border text-xs font-semibold flex items-center gap-1 ${
                        isActive
                          ? 'bg-white/20 border-white/30 text-white'
                          : isLight
                          ? 'bg-white border-slate-200 text-emerald-700'
                          : 'bg-slate-800 border-slate-700/80 text-emerald-400'
                      }`}
                    >
                      <span className="text-[10px]">{langConfig.flag}</span>
                      <span>{translationText}</span>
                    </span>

                    {item.level && (
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                          isActive
                            ? 'bg-white/20 border-white/30 text-white'
                            : isLight
                            ? 'bg-amber-100 border-amber-300 text-amber-800'
                            : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                        }`}
                      >
                        {item.level}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                {/* Both Button */}
                <button
                  onClick={() => onPlayWord(item, 'both')}
                  className={`px-2.5 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-white/20 border-white/30 text-white'
                      : isLight
                      ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                      : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                  }`}
                  title="Speak English + Translation"
                >
                  <Globe className="w-3.5 h-3.5 text-indigo-500" />
                  <span className="hidden md:inline">EN + {langConfig.name}</span>
                </button>

                {/* Translation Speaker Only */}
                <button
                  onClick={() => onPlayWord(item, 'translation')}
                  className={`p-2 rounded-xl border transition-all ${
                    isActive
                      ? 'bg-white/20 border-white/30 text-white'
                      : isLight
                      ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700 hover:text-emerald-600'
                      : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300 hover:text-emerald-400'
                  }`}
                  title={`Speak ${langConfig.name} Translation`}
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                {/* Example sentence toggle */}
                {item.exampleSentence && (
                  <button
                    onClick={() => setExpandedSentenceId(isExpanded ? null : item.id)}
                    className={`p-2 rounded-xl border transition-all ${
                      isExpanded
                        ? isActive
                          ? 'bg-white/30 border-white/40 text-white'
                          : 'bg-indigo-100 border-indigo-300 text-indigo-800'
                        : isActive
                        ? 'bg-white/10 border-white/20 text-white'
                        : isLight
                        ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-600'
                        : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-400'
                    }`}
                    title="Example Sentence"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                )}

                {/* Favorite Star button */}
                <button
                  onClick={() => onToggleFavorite(item.id)}
                  className={`p-2 rounded-xl border transition-all ${
                    isFav
                      ? 'bg-amber-400 border-amber-300 text-slate-950 font-bold shadow-sm'
                      : isActive
                      ? 'bg-white/10 border-white/20 text-white'
                      : isLight
                      ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-400 hover:text-amber-500'
                      : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-500 hover:text-slate-300'
                  }`}
                  title={isFav ? 'Remove from Favorites' : 'Add to Favorites'}
                >
                  <Star className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Example sentence expandable section */}
            {isExpanded && item.exampleSentence && (
              <div
                className={`mt-3 pt-3 border-t -mx-4 -mb-4 p-4 rounded-b-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  isActive
                    ? 'border-white/20 bg-white/10'
                    : isLight
                    ? 'border-slate-200 bg-slate-100/80'
                    : 'border-slate-800/80 bg-slate-950/40'
                }`}
              >
                <div className="space-y-1">
                  <div
                    className={`text-xs md:text-sm font-medium italic ${
                      isActive ? 'text-white' : isLight ? 'text-slate-800' : 'text-slate-200'
                    }`}
                  >
                    "{item.exampleSentence}"
                  </div>
                  {item.sentenceTranslation && item.sentenceTranslation[targetLang] && (
                    <div
                      className={`text-xs ${
                        isActive ? 'text-indigo-100' : isLight ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      → {item.sentenceTranslation[targetLang]}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => onPlaySentence(item.exampleSentence!)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors ${
                    isActive
                      ? 'bg-white text-indigo-900 border-white'
                      : isLight
                      ? 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800 border-indigo-200'
                      : 'bg-blue-600/30 hover:bg-blue-600/50 border-blue-500/40 text-blue-200'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Speak Sentence</span>
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
