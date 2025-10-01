"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createServerClient } from "@/libs/supabase/server";

const LoginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginState = {
  fieldErrors?: { email?: string; password?: string };
  supabaseError?: string;
  values?: { email: string };
  success?: boolean;
};

// Server Action for email/password login
export async function login(
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // 1) Zod validation (show per-field errors)
  const parsed = LoginSchema.safeParse(raw);
  if (!parsed.success) {
    const errorTree = z.treeifyError(parsed.error);
    return {
      fieldErrors: {
        email: errorTree.properties?.email?.errors[0],
        password: errorTree.properties?.password?.errors[0],
      },
      supabaseError: "", // only set after Zod passes
      values: { email: String(raw.email ?? "") },
      success: false,
    };
  }

  // 2) Supabase auth
  const supabase = await createServerClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  // Return Supabase error (e.g., invalid credentials) without redirect
  if (error) {
    return {
      fieldErrors: {},
      supabaseError: error.message,
      values: { email: parsed.data.email },
      success: false,
    };
  }

  // 3) Success -> revalidate and redirect
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
