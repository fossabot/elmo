"use client";

import { useParams } from "next/navigation";

/**
 * Hook to extract the organization slug from the URL parameters
 * Works with the /org/[org] route structure
 */
export function useOrgParams() {
  const params = useParams();
  const orgSlug = Array.isArray(params.org) ? params.org[0] : params.org;

  return {
    orgSlug: orgSlug || null,
  };
}
