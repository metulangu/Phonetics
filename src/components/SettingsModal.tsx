import React, { useEffect, useState } from 'react';
import { X, Volume2, Sliders, Check, Play, RefreshCw, Sparkles, Globe } from 'lucide-react';
import { VoiceSettings } from '../types';
import { getAvailableVoices, getEnglishVoices, getVoicesForLang, speakText } from '../services/ttsService';
import { SUPPORTED_LANGUAGES } from '../data/languages';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  voiceSettings: VoiceSettings;
  onUpdateSettings: (newSettings: Partial<VoiceSettings>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  voiceSettings,
  onUpdateSettings,
}) => {
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [testingVoice, setTestingVoice] = useState<boolean>(false);

  useEffect(() => {
    function loadVoices() {
      const voices = getAvailableVoices();
      setAvailableVoices(voices);
    }

    loadVoices();

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  if (!isOpen) return null;

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === voiceSettings.targetLanguage) || SUPPORTED_LANGUAGES[0];

  const englishVoices = availableVoices.filter((v) => v.lang.startsWith('en'));
  const targetVoices = availableVoices.filter((v) =>
    v.lang.toLowerCase().replace('_', '-').startsWith(currentLang.speechLang.toLowerCase().slice(0, 2))
  );

  const handleTestVoice = async () => {
    setTestingVoice(true);
    await speakText(
      'The quick brown fox jumps over the lazy dog.',
      'en-US',
      voiceSettings.englishVoiceURI,
      {
        rate: voiceSettings.rate,
        pitch: voiceSettings.pitch,
        volume: voiceSettings.volume,
      }
    );
    setTestingVoice(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl text-slate-100 p-6 custom-scrollbar">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Voice & Speech Settings
              </h3>
              <p className="text-xs text-slate-400">TTS Voice Customization & Control</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="py-5 space-y-6">
          {/* English Voice Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-blue-400" /> English Voice Selection (Google / System)
            </label>
            <select
              value={voiceSettings.englishVoiceURI}
              onChange={(e) => onUpdateSettings({ englishVoiceURI: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Default Automatic English Voice</option>
              {englishVoices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name} ({v.lang}) {v.name.toLowerCase().includes('google') ? '⭐ Google Free TTS' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Translation Target Language & Voice */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" /> {currentLang.name} Translation Voice
            </label>
            <select
              value={voiceSettings.translationVoiceURI}
              onChange={(e) => onUpdateSettings({ translationVoiceURI: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Default Automatic {currentLang.name} Voice</option>
              {targetVoices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </div>

          {/* Speech Rate (Hız) */}
          <div className="space-y-3 bg-slate-800/40 border border-slate-800 p-4 rounded-2xl">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span>Speech Rate (Speed):</span>
              <span className="text-amber-400 font-mono text-sm">{voiceSettings.rate}x</span>
            </div>
            <input
              type="range"
              min="0.25"
              max="2.0"
              step="0.05"
              value={voiceSettings.rate}
              onChange={(e) => onUpdateSettings({ rate: parseFloat(e.target.value) })}
              className="w-full accent-blue-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>0.25x (Slow)</span>
              <span>1.0x (Normal)</span>
              <span>2.0x (Fast)</span>
            </div>
          </div>

          {/* Speech Pitch (Ses Tonu) */}
          <div className="space-y-3 bg-slate-800/40 border border-slate-800 p-4 rounded-2xl">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span>Speech Pitch:</span>
              <span className="text-indigo-400 font-mono text-sm">{voiceSettings.pitch}</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.05"
              value={voiceSettings.pitch}
              onChange={(e) => onUpdateSettings({ pitch: parseFloat(e.target.value) })}
              className="w-full accent-indigo-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>0.5 (Low)</span>
              <span>1.0 (Standard)</span>
              <span>1.5 (High)</span>
            </div>
          </div>

          {/* Auto-Play Delay */}
          <div className="space-y-3 bg-slate-800/40 border border-slate-800 p-4 rounded-2xl">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span>Auto-Play Delay Between Words:</span>
              <span className="text-emerald-400 font-mono text-sm">{voiceSettings.autoDelaySeconds} Seconds</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={voiceSettings.autoDelaySeconds}
              onChange={(e) => onUpdateSettings({ autoDelaySeconds: parseFloat(e.target.value) })}
              className="w-full accent-emerald-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>

          {/* Test Voice Button */}
          <div className="pt-2">
            <button
              onClick={handleTestVoice}
              disabled={testingVoice}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all"
            >
              {testingVoice ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Testing Voice...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Test Voice & Speed</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
};
