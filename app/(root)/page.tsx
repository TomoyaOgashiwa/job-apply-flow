import { getDashboardStats } from "@/app/(root)/action/get-dashboard-stats";
import { DashboardStats } from "@/app/(root)/components/dashboard-stats";
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
    <main className="flex-1 space-y-6 p-6 md:p-8" role="main">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your job application progress and statistics
        </p>
      </div>

      <DashboardStats stats={stats} />
    </main>
  );
}
