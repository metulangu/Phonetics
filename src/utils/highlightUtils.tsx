import React from 'react';

/**
 * Highlights the spelling pattern in an English word.
 * Example: word="about", pattern="a" -> [<span className="...">a</span>, "bout"]
 */
export function renderHighlightedWord(
  word: string,
  pattern?: string,
  isHighlightEnabled: boolean = true,
  isLight: boolean = true,
  isActivePlaying: boolean = false,
  ipa?: string,
  symbol?: string
): React.ReactNode {
  if (!isHighlightEnabled || !pattern || !word) {
    return word;
  }

  const cleanPattern = pattern.trim();
  if (!cleanPattern) return word;

  // Handle split patterns like "a_e", "i_e", "o_e", "u_e"
  if (cleanPattern.includes('_')) {
    const parts = cleanPattern.split('_').filter(Boolean); // e.g. ["a", "e"]
    if (parts.length === 0) return word;

    const regex = new RegExp(`(${parts.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    const wordParts = word.split(regex);

    return wordParts.map((part, i) => {
      if (parts.some((p) => p.toLowerCase() === part.toLowerCase())) {
        return (
          <span
            key={i}
            className={
              isActivePlaying
                ? 'text-amber-300 font-black underline decoration-amber-300 decoration-4 underline-offset-4'
                : isLight
                ? 'text-indigo-600 font-black underline decoration-indigo-500 decoration-4 underline-offset-4 dark:text-indigo-400 dark:decoration-indigo-400'
                : 'text-amber-400 font-black underline decoration-amber-400 decoration-4 underline-offset-4'
            }
          >
            {part}
          </span>
        );
      }
      return part;
    });
  }

  // Find all occurrences of pattern in word
  const escapedPattern = cleanPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const patternRegex = new RegExp(escapedPattern, 'gi');

  const occurrences: { start: number; end: number }[] = [];
  let match: RegExpExecArray | null;
  while ((match = patternRegex.exec(word)) !== null) {
    occurrences.push({ start: match.index, end: match.index + match[0].length });
  }

  if (occurrences.length === 0) {
    return word;
  }

  const targetIndices = new Set<number>();

  if (occurrences.length === 1) {
    targetIndices.add(0);
  } else if (ipa && symbol) {
    const cleanSymbol = symbol.trim().replace(/^\/|\/$/g, '');
    const cleanIpa = ipa.trim().replace(/^\/|\/$/g, '');

    // Extract vowel groups from word
    const wordVowelRegex = /[aeiouy]+/gi;
    const wordVowels: { text: string; start: number; end: number }[] = [];
    let vm: RegExpExecArray | null;
    while ((vm = wordVowelRegex.exec(word)) !== null) {
      wordVowels.push({ text: vm[0], start: vm.index, end: vm.index + vm[0].length });
    }

    // Extract IPA vowels
    const ipaVowelsList = [
      'iː', 'uː', 'ɑː', 'ɔː', 'ɜː', 'eɪ', 'aɪ', 'ɔɪ', 'əʊ', 'aʊ', 'ɪə', 'eə', 'ʊə',
      'ɪ', 'e', 'æ', 'ʌ', 'ɒ', 'ʊ', 'ə'
    ];
    const ipaVowelRegex = new RegExp(`(${ipaVowelsList.join('|')})`, 'g');
    const ipaVowels: { text: string; index: number }[] = [];
    let im: RegExpExecArray | null;
    while ((im = ipaVowelRegex.exec(cleanIpa)) !== null) {
      ipaVowels.push({ text: im[0], index: im.index });
    }

    occurrences.forEach((occ, occIdx) => {
      const vGroupIdx = wordVowels.findIndex((v) => occ.start >= v.start && occ.end <= v.end);

      let matchedIpaVowel: string | undefined;
      if (vGroupIdx !== -1 && vGroupIdx < ipaVowels.length) {
        matchedIpaVowel = ipaVowels[vGroupIdx].text;
      } else if (ipaVowels.length > 0) {
        const ratioIdx = Math.min(
          Math.floor((occ.start / word.length) * ipaVowels.length),
          ipaVowels.length - 1
        );
        matchedIpaVowel = ipaVowels[ratioIdx].text;
      }

      if (matchedIpaVowel && matchedIpaVowel.includes(cleanSymbol)) {
        targetIndices.add(occIdx);
      }
    });

    // Fallback heuristic if no vowel mapped directly
    if (targetIndices.size === 0 && cleanSymbol === 'ə' && cleanPattern.toLowerCase() === 'a') {
      if (word.toLowerCase().startsWith('a')) {
        targetIndices.add(0);
      } else if (word.toLowerCase().endsWith('a')) {
        targetIndices.add(occurrences.length - 1);
      } else {
        targetIndices.add(0);
      }
    }
  } else {
    // If no IPA or symbol provided, highlight all occurrences
    occurrences.forEach((_, idx) => targetIndices.add(idx));
  }

  // Construct highlighted ReactNode
  const segments: React.ReactNode[] = [];
  let lastIndex = 0;

  occurrences.forEach((occ, idx) => {
    if (occ.start > lastIndex) {
      segments.push(word.substring(lastIndex, occ.start));
    }

    const subText = word.substring(occ.start, occ.end);
    if (targetIndices.has(idx)) {
      segments.push(
        <span
          key={`occ-${idx}`}
          className={
            isActivePlaying
              ? 'text-amber-300 font-black underline decoration-amber-300 decoration-4 underline-offset-4'
              : isLight
              ? 'text-indigo-600 font-black underline decoration-indigo-500 decoration-4 underline-offset-4 dark:text-indigo-400 dark:decoration-indigo-400'
              : 'text-amber-400 font-black underline decoration-amber-400 decoration-4 underline-offset-4'
          }
        >
          {subText}
        </span>
      );
    } else {
      segments.push(subText);
    }

    lastIndex = occ.end;
  });

  if (lastIndex < word.length) {
    segments.push(word.substring(lastIndex));
  }

  return segments;
}

/**
 * Highlights the target IPA symbol in an IPA transcription string.
 * Example: ipa="/əˈbaʊt/", symbol="ə" -> ["/", <span className="...">ə</span>, "ˈbaʊt/"]
 */
export function renderHighlightedIPA(
  ipa: string,
  symbol?: string,
  isHighlightEnabled: boolean = true,
  isLight: boolean = true,
  isActivePlaying: boolean = false
): React.ReactNode {
  if (!isHighlightEnabled || !symbol || !ipa) {
    return ipa;
  }

  const cleanSymbol = symbol.trim().replace(/^\/|\/$/g, '');
  if (!cleanSymbol) return ipa;

  const escapedSymbol = cleanSymbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedSymbol})`, 'g');
  const parts = ipa.split(regex);

  if (parts.length <= 1) {
    return ipa;
  }

  return parts.map((part, i) => {
    if (part === cleanSymbol) {
      return (
        <span
          key={i}
          className={
            isActivePlaying
              ? 'text-amber-300 font-black bg-amber-400/30 px-1 py-0.5 rounded shadow-2xs'
              : isLight
              ? 'text-indigo-600 font-black bg-indigo-100/90 px-1 py-0.5 rounded shadow-2xs dark:bg-indigo-900/80 dark:text-indigo-300'
              : 'text-amber-400 font-black bg-amber-400/20 px-1 py-0.5 rounded shadow-2xs'
          }
        >
          {part}
        </span>
      );
    }
    return part;
  });
}
