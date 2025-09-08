"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@elmo/ui/components/breadcrumb";
import { usePathname } from "next/navigation";
import React from "react";
import { useOrgParams } from "@/hooks/use-org-params";
import { useOrganizations } from "@/hooks/use-organizations";

// Helper function to format breadcrumb labels
function formatBreadcrumbLabel(segment: string): string {
  // Handle special cases
  if (segment === "default") {
    return "Dashboard";
  }
  if (segment === "organization-members") {
    return "Members";
  }
  if (segment === "organization-billing") {
    return "Billing";
  }

  // Convert kebab-case or snake_case to Title Case
  return segment
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

// Helper function to build breadcrumb items
function buildBreadcrumbItems(
  pathname: string,
  orgSlug: string | null,
  orgName: string | null
) {
  const segments = pathname.split("/").filter(Boolean);
  const items: Array<{ label: string; href: string; isCurrent: boolean }> = [];

  // Handle /org/[org] route structure
  if (segments[0] === "org" && segments[1]) {
    // Add organization breadcrumb
    items.push({
      label: orgName || formatBreadcrumbLabel(segments[1]),
      href: `/org/${segments[1]}`,
      isCurrent: segments.length === 2,
    });

    // Add remaining segments (starting from index 2)
    let currentPath = `/org/${segments[1]}`;
    for (let i = 2; i < segments.length; i++) {
      const segment = segments[i];
      currentPath += `/${segment}`;
      const isLast = i === segments.length - 1;

      items.push({
        label: formatBreadcrumbLabel(segment || ""),
        href: currentPath,
        isCurrent: isLast,
      });
    }
  } else {
    // Fallback for other routes
    let currentPath = "";
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      currentPath += `/${segment}`;
      const isLast = i === segments.length - 1;

      items.push({
        label: formatBreadcrumbLabel(segment || ""),
        href: currentPath,
        isCurrent: isLast,
      });
    }
  }

  return items;
}

export function DynamicBreadcrumbs() {
  const pathname = usePathname();
  const { orgSlug } = useOrgParams();
  const { currentOrganization } = useOrganizations();

  const breadcrumbItems = buildBreadcrumbItems(
    pathname,
    orgSlug,
    currentOrganization?.name || null
  );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={item.href}>
            <BreadcrumbItem className="hidden md:block">
              {item.isCurrent ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbItems.length - 1 && (
              <BreadcrumbSeparator className="hidden md:block" />
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
