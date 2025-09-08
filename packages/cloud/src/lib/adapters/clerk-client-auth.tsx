// Client-side auth adapter for Clerk
"use client";

import { useUser } from "@clerk/nextjs";
import type {
  AuthAdapter,
  Organization,
  User,
} from "@elmo/shared/lib/adapters/types";

export class ClerkClientAuthAdapter implements AuthAdapter {
  getCurrentUser(): Promise<User | null> {
    // This is a client-side adapter, so we need to use hooks
    // This method won't work directly - we need to use the hook in a component
    return Promise.resolve(null);
  }

  getOrganization(): Promise<Organization | null> {
    // For now, return null. Can be extended later for org support
    return Promise.resolve(null);
  }

  requireAuth(): Promise<User> {
    // This is a client-side adapter, so we need to use hooks
    // This method won't work directly - we need to use the hook in a component
    return Promise.reject(
      new Error("Use useClerkAuth hook for client-side auth")
    );
  }

  requireAuthInRoute(): Promise<User> {
    // This is a client-side adapter, so we need to use hooks
    // This method won't work directly - we need to use the hook in a component
    return Promise.reject(
      new Error("Use useClerkAuth hook for client-side auth")
    );
  }

  signOut(): Promise<void> {
    // Clerk handles sign out through their components
    // This would typically redirect to sign out
    return Promise.reject(new Error("Use Clerk UserButton for sign out"));
  }
}

// Hook-based auth utilities for Clerk
export function useClerkAuth(): {
  user: User | null;
  isLoaded: boolean;
  isSignedIn: boolean;
  requireAuth: () => User;
} {
  const { user, isLoaded, isSignedIn } = useUser();

  const mappedUser: User | null = user
    ? {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress || "",
        name: user.fullName || user.firstName || "User",
        imageUrl: user.imageUrl,
      }
    : null;

  const requireAuth = (): User => {
    if (!isLoaded) {
      throw new Error("Auth not loaded yet");
    }
    if (!(isSignedIn && mappedUser)) {
      throw new Error("Authentication required");
    }
    return mappedUser;
  };

  return {
    user: mappedUser,
    isLoaded,
    isSignedIn: isSignedIn ?? false,
    requireAuth,
  };
}
