"use client";

import { Protect, useClerk, useOrganizationList } from "@clerk/nextjs";
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
import Link from "next/link";
import { useOrganizations } from "../hooks/use-organizations";

export function NavOrganization() {
  const { openOrganizationProfile } = useClerk();
  const { setActive } = useOrganizationList();
  const { currentOrganization } = useOrganizations();

  const handleSettingsClick = () => {
    openOrganizationProfile();
  };

  const handleMembersClick = () => {
    openOrganizationProfile({
      __experimental_startPath: "/organization-members",
    });
  };

  return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Organization</SidebarGroupLabel>
        <SidebarMenu>
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
            <SidebarMenuButton asChild>
              <Link href={`/org/${currentOrganization?.slug || 'default'}/billing`}>
                <CircleDollarSign className="size-4" />
                <span>Billing</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <div className="flex w-full cursor-pointer items-center gap-2">
                  <Repeat className="size-4" />
                  <span>Switch</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
  );
}
