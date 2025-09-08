"use client";

import { NavOrganization as CloudNavOrganization } from "@elmo/cloud/components/nav-organization";
import { isCloudMode } from "@/lib/adapters/client-config";
import { Alert, AlertDescription } from "@elmo/ui/components/alert";
import { Separator } from "@elmo/ui/components/separator";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@elmo/ui/components/sidebar";
import { CircleDollarSign, Repeat, Settings, Users } from "lucide-react";
import { useOrganizations } from "@/hooks/use-organizations";
import { getAppConfig } from "@/lib/adapters/client";

export function NavOrganization() {
  console.log("cloud?", isCloudMode());
  // Use cloud version for cloud mode
  if (isCloudMode()) {
    return <CloudNavOrganization />;
  }

  // OSS version
  const {
    canManageOrganization,
    organizations,
    openOrganizationProfile,
    openCreateOrganization,
  } = useOrganizations();

  const handleSettingsClick = () => {
    if (openOrganizationProfile) {
      openOrganizationProfile();
    }
  };

  const handleMembersClick = () => {
    if (openOrganizationProfile) {
      openOrganizationProfile();
    }
  };

  const handleBillingClick = () => {
    if (openOrganizationProfile) {
      openOrganizationProfile();
    }
  };

  const handleSwitchOrganization = () => {
    if (openCreateOrganization) {
      openCreateOrganization();
    }
  };

  const switchOrganizationButton =
    organizations.length > 1 ? (
      <SidebarMenuItem>
        <SidebarMenuButton onClick={handleSwitchOrganization}>
          <div className="flex w-full cursor-pointer items-center gap-2">
            <Repeat className="size-4" />
            <span>Switch</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ) : null;

  // Show limited functionality warning for non-admin users
  if (!canManageOrganization) {
    return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Organization</SidebarGroupLabel>
        <Alert>
          <AlertDescription className="text-xs">
            You're on the limited free plan. Contact your organization admin to
            upgrade for full access.
            {switchOrganizationButton && (
              <>
                <Separator className="my-2" />
                <button
                  className="cursor-pointer font-bold"
                  onClick={handleSwitchOrganization}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSwitchOrganization();
                    }
                  }}
                  type="button"
                >
                  Switch Organization
                </button>
              </>
            )}
          </AlertDescription>
        </Alert>
      </SidebarGroup>
    );
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Organization</SidebarGroupLabel>
      <SidebarMenu>
        {canManageOrganization && (
          <>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleSettingsClick}>
                <div className="flex w-full cursor-pointer items-center gap-2">
                  <Settings className="size-4" />
                  <span>Settings</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleMembersClick}>
                <div className="flex w-full cursor-pointer items-center gap-2">
                  <Users className="size-4" />
                  <span>Members</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleBillingClick}>
                  <div className="flex w-full cursor-pointer items-center gap-2">
                    <CircleDollarSign className="size-4" />
                    <span>Billing</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </>
        )}
        {switchOrganizationButton}
      </SidebarMenu>
    </SidebarGroup>
  );
}
