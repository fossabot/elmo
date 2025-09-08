'use client';

import { type LucideIcon, User, LogOut, Repeat, FileText, Shield } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useClerk } from '@clerk/nextjs';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@elmo/ui/components/sidebar';
import { Avatar, AvatarImage, AvatarFallback } from '@elmo/ui/components/avatar';
import Link from 'next/link';

import { Popover, PopoverContent, PopoverTrigger } from '@elmo/ui/components/popover';
import { OrganizationList } from '@clerk/nextjs';

export function NavAccount() {
  const { user } = useUser();
  const { openUserProfile, signOut } = useClerk();
  const userEmail = user?.emailAddresses?.[0]?.emailAddress || 'Loading...';
  const userImageUrl = user?.imageUrl;

  const handleUserProfileClick = () => {
    openUserProfile();
  };

  const handleSignOutClick = () => {
    signOut();
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Account</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton onClick={handleUserProfileClick}>
            <div className="flex items-center gap-2 w-full cursor-pointer">
              <Avatar className="size-4">
                <AvatarImage src={userImageUrl} alt={userEmail} />
                <AvatarFallback className="text-xs">
                  <User />
                </AvatarFallback>
              </Avatar>
              <span>{userEmail}</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href="https://www.elmohq.com/terms" className="flex items-center gap-2 w-full cursor-pointer" target="_blank">
              <FileText className="size-4" />
              <span>Terms of Service</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href="https://www.elmohq.com/privacy" className="flex items-center gap-2 w-full cursor-pointer" target="_blank">
              <Shield className="size-4" />
              <span>Privacy Policy</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton onClick={handleSignOutClick}>
            <div className="flex items-center gap-2 w-full cursor-pointer">
              <LogOut className="size-4" />
              <span>Sign Out</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
