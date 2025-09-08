import cloudMiddleware from "@elmo/cloud/lib/adapters/middleware";
import { isCloudMode } from "@/lib/adapters/client-config";
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
	matcher: ["/","/org/:path*", "/reports/:path*", "/auth/:path*", "/api/:path*"],
};


export default function middleware(req: NextRequest, event: NextFetchEvent) {
  if (isCloudMode()) {
    return cloudMiddleware(req, event);
  } else {
    return NextResponse.next();
  }
}
