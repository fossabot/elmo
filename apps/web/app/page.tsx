import { OrganizationSelector } from "@elmo/cloud/components/organization-selector";
import { CloudSignOutButton } from "@elmo/cloud/components/sign-out-button";
import { redirect } from "next/navigation";
import { isOSSMode } from "@/lib/adapters/client-config";
import FullPageCard from "@/components/full-page-card";

export default function Home() {
  if (isOSSMode()) {
    redirect("/org/default");
  }

  return (
    <FullPageCard
      title="Select Organization"
      subtitle="Choose an organization to continue or create a new one."
      customButton={<CloudSignOutButton />}
      replaceCard={true}
    >
      <div className="flex justify-center p-8">
        <OrganizationSelector />
      </div>
    </FullPageCard>
  );
}
