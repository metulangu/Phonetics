import React, { useState } from 'react';
import { PHONEME_GROUPS } from '../data/phonemesData';
import { PhonemeGroup } from '../types';
import { Volume2, Star, ChevronRight, Layers, Sparkles } from 'lucide-react';

interface PhonemeNavProps {
  selectedGroup: PhonemeGroup | null;
  showFavoritesOnly: boolean;
  onSelectGroup: (group: PhonemeGroup) => void;
  onSelectFavorites: () => void;
  favoritesCount: number;
  theme: 'light' | 'dark';
}

export const PhonemeNav: React.FC<PhonemeNavProps> = ({
  selectedGroup,
  showFavoritesOnly,
  onSelectGroup,
  onSelectFavorites,
  favoritesCount,
  theme,
}) => {
  const [activeTab, setActiveTab] = useState<'vowels' | 'diphthongs' | 'consonants'>('vowels');

  const isLight = theme === 'light';

  const monophthongs = PHONEME_GROUPS.filter((g) => g.type === 'monophthongs');
  const diphthongs = PHONEME_GROUPS.filter((g) => g.type === 'diphthongs');
  const consonants = PHONEME_GROUPS.filter(
    (g) => g.type === 'consonants_voiced' || g.type === 'consonants_voiceless'
  );

  return (
    <aside
      className={`w-full lg:w-80 border-r flex flex-col h-full overflow-hidden transition-colors ${
        isLight
          ? 'bg-white border-slate-200 text-slate-800'
          : 'bg-slate-900/90 border-slate-800 text-slate-100'
      }`}
    >
      {/* Navigation Type Tabs (Tek Ünlüler, Çift Ses, Ünsüzler) */}
      <div
        className={`p-3 border-b ${
          isLight ? 'bg-slate-50/80 border-slate-200' : 'bg-slate-950/50 border-slate-800'
        }`}
      >
        <div
          className={`grid grid-cols-3 gap-1 p-1 rounded-xl text-xs font-semibold border ${
            isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <button
            onClick={() => setActiveTab('vowels')}
            className={`py-1.5 px-2 rounded-lg transition-all ${
              activeTab === 'vowels'
                ? 'bg-indigo-600 text-white shadow-sm font-bold'
                : isLight
                ? 'text-slate-600 hover:text-slate-900'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Ünlüler
          </button>
          <button
            onClick={() => setActiveTab('diphthongs')}
            className={`py-1.5 px-2 rounded-lg transition-all ${
              activeTab === 'diphthongs'
                ? 'bg-indigo-600 text-white shadow-sm font-bold'
                : isLight
                ? 'text-slate-600 hover:text-slate-900'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Çift Ses
          </button>
          <button
            onClick={() => setActiveTab('consonants')}
            className={`py-1.5 px-2 rounded-lg transition-all ${
              activeTab === 'consonants'
                ? 'bg-indigo-600 text-white shadow-sm font-bold'
                : isLight
                ? 'text-slate-600 hover:text-slate-900'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Ünsüzler
          </button>
        </div>
      </div>

      {/* Favorites Link */}
      <div className={`px-3 py-2 border-b ${isLight ? 'border-slate-100' : 'border-slate-800/80'}`}>
        <button
          onClick={onSelectFavorites}
          className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-all ${
            showFavoritesOnly
              ? isLight
                ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
              : isLight
              ? 'text-slate-700 hover:bg-slate-100'
              : 'text-slate-300 hover:bg-slate-800/80'
          }`}
        >
          <div className="flex items-center gap-2">
            <Star
              className={`w-4 h-4 ${
                favoritesCount > 0 ? 'text-amber-500 fill-amber-500' : 'text-slate-400'
              }`}
            />
            <span>Favori Kelimelerim</span>
          </div>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-bold ${
              isLight ? 'bg-slate-200 text-slate-800' : 'bg-slate-800 text-slate-300'
            }`}
          >
            {favoritesCount}
          </span>
        </button>
      </div>

      {/* Phoneme Group Lists */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
        {activeTab === 'vowels' && (
          <div className="space-y-1">
            <div
              className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                isLight ? 'text-indigo-600' : 'text-indigo-400'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" /> Monophthongs (Tek Ünlüler - {monophthongs.length})
            </div>
            {monophthongs.map((group) => {
              const isSelected = selectedGroup?.id === group.id && !showFavoritesOnly;
              return (
                <button
                  key={group.id}
                  onClick={() => onSelectGroup(group)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between group ${
                    isSelected
                      ? isLight
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm font-bold'
                        : 'bg-indigo-600/20 border-indigo-500/60 text-indigo-200 shadow-sm font-bold'
                      : isLight
                      ? 'border-transparent text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                      : 'border-transparent text-slate-300 hover:bg-slate-800/60 hover:text-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-10 h-8 rounded-lg font-mono text-sm font-bold flex items-center justify-center border ${
                        isLight
                          ? 'bg-slate-100 border-slate-200 text-indigo-700'
                          : 'bg-slate-800 border-slate-700 text-indigo-300'
                      }`}
                    >
                      {group.symbol}
                    </span>
                    <div>
                      <div className="text-xs font-semibold flex items-center gap-1.5">
                        <span className="capitalize">{group.exampleWord}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{group.ipa}</span>
                      </div>
                      <div
                        className={`text-[11px] line-clamp-1 ${
                          isLight ? 'text-slate-500' : 'text-slate-400'
                        }`}
                      >
                        {group.descriptionTr}
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isSelected
                        ? 'translate-x-0.5 text-indigo-600'
                        : 'group-hover:translate-x-0.5'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        )}

        {activeTab === 'diphthongs' && (
          <div className="space-y-1">
            <div
              className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                isLight ? 'text-indigo-600' : 'text-indigo-400'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" /> Diphthongs (Çift Ünlüler - {diphthongs.length})
            </div>
            {diphthongs.map((group) => {
              const isSelected = selectedGroup?.id === group.id && !showFavoritesOnly;
              return (
                <button
                  key={group.id}
                  onClick={() => onSelectGroup(group)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between group ${
                    isSelected
                      ? isLight
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm font-bold'
                        : 'bg-indigo-600/20 border-indigo-500/60 text-indigo-200 shadow-sm font-bold'
                      : isLight
                      ? 'border-transparent text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                      : 'border-transparent text-slate-300 hover:bg-slate-800/60 hover:text-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-10 h-8 rounded-lg font-mono text-sm font-bold flex items-center justify-center border ${
                        isLight
                          ? 'bg-slate-100 border-slate-200 text-indigo-700'
                          : 'bg-slate-800 border-slate-700 text-indigo-300'
                      }`}
                    >
                      {group.symbol}
                    </span>
                    <div>
                      <div className="text-xs font-semibold flex items-center gap-1.5">
                        <span className="capitalize">{group.exampleWord}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{group.ipa}</span>
                      </div>
                      <div
                        className={`text-[11px] line-clamp-1 ${
                          isLight ? 'text-slate-500' : 'text-slate-400'
                        }`}
                      >
                        {group.descriptionTr}
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isSelected
                        ? 'translate-x-0.5 text-indigo-600'
                        : 'group-hover:translate-x-0.5'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        )}

        {activeTab === 'consonants' && (
          <div className="space-y-1">
            <div
              className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                isLight ? 'text-indigo-600' : 'text-indigo-400'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Consonants (Sessiz Harfler - {consonants.length})
            </div>
            {consonants.map((group) => {
              const isSelected = selectedGroup?.id === group.id && !showFavoritesOnly;
              return (
                <button
                  key={group.id}
                  onClick={() => onSelectGroup(group)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between group ${
                    isSelected
                      ? isLight
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm font-bold'
                        : 'bg-indigo-600/20 border-indigo-500/60 text-indigo-200 shadow-sm font-bold'
                      : isLight
                      ? 'border-transparent text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                      : 'border-transparent text-slate-300 hover:bg-slate-800/60 hover:text-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-10 h-8 rounded-lg font-mono text-sm font-bold flex items-center justify-center border ${
                        isLight
                          ? 'bg-slate-100 border-slate-200 text-indigo-700'
                          : 'bg-slate-800 border-slate-700 text-sky-300'
                      }`}
                    >
                      {group.symbol}
                    </span>
                    <div>
                      <div className="text-xs font-semibold flex items-center gap-1.5">
                        <span className="capitalize">{group.exampleWord}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{group.ipa}</span>
                      </div>
                      <div
                        className={`text-[11px] line-clamp-1 ${
                          isLight ? 'text-slate-500' : 'text-slate-400'
                        }`}
                      >
                        {group.descriptionTr}
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isSelected
                        ? 'translate-x-0.5 text-indigo-600'
                        : 'group-hover:translate-x-0.5'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
};
