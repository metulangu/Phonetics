import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  Star,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { WordItem, VoiceSettings } from '../types';
import { translateText } from '../services/translateService';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { renderHighlightedWord, renderHighlightedIPA } from '../utils/highlightUtils';

interface WordSlideViewProps {
  words: WordItem[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  activeWordId: string | null;
  favorites: string[];
  voiceSettings: VoiceSettings;
  onPlayWord: (word: WordItem, mode?: 'english' | 'translation' | 'both') => void;
  onPlaySentence: (sentence: string, langCode?: string, followUp?: { text: string; langCode: string }) => void;
  onToggleFavorite: (wordId: string) => void;
  selectedPattern?: string | null;
  onClearPattern?: () => void;
  theme: 'light' | 'dark';
  highlightEnabled?: boolean;
  onToggleHighlight?: () => void;
  groupSymbol?: string;
}

export const WordSlideView: React.FC<WordSlideViewProps> = ({
  words,
  currentIndex,
  onIndexChange,
  activeWordId,
  favorites,
  voiceSettings,
  onPlayWord,
  onPlaySentence,
  onToggleFavorite,
  selectedPattern,
  onClearPattern,
  theme,
  highlightEnabled = true,
  onToggleHighlight,
  groupSymbol,
}) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [dynamicTranslation, setDynamicTranslation] = useState<string>('');
  const [loadingTranslation, setLoadingTranslation] = useState<boolean>(false);

  const isLight = theme === 'light';
  const targetLang = voiceSettings.targetLanguage || 'tr';
  const langConfig =
    SUPPORTED_LANGUAGES.find((l) => l.code === targetLang) || SUPPORTED_LANGUAGES[0];

  const currentWord = words[currentIndex] || words[0];
  const total = words.length;

  // Keyboard arrow listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        if (currentIndex < total - 1) onIndexChange(currentIndex + 1);
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) onIndexChange(currentIndex - 1);
      } else if (e.key === ' ') {
        e.preventDefault();
        if (currentWord) onPlayWord(currentWord, 'english');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, total, currentWord, onIndexChange, onPlayWord]);

  const [dynamicSentenceTranslation, setDynamicSentenceTranslation] = useState<string>('');

  // Dynamic Translation fetch for current slide card
  useEffect(() => {
    let isMounted = true;
    if (!currentWord) return;

    if (targetLang === 'en') {
      setDynamicTranslation('Direct Learning');
      setLoadingTranslation(false);
      return;
    }

    // Check if translation exists for the specific target language
    let existingTrans = '';
    if (typeof currentWord.translation === 'string') {
      if (targetLang === 'tr') existingTrans = currentWord.translation;
    } else if (currentWord.translation && typeof currentWord.translation === 'object') {
      if (currentWord.translation[targetLang]) {
        existingTrans = currentWord.translation[targetLang];
      } else if (targetLang === 'tr' && currentWord.translation['tr']) {
        existingTrans = currentWord.translation['tr'];
      }
    }

    if (existingTrans) {
      setDynamicTranslation(existingTrans);
      setLoadingTranslation(false);
    } else {
      setLoadingTranslation(true);
      translateText(currentWord.word, targetLang).then((res) => {
        if (isMounted) {
          setDynamicTranslation(res);
          setLoadingTranslation(false);
        }
      });
    }

    // Sentence Translation
    if (currentWord.exampleSentence && targetLang !== 'en') {
      let existingSentence = '';
      if (currentWord.sentenceTranslation && typeof currentWord.sentenceTranslation === 'object') {
        if (currentWord.sentenceTranslation[targetLang]) {
          existingSentence = currentWord.sentenceTranslation[targetLang];
        } else if (targetLang === 'tr' && currentWord.sentenceTranslation['tr']) {
          existingSentence = currentWord.sentenceTranslation['tr'];
        }
      }

      if (existingSentence) {
        setDynamicSentenceTranslation(existingSentence);
      } else {
        translateText(currentWord.exampleSentence, targetLang).then((res) => {
          if (isMounted) {
            setDynamicSentenceTranslation(res);
          }
        });
      }
    } else {
      setDynamicSentenceTranslation('');
    }

    return () => {
      isMounted = false;
    };
  }, [currentWord, targetLang]);

  // Touch handlers for mobile horizontal slide gesture
  const minSwipeDistance = 50;
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < total - 1) {
      onIndexChange(currentIndex + 1);
    } else if (isRightSwipe && currentIndex > 0) {
      onIndexChange(currentIndex - 1);
    }
  };

  if (!currentWord || total === 0) {
    return (
      <div
        className={`p-12 text-center rounded-2xl border my-6 ${
          isLight
            ? 'bg-white border-slate-200 text-slate-500 shadow-sm'
            : 'bg-slate-900 border-slate-800 text-slate-400'
        }`}
      >
        <Volume2 className="w-12 h-12 mx-auto text-slate-400 mb-3" />
        <p className="text-base font-semibold">No words found to display</p>
      </div>
    );
  }

  const isFav = favorites.includes(currentWord.id);
  const isActivePlaying = activeWordId === currentWord.id;

  return (
    <div className="flex flex-col items-center justify-center py-2 px-2 w-full max-w-4xl mx-auto">
      {/* Top Info Header */}
      <div className="w-full flex items-center justify-between mb-2 px-2 text-xs opacity-85">
        <div className="flex items-center gap-2 min-w-0">
          {selectedPattern ? (
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-indigo-600 dark:text-indigo-400 font-extrabold text-[11px]">
                Pattern:
              </span>
              <span className="font-mono font-extrabold px-1.5 py-0.5 rounded border text-[11px] bg-indigo-100/80 dark:bg-indigo-900/80 border-indigo-200 dark:border-indigo-800">
                {selectedPattern}
              </span>
              <span className="opacity-60 text-[11px] font-mono">({total} words)</span>
              {onClearPattern && (
                <button
                  onClick={onClearPattern}
                  className="text-[11px] text-rose-500 hover:underline font-bold ml-1"
                >
                  ✕ Clear
                </button>
              )}
            </div>
          ) : (
            <span className="font-semibold text-[11px] text-slate-500 dark:text-slate-400">
              {langConfig.flag} {langConfig.name} Learning • {total} Words
            </span>
          )}
        </div>

        <span
          className={`hidden sm:inline-block px-2 py-0.5 rounded border text-[11px] font-mono shrink-0 ${
            isLight ? 'bg-slate-100 border-slate-300 text-slate-600' : 'bg-slate-800 border-slate-700 text-slate-400'
          }`}
        >
          ← → Keyboard Arrows
        </span>
      </div>

      {/* Main Slide Card */}
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="relative w-full select-none"
      >
        <div
          className={`relative rounded-3xl border transition-all duration-300 p-6 sm:p-8 shadow-xl flex flex-col justify-between min-h-[380px] sm:min-h-[420px] ${
            isActivePlaying
              ? isLight
                ? 'bg-indigo-600 text-white border-indigo-500 ring-4 ring-indigo-100 shadow-indigo-200'
                : 'bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white border-indigo-500 ring-4 ring-indigo-500/30'
              : isLight
              ? 'bg-white border-slate-200 text-slate-900 shadow-slate-200/60 hover:border-slate-300'
              : 'bg-slate-900 border-slate-800 text-slate-100 shadow-black/40'
          }`}
        >
          {/* Top Corner 1: Level / Phoneme Badge (Top Left) */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            {currentWord.level && (
              <span
                className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                  isActivePlaying
                    ? 'bg-white/20 border-white/30 text-white'
                    : isLight
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                    : 'bg-indigo-950/80 text-indigo-300 border-indigo-800'
                }`}
              >
                {currentWord.level}
              </span>
            )}
            {currentWord.phonemeSymbol && (
              <span
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border ${
                  isActivePlaying
                    ? 'bg-white/20 border-white/30 text-white'
                    : isLight
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-amber-950/60 text-amber-300 border-amber-800'
                }`}
              >
                /{currentWord.phonemeSymbol}/
              </span>
            )}
          </div>

          {/* Top Corner 2: Highlight Toggle & Favorite Star Button (Top Right) */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            {onToggleHighlight && (
              <button
                type="button"
                onClick={onToggleHighlight}
                className={`px-2.5 py-1.5 rounded-2xl border text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-2xs ${
                  highlightEnabled
                    ? isActivePlaying
                      ? 'bg-amber-300 text-slate-950 border-amber-200 shadow-md'
                      : isLight
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-indigo-600/30'
                      : 'bg-indigo-600 text-white border-indigo-500 shadow-indigo-500/30'
                    : isActivePlaying
                    ? 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                    : isLight
                    ? 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                }`}
                title="Harf Deseni ve IPA Vurgusunu Göster / Gizle"
              >
                <Sparkles className={`w-3.5 h-3.5 ${highlightEnabled ? 'text-amber-300 fill-amber-300' : 'text-slate-400'}`} />
                <span className="hidden sm:inline text-[11px] font-bold">
                  {highlightEnabled ? 'Vurgu Açık' : 'Vurgu Kapalı'}
                </span>
                {/* Sliding Switch Indicator */}
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
            )}

            <button
              onClick={() => onToggleFavorite(currentWord.id)}
              className={`p-2.5 rounded-2xl border transition-all active:scale-90 ${
                isFav
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md ring-2 ring-amber-300/50'
                  : isActivePlaying
                  ? 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  : isLight
                  ? 'bg-slate-100 text-slate-400 border-slate-200 hover:text-amber-500 hover:bg-amber-50'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-amber-400 hover:bg-slate-700'
              }`}
              title={isFav ? 'Remove from Favorites' : 'Add to Favorites'}
            >
              <Star className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Main Card Content (Pushed higher up) */}
          <div className="pt-8 pb-4 flex flex-col items-center justify-center text-center">
            {/* English Word (Interactive Play on Click) */}
            <div
              onClick={() => onPlayWord(currentWord, 'english')}
              className="group cursor-pointer flex items-center justify-center gap-3 my-1 transition-transform hover:scale-105"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-normal leading-tight">
                {renderHighlightedWord(
                  currentWord.word,
                  currentWord.spellingPattern || selectedPattern || undefined,
                  highlightEnabled,
                  isLight,
                  isActivePlaying,
                  currentWord.ipa,
                  currentWord.phonemeSymbol || groupSymbol || undefined
                )}
              </h2>
              <button
                className={`p-2.5 rounded-2xl transition-all ${
                  isActivePlaying
                    ? 'bg-amber-400 text-slate-950 shadow-md animate-pulse'
                    : isLight
                    ? 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white shadow-2xs'
                    : 'bg-slate-800 text-indigo-300 group-hover:bg-indigo-600 group-hover:text-white shadow-2xs'
                }`}
                title="Listen to English Word"
              >
                <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* IPA & Translation Stacked Below */}
            <div className="mt-3 flex flex-col items-center gap-2">
              {/* IPA Badge */}
              <div
                onClick={() => onPlayWord(currentWord, 'english')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full font-mono text-base sm:text-lg font-bold tracking-wide border cursor-pointer transition-all shadow-2xs ${
                  isActivePlaying
                    ? 'bg-amber-400/20 border-amber-300/50 text-amber-200'
                    : isLight
                    ? 'bg-indigo-50/90 border-indigo-200 text-indigo-700 hover:bg-indigo-100'
                    : 'bg-indigo-950/80 border-indigo-800 text-indigo-300 hover:bg-indigo-900'
                }`}
                title="Phonetic IPA"
              >
                <span>
                  /
                  {renderHighlightedIPA(
                    currentWord.ipa.replace(/^\/|\/$/g, ''),
                    currentWord.phonemeSymbol || groupSymbol || undefined,
                    highlightEnabled,
                    isLight,
                    isActivePlaying
                  )}
                  /
                </span>
              </div>

              {/* Translation with Speaker Button (Hidden or Sleek Pill in Monolingual English mode) */}
              {targetLang !== 'en' ? (
                <div
                  onClick={() => onPlayWord(currentWord, 'translation')}
                  className={`group/tr cursor-pointer inline-flex items-center justify-center gap-2.5 px-4 py-1.5 rounded-2xl border transition-all ${
                    isActivePlaying
                      ? 'bg-white/10 border-white/20 text-white'
                      : isLight
                      ? 'bg-emerald-50/80 hover:bg-emerald-100/80 border-emerald-200/80 text-emerald-800'
                      : 'bg-emerald-950/60 hover:bg-emerald-900/60 border-emerald-800/80 text-emerald-200'
                  }`}
                >
                  <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {loadingTranslation ? (
                      <span className="inline-flex items-center gap-2 text-sm font-normal">
                        <RefreshCw className="w-4 h-4 animate-spin" /> Translating...
                      </span>
                    ) : (
                      dynamicTranslation || '...'
                    )}
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md font-extrabold uppercase border ${
                      isActivePlaying
                        ? 'border-white/40 bg-white/20 text-white'
                        : isLight
                        ? 'border-emerald-300 bg-emerald-100 text-emerald-900'
                        : 'border-emerald-700 bg-emerald-900/80 text-emerald-200'
                    }`}
                  >
                    {langConfig.flag} {langConfig.code}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayWord(currentWord, 'translation');
                    }}
                    className={`p-1.5 rounded-xl transition-all ${
                      isActivePlaying
                        ? 'bg-amber-400 text-slate-950 shadow-sm'
                        : isLight
                        ? 'bg-emerald-600 text-white shadow-2xs hover:bg-emerald-700'
                        : 'bg-emerald-500 text-slate-950 shadow-2xs hover:bg-emerald-400'
                    }`}
                    title={`Listen to ${langConfig.name}`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border text-xs font-bold tracking-tight ${
                    isActivePlaying
                      ? 'bg-white/10 border-white/20 text-white/90'
                      : isLight
                      ? 'bg-slate-100/80 border-slate-200 text-slate-600'
                      : 'bg-slate-800/60 border-slate-700 text-slate-400'
                  }`}
                >
                  <span>🇺🇸 Monolingual English</span>
                </div>
              )}
            </div>

            {/* Example Sentence Section (Clicking container plays EN + TR sequence) */}
            {currentWord.exampleSentence && (
              <div
                onClick={() =>
                  onPlaySentence(
                    currentWord.exampleSentence!,
                    'en-US',
                    dynamicSentenceTranslation ? { text: dynamicSentenceTranslation, langCode: langConfig.code } : undefined
                  )
                }
                className={`mt-5 p-5 sm:p-6 rounded-2xl border w-full max-w-2xl sm:max-w-3xl cursor-pointer transition-all hover:scale-[1.01] text-left space-y-3 shadow-2xs ${
                  isActivePlaying
                    ? 'bg-white/10 border-white/20 text-white'
                    : isLight
                    ? 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-900'
                    : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-100'
                }`}
              >
                {/* English Sentence Line */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2 flex-1 min-w-0">
                    <span
                      className={`shrink-0 text-[10px] font-black px-1.5 py-0.5 rounded border uppercase mt-0.5 ${
                        isActivePlaying
                          ? 'bg-white/20 border-white/30 text-white'
                          : isLight
                          ? 'bg-indigo-100 border-indigo-200 text-indigo-900'
                          : 'bg-indigo-950 border-indigo-800 text-indigo-200'
                      }`}
                    >
                      EN
                    </span>
                    <p className="text-base sm:text-lg font-bold leading-snug tracking-tight">
                      "{currentWord.exampleSentence}"
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlaySentence(currentWord.exampleSentence!, 'en-US');
                    }}
                    className={`p-2 rounded-xl shrink-0 transition-all shadow-2xs ${
                      isLight
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-indigo-500 text-slate-950 hover:bg-indigo-400'
                    }`}
                    title="Listen to English Sentence"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Translated Sentence Line */}
                {dynamicSentenceTranslation && (
                  <div className="flex items-start justify-between gap-3 pt-2.5 border-t border-slate-200 dark:border-slate-700/60">
                    <div className="flex items-start gap-2 flex-1 min-w-0">
                      <span
                        className={`shrink-0 text-[10px] font-black px-1.5 py-0.5 rounded border uppercase mt-0.5 ${
                          isActivePlaying
                            ? 'bg-white/20 border-white/30 text-white'
                            : isLight
                            ? 'bg-emerald-100 border-emerald-200 text-emerald-900'
                            : 'bg-emerald-950 border-emerald-800 text-emerald-200'
                        }`}
                      >
                        {langConfig.code.toUpperCase()}
                      </span>
                      <p className="text-sm sm:text-base font-semibold leading-relaxed opacity-95">
                        {dynamicSentenceTranslation}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlaySentence(dynamicSentenceTranslation, langConfig.code);
                      }}
                      className={`p-2 rounded-xl shrink-0 transition-all shadow-2xs ${
                        isLight
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                          : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                      }`}
                      title={`Listen to ${langConfig.name} Sentence`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Integrated Bottom Bar Inside Card (Progress, Counter & Navigation) */}
          <div
            className={`mt-4 pt-4 border-t flex flex-col gap-2.5 ${
              isActivePlaying
                ? 'border-white/20'
                : isLight
                ? 'border-slate-100'
                : 'border-slate-800'
            }`}
          >
            {/* Nav Buttons + Counter */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => onIndexChange(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 transition-all ${
                  currentIndex === 0
                    ? 'opacity-30 cursor-not-allowed border-transparent'
                    : isActivePlaying
                    ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                    : isLight
                    ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                    : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                }`}
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${
                  isActivePlaying
                    ? 'bg-amber-400 text-slate-950 border-amber-300'
                    : isLight
                    ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                    : 'bg-indigo-950 text-indigo-300 border-indigo-800'
                }`}
              >
                {currentIndex + 1} / {total}
              </span>

              <button
                onClick={() => onIndexChange(Math.min(total - 1, currentIndex + 1))}
                disabled={currentIndex === total - 1}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 transition-all ${
                  currentIndex === total - 1
                    ? 'opacity-30 cursor-not-allowed border-transparent'
                    : isActivePlaying
                    ? 'bg-amber-400 text-slate-950 border-amber-300 hover:bg-amber-300'
                    : isLight
                    ? 'bg-indigo-600 text-white border-indigo-500 hover:bg-indigo-500 shadow-sm'
                    : 'bg-indigo-600 text-white border-indigo-500 hover:bg-indigo-500'
                }`}
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Progress Bar Slider */}
            <input
              type="range"
              min={0}
              max={total - 1}
              value={currentIndex}
              onChange={(e) => onIndexChange(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200/80 dark:bg-slate-700 rounded-lg overflow-hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
