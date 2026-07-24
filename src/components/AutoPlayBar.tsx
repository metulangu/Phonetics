import React from 'react';
import {
  Play,
  Pause,
  Square,
  SkipBack,
  SkipForward,
  Clock,
  Gauge,
  Repeat,
} from 'lucide-react';
import { PlayMode, VoiceSettings, WordItem } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { t } from '../utils/i18n';

interface AutoPlayBarProps {
  isAutoPlaying: boolean;
  isPaused: boolean;
  activeSpeakingWordId?: string | null;
  currentIndex: number;
  totalWords: number;
  activeWord: WordItem | null;
  voiceSettings: VoiceSettings;
  onUpdateSettings: (newSettings: Partial<VoiceSettings>) => void;
  onTogglePlayPause: () => void;
  onStartAutoPlay: () => void;
  onPlayCurrentCard: () => void;
  onStop: () => void;
  onNext: () => void;
  onPrev: () => void;
  theme: 'light' | 'dark';
}

export const AutoPlayBar: React.FC<AutoPlayBarProps> = ({
  isAutoPlaying,
  isPaused,
  activeSpeakingWordId,
  currentIndex,
  totalWords,
  activeWord,
  voiceSettings,
  onUpdateSettings,
  onTogglePlayPause,
  onStartAutoPlay,
  onPlayCurrentCard,
  onStop,
  onNext,
  onPrev,
  theme,
}) => {
  const isLight = theme === 'light';
  const isCardSpeaking = !!activeSpeakingWordId;

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === voiceSettings.targetLanguage);
  const targetCode = voiceSettings.targetLanguage ? voiceSettings.targetLanguage.toUpperCase() : 'TARGET';
  const targetName = currentLangObj ? (currentLangObj.nativeName || currentLangObj.name) : 'Translation';

  return (
    <div
      className={`w-full max-w-4xl mx-auto mb-4 p-2.5 sm:p-3 md:p-3.5 rounded-2xl border transition-all shadow-md ${
        isLight
          ? isAutoPlaying
            ? 'bg-white border-indigo-500 text-slate-800 ring-2 ring-indigo-500/20 shadow-indigo-100'
            : 'bg-white/95 border-slate-200 text-slate-800 shadow-slate-100'
          : isAutoPlaying
          ? 'bg-slate-900 border-indigo-500 text-slate-100 ring-2 ring-indigo-500/30'
          : 'bg-slate-900 border-slate-800 text-slate-200'
      }`}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-2.5 max-w-full">
        {/* Left & Center Controls Container */}
        <div className="flex items-center justify-between md:justify-start gap-2 w-full md:w-auto shrink-0">
          {/* Left: Active Status & Play Trigger */}
          <div className="flex items-center gap-2">
            {!isAutoPlaying ? (
              <button
                onClick={onStartAutoPlay}
                className="px-3.5 py-1.5 md:py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all whitespace-nowrap"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{t('autoPlayBtn')}</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {currentIndex + 1}
                </span>
                <div className="min-w-0">
                  <div className={`text-[11px] font-bold flex items-center gap-1 ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`}>
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{t('autoPlayingStatus')}</span>
                    <span>({currentIndex + 1} / {totalWords})</span>
                  </div>
                  <div className="text-xs font-bold truncate max-w-[130px] sm:max-w-[160px]">
                    {activeWord?.word} <span className={`font-mono ${isLight ? 'text-indigo-600/80' : 'text-indigo-300'}`}>{activeWord?.ipa}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={onPrev}
              disabled={currentIndex <= 0}
              className={`p-1.5 md:p-2 rounded-xl border transition-all disabled:opacity-30 ${
                isLight
                  ? 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700'
                  : 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200'
              }`}
              title={t('prevSlide')}
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            {isAutoPlaying ? (
              <button
                onClick={onTogglePlayPause}
                className="p-1.5 md:p-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition-all shadow-md shadow-amber-400/20"
                title={isPaused ? t('resume') : t('pause')}
              >
                {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
              </button>
            ) : isCardSpeaking ? (
              <button
                onClick={onStop}
                className="p-1.5 md:p-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition-all shadow-md shadow-amber-400/20 animate-pulse"
                title={t('stop')}
              >
                <Pause className="w-3.5 h-3.5 fill-current" />
              </button>
            ) : (
              <button
                onClick={onPlayCurrentCard}
                className="p-1.5 md:p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-md"
                title={t('playCardBtn')}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
              </button>
            )}

            <button
              onClick={onNext}
              disabled={currentIndex >= totalWords - 1}
              className={`p-1.5 md:p-2 rounded-xl border transition-all disabled:opacity-30 ${
                isLight
                  ? 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700'
                  : 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200'
              }`}
              title={t('nextSlide')}
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>

            {isAutoPlaying && (
              <button
                onClick={onStop}
                className="p-1.5 md:p-2 rounded-xl bg-red-500/20 hover:bg-red-500/40 border border-red-500/40 text-red-500 transition-colors"
                title={t('stop')}
              >
                <Square className="w-3.5 h-3.5 fill-current" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Playback Options - Strictly English, Responsive & No Scrollbars */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto justify-start md:justify-end text-xs">
          {/* Play Mode Selector */}
          <select
            value={
              voiceSettings.playMode === 'english_only' ? 'm1_en_word' :
              voiceSettings.playMode === 'translation_only' ? 'm2_tr_word' :
              voiceSettings.playMode === 'sentence_only' ? 'm3_en_sentence' :
              voiceSettings.playMode === 'sentence_trans_only' ? 'm4_tr_sentence' :
              voiceSettings.playMode === 'english_then_translation' ? 'm5_1_2' :
              voiceSettings.playMode === 'english_then_sentence' ? 'm6_1_3' :
              voiceSettings.playMode === 'sentence_en_then_trans' ? 'm10_3_4' :
              voiceSettings.playMode === 'full_sequence' ? 'm15_1_2_3_4' :
              voiceSettings.playMode
            }
            onChange={(e) => onUpdateSettings({ playMode: e.target.value as PlayMode })}
            className={`px-2 py-1.5 rounded-xl text-xs font-bold border focus:outline-none focus:ring-2 focus:ring-indigo-500 max-w-[180px] sm:max-w-none truncate ${
              isLight
                ? 'bg-slate-100 border-slate-200 text-slate-800'
                : 'bg-slate-800 border-slate-700 text-slate-200'
            }`}
          >
            <option value="m1_en_word" className={isLight ? 'bg-white text-slate-800' : 'bg-slate-900 text-slate-100'}>
              1 = EN Word
            </option>
            <option value="m2_tr_word" className={isLight ? 'bg-white text-slate-800' : 'bg-slate-900 text-slate-100'}>
              2 = {targetCode} Word
            </option>
            <option value="m3_en_sentence" className={isLight ? 'bg-white text-slate-800' : 'bg-slate-900 text-slate-100'}>
              3 = EN Sentence
            </option>
            <option value="m4_tr_sentence" className={isLight ? 'bg-white text-slate-800' : 'bg-slate-900 text-slate-100'}>
              4 = {targetCode} Sentence
            </option>
            <option value="m5_1_2" className={isLight ? 'bg-white text-slate-800' : 'bg-slate-900 text-slate-100'}>
              5 = 1 + 2
            </option>
            <option value="m6_1_3" className={isLight ? 'bg-white text-slate-800' : 'bg-slate-900 text-slate-100'}>
              6 = 1 + 3
            </option>
            <option value="m7_1_4" className={isLight ? 'bg-white text-slate-800' : 'bg-slate-900 text-slate-100'}>
              7 = 1 + 4
            </option>
            <option value="m8_2_3" className={isLight ? 'bg-white text-slate-800' : 'bg-slate-900 text-slate-100'}>
              8 = 2 + 3
            </option>
            <option value="m9_2_4" className={isLight ? 'bg-white text-slate-800' : 'bg-slate-900 text-slate-100'}>
              9 = 2 + 4
            </option>
            <option value="m10_3_4" className={isLight ? 'bg-white text-slate-800' : 'bg-slate-900 text-slate-100'}>
              10 = 3 + 4
            </option>
            <option value="m11_1_2_3" className={isLight ? 'bg-white text-slate-800' : 'bg-slate-900 text-slate-100'}>
              11 = 1 + 2 + 3
            </option>
            <option value="m12_1_2_4" className={isLight ? 'bg-white text-slate-800' : 'bg-slate-900 text-slate-100'}>
              12 = 1 + 2 + 4
            </option>
            <option value="m13_1_3_4" className={isLight ? 'bg-white text-slate-800' : 'bg-slate-900 text-slate-100'}>
              13 = 1 + 3 + 4
            </option>
            <option value="m14_2_3_4" className={isLight ? 'bg-white text-slate-800' : 'bg-slate-900 text-slate-100'}>
              14 = 2 + 3 + 4
            </option>
            <option value="m15_1_2_3_4" className={isLight ? 'bg-white text-slate-800' : 'bg-slate-900 text-slate-100'}>
              15 = 1 + 2 + 3 + 4
            </option>
          </select>

          {/* Speed Selector */}
          <div
            className={`flex items-center gap-1 px-2 py-1.5 rounded-xl border font-semibold ${
              isLight
                ? 'bg-slate-100 border-slate-200 text-slate-700'
                : 'bg-slate-800 border-slate-700 text-slate-200'
            }`}
            title={t('speed')}
          >
            <Gauge className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <select
              value={voiceSettings.rate}
              onChange={(e) => onUpdateSettings({ rate: parseFloat(e.target.value) })}
              className="bg-transparent focus:outline-none font-bold"
            >
              <option value="0.75" className={isLight ? 'bg-white text-slate-800' : 'bg-slate-900 text-slate-100'}>0.75x</option>
              <option value="0.9" className={isLight ? 'bg-white text-slate-800' : 'bg-slate-900 text-slate-100'}>0.9x</option>
              <option value="1.0" className={isLight ? 'bg-white text-slate-800' : 'bg-slate-900 text-slate-100'}>1.0x</option>
              <option value="1.1" className={isLight ? 'bg-white text-slate-800' : 'bg-slate-900 text-slate-100'}>1.1x</option>
              <option value="1.25" className={isLight ? 'bg-white text-slate-800' : 'bg-slate-900 text-slate-100'}>1.25x</option>
            </select>
          </div>

          {/* Delay Selector */}
          <div
            className={`flex items-center gap-1 px-2 py-1.5 rounded-xl border font-semibold ${
              isLight
                ? 'bg-slate-100 border-slate-200 text-slate-700'
                : 'bg-slate-800 border-slate-700 text-slate-200'
            }`}
            title={t('delay')}
          >
            <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <select
              value={voiceSettings.autoDelaySeconds}
              onChange={(e) => onUpdateSettings({ autoDelaySeconds: parseFloat(e.target.value) })}
              className="bg-transparent focus:outline-none font-bold"
            >
              <option value="0.5" className={isLight ? 'bg-white text-slate-800' : 'bg-slate-900 text-slate-100'}>0.5s</option>
              <option value="1.0" className={isLight ? 'bg-white text-slate-800' : 'bg-slate-900 text-slate-100'}>1s</option>
              <option value="1.5" className={isLight ? 'bg-white text-slate-800' : 'bg-slate-900 text-slate-100'}>1.5s</option>
              <option value="2.0" className={isLight ? 'bg-white text-slate-800' : 'bg-slate-900 text-slate-100'}>2s</option>
              <option value="3.0" className={isLight ? 'bg-white text-slate-800' : 'bg-slate-900 text-slate-100'}>3s</option>
            </select>
          </div>

          {/* Repeat Count Selector */}
          <div
            className={`flex items-center gap-1 px-2 py-1.5 rounded-xl border font-semibold ${
              isLight
                ? 'bg-slate-100 border-slate-200 text-slate-700'
                : 'bg-slate-800 border-slate-700 text-slate-200'
            }`}
            title={t('repeatCount')}
          >
            <Repeat className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <select
              value={voiceSettings.repeatCount || 1}
              onChange={(e) => onUpdateSettings({ repeatCount: parseInt(e.target.value, 10) })}
              className="bg-transparent focus:outline-none font-bold"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num} className={isLight ? 'bg-white text-slate-800' : 'bg-slate-900 text-slate-100'}>
                  {num}x
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
