"use client";

/**
 * Example: Client Component Usage Patterns
 *
 * This file demonstrates various ways to use the unified API response system
 * in client components. These are examples and not meant to be imported directly.
 */

import { useEffect, useState } from "react";
import { getApplications } from "@/app/application/apply";
import { useApiRequest, useMutation } from "@/app/application/hooks";
import { isSuccess } from "@/app/application/utils";
import type { Application } from "@/libs/generated/prisma";
import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";

/**
 * Example 1: Simple data fetching with manual state management
 */
export function Example1_ManualFetch() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);

      const response = await getApplications();

      if (response.success) {
        setApplications(response.data);
      } else {
        setError(response.error.message);
      }

      setLoading(false);
    }

    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <h2>Applications ({applications.length})</h2>
      {applications.map((app) => (
        <div key={app.id}>{app.company_name}</div>
      ))}
    </div>
  );
}

/**
 * Example 2: Using useApiRequest hook for cleaner code
 */
export function Example2_UseApiRequest() {
  const { data, error, loading, execute } = useApiRequest(getApplications);

  useEffect(() => {
    execute();
  }, [execute]);

  if (loading) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-800">Error</CardTitle>
          <CardDescription className="text-red-600">
            {error.message}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => execute()} variant="outline">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <h2>Applications ({data?.length || 0})</h2>
      {data?.map((app) => (
        <Card key={app.id}>
          <CardHeader>
            <CardTitle>{app.company_name}</CardTitle>
            <CardDescription>{app.position}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

/**
 * Example 3: Using isSuccess type guard
 */
export function Example3_TypeGuard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    async function loadData() {
      const response = await getApplications();

      // TypeScript knows the exact shape after type guard
      if (isSuccess(response)) {
        // response.data is automatically typed as Application[]
        setApplications(response.data);
      } else {
        // response.error is automatically typed as ApiError
        setErrorMessage(response.error.message);
        console.error("Error code:", response.error.code);
      }
    }

    loadData();
  }, []);

  return (
    <div>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      {applications.map((app) => (
        <div key={app.id}>{app.company_name}</div>
      ))}
    </div>
  );
}

/**
 * Example 4: Mutation with useMutation hook
 * (Note: This assumes a createApplication function exists)
 */
export function Example4_Mutation() {
  const { mutate, loading, error, success } = useMutation(
    async (data: { company_name: string; position: string }) => {
      // This would be your actual createApplication function
      const response = await fetch("/api/applications", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const json = await response.json();
      return { success: true, data: json, error: null };
    },
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      company_name: formData.get("company_name") as string,
      position: formData.get("position") as string,
    };

    const result = await mutate(data);
    if (result) {
      // Success! The mutation returned data
      console.log("Created:", result);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Application</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="company_name"
            placeholder="Company Name"
            className="w-full rounded border p-2"
            disabled={loading}
          />
          <input
            name="position"
            placeholder="Position"
            className="w-full rounded border p-2"
            disabled={loading}
          />

          {error && (
            <div className="rounded bg-red-50 p-3 text-sm text-red-600">
              {error.message}
            </div>
          )}

          {success && (
            <div className="rounded bg-green-50 p-3 text-sm text-green-600">
              Application created successfully!
            </div>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Application"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

/**
 * Example 5: Combining with React Query (if you use it)
 */
export function Example5_ReactQuery() {
  // If you're using React Query, you can wrap the API response:
  /*
  const { data: response, isLoading, error: queryError } = useQuery({
    queryKey: ['applications'],
    queryFn: getApplications,
  });

  // Handle the ApiResponse
  if (isLoading) return <div>Loading...</div>;
  if (queryError) return <div>Query Error: {queryError.message}</div>;
  
  if (!response?.success) {
    return <div>API Error: {response?.error.message}</div>;
  }

  const applications = response.data;
  */

  return <div>See comment in source code</div>;
}

/**
 * Example 6: Handling different error types
 */
export function Example6_ErrorHandling() {
  const { data, error, loading, execute } = useApiRequest(getApplications);

  if (error) {
    // Handle different error codes differently
    switch (error.code) {
      case "UNAUTHORIZED":
        return (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-yellow-800">
                Authentication Required
              </CardTitle>
              <CardDescription className="text-yellow-600">
                Please log in to view your applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => (window.location.href = "/auth/login")}>
                Go to Login
              </Button>
            </CardContent>
          </Card>
        );
      case "NOT_FOUND":
        return (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No applications found</p>
              <Button onClick={() => execute()} className="mt-4">
                Refresh
              </Button>
            </CardContent>
          </Card>
        );
      default:
        return (
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800">Error</CardTitle>
              <CardDescription className="text-red-600">
                {error.message}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-red-500">Error Code: {error.code}</p>
                {error.statusCode && (
                  <p className="text-sm text-red-500">
                    Status: {error.statusCode}
                  </p>
                )}
                <Button onClick={() => execute()} variant="outline">
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        );
    }
  }

  return <div>Content here...</div>;
}
