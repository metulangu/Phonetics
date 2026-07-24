// Ensure window.fetch is writable to avoid errors when polyfills attempt to assign to globalThis.fetch
if (typeof window !== 'undefined') {
  try {
    const nativeFetch = window.fetch;
    let currentFetch = nativeFetch;
    Object.defineProperty(window, 'fetch', {
      get: () => currentFetch,
      set: (v) => {
        currentFetch = v || nativeFetch;
      },
      configurable: true,
      enumerable: true,
    });
  } catch (e) {
    // ignore
  }
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
