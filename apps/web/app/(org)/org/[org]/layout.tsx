import { AppLayout } from "@/components/app-layout";

export default function OrgLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppLayout>{children}</AppLayout>;
}
