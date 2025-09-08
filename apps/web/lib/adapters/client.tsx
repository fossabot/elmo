"use client";

import { isCloudMode } from "@/lib/adapters/client-config";
import type { AppConfig } from "@elmo/shared/lib/adapters/types";
import { getOSSConfig } from "./oss-config";

// Client-only configuration - no server imports
// Inlined cloud config to avoid any potential server-side import issues
export function getAppConfig(): AppConfig {
  if (isCloudMode()) {
    // Inlined cloud configuration to avoid importing server-side code
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
        // Use placeholder adapters for client-side config
        // Real functionality comes from hooks and components
        auth: {
          getCurrentUser: () => Promise.resolve(null),
          getOrganization: () => Promise.resolve(null),
          requireAuth: () => Promise.reject(new Error("Use hooks for client-side auth")),
          requireAuthInRoute: () => Promise.reject(new Error("Use hooks for client-side auth")),
          signOut: () => Promise.reject(new Error("Use Clerk components for sign out")),
        },
        organization: {
          getCurrentOrganization: () => Promise.resolve(null),
          getOrganizations: () => Promise.resolve([]),
          switchOrganization: () => Promise.resolve(),
          hasOrganizations: () => Promise.resolve(false),
          isLoaded: () => false,
          canManageOrganization: () => Promise.resolve(false),
          openOrganizationProfile: () => {},
          openCreateOrganization: () => {},
        },
      },
      providers: {
        auth: {
          Provider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
          useAuth: () => ({ user: null, isLoaded: false }),
          SignIn: () => <div>Sign In Placeholder</div>,
          UserButton: () => <div>User Button Placeholder</div>,
        },
      },
    };
  }
  
  return getOSSConfig();
}
