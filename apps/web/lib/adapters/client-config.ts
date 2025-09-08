// Client-safe configuration utilities
// This file contains only client-safe code and doesn't import server-only modules

export type AppMode = 'cloud' | 'oss';

/**
 * Determines if the app is running in cloud mode
 * This is the single source of truth for cloud vs OSS detection
 * Client-safe version that can access server environment variables at build time
 */
export function getAppMode(): AppMode {
  // For client-side code, we can still access process.env.CLOUD at build time
  // Next.js will inline this value during the build process
  return (process.env.CLOUD === 'true' || process.env.NEXT_PUBLIC_CLOUD === 'true') ? 'cloud' : 'oss';
}

/**
 * Check if the app is running in cloud mode
 */
export function isCloudMode(): boolean {
  return getAppMode() === 'cloud';
}

/**
 * Check if the app is running in OSS mode
 */
export function isOSSMode(): boolean {
  return getAppMode() === 'oss';
}
