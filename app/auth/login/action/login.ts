"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createServerClient } from "@/libs/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createServerClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createServerClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

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
