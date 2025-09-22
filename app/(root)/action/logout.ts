"use server";
import { createServerClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";

export async function logout() {
  const supabase = await createServerClient();
  await supabase.auth.signOut();
  redirect("/auth/login");
}
