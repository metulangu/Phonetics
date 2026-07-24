import React, { useState } from 'react';
import { PHONEME_GROUPS } from '../data/phonemesData';
import { PhonemeGroup } from '../types';
import { Star, ChevronRight } from 'lucide-react';
import { t } from '../utils/i18n';

interface PhonemeCategoryStepProps {
  selectedLanguageCode: string;
  onChangeLanguageRequest: () => void;
  onSelectGroup: (group: PhonemeGroup, filterPattern?: string, shuffle?: boolean) => void;
  onSelectFavorites: () => void;
  favoritesCount: number;
  theme: 'light' | 'dark';
  searchQuery?: string;
}

export const PhonemeCategoryStep: React.FC<PhonemeCategoryStepProps> = ({
  onSelectGroup,
  onSelectFavorites,
  favoritesCount,
  theme,
  searchQuery = '',
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'vowels' | 'diphthongs' | 'consonants'>('all');

  const isLight = theme === 'light';

  const monophthongs = PHONEME_GROUPS.filter((g) => g.type === 'monophthongs');
  const diphthongs = PHONEME_GROUPS.filter((g) => g.type === 'diphthongs');
  const consonants = PHONEME_GROUPS.filter(
    (g) => g.type === 'consonants_voiced' || g.type === 'consonants_voiceless'
  );

  let displayedGroups = PHONEME_GROUPS;
  if (activeTab === 'vowels') displayedGroups = monophthongs;
  if (activeTab === 'diphthongs') displayedGroups = diphthongs;
  if (activeTab === 'consonants') displayedGroups = consonants;

  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    displayedGroups = displayedGroups.filter((g) => {
      const symbolMatch = g.symbol.toLowerCase().includes(q);
      const ipaMatch = g.ipa.toLowerCase().includes(q);
      const exampleMatch = g.exampleWord.toLowerCase().startsWith(q);
      const patternMatch = g.spellingPatterns?.some(
        (p) => p.spelling.toLowerCase() === q || p.spelling.toLowerCase().includes(q)
      );
      const wordPatternMatch = g.words?.some(
        (w) => w.spellingPattern?.toLowerCase() === q || w.word.toLowerCase().startsWith(q)
      );

      // Single character queries: match symbol, IPA, spelling pattern, word pattern or example/words starting with character
      if (q.length === 1) {
        return symbolMatch || ipaMatch || patternMatch || wordPatternMatch || exampleMatch;
      }

      const patternExampleMatch = g.spellingPatterns?.some(
        (p) => p.examples.some((ex) => ex.toLowerCase().includes(q))
      );
      const descMatch = g.descriptionEn.toLowerCase().includes(q) || g.descriptionTr.toLowerCase().includes(q);
      const fullExampleMatch = g.exampleWord.toLowerCase().includes(q);
      return symbolMatch || ipaMatch || fullExampleMatch || descMatch || patternMatch || patternExampleMatch;
    });
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-6 px-4">
      {/* Tabs / Filter Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div
          className={`p-1 rounded-2xl border flex items-center gap-1 ${
            isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {t('tabAll')} ({PHONEME_GROUPS.length})
          </button>
          <button
            onClick={() => setActiveTab('vowels')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'vowels'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {t('tabVowels')} ({monophthongs.length})
          </button>
          <button
            onClick={() => setActiveTab('diphthongs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'diphthongs'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {t('tabDiphthongs')} ({diphthongs.length})
          </button>
          <button
            onClick={() => setActiveTab('consonants')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'consonants'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {t('tabConsonants')} ({consonants.length})
          </button>
        </div>

        {/* Favorites Link Card */}
        <button
          onClick={onSelectFavorites}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all ${
            favoritesCount > 0
              ? 'bg-amber-500/10 border-amber-500/40 text-amber-900 dark:text-amber-300 hover:bg-amber-500/20'
              : isLight
              ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Star
            className={`w-4 h-4 ${
              favoritesCount > 0 ? 'text-amber-500 fill-amber-500' : 'text-slate-400'
            }`}
          />
          <span>{t('favoritesCount')} ({favoritesCount})</span>
          <ChevronRight className="w-3.5 h-3.5 ml-1 text-slate-400" />
        </button>
      </div>

      {/* Phoneme Groups Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayedGroups.map((group) => {
          const descriptionText = group.descriptionEn || group.descriptionTr;

          return (
            <div
              key={group.id}
              className={`p-5 rounded-3xl border transition-all duration-200 flex flex-col justify-between ${
                isLight
                  ? 'bg-white border-slate-200/90 shadow-xs hover:border-indigo-300 hover:shadow-md'
                  : 'bg-slate-900 border-slate-800/90 shadow-xs hover:border-indigo-700 hover:shadow-lg hover:shadow-indigo-950/30'
              }`}
            >
              <div>
                {/* Top Badge (Type) */}
                <div className="flex justify-end mb-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      group.type === 'monophthongs'
                        ? isLight
                          ? 'bg-sky-50 text-sky-700 border-sky-200/80'
                          : 'bg-sky-950/80 text-sky-300 border-sky-800'
                        : group.type === 'diphthongs'
                        ? isLight
                          ? 'bg-purple-50 text-purple-700 border-purple-200/80'
                          : 'bg-purple-950/80 text-purple-300 border-purple-800'
                        : isLight
                        ? 'bg-amber-50 text-amber-700 border-amber-200/80'
                        : 'bg-amber-950/80 text-amber-300 border-amber-800'
                    }`}
                  >
                    {group.type === 'monophthongs'
                      ? t('typeMonophthong')
                      : group.type === 'diphthongs'
                      ? t('typeDiphthong')
                      : t('typeConsonant')}
                  </span>
                </div>

                {/* Big IPA Symbol in Top Center */}
                <div className="flex flex-col items-center justify-center my-3">
                  <button
                    onClick={() => onSelectGroup(group, undefined, true)}
                    className={`w-20 h-20 rounded-2xl font-mono text-4xl font-black flex items-center justify-center border shadow-xs transition-all duration-200 hover:scale-105 active:scale-95 ${
                      isLight
                        ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200/90 text-indigo-700 hover:border-indigo-400 hover:shadow-indigo-100'
                        : 'bg-gradient-to-br from-indigo-950/90 to-slate-900 border-indigo-800/80 text-indigo-200 hover:text-white hover:border-indigo-600 hover:shadow-indigo-950/50'
                    }`}
                    title={`${group.symbol} - ${t('viewAllWords')}`}
                  >
                    {group.symbol}
                  </button>
                </div>

                {/* Full Description (No truncation) */}
                <div className="text-center px-1 mb-4">
                  <p className={`text-xs font-medium leading-relaxed ${
                    isLight ? 'text-slate-600' : 'text-slate-200'
                  }`}>
                    {descriptionText}
                  </p>
                </div>

                {/* Spelling Patterns (Graphemes) Section */}
                {group.spellingPatterns && group.spellingPatterns.length > 0 && (
                  <div className={`mt-4 pt-3.5 border-t ${
                    isLight ? 'border-slate-100' : 'border-slate-800'
                  }`}>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className={`text-[11px] font-bold uppercase tracking-wider ${
                        isLight ? 'text-slate-500' : 'text-slate-300'
                      }`}>
                        {t('spellingPatternsLabel')}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isLight ? 'bg-slate-100 text-slate-600' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {group.spellingPatterns.length} {t('patternsCount')}
                      </span>
                    </div>

                    {/* Sub-patterns styled as mini IPA boxes (without numbers) */}
                    <div className="flex flex-wrap gap-2 justify-center">
                      {group.spellingPatterns.map((sp) => (
                        <button
                          key={sp.spelling}
                          onClick={() => onSelectGroup(group, sp.spelling, false)}
                          className={`min-w-[44px] h-11 px-3 rounded-xl border text-sm font-mono font-black transition-all duration-200 flex items-center justify-center shadow-2xs hover:scale-105 active:scale-95 ${
                            isLight
                              ? 'bg-gradient-to-br from-indigo-50/80 to-purple-50/80 border-indigo-200/80 text-indigo-700 hover:border-indigo-400 hover:bg-indigo-600 hover:text-white hover:shadow-sm'
                              : 'bg-gradient-to-br from-indigo-950/70 to-slate-900 border-indigo-800/80 text-indigo-200 hover:border-indigo-500 hover:bg-indigo-600 hover:text-white hover:shadow-sm'
                          }`}
                          title={`Pattern: "${sp.spelling}" (${sp.examples.join(', ')})`}
                        >
                          <span>{sp.spelling}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
