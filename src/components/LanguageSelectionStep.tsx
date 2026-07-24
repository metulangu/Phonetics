import React, { useState } from 'react';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { PHONEME_GROUPS } from '../data/phonemesData';
import { Globe, Volume2, VolumeX, CheckCircle, Search, Sparkles, Play, BookOpen, Layers, Languages, ArrowRight } from 'lucide-react';
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

  // Calculate dynamic statistics
  const totalLanguages = SUPPORTED_LANGUAGES.length;
  const totalPhonemes = PHONEME_GROUPS.length;
  const totalSpellingPatterns = PHONEME_GROUPS.reduce(
    (acc, group) => acc + (group.spellingPatterns?.length || 0),
    0
  );

  const filteredLanguages = SUPPORTED_LANGUAGES.filter(
    (lang) =>
      lang.name.toLowerCase().includes(search.toLowerCase()) ||
      (lang.nativeName && lang.nativeName.toLowerCase().includes(search.toLowerCase())) ||
      lang.code.toLowerCase().includes(search.toLowerCase())
  );

  const selectedLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguageCode);

  const handleCardClick = (code: string) => {
    if (selectedLanguageCode === code) {
      onSelectLanguage('');
    } else {
      onSelectLanguage(code);
    }
  };

  const handleStart = () => {
    onProceed();
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-4 flex flex-col items-center">
      {/* Top Section Header */}
      <div className="text-center max-w-3xl mb-8">
        <h1 className={`text-2xl md:text-4xl font-extrabold tracking-tight mb-3 ${isLight ? 'text-slate-900' : 'text-slate-50'}`}>
          {t('step1Title')}
        </h1>
        <p className={`text-sm md:text-base mb-6 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
          {t('step1Desc')}
        </p>

        {/* Stats Badges (Languages count, IPA Phonemes count, Spelling Rules count) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs font-semibold">
          <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-2xs ${
            isLight ? 'bg-indigo-50 text-indigo-700 border-indigo-200/90' : 'bg-indigo-950/80 text-indigo-200 border-indigo-800'
          }`}>
            <Languages className={`w-4 h-4 shrink-0 ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`} />
            <span>
              <strong>{totalLanguages}</strong> Supported Languages
            </span>
          </div>

          <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-2xs ${
            isLight ? 'bg-purple-50 text-purple-700 border-purple-200/90' : 'bg-purple-950/80 text-purple-200 border-purple-800'
          }`}>
            <BookOpen className={`w-4 h-4 shrink-0 ${isLight ? 'text-purple-600' : 'text-purple-400'}`} />
            <span>
              <strong>{totalPhonemes}</strong> Core IPA Phonemes
            </span>
          </div>

          <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-2xs ${
            isLight ? 'bg-amber-50 text-amber-800 border-amber-200/90' : 'bg-amber-950/80 text-amber-200 border-amber-800'
          }`}>
            <Layers className={`w-4 h-4 shrink-0 ${isLight ? 'text-amber-600' : 'text-amber-400'}`} />
            <span>
              <strong>{totalSpellingPatterns}+</strong> Spelling Patterns (Graphemes)
            </span>
          </div>
        </div>
      </div>

      {/* Selected Language Floating / Sticky Action Bar */}
      {selectedLangObj && (
        <div className="w-full max-w-2xl mb-8 p-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white shadow-xl shadow-indigo-600/20 border border-indigo-500 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="text-4xl select-none shrink-0 drop-shadow-sm">{selectedLangObj.flag}</span>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-200">
                Selected Target Language
              </div>
              <div className="text-lg font-black tracking-tight flex items-center justify-center sm:justify-start gap-2">
                <span>{selectedLangObj.name}</span>
                {selectedLangObj.nativeName && (
                  <span className="text-xs font-normal text-indigo-100 opacity-90">
                    ({selectedLangObj.nativeName})
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleStart}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-indigo-900 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg hover:bg-indigo-50 active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            <span>{t('startBtn')}</span>
            <ArrowRight className="w-4 h-4 text-indigo-700" />
          </button>
        </div>
      )}

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
          const isEnglishMonolingual = lang.code === 'en';

          return (
            <div
              key={lang.code}
              onClick={() => handleCardClick(lang.code)}
              className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between group relative overflow-hidden ${
                isSelected
                  ? isLight
                    ? 'bg-indigo-50/95 border-indigo-600 shadow-md ring-2 ring-indigo-500/30 scale-[1.01]'
                    : 'bg-indigo-950/80 border-indigo-500 shadow-lg ring-2 ring-indigo-500/40 scale-[1.01]'
                  : isEnglishMonolingual
                  ? isLight
                    ? 'bg-gradient-to-br from-indigo-50/60 to-purple-50/60 border-indigo-300 hover:border-indigo-500 hover:shadow-md'
                    : 'bg-gradient-to-br from-slate-900 to-indigo-950/40 border-indigo-800/80 hover:border-indigo-500/80'
                  : isLight
                  ? 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm'
                  : 'bg-slate-900 border-slate-800/90 hover:border-indigo-500/60 hover:bg-slate-800/80'
              }`}
            >
              {isEnglishMonolingual && (
                <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-bl-xl shadow-xs tracking-wider uppercase">
                  Featured / Direct
                </div>
              )}

              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl select-none">{lang.flag}</span>
                  <div>
                    <h3 className={`text-base font-bold flex items-center gap-1.5 ${
                      isLight ? 'text-slate-900' : 'text-slate-50'
                    }`}>
                      {lang.name}
                      {isSelected && (
                        <CheckCircle className={`w-4 h-4 fill-indigo-100 dark:fill-indigo-950 shrink-0 ${
                          isLight ? 'text-indigo-600' : 'text-indigo-400'
                        }`} />
                      )}
                    </h3>
                    {lang.nativeName && (
                      <p className={`text-xs font-medium ${
                        isLight ? 'text-slate-500' : 'text-slate-300'
                      }`}>
                        {lang.nativeName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Select / Start Button State inside Card */}
                {isSelected ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStart();
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
                    className={`px-3 py-1.5 rounded-xl font-semibold text-xs flex items-center gap-1 transition-colors shrink-0 ${
                      isLight
                        ? 'text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50'
                        : 'text-slate-200 hover:text-white bg-slate-800/90 hover:bg-indigo-900/80 border border-slate-700/80'
                    }`}
                  >
                    <span>{t('selectBtn')}</span>
                  </button>
                )}
              </div>

              <div className={`pt-2 border-t flex items-center justify-between text-[11px] font-medium ${
                isLight ? 'border-slate-100' : 'border-slate-800'
              }`}>
                {isEnglishMonolingual ? (
                  <span className={`flex items-center gap-1 font-semibold ${
                    isLight ? 'text-indigo-600' : 'text-indigo-300'
                  }`}>
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>No Translation Needed</span>
                  </span>
                ) : (
                  <span className={`flex items-center gap-1 ${
                    isLight ? 'text-emerald-600' : 'text-emerald-400'
                  }`}>
                    <Globe className="w-3 h-3" />
                    <span>{t('googleTranslate')}</span>
                  </span>
                )}

                {lang.hasTTS !== false ? (
                  <span className={`flex items-center gap-1 font-semibold px-2 py-0.5 rounded-full ${
                    isLight
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-indigo-200 bg-indigo-950/80 border border-indigo-800/60'
                  }`}>
                    <Volume2 className="w-3 h-3" />
                    <span>{t('ttsAvailable')}</span>
                  </span>
                ) : (
                  <span className={`flex items-center gap-1 font-medium px-2 py-0.5 rounded-full ${
                    isLight
                      ? 'text-amber-600 bg-amber-50'
                      : 'text-amber-300 bg-amber-950/80 border border-amber-800/60'
                  }`}>
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

