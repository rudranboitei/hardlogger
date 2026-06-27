import type { RuntimeEnvironment } from './types.js';

/**
 * Safely detect if we're in a browser environment
 */
export function isBrowser(): boolean {
  try {
    return typeof window !== 'undefined' && typeof window.document !== 'undefined';
  } catch {
    return false;
  }
}

/**
 * Safely detect if we're in a Node.js environment
 */
export function isNode(): boolean {
  try {
    return (
      typeof process !== 'undefined' &&
      process.versions != null &&
      process.versions.node != null
    );
  } catch {
    return false;
  }
}

/**
 * Detect the current runtime environment
 */
export function detectEnvironment(): RuntimeEnvironment {
  if (isBrowser()) {
    return 'browser';
  }
  return 'node';
}

/**
 * Check if we're in production mode
 */
export function isProduction(): boolean {
  try {
    // Check Node.js / Webpack
    if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'production') {
      return true;
    }
    // Check Vite / Bun / Modern ESM bundlers
    if (typeof import.meta !== 'undefined' && (import.meta as any).env?.PROD) {
      return true;
    }
  } catch {
    // Fallback safely
  }
  return false;
}

/**
 * Check if logging should be enabled by default
 */
export function shouldLogByDefault(): boolean {
  return !isProduction();
}
