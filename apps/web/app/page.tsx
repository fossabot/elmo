import { redirect } from "next/navigation";
import FullPageCard from "@/components/full-page-card";

export default function Home() {
  if (process.env.CLOUD !== "true") {
    redirect("/org/default");
  }

  return (
    <FullPageCard
      title="Org Switcher"
      subtitle="Select an organization to continue."
      // todo: custom sign out button
      //  <Button asChild size="sm" variant="outline">
			// 				Sign Out
			// 			</Button>
      customBackButton={<></>}
    >
      todo implement org switcher in custom layout
    </FullPageCard>
  );
}
