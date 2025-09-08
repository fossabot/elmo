"use client";

import { isCloudMode } from "@/lib/adapters/client-config";
import type { Organization } from "@elmo/shared/lib/adapters/types";
import { useEffect, useState } from "react";
import { getAppConfig } from "@/lib/adapters/client";
import { useOrganizations as useCloudOrganizations } from "@elmo/cloud/hooks/use-organizations";

export type UseOrganizationsReturn = {
  currentOrganization: Organization | null;
  organizations: Organization[];
  hasOrganizations: boolean;
  isLoaded: boolean;
  orgId: string | null;
  canManageOrganization: boolean;
  switchOrganization: (orgId: string) => Promise<void>;
  openOrganizationProfile?: () => void;
  openCreateOrganization?: () => void;
};

/**
 * Unified organization hook that works for both cloud and OSS versions
 * In cloud mode: Uses cloud package hook (which internally uses Clerk)
 * In OSS mode: Uses adapter-based organization management
 */
export function useOrganizations(): UseOrganizationsReturn {
  // For cloud mode, use the cloud package hook that integrates with Clerk
  if (isCloudMode()) {
    return useCloudOrganizations();
  }

  // For OSS mode, use adapter-based approach
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [hasOrganizations, setHasOrganizations] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [canManageOrganization, setCanManageOrganization] = useState(false);

  const { adapters } = getAppConfig();

  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        const [currentOrg, allOrgs, hasOrgs, canManage] = await Promise.all([
          adapters.organization.getCurrentOrganization(),
          adapters.organization.getOrganizations(),
          adapters.organization.hasOrganizations(),
          adapters.organization.canManageOrganization(),
        ]);

        setCurrentOrganization(currentOrg);
        setOrganizations(allOrgs);
        setHasOrganizations(hasOrgs);
        setCanManageOrganization(canManage);
        setIsLoaded(adapters.organization.isLoaded());
      } catch (_error) {
        setIsLoaded(true);
      }
    };

    loadOrganizations();
  }, [adapters.organization]);

  const switchOrganization = async (orgId: string) => {
    await adapters.organization.switchOrganization(orgId);
    // Reload organizations after switching
    const [currentOrg, allOrgs] = await Promise.all([
      adapters.organization.getCurrentOrganization(),
      adapters.organization.getOrganizations(),
    ]);
    setCurrentOrganization(currentOrg);
    setOrganizations(allOrgs);
  };

  return {
    currentOrganization,
    organizations,
    hasOrganizations,
    isLoaded,
    orgId: currentOrganization?.id || null,
    canManageOrganization,
    switchOrganization,
    openOrganizationProfile: adapters.organization.openOrganizationProfile,
    openCreateOrganization: adapters.organization.openCreateOrganization,
  };
}