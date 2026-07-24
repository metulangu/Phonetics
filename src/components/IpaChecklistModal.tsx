import React, { useState, useEffect } from 'react';
import { PHONEME_GROUPS } from '../data/phonemesData';
import { X, CheckSquare, Square, Copy, Check, RotateCcw, Search, Sparkles } from 'lucide-react';

interface IpaChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
}

export const IpaChecklistModal: React.FC<IpaChecklistModalProps> = ({ isOpen, onClose, theme }) => {
  const [ticks, setTicks] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('ipa_ticks_state');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    localStorage.setItem('ipa_ticks_state', JSON.stringify(ticks));
  }, [ticks]);

  if (!isOpen) return null;

  const isLight = theme === 'light';

  const toggleTick = (key: string) => {
    setTicks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleResetTicks = () => {
    if (window.confirm('Tüm tikleri sıfırlamak istediğinize emin misiniz?')) {
      setTicks({});
    }
  };

  // Calculate total items count & checked count
  let totalItems = 0;
  let checkedItems = 0;

  PHONEME_GROUPS.forEach((group) => {
    const mainKey = `group_${group.id}`;
    totalItems++;
    if (ticks[mainKey]) checkedItems++;

    if (group.spellingPatterns) {
      group.spellingPatterns.forEach((pattern) => {
        const patternKey = `pattern_${group.id}_${pattern.spelling}`;
        totalItems++;
        if (ticks[patternKey]) checkedItems++;
      });
    }
  });

  const progressPercent = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`w-full max-w-5xl max-h-[92vh] rounded-3xl border flex flex-col shadow-2xl overflow-hidden ${
          isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-slate-100'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`p-4 sm:p-6 border-b flex flex-col gap-3 ${
            isLight ? 'bg-slate-50/80 border-slate-200' : 'bg-slate-950/60 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-indigo-600/20 shrink-0">
                IPA
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold tracking-tight flex items-center gap-2">
                  <span>IPA & Spelling Patterns Checklist</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    Geçici Sayfa
                  </span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Sırayla Gemini promptu üretmek için kontrol listesi. İşaretlenenler kaydedilir.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetTicks}
                className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isLight
                    ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-600'
                    : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                }`}
                title="Sıfırla"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tikleri Sıfırla</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className={`p-2 rounded-xl border transition-all ${
                  isLight
                    ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-600'
                    : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Progress Bar & Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="w-full sm:flex-1 flex items-center gap-3">
              <div className="flex-1 bg-slate-200 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold shrink-0">
                {checkedItems} / {totalItems} (%{progressPercent})
              </span>
            </div>

            <div className="w-full sm:w-64 relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="IPA veya Desen ara..."
                className={`w-full pl-9 pr-3 py-1.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400'
                    : 'bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {PHONEME_GROUPS.map((group, groupIdx) => {
            const mainKey = `group_${group.id}`;
            const isMainChecked = !!ticks[mainKey];

            // Search filter match check
            const matchesSearch =
              !search ||
              group.symbol.toLowerCase().includes(search.toLowerCase()) ||
              group.type.toLowerCase().includes(search.toLowerCase()) ||
              group.descriptionEn.toLowerCase().includes(search.toLowerCase()) ||
              (group.spellingPatterns &&
                group.spellingPatterns.some((p) => p.spelling.toLowerCase().includes(search.toLowerCase())));

            if (!matchesSearch) return null;

            return (
              <div
                key={group.id}
                className={`rounded-2xl border p-4 sm:p-5 transition-all ${
                  isMainChecked
                    ? isLight
                      ? 'bg-indigo-50/50 border-indigo-200 opacity-80'
                      : 'bg-indigo-950/20 border-indigo-900/60 opacity-80'
                    : isLight
                    ? 'bg-white border-slate-200 shadow-2xs'
                    : 'bg-slate-900/90 border-slate-800'
                }`}
              >
                {/* Main IPA Group Header */}
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => toggleTick(mainKey)}
                      className={`p-1 rounded-lg transition-transform active:scale-90 ${
                        isMainChecked ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'
                      }`}
                    >
                      {isMainChecked ? (
                        <CheckSquare className="w-6 h-6 fill-indigo-100 dark:fill-indigo-950" />
                      ) : (
                        <Square className="w-6 h-6" />
                      )}
                    </button>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-slate-400">#{groupIdx + 1}</span>
                      <span className="text-xl font-black font-mono px-3 py-0.5 rounded-xl bg-indigo-600 text-white shadow-xs">
                        {group.symbol}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                        Örnek: {group.exampleWord}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-300">
                        {group.type}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(
                        `Ana IPA: ${group.symbol}\nAçıklama: ${group.descriptionEn}`,
                        mainKey
                      )
                    }
                    className={`px-2.5 py-1 rounded-lg border text-xs font-bold flex items-center gap-1 transition-all ${
                      isLight
                        ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                        : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                    }`}
                  >
                    {copiedKey === mainKey ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600">Kopyalandı</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Kopyala</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 mb-4 leading-relaxed">
                  {group.descriptionEn} ({group.descriptionTr})
                </p>

                {/* Sub Patterns List */}
                {group.spellingPatterns && group.spellingPatterns.length > 0 ? (
                  <div className="space-y-2.5 pl-2 sm:pl-4 border-l-2 border-indigo-500/30">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Desenler (Spelling Patterns) ({group.spellingPatterns.length})</span>
                    </div>

                    {group.spellingPatterns.map((pat, patIdx) => {
                      const patternKey = `pattern_${group.id}_${pat.spelling}`;
                      const isPatChecked = !!ticks[patternKey];

                      const copyPromptText = `Ana IPA: ${group.symbol}\nDesen: "${pat.spelling}"`;

                      return (
                        <div
                          key={pat.spelling}
                          className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                            isPatChecked
                              ? isLight
                                ? 'bg-indigo-50/70 border-indigo-300 opacity-70 line-through'
                                : 'bg-indigo-950/40 border-indigo-800 opacity-70 line-through'
                              : isLight
                              ? 'bg-slate-50 hover:bg-slate-100/80 border-slate-200'
                              : 'bg-slate-950/60 hover:bg-slate-950 border-slate-800'
                          }`}
                        >
                          <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                            <button
                              type="button"
                              onClick={() => toggleTick(patternKey)}
                              className={`p-0.5 rounded transition-transform shrink-0 ${
                                isPatChecked ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'
                              }`}
                            >
                              {isPatChecked ? (
                                <CheckSquare className="w-5 h-5 fill-indigo-100 dark:fill-indigo-950" />
                              ) : (
                                <Square className="w-5 h-5" />
                              )}
                            </button>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-wrap min-w-0">
                              <span className="text-xs font-mono font-bold text-slate-400">
                                {groupIdx + 1}.{patIdx + 1}
                              </span>
                              <span className="text-sm font-extrabold font-mono px-2.5 py-0.5 rounded-lg bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800">
                                "{pat.spelling}"
                              </span>
                              {pat.examples && pat.examples.length > 0 && (
                                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                                  (Örnekler: {pat.examples.join(', ')})
                                </span>
                              )}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleCopy(copyPromptText, patternKey)}
                            className={`px-2.5 py-1 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 ${
                              isLight
                                ? 'bg-white hover:bg-slate-100 border-slate-200 text-indigo-700'
                                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-indigo-300'
                            }`}
                          >
                            {copiedKey === patternKey ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                                <span className="text-emerald-600">Kopyalandı</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-indigo-500" />
                                <span>Detay Kopyala</span>
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 italic pl-4">Özel desen bulunmuyor.</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
