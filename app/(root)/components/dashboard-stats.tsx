"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Badge } from "@/components/shadcn/badge";
import { Progress } from "@/components/shadcn/progress";
import { Separator } from "@/components/shadcn/separator";
import type { DashboardStats as DashboardStatsType } from "../action/dashboard";
import { ApplicationStatus, InterviewStatus } from "@/libs/generated/prisma";

interface DashboardStatsProps {
  stats: DashboardStatsType;
}

/**
 * Format status text for display
 */
function formatStatus(status: string): string {
  return status
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Get color variant for application status badges
 */
function getStatusColor(
  status: ApplicationStatus,
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "APPROVED":
      return "default";
    case "PROCESSING":
      return "secondary";
    case "FAILED":
      return "destructive";
    case "NO_RESPONSE":
      return "outline";
    default:
      return "outline";
  }
}

/**
 * Get color class for progress bars based on status
 */
function getProgressColor(status: ApplicationStatus): string {
  switch (status) {
    case "APPROVED":
      return "bg-green-500";
    case "PROCESSING":
      return "bg-blue-500";
    case "FAILED":
      return "bg-red-500";
    case "NO_RESPONSE":
      return "bg-gray-500";
    default:
      return "bg-gray-500";
  }
}

/**
 * Get color class for interview status progress bars
 */
function getInterviewProgressColor(status: InterviewStatus): string {
  const colors: Record<InterviewStatus, string> = {
    SENT_RESUME: "bg-indigo-400",
    INTERVIEW: "bg-blue-500",
    OFFER_INTERVIEW: "bg-purple-500",
    OFFER_ACCEPTED: "bg-green-500",
    OFFER_REJECTED: "bg-red-500",
  };
  return colors[status] || "bg-gray-500";
}

/**
 * Dashboard Statistics Component
 * Displays comprehensive job application statistics with visualizations
 */
export function DashboardStats({ stats }: DashboardStatsProps) {
  const {
    totalApplications,
    applicationsByStatus,
    applicationsByInterviewStatus,
    failedApplicationsByInterviewStatus,
    recentApplications,
    successRate,
  } = stats;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <section
        aria-labelledby="overview-heading"
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <h2 id="overview-heading" className="sr-only">
          Application Overview
        </h2>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Applications
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" aria-live="polite">
              {totalApplications}
            </div>
            <p className="text-xs text-muted-foreground">
              All time applications submitted
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Recent Applications
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            >
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M3 10h18" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" aria-live="polite">
              {recentApplications}
            </div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" aria-live="polite">
              {successRate.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Applications approved
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Applications
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            >
              <path d="M12 2v20M2 12h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" aria-live="polite">
              {applicationsByStatus.find((s) => s.status === "PROCESSING")
                ?.count || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently processing
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Application Status Breakdown */}
      <section aria-labelledby="status-breakdown-heading">
        <Card>
          <CardHeader>
            <CardTitle id="status-breakdown-heading">
              Application Status Breakdown
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Distribution of applications by their current status
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {applicationsByStatus.map((item) => (
              <div key={item.status} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(item.status)}>
                      {formatStatus(item.status)}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {item.count} applications
                    </span>
                  </div>
                  <span
                    className="text-sm font-medium"
                    aria-label={`${item.percentage.toFixed(1)} percent`}
                  >
                    {item.percentage.toFixed(1)}%
                  </span>
                </div>
                <Progress
                  value={item.percentage}
                  className="h-2"
                  aria-label={`${formatStatus(item.status)} progress: ${item.percentage.toFixed(1)}%`}
                  indicatorClassName={getProgressColor(item.status)}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Interview Process Funnel */}
      <section aria-labelledby="interview-funnel-heading">
        <Card>
          <CardHeader>
            <CardTitle id="interview-funnel-heading">
              Interview Process Funnel
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Where your applications are in the interview pipeline
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {applicationsByInterviewStatus.map((item, index) => (
              <div key={item.status}>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="font-medium">
                        {formatStatus(item.status)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {item.count} applications
                      </span>
                      <span
                        className="text-sm font-medium"
                        aria-label={`${item.percentage.toFixed(1)} percent`}
                      >
                        {item.percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <Progress
                    value={item.percentage}
                    className="h-2"
                    aria-label={`${formatStatus(item.status)} progress: ${item.percentage.toFixed(1)}%`}
                    indicatorClassName={getInterviewProgressColor(item.status)}
                  />
                </div>
                {index < applicationsByInterviewStatus.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Failed Applications Analysis */}
      {failedApplicationsByInterviewStatus.some((item) => item.count > 0) && (
        <section aria-labelledby="failed-analysis-heading">
          <Card>
            <CardHeader>
              <CardTitle id="failed-analysis-heading">
                Failed Applications Analysis
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                At which stage your failed applications dropped off
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {failedApplicationsByInterviewStatus
                .filter((item) => item.count > 0)
                .map((item) => (
                  <div key={item.status} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive">
                          {formatStatus(item.status)}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {item.count} failed
                        </span>
                      </div>
                      <span
                        className="text-sm font-medium"
                        aria-label={`${item.percentage.toFixed(1)} percent of failures`}
                      >
                        {item.percentage.toFixed(1)}%
                      </span>
                    </div>
                    <Progress
                      value={item.percentage}
                      className="h-2"
                      aria-label={`Failed at ${formatStatus(item.status)}: ${item.percentage.toFixed(1)}%`}
                      indicatorClassName="bg-red-500"
                    />
                  </div>
                ))}
              <div className="mt-4 rounded-lg bg-muted p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Insight:</strong> Understanding where applications
                  fail can help you improve your approach at those specific
                  stages of the interview process.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  );
}
