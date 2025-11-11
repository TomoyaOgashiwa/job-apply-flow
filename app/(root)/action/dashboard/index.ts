"use server";

import { prisma } from "@/libs/prisma";
import { createServerClient } from "@/libs/supabase/server";
import { ApplicationStatus, InterviewStatus } from "@/libs/generated/prisma";
import { error, success } from "@/app/(root)/action/utils";
import type { ApiResponse } from "@/app/(root)/action/type";
import { ErrorCode } from "@/app/(root)/action/type";

export interface DashboardStats {
  totalApplications: number;
  applicationsByStatus: {
    status: ApplicationStatus;
    count: number;
    percentage: number;
  }[];
  applicationsByInterviewStatus: {
    status: InterviewStatus;
    count: number;
    percentage: number;
  }[];
  failedApplicationsByInterviewStatus: {
    status: InterviewStatus;
    count: number;
    percentage: number;
  }[];
  recentApplications: number;
  successRate: number;
}

/**
 * Get dashboard statistics for the authenticated user
 * Calculates application counts, status distributions, and success rates
 */
export async function getDashboardStats(): Promise<
  ApiResponse<DashboardStats>
> {
  try {
    const supabase = await createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return error(
        ErrorCode.UNAUTHORIZED,
        "User is not authenticated",
        undefined,
        401,
      );
    }

    // Get the user from our database
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email || "" },
    });

    if (!dbUser) {
      return error(
        ErrorCode.NOT_FOUND,
        "User not found in database",
        undefined,
        404,
      );
    }

    // Get all applications for the user
    const applications = await prisma.application.findMany({
      where: { user_id: dbUser.id },
      select: {
        id: true,
        status: true,
        interview_status: true,
        created_at: true,
      },
      orderBy: { created_at: "desc" },
    });

    const totalApplications = applications.length;

    // Calculate applications by status
    const statusCounts = applications.reduce(
      (acc, app) => {
        acc[app.status] = (acc[app.status] || 0) + 1;
        return acc;
      },
      {} as Record<ApplicationStatus, number>,
    );

    const applicationsByStatus = Object.values(ApplicationStatus).map(
      (status) => ({
        status,
        count: statusCounts[status] || 0,
        percentage:
          totalApplications > 0
            ? ((statusCounts[status] || 0) / totalApplications) * 100
            : 0,
      }),
    );

    // Calculate applications by interview status
    const interviewStatusCounts = applications.reduce(
      (acc, app) => {
        acc[app.interview_status] = (acc[app.interview_status] || 0) + 1;
        return acc;
      },
      {} as Record<InterviewStatus, number>,
    );

    const applicationsByInterviewStatus = Object.values(InterviewStatus).map(
      (status) => ({
        status,
        count: interviewStatusCounts[status] || 0,
        percentage:
          totalApplications > 0
            ? ((interviewStatusCounts[status] || 0) / totalApplications) * 100
            : 0,
      }),
    );

    // Calculate failed applications by interview status (where they dropped off)
    const failedApplications = applications.filter(
      (app) => app.status === "FAILED",
    );
    const failedInterviewStatusCounts = failedApplications.reduce(
      (acc, app) => {
        acc[app.interview_status] = (acc[app.interview_status] || 0) + 1;
        return acc;
      },
      {} as Record<InterviewStatus, number>,
    );

    const totalFailed = failedApplications.length;
    const failedApplicationsByInterviewStatus = Object.values(
      InterviewStatus,
    ).map((status) => ({
      status,
      count: failedInterviewStatusCounts[status] || 0,
      percentage:
        totalFailed > 0
          ? ((failedInterviewStatusCounts[status] || 0) / totalFailed) * 100
          : 0,
    }));

    // Calculate recent applications (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentApplications = applications.filter(
      (app) => app.created_at > thirtyDaysAgo,
    ).length;

    // Calculate success rate
    const approvedCount = statusCounts.APPROVED || 0;
    const successRate =
      totalApplications > 0 ? (approvedCount / totalApplications) * 100 : 0;

    return success({
      totalApplications,
      applicationsByStatus,
      applicationsByInterviewStatus,
      failedApplicationsByInterviewStatus,
      recentApplications,
      successRate,
    });
  } catch (err) {
    return error(
      ErrorCode.INTERNAL_ERROR,
      "Failed to fetch dashboard stats",
      err instanceof Error ? err.message : err,
      500,
    );
  }
}
