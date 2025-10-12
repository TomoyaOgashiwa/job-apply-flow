import Link from "next/link";
import { Button } from "@/components/shadcn/button";
import Heading from "@/components/ui/heading";

/**
 * Not Found Page
 * Displays when a user navigates to a non-existent route within the authenticated area
 */
export default function NotFound() {
  return (
    <main
      className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-6"
      role="main"
    >
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        {/* Error Code */}
        <div className="mb-6" aria-hidden="true">
          <svg
            className="h-24 w-24 text-muted-foreground/20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <Heading level="h1" className="mb-2">
          404
        </Heading>

        <Heading level="h2" className="mb-4">
          Page Not Found
        </Heading>

        <p className="mb-8 text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. The page might
          have been removed, renamed, or doesn't exist.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="default">
            <Link href="/">Back to Home</Link>
          </Button>

          <Button asChild variant="outline" size="default">
            <Link href="/auth/login">Back to Login</Link>
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 rounded-lg border bg-muted/50 p-4">
          <p className="text-sm text-muted-foreground">
            If you believe this is an error, please contact support or check the
            URL for typos.
          </p>
        </div>
      </div>
    </main>
  );
}
