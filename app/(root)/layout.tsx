import { createServerClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Provider from "@/components/provider";

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
    <Provider>
      <Header user={data.user} />
      <div className="flex gap-4">
        <Sidebar />
        <main className="w-screen h-screen">{children}</main>
      </div>
    </Provider>
  );
}
