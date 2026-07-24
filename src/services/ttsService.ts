import { VoiceSettings } from '../types';

let currentUtterance: SpeechSynthesisUtterance | null = null;

export function isTTSSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

if (isTTSSupported()) {
  try {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  } catch (e) {
    console.warn('onvoiceschanged listener failed:', e);
  }
}

export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (!isTTSSupported()) return [];
  return window.speechSynthesis.getVoices();
}

export function getEnglishVoices(): SpeechSynthesisVoice[] {
  const voices = getAvailableVoices();
  return voices.filter((v) => v.lang.toLowerCase().startsWith('en'));
}

export function getVoicesForLang(langCode: string): SpeechSynthesisVoice[] {
  const voices = getAvailableVoices();
  return voices.filter((v) => v.lang.toLowerCase().startsWith(langCode.toLowerCase()));
}

export function findVoice(uri: string | undefined, langCode: string): SpeechSynthesisVoice | null {
  const voices = getAvailableVoices();
  if (uri) {
    const match = voices.find((v) => v.voiceURI === uri);
    if (match) return match;
  }

  const langVoices = voices.filter((v) =>
    v.lang.toLowerCase().replace('_', '-').startsWith(langCode.toLowerCase())
  );

  const googleVoice = langVoices.find((v) => v.name.toLowerCase().includes('google'));
  if (googleVoice) return googleVoice;

  const defaultVoice = langVoices.find((v) => v.default);
  if (defaultVoice) return defaultVoice;

  return langVoices[0] || voices[0] || null;
}

export function stopSpeech(): void {
  if (!isTTSSupported()) return;
  try {
    window.speechSynthesis.cancel();
  } catch (e) {
    console.warn('Error stopping speech:', e);
  }
  currentUtterance = null;
}

export function speakText(
  text: string,
  langCode: string,
  voiceURI: string | undefined,
  settings: Pick<VoiceSettings, 'rate' | 'pitch' | 'volume'>,
  onStart?: () => void
): Promise<void> {
  return new Promise((resolve) => {
    if (!isTTSSupported() || !text || !text.trim()) {
      resolve();
      return;
    }

    // Stop active speech
    stopSpeech();

    // Ensure synthesis is not in paused state (Chrome auto-freeze bug workaround)
    if (window.speechSynthesis.paused) {
      try {
        window.speechSynthesis.resume();
      } catch (e) {
        console.warn('Speech resume error:', e);
      }
    }

    setTimeout(() => {
      try {
        const utterance = new SpeechSynthesisUtterance(text.trim());
        currentUtterance = utterance;

        const voice = findVoice(voiceURI, langCode);
        if (voice) {
          utterance.voice = voice;
          utterance.lang = voice.lang;
        } else {
          utterance.lang = langCode;
        }

        utterance.rate = settings.rate || 1.0;
        utterance.pitch = settings.pitch || 1.0;
        utterance.volume = settings.volume ?? 1.0;

        let resolved = false;

        const complete = () => {
          if (!resolved) {
            resolved = true;
            if (currentUtterance === utterance) {
              currentUtterance = null;
            }
            resolve();
          }
        };

        utterance.onstart = () => {
          if (onStart) onStart();
        };

        utterance.onend = () => {
          complete();
        };

        utterance.onerror = (e) => {
          console.warn('Speech synthesis utterance error:', e);
          complete();
        };

        window.speechSynthesis.speak(utterance);

        // Safety fallback timer for browsers where onend doesn't fire
        const rate = utterance.rate > 0 ? utterance.rate : 1.0;
        const estimatedMs = Math.max(1200, (text.length / 5) * (1000 / rate) + 1000);
        setTimeout(() => {
          complete();
        }, estimatedMs);
      } catch (err) {
        console.error('Failed to speak text:', err);
        resolve();
      }
    }, 40);
  });
}
