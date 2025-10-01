import { createServerClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";
import Header from "./components/header";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <div>
      <Header user={data.user} />
      <main className="w-screen h-screen">{children}</main>
    </div>
  );
}
