import { getApplications } from "@/app/(root)/action/apply";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import Heading from "@/components/ui/heading";
import ApplyList from "./components/apply-list";
import ApplyHeader from "./components/apply-header";

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
      <Heading className="pb-4" level="h2">
        Application List
      </Heading>

      {applications.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">No applications found</p>
          </CardContent>
        </Card>
      ) : (
        <div>
          <ApplyHeader count={applications.length} />
          <ApplyList applications={applications} />
        </div>
      )}
    </div>
  );
}
