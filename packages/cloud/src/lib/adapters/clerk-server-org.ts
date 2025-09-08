import type {
  Organization,
  OrganizationAdapter,
} from "@elmo/shared/lib/adapters/types";

// Server-safe organization adapter for Clerk
// This can be instantiated on the server but provides basic functionality
export class ClerkServerOrgAdapter implements OrganizationAdapter {
  private readonly defaultOrg: Organization = {
    id: "default",
    name: "Organization",
    slug: "default",
    imageUrl: undefined,
  };

  getCurrentOrganization(): Promise<Organization | null> {
    // In server context, return default org
    // Real org detection would happen in client components via hooks
    return Promise.resolve(this.defaultOrg);
  }

  getOrganizations(): Promise<Organization[]> {
    return Promise.resolve([this.defaultOrg]);
  }

  switchOrganization(_orgId: string): Promise<void> {
    // Server-side switching not supported
    return Promise.resolve();
  }

  hasOrganizations(): Promise<boolean> {
    return Promise.resolve(true);
  }

  isLoaded(): boolean {
    return true;
  }

  canManageOrganization(): Promise<boolean> {
    return Promise.resolve(true); // Cloud version supports management
  }
}
