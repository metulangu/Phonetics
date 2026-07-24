export type UILanguage = 'en';

export const UI_TRANSLATIONS = {
  en: {
    appTitle: 'Phonetics Pro',
    appSubTitle: 'Interactive Phonetic Slide Cards',
    mainHeading: 'Phonetic Pronunciation Guide',
    whiteTheme: 'Light',
    darkTheme: 'Dark',
    changeLang: 'Change Target Language',
    backToGroups: 'Back to Phoneme Groups',
    searchPlaceholder: 'Search word or phoneme symbol (e.g. bean, /iː/)...',
    slideView: 'Slide',
    listView: 'List',
    addWord: 'Add Word',
    settings: 'Settings',
    group: 'Group',

    // Step 1: Target Language Selection
    step1Title: 'Select Translation & Speech Language',
    step1Desc: 'Choose your target translation language or select English (Monolingual) for direct phonetic learning.',
    searchLangPlaceholder: 'Search language (e.g., German, Spanish, French, Turkish)...',
    googleTranslate: 'Google Translate',
    ttsAvailable: 'TTS Audio Supported',
    ttsOnlyText: 'Text Only',
    startBtn: 'Start Practice',
    selectBtn: 'Select',

    // Step 2: Phoneme Groups
    step2Badge: 'Step 2 of 3: Phoneme Groups',
    step2Title: 'Select Phoneme Group to Practice',
    targetLangLabel: 'Target Language',
    tabAll: 'All',
    tabVowels: 'Monophthongs',
    tabDiphthongs: 'Diphthongs',
    tabConsonants: 'Consonants',
    favoritesCount: 'My Favorites',
    typeMonophthong: 'Monophthong',
    typeDiphthong: 'Diphthong',
    typeConsonant: 'Consonant',
    wordCardsCount: 'Word Cards',
    spellingPatternsLabel: 'Spelling Patterns (Graphemes)',
    viewAllWords: 'View All Words',
    patternsCount: 'patterns',
    activePatternFilter: 'Pattern Filter',
    clearPatternFilter: 'Show All Words in Group',

    // Step 3 & AutoPlay
    autoPlayBtn: 'Auto',
    autoPlayingStatus: 'Auto Playing',
    prevSlide: 'Previous Slide',
    nextSlide: 'Next Slide',
    pause: 'Pause',
    resume: 'Resume',
    stop: 'Stop',
    speed: 'Speed',
    delay: 'Interval Delay',
    repeatCount: 'Repeat Count',
    playModeEnOnly: 'EN (Word Only)',
    playModeTransOnly: 'Target (Translation Only)',
    playModeEnThenTrans: 'EN + Target',
    playModeSentenceOnly: 'EN Sentence',
    playModeSentenceTransOnly: 'Target Sentence',
    playModeEnThenSentence: 'EN + EN Sentence',
    playModeSentenceEnThenTrans: 'EN Sentence + Target Sentence',
    playModeFullSequence: 'Full Sequence (EN + Target + EN S. + Target S.)',
    playCardBtn: 'Read Slide Card',
  },
};

export function t(key: keyof typeof UI_TRANSLATIONS['en']): string {
  return UI_TRANSLATIONS.en[key] || key;
}
