import React, { useState } from 'react';
import { X, Plus, BookOpen } from 'lucide-react';
import { WordItem } from '../types';

interface AddWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWord: (wordItem: WordItem) => void;
}

export const AddWordModal: React.FC<AddWordModalProps> = ({
  isOpen,
  onClose,
  onAddWord,
}) => {
  const [word, setWord] = useState('');
  const [ipa, setIpa] = useState('');
  const [translationTr, setTranslationTr] = useState('');
  const [exampleSentence, setExampleSentence] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim()) return;

    const newWordItem: WordItem = {
      id: `custom_${Date.now()}`,
      word: word.trim(),
      ipa: ipa.trim() ? (ipa.startsWith('/') ? ipa : `/${ipa}/`) : `/${word.trim()}/`,
      translation: { tr: translationTr.trim() || word.trim() },
      exampleSentence: exampleSentence.trim() || undefined,
      isCustom: true,
    };

    onAddWord(newWordItem);
    setWord('');
    setIpa('');
    setTranslationTr('');
    setExampleSentence('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md shadow-2xl text-slate-100 p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Add Custom Word</h3>
              <p className="text-xs text-slate-400">Add a word to your custom list</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-5 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              English Word <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="e.g. beautiful"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Phonetic Spelling (IPA)
            </label>
            <input
              type="text"
              value={ipa}
              onChange={(e) => setIpa(e.target.value)}
              placeholder="e.g. /ˈbjuːtɪfl/"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm font-mono text-amber-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Translation
            </label>
            <input
              type="text"
              value={translationTr}
              onChange={(e) => setTranslationTr(e.target.value)}
              placeholder="e.g. beautiful"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Example Sentence (Optional)
            </label>
            <textarea
              value={exampleSentence}
              onChange={(e) => setExampleSentence(e.target.value)}
              placeholder="e.g. What a beautiful day!"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
            >
              Add to List
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
