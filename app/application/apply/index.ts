"use server";

import { prisma } from "@/libs/prisma";
import { withPrisma } from "@/app/application/utils";
import type { ApiResponse } from "@/app/application/type";

export type ApplicationWithRelations = {
  id: string;
  status: string;
  interview_status: string;
  job_title: string;
  job_type: string;
  position_level: string;
  position_type: string;
  created_at: Date;
  company: {
    name: string;
  };
  interview: Array<{
    interview_date: Date;
  }>;
};

export async function getApplications(): Promise<
  ApiResponse<ApplicationWithRelations[]>
> {
  return withPrisma(async () => {
    return await prisma.application.findMany({
      select: {
        id: true,
        status: true,
        interview_status: true,
        job_title: true,
        job_type: true,
        position_level: true,
        position_type: true,
        created_at: true,
        company: {
          select: {
            name: true,
          },
        },
        interview: {
          select: {
            interview_date: true,
          },
          orderBy: {
            interview_date: "desc",
          },
          take: 1,
        },
      },
      orderBy: { created_at: "desc" },
    });
  });
}
