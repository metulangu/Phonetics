import React from 'react';
import {
  Play,
  Pause,
  Square,
  SkipBack,
  SkipForward,
  Clock,
  Gauge,
} from 'lucide-react';
import { PlayMode, VoiceSettings, WordItem } from '../types';
import { t } from '../utils/i18n';

interface AutoPlayBarProps {
  isAutoPlaying: boolean;
  isPaused: boolean;
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

  return (
    <div
      className={`w-full max-w-4xl mx-auto mb-4 p-3 md:p-4 rounded-2xl border transition-all shadow-md ${
        isAutoPlaying
          ? 'bg-slate-900 border-indigo-500 text-slate-100 ring-2 ring-indigo-500/20'
          : isLight
          ? 'bg-white border-slate-200 text-slate-800 shadow-slate-100'
          : 'bg-slate-900 border-slate-800 text-slate-200'
      }`}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Active Status & Play Trigger */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {!isAutoPlaying ? (
            <button
              onClick={onStartAutoPlay}
              className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{t('autoPlayBtn')}</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                {currentIndex + 1}
              </span>
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-indigo-400 flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{t('autoPlayingStatus')}</span>
                  <span>({currentIndex + 1} / {totalWords})</span>
                </div>
                <div className="text-xs font-bold truncate max-w-[180px]">
                  {activeWord?.word} <span className="font-mono text-amber-400">{activeWord?.ipa}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Center: Playback Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            disabled={currentIndex <= 0}
            className={`p-2 rounded-xl border transition-all disabled:opacity-30 ${
              isLight && !isAutoPlaying
                ? 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700'
                : 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200'
            }`}
            title={t('prevSlide')}
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {isAutoPlaying ? (
            <button
              onClick={onTogglePlayPause}
              className="p-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition-all shadow-md shadow-amber-400/20"
              title={isPaused ? t('resume') : t('pause')}
            >
              {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
            </button>
          ) : (
            <button
              onClick={onPlayCurrentCard}
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-md"
              title={t('playCardBtn')}
            >
              <Play className="w-4 h-4 fill-current" />
            </button>
          )}

          <button
            onClick={onNext}
            disabled={currentIndex >= totalWords - 1}
            className={`p-2 rounded-xl border transition-all disabled:opacity-30 ${
              isLight && !isAutoPlaying
                ? 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700'
                : 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200'
            }`}
            title={t('nextSlide')}
          >
            <SkipForward className="w-4 h-4" />
          </button>

          {isAutoPlaying && (
            <button
              onClick={onStop}
              className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/40 border border-red-500/40 text-red-400 transition-colors"
              title={t('stop')}
            >
              <Square className="w-4 h-4 fill-current" />
            </button>
          )}
        </div>

        {/* Right: Playback Options (Mode & Delay & Speed) */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end text-xs">
          {/* Play Mode Selector */}
          <select
            value={voiceSettings.playMode}
            onChange={(e) => onUpdateSettings({ playMode: e.target.value as PlayMode })}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs ${
              isLight && !isAutoPlaying
                ? 'bg-slate-100 border-slate-200 text-slate-800'
                : 'bg-slate-800 border-slate-700 text-slate-200'
            }`}
          >
            <option value="english_only">{t('playModeEnOnly')}</option>
            <option value="translation_only">{t('playModeTransOnly')}</option>
            <option value="sentence_only">{t('playModeSentenceOnly')}</option>
            <option value="english_then_translation">{t('playModeEnThenTrans')}</option>
            <option value="english_then_sentence">{t('playModeEnThenSentence')}</option>
            <option value="full_sequence">{t('playModeFullSequence')}</option>
            <option value="english_twice">{t('playModeEnTwice')}</option>
          </select>

          {/* Speed Selector */}
          <div
            className={`flex items-center gap-1 px-2 py-1.5 rounded-xl border font-semibold ${
              isLight && !isAutoPlaying
                ? 'bg-slate-100 border-slate-200 text-slate-700'
                : 'bg-slate-800 border-slate-700 text-slate-200'
            }`}
            title={t('speed')}
          >
            <Gauge className="w-3.5 h-3.5 text-indigo-500" />
            <select
              value={voiceSettings.rate}
              onChange={(e) => onUpdateSettings({ rate: parseFloat(e.target.value) })}
              className="bg-transparent focus:outline-none font-bold"
            >
              <option value="0.75" className="dark:bg-slate-900">0.75x</option>
              <option value="0.9" className="dark:bg-slate-900">0.9x</option>
              <option value="1.0" className="dark:bg-slate-900">1.0x</option>
              <option value="1.1" className="dark:bg-slate-900">1.1x</option>
              <option value="1.25" className="dark:bg-slate-900">1.25x</option>
            </select>
          </div>

          {/* Delay Selector */}
          <div
            className={`flex items-center gap-1 px-2 py-1.5 rounded-xl border font-semibold ${
              isLight && !isAutoPlaying
                ? 'bg-slate-100 border-slate-200 text-slate-700'
                : 'bg-slate-800 border-slate-700 text-slate-200'
            }`}
            title={t('delay')}
          >
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <select
              value={voiceSettings.autoDelaySeconds}
              onChange={(e) => onUpdateSettings({ autoDelaySeconds: parseFloat(e.target.value) })}
              className="bg-transparent focus:outline-none font-bold"
            >
              <option value="0.5" className="dark:bg-slate-900">0.5s</option>
              <option value="1.0" className="dark:bg-slate-900">1s</option>
              <option value="1.5" className="dark:bg-slate-900">1.5s</option>
              <option value="2.0" className="dark:bg-slate-900">2s</option>
              <option value="3.0" className="dark:bg-slate-900">3s</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
