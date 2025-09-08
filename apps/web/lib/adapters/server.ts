// Server-only configuration

import { getAppConfig as getCloudConfig } from "@elmo/cloud/lib/adapters/index";
import type { AppConfig } from "@elmo/shared/lib/adapters/types";
import { getOSSConfig } from "./oss-config";

const isCloudMode = process.env.CLOUD === "true";

export function getAppConfig(): AppConfig {
  return isCloudMode ? getCloudConfig() : getOSSConfig();
}
