import { getDashboardStats } from "@/app/(root)/action/get-dashboard-stats";
import { DashboardStats } from "@/app/(root)/components/dashboard-stats";
import Heading from "@/components/ui/heading";
import { redirect } from "next/navigation";

/**
 * Dashboard Page
 * Displays job application statistics and insights for the authenticated user
 */
export default async function DashboardPage() {
  const stats = await getDashboardStats();

  if (!stats) {
    redirect("/auth/login");
  }

  return (
    <main className="flex-1 space-y-6 p-6 md:p-8">
      <div className="space-y-2">
        <Heading level="h2">Dashboard</Heading>
        <p className="text-muted-foreground">
          Overview of your job application progress and statistics
        </p>
      </div>

      <DashboardStats stats={stats} />
    </main>
  );
}
