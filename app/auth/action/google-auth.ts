"use server";

import { createServerClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";

export async function loginWithGoogle() {
  const supabase = await createServerClient();

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
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
