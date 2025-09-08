import type { AppConfig } from "@elmo/shared/lib/adapters/types";
import { AuthWrapper } from "./auth-wrapper";
import { ClerkAuthAdapter } from "./clerk-auth";
import { ClerkServerOrgAdapter } from "./clerk-server-org";

// Server-safe cloud configuration
// Uses server-compatible adapters that can be instantiated on the server
export function getAppConfig(): AppConfig {
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
      auth: new ClerkAuthAdapter(),
      organization: new ClerkServerOrgAdapter(),
    },
    providers: {
      auth: {
        Provider: AuthWrapper,
        useAuth: () => ({ user: null, isLoaded: false }), // Server-side placeholder
      },
    },
  };
}
