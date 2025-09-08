import FullPageCard from "@/components/full-page-card";

export default function NotFound() {
  return (
    <FullPageCard
      showBackButton={true}
      subtitle="The page you're looking for doesn't exist."
      title="404 Not Found"
    />
  );
}
