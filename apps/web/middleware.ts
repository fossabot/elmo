import cloudMiddleware from "@elmo/cloud/lib/adapters/middleware";
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

const isCloud = process.env.CLOUD === "true";

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|icon|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  if (isCloud) {
    return cloudMiddleware(req, event);
  }
  return NextResponse.next();
}
