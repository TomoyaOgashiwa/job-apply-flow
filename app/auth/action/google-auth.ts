"use server";

import { createServerClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

/**
 * Get the base URL for OAuth redirects
 * Uses NEXT_PUBLIC_SITE_URL env variable in production, falls back to request headers
 */
async function getBaseUrl(): Promise<string> {
  // Check for environment variable first (production)
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  // Fall back to request headers (development)
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = headersList.get("x-forwarded-proto") || "http";

  return `${protocol}://${host}`;
}

export async function loginWithGoogle() {
  const supabase = await createServerClient();
  const baseUrl = await getBaseUrl();

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${baseUrl}/auth/callback`,
    },
  });

  if (error) {
    redirect("/auth/login");
  }
  if (data.url) {
    // @ts-expect-error – For OAuth redirect so remove this type error
    redirect(data.url);
  }

  redirect("/");
}
