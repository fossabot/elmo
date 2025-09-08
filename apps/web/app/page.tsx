import { redirect } from "next/navigation";
import FullPageCard from "@/components/full-page-card";

export default function Home() {
  if (process.env.CLOUD !== "true") {
    redirect("/org/default");
  }

  return (
    <FullPageCard
      showBackButton={false}
      subtitle="Select an organization to continue."
      title="Org Switcher"
    >
      todo implement org switcher in custom layout
    </FullPageCard>
  );
}
