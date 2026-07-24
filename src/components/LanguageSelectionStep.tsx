import React, { useState } from 'react';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { Globe, Volume2, VolumeX, CheckCircle, Search, Sparkles, Play } from 'lucide-react';
import { t } from '../utils/i18n';

interface LanguageSelectionStepProps {
  selectedLanguageCode: string;
  onSelectLanguage: (langCode: string) => void;
  onProceed: () => void;
  theme: 'light' | 'dark';
}

export const LanguageSelectionStep: React.FC<LanguageSelectionStepProps> = ({
  selectedLanguageCode,
  onSelectLanguage,
  onProceed,
  theme,
}) => {
  const [search, setSearch] = useState('');
  const isLight = theme === 'light';

  const filteredLanguages = SUPPORTED_LANGUAGES.filter(
    (lang) =>
      lang.name.toLowerCase().includes(search.toLowerCase()) ||
      (lang.nativeName && lang.nativeName.toLowerCase().includes(search.toLowerCase())) ||
      lang.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleCardClick = (code: string) => {
    // Select language & proceed directly to categories
    onSelectLanguage(code);
    onProceed();
  };

  const handleStart = (code?: string) => {
    if (code) {
      onSelectLanguage(code);
    }
    onProceed();
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 flex flex-col items-center">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('step1Badge')}</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-2 text-slate-900 dark:text-slate-100">
          {t('step1Title')}
        </h1>
        <p className={`text-sm md:text-base ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          {t('step1Desc')}
        </p>
      </div>

      {/* Search Input */}
      <div className="w-full max-w-md relative mb-6">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('searchLangPlaceholder')}
          className={`w-full pl-10 pr-4 py-2.5 rounded-2xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 shadow-sm'
              : 'bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-500'
          }`}
        />
      </div>

      {/* Language Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 w-full mb-8">
        {filteredLanguages.map((lang) => {
          const isSelected = selectedLanguageCode === lang.code;
          return (
            <div
              key={lang.code}
              onClick={() => handleCardClick(lang.code)}
              className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between group relative overflow-hidden ${
                isSelected
                  ? isLight
                    ? 'bg-indigo-50/95 border-indigo-500 shadow-md ring-2 ring-indigo-500/30 scale-[1.02]'
                    : 'bg-indigo-950/80 border-indigo-500 shadow-lg ring-2 ring-indigo-500/40 scale-[1.02]'
                  : isLight
                  ? 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm'
                  : 'bg-slate-900 border-slate-800/90 hover:border-indigo-500/60 hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl select-none">{lang.flag}</span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                      {lang.name}
                      {isSelected && (
                        <CheckCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400 fill-indigo-100 dark:fill-indigo-950" />
                      )}
                    </h3>
                    {lang.nativeName && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {lang.nativeName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Start Button inside Card */}
                {isSelected ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStart(lang.code);
                    }}
                    className="px-3.5 py-1.5 rounded-xl font-extrabold text-xs flex items-center gap-1.5 transition-all bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white shadow-md shadow-indigo-600/30 shrink-0"
                  >
                    <span>{t('startBtn')}</span>
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(lang.code);
                    }}
                    className="px-3 py-1.5 rounded-xl font-semibold text-xs flex items-center gap-1 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-300 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors shrink-0"
                  >
                    <span>{t('selectBtn')}</span>
                  </button>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-medium">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <Globe className="w-3 h-3" />
                  <span>{t('googleTranslate')}</span>
                </span>

                {lang.hasTTS !== false ? (
                  <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full">
                    <Volume2 className="w-3 h-3" />
                    <span>{t('ttsAvailable')}</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full">
                    <VolumeX className="w-3 h-3" />
                    <span>{t('ttsOnlyText')}</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
