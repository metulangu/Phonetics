import React from 'react';
import {
  Volume2,
  Sun,
  Moon,
  LayoutGrid,
  Columns,
  ArrowLeft,
} from 'lucide-react';
import { AppStep, VoiceSettings } from '../types';
import { t } from '../utils/i18n';

interface HeaderProps {
  currentStep: AppStep;
  onGoToStep: (step: AppStep) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  voiceSettings: VoiceSettings;
  theme: 'light' | 'dark';
  onToggleTheme: (theme: 'light' | 'dark') => void;
  viewMode: 'slide' | 'column';
  onToggleViewMode: (mode: 'slide' | 'column') => void;
  selectedGroupSymbol?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  onGoToStep,
  searchQuery,
  onSearchChange,
  theme,
  onToggleTheme,
  viewMode,
  onToggleViewMode,
}) => {
  const isLight = theme === 'light';

  return (
    <header
      className={`sticky top-0 z-30 border-b transition-colors duration-200 shadow-sm ${
        isLight
          ? 'bg-white/95 backdrop-blur-md border-slate-200 text-slate-900'
          : 'bg-slate-900/95 backdrop-blur-md border-slate-800 text-slate-100 shadow-lg'
      }`}
    >
      {/* Unified Single Row Header */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Interactive Brand Card & Back Button */}
        <div className="flex items-center gap-3">
          {/* Logo, Title & Subtitle inside an interactive card linking to Home */}
          <button
            onClick={() => onGoToStep('language')}
            className={`flex items-center gap-3 p-1.5 px-3 rounded-2xl border transition-all text-left group ${
              isLight
                ? 'bg-slate-50 hover:bg-slate-100 border-slate-200/80 hover:border-indigo-300'
                : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/80 hover:border-indigo-500/50'
            }`}
            title={t('appTitle') + ' - ' + t('changeLang')}
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform shrink-0">
              <Volume2 className="w-5 h-5" />
            </div>

            <div>
              <span className={`text-sm font-extrabold tracking-tight block leading-tight ${
                isLight ? 'text-indigo-600' : 'text-indigo-400'
              }`}>
                {t('appTitle')}
              </span>
              <span className={`text-[11px] font-medium block leading-tight ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                {t('appSubTitle')}
              </span>
            </div>
          </button>

          {/* Dedicated Back Navigation Button */}
          {currentStep === 'slide' && (
            <button
              onClick={() => onGoToStep('category')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                isLight
                  ? 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
                  : 'bg-indigo-950/80 hover:bg-indigo-900 text-indigo-200 border border-indigo-800'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{t('backToGroups')}</span>
            </button>
          )}

          {currentStep === 'category' && (
            <button
              onClick={() => onGoToStep('language')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{t('changeLang')}</span>
            </button>
          )}
        </div>

        {/* Right Controls: Theme Toggle & View Mode Switcher */}
        <div className="flex items-center gap-2">
          {/* Theme Switcher [ Light | Dark ] */}
          <div className={`flex items-center p-0.5 rounded-xl border text-xs font-bold ${
            isLight
              ? 'bg-slate-100 border-slate-200'
              : 'bg-slate-800/90 border-slate-700/80'
          }`}>
            <button
              onClick={() => onToggleTheme('light')}
              className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                isLight
                  ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-slate-200'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title={t('whiteTheme')}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[11px]">{t('whiteTheme')}</span>
            </button>
            <button
              onClick={() => onToggleTheme('dark')}
              className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                !isLight
                  ? 'bg-slate-900 text-indigo-300 shadow-sm ring-1 ring-slate-700'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
              title={t('darkTheme')}
            >
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[11px]">{t('darkTheme')}</span>
            </button>
          </div>

          {/* View Mode Switcher in Slide view */}
          {currentStep === 'slide' && (
            <div className={`flex items-center p-0.5 rounded-xl border text-xs font-bold ${
              isLight
                ? 'bg-slate-100 border-slate-200'
                : 'bg-slate-800/90 border-slate-700/80'
            }`}>
              <button
                onClick={() => onToggleViewMode('slide')}
                className={`px-2 py-1.5 rounded-lg flex items-center gap-1 transition-all ${
                  viewMode === 'slide'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : isLight
                    ? 'text-slate-500 hover:text-slate-800'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title={t('slideView')}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{t('slideView')}</span>
              </button>
              <button
                onClick={() => onToggleViewMode('column')}
                className={`px-2 py-1.5 rounded-lg flex items-center gap-1 transition-all ${
                  viewMode === 'column'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : isLight
                    ? 'text-slate-500 hover:text-slate-800'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title={t('listView')}
              >
                <Columns className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{t('listView')}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
