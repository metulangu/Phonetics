import React from 'react';
import { Volume2, Sparkles, BookOpen, Layers, CheckSquare } from 'lucide-react';
import { t } from '../utils/i18n';

interface FooterProps {
  theme: 'light' | 'dark';
  onOpenIpaChecklist?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ theme, onOpenIpaChecklist }) => {
  const isLight = theme === 'light';

  return (
    <footer
      className={`w-full border-t transition-colors duration-200 mt-auto ${
        isLight
          ? 'bg-white border-slate-200 text-slate-600'
          : 'bg-slate-900 border-slate-800 text-slate-400'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-200/80 dark:border-slate-800">
          {/* Brand & Description */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20 shrink-0">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
                {t('appTitle')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-tight">
                {t('appSubTitle')}
              </p>
            </div>
          </div>

          {/* Quick Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
              <span>International Phonetic Alphabet (IPA)</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              <Layers className="w-3.5 h-3.5 text-indigo-500" />
              <span>44 Core Phonemes & Spelling Patterns</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>High Quality TTS Voice Synthesis</span>
            </span>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer & IPA Link */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-500 gap-3">
          <p>
            © {new Date().getFullYear()} Phonetics Pro. All rights reserved. Interactive English Pronunciation & Phonetic Learning.
          </p>

          {onOpenIpaChecklist && (
            <button
              type="button"
              onClick={onOpenIpaChecklist}
              className="px-3.5 py-1.5 rounded-xl border font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-all flex items-center gap-1.5 shrink-0"
            >
              <CheckSquare className="w-4 h-4 text-indigo-500" />
              <span>📋 IPAs Pattern Checklist (Geçici)</span>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

