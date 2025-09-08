"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@elmo/ui/components/sidebar";
import {
  IconDashboard,
  IconListDetails,
  IconSettings,
} from "@tabler/icons-react";
import Link from "next/link";
import type * as React from "react";
import { NavMain } from "@/components/nav-main";
import { useOrganizations } from "@/hooks/use-organizations";
import { getAppConfig } from "@/lib/adapters/client";
import { Logo } from "./logo";
import { NavAccount } from "./nav-account";
import { NavLinks } from "./nav-links";
import { NavOrgSwitcher } from "./nav-org-switcher";
import { NavOrganization } from "./nav-organization";
import { SubscriptionStatus } from "./subscription-status";

// Conditionally import cloud components
import { NavAccount as CloudNavAccount } from "@elmo/cloud/components/nav-account";
import { NavOrgSwitcher as CloudNavOrgSwitcher } from "@elmo/cloud/components/nav-org-switcher";
import { NavOrganization as CloudNavOrganization } from "@elmo/cloud/components/nav-organization";
import { isCloudMode } from "@/lib/adapters/client-config";

const getNavData = (orgSlug: string) => ({
  navMain: [
    {
      title: "Overview",
      url: `/org/${orgSlug}`,
      icon: IconDashboard,
    },
    {
      title: "Prompts",
      url: `/org/${orgSlug}/prompts`,
      icon: IconListDetails,
    },
    {
      title: "Settings",
      url: `/org/${orgSlug}/settings`,
      icon: IconSettings,
    },
  ],
});

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { features } = getAppConfig();
  const { currentOrganization } = useOrganizations();

  // When orgs are disabled, always use 'default' as the slug
  const orgSlug = features.organizations
    ? currentOrganization?.slug || "default"
    : "default";

  const navData = getNavData(orgSlug);
  const homeUrl = `/org/${orgSlug}`;

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <Link className="p-2 pb-0" href={homeUrl}>
          <Logo />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SubscriptionStatus />
        <NavMain items={navData.navMain} />
        <NavLinks />
        {isCloudMode() ? <CloudNavOrganization /> : <NavOrganization />}
        {isCloudMode() && <CloudNavAccount />}
      </SidebarContent>
    </Sidebar>
  );
}
