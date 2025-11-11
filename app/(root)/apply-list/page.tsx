import { getApplications } from "@/app/(root)/action/apply";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Badge } from "@/components/shadcn/badge";

export default async function ApplyListPage() {
  const response = await getApplications();

  if (!response.success) {
    return (
      <div className="container mx-auto p-6">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">
              Error Loading Applications
            </CardTitle>
            <CardDescription className="text-red-600">
              {response.error.message}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="text-xs text-red-500">
              Error Code: {response.error.code}
            </pre>
          </CardContent>
        </Card>
      </div>
    );
  }

  const applications = response.data;

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Application List</h1>
        <p className="text-muted-foreground">
          Total applications: {applications.length}
        </p>
      </div>

      {applications.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">No applications found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {applications.map((application) => (
            <Card key={application.id}>
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
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
