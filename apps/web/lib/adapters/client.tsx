"use client";

import { ClerkClientAuthAdapter } from "@elmo/cloud/lib/adapters/clerk-client-auth";
import { ClerkOrgAdapter } from "@elmo/cloud/lib/adapters/clerk-org";
import { ClerkAuthProvider } from "@elmo/cloud/lib/adapters/clerk-provider";
import type { AppConfig } from "@elmo/shared/lib/adapters/types";
import { getOSSConfig } from "./oss-config";

// Client-only configuration - no server imports
const isCloudMode = process.env.CLOUD === "true";

function getCloudClientConfig(): AppConfig {
  return {
    features: {
      auth: true,
      billing: false,
      organizations: true,
    },
    navigation: {
      showLinks: false,
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

export function getAppConfig(): AppConfig {
  console.log("isCloudMode", isCloudMode);
  return isCloudMode ? getCloudClientConfig() : getOSSConfig();
}
