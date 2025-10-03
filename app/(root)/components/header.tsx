"use client";

import { User } from "@supabase/supabase-js";
import { logout } from "../action/logout";
import Heading from "@/components/ui/heading";
import Link from "next/link";

interface Props {
  user: User;
}

export default function Header({ user }: Props) {
  return (
    <header className="flex justify-between items-center p-4 sticky bg-[inherit] border-b border-gray-50 shadow-2xl">
      <Heading level="h1">
        <Link href="/">Job Apply Flow</Link>
      </Heading>
      <div className="flex items-center gap-4">
        <p>{user.email}</p>
        <button type="button" className="cursor-pointer" onClick={logout}>
          Sign Out
        </button>
      </div>
    </header>
  );
}
