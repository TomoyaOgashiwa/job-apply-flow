import { getDashboardStats } from "@/app/(root)/action/dashboard";
import { DashboardStats } from "@/app/(root)/components/dashboard-stats";
import Heading from "@/components/ui/heading";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { ErrorCode } from "@/app/(root)/action/type";

/**
 * Dashboard Page
 * Displays job application statistics and insights for the authenticated user
 */
export default async function DashboardPage() {
  const response = await getDashboardStats();

  // Handle authentication errors by redirecting to login
  if (!response.success && response.error.code === ErrorCode.UNAUTHORIZED) {
    redirect("/auth/login");
  }

  // Handle other errors with error display
  if (!response.success) {
    return (
      <main className="flex-1 space-y-6 p-6 md:p-8">
        <div className="space-y-2">
          <Heading level="h2">Dashboard</Heading>
          <p className="text-muted-foreground">
            Overview of your job application progress and statistics
          </p>
        </div>

        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">
              Error Loading Dashboard
            </CardTitle>
            <CardDescription className="text-red-600">
              {response.error.message}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="text-xs text-red-500">
              Error Code: {response.error.code}
            </pre>
            {response.error.statusCode && (
              <p className="mt-2 text-sm text-red-600">
                Status Code: {response.error.statusCode}
              </p>
            )}
          </CardContent>
        </Card>
      </main>
    );
  }

  const stats = response.data;

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
