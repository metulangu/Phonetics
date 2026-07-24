import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  Play,
  Star,
  ChevronLeft,
  ChevronRight,
  Globe,
  Sparkles,
  VolumeX,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
} from 'lucide-react';
import { WordItem, VoiceSettings } from '../types';
import { translateText } from '../services/translateService';
import { SUPPORTED_LANGUAGES } from '../data/languages';

interface WordSlideViewProps {
  words: WordItem[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  activeWordId: string | null;
  favorites: string[];
  voiceSettings: VoiceSettings;
  onPlayWord: (word: WordItem, mode?: 'english' | 'translation' | 'both') => void;
  onPlaySentence: (sentence: string) => void;
  onToggleFavorite: (wordId: string) => void;
  theme: 'light' | 'dark';
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
  theme,
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

  // Dynamic Translation fetch for current slide card
  useEffect(() => {
    let isMounted = true;
    if (!currentWord) return;

    const existingTrans = typeof currentWord.translation === 'string'
      ? currentWord.translation
      : (currentWord.translation?.[targetLang] || (currentWord.translation ? Object.values(currentWord.translation)[0] : ''));
    if (existingTrans) {
      setDynamicTranslation(existingTrans);
      setLoadingTranslation(false);
      return;
    }

    setLoadingTranslation(true);
    translateText(currentWord.word, targetLang).then((res) => {
      if (isMounted) {
        setDynamicTranslation(res);
        setLoadingTranslation(false);
      }
    });

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
    <div className="flex flex-col items-center justify-center py-4 px-2 w-full max-w-4xl mx-auto">
      {/* Slide Navigation Header Bar */}
      <div className="w-full flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${
              isLight
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                : 'bg-indigo-950/60 text-indigo-300 border-indigo-800'
            }`}
          >
            Slide {currentIndex + 1} / {total}
          </span>
          {currentWord.level && (
            <span
              className={`px-2.5 py-0.5 rounded-md text-xs font-bold border ${
                isLight
                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
              }`}
            >
              {currentWord.level}
            </span>
          )}
        </div>

        {/* Slide Counter & Keyboard Tip */}
        <div className="hidden sm:flex items-center gap-2 text-xs opacity-75">
          <span
            className={`px-2 py-0.5 rounded border text-[11px] font-mono ${
              isLight ? 'bg-slate-100 border-slate-300' : 'bg-slate-800 border-slate-700'
            }`}
          >
            ← → Use Arrow Keys
          </span>
        </div>
      </div>

      {/* Main Slide Card with Horizontal Slide Container */}
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="relative w-full overflow-hidden select-none"
      >
        <div
          className={`relative rounded-3xl border transition-all duration-300 p-8 md:p-12 shadow-xl ${
            isActivePlaying
              ? isLight
                ? 'bg-indigo-600 text-white border-indigo-500 ring-4 ring-indigo-100 shadow-indigo-200'
                : 'bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white border-indigo-500 ring-4 ring-indigo-500/30'
              : isLight
              ? 'bg-white border-slate-200 text-slate-900 shadow-slate-200/60 hover:border-slate-300'
              : 'bg-slate-900 border-slate-800 text-slate-100 shadow-black/40'
          }`}
        >
          {/* Top Card Controls */}
          <div className="flex items-center justify-between mb-6">
            <span
              className={`text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-lg ${
                isActivePlaying
                  ? 'bg-white/20 text-white'
                  : isLight
                  ? 'bg-slate-100 text-indigo-600'
                  : 'bg-slate-800 text-indigo-400'
              }`}
            >
              {currentWord.phonemeSymbol ? `Phoneme: ${currentWord.phonemeSymbol}` : 'Word Card'}
            </span>

            <button
              onClick={() => onToggleFavorite(currentWord.id)}
              className={`p-3 rounded-2xl border transition-all ${
                isFav
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md'
                  : isActivePlaying
                  ? 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  : isLight
                  ? 'bg-slate-100 text-slate-400 border-slate-200 hover:text-amber-500'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-amber-400'
              }`}
              title={isFav ? 'Remove from Favorites' : 'Add to Favorites'}
            >
              <Star className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Center Content: Large Word & IPA */}
          <div className="text-center my-6">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-2">
              {currentWord.word}
            </h2>
            <div className="inline-block px-4 py-1.5 rounded-xl font-mono text-xl md:text-2xl font-bold tracking-wider mb-4 opacity-90">
              <span
                className={
                  isActivePlaying
                    ? 'text-amber-300'
                    : isLight
                    ? 'text-indigo-600'
                    : 'text-indigo-300'
                }
              >
                {currentWord.ipa}
              </span>
            </div>

            {/* Translation Display */}
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="text-xl md:text-3xl font-semibold italic opacity-95">
                {loadingTranslation ? (
                  <span className="inline-flex items-center gap-2 text-sm">
                    <RefreshCw className="w-4 h-4 animate-spin" /> Translating...
                  </span>
                ) : (
                  dynamicTranslation || '...'
                )}
              </span>
              <span className="text-xs px-2 py-0.5 rounded font-bold uppercase opacity-75 border border-current">
                {langConfig.flag} {langConfig.code}
              </span>
            </div>
          </div>

          {/* Sound Action Buttons Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {/* Primary Big English Speaker Button */}
            <button
              onClick={() => onPlayWord(currentWord, 'english')}
              className={`px-6 py-3.5 rounded-2xl font-bold text-base flex items-center gap-2.5 transition-all shadow-lg active:scale-95 ${
                isActivePlaying
                  ? 'bg-amber-400 text-slate-950 shadow-amber-400/30 ring-4 ring-amber-300/40 animate-pulse'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
              }`}
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Speak English</span>
            </button>

            {/* Read Both Button */}
            <button
              onClick={() => onPlayWord(currentWord, 'both')}
              className={`px-5 py-3.5 rounded-2xl font-semibold text-sm flex items-center gap-2 transition-all border ${
                isActivePlaying
                  ? 'bg-white/20 text-white border-white/40'
                  : isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              <Globe className="w-4 h-4 text-indigo-500" />
              <span>EN + {langConfig.name}</span>
            </button>

            {/* Read Translation Only */}
            <button
              onClick={() => onPlayWord(currentWord, 'translation')}
              className={`px-4 py-3.5 rounded-2xl font-medium text-sm flex items-center gap-2 transition-all border ${
                isActivePlaying
                  ? 'bg-white/10 text-white border-white/30'
                  : isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
              title="Speak Translation Only"
            >
              <Volume2 className="w-4 h-4 text-emerald-500" />
              <span>Speak Translation</span>
            </button>
          </div>

          {/* Example Sentence Section */}
          {currentWord.exampleSentence && (
            <div
              className={`mt-8 pt-6 border-t ${
                isActivePlaying
                  ? 'border-white/20 bg-white/5 -mx-8 -mb-8 p-6 rounded-b-3xl'
                  : isLight
                  ? 'border-slate-200 bg-slate-50 -mx-8 -mb-8 p-6 rounded-b-3xl'
                  : 'border-slate-800 bg-slate-950/60 -mx-8 -mb-8 p-6 rounded-b-3xl'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs uppercase tracking-wider font-bold text-indigo-500">
                    Example Sentence
                  </div>
                  <div className="text-sm md:text-base font-medium italic">
                    "{currentWord.exampleSentence}"
                  </div>
                  {currentWord.sentenceTranslation &&
                    currentWord.sentenceTranslation[targetLang] && (
                      <div className="text-xs opacity-80">
                        → {currentWord.sentenceTranslation[targetLang]}
                      </div>
                    )}
                </div>

                <button
                  onClick={() => onPlaySentence(currentWord.exampleSentence!)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 transition-all ${
                    isLight
                      ? 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800'
                      : 'bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-800'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Speak Sentence</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Previous Slide Button (Left Arrow) */}
        <button
          onClick={() => onIndexChange(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className={`absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full border shadow-xl transition-all ${
            currentIndex === 0
              ? 'opacity-30 cursor-not-allowed bg-slate-200 text-slate-400 border-transparent'
              : isLight
              ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-slate-300'
              : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
          }`}
          title="Previous Slide (Left Arrow)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Slide Button (Right Arrow) */}
        <button
          onClick={() => onIndexChange(Math.min(total - 1, currentIndex + 1))}
          disabled={currentIndex === total - 1}
          className={`absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full border shadow-xl transition-all ${
            currentIndex === total - 1
              ? 'opacity-30 cursor-not-allowed bg-slate-200 text-slate-400 border-transparent'
              : isLight
              ? 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-500 shadow-indigo-200'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-500'
          }`}
          title="Next Slide (Right Arrow)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Progress Dots / Slider Bar */}
      <div className="w-full mt-6 px-4">
        <div className="flex items-center justify-between text-xs font-semibold mb-2">
          <button
            onClick={() => onIndexChange(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="flex items-center gap-1 hover:underline disabled:opacity-40"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Previous
          </button>

          <span className="font-mono text-xs opacity-75">
            {currentIndex + 1} / {total}
          </span>

          <button
            onClick={() => onIndexChange(Math.min(total - 1, currentIndex + 1))}
            disabled={currentIndex === total - 1}
            className="flex items-center gap-1 hover:underline disabled:opacity-40"
          >
            Next <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Interactive Slide Track */}
        <input
          type="range"
          min={0}
          max={total - 1}
          value={currentIndex}
          onChange={(e) => onIndexChange(Number(e.target.value))}
          className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg overflow-hidden"
        />
      </div>
    </div>
  );
};
