"use client";

import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@elmo/ui/components/button";
import { LogOut } from "lucide-react";

interface SignOutButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export function CloudSignOutButton({ 
  variant = "outline", 
  size = "sm"
}: SignOutButtonProps) {
  return (
    <SignOutButton>
      <Button variant={variant} size={size} className="cursor-pointer">
        <LogOut className="h-4 w-4" />
        Sign Out
      </Button>
    </SignOutButton>
  );
}
