"use client";

import type { AppConfig } from "@elmo/shared/lib/adapters/types";
import { ClerkClientAuthAdapter } from "./clerk-client-auth";
import { ClerkOrgAdapter } from "./clerk-org";
import { ClerkAuthProvider } from "./clerk-provider";

// Client-safe cloud configuration
// Uses client-compatible adapters and providers
export function getCloudClientConfig(): AppConfig {
  return {
    features: {
      auth: true,
      billing: false, // TODO: Add billing later
      organizations: true, // Enable organizations with Clerk
    },
    navigation: {
      showLinks: false, // Don't show links in cloud version
      links: [],
    },
    adapters: {
      auth: new ClerkClientAuthAdapter(),
      organization: new ClerkOrgAdapter(),
    },
    providers: {
      auth: ClerkAuthProvider,
    },
  };
}
