import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PHONEME_GROUPS } from './data/phonemesData';
import { AppStep, PhonemeGroup, PlayMode, VoiceSettings, WordItem } from './types';
import { speakText, stopSpeech } from './services/ttsService';
import { translateText } from './services/translateService';
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
      list = list.filter(
        (w) =>
          w.word.toLowerCase().includes(q) ||
          w.ipa.toLowerCase().includes(q) ||
          (w.translation && w.translation.toLowerCase().includes(q))
      );
    }

    // Apply Random Shuffle if requested
    if (isShuffled && shuffledSeed) {
      // Deterministic shuffle based on seed
      const arr = [...list];
      let m = arr.length, t, i;
      let seed = shuffledSeed;
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
  }, [allGroupWords, selectedPattern, searchQuery, isShuffled, shuffledSeed]);

  // Reset slide index when list changes
  useEffect(() => {
    setSlideIndex(0);
    setAutoPlayIndex(0);
  }, [selectedGroup, selectedPattern, showFavoritesOnly, isShuffled, shuffledSeed]);

  // Speak Handler
  const handlePlayWord = useCallback(
    async (wordItem: WordItem) => {
      setActiveSpeakingWordId(wordItem.id);
      stopSpeech();

      const langCode = voiceSettings.targetLanguage || 'tr';
      const playMode = voiceSettings.playMode;

      try {
        // Fetch Translation dynamically if missing
        let transText = (wordItem.translation && typeof wordItem.translation === 'object' ? wordItem.translation[langCode] || wordItem.translation['en'] || '' : '') || '';
        if (!transText) {
          transText = await translateText(wordItem.word, langCode);
        }

        const speakEn = () =>
          speakText(wordItem.word, 'en-US', voiceSettings.englishVoiceURI, {
            rate: voiceSettings.rate,
            pitch: voiceSettings.pitch,
            volume: voiceSettings.volume,
          });

        const speakTrans = () =>
          speakText(transText, langCode, voiceSettings.translationVoiceURI, {
            rate: voiceSettings.rate,
            pitch: voiceSettings.pitch,
            volume: voiceSettings.volume,
          });

        const speakSentence = () => {
          if (wordItem.exampleSentence) {
            return speakText(wordItem.exampleSentence, 'en-US', voiceSettings.englishVoiceURI, {
              rate: voiceSettings.rate,
              pitch: voiceSettings.pitch,
              volume: voiceSettings.volume,
            });
          }
          return Promise.resolve();
        };

        const waitDelay = () =>
          new Promise((res) => setTimeout(res, (voiceSettings.autoDelaySeconds || 0.8) * 1000));

        if (playMode === 'english_only') {
          await speakEn();
        } else if (playMode === 'translation_only') {
          await speakTrans();
        } else if (playMode === 'sentence_only') {
          await speakSentence();
        } else if (playMode === 'english_then_translation') {
          await speakEn();
          await waitDelay();
          await speakTrans();
        } else if (playMode === 'english_then_sentence') {
          await speakEn();
          await waitDelay();
          await speakSentence();
        } else if (playMode === 'full_sequence') {
          await speakEn();
          await waitDelay();
          await speakTrans();
          await waitDelay();
          await speakSentence();
        } else if (playMode === 'english_twice') {
          await speakEn();
          await waitDelay();
          await speakEn();
        }
      } catch (err) {
        console.error('Speech error:', err);
      } finally {
        setActiveSpeakingWordId(null);
      }
    },
    [voiceSettings]
  );

  // Speak Example Sentence explicitly
  const handlePlaySentence = useCallback(
    (sentence: string) => {
      speakText(sentence, 'en-US', voiceSettings.englishVoiceURI, {
        rate: voiceSettings.rate,
        pitch: voiceSettings.pitch,
        volume: voiceSettings.volume,
      });
    },
    [voiceSettings]
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
            {/* Active Pattern or Shuffle Banner */}
            {selectedPattern ? (
              <div className="w-full max-w-xl mb-3 flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-indigo-50/90 dark:bg-indigo-950/70 border border-indigo-200/90 dark:border-indigo-800 text-xs font-semibold text-indigo-900 dark:text-indigo-200 shadow-2xs">
                <div className="flex items-center gap-2">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                    {t('activePatternFilter')}:
                  </span>
                  <span className="font-mono font-extrabold px-2.5 py-0.5 rounded-lg bg-indigo-200/80 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100 border border-indigo-300/60 dark:border-indigo-700">
                    {selectedPattern}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 font-normal">
                    ({displayedWords.length} {t('wordCardsCount').toLowerCase()})
                  </span>
                </div>
                <button
                  onClick={() => setSelectedPattern(null)}
                  className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-bold hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all shadow-2xs"
                >
                  {t('clearPatternFilter')}
                </button>
              </div>
            ) : isShuffled ? (
              <div className="w-full max-w-xl mb-3 flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-purple-50/90 dark:bg-purple-950/70 border border-purple-200/90 dark:border-purple-800 text-xs font-semibold text-purple-900 dark:text-purple-200 shadow-2xs">
                <div className="flex items-center gap-2">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">
                    🎲 Shuffled Word List
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 font-normal">
                    ({displayedWords.length} {t('wordCardsCount').toLowerCase()})
                  </span>
                </div>
                <button
                  onClick={() => setShuffledSeed(Date.now())}
                  className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 font-bold hover:bg-purple-600 hover:text-white transition-all shadow-2xs"
                >
                  🔄 Reshuffle
                </button>
              </div>
            ) : null}

            {/* AutoPlay Bar */}
            <AutoPlayBar
              isAutoPlaying={isAutoPlaying}
              isPaused={isPaused}
              currentIndex={slideIndex}
              totalWords={displayedWords.length}
              activeWord={displayedWords[slideIndex] || null}
              voiceSettings={voiceSettings}
              onUpdateSettings={(newS) => setVoiceSettings((p) => ({ ...p, ...newS }))}
              onTogglePlayPause={() => setIsPaused(!isPaused)}
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
