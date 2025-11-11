"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { createClient } from "@/libs/supabase/client";
import Link from "next/link";
import { AlertCircle, Home, LogIn, RefreshCcw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Error Page Component
 * Displays error information with appropriate navigation based on authentication status
 */
export default function Error({ error, reset }: ErrorProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-background to-muted/20 p-4">
      <Card className="w-full max-w-lg border-destructive/20 shadow-lg">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="size-8 text-destructive" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">
              An Error Occurred
            </CardTitle>
            <CardDescription className="text-base">
              We&apos;re sorry, an unexpected error has occurred.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm font-medium text-muted-foreground">
              Error Details
            </p>
            <p className="mt-2 text-sm text-foreground">
              {error.message || "An unknown error occurred"}
            </p>
            {error.digest && (
              <p className="mt-2 text-xs text-muted-foreground">
                Error ID: {error.digest}
              </p>
            )}
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">
              If the problem persists, please try the following:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-foreground">
              <li>• Reload the page</li>
              <li>• Clear browser cache</li>
              <li>• Try a different browser</li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 sm:flex-row">
          <Button
            onClick={reset}
            variant="outline"
            className="w-full sm:w-auto"
          >
            <RefreshCcw className="mr-2 size-4" />
            Try Again
          </Button>

          {isAuthenticated === null ? (
            <Button disabled className="w-full sm:flex-1">
              Loading...
            </Button>
          ) : isAuthenticated ? (
            <Button asChild className="w-full sm:flex-1">
              <Link href="/">
                <Home className="mr-2 size-4" />
                Go to Home
              </Link>
            </Button>
          ) : (
            <Button asChild className="w-full sm:flex-1">
              <Link href="/auth/login">
                <LogIn className="mr-2 size-4" />
                Log In
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
