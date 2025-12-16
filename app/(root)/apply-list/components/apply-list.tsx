"use client";

import { Badge } from "@/components/shadcn/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { ApplicationWithRelations } from "../../action/apply";

export default function ApplyList({
  applications,
}: {
  applications: ApplicationWithRelations[];
}) {
  return (
    <ul className="grid gap-4">
      {applications.map((application) => (
        <li>
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{application.company.name}</CardTitle>
                  <CardDescription>{application.job_title}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">{application.status}</Badge>
                  <Badge variant="secondary">
                    {application.interview_status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Applied:</span>{" "}
                {new Date(application.created_at).toLocaleDateString()}
              </div>
              {application.interview.length > 0 && (
                <div>
                  <span className="font-medium">Interview:</span>{" "}
                  {new Date(
                    application.interview[0].interview_date,
                  ).toLocaleDateString()}
                </div>
              )}
              <div>
                <span className="font-medium">Type:</span>{" "}
                {application.job_type}
              </div>
              <div>
                <span className="font-medium">Level:</span>{" "}
                {application.position_level}
              </div>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
