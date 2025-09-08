"use client";

import { OrganizationSwitcher } from "@clerk/nextjs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@elmo/ui/components/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@elmo/ui/components/sidebar";
import { useOrganizations } from "../hooks/use-organizations";

export function NavOrgSwitcher() {
  const { currentOrganization } = useOrganizations();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild size="lg">
          <div className="m-1 ml-0 flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 pl-0">
            <Avatar className="size-9 rounded-md border">
              <AvatarImage
                alt={currentOrganization?.name}
                src={currentOrganization?.imageUrl}
              />
              <AvatarFallback className="rounded-md">
                {currentOrganization?.name?.charAt(0)?.toUpperCase() || "P"}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <OrganizationSwitcher
                appearance={{
                  elements: {
                    organizationSwitcherTrigger: "p-0 bg-transparent border-none shadow-none hover:bg-transparent",
                    organizationSwitcherTriggerIcon: "hidden",
                    organizationPreview: "hidden",
                    organizationPreviewTextContainer: "hidden",
                  },
                }}
                organizationProfileMode="modal"
                createOrganizationMode="modal"
                afterSelectOrganizationUrl={(org) => `/org/${org.slug || org.id}`}
                afterCreateOrganizationUrl={(org) => `/org/${org.slug || org.id}`}
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {currentOrganization?.name || "Personal"}
                </span>
                <span className="truncate text-xs">
                  {currentOrganization ? "Organization" : "Workspace"}
                </span>
              </div>
            </div>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
