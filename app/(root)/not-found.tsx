import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import Link from "next/link";
import { FileQuestion, Home } from "lucide-react";

/**
 * Not Found Page Component
 * Displays 404 error page when a route is not found
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-background to-muted/20 p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-muted">
            <FileQuestion className="size-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">Page Not Found</CardTitle>
            <CardDescription className="text-base">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-center text-6xl font-bold text-muted-foreground/20">
              404
            </p>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">
              You may have mistyped the address or the page may have been
              removed. Please check the URL or return to the home page.
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/">
              <Home className="mr-2 size-4" />
              Go to Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
