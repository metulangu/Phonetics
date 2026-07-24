const translationCache: Record<string, string> = {};

/**
 * Translates English text to target language using Google's free client translation endpoint.
 * Includes local memory caching to optimize performance and prevent redundant network calls.
 */
export async function translateText(text: string, targetLang: string = 'tr'): Promise<string> {
  if (!text || !text.trim()) return '';
  const cleanText = text.trim();
  const cacheKey = `${cleanText.toLowerCase()}_${targetLang}`;

  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(
      cleanText
    )}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Translation API HTTP ${response.status}`);
    }
    const data = await response.json();
    
    // Result format: [[["çeviri", "original", null, null, 1]], null, "en", ...]
    if (data && data[0] && Array.isArray(data[0])) {
      const translated = data[0].map((item: any) => item[0]).join('');
      if (translated) {
        translationCache[cacheKey] = translated;
        return translated;
      }
    }
  } catch (err) {
    console.warn('Free Google Translate fetch failed, falling back to local fallback:', err);
  }

  return cleanText; // fallback to original text if offline
}

/**
 * Batch translation helper for lazy loading lists of words.
 */
export async function translateWordsBatch(
  words: { id: string; text: string }[],
  targetLang: string
): Promise<Record<string, string>> {
  const results: Record<string, string> = {};
  
  // Translate sequentially or in parallel batches of 5 to avoid throttling
  const batchSize = 5;
  for (let i = 0; i < words.length; i += batchSize) {
    const batch = words.slice(i, i + batchSize);
    await Promise.all(
      batch.map(async (item) => {
        const translated = await translateText(item.text, targetLang);
        results[item.id] = translated;
      })
    );
  }

  return results;
}
