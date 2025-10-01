"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createServerClient } from "@/libs/supabase/server";

const SignupSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z
      .email("Please enter a valid email address")
      .min(1, "Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your password"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword", "password"],
        code: "custom",
        message: "Passwords do not match",
      });
    }
  });

export type SignupState = {
  fieldErrors?: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
  supabaseError?: string;
  values?: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  success?: boolean;
};

// Server Action for email/password login
export async function signup(
  prevState: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  // 1) Zod validation (show per-field errors)
  const parsed = SignupSchema.safeParse(raw);
  if (!parsed.success) {
    const errorTree = z.treeifyError(parsed.error);
    return {
      fieldErrors: {
        name: errorTree.properties?.name?.errors[0],
        email: errorTree.properties?.email?.errors[0],
        password: errorTree.properties?.password?.errors[0],
        confirmPassword: errorTree.properties?.confirmPassword?.errors[0],
      },
      supabaseError: "", // only set after Zod passes
      values: {
        name: String(raw.name ?? ""),
        email: String(raw.email ?? ""),
        password: String(raw.password ?? ""),
        confirmPassword: String(raw.confirmPassword ?? ""),
      },
      success: false,
    };
  }

  // 2) Supabase auth
  const supabase = await createServerClient();
  const { error } = await supabase.auth.signUp(parsed.data);

  // Return Supabase error (e.g., invalid credentials) without redirect
  if (error) {
    return {
      fieldErrors: {},
      supabaseError: error.message,
      values: {
        name: parsed.data.name,
        email: parsed.data.email,
        password: parsed.data.password,
        confirmPassword: parsed.data.confirmPassword,
      },
      success: false,
    };
  }

  redirect("/auth/login");
}
