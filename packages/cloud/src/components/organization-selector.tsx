"use client";

import { OrganizationList } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function OrganizationSelector() {
  return (
    <OrganizationList
      afterSelectOrganizationUrl={(org) => `/org/${org.slug}`}
      afterCreateOrganizationUrl={(org) => `/org/${org.slug}`}
      appearance={{
        elements: {
          organizationListContainer: "bg-background border border-border rounded-lg",
          card: "bg-background",
          organizationPreview: "hover:bg-accent/50",
          organizationSwitcherTrigger: "bg-background border border-border",
        },
      }}
    />
  );
}
