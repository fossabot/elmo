// Centralized configuration for the main app
// This determines which adapters and providers to use based on the environment

import { getOSSConfig } from "./oss-config";
import type { AppConfig } from "@elmo/shared/lib/adapters/types";
import { getAppConfig as getCloudConfig } from "@elmo/cloud/lib/adapters/index";

export type AppMode = 'cloud' | 'oss';

/**
 * Determines if the app is running in cloud mode
 * This is the single source of truth for cloud vs OSS detection
 */
export function getAppMode(): AppMode {
  return (process.env.CLOUD === 'true') ? 'cloud' : 'oss';
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

/**
 * Server-safe configuration that can be used in server components and API routes
 * Uses adapters that are safe to instantiate on the server
 */
export function getServerConfig(): AppConfig {
  return isCloudMode() ? getCloudConfig() : getOSSConfig();
}

/**
 * Client-safe configuration for use in client components
 * This is re-exported from client.tsx to avoid server imports in client code
 */
export { getAppConfig as getClientConfig } from "./client";
