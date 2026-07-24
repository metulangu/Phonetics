import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PHONEME_GROUPS } from './data/phonemesData';
import { AppStep, PhonemeGroup, PlayMode, VoiceSettings, WordItem } from './types';
import { speakText, stopSpeech } from './services/ttsService';
import { translateText, translateWordsBatch } from './services/translateService';
import { Header } from './components/Header';
import { LanguageSelectionStep } from './components/LanguageSelectionStep';
import { PhonemeCategoryStep } from './components/PhonemeCategoryStep';
import { WordColumnView } from './components/WordColumnView';
import { WordSlideView } from './components/WordSlideView';
import { AutoPlayBar } from './components/AutoPlayBar';
import { SettingsModal } from './components/SettingsModal';
import { AddWordModal } from './components/AddWordModal';
import { Footer } from './components/Footer';
import { t } from './utils/i18n';

const DEFAULT_SETTINGS: VoiceSettings = {
  englishVoiceURI: '',
  translationVoiceURI: '',
  rate: 1.0,
  pitch: 1.0,
  volume: 1.0,
  playMode: 'english_then_translation',
  repeatCount: 1,
  autoDelaySeconds: 1.0,
  targetLanguage: '', // Nothing selected initially
};

export default function App() {
  // Step Navigation State: 'language' | 'category' | 'slide'
  const [currentStep, setCurrentStep] = useState<AppStep>('language');

  // Theme State: 'light' is default
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('phonetic_theme');
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  // View Mode State: 'slide' by default
  const [viewMode, setViewMode] = useState<'slide' | 'column'>(() => {
    try {
      const saved = localStorage.getItem('phonetic_view_mode');
      return saved === 'column' ? 'column' : 'slide';
    } catch {
      return 'slide';
    }
  });

  // Selected Phoneme Group & Pattern
  const [selectedGroup, setSelectedGroup] = useState<PhonemeGroup | null>(PHONEME_GROUPS[0]);
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const [shuffledSeed, setShuffledSeed] = useState<number>(0);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Voice & Player Settings State
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>(() => {
    try {
      const saved = localStorage.getItem('phonetic_settings');
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch {
      // Ignore
    }
    return DEFAULT_SETTINGS;
  });

  // Slide Index State
  const [slideIndex, setSlideIndex] = useState<number>(0);

  // Favorites State
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('phonetic_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Custom User Added Words State
  const [customWords, setCustomWords] = useState<WordItem[]>(() => {
    try {
      const saved = localStorage.getItem('phonetic_custom_words');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active Speaking State
  const [activeSpeakingWordId, setActiveSpeakingWordId] = useState<string | null>(null);

  // AutoPlay State
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [autoPlayIndex, setAutoPlayIndex] = useState<number>(0);

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // Auto-shuffle seed for main IPA entry
  const [mainIpaShuffleSeed, setMainIpaShuffleSeed] = useState<number>(Date.now());

  // Re-shuffle whenever selectedGroup changes
  useEffect(() => {
    setMainIpaShuffleSeed(Date.now());
  }, [selectedGroup]);

  // Sync theme
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('phonetic_theme', theme);
  }, [theme]);

  // Sync viewMode
  useEffect(() => {
    localStorage.setItem('phonetic_view_mode', viewMode);
  }, [viewMode]);

  // Sync settings
  useEffect(() => {
    localStorage.setItem('phonetic_settings', JSON.stringify(voiceSettings));
  }, [voiceSettings]);

  // Sync favorites
  useEffect(() => {
    localStorage.setItem('phonetic_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Sync customWords
  useEffect(() => {
    localStorage.setItem('phonetic_custom_words', JSON.stringify(customWords));
  }, [customWords]);

  // Scroll to top whenever step or selected group changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentStep, selectedGroup]);

  // Filter and Gather All Words
  const allGroupWords = React.useMemo(() => {
    if (showFavoritesOnly) {
      const allBase = PHONEME_GROUPS.flatMap((g) => g.words);
      const combined = [...allBase, ...customWords];
      return combined.filter((w) => favorites.includes(w.id));
    }

    if (!selectedGroup) {
      const allBase = PHONEME_GROUPS.flatMap((g) => g.words);
      return [...allBase, ...customWords];
    }

    const baseWords = selectedGroup.words;
    const addedWords = customWords.filter((cw) => cw.groupId === selectedGroup.id);
    return [...baseWords, ...addedWords];
  }, [selectedGroup, showFavoritesOnly, customWords, favorites]);

  // Apply Pattern Filter & Search Query
  const displayedWords = React.useMemo(() => {
    let list = [...allGroupWords];

    // Filter by spelling pattern if selected
    if (selectedPattern) {
      list = list.filter((w) => w.spellingPattern === selectedPattern);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((w) => {
        const wordMatch = w.word ? w.word.toLowerCase().includes(q) : false;
        const ipaMatch = w.ipa ? w.ipa.toLowerCase().includes(q) : false;
        const symbolMatch = w.phonemeSymbol ? w.phonemeSymbol.toLowerCase().includes(q) : false;
        const patternMatch = w.pattern ? w.pattern.toLowerCase().includes(q) : false;

        let transMatch = false;
        if (typeof w.translation === 'string') {
          transMatch = (w.translation as string).toLowerCase().includes(q);
        } else if (w.translation && typeof w.translation === 'object') {
          transMatch = Object.values(w.translation).some(
            (val) => typeof val === 'string' && val.toLowerCase().includes(q)
          );
        }

        return wordMatch || ipaMatch || symbolMatch || patternMatch || transMatch;
      });
    }

    // Auto-shuffle on main IPA entry (when selectedPattern is null and no search query)
    if (!selectedPattern && !searchQuery.trim() && !showFavoritesOnly) {
      const arr = [...list];
      let m = arr.length, t, i;
      let seed = mainIpaShuffleSeed;
      const pseudoRandom = () => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
      };
      while (m) {
        i = Math.floor(pseudoRandom() * m--);
        t = arr[m];
        arr[m] = arr[i];
        arr[i] = t;
      }
      return arr;
    }

    return list;
  }, [allGroupWords, selectedPattern, searchQuery, showFavoritesOnly, mainIpaShuffleSeed]);

  // Reset slide index when list changes
  useEffect(() => {
    setSlideIndex(0);
    setAutoPlayIndex(0);
  }, [selectedGroup, selectedPattern, showFavoritesOnly]);

  // Progressive background pre-translation chunking (preloading 5 words ahead)
  useEffect(() => {
    const targetLang = voiceSettings.targetLanguage;
    if (!targetLang || targetLang === 'en' || displayedWords.length === 0) return;

    const chunk = displayedWords.slice(slideIndex, slideIndex + 5);
    const toTranslate = chunk.map((w) => ({ id: w.id, text: w.word }));

    translateWordsBatch(toTranslate, targetLang);
  }, [slideIndex, displayedWords, voiceSettings.targetLanguage]);

  // Audio Speech Session Management (for instant cancellation)
  const speechSessionRef = useRef<number>(0);

  const stopSpeechHandler = useCallback(() => {
    speechSessionRef.current++;
    stopSpeech();
    setActiveSpeakingWordId(null);
  }, []);

  // Speak Handler
  const handlePlayWord = useCallback(
    async (wordItem: WordItem, overrideMode?: 'english' | 'translation' | 'both') => {
      stopSpeechHandler();
      const currentSession = speechSessionRef.current;
      setActiveSpeakingWordId(wordItem.id);

      const langCode = voiceSettings.targetLanguage || 'tr';
      const playMode = overrideMode
        ? (overrideMode === 'english' ? 'm1_en_word' : overrideMode === 'translation' ? 'm2_tr_word' : 'm5_1_2')
        : voiceSettings.playMode;
      const repeatCount = overrideMode ? 1 : Math.max(1, Math.min(10, voiceSettings.repeatCount || 1));

      try {
        // Fetch Translation dynamically if missing for target language
        let transText = '';
        if (langCode === 'en') {
          transText = 'Direct Learning';
        } else if (typeof wordItem.translation === 'string' && langCode === 'tr') {
          transText = wordItem.translation;
        } else if (wordItem.translation && typeof wordItem.translation === 'object' && wordItem.translation[langCode]) {
          transText = wordItem.translation[langCode];
        } else if (langCode === 'tr' && wordItem.translation && typeof wordItem.translation === 'object' && wordItem.translation['tr']) {
          transText = wordItem.translation['tr'];
        }

        if (!transText && langCode !== 'en') {
          transText = await translateText(wordItem.word, langCode);
        }

        if (speechSessionRef.current !== currentSession) return;

        // Sentence Translation
        let sentenceTransText = '';
        if (wordItem.exampleSentence && langCode !== 'en') {
          if (wordItem.sentenceTranslation && typeof wordItem.sentenceTranslation === 'object' && wordItem.sentenceTranslation[langCode]) {
            sentenceTransText = wordItem.sentenceTranslation[langCode];
          } else if (langCode === 'tr' && wordItem.sentenceTranslation && typeof wordItem.sentenceTranslation === 'object' && wordItem.sentenceTranslation['tr']) {
            sentenceTransText = wordItem.sentenceTranslation['tr'];
          }

          if (!sentenceTransText) {
            sentenceTransText = await translateText(wordItem.exampleSentence, langCode);
          }
        }

        if (speechSessionRef.current !== currentSession) return;

        const speakEn = async () => {
          if (speechSessionRef.current !== currentSession) return;
          await speakText(wordItem.word, 'en-US', voiceSettings.englishVoiceURI, {
            rate: voiceSettings.rate,
            pitch: voiceSettings.pitch,
            volume: voiceSettings.volume,
          });
        };

        const speakTrans = async () => {
          if (speechSessionRef.current !== currentSession) return;
          await speakText(transText, langCode, voiceSettings.translationVoiceURI, {
            rate: voiceSettings.rate,
            pitch: voiceSettings.pitch,
            volume: voiceSettings.volume,
          });
        };

        const speakSentence = async () => {
          if (speechSessionRef.current !== currentSession || !wordItem.exampleSentence) return;
          await speakText(wordItem.exampleSentence, 'en-US', voiceSettings.englishVoiceURI, {
            rate: voiceSettings.rate,
            pitch: voiceSettings.pitch,
            volume: voiceSettings.volume,
          });
        };

        const speakSentenceTrans = async () => {
          if (speechSessionRef.current !== currentSession || !sentenceTransText) return;
          await speakText(sentenceTransText, langCode, voiceSettings.translationVoiceURI, {
            rate: voiceSettings.rate,
            pitch: voiceSettings.pitch,
            volume: voiceSettings.volume,
          });
        };

        const waitDelay = () =>
          new Promise((res) => {
            const delayMs = (voiceSettings.autoDelaySeconds || 0.8) * 1000;
            const start = Date.now();
            const timer = setInterval(() => {
              if (speechSessionRef.current !== currentSession || Date.now() - start >= delayMs) {
                clearInterval(timer);
                res(undefined);
              }
            }, 30);
          });

        const playParts = async (parts: (1 | 2 | 3 | 4)[]) => {
          for (let idx = 0; idx < parts.length; idx++) {
            if (speechSessionRef.current !== currentSession) break;
            const part = parts[idx];
            if (part === 1) await speakEn();
            else if (part === 2) await speakTrans();
            else if (part === 3) await speakSentence();
            else if (part === 4) await speakSentenceTrans();

            if (speechSessionRef.current !== currentSession) break;
            if (idx < parts.length - 1) {
              await waitDelay();
            }
          }
        };

        const getPartsForMode = (mode: PlayMode): (1 | 2 | 3 | 4)[] => {
          switch (mode) {
            case 'm1_en_word':
            case 'english_only':
              return [1];
            case 'm2_tr_word':
            case 'translation_only':
              return [2];
            case 'm3_en_sentence':
            case 'sentence_only':
              return [3];
            case 'm4_tr_sentence':
            case 'sentence_trans_only':
              return [4];
            case 'm5_1_2':
            case 'english_then_translation':
              return [1, 2];
            case 'm6_1_3':
            case 'english_then_sentence':
              return [1, 3];
            case 'm7_1_4':
              return [1, 4];
            case 'm8_2_3':
              return [2, 3];
            case 'm9_2_4':
              return [2, 4];
            case 'm10_3_4':
            case 'sentence_en_then_trans':
              return [3, 4];
            case 'm11_1_2_3':
              return [1, 2, 3];
            case 'm12_1_2_4':
              return [1, 2, 4];
            case 'm13_1_3_4':
              return [1, 3, 4];
            case 'm14_2_3_4':
              return [2, 3, 4];
            case 'm15_1_2_3_4':
            case 'full_sequence':
              return [1, 2, 3, 4];
            default:
              return [1, 2];
          }
        };

        const currentParts = getPartsForMode(playMode);

        for (let iteration = 0; iteration < repeatCount; iteration++) {
          if (speechSessionRef.current !== currentSession) break;
          await playParts(currentParts);

          if (speechSessionRef.current !== currentSession) break;
          if (iteration < repeatCount - 1) {
            await waitDelay();
          }
        }
      } catch (err) {
        console.error('Speech error:', err);
      } finally {
        if (speechSessionRef.current === currentSession) {
          setActiveSpeakingWordId(null);
        }
      }
    },
    [voiceSettings, stopSpeechHandler]
  );

  // Speak Example Sentence explicitly (with optional translation sequence)
  const handlePlaySentence = useCallback(
    async (text: string, langCode: string = 'en-US', followUpTranslation?: { text: string; langCode: string }) => {
      if (!text) return;
      stopSpeechHandler();
      const currentSession = speechSessionRef.current;
      setActiveSpeakingWordId('sentence');

      try {
        await speakText(
          text,
          langCode,
          langCode.startsWith('en') ? voiceSettings.englishVoiceURI : voiceSettings.translationVoiceURI,
          {
            rate: voiceSettings.rate,
            pitch: voiceSettings.pitch,
            volume: voiceSettings.volume,
          }
        );

        if (speechSessionRef.current !== currentSession) return;

        if (followUpTranslation && followUpTranslation.text) {
          const delayMs = (voiceSettings.autoDelaySeconds || 0.6) * 1000;
          const start = Date.now();
          await new Promise((res) => {
            const timer = setInterval(() => {
              if (speechSessionRef.current !== currentSession || Date.now() - start >= delayMs) {
                clearInterval(timer);
                res(undefined);
              }
            }, 30);
          });

          if (speechSessionRef.current !== currentSession) return;

          await speakText(
            followUpTranslation.text,
            followUpTranslation.langCode,
            voiceSettings.translationVoiceURI,
            {
              rate: voiceSettings.rate,
              pitch: voiceSettings.pitch,
              volume: voiceSettings.volume,
            }
          );
        }
      } finally {
        if (speechSessionRef.current === currentSession) {
          setActiveSpeakingWordId(null);
        }
      }
    },
    [voiceSettings, stopSpeechHandler]
  );

  // Toggle Favorite
  const handleToggleFavorite = (wordId: string) => {
    setFavorites((prev) =>
      prev.includes(wordId) ? prev.filter((id) => id !== wordId) : [...prev, wordId]
    );
  };

  // Add Custom Word
  const handleAddWord = (newWord: Omit<WordItem, 'id' | 'isCustom'>) => {
    const created: WordItem = {
      ...newWord,
      id: 'custom_' + Date.now(),
      isCustom: true,
    };
    setCustomWords((prev) => [created, ...prev]);
  };

  // AutoPlay Controller Loop Effect
  const autoPlayActiveRef = useRef(isAutoPlaying);
  const autoPlayPausedRef = useRef(isPaused);
  autoPlayActiveRef.current = isAutoPlaying;
  autoPlayPausedRef.current = isPaused;

  useEffect(() => {
    if (!isAutoPlaying) return;

    let cancelled = false;

    const runAutoPlayLoop = async () => {
      if (autoPlayIndex >= displayedWords.length) {
        setIsAutoPlaying(false);
        return;
      }

      setSlideIndex(autoPlayIndex);
      const currentWord = displayedWords[autoPlayIndex];

      if (currentWord) {
        await handlePlayWord(currentWord);
      }

      if (cancelled || !autoPlayActiveRef.current) return;

      // Wait between slides
      const delayMs = (voiceSettings.autoDelaySeconds || 1.0) * 1000;
      await new Promise((res) => setTimeout(res, delayMs));

      // Wait if paused
      while (autoPlayPausedRef.current && autoPlayActiveRef.current && !cancelled) {
        await new Promise((res) => setTimeout(res, 300));
      }

      if (!cancelled && autoPlayActiveRef.current) {
        setAutoPlayIndex((prev) => prev + 1);
      }
    };

    runAutoPlayLoop();

    return () => {
      cancelled = true;
    };
  }, [isAutoPlaying, autoPlayIndex, displayedWords, handlePlayWord, voiceSettings.autoDelaySeconds]);

  // AutoPlay Controls
  const handleToggleAutoPlay = () => {
    if (isAutoPlaying) {
      setIsPaused(!isPaused);
    } else {
      setIsAutoPlaying(true);
      setIsPaused(false);
      setAutoPlayIndex(slideIndex);
    }
  };

  const handleStopAutoPlay = () => {
    setIsAutoPlaying(false);
    setIsPaused(false);
    stopSpeech();
  };

  const handleNextWord = () => {
    if (slideIndex < displayedWords.length - 1) {
      const nextIdx = slideIndex + 1;
      setSlideIndex(nextIdx);
      if (isAutoPlaying) setAutoPlayIndex(nextIdx);
    }
  };

  const handlePrevWord = () => {
    if (slideIndex > 0) {
      const prevIdx = slideIndex - 1;
      setSlideIndex(prevIdx);
      if (isAutoPlaying) setAutoPlayIndex(prevIdx);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Header Bar */}
      <Header
        currentStep={currentStep}
        onGoToStep={(step) => {
          handleStopAutoPlay();
          setCurrentStep(step);
        }}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
        }}
        voiceSettings={voiceSettings}
        theme={theme}
        onToggleTheme={setTheme}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        selectedGroupSymbol={selectedGroup?.symbol}
      />

      {/* Main View Flow Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 overflow-y-auto flex flex-col">
        {/* Step 1: Language Selection Page */}
        {currentStep === 'language' && (
          <LanguageSelectionStep
            selectedLanguageCode={voiceSettings.targetLanguage}
            onSelectLanguage={(code) => setVoiceSettings((p) => ({ ...p, targetLanguage: code }))}
            onProceed={() => setCurrentStep('category')}
            theme={theme}
          />
        )}

        {/* Step 2: Category & Phoneme Group Selection Page */}
        {currentStep === 'category' && (
          <PhonemeCategoryStep
            selectedLanguageCode={voiceSettings.targetLanguage}
            onChangeLanguageRequest={() => setCurrentStep('language')}
            searchQuery={searchQuery}
            onSelectGroup={(g, pattern, shuffle) => {
              setSelectedGroup(g);
              setSelectedPattern(pattern || null);
              setIsShuffled(!!shuffle);
              if (shuffle) setShuffledSeed(Date.now());
              setShowFavoritesOnly(false);
              setSearchQuery('');
              setCurrentStep('slide');
            }}
            onSelectFavorites={() => {
              setShowFavoritesOnly(true);
              setSelectedGroup(null);
              setSelectedPattern(null);
              setIsShuffled(false);
              setSearchQuery('');
              setCurrentStep('slide');
            }}
            favoritesCount={favorites.length}
            theme={theme}
          />
        )}

        {/* Step 3: Slide & Practice Workspace */}
        {currentStep === 'slide' && (
          <div className="flex-1 flex flex-col items-center w-full">
            {/* Active Pattern Filter Banner (Only shown in Column view, since Slide view has it integrated above card) */}
            {viewMode !== 'slide' && selectedPattern ? (
              <div className={`w-full max-w-4xl mb-3 flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl border text-xs font-semibold shadow-2xs ${
                theme === 'dark'
                  ? 'bg-indigo-950/70 border-indigo-800 text-indigo-200'
                  : 'bg-indigo-50/90 border-indigo-200 text-indigo-900'
              }`}>
                <div className="flex items-center gap-2">
                  <span className={theme === 'dark' ? 'text-indigo-400 font-bold' : 'text-indigo-600 font-bold'}>
                    {t('activePatternFilter')}:
                  </span>
                  <span className={`font-mono font-extrabold px-2.5 py-0.5 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-indigo-900 text-indigo-100 border-indigo-700'
                      : 'bg-indigo-200/80 text-indigo-900 border-indigo-300/60'
                  }`}>
                    {selectedPattern}
                  </span>
                  <span className={theme === 'dark' ? 'text-slate-400 font-normal' : 'text-slate-500 font-normal'}>
                    ({displayedWords.length} {t('wordCardsCount').toLowerCase()})
                  </span>
                </div>
                <button
                  onClick={() => setSelectedPattern(null)}
                  className={`px-2.5 py-1 rounded-xl border font-bold transition-all shadow-2xs ${
                    theme === 'dark'
                      ? 'bg-slate-900 border-indigo-800 text-indigo-300 hover:bg-indigo-600 hover:text-white'
                      : 'bg-white border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white'
                  }`}
                >
                  {t('clearPatternFilter')}
                </button>
              </div>
            ) : null}

            {/* AutoPlay Bar */}
            <AutoPlayBar
              isAutoPlaying={isAutoPlaying}
              isPaused={isPaused}
              activeSpeakingWordId={activeSpeakingWordId}
              currentIndex={slideIndex}
              totalWords={displayedWords.length}
              activeWord={displayedWords[slideIndex] || null}
              voiceSettings={voiceSettings}
              onUpdateSettings={(newS) => setVoiceSettings((p) => ({ ...p, ...newS }))}
              onTogglePlayPause={() => {
                if (!isPaused) {
                  stopSpeechHandler();
                }
                setIsPaused(!isPaused);
              }}
              onStartAutoPlay={handleToggleAutoPlay}
              onPlayCurrentCard={() => {
                if (displayedWords[slideIndex]) handlePlayWord(displayedWords[slideIndex]);
              }}
              onStop={handleStopAutoPlay}
              onNext={handleNextWord}
              onPrev={handlePrevWord}
              theme={theme}
            />

            {/* Slide View or Column View */}
            {viewMode === 'slide' ? (
              <WordSlideView
                words={displayedWords}
                currentIndex={slideIndex}
                onIndexChange={(idx) => {
                  setSlideIndex(idx);
                  setAutoPlayIndex(idx);
                }}
                activeWordId={activeSpeakingWordId}
                favorites={favorites}
                voiceSettings={voiceSettings}
                onPlayWord={handlePlayWord}
                onPlaySentence={handlePlaySentence}
                onToggleFavorite={handleToggleFavorite}
                selectedPattern={selectedPattern}
                onClearPattern={() => setSelectedPattern(null)}
                theme={theme}
              />
            ) : (
              <WordColumnView
                words={displayedWords}
                activeWordId={activeSpeakingWordId}
                favorites={favorites}
                voiceSettings={voiceSettings}
                onPlayWord={handlePlayWord}
                onPlaySentence={handlePlaySentence}
                onToggleFavorite={handleToggleFavorite}
                theme={theme}
              />
            )}
          </div>
        )}
      </main>

      {/* Classic Footer */}
      <Footer theme={theme} />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        voiceSettings={voiceSettings}
        onUpdateSettings={(newS) => setVoiceSettings((p) => ({ ...p, ...newS }))}
      />

      {/* Add Custom Word Modal */}
      <AddWordModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddWord={handleAddWord}
        groups={PHONEME_GROUPS}
        currentGroupId={selectedGroup?.id || PHONEME_GROUPS[0].id}
      />
    </div>
  );
}
