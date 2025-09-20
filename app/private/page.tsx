import { redirect } from "next/navigation";

import { createServerClient } from "@/libs/supabase/server";

export default async function PrivatePage() {
  const supabase = await createServerClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return <p>Hello {data.user.email}</p>;
}
